import { IStoreAPI } from '../base';
import { IAPIExecutor } from '../config';

export function runStoreAPI<V = any, P = any>(api?: IStoreAPI<V | undefined, P>, apiExecutor?: IAPIExecutor, params?: V) {
  if (!api) {
    return undefined;
  }

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
