

const layoutSchema = {
  properties: {
    layout: {
      type: 'void',
      'x-component': 'Layout',
      'x-component-props': {
        style: { height: '100%' },
      },
      properties: {
        header: {
          type: 'void',
          'x-component': 'Header',
        },
        content: {
          type: 'void',
          'x-component': 'Content',
          properties: {
            layout: {
              type: 'void',
              'x-component': 'Layout',
              'x-component-props': {
                style: { height: '100%' },
              },
              properties: {
                sider: {
                  type: 'void',
                  'x-component': 'Sider',
                },
                layout: {
                  type: 'void',
                  'x-component': 'Layout',
                  'x-component-props': {
                    style: {
                      height: '100%',
                      overflowY: 'scroll',
                    },
                  },
                  properties: {
                    content: {
                      type: 'void',
                      'x-component': 'Content',
                      'x-component-props': {
                        style: { flexShrink: 0 },
                      },
                      properties: {
                        children: {
                          type: 'void',
                          'x-component': 'Children',
                        },
                      },
                    },
                    footer: {
                      type: 'void',
                      'x-component': 'Footer',
                      properties: {
                        title: {
                          type: 'void',
                          'x-component': 'Text',
                          'x-component-props': {
                            children: 'footer',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const layoutMap = {
  'layout-h-s-cf': layoutSchema
}
module.exports = {
  'GET /api/template': (req, res) => {
    const { name = '' } = req.query;
    return res.json(layoutMap[name] ?? '')
  }
}

