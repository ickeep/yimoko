import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { View, Text, Button } from '@tarojs/components';
import { Form, FormItem, Input, useLang, langStore } from '@yimoko/taro';
import { useState } from 'react';

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


const IndexPage = observer(() => {
  const [form] = useState(() => createForm({ validateFirst: true, initialValues: { username: 'user' } }));
  const [lang, loading] = useLang('name');
  const [SchemaField] = useState(() => createSchemaField({
    components: {
      FormItem,
      Input,
    },
  }));


  return (
    <View className='index'>
      <Text>name:{lang.name}</Text>
      <Text>loading:{loading.toString()}</Text>
      <Text>age:{lang.age}</Text>
      <Button onClick={() => langStore.setLang({ name: `${Math.random()}` })}>set lang</Button>
      <Button onClick={() => langStore.setLoading(!loading)}>set lang</Button>
      <Form form={form} >
        <SchemaField schema={normalSchema} />
      </Form>
    </View>
  );
});

export default IndexPage;
