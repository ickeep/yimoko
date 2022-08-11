import { connect, mapProps } from '@formily/react';
import { CoverImage as TCoverImage } from '@tarojs/components';

export const CoverImage = connect(TCoverImage, mapProps({ value: 'src' }));
