import { ConfigStore, IVersion } from '@yimoko/store';

import { LoadDependProps } from '../common/load-depend';

import { httpRequest } from '../http';
import { notifier } from '../notifier';

export type IDeep = Pick<LoadDependProps, 'js' | 'css'>;

const staticConfig: { img: string, icon: string, js: string, css: string } = { img: '', icon: '', js: '', css: '' };
const versionConfig: { img?: IVersion, icon?: IVersion, js?: IVersion, css?: IVersion } = {};
const deepConfig: { antPlots?: IDeep } = {
  antPlots: { js: { name: 'Plots', src: 'https://unpkg.com/@ant-design/plots@1.2.2/dist/plots.min.js' } },
};

export const defaultConfig = {
  static: staticConfig,
  version: versionConfig,
  deep: deepConfig,

  versionKey: '',
  apiHost: '',
  uploadAPI: '',
  indexPage: '',
  pageCachePrefix: '',
};

export type IConfig = typeof defaultConfig;

export const configStore: ConfigStore<typeof defaultConfig> = new ConfigStore(defaultConfig, { notifier, apiExecutor: httpRequest });

export const { logger } = configStore;

