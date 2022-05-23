import { observer } from '@formily/reactive-react';
import { View as TView, ViewProps as TViewProps } from '@tarojs/components';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

export interface ViewProps extends TViewProps {
  value?: ReactNode
  children?: ReactNode,
  style?: CSSProperties
}

export const View = observer((props: ViewProps) => {
  const { style, value, children, ...args } = props;
  const [tStyle, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle({
      display: 'flex',
      flexDirection: 'column',
      ...style,
    });
  }, [style]);

  return <TView {...args} style={tStyle} >{value ?? children}</TView>;
});
