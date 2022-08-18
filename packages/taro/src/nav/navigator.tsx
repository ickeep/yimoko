import { connect, mapProps } from '@formily/react';
import { Navigator as TNavigator } from '@tarojs/components';

export const Navigator = connect(TNavigator, mapProps({ value: 'url' }));
