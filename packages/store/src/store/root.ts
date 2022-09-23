import { action, define, observable } from '@formily/reactive';
import { Key } from 'react';

// 全局数据管理，结合 Hooks 和 React.useContext 便捷使用
export class RootStore<
  U extends object = Record<Key, any>,
  M extends Array<Record<Key, any>> = Array<Record<Key, any>>,
  D extends object = Record<Key, any>
> {
  user: U = Object({});
  menus?: M;

  loading = false;

  // 用于存放自定义数据
  data: D = Object({});

  constructor(initVal?: IRootInitVal<U, M, D>) {
    define(this, {
      user: observable,
      menus: observable,
      data: observable,
      loading: observable,

      setUser: action,
      setMenus: action,
      setData: action,
      setDataItem: action,
      setLoading: action,
    });

    initVal && this.init(initVal);
  }

  setUser = (user: U) => this.user = user;

  setMenus = (menus: M) => this.menus = menus;

  setData = (data: D) => this.data = data;

  setDataItem = (name: keyof D, value: any) => this.data[name] = value;

  getDataItem = (name: keyof D) => this.data[name];

  setLoading = (loading: boolean) => this.loading = loading;

  init = (value: IRootInitVal<U, M, D>) => {
    const { user, menus, data } = value;
    user && this.setUser(user);
    menus && this.setMenus(menus);
    data && this.setData(data);
  };
}
export interface IRootInitVal<U, M, D> {
  user?: U,
  menus?: M,
  data?: D,
}
