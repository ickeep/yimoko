import { createForm } from '@formily/core';
import { RecordScope, RecordsScope, RecursionField, useExpressionScope, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { BaseStore, IPageData, JSONStringify, useSchemaComponents, useSchemaField } from '@yimoko/store';
import { components, SchemaBox } from '@yimoko/web';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { get } from 'lodash-es';
import { useMemo } from 'react';

import { LoadTemplate } from './components/load-template';

export const Test = observer((props: any) => {
  const { value, children } = props;
  return (
    <div>
      <p>value:{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</p>
      <p>children: {children}</p>
    </div >
  );
});

export type StoreTableProps<T extends object = Record<string, any>> = Omit<TableProps<T>, 'loading' | 'dataSource' | 'onChange'> & (
  { isControlled: false, store?: BaseStore<any, T[]> } |
  { isControlled?: true, store?: BaseStore<any, IPageData<T>> }
);

export const RedirectValues = (props: any) => {
  const { values } = props;
  const scope = useExpressionScope();
  const schema = useFieldSchema();
  const { properties } = schema?.toJSON();
  const curComponents = useSchemaComponents();
  const SchemaField = useSchemaField(curComponents, scope);
  const model = useMemo(() => createForm({ values: { values } }), [values]);

  return (
    <SchemaBox model={model} >
      <SchemaField schema={{ type: 'object', properties: { values: { type: typeof values, properties } } }} />
    </SchemaBox>
  );
};

export function StoreTableFn<T extends object = Record<string, any>>(props: StoreTableProps<T>) {
  const { store } = props;
  const scope = useExpressionScope();
  const curComponents = useSchemaComponents();
  const SchemaField = useSchemaField(curComponents, scope);

  const { curStore } = scope;

  const storeInUse = useMemo(() => store ?? curStore, [curStore, store]) as BaseStore<any, IPageData<T> | T[]>;

  const { response } = storeInUse ?? {};

  const dataSource = useMemo(() => {
    if (Array.isArray(response?.data)) {
      return response?.data;
    }
    return response?.data?.data ?? [];
  }, [response?.data]);

  const model = useMemo(() => createForm({ values: { table: dataSource } }), [dataSource]);
  const schema = useFieldSchema();
  const { properties, 'x-component-props': componentProps } = schema.toJSON();

  return !storeInUse ? null : (
    <SchemaBox model={model} >
      <SchemaField schema={{
        type: 'object',
        properties: {
          table: {
            type: 'string', 'x-component': 'Table', properties, 'x-component-props': { ...componentProps, loading: '{{curStore.loading}}' },
          },
        },
      }} />
    </SchemaBox>
  );
}

export const StoreTable = observer(StoreTableFn);

export const SchemaTable = observer((props: any) => {
  const { value, ...args } = props;
  const schema = useFieldSchema();

  const columns = useMemo(() => Object.entries(schema?.properties ?? {}).map(([key, value]) => {
    const { title = key, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = value;
    const col: ColumnType<any> = { title, dataIndex: key, ...colProps };

    if (component) {
      col.render = (v, r, i) => (
        <RecordScope getRecord={() => r} getIndex={() => i}>
          <RecursionField schema={{ ...colSchema, 'x-component': component }} name={`${i}.${key}`} />
        </RecordScope>
      );
    }
    return col;
  }), [schema]);

  const dataSource = useMemo(() => (Array.isArray(value) ? value : []), [value]);

  return (
    <RecordsScope getRecords={() => dataSource}>
      <Table rowKey="id" size='small' {...args} columns={columns} dataSource={dataSource} />
    </RecordsScope>
  );
});

export const componentsMap = {
  ...components,
  Table: SchemaTable,
  Test,
  LoadTemplate,
  StoreTable,
  RedirectValues,
};


