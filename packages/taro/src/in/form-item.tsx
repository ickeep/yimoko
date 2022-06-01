import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { observer } from '@formily/reactive-react';
import Taro from '@tarojs/taro';
import classNames from 'classNames';
import { pickBy } from 'lodash-es';
import { useEffect, useState, CSSProperties } from 'react';

import { Icon } from '../out/icon';
import { Text } from '../out/text';
import { Value } from '../out/value';
import { ViewProps, View } from '../out/view';
import { downSize, getColorByStatus, IStatus, upSize } from '../props';
import { SchemaItemInheritProps, useSchemaInherit } from '../schema/context';
import { getCssSize } from '../tools/style';

import { Label } from './label';

export interface FormItemProps extends ViewProps {
  for?: string
  required?: boolean,
  label?: React.ReactNode
  help?: string
  extra?: React.ReactNode
  feedbackText?: string
  feedbackStatus?: IStatus
}

// eslint-disable-next-line complexity
export const FormBaseItem: React.FC<FormItemProps & SchemaItemInheritProps> = (props) => {
  const {
    required, for: lableID, className, children, extra, label, help,
    helpIcon, colon, layout, size, labelStyle, labelWidth, labelAlign, feedbackStatus, feedbackText,
    ...args
  } = props;
  const [lStyle, setLStyle] = useState<CSSProperties>({});
  const formInherit = useSchemaInherit();
  const [mergeProps, setMergePropss] = useState<SchemaItemInheritProps>({});

  useEffect(() => {
    const itemProps = pickBy({ colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size }, v => v !== undefined);
    setMergePropss({ ...formInherit, ...itemProps });
  }, [formInherit, colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size]);

  useEffect(() => {
    const style: CSSProperties = { ...labelStyle, textAlign: labelAlign ?? 'left' };
    typeof labelWidth !== 'undefined' && (style.width = getCssSize(labelWidth));
    setLStyle(style);
  }, [labelAlign, labelStyle, labelWidth]);

  const labelSize = layout !== 'vertical' ? upSize(mergeProps.size) : mergeProps.size;

  return (
    <View {...args} className={classNames('y-form-item', { [`y-form-item-${mergeProps.layout}`]: mergeProps.layout }, className)} >
      <Label
        for={lableID}
        style={lStyle}
        className={classNames('y-form-item-label', { [`y-form-item-label-${mergeProps.layout}`]: mergeProps.layout })}
      >
        {required && <Text size={labelSize} color="danger" >*</Text>}
        <Text size={labelSize}>{label}</Text>
        <Help help={help} helpIcon={mergeProps.helpIcon} size={labelSize} />
        {mergeProps.colon && <Text size={labelSize}>:</Text>}
      </Label>
      <View className='y-form-item-in'>
        {extra
          ? <View className='y-form-item-extra-box'>
            <View className='y-form-item-extra-in'>{children}</View>
            <Value classname="y-form-item-extra" value={extra} />
          </View>
          : <View>{children}</View>
        }
        <Feedback feedbackStatus={feedbackStatus} feedbackText={feedbackText} size={mergeProps.size} />
      </View>
    </View >
  );
};

const Help = observer((props: Pick<FormItemProps & SchemaItemInheritProps, 'help' | 'helpIcon' | 'size'>) => {
  const { size, help, helpIcon = 'help' } = props;
  if (!help) {
    return null;
  }
  const click = () => {
    Taro.showToast({ title: help, icon: 'none' });
  };
  return (
    <View className='y-form-item-help' onClick={click}>
      {typeof helpIcon === 'string' ? <Icon size={size} src={helpIcon} /> : helpIcon}
    </View>
  );
});

const Feedback = observer((props: Pick<FormItemProps & SchemaItemInheritProps, 'feedbackStatus' | 'feedbackText' | 'size'>) => {
  const { size, feedbackStatus, feedbackText } = props;
  if (!feedbackText) {
    return null;
  }
  const fSize = downSize(size);
  return (
    <View className='y-form-item-feedback'>
      <Icon src={feedbackStatus} size={fSize} />
      <Text size={fSize} color={getColorByStatus(feedbackStatus)}>{feedbackText}</Text>
    </View>
  );
});


export const FormItem = connect(
  FormBaseItem,
  mapProps((props, field) => {
    const getLable = () => field.title || props.label;
    if (isVoidField(field)) {
      return { label: getLable() };
    };
    if (!field) {
      return props;
    };
    const takeFeedbackStatus = () => {
      if (field.validating) return 'loading';
      return field.decoratorProps.feedbackStatus || field.validateStatus;
    };
    const takeMessage = () => {
      if (field.validating) return '';
      if (props.feedbackText) return props.feedbackText;
      const { selfErrors, selfWarnings, selfSuccesses } = field;
      const textArr = [selfErrors, selfWarnings, selfSuccesses].find(v => v && v.length > 0);
      return !textArr
        ? ''
        : textArr.reduce((buf, text, index) => {
          if (!text) return buf;
          return index < textArr.length - 1
            ? buf.concat([text, ', '])
            : buf.concat([text]);
        }, []);
    };
    return {
      label: getLable(),
      feedbackStatus: takeFeedbackStatus(),
      feedbackText: takeMessage(),
      required: props.required ?? field.required,
    };
  }),
);
