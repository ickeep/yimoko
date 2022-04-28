import axios, { AxiosRequestConfig, AxiosRequestTransformer, AxiosResponse } from 'axios';

// 根据 Content-Type 自动转换数据 form-data，
export const autoTransformDataType: AxiosRequestTransformer = (data, headers) => {
  if (headers?.['Content-Type'] === 'multipart/form-data' && data && !(data instanceof FormData)) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, values]: [string, any]) => formData.append(key, values));
    return formData;
  }
  return data;
};

// 设置 Content-Type 为 form-data
export const setContentTypeFormData = (config: AxiosRequestConfig) => {
  const newConfig = config;
  !newConfig.headers && (newConfig.headers = {});
  newConfig.headers['Content-Type'] = 'multipart/form-data';
  return newConfig;
};

export const http = axios.create({
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  transformRequest: autoTransformDataType,
});

// 将 response 处理为统一的 { code, data, message } 格式
export const httpRequest: IHTTPRequest = async (config) => {
  try {
    const response = await http(config);
    return handleResponse(response);
  } catch (e: any) {
    const { response, ...args } = e;
    if (!response) {
      return handleResponse({
        ...args,
        status: IHTTPCode.networkError,
        statusText: e?.mesaage ?? '网络出错',
      });
    }
    return handleResponse(response);
  }
};

export const httpGet: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'get' });
export const httpDelete: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'delete' });
export const httpHead: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'head' });
export const httpOptions: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'options' });

export const httpPost: IHTTPPost = (url, data, config) => httpRequest({ ...config, url, data, method: 'post' });
export const httpPut: IHTTPPost = (url, data, config) => httpRequest({ ...config, url, data, method: 'put' });
export const httpPatch: IHTTPPost = (url, data, config) => httpRequest({ ...config, url, data, method: 'patch' });

export const httpPostForm: IHTTPPost = (url, data, config) => httpRequest(setContentTypeFormData({ ...config, url, data, method: 'post' }));
export const httpPutForm: IHTTPPost = (url, data, config) => httpRequest(setContentTypeFormData({ ...config, url, data, method: 'put' }));
export const httpPatchForm: IHTTPPost = (url, data, config) => httpRequest(setContentTypeFormData({ ...config, url, data, method: 'patch' }));

// 不使用拦截器, 留给业务
// http.interceptors.response.use(response => handleResponse(response), (e) => {
//   const { response, ...args } = e;
//   if (!response) {
//     return handleResponse({
//       ...args,
//       status: IHTTPCode.networkError,
//       statusText: e?.mesaage ?? '网络出错',
//     });
//   }
//   return handleResponse(response);
// });

// 判断请求是否成功
export const judgeIsSuccess = (Response?: Partial<IHTTPResponse>) => Response?.code === IHTTPCode.success;

// 判断请求是否未授权
export const judgeIsUnauthorized = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.unauthorized;

// 判断请求是否被禁止，通常用于接口参数校验 或者 权限校验
export const judgeIsForbidden = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.forbidden;

// 判断请求是否网络出错
export const judgeIsNetworkError = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.networkError;

// 处理请求返回的数据
export const handleResponse = <T = Record<string, any>>(response: AxiosResponse<T>): IHTTPResponse<T> => {
  const { data, status, statusText } = response;
  const resData = getResponseData(response);
  return {
    ...response,
    code: resData?.code ?? getCodeByStatus(status),
    msg: resData?.msg ?? statusText,
    data: resData.data ?? data,
  };
};

// 根据 status 获取 code
export const getCodeByStatus = (status: number) => ((status >= 200 && status < 300) ? IHTTPCode.success : status);

// 获取 response data
export const getResponseData = (response: AxiosResponse): Record<string, any> => {
  const { data } = response;
  return (typeof data?.code !== 'undefined' && (typeof data?.msg !== 'undefined' || typeof data?.data !== 'undefined')) ? data : response;
};

export enum IHTTPCode {
  success = 0,
  unauthorized = 401,
  forbidden = 403,
  networkError = 600,
}

export interface IHTTPResponse<T = any, D = any> extends Partial<AxiosResponse<T, D>> {
  code: IHTTPCode | number
  msg: string,
}

export type IHTTPRequest = <R = any, P = any>(config: AxiosRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

export type IHTTPGet = <R = any, P = any>(url: string, config?: AxiosRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

export type IHTTPPost = <R = any, P = Record<string, any>> (url: string, data?: P, config?: AxiosRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

export interface IPageData<T extends object = Record<string, any>> {
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  data: T[],
}
