import { ArrayBase } from '@formily/antd';
import { createForm } from '@formily/core';
import { Schema } from '@formily/json-schema';
import { RecursionField, useExpressionScope, useFieldSchema, useForm } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { BaseStore, IPageData, JSONStringify, useSchemaField } from '@yimoko/store';
import { components, SchemaBox } from '@yimoko/web';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useMemo } from 'react';

import { LoadTemplate } from './components/load-template';

export const Test = observer((props: any) => {
  console.log(props);
  const { value } = props;

  return <div>{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</div>;
});

export type StoreTableProps<T extends object = Record<string, any>> = Omit<TableProps<T>, 'loading' | 'dataSource' | 'onChange'> & (
  { isControlled: false, store?: BaseStore<any, T[]> } |
  { isControlled?: true, store?: BaseStore<any, IPageData<T>> }
);


export const StoreColumn = observer((props: any) => {
  const { index, record, schema } = props;
  console.log(schema);

  // console.log('form', form);

  // console.log(props.schema.toJSON());
  // @ts-ignore
  return <ArrayBase.Item index={index} record={record} >
    <RecursionField schema={new Schema({ type: 'object', properties: { id: { 'x-component': 'div' } } })} />
    {/* <SchemaField schema={{
      type: 'array', properties: {
        [`[${index}]`]: {
          type: 'object',
          properties: {
            id: props.schema.toJSON(),
          },
        },
      },
    }} /> */}
  </ArrayBase.Item>;
});

export function StoreTableFn<T extends object = Record<string, any>>(props: StoreTableProps<T>) {
  const { isControlled, store, columns, ...args } = props;
  const { curStore } = useExpressionScope();
  const schema = useFieldSchema();
  const storeInUse = useMemo(() => store ?? curStore, [curStore, store]) as BaseStore<any, IPageData<T> | T[]>;
  const { response } = storeInUse;

  const dataSource = useMemo(() => {
    if (Array.isArray(response?.data)) {
      return response?.data;
    }
    return response?.data?.data ?? [];
  }, [response?.data]);

  const curColumns: TableProps<T>['columns'] = useMemo(() => {
    if (columns) {
      return columns;
    }

    return Object.entries(schema.properties ?? {}).map(([key, value]) => {
      const {
        title = key,
        'x-component': component,
        'x-decorator-props': colProps,
      } = value;
      const col: ColumnType<T> = { title, dataIndex: key, ...colProps };

      if (component) {
        col.render = (v, r, i) => <StoreColumn value={value} record={r} index={i}
          schema={schema.properties?.[key]} />;
        //  {
        //   console.log(v, r, i, schema);
        //   console.log(key);

        //   return (
        //     <RecursionField
        //       onlyRenderProperties
        // schema={{
        //   ...schema,
        //   properties: {
        //     [key]: {
        //       type: 'void',
        //       'x-component': component,
        //       'x-component-props': { value: v, children: v, _r: r, _i: i, ...componentProps },
        //       ...rest,
        //     },
        //   },
        // }}
        // />
        //   );
        // };
      }
      return col;
    });
  }, [columns, schema]);

  const { loading } = curStore;

  const model = useMemo(() => createForm({ values: dataSource }), [dataSource]);
  return !storeInUse ? null : (
    <SchemaBox model={model}>
      <Table
        rowKey="id"
        size='small'
        {...args}
        loading={loading}
        columns={curColumns}
        dataSource={dataSource}
      />
    </SchemaBox>
  );
}

export const StoreTable = observer(StoreTableFn);

export const componentsMap = {
  ...components,
  Test,
  LoadTemplate,
  StoreTable,
};


