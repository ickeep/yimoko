import { Pagination as TPagination } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Pagination = connect(TPagination, mapProps({ value: 'modelValue' }));
