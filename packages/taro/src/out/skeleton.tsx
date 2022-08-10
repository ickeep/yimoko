import { Skeleton as TSkeleton } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Skeleton = connect(TSkeleton, mapProps({ value: 'loading' }));
