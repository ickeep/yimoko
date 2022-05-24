import { observer } from '@formily/reactive-react';
import { Text as TText, TextProps as TTextProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { ISize } from '../props';


export interface TextProps extends TTextProps {
  size?: ISize
  value?: ReactNode
  children?: ReactNode,
}

export const Text = observer((props: TextProps) => {
  const { className, size, value, children, ...args } = props;

  return <TText {...args} className={classNames('y-text', size && `y-text-${size}`, className)}  >{value ?? children}</TText>;
});
