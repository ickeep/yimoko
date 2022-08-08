import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, defaultValues: { icon: 'star' } }}
    options={{}}
    schema={{
      type: 'object', properties: {
        base: {
          'x-component': 'CellGroup',
          'x-component-props': {
            title: '基础组件',
            options: [
              { title: 'Icon 图标', url: '/pages/components/icon/index' },
              { title: 'Grid 宫格', url: '/pages/components/grid/index' },
            ],
          },
        },
        in: {
          'x-component': 'CellGroup',
          'x-component-props': {
            title: '表单组件',
            options: [
              { title: 'Checkbox 复选框', url: '/pages/components/checkbox/index' },
              { title: 'Radio 单选框', url: '/pages/components/radio/index' },
              { title: 'Rate 评分', url: '/pages/components/rate/index' },
              { title: 'Slider 滑块', url: '/pages/components/slider/index' },
              { title: 'Stepper 步进器', url: '/pages/components/stepper/index' },
              { title: 'Switch 开关', url: '/pages/components/switch/index' },
            ],
          },
        },
      },
    }}
  />
));

export default IndexPage;
