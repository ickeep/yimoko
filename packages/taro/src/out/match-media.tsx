import { observer } from '@formily/react';
import { MatchMedia as TMatchMedia, MatchMediaProps as TMatchMediaProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import { ISize } from '../props';

export interface MatchMediaProps extends TMatchMediaProps {
  size?: ISize
  value?: ReactNode
  children?: ReactNode,
}

export const MatchMedia = observer((props: MatchMediaProps) => {
  const { className, size, value, children, ...args } = props;
  const [cn, setCn] = useState('');

  useEffect(() => {
    setCn(classNames('y-match-media', { [`y-match-media-${size}`]: size }, className));
  }, [className, size]);

  return <TMatchMedia {...args} className={cn}  >{value ?? children}</TMatchMedia>;
});
