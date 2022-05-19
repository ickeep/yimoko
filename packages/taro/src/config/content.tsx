import { createContext } from 'react';

export const ConfigContext = createContext({});

export const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;
