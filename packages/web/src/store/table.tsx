
import { useExpressionScope, useFieldSchema, observer, RecordsScope } from '@formily/react';
import { ListStore, getFieldSplitter, getFieldType, IPageData, useListData } from '@yimoko/store';
import { Table, TableProps } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import { TableCurrentDataSource, FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DF_PAGINATION } from '../config';

import { getColumnsForSchema } from '../out/table';

export type StoreTableProps<T extends object = Record<string, any>> = Omit<TableProps<T>, 'loading' | 'dataSource'> & (
  { isControlled: false, store?: ListStore<any, T[]> } |
  { isControlled?: true, store?: ListStore<any, IPageData<T>> }
);

function StoreTableBase<T extends object = Record<string, any>>(props: StoreTableProps<T>) {
  const { store, isControlled = true, columns, onChange, pagination, ...args } = props;
  const scope = useExpressionScope();
  const schema = useFieldSchema();
  const dataSource = useListData(store);
  const curColumns = useMemo(() => (columns ? columns : getColumnsForSchema(schema)), [columns, schema]);
  const location = useLocation();
  const nav = useNavigate();
  const { curStore } = scope;
  const curUseStore = store ?? curStore as ListStore<any, any>;
  const {
    setValuesByField, runAPI, setSelectedRowKeys, getURLSearch,
    response: { data } = {},
    isBindSearch, queryRoutingType,
    keysConfig: { total, page, pageSize, sortOrder },
  } = curUseStore;

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

  const curUseColumns = curColumns.map((col) => {
    const filterProps = getFilterProps(col, curUseStore, isControlled);
    const sortProps = getSortProps(col, curUseStore, isControlled);
    return { ...col, ...filterProps, ...sortProps };
  });

  const queryData = () => {
    runAPI();
    setSelectedRowKeys();
    console.log('isBindSearch', isBindSearch);

    if (isBindSearch) {
      const { pathname, search } = location;
      const valSearch = getURLSearch();
      search !== valSearch && nav(`${pathname}?${valSearch}`, { replace: queryRoutingType === 'replace' });
    }
  };

  const handlepagination = (pagination: TablePaginationConfig, extra: TableCurrentDataSource<T>) => {
    if (extra.action === 'paginate') {
      setValuesByField(page, pagination.current);
      setValuesByField(pageSize, pagination.pageSize);
      queryData();
    }
  };

  const handleFilters = (filters: Record<string, FilterValue | null>, extra: TableCurrentDataSource<T>) => {
    if (extra.action === 'filter') {
      Object.entries(filters).forEach(([key, value]) => {
        let val: any = value;
        if (value !== null) {
          const type = getFieldType(key, curUseStore) ?? 'string';
          const splitter = getFieldSplitter(key, curUseStore);
          type === 'string' && (val = value.join(splitter));
        }
        setValuesByField(page, 1);
        setValuesByField(key, val);
        queryData();
      });
    }
  };

  const handleSorter = (sorter: SorterResult<T> | SorterResult<T>[], extra: TableCurrentDataSource<T>) => {
    if (extra.action === 'sort') {
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
  };

  return (
    <RecordsScope getRecords={() => dataSource}>
      <Table
        rowKey="id"
        size='small'
        {...args}
        loading={curUseStore.loading}
        columns={curUseColumns}
        dataSource={dataSource}
        pagination={curPagination}
        onChange={(pagination, filters, sorter, extra) => {
          onChange?.(pagination, filters, sorter, extra);
          if (isControlled) {
            handlepagination(pagination, extra);
            handleFilters(filters, extra);
            handleSorter(sorter, extra);
          }
        }}
      />
    </RecordsScope>
  );
}

export const StoreTable = observer(StoreTableBase);

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
