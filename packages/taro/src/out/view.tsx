import { observer } from '@formily/reactive-react';
import { View as TView, ViewProps as TViewProps } from '@tarojs/components';
import classNames from 'classNames';
import { ReactNode } from 'react';
export interface ViewProps extends TViewProps {
  value?: ReactNode
  children?: ReactNode,
}

export const View = observer((props: ViewProps) => {
  const { value, children, className, ...args } = props;

  return <TView {...args} className={classNames('y-view', className)} >{value ?? children}</TView>;
});
