
import Taro from '@tarojs/taro';

import { createSchemaField, observer } from '@formily/react';
import {
  APIExecutorProvider, judgeIsEmpty, judgeIsSuccess,
  SchemaComponentsProvider, SchemaFieldProvider, useBaseStore, useRoot,
} from '@yimoko/store';
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
  const { loading, response } = useBaseStore<{}, IConfig>({ api: getConfig, isRunNow: true });

  const { setLoading } = useRoot();
  const [config, setConfig] = useState<IConfig>();

  useEffect(() => {
    setLoading(true);
    getStorage(storageKey).then((res) => {
      if (res && judgeIsEmpty(config)) {
        setConfig({ ...configStore.config, ...res.data });
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (judgeIsSuccess(response)) {
      const { data } = response;
      if (!isEqual(data, config)) {
        setConfig(data);
        setStorage(storageKey, data);
      }
    }
  }, [config, response]);

  useEffect(() => {
    loading === false && setLoading(false);
  }, [loading, setLoading]);

  useEffect(() => {
    if (config) {
      const { apiHost } = config;
      configStore.setConfig(config);
      curAPIHost = apiHost;
    }
  });

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
