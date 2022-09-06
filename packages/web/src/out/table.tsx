import { RecordScope, RecursionField, RecordsScope, observer, Schema, useExpressionScope } from '@formily/react';
import { IStore, judgeIsEmpty, ListStore, useDeepMemo, useSchemaItems } from '@yimoko/store';
import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { get } from 'lodash-es';
import { DataIndex } from 'rc-table/lib/interface';
import { useMemo } from 'react';

type IColumn<T extends object = Record<string, any>> = ColumnsType<T>[number] & {
  isFilterContains?: boolean,
  filterSplitter?: string
};
type IColumns<T extends object = Record<string, any>> = IColumn<T>[];

export interface TableDisplayProps<T extends object = Record<string, any>> extends Omit<TableProps<T>, 'columns'> {
  value: TableProps<T>['dataSource'];
  defaultColumnsWidth?: number; // 自动计算 scroll.x 时的默认列宽
  columns?: IColumns<T> | string[]
  store?: ListStore<any, T[]>
}

export const TableDisplay: <T extends object = Record<string, any>>(props: TableDisplayProps<T>) => React.ReactElement | null = observer((props) => {
  const { defaultColumnsWidth, scroll, value, columns, dataSource, store, ...args } = props;
  const scope = useExpressionScope() ?? {};
  const { curStore } = scope;
  const curUseStore = store ?? curStore as ListStore<any, any>;
  const { listData } = curUseStore;

  const curDataSource = useMemo(() => {
    const val = !judgeIsEmpty(dataSource) ? dataSource : (value ?? listData);
    return Array.isArray(val) ? val : [];
  }, [dataSource, listData, value]) as any[];
  const curColumns = useTableColumns<any>(columns, curUseStore);

  const curScroll = useTableScroll(scroll, curColumns, defaultColumnsWidth);


  return (
    <RecordsScope getRecords={() => curDataSource}>
      <Table rowKey="id" size='small' {...args} scroll={curScroll} columns={curColumns} dataSource={curDataSource} />
    </RecordsScope>
  );
});


export const getColumnsForSchema = (items: Schema[], store?: IStore) => {
  const tmpColumns: IColumns = [];
  items.forEach((item) => {
    const { title, name, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = item;
    const field = name;
    const getTitle = () => title ?? store?.fieldsConfig?.[`${field}`]?.title ?? field;
    const col: IColumns[number] = { title: getTitle(), dataIndex: field, ...colProps };

    if (component) {
      col.render = (v, r, i) => (
        <RecordScope getRecord={() => r ?? {}} getIndex={() => i ?? 0}>
          <RecursionField schema={{ ...colSchema, name, 'x-component': component }} name={`${i}.${field}`} />
        </RecordScope>
      );
    }
    tmpColumns.push(col);
  });
  return tmpColumns;
};

export const useTableColumns = <T extends object = Record<string, any>>(columns?: IColumns<T> | string[], store?: IStore, data?: T[]) => {
  const curItems = useSchemaItems();
  const dataIndexToKey = (dataIndex: DataIndex) => (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex) as string | number;

  const mixColumns = useMemo(() => {
    const tmpColumns: IColumns<T> = [];
    const getTitle = (field?: string, title?: string) => title ?? store?.fieldsConfig?.[`${field}`]?.title ?? field;

    columns?.forEach((item) => {
      !judgeIsEmpty(item) && tmpColumns.push(typeof item === 'string'
        ? { title: getTitle(item), dataIndex: item }
        // @ts-ignore
        : { title: getTitle(item.dataIndex, item.title), ...item });
    });

    return [...tmpColumns, ...getColumnsForSchema(curItems, store)];
  }, [columns, curItems, store]);

  const fields = useMemo(() => {
    const arr: Array<Pick<IColumn, 'isFilterContains' | 'filterSplitter'> & { 'dataIndex': DataIndex }> = [];
    mixColumns?.forEach(((item) => {
      if (typeof item.filterMultiple !== 'undefined' && typeof item.onFilter !== 'undefined' && 'dataIndex' in item) {
        arr.push({
          dataIndex: item.dataIndex ?? '',
          isFilterContains: item.isFilterContains,
          filterSplitter: item.filterSplitter,
        });
      }
    }));
    return arr;
  }, [mixColumns]);

  const filtersMap = useDeepMemo(() => {
    const obj: Record<string, ColumnFilterItem[]> = {};
    const hash: Record<string, Record<string, boolean>> = {};
    fields.forEach((field) => {
      const key = dataIndexToKey(field.dataIndex);
      obj[key] = [];
      hash[key] = {};
    });

    data?.forEach((item) => {
      // eslint-disable-next-line complexity
      fields.forEach((field) => {
        const { dataIndex, isFilterContains, filterSplitter = ',' } = field;
        const key = dataIndexToKey(dataIndex);
        const val = get(item, key);
        if (!judgeIsEmpty(val)) {
          if (isFilterContains) {
            let arr: any[];
            if (typeof val === 'string') {
              arr = val.split(filterSplitter);
            } else {
              arr = Array.isArray(val) ? val : [];
            }
            arr.forEach((v) => {
              if (!hash[key][v]) {
                hash[key][v] = true;
                obj[key].push({ text: v, value: v });
              }
            });
          } else if (!hash[key][val]) {
            obj[key].push({ text: val, value: val });
            hash[key][val] = true;
          }
        }
      });
    });
    return obj;
  }, [data, fields]);

  return useMemo(() => mixColumns?.map((item) => {
    const { isFilterContains, filterSplitter = ',', ...args } = item;
    const newCol = args;
    if (typeof newCol.filterMultiple !== 'undefined' && typeof newCol.onFilter !== 'undefined' && 'dataIndex' in newCol && newCol.dataIndex) {
      const key = dataIndexToKey(newCol.dataIndex);
      newCol.filters = filtersMap[key];
      newCol.onFilter = (value: any, record: T) => {
        const val = get(record, key);
        if (isFilterContains) {
          if (typeof val === 'string') {
            return val.split(filterSplitter).includes(value);
          }
          return Array.isArray(val) && val.includes(value);
        }
        return val === value;
      };
    }
    return newCol;
  }), [filtersMap, mixColumns]);
};

export const useTableScroll = (scroll: TableProps<any>['scroll'], columns: TableProps<any>['columns'], defaultColumnsWidth = 120) => useMemo(() => {
  if (scroll?.x) {
    return scroll;
  }
  let width = 0;
  columns?.forEach(col => width += (Number(col.width ?? defaultColumnsWidth)));
  return {
    ...scroll,
    x: width,
  };
}, [columns, defaultColumnsWidth, scroll]);

