import { Transition as TTransition } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Transition = connect(TTransition, mapProps({ value: 'show' }));
