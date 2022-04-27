import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const httpGet: IHttpGet = (url, config) => axios.get(url, config);

export const httpPost: IHttpPost = (url, data, config) => axios.post(url, data, config);

axios.interceptors.request.use((conf) => {
  const { headers = {} } = conf;
  headers['X-Requested-With'] = 'XMLHttpRequest';
  return { ...conf, headers, data: autoConvertData(conf) };
});

axios.interceptors.response.use(response => handleResponse(response), (e) => {
  const { response, ...args } = e;
  if (!response) {
    return handleResponse({
      ...args,
      status: IResponseCode.networkError,
      statusText: e?.mesaage ?? '网络出错',
    });
  }
  return handleResponse(response);
});

export const autoConvertData = (config: AxiosRequestConfig) => {
  const { headers, data } = config;
  if (headers?.['Content-Type'] === 'multipart/form-data' && data && !(data instanceof FormData)) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, values]: [string, any]) => formData.append(key, values));
    return formData;
  }
  return data;
};

export const getIsSuccess = (Response?: Partial<IResponse>) => Response?.code === IResponseCode.success;

export const getIsUnauthorized = (Response?: IResponse) => Response?.code === IResponseCode.unauthorized;

export const handleResponse = <T = Record<string, any>>(response: AxiosResponse<T>): IResponse<T> => {
  const { data, status, statusText } = response;
  const resData = getResData(response);
  return {
    ...response,
    code: resData?.code ?? getCodeByStatus(status),
    msg: resData?.msg ?? statusText,
    data: resData.data ?? data,
  };
};

export const getCodeByStatus = (status: number) => ((status >= 200 && status < 300) ? IResponseCode.success : status);

export const getResData = (response: AxiosResponse): Record<string, any> => {
  const { data } = response;
  return (typeof data?.code !== 'undefined' && (typeof data?.msg !== 'undefined' || typeof data?.data !== 'undefined')) ? data : response;
};

export type IHttpGet = <T = Record<string, any>>(url: string, config?: AxiosRequestConfig) => Promise<IResponse<T>>;

export type IHttpPost = <T = Record<string, any>>
  (url: string, data?: Record<string, any>, config?: AxiosRequestConfig)
  => Promise<IResponse<T>>;

export type IListToSearch = <P = Record<string, any>, D = Record<string, any>> (
  params: P, api: (params: P) => Promise<IResponse<IPageData<D>>>
) => Promise<IResponse<D>>;

export enum IResponseCode {
  success = 0,
  unauthorized = 401,
  forbidden = 403,
  networkError = 600,
}

export interface IResponse<T = any> extends Partial<AxiosResponse> {
  code: IResponseCode | number
  msg: string,
  data: T
}

export interface IPageData<T = Record<string, any>[]> {
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  data: T,
}
