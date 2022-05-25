import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { Form, FormItem, Input, View } from '@yimoko/taro';
import { useState } from 'react';

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        help: '1232',
        for: 'username',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入用户名',
        id: 'username',
      },
    },
    mail: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        help: '邮箱地址',
        colon: true,
        layout: 'vertical',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入邮箱',
      },
    },
  },
};

const IndexPage = observer(() => {
  const [form] = useState(() => createForm({ validateFirst: true, initialValues: { username: 'user' } }));
  const [SchemaField] = useState(() => createSchemaField({
    components: {
      FormItem,
      Input,
    },
  }));

  return (
    <View className='index'>
      <Form form={form} layout="horizontal" >
        <SchemaField schema={normalSchema} />
      </Form>
    </View>
  );
});

export default IndexPage;
