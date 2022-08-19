import { ConfigStore } from '@yimoko/store';
import { useMemo } from 'react';

const tabURL: string[] = [];
const themeVars: Record<string, any> = {};
const tabBars: Array<Omit<Taro.setTabBarItem.Option, 'complete' | 'fail' | 'success'>> = [];
const tabBarStyle: Omit<Taro.setTabBarStyle.Option, 'complete' | 'fail' | 'success'> = {};
// 因小程序包大小限制，将所有静态资源放至 CDN 上
export const defaultConfig = {
  static: { img: '', icon: '' },
  apiHost: '',
  uploadAPI: '',
  indexPage: '',
  pageCachePrefix: '',
  tabURL,
  themeVars,
  tabBars,
  tabBarStyle,
};

export type IConfig = typeof defaultConfig;
type IKey = keyof IConfig;

export const configStore: ConfigStore<typeof defaultConfig> = new ConfigStore(defaultConfig);

export const { logger } = configStore;

export const useConfig = (keys?: IKey | Array<IKey>) => useMemo(
  () => configStore.getConfig(keys),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [configStore.config],
);

export const useConfigItme = (key: IKey) => useMemo(() => configStore.getConfigItem(key), [key]);

export const getIsTabURL = (path: string) => configStore.config.tabURL.includes(path);
