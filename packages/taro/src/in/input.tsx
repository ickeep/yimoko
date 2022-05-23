import { observer } from '@formily/reactive-react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
import { useState, CSSProperties, useEffect } from 'react';

import { useTheme } from '../store/theme';
import { getCssSize } from '../tools/style';

export interface InputProps extends TInputProps {
  onChange?: (value?: string) => void
  style?: CSSProperties
}

export const Input = observer((props: InputProps) => {
  const { onChange, onInput, style, ...args } = props;
  const { fontSizeBase, textColor } = useTheme();
  const [tStyle, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle({
      color: textColor,
      ...style, fontSize:
        getCssSize(style?.fontSize ?? fontSizeBase),
    });
  }, [textColor, style, fontSizeBase]);
  return <TInput {...args} style={tStyle} onInput={(e) => {
    onInput?.(e);
    onChange?.(e.detail.value);
  }} />;
});
