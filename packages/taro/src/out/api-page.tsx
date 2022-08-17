import { observer } from '@formily/react';
import Taro from '@tarojs/taro';
import { IStoreValues, IStore, IStoreConfig, useStore, judgeIsSuccess, useDeepMemo } from '@yimoko/store';
import { isEqual } from 'lodash-es';
import { useEffect } from 'react';

import { getStorage, setStorage } from '../adapter/storage';
import { Page } from '../base/page';
import { useConfig } from '../store/config';
import { StorePage } from '../store/page';

export interface APIPageProps<V extends object = IStoreValues> {
  store: IStore<V, any> | IStoreConfig<V, any>
  pagePath?: string
  isCache?: boolean
  paramKey?: string
}

export const APIPage = observer((props: APIPageProps) => {
  const { store, pagePath, isCache = true, paramKey = 'pagePath' } = props;
  const curStore = useStore(store ?? {});
  const { pageCachePrefix } = useConfig();
  const { router } = Taro.getCurrentInstance();
  const curPagePath = pagePath ?? router?.params?.[paramKey];

  useEffect(() => {
    if (!curPagePath) {
      curStore.setResponse({ code: 404, msg: `${paramKey} 参数必填，请查看传参` });
    } else {
      const cacheKey = `${pageCachePrefix}${curPagePath}`;
      curStore.setValuesByField(paramKey, curPagePath);
      if (isCache) {
        getStorage(cacheKey).then((res) => {
          curStore.runAPI().then((apiRes) => {
            if (judgeIsSuccess(apiRes)) {
              !isEqual(res?.data, apiRes?.data) && setStorage(cacheKey, apiRes?.data);
            } else if (res) {
              // 拉取页面配置失败时 如本地有缓存 则使用 确保页面正常显示
              curStore.setResponse({ code: 0, data: res.data });
            }
          });
          if (res) {
            curStore.setLoading(false);
            curStore.setResponse({ code: 0, data: res.data });
          }
        });
      } else {
        curStore.runAPI();
      }
    }
  }, [curPagePath, curStore, isCache, pageCachePrefix, paramKey]);

  const { response: { data } } = curStore;

  const { page, ...args } = useDeepMemo(() => data ?? {}, [data]);

  return <Page {...page} store={curStore}><StorePage {...args} /></Page>;
});
