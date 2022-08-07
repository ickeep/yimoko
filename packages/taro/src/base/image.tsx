import { Image as TImage } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Image = connect(TImage, mapProps({ value: 'src' }));
