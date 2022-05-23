import { connect, mapProps, observer } from '@formily/react';
import { Label } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classNames';
import { useEffect, useState, CSSProperties } from 'react';

import { Icon } from '../out/icon';
import { Text } from '../out/text';
import { ViewProps, View } from '../out/view';
import { Ilayout, ISize } from '../props';
import { getCssSize } from '../tools/style';

export interface FormItemProps extends ViewProps {
  label?: React.ReactNode
  colon?: boolean
  help?: string
  helpIcon?: React.ReactNode
  layout?: Ilayout
  labelStyle?: CSSProperties
  labelAlign?: 'left' | 'right'
  labelWidth?: number | string
  size?: ISize
  extra?: React.ReactNode
}

export const FormBaseItem: React.FC<FormItemProps> = (props) => {
  const { className, label, help, helpIcon, colon, labelStyle, labelWidth, labelAlign, children, extra, ...args } = props;
  const [lStyle, setLStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const style: CSSProperties = { ...labelStyle, textAlign: labelAlign ?? 'left' };
    typeof labelWidth !== 'undefined' && (style.width = getCssSize(labelWidth));
    setLStyle(style);
  }, [labelAlign, labelStyle, labelWidth]);

  return (
    <View {...args} className={classNames('y-form-item', className)} >
      <Label style={lStyle}>
        <Text>{label}</Text><Help help={help} helpIcon={helpIcon} /><Text>{colon && ':'}</Text>
        <View>{children}</View>
      </Label>
      {extra && <View>{extra}</View>}
    </View>
  );
};

const Help = observer((props: Pick<FormItemProps, 'help' | 'helpIcon'>) => {
  const { help, helpIcon = 'help' } = props;
  if (!help) {
    return null;
  }
  const click = () => {
    Taro.showToast({ title: help, icon: 'none' });
  };
  return <View style={{ display: 'inline-block' }} onClick={click}>{typeof helpIcon === 'string' ? <Icon src={helpIcon} /> : helpIcon}</View>;
});


export const FormItem = connect(
  FormBaseItem,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      label: props.label || field.title,
      extra: props.extra || field.description,
    };
  }),
);
