import { Progress as TProgress } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Progress = connect(TProgress, mapProps({ value: 'percentage' }));
