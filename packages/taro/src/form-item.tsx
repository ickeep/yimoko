import { connect, mapProps } from '@formily/react';
import { View, ViewProps, Text, Label } from '@tarojs/components';

import React, { useEffect, useState, CSSProperties } from 'react';

export interface IFormItemProps extends ViewProps {
  style?: CSSProperties
  label?: React.ReactNode
  colon?: boolean
  help?: React.ReactNode
  helpIcon?: React.ReactNode
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelStyle?: CSSProperties
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number | string
  size?: 'small' | 'default' | 'large'
  inset?: boolean
  extra?: React.ReactNode
  children?: React.ReactNode
}

export const FormBaseItem: React.FC<IFormItemProps> = (props) => {
  const { style, label, colon = false, labelStyle, labelWidth, labelAlign, children, extra, ...args } = props;
  const [vStyle, setVStyle] = useState<CSSProperties>({});
  const [lStyle, setLStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const wStyle: CSSProperties = { ...style };
    setVStyle(wStyle);
  }, [style]);

  useEffect(() => {
    const style: CSSProperties = { ...labelStyle, textAlign: labelAlign ?? 'left' };
    typeof labelWidth !== 'undefined' && (style.width = labelWidth);
    setLStyle(style);
  }, [labelAlign, labelStyle, labelWidth]);

  console.log(args);

  return (
    <View {...args} style={vStyle}>
      <Label style={lStyle}>
        <Text>{label}{colon && ':'}</Text>
        <View>{children}</View>

      </Label>

      {extra && <View>{extra}</View>}
    </View>
  );
};


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
