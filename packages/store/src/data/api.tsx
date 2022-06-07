// 判断请求是否成功
export const judgeIsSuccess = (Response?: Partial<IHTTPResponse>) => Response?.code === IHTTPCode.success;

// 判断请求是否未授权
export const judgeIsUnauthorized = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.unauthorized;

// 判断请求是否被禁止，通常用于接口参数校验 或者 权限校验
export const judgeIsForbidden = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.forbidden;

// 判断请求是否网络出错
export const judgeIsNetworkError = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.networkError;

export const getCodeByStatus = (status: number) => ((status >= 200 && status < 300) ? IHTTPCode.success : status);

export enum IHTTPCode {
  success = 0,
  unauthorized = 401,
  forbidden = 403,
  networkError = 600,
}

export interface IHTTPResponse<R = any, P = any> {
  code: IHTTPCode | number
  msg: string,
  data: R
  config?: IAPIRequestConfig<P>
  status?: number;
  statusText?: string;
  headers?: Record<string, any>;
  [key: string]: any
}

export type IAPIRequestConfig<V = any> = {
  url?: string,
  method?: IMethod | string,
  params?: V | any,
  data?: V,
  [key: string]: any
};

export type IMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | string;

export interface IPageData<T extends object = Record<string, any>> {
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  data: T[],
}
