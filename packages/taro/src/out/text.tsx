import { observer } from '@formily/reactive-react';
import { Text as TText, TextProps as TTextProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import { IColor, ISize } from '../props';

export interface TextProps extends TTextProps {
  size?: ISize
  color?: IColor,
  value?: ReactNode
  children?: ReactNode,
}

export const Text = observer((props: TextProps) => {
  const { className, size, value, children, color, ...args } = props;
  const [cn, setCn] = useState('');

  useEffect(() => {
    setCn(classNames('y-text', { [`y-text-${size}`]: size, [`y-text-${color}`]: color }, className));
  }, [className, size, color]);

  // @ts-ignore
  return <TText {...args} className={cn}  >{value ?? children}</TText>;
});
