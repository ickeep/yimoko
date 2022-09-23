import { define, observable, action } from '@formily/reactive';
import { createContext, Key, ReactNode, useContext } from 'react';

import { IAPIRequestConfig, IHTTPCode, IHTTPResponse } from '../tools/api';

type ILevel = 'info' | 'warn' | 'error';

type IReport = (info: Record<Key, any> | Error | unknown, level: ILevel) => void;

type INotifierType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'warn' | 'open' | 'close' | 'destroy' | 'confirm' | string;

export type INotifier = (type: INotifierType, msg: string | ReactNode, options?: Record<Key, any>) => void;

export type IAPIExecutor = <T extends object = IAPIRequestConfig> (config: T) => Promise<IHTTPResponse>;

export const unknownAPIRes = {
  code: IHTTPCode.networkError,
  msg: 'APIContext 未配置',
  data: '',
};

export interface IConfigProvider {
  apiExecutor: IAPIExecutor,
  notifier: INotifier,
  report?: IReport
}

export class ConfigStore<T extends object = any> {
  config: T;
  report?: IReport;
  notifier: INotifier;
  apiExecutor: IAPIExecutor;

  constructor(config: T, provider: IConfigProvider) {
    this.config = config;
    const { apiExecutor, notifier, report } = provider;
    report && (this.report = report);
    this.apiExecutor = apiExecutor;
    this.notifier = notifier;

    define(this, {
      config: observable,
      setConfig: action,
    });
  }

  logger = (info: Record<Key, any> | Error | unknown, level: ILevel = 'info') => {
    const { report } = this;
    if (report) {
      report(info, level);
    } else {
      console[level]?.(info);
    }
  };

  setConfig = (config: Partial<T>) => this.config = Object.assign(this.config, config);
}

export const ConfigStoreContext = createContext<ConfigStore>(new ConfigStore(
  {},
  {
    apiExecutor: () => Promise.resolve(unknownAPIRes),
    notifier: () => console.log('未配置 notifier'),
  },
));

export const ConfigStoreProvider = ConfigStoreContext.Provider;

export const ConfigStoreConsumer = ConfigStoreContext.Consumer;

export const useConfigStore = () => useContext(ConfigStoreContext);

export const useLogger = () => useConfigStore().logger;

export const useNotifier = () => useConfigStore().notifier;

export const useAPIExecutor = () => useConfigStore().apiExecutor;


export const useConfig = <C extends object = any>() => {
  const store = useConfigStore() as ConfigStore<C>;
  return store.config;
};

