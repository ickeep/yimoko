import { Button as TButton } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { ButtonProps as TButtonProps } from '@taroify/core/button';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { Ilayout } from '../props';
export interface ButtonProps extends TButtonProps {
  layout?: Ilayout
  value?: ReactNode
  children?: ReactNode,
}

export const Button = observer((props: ButtonProps) => {
  const { value, children, className, layout, ...args } = props;

  // @ts-ignore
  return <TButton {...args} className={classNames('y-view', { [`y-view-${layout}`]: layout }, className)} >{value ?? children}</TButton>;
});
