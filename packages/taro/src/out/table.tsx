import { Table as TTable } from '@antmjs/vantui';
import { IColumns, ITableProps } from '@antmjs/vantui/types/table';
import { createForm } from '@formily/core';
import { RecordScope, RecursionField, useExpressionScope, useFieldSchema } from '@formily/react';
import { useAPIOptions, IOptionsOutAPIProps, judgeIsEmpty, SchemaBox, useSchemaField, useIsOut, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

export type TableProps = ITableProps & Omit<IOptionsOutAPIProps<string>, 'options'> & {
  value?: Record<string, any>[];
};

export const Table = (props: TableProps) => {
  const { api, keys, splitter, value, dataSource, loading: tLoading, ...args } = props;
  const [data, loading] = useAPIOptions([], api, keys ?? {}, splitter);
  const SchemaField = useSchemaField();
  const fieldSchema = useFieldSchema();
  const isOut = useIsOut();

  const curData = useMemo(() => {
    const arr = [dataSource, value, data].find(item => !judgeIsEmpty(item)) ?? [];
    return Array.isArray(arr) ? arr : [];
  }, [data, dataSource, value]);

  const curLoading = useMemo(
    () => ((!judgeIsEmpty(dataSource) || !judgeIsEmpty(value)) ? tLoading : loading),
    [dataSource, value, tLoading, loading],
  );

  const schema = useMemo(() => {
    if (isOut) {
      const { name, 'x-component-props': props, ...args } = fieldSchema?.toJSON();
      return {
        type: 'object',
        properties: {
          data: {
            ...args,
            type: 'array',
            'x-component': 'Table',
            'x-component-props': { ...props, dataSource: curData, loading: curLoading },
          },
        },
      };
    }
    return {};
  }, [curData, curLoading, fieldSchema, isOut]);

  const model = useMemo(() => (isOut ? createForm({ values: { data: curData } }) : undefined), [curData, isOut]);

  return isOut
    ? <SchemaBox model={model}><SchemaField schema={schema} /></SchemaBox>
    : <RenderTable {...args} dataSource={curData} loading={curLoading} />;
};

const RenderTable = (props: ITableProps) => {
  const { columns, ...args } = props;
  const curItems = useSchemaItems();
  const scope = useExpressionScope();
  const { curStore } = scope;

  const curColumns = useMemo(() => {
    const tmpColumns: IColumns[] = columns ? [...columns] : [];
    curItems.forEach((item) => {
      const { title, name, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = item;
      const field = name;
      const getTitle = () => title ?? curStore?.fieldsConfig?.[`${field}`]?.title ?? field;
      const col: IColumns = { title: getTitle(), dataIndex: field, ...colProps };

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
  }, [columns, curItems, curStore?.fieldsConfig]);

  return <TTable  {...args} columns={curColumns} />;
};
