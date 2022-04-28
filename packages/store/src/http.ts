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

export const http = axios.create({
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  transformRequest: autoTransformDataType,
});

export const httpGet: IHTTPGet = http.get;
export const httpDelete: IHTTPGet = http.delete;
export const httpHead: IHTTPGet = http.head;
export const httpOptions: IHTTPGet = http.options;

export const httpPost: IHTTPPost = http.post;
export const httpPut: IHTTPPost = http.put;
export const httpPatch: IHTTPPost = http.patch;
export const httpPostForm: IHTTPPost = http.postForm;
export const httpPutForm: IHTTPPost = http.putForm;
export const httpPatchForm: IHTTPPost = http.patchForm;

// 使用拦截器,将 response 处理为统一的 { code, data, message } 格式
http.interceptors.response.use(response => handleResponse(response), (e) => {
  const { response, ...args } = e;
  if (!response) {
    return handleResponse({
      ...args,
      status: IHTTPCode.networkError,
      statusText: e?.mesaage ?? '网络出错',
    });
  }
  return handleResponse(response);
});

// 判断请求是否成功
export const getIsSuccess = (Response?: Partial<IHTTPResponse>) => Response?.code === IHTTPCode.success;

// 判断请求是否未授权
export const getIsUnauthorized = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.unauthorized;

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

export type IHTTPGet = <R = any, P = any>(url: string, config?: AxiosRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

export type IHTTPPost = <R = any, P = any> (url: string, data?: Record<string, any>, config?: AxiosRequestConfig) => Promise<IHTTPResponse<R, P>>;

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

export interface IPageData<T extends object = Record<string, any>> {
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  data: T[],
}
