import { connect, mapProps } from '@formily/react';
import { Ad as TAd } from '@tarojs/components';

export const Ad = connect(TAd, mapProps({ value: 'unitId' }));
