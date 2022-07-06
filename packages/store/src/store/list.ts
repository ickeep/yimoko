import { define, observable, action } from '@formily/reactive';
import { Key } from 'react';

import { BaseStore, IBaseStoreConfig, IStoreValues } from './base';

export const defaultKeysConfig: Record<string, string> = {
  sortOrder: 'sortOrder',
  page: 'page',
  pageSize: 'pageSize',
  total: 'count',
};

export class ListStore<V extends object = IStoreValues, R = IStoreValues> extends BaseStore<V, R> {
  selectedRowKeys: Key[] = [];
  keysConfig: Record<string, string> = {};
  queryRoutingType: 'push' | 'replace' = 'push';

  constructor(config: IListStoreConfig<V, R>) {
    super({ isBindSearch: true, ...config });
    const { keysConfig = {} } = config;
    this.keysConfig = { ...defaultKeysConfig, ...keysConfig };
    define(this, {
      selectedRowKeys: observable,
      setSelectedRowKeys: action,
    });
  }

  setSelectedRowKeys = (keys: Key[] = []) => this.selectedRowKeys = keys;
}

export interface IListStoreConfig<V extends object = IStoreValues, R = IStoreValues> extends IBaseStoreConfig<V, R> {
  keysConfig?: Record<string, string>,
};
