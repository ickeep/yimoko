export default {
  'GET /api/page/detail': {
    options: { validateFirst: true, initialValues: { username: 'user', icon: 'success', btn: '123' } },
    schema: {
      type: 'object',
      properties: {
        form: {
          type: 'void',
          'x-component': 'Form',
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
            icon: {
              type: 'void',
              title: '图标',
              'x-decorator': 'Icon',
              'x-decorator-props': {
                value: 'error',
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
            btn: {
              type: 'string', title: '按钮',
              'x-component': 'Button',
              'x-component-props': { value: '123' }
            },
            mail2: {
              type: 'string',
              title: '邮箱2',
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
                disabled: true,
              },
            },
          },
        }
      }
    }
  }
}