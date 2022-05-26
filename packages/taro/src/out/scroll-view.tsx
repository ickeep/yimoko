import { observer } from '@formily/reactive-react';
import { ScrollView as TScrollView, ScrollViewProps as TScrollViewProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import { ISize } from '../props';

export interface ScrollViewProps extends TScrollViewProps {
  size?: ISize
  value?: ReactNode
  children?: ReactNode,
}

export const ScrollView = observer((props: ScrollViewProps) => {
  const { className, size, value, children, ...args } = props;
  const [cn, setCn] = useState('');

  useEffect(() => {
    setCn(classNames('y-scroll-view', { [`y-scroll-view-${size}`]: size }, className));
  }, [className, size]);

  // @ts-ignore
  return <TScrollView {...args} className={cn}  >{value ?? children}</TScrollView>;
});
