import { useFieldSchema, RecordScope, RecursionField, RecordsScope, observer } from '@formily/react';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useMemo } from 'react';

export interface TableDisplayProps<T extends object = Record<string, any>> extends TableProps<T> {
  value: TableProps<T>['dataSource'];
}

function TableDisplayBase<T extends object = Record<string, any>>(props: TableDisplayProps<T>) {
  const { value, columns, dataSource, ...args } = props;
  const schema = useFieldSchema();

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
