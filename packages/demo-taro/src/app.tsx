
import Taro from '@tarojs/taro';

import { createSchemaField, observer } from '@formily/react';
import { APIExecutorProvider, SchemaComponentsProvider, SchemaFieldProvider } from '@yimoko/store';
import { httpRequest, configStore, useAppConfig } from '@yimoko/taro';

import './app.less';
import { componentsMap } from './components';

const SchemaField = createSchemaField({ components: componentsMap, scope: { configStore } });

// 请求处理
// todo 登录拦截、重放逻辑
Taro.addInterceptor((chain) => {
  const { requestParams } = chain;
  const { url } = requestParams;
  if (process.env.TARO_ENV !== 'h5' || process.env.NODE_ENV !== 'development') {
    requestParams.url = /^[\w]+:\/\//.test(url) ? url : configStore.config.apiHost + url;
  }
  return chain.proceed(requestParams);
});

// 获取站点配置
const getConfig = () => httpRequest({
  url: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/site.json',
  data: { time: `${Math.random()}${Date.now()}` },
});

function App({ children }) {
  useAppConfig(getConfig);
  return (
    <APIExecutorProvider value={httpRequest}>
      <SchemaComponentsProvider value={componentsMap}>
        <SchemaFieldProvider value={SchemaField}>
          {children}
        </SchemaFieldProvider>
      </SchemaComponentsProvider>
    </APIExecutorProvider >
  );
}

export default observer(App);
