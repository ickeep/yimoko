import { observer } from '@formily/react';
import { ViewProps } from '@tarojs/components';
import classNames from 'classnames';
import { useState, useEffect, CSSProperties } from 'react';

import { getSystemInfo } from '../adapter/system';
import { Icon } from '../base/icon';
import { ISize } from '../props';
import { getCssSize } from '../tools/style';


export interface LoadingProps extends ViewProps {
  loading?: boolean;
  isFull?: boolean;
  iconSize?: ISize
  icon?: string
  style?: CSSProperties
}

// @ts-ignore
export const Loading = observer((props: LoadingProps) => {
  console.log('Loading', props);

  return null;

  // const { loading, isFull, icon = 'loading', iconSize, className, children, style, ...args } = props;

  // const [lStyle, setStyle] = useState<CSSProperties>();

  // useEffect(() => {
  //   if (!loading || !isFull) {
  //     setStyle(style);
  //   } else {
  //     getSystemInfo().then((res) => {
  //       if (res) {
  //         // 兼容 rn 和 h5
  //         const { windowHeight, pixelRatio } = res;
  //         setStyle({ height: getCssSize(windowHeight * pixelRatio) });
  //       }
  //     });
  //   }
  // }, [loading, isFull, style]);

  // if (!loading) {
  //   return children ?? null;
  // }

  // return (
  //   <View {...args} className={classNames('y-loading', { 'y-loading-full': isFull }, className)} style={lStyle}>
  //     <Icon name={icon} size={iconSize} />
  //   </View>
  // );
});

