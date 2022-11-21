import {
  FormItem,
  Input,
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { observer, FormProvider, createSchemaField } from '@formily/react';
import { useListStore } from '@yimoko/store';
import { StorePage } from '@yimoko/web';
import React, { useEffect } from 'react';


export const IndexPage = observer(() => {
  const store = useListStore({ isRunNow: false });

  useEffect(() => {
    store.setResponse({ code: 0, data: { data: [{ id: 1, name: '1' }, { id: 2, name: '2' }] }, message: '' });
  }, [store]);
  return <div>
    <Text />
    <StorePage store={store}
      schema={{
        type: 'object',
        properties: {
          listData: {
            type: 'void',
            'x-component': 'RedirectListData',
            properties: {
              table: {
                type: 'array',
                'x-component': 'StoreTable',
                'x-component-props': {
                  isControlled: false,
                  columns: ['id', 'name'],
                },
                items: [
                  {
                    name: 'id',
                    'x-component': 'Modal',
                    'x-component-props': {
                      title: '{{$record.id}}',
                    },
                  },
                  { name: 'name', 'x-component': 'div', 'x-component-props': { children: '{{$index}}' } },
                  { name: 'name', 'x-decorator-props': { autoSorter: 'number' } },
                ],
              },
            },
          },
        },
      }}
    />
  </div>;
});;

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
  },
});

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 50, title: 'Sort', align: 'center' },
            properties: {
              sort: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Index', align: 'center' },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 200, title: 'A1', sorter: (a: any, b: any) => {
                console.log(a, b);
                return a.al - b.a1;
              },
            },
            properties: {
              a1: {
                type: 'string',
                'x-decorator': 'Editable',
                'x-component': 'Input',
                'x-component-props': {
                  value: '{{$record.a1}}',
                },
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A2' },
            properties: {
              a2: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A3' },
            properties: {
              a3: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: '添加条目',
        },
      },
    },
  },
};

const Text = () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
