import { RecordScope, RecursionField, RecordsScope, observer, Schema, useExpressionScope } from '@formily/react';
import { IStore, judgeIsEmpty, ListStore, useSchemaItems } from '@yimoko/store';
import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';


export interface TableDisplayProps<T extends object = Record<string, any>> extends Omit<TableProps<T>, 'columns'> {
  value: TableProps<T>['dataSource'];
  defaultColumnsWidth?: number; // 自动计算 scroll.x 时的默认列宽
  columns?: ColumnsType<T> | string[]
  store?: ListStore<any, T[]>
}

export const TableDisplay: <T extends object = Record<string, any>>(props: TableDisplayProps<T>) => React.ReactElement | null = observer((props) => {
  const { defaultColumnsWidth, scroll, value, columns, dataSource, store, ...args } = props;
  const scope = useExpressionScope() ?? {};
  const { curStore } = scope;
  const curUseStore = store ?? curStore as ListStore<any, any>;
  const curColumns = useTableColumns(columns, curUseStore);
  const curDataSource = useMemo(() => {
    const val = !judgeIsEmpty(dataSource) ? dataSource : value;
    return Array.isArray(val) ? val : [];
  }, [dataSource, value]) as any[];

  const curScroll = useTableScroll(scroll, curColumns, defaultColumnsWidth);

  return (
    <RecordsScope getRecords={() => curDataSource}>
      <Table rowKey="id" size='small' {...args} scroll={curScroll} columns={curColumns} dataSource={curDataSource} />
    </RecordsScope>
  );
});

type IColumns = ColumnsType<any>;

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

export const useTableColumns = (columns?: ColumnsType<any> | string[], store?: IStore) => {
  const curItems = useSchemaItems();
  return useMemo(() => {
    const tmpColumns: IColumns = [];
    const getTitle = (field?: string, title?: string) => title ?? store?.fieldsConfig?.[`${field}`]?.title ?? field;

    columns?.forEach((item) => {
      !judgeIsEmpty(item) && tmpColumns.push(typeof item === 'string'
        ? { title: getTitle(item), dataIndex: item }
        // @ts-ignore
        : { title: getTitle(item.dataIndex, item.title), ...item });
    });

    return [...tmpColumns, ...getColumnsForSchema(curItems, store)];
  }, [columns, curItems, store]);
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
