import { connect, mapProps } from '@formily/react';
import { LivePusher as TLivePusher } from '@tarojs/components';

export const LivePusher = connect(TLivePusher, mapProps({ value: 'url' }));
