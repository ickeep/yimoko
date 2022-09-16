import { observable, action } from '@formily/reactive';
import { Key } from 'react';

import { judgeIsSuccess } from '../tools/api';
import { judgeIsEmpty } from '../tools/tool';

import { BaseStore, transformStoreData, IBaseStoreConfig, IStoreResponse, IStoreValues } from './base';
import { runStoreAPI } from './utils/api';

export const defaultKeysConfig: Record<string, string> = {
  sortOrder: 'sortOrder',
  page: 'page',
  pageSize: 'pageSize',
  total: 'count',
};

const { computed } = observable;
export class ListStore<V extends object = IStoreValues, R extends object = any> extends BaseStore<V, R> {
  selectedRowKeys: Key[] = [];
  keysConfig: Record<string, string> = {};
  queryRoutingType: 'push' | 'replace' = 'push';

  moreLoading = false;
  moreResponse: IStoreResponse<R, V> = {};

  constructor(config: IListStoreConfig<V, R> = {}) {
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
        moreLoading: observable,
        moreResponse: observable,

        listData: computed,
        isNoMore: computed,

        setSelectedRowKeys: action,
        setMoreLoading: action,
        setMoreResponse: action,
        loadData: action,
        loadMore: action,
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

  setMoreLoading = (loading: boolean) => this.moreLoading = loading;

  setMoreResponse = (data: IStoreResponse<R, V>) => this.moreResponse = data;

  loadData = (data: any[]) => {
    if (!judgeIsEmpty(data) && Array.isArray(data)) {
      const newResponse = { ...this.response } as any;
      if (Array.isArray(newResponse.data)) {
        newResponse.data = [...newResponse.data, ...data];
      } else if (Array.isArray(newResponse.data?.data)) {
        newResponse.data.data = [...newResponse.data.data, ...data];
      }
      this.setResponse(newResponse);
    }
  };

  // 加载更多
  loadMore = async () => {
    if (!this.moreLoading && !this.isNoMore) {
      this.setMoreLoading(true);
      const { page } = this.keysConfig;
      this.setValuesByField(page, this.values[page] + 1);
      const { api } = this;
      const params = this.getAPIParams();
      const response = await runStoreAPI(api, this.apiExecutor, params);
      this.setMoreLoading(false);
      if (response) {
        response.data = transformStoreData(response.data, this.transform.resData, this);
        this.setMoreResponse(response);
      }
      if (judgeIsSuccess(response)) {
        const data = response?.data.data;
        this.loadData(data);
      } else {
        this.setValuesByField(page, this.values[page] - 1);
      }
      return response;
    };
  };

  get isNoMore() {
    const { keysConfig, response, moreResponse, listData } = this;
    const { total, page, pageSize } = keysConfig;
    const data = moreResponse?.data ?? response?.data as any;
    if (!data) {
      return true;
    }
    const totalNum = data[total] ?? listData.length;
    return totalNum <= data[page] * data[pageSize];
  }
}

export interface IListStoreConfig<V extends object = IStoreValues, R extends object = any> extends IBaseStoreConfig<V, R> {
  queryRoutingType?: 'push' | 'replace';
  keysConfig?: Record<string, string>,
};
