import { observer } from '@formily/react';
import { Image, ImageProps } from '@tarojs/components';
import { CSSProperties, useEffect, useState } from 'react';

import { ISize } from '../props';
import { useConfigItme } from '../store/config';
import { useTheme } from '../store/theme';
import { getCssSize } from '../tools/style';

export interface IconProps extends Omit<ImageProps, 'src'> {
  src?: string
  style?: CSSProperties
  size?: ISize
}

export const Icon = observer((props: IconProps) => {
  const theme = useTheme();
  const staticConfig = useConfigItme('static');
  const { src, size = 'default', style, ...args } = props;
  const [iStyle, setStyle] = useState<CSSProperties>({});
  const { iconSizeMedium, iconSizeSmall, iconSizeLarge } = theme;

  useEffect(() => {
    const sizeMap = {
      default: iconSizeMedium,
      small: iconSizeSmall,
      medium: iconSizeMedium,
      large: iconSizeLarge,
    };
    const themeWidth = sizeMap[size];

    const width = getCssSize(style?.width ?? themeWidth);
    const height = getCssSize(style?.height ?? themeWidth);
    setStyle({ width, height, position: 'relative', top: getCssSize(4), ...style });
  }, [iconSizeLarge, iconSizeMedium, iconSizeSmall, size, style]);

  if (!src) {
    return null;
  }

  return <Image {...args} src={staticConfig.icon + src + (src?.indexOf('.') > 0 ? '' : '.png')} style={iStyle} />;
});
