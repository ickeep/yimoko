import { ConfigStore } from '@yimoko/store';
import { useMemo } from 'react';

// 因小程序包大小限制，将所有静态资源放至 CDN 上
export const defaultConfig = {
  static: {
    img: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/yimoko/0.1.0/img/',
    icon: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/yimoko/0.1.0/icon/',
  },
  tabURL: [''],
  uploadAPI: '',
};

type IConfig = typeof defaultConfig;
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
