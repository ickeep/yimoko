import { createForm } from '@formily/core';
import { createSchemaField, ISchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { Page, Form, FormItem, Icon, Input, useStore, Button } from '@yimoko/taro';
import { useState } from 'react';

const IndexPage = observer(() => {
  const { loading, response } = useStore<{}, ISchema>({ api: { url: '/api/page/detail' }, isRunNow: true });
  const [form] = useState(() => createForm({ validateFirst: true, initialValues: { username: 'user', icon: 'success' } }));
  const [SchemaField] = useState(() => createSchemaField({
    components: {
      FormItem,
      Input,
      Icon,
      Button,
    },
  }));

  return (
    <Page loading={loading} data={response} className='index'>
      <Form form={form}>
        <SchemaField schema={response.data} />
      </Form>
    </Page>
  );
});

export default IndexPage;
