import { useExpressionScope, observer, RecordsScope } from '@formily/react';
import { ListStore, getFieldSplitter, getFieldType, IPageData, useListData } from '@yimoko/store';
import { Table, TableProps } from 'antd';
import { ColumnType, TablePaginationConfig, ColumnsType } from 'antd/lib/table';
import { TableCurrentDataSource, FilterValue, SorterResult } from 'antd/lib/table/interface';
import { Key, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DF_PAGINATION } from '../config';
import { useTableColumns, useTableScroll } from '../out/table';

export type StoreTableProps<T extends object = Record<string, any>> = Omit<TableProps<T>, 'loading' | 'dataSource' | 'onChange' | 'ColumnsType'> & (
  { isControlled: false, store?: ListStore<any, T[]> } |
  { isControlled?: true, store?: ListStore<any, IPageData<T>> }
) & {
  onPage?: (pagination: TablePaginationConfig) => void | Promise<void>;
  onSort?: (pagination: SorterResult<T> | SorterResult<T>[]) => void | Promise<void>;
  onFilter?: (pagination: Record<string, FilterValue | null>) => void | Promise<void>;
  columns?: ColumnsType<T> | string[]
  defaultColumnsWidth?: number; // 自动计算 scroll.x 时的默认列宽
};

export const StoreTable: <T extends object = Record<string, any>>(props: StoreTableProps<T>) => React.ReactElement | null = observer((props) => {
  const { defaultColumnsWidth, isControlled = true, store, scroll, columns, pagination, rowSelection, onPage, onSort, onFilter, ...args } = props;
  const scope = useExpressionScope() ?? {};
  const { curStore } = scope;
  const curUseStore = store ?? curStore as ListStore<any, any>;
  const dataSource = useListData(store);
  const curColumns = useTableColumns(columns, curUseStore, dataSource);
  const location = useLocation();
  const nav = useNavigate();
  const {
    setValues, setValuesByField, runAPI, setSelectedRowKeys, getURLSearch,
    selectedRowKeys, response: { data } = {},
    isBindSearch, queryRoutingType,
    keysConfig: { total, page, pageSize, sortOrder },
  } = curUseStore;

  const curRowSelection = useMemo(() => ((rowSelection && isControlled)
    ? {
      ...rowSelection,
      selectedRowKeys,
      onChange: (keys: Key[], selectedRows: any[], info: any) => {
        rowSelection?.onChange?.(keys, selectedRows, info);
        setSelectedRowKeys?.(keys);
      },
    }
    : rowSelection
  ), [isControlled, rowSelection, selectedRowKeys, setSelectedRowKeys]);

  const curPagination = useMemo(() => {
    if (pagination === false) {
      return pagination;
    }
    const newPagination = { ...DF_PAGINATION, ...pagination };
    if (isControlled) {
      newPagination.pageSize = data?.[pageSize];
      newPagination.current = data?.[page];
      newPagination.total = data?.[total];
    }
    return newPagination;
  }, [data, isControlled, page, pageSize, pagination, total]);

  if (!curUseStore) {
    return null;
  }

  const curUseColumns = useMemo(() => curColumns.map((col) => {
    const filterProps = getFilterProps(col, curUseStore, isControlled);
    const sortProps = getSortProps(col, curUseStore, isControlled);
    return { ...col, ...filterProps, ...sortProps };
  }), [curColumns, curUseStore, isControlled]);

  const curScroll = useTableScroll(scroll, curUseColumns, defaultColumnsWidth);

  const queryData = () => {
    runAPI();
    setSelectedRowKeys();
    if (isBindSearch) {
      const { pathname, search } = location;
      const valSearch = getURLSearch();
      search !== `?${valSearch}` && nav(`${pathname}?${valSearch}`, { replace: queryRoutingType === 'replace' });
    }
  };

  const handlePagination = (pagination: TablePaginationConfig, extra: TableCurrentDataSource<any>) => {
    if (extra.action === 'paginate') {
      onPage?.(pagination);
      if (isControlled) {
        setValuesByField(page, pagination.current);
        setValuesByField(pageSize, pagination.pageSize);
        queryData();
      }
    }
  };

  const handleFilters = (filters: Record<string, FilterValue | null>, extra: TableCurrentDataSource<any>) => {
    if (extra.action === 'filter') {
      onFilter?.(filters);
      if (isControlled) {
        const newValues: Record<string, any> = { [page]: 1 };
        Object.entries(filters).forEach(([key, value]) => {
          let val: any = value;
          if (value !== null) {
            const type = getFieldType(key, curUseStore) ?? 'string';
            const splitter = getFieldSplitter(key, curUseStore);
            type === 'string' && (val = value.join(splitter));
          }
          newValues[key] = val;
        });
        setValues(newValues);
        queryData();
      }
    }
  };

  const handleSorter = (sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => {
    if (extra.action === 'sort') {
      onSort?.(sorter);
      if (isControlled) {
        const val: ISortOrder[] = [];
        (Array.isArray(sorter) ? sorter : [sorter]).forEach((item) => {
          const { field, order } = item;
          const key = `${field}`;
          typeof order === 'string' && val.push({ field: key, order });
        });
        setValuesByField(page, 1);
        setValuesByField(sortOrder, val);
        queryData();
      }
    }
  };

  return (
    <RecordsScope getRecords={() => dataSource}>
      <Table
        rowKey="id"
        size='small'
        {...args}
        scroll={curScroll}
        loading={curUseStore.loading}
        columns={curUseColumns}
        dataSource={dataSource}
        rowSelection={curRowSelection}
        pagination={curPagination}
        onChange={(pagination, filters, sorter, extra) => {
          handlePagination(pagination, extra);
          handleFilters(filters, extra);
          handleSorter(sorter, extra);
        }}
      />
    </RecordsScope>
  );
});

export const getFilterProps = (col: ColumnType<any>, store: ListStore<any, any>, isControlled?: boolean) => {
  const { dict } = store;
  const props: ColumnType<any> = {};
  const { filterMultiple, filters, dataIndex } = col;
  if (typeof filterMultiple !== 'undefined') {
    const field = `${dataIndex}`;
    props.filters = filters ?? (dict[field]?.map?.((item: Record<string, any>) => ({ text: item.label, value: item.value })));
    isControlled && (props.filteredValue = getFilteredValue(field, store));
  }
  return props;
};

export const getFilteredValue = (field: string, store: ListStore<any, any>) => {
  const { values } = store;
  const val = values[field];
  if (Array.isArray(val)) {
    return val;
  } if (typeof val === 'string' && val) {
    return val.split(getFieldSplitter(field, store));
  }
  return null;
};

export const getSortProps = (col: ColumnType<any>, store: ListStore<any, any>, isControlled?: boolean) => {
  const { values, keysConfig } = store;
  if (isControlled) {
    const { sorter, dataIndex } = col;
    if (sorter) {
      const val = values[keysConfig.sortOrder]?.find?.((item: ISortOrder) => item.field === `${dataIndex}`);
      return { sortOrder: val?.order };
    }
  }
  return {};
};
export interface ISortOrder {
  field: string,
  order: 'ascend' | 'descend' | false
}
