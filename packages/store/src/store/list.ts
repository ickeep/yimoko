import { observable, action } from '@formily/reactive';
import { Key } from 'react';

import { BaseStore, IBaseStoreConfig, IStoreValues } from './base';

export const defaultKeysConfig: Record<string, string> = {
  sortOrder: 'sortOrder',
  page: 'page',
  pageSize: 'pageSize',
  total: 'count',
};

const { computed } = observable;
export class ListStore<V extends object = IStoreValues, R = IStoreValues> extends BaseStore<V, R> {
  selectedRowKeys: Key[] = [];
  keysConfig: Record<string, string> = {};
  queryRoutingType: 'push' | 'replace' = 'push';

  constructor(config: IListStoreConfig<V, R>) {
    const { keysConfig = {}, defaultValues } = config;
    const curKeysConfig = { ...defaultKeysConfig, ...keysConfig };
    const { sortOrder, page, pageSize } = curKeysConfig;
    const curDefaultValues = Object.assign({ [sortOrder]: [], [page]: 1, [pageSize]: 20 }, defaultValues);

    super({
      isFilterEmptyAtRun: true,
      isBindSearch: true,
      isRunNow: true,
      ...config,
      defaultValues: curDefaultValues,
      defineConfig: {
        selectedRowKeys: observable,

        listData: computed,

        setSelectedRowKeys: action,
      },
    });
    this.keysConfig = curKeysConfig;
  }

  setSelectedRowKeys = (keys: Key[] = []) => {
    this.selectedRowKeys = observable(keys);
  };

  get listData() {
    const { response: { data } } = this;
    // @ts-ignore
    return Array.isArray(data) ? data : (data?.data ?? []);
  }
}

export interface IListStoreConfig<V extends object = IStoreValues, R = IStoreValues> extends IBaseStoreConfig<V, R> {
  keysConfig?: Record<string, string>,
};
