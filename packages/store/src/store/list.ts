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
    const { keysConfig = {}, defaultValues, queryRoutingType, ...args } = config;
    const curKeysConfig = { ...defaultKeysConfig, ...keysConfig };
    const { sortOrder, page, pageSize } = curKeysConfig;
    const curDefaultValues = Object.assign({ [sortOrder]: [], [page]: 1, [pageSize]: 20 }, defaultValues);

    super({
      isFilterEmptyAtRun: true,
      isBindSearch: true,
      isRunNow: true,
      ...args,
      defaultValues: curDefaultValues,
      defineConfig: {
        selectedRowKeys: observable,
        queryRoutingType: observable,

        listData: computed,

        setSelectedRowKeys: action,
      },
    });
    queryRoutingType && (this.queryRoutingType = queryRoutingType);
    this.keysConfig = curKeysConfig;
  }

  setSelectedRowKeys = (keys: Key[] = []) => {
    this.selectedRowKeys = keys;
  };

  get listData() {
    const data = this.response.data as Array<any> | { data?: Array<any> };
    if (Array.isArray(data)) {
      return data;
    }
    return Array.isArray(data?.data) ? data.data : [];
  }
}

export interface IListStoreConfig<V extends object = IStoreValues, R = IStoreValues> extends IBaseStoreConfig<V, R> {
  queryRoutingType?: 'push' | 'replace';
  keysConfig?: Record<string, string>,
};
