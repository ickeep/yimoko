import { useExpressionScope, useFieldSchema, observer, RecordsScope, RecordScope, RecursionField } from '@formily/react';
import { BaseStore, IPageData, JSONStringify } from '@yimoko/store';
import { components } from '@yimoko/web';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useMemo } from 'react';

import { LoadTemplate } from './components/load-template';

export const Test = observer((props: any) => {
  const { value, children } = props;
  return (
    <>
      <div>value:{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</div>
      <div>children: {children}</div>
    </>
  );
});

export type StoreTableProps<T extends object = Record<string, any>> = Omit<TableProps<T>, 'loading' | 'dataSource'> & (
  { isControlled: false, store?: BaseStore<any, T[]> } |
  { isControlled?: true, store?: BaseStore<any, IPageData<T>> }
);

function StoreTableBase<T extends object = Record<string, any>>(props: StoreTableProps<T>) {
  const { store, columns, ...args } = props;
  const scope = useExpressionScope();
  const schema = useFieldSchema();

  const { curStore } = scope;

  const storeInUse = useMemo(() => store ?? curStore, [curStore, store]) as BaseStore<any, IPageData<T> | T[]>;

  const { response } = storeInUse ?? {};

  const dataSource = useMemo(() => {
    if (Array.isArray(response?.data)) {
      return response?.data;
    }
    return response?.data?.data ?? [];
  }, [response?.data]);

  const curColumns = useMemo(() => (columns ? columns : Object.entries(schema?.properties ?? {}).map(([key, value]) => {
    const { title = key, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = value;
    const col: ColumnType<T> = { title, dataIndex: key, ...colProps };

    if (component) {
      col.render = (v, r, i) => (
        <RecordScope getRecord={() => r ?? {}} getIndex={() => i}>
          <RecursionField schema={{ ...colSchema, 'x-component': component }} name={`${i}.${key}`} />
        </RecordScope>
      );
    }
    return col;
  })), [columns, schema?.properties]);


  return !storeInUse ? null : (
    <RecordsScope getRecords={() => dataSource}>
      <Table rowKey="id" size='small' {...args} loading={storeInUse.loading} columns={curColumns} dataSource={dataSource} />
    </RecordsScope>
  );
}

export const StoreTable = observer(StoreTableBase);

export const componentsMap = {
  ...components,
  Test,
  LoadTemplate,
  StoreTable,
};


