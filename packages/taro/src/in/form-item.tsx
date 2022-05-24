import { connect, mapProps, observer } from '@formily/react';
import Taro from '@tarojs/taro';
import classNames from 'classNames';
import { pickBy } from 'lodash-es';
import { useEffect, useState, CSSProperties } from 'react';

import { Icon } from '../out/icon';
import { Text } from '../out/text';
import { ViewProps, View } from '../out/view';
import { Ilayout, ISize } from '../props';
import { getCssSize } from '../tools/style';

import { useFormInherit } from './form';
import { Label } from './label';

export interface FormItemInheritProps {
  colon?: boolean
  helpIcon?: React.ReactNode
  layout?: Ilayout
  labelStyle?: CSSProperties
  labelAlign?: 'left' | 'right'
  labelWidth?: number | string
  size?: ISize
  feedbackStatus?: string
}

export interface FormItemProps extends ViewProps {
  for?: string
  required?: boolean,
  label?: React.ReactNode
  help?: string
  extra?: React.ReactNode
}

// eslint-disable-next-line complexity
export const FormBaseItem: React.FC<FormItemProps & FormItemInheritProps> = (props) => {
  const {
    required, for: lableID, className, children, extra, label, help, feedbackStatus = 'loading',
    helpIcon, colon, layout, size, labelStyle, labelWidth, labelAlign,
    ...args
  } = props;
  const [lStyle, setLStyle] = useState<CSSProperties>({});
  const formInherit = useFormInherit();
  const [mergeProps, setMergePropss] = useState<FormItemInheritProps>({});

  useEffect(() => {
    const itemProps = pickBy({ colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size }, v => v !== undefined);
    setMergePropss({ ...formInherit, ...itemProps });
  }, [formInherit, colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size]);

  useEffect(() => {
    const style: CSSProperties = { ...labelStyle, textAlign: labelAlign ?? 'left' };
    typeof labelWidth !== 'undefined' && (style.width = getCssSize(labelWidth));
    setLStyle(style);
  }, [labelAlign, labelStyle, labelWidth]);

  return (
    <View {...args} className={classNames('y-form-item', mergeProps.layout && `y-form-item-${mergeProps.layout}`, className)} >
      <Label for={lableID} className={classNames('y-form-item-label', mergeProps.layout && `y-form-item-label-${mergeProps.layout}`)} style={lStyle}>
        {required && <Text size={mergeProps.size} className="y-text-danger">*</Text>}
        <Text size={mergeProps.size}>{label}</Text>
        <Help help={help} helpIcon={mergeProps.helpIcon} size={mergeProps.size} />
        {mergeProps.colon && <Text size={mergeProps.size}>:</Text>}
      </Label>
      <View className='y-form-item-in'>
        {children}  {extra && <View>{extra}</View>}
        <Icon src={feedbackStatus} size={mergeProps.size} />
      </View>
    </View>
  );
};

const Help = observer((props: Pick<FormItemProps & FormItemInheritProps, 'help' | 'helpIcon' | 'size'>) => {
  const { size, help, helpIcon = 'help' } = props;
  if (!help) {
    return null;
  }
  const click = () => {
    Taro.showToast({ title: help, icon: 'none' });
  };
  return (
    <View style={{ display: 'inline-block' }} onClick={click}>
      {typeof helpIcon === 'string' ? <Icon size={size} src={helpIcon} /> : helpIcon}
    </View>
  );
});


export const FormItem = connect(
  FormBaseItem,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      label: props.label || field.title,
      extra: props.extra || field.description,
      // @ts-ignore
      required: field.required,
    };
  }),
);
