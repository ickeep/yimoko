
import { TablePaginationConfig } from 'antd/lib/table';

export type IDfPagination = Required<Pick<TablePaginationConfig, 'pageSize' | 'size' | 'showQuickJumper' | 'showSizeChanger'>>;

export const DF_PAGINATION: IDfPagination = { pageSize: 20, size: 'small', showQuickJumper: true, showSizeChanger: true };
