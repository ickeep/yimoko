import { connect, mapProps } from '@formily/react';
import { LivePlayer as TLivePlayer } from '@tarojs/components';

export const LivePlayer = connect(TLivePlayer, mapProps({ value: 'src' }));
