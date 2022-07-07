import { useFieldSchema, RecordScope, RecursionField, RecordsScope, observer, Schema } from '@formily/react';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useMemo } from 'react';

export interface TableDisplayProps<T extends object = Record<string, any>> extends TableProps<T> {
  value: TableProps<T>['dataSource'];
}

function TableDisplayBase<T extends object = Record<string, any>>(props: TableDisplayProps<T>) {
  const { value, columns, dataSource, ...args } = props;
  const schema = useFieldSchema();
  const curColumns = useMemo(() => (columns ? columns : getColumnsForSchema(schema)), [columns, schema]);
  const curDataSource = useMemo(() => {
    const val = dataSource ? dataSource : value;
    return Array.isArray(val) ? val : [];
  }, [dataSource, value]) as T[];

  return (
    <RecordsScope getRecords={() => curDataSource}>
      <Table rowKey="id" size='small' {...args} columns={curColumns} dataSource={curDataSource} />
    </RecordsScope>
  );
};

export const TableDisplay = observer(TableDisplayBase);

export const getColumnsForSchema = (schema: Schema) => Object.entries(schema?.properties ?? {}).map(([key, value]) => {
  const { title, name, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = value;
  const field = name ?? key;

  const col: ColumnType<any> = { title: title ?? field, dataIndex: field, ...colProps };

  if (component) {
    col.render = (v, r, i) => (
      <RecordScope getRecord={() => r ?? {}} getIndex={() => i}>
        <RecursionField schema={{ ...colSchema, name, 'x-component': component }} name={`${i}.${key}`} />
      </RecordScope>
    );
    col.shouldCellUpdate = (record: Record<string, any>, prevRecord: Record<string, any>) => record !== prevRecord;
  }
  return col;
});
