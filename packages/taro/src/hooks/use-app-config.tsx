import Taro from '@tarojs/taro';
import { useBaseStore, useRoot, judgeIsSuccess, IStoreAPI, judgeIsEmpty } from '@yimoko/store';
import { isEqual } from 'lodash-es';
import { useEffect } from 'react';

import { route } from '../adapter/route';
import { getStorage, setStorage } from '../adapter/storage';
import { setTabBarItem, setTabBarStyle } from '../adapter/tabbar';
import { configStore, IConfig } from '../store/config';

const { config } = configStore;

const setConfig = (config: IConfig) => {
  const { tabBars, tabBarStyle } = config;
  !judgeIsEmpty(tabBarStyle) && setTabBarStyle(tabBarStyle);
  !judgeIsEmpty(tabBars) && tabBars.forEach((item, i) => {
    setTabBarItem({ ...item, index: i });
  });
  configStore.setConfig(config);
};

export const useAppConfig = (api: IStoreAPI, cackeKey = 'app-config') => {
  const store = useBaseStore({ api });
  const { setLoading } = useRoot();

  useEffect(() => {
    setLoading(true);
    getStorage(cackeKey).then((res) => {
      // eslint-disable-next-line complexity
      store.runAPI().then((apiRes) => {
        // 如果本地存储的配置和服务端的配置不一致，则更新本地存储的配置
        if (judgeIsSuccess(apiRes) && !isEqual(res?.data, apiRes?.data)) {
          setStorage(cackeKey, apiRes?.data);
          setConfig({ ...configStore.config, ...apiRes?.data });
          // 更新核心配置，影响页面使用，如 apiHost 则重新启动
          if (apiRes?.data.reLaunch) {
            const path = Taro.getCurrentInstance().router?.path ?? config.indexPage;
            route.reLaunch(path);
          }
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
};
