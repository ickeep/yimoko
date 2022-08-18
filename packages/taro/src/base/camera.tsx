import { observer } from '@formily/react';
import { Camera as TCamera, CameraProps as TCameraProps } from '@tarojs/components';

// todo 适配扫码输入 扫码跳转两种场景
export interface CameraProps extends TCameraProps {
  onChange?: (v: string) => void
}

export const Camera = observer((props: CameraProps) => {
  const { onChange, ...args } = props;


  return <TCamera {...args} ></TCamera>;
});
