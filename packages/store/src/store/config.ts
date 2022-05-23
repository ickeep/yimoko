import { define, observable, action } from '@formily/reactive';
import { pick } from 'lodash-es';

export type IConfig = Record<string, any>;

export class ConfigStore<T extends object = IConfig> {
  config: T;
  constructor(config: T) {
    this.config = config;
    define(this, {
      config: observable,
      setConfig: action,
    });
  }

  getConfigItem = (key: keyof T) => this.config[key];

  getConfig = (keys?: keyof T | Array<keyof T>) => {
    if (typeof keys === 'undefined') {
      return this.config;
    }
    return pick(this.config, keys);
  };

  setConfig = (config: Partial<T>) => this.config = Object.assign(this.config, config);
}
