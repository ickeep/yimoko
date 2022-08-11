import { observer } from '@formily/react';
import { Map as TMap, MapProps as TMapProps } from '@tarojs/components';

// todo 适配选坐标输入
export interface MapProps extends TMapProps {
  onChange?: (v: string) => void
}

export const Map = observer((props: MapProps) => {
  const { onChange, ...args } = props;
  return <TMap {...args} ></TMap>;
});
