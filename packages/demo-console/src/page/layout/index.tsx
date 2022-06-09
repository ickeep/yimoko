import { Form, FormItem, Input, Password } from '@formily/antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const normalForm = createForm({
  validateFirst: true,
});

const normalSchema = {
  type: 'void',
  'x-component': 'Layout',
  properties: {
    header: {
      type: 'void',
      'x-component': 'Header',
    },
    content: {
      type: 'void',
      'x-component': 'Content',
      properties: {
        sider: {
          type: 'void',
          'x-component': 'Sider',
          properties: {
            sider: {
              type: 'void',
              'x-component': 'Input',
            },
          },
        },
        content: {
          type: 'void',
          'x-component': 'Content',
        },
      },
    },
    footer: {
      type: 'void',
      'x-component': 'Footer',
    },
  },
};

const SchemaField = createSchemaField({
  components: {
    Layout,
    FormItem,
    Input,
    Password,
    Header,
    Footer,
    Sider,
    Content,
  },
});

export const LayoutPage = observer(() => <>
  <Form
    form={normalForm}
    layout="vertical"
    size="large"
    onAutoSubmit={console.log}
  >
    <SchemaField schema={normalSchema} />
  </Form>
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
</>);
