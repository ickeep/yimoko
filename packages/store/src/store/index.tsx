import { BaseStore, IBaseStoreConfig } from './base';
import { IListStoreConfig, ListStore } from './list';

export type IStoreType = 'base' | 'list';

export type IStore<V extends object = any, R = any> = BaseStore<V, R> | ListStore<V, R>;

export type IStoreConfig<V extends object = any, R = any> = { type?: IStoreType } & (IBaseStoreConfig<V, R> | IListStoreConfig<V, R>);

export const StoreMap = {
  base: BaseStore,
  list: ListStore,
};
