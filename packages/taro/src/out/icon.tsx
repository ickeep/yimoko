import { Icon as TIcon } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Icon = connect(TIcon, mapProps({ value: 'name' }));
