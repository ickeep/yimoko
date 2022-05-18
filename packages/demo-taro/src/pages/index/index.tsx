import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { View } from '@tarojs/components';
import { Form, FormItem, Input } from '@yimoko/taro';
import { useState } from 'react';

const IndexPage = observer(() => {
  const [form] = useState(() => createForm({ validateFirst: true, initialValues: { username: 'user' } }));
  const SchemaField = createSchemaField({
    components: {
      FormItem,
      Input,
    },
  });

  const normalSchema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      // password: {
      //   type: 'string',
      //   title: '密码',
      //   required: true,
      //   'x-decorator': 'FormItem',
      //   'x-component': 'Password',
      //   'x-component-props': {
      //     prefix: '{{icon(\'LockOutlined\')}}',
      //   },
      // },
    },
  };


  return (
    <View className='index'>
      <Form form={form} >
        <SchemaField schema={normalSchema} />
      </Form>
    </View>
  );
});

export default IndexPage;
