import { connect, mapProps } from '@formily/react';
import { Video as TVideo } from '@tarojs/components';

export const Video = connect(TVideo, mapProps({ value: 'src' }));
