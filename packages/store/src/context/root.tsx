import { createContext, useContext } from 'react';

import { RootStore } from '../store/root';

export const RootContext = createContext(new RootStore());

export const RootProvider = RootContext.Provider;

export const RootConsumer = RootContext.Consumer;

export const useRoot = () => useContext(RootContext);

export const useUser = () => useContext(RootContext).user;

export const useMenus = () => useContext(RootContext).menus;

export const useData = (name?: string) => {
  const { data } = useContext(RootContext);
  return typeof name === 'undefined' ? data : data[name];
};
