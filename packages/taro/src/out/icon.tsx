import { observer } from '@formily/reactive-react';
import { Image, ImageProps } from '@tarojs/components';
import classNames from 'classnames';

import { ISize } from '../props';
import { useConfigItme } from '../store/config';

export interface IconProps extends Omit<ImageProps, 'src'> {
  value?: string
  src?: string
  size?: ISize
}

export const Icon = observer((props: IconProps) => {
  const staticConfig = useConfigItme('static');
  const { value, src, size, ...args } = props;
  const val = value ?? src;

  if (!val) {
    return null;
  }

  return (
    <Image
      {...args}
      mode="aspectFit"
      className={classNames('y-icon', { [`y-icon-${size}`]: size })}
      src={staticConfig.icon + val + (val?.indexOf('.') > 0 ? '' : '.png')}
    />
  );
});
