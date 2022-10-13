import { ConfigStore } from '@yimoko/store';

import { httpRequest } from '../http';
import { notifier } from '../notifier';

const staticConfig: { img: string, icon: string, js: string, css: string } = { img: '', icon: '', js: '', css: '' };

export const defaultConfig = {
  static: staticConfig,
  apiHost: '',
  uploadAPI: '',
  indexPage: '',
  pageCachePrefix: '',
};

export type IConfig = typeof defaultConfig;

export const configStore: ConfigStore<typeof defaultConfig> = new ConfigStore(defaultConfig, { notifier, apiExecutor: httpRequest });

export const { logger } = configStore;

