import { observer } from '@formily/reactive-react';
import { SchemaPage } from '@yimoko/web';

const normalSchema = {
  properties: {
    layout: {
      type: 'void',
      'x-component': 'LoadTemplate',
      'x-component-props': {
        template: 'layout-h-s-cf',
      },
      properties: {
        title: {
          type: 'void',
          'x-component': 'Title',
          'x-component-props': {
            children: '标题',
            level: 1,
            style: {
              height: '2000px',
              background: '#fff',
            },
          },
        },
      },
    },
  },
};

export const LayoutPage = observer(() => (
  <SchemaPage style={{ height: '100%' }} schema={normalSchema} >
  </SchemaPage>
));
