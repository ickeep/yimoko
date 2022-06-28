import { observer } from '@formily/reactive-react';
import { Label as TLabel, LabelProps as TLabelProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode } from 'react';
export interface LabelProps extends TLabelProps {
  value?: ReactNode
  children?: ReactNode,
}

export const Label = observer((props: LabelProps) => {
  const { value, children, className, ...args } = props;

  return <TLabel {...args} className={classNames('y-label', className)} >{value ?? children}</TLabel>;
});
