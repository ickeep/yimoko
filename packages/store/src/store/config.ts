import { define, observable, action } from '@formily/reactive';
import { pick } from 'lodash-es';

export type IConfig = Record<string, any>;

type ILevel = 'info' | 'warn' | 'error';

type IReport = (info: Record<string, any> | Error | unknown, level: ILevel) => void;

export class ConfigStore<T extends object = IConfig> {
  config: T;
  report?: IReport;

  constructor(config: T, report?: IReport) {
    this.config = config;
    this.report = report;
    define(this, {
      config: observable,
      setConfig: action,
    });
  }

  logger = (info: Record<string, any> | Error | unknown, level: ILevel = 'info') => {
    const { report } = this;
    if (report) {
      report(info, level);
    } else {
      console[level]?.(info);
    }
  };

  getConfigItem = (key: keyof T) => this.config[key];

  getConfig = (keys?: keyof T | Array<keyof T>) => {
    if (typeof keys === 'undefined') {
      return this.config;
    }
    return pick(this.config, keys);
  };

  setConfig = (config: Partial<T>) => this.config = Object.assign(this.config, config);
}
