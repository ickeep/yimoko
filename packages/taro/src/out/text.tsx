import { observer } from '@formily/reactive-react';
import { Text as TText, TextProps as TTextProps } from '@tarojs/components';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import { useTheme } from '../store/theme';
import { getCssSize } from '../tools/style';

export interface TextProps extends TTextProps {
  value?: ReactNode
  children?: ReactNode,
  style?: CSSProperties
}

export const Text = observer((props: TextProps) => {
  const { style, value, children, ...args } = props;
  const { fontSizeBase, textColor } = useTheme();
  const [tStyle, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle({
      color: textColor,
      ...style, fontSize:
        getCssSize(style?.fontSize ?? fontSizeBase),
    });
  }, [textColor, style, fontSizeBase]);

  return <TText {...args} style={tStyle} >{value ?? children}</TText>;
});
