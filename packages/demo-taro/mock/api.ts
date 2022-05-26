export default {
  'GET /api/page/detail': {
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