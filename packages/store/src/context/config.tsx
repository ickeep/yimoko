import { cloneDeep } from 'lodash-es';
import { createContext, useContext } from 'react';

export const defaultConfig = {
  static: { img: '', icon: '' },
};

export const ConfigContext = createContext(cloneDeep(defaultConfig));

export const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export const useConfig = () => useContext(ConfigContext);
