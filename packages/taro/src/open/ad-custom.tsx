import { connect, mapProps } from '@formily/react';
import { AdCustom as TAdCustom } from '@tarojs/components';

export const AdCustom = connect(TAdCustom, mapProps({ value: 'unitId' }));
