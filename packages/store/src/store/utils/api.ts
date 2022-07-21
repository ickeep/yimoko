import { IAPIExecutor } from '../../context/api';
import { IStoreAPI } from '../base';

export function runStoreAPI<V = any, P = any>(api: IStoreAPI<V | undefined, P>, apiExecutor?: IAPIExecutor, params?: V) {
  if (typeof api === 'function') {
    return api(params);
  };
  const { method } = api;
  if (isMethodPost(method)) {
    return apiExecutor?.({ ...api, data: { ...api.data, ...params } });
  }
  return apiExecutor?.({ ...api, params: { ...api.params, ...params } });
}

export const isMethodPost = (method = '') => ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
