
import { TablePaginationConfig } from 'antd/lib/table';

export type IDfPagination = Required<Pick<TablePaginationConfig, 'defaultPageSize' | 'size' | 'showQuickJumper' | 'showSizeChanger'>>;

export const DF_PAGINATION: IDfPagination = { defaultPageSize: 20, size: 'small', showQuickJumper: true, showSizeChanger: true };
