
import Taro from '@tarojs/taro';

import { createSchemaField, observer } from '@formily/react';
import { APIExecutorProvider, judgeIsSuccess, SchemaComponentsProvider, SchemaFieldProvider, useBaseStore, useRoot } from '@yimoko/store';
import { httpRequest, configStore, getStorage, setStorage } from '@yimoko/taro';
import { isEqual } from 'lodash-es';
import { useEffect, useState } from 'react';

import './app.less';
import { componentsMap } from './components';

interface IConfig {
  apiHost: string
  tabURL: string[]
}

const SchemaField = createSchemaField({ components: componentsMap });

const storageKey = 'site-config';

const getConfig = () => httpRequest({
  url: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/site.json',
  data: { time: `${Math.random()}${Date.now()}` },
});

let curAPIHost = '';

Taro.addInterceptor((chain) => {
  const { requestParams } = chain;
  const { url } = requestParams;
  if (process.env.TARO_ENV !== 'h5' || process.env.NODE_ENV !== 'development') {
    requestParams.url = /^[\w]+:\/\//.test(url) ? url : curAPIHost + url;
  }
  return chain.proceed(requestParams);
});

function App({ children }) {
  const store = useBaseStore<{}, IConfig>({ api: getConfig });

  const { setLoading } = useRoot();
  const [config, setConfig] = useState<IConfig>();

  useEffect(() => {
    setLoading(true);
    getStorage(storageKey).then((res) => {
      store.runAPI().then((apiRes) => {
        // 如果本地存储的配置和服务端的配置不一致，则更新本地存储的配置
        if (judgeIsSuccess(apiRes) && !isEqual(res?.data, apiRes?.data)) {
          setStorage(storageKey, apiRes?.data);
          setConfig({ ...configStore.config, ...apiRes?.data });
          // todo 更新配置后，根据配置重新加载页面
        }
        setLoading(false);
      });
      // 如果本地有缓存，则直接使用缓存
      if (res) {
        setConfig({ ...configStore.config, ...res.data });
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (config) {
      const { apiHost } = config;
      configStore.setConfig(config);
      curAPIHost = apiHost;
    }
  }, [config]);

  return (
    <APIExecutorProvider value={httpRequest}>
      <SchemaComponentsProvider value={componentsMap}>
        <SchemaFieldProvider value={SchemaField}>
          {children}
        </SchemaFieldProvider>
      </SchemaComponentsProvider>
    </APIExecutorProvider >);
}

export default observer(App);
