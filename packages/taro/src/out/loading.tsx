import { observer } from '@formily/reactive-react';
import classNames from 'classNames';
import { useState, useEffect, CSSProperties } from 'react';

import { getSystemInfo } from '../adapter/system';
import { ISize } from '../props';
import { getCssSize } from '../tools/style';

import { Icon } from './icon';
import { View, ViewProps } from './view';

export interface LoadingProps extends ViewProps {
  loading?: boolean;
  isFull?: boolean;
  iconSize?: ISize
  icon?: string
  style?: CSSProperties
}

// @ts-ignore
export const Loading = observer((props: LoadingProps) => {
  const { loading, isFull, icon = 'loading', iconSize, className, children, style, ...args } = props;

  const [lStyle, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    if (!loading || !isFull) {
      setStyle(style);
    } else {
      getSystemInfo().then((res) => {
        if (res) {
          // 兼容 rn 和 h5
          const { windowHeight, pixelRatio } = res;
          setStyle({ height: getCssSize(windowHeight * pixelRatio) });
        }
      });
    }
  }, [loading, isFull, style]);

  if (!loading) {
    return children ?? null;
  }

  return (
    <View {...args} className={classNames('y-loading', { 'y-loading-full': isFull }, className)} style={lStyle}>
      <Icon src={icon} size={iconSize} />
    </View>
  );
});

