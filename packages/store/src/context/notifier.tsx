import { createContext, ReactNode, useContext } from 'react';

type IType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'warn' | 'open' | 'close' | 'destroy' | 'confirm';

export type INotifier = (type: IType, msg: string | ReactNode, options?: Record<string, any>) => void;

export const NotifierContext = createContext<INotifier>(() => null);

export const NotifierProvider = NotifierContext.Provider;

export const NotifierConsumer = NotifierContext.Consumer;

export const useNotifier = () => useContext(NotifierContext);
