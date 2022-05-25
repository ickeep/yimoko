import { observer } from '@formily/reactive-react';
import { View as TView, ViewProps as TViewProps } from '@tarojs/components';
import classNames from 'classNames';
import { ReactNode } from 'react';

import { Ilayout } from '../props';
export interface ViewProps extends TViewProps {
  layout?: Ilayout
  value?: ReactNode
  children?: ReactNode,
}

export const View = observer((props: ViewProps) => {
  const { value, children, className, layout, ...args } = props;

  return <TView {...args} className={classNames('y-view', { [`y-view-${layout}`]: layout }, className)} >{value ?? children}</TView>;
});
