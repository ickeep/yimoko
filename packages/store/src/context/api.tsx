// 已弃用 待删除
import { createContext, useContext } from 'react';

import { IAPIRequestConfig, IHTTPCode, IHTTPResponse } from '../tools/api';

export type IAPIExecutor = <T extends object = IAPIRequestConfig> (config: T) => Promise<IHTTPResponse>;

export const unknownAPIRes = {
  code: IHTTPCode.networkError,
  msg: 'APIContext 未配置',
  data: '',
};

export const APIExecutorContext = createContext<IAPIExecutor>(() => Promise.resolve(unknownAPIRes));

export const APIExecutorProvider = APIExecutorContext.Provider;

export const APIExecutorConsumer = APIExecutorContext.Consumer;

export const useAPIExecutor = () => useContext(APIExecutorContext);
