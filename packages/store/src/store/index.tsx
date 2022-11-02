import { BaseStore, IBaseStoreConfig } from './base';
import { IListStoreConfig, ListStore } from './list';
import { IOperateStoreConfig, OperateStore } from './operate';

export type IStoreType = 'base' | 'list' | 'operate';

export type IStore<V extends object = any, R extends object = any> = BaseStore<V, R> | ListStore<V, R> | OperateStore<V, R>;

// eslint-disable-next-line max-len
export type IStoreConfig<V extends object = any, R extends object = any> = { type?: IStoreType } & (IBaseStoreConfig<V, R> | IListStoreConfig<V, R> | IOperateStoreConfig<V, R>);

export const StoreMap = {
  base: BaseStore,
  list: ListStore,
  operate: OperateStore,
};
