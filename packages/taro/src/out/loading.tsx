import { Loading as Tloading } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { ViewProps } from '@tarojs/components';
import cls from 'classnames';

import { View } from '../base/view';

export interface LoadingProps extends ViewProps {
  value?: boolean;
  loading?: boolean;
  isFull?: boolean;

}

// @ts-ignore
export const Loading = observer((props: LoadingProps) => {
  console.log('Loading', props);


  const { loading, value, isFull, className, children, ...args } = props;

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

  return (
    <View {...args} className={cls('y-loading', { 'y-loading--full': isFull }, className)} >
    </View>
  );
});

