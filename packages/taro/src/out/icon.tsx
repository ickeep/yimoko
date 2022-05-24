import { observer } from '@formily/react';
import { Image, ImageProps } from '@tarojs/components';
import classNames from 'classnames';

import { ISize } from '../props';
import { useConfigItme } from '../store/config';

export interface IconProps extends Omit<ImageProps, 'src'> {
  src?: string
  size?: ISize
}

export const Icon = observer((props: IconProps) => {
  const staticConfig = useConfigItme('static');
  const { src, size, ...args } = props;

  if (!src) {
    return null;
  }

  return (
    <Image
      {...args}
      className={classNames('y-icon', size && `y-icon-${size}`)}
      src={staticConfig.icon + src + (src?.indexOf('.') > 0 ? '' : '.png')} />
  );
});
