import { observer } from '@formily/react';
import { SchemaPage } from '@yimoko/store';

const normalSchema = {
  properties: {
    layout: {
      type: 'void',
      'x-component': 'LoadTemplate',
      'x-component-props': {
        template: 'layout-h-s-cf',
        spin: true,
      },
      properties: {
        title: {
          type: 'void',
          'x-component': 'Title',
          'x-component-props': {
            children: '标题',
            level: 1,
            style: {
              background: '#fff',
            },
          },
        },
        icon1: {
          type: 'void',
          'x-component': 'Icon',
          'x-component-props': {
            name: 'CheckSquareOutlined',
            style: { color: 'hotpink' },
          },
        },
        icon2: {
          type: 'void',
          'x-component': 'Icon',
          'x-component-props': {
            name: 'customize',
            style: { color: 'hotpink' },
          },
        },
        icon3: {
          type: 'void',
          'x-component': 'Icon',
          'x-component-props': {
            name: 'customize',
            style: { color: 'hotpink' },
          },
        },
        icon4: {
          type: 'void',
          'x-component': 'Icon',
          'x-component-props': {
            name: 'customize',
            style: { color: 'hotpink' },
          },
        },
      },
    },
  },
};

export const LayoutPage = observer(() => (
  <SchemaPage schema={normalSchema} />
));
