import Taro from '@tarojs/taro';

// 将 response 处理为统一的 { code, data, message } 格式
export const httpRequest: IHTTPRequest = async (config) => {
  try {
    const response = await Taro.request(config);
    return handleResponse(response);
  } catch (e: any) {
    const { response, ...args } = e;
    if (!response) {
      return handleResponse({
        ...args,
        statusCode: IHTTPCode.networkError,
        errMsg: e?.mesaage ?? '网络出错',
      });
    }
    return handleResponse(response);
  }
};

export const httpGet: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'GET' });
export const httpDelete: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'DELETE' });
export const httpHead: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'HEAD' });
export const httpOptions: IHTTPGet = (url, config) => httpRequest({ ...config, url, method: 'OPTIONS' });

export const httpPost: IHTTPPost = (url, data, config) => httpRequest({ ...config, url, data, method: 'POST' });
export const httpPut: IHTTPPost = (url, data, config) => httpRequest({ ...config, url, data, method: 'PUT' });

// 判断请求是否成功
export const judgeIsSuccess = (Response?: Partial<IHTTPResponse>) => Response?.code === IHTTPCode.success;

// 判断请求是否未授权
export const judgeIsUnauthorized = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.unauthorized;

// 判断请求是否被禁止，通常用于接口参数校验 或者 权限校验
export const judgeIsForbidden = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.forbidden;

// 判断请求是否网络出错
export const judgeIsNetworkError = (Response?: IHTTPResponse) => Response?.code === IHTTPCode.networkError;

// 处理请求返回的数据
export const handleResponse = <T = Record<string, any>>(response: ITaroResponse<T>): IHTTPResponse<T> => {
  const { data, statusCode, errMsg } = response;
  const resData = getResponseData(response);
  return {
    ...response,
    code: resData?.code ?? getCodeByStatus(statusCode),
    msg: resData?.msg ?? errMsg,
    data: resData.data ?? data,
  };
};

// 根据 status 获取 code
export const getCodeByStatus = (status: number) => ((status >= 200 && status < 300) ? IHTTPCode.success : status);

// 获取 response data
export const getResponseData = (response: ITaroResponse): Record<string, any> => {
  const { data } = response;
  return (typeof data?.code !== 'undefined' && (typeof data?.msg !== 'undefined' || typeof data?.data !== 'undefined')) ? data : response;
};

export enum IHTTPCode {
  success = 0,
  unauthorized = 401,
  forbidden = 403,
  networkError = 600,
}

export interface IHTTPResponse<T = any> extends Partial<ITaroResponse<T>> {
  code: IHTTPCode | number
  msg: string,
}

export type IHTTPRequest = <R = any, P = any>(config: IHTTPConfig<P>) => Promise<IHTTPResponse<R>>;

export type IHTTPGet = <R = any, P = any>(url: string, config?: IHTTPConfig<P>) => Promise<IHTTPResponse<R>>;

export type IHTTPPost = <R = any, P = Record<string, any>> (url: string, data?: P, config?: IHTTPConfig<P>) => Promise<IHTTPResponse<R>>;

export interface IPageData<T extends object = Record<string, any>> {
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  data: T[],
}

export interface IHTTPConfig<P = any> {
  /** 开发者服务器接口地址 */
  url: string
  /** 请求的参数 */
  data?: P
  /** 设置请求的 header，header 中不能设置 Referer。
   *
   * `content-type` 默认为 `application/json`
   */
  header?: TaroGeneral.IAnyObject
  /** 超时时间，单位为毫秒
   * @default 2000
   * @supported weapp, h5
   */
  timeout?: number
  /** HTTP 请求方法
   * @default GET
   */
  method?: Method
  /** 返回的数据格式 */
  dataType?: 'json' | string
  /** 响应的数据类型 */
  responseType?: 'text' | 'arraybuffer'
  /** 开启 http2
   * @default false
   * @supported weapp
   */
  enableHttp2?: boolean
  /** 开启 quic
   * @default false
   * @supported weapp
   */
  enableQuic?: boolean
  /** 开启 cache
   * @default false
   * @supported weapp
   */
  enableCache?: boolean
  /** 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 移动解析HttpDNS
   * @default false
   * @supported weapp
   */
  enableHttpDNS?: boolean
  /** HttpDNS 服务商 Id。 HttpDNS 用法详见 移动解析HttpDNS
   * @supported weapp
   */
  httpDNSServiceId?: string
  /** 开启 transfer-encoding chunked。
   * @default false
   * @supported weapp
   */
  enableChunked?: boolean

  jsonp?: boolean
  /** 设置 H5 端 jsonp 请求 url 是否需要被缓存
   * @default false
   * @supported h5
   */
  jsonpCache?: boolean
  /** 设置 H5 端是否允许跨域请求
   * @default same-origin
   * @supported h5
   */
  mode?: CorsMode
  /** 设置 H5 端是否携带 Cookie
   * @default omit
   * @supported h5
   */
  credentials?: Credentials
  /** 设置 H5 端缓存模式
   * @default default
   * @supported h5
   */
  cache?: Cache
  /** 设置 H5 端请求重试次数
   * @default 2
   * @supported h5
   */
  retryTimes?: number
  /** 设置 H5 端请求的兜底接口
   * @supported h5
   */
  backup?: string | string[]
  /** 设置 H5 端请求是否使用缓存
   * @default false
   * @supported h5
   */
  useStore?: boolean
  /** 设置 H5 端请求缓存校验的 key
     * @supported h5
     */
  storeCheckKey?: string
  /** 设置 H5 端请求缓存签名
     * @supported h5
     */
  storeSign?: string
  /** 设置 H5 端请求响应的数据校验函数，若返回 false，则请求兜底接口，若无兜底接口，则报请求失败
   * @supported h5
   */
  dataCheck?(): boolean

  /** 设置 H5 端请求校验函数，一般不需要设置
   * @supported h5
   */
  storeCheck?(): boolean
}

/** HTTP 请求方法 */
type Method =
  /** HTTP 请求 OPTIONS */
  'OPTIONS' |
  /** HTTP 请求 GET */
  'GET' |
  /** HTTP 请求 HEAD */
  'HEAD' |
  /** HTTP 请求 POST */
  'POST' |
  /** HTTP 请求 PUT */
  'PUT' |
  /** HTTP 请求 DELETE */
  'DELETE' |
  /** HTTP 请求 TRACE */
  'TRACE' |
  /** HTTP 请求 CONNECT */
  'CONNECT';

/** 跨域策略 */
type CorsMode =
  /** 跨域请求将获取不透明的响应 */
  'no-cors' |
  /** 允许跨域请求 */
  'cors' |
  /** 请求总是向当前的源发起的 */
  'same-origin';

/** 证书 */
type Credentials =
  /** 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息 */
  'include' |
  /** 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息 */
  'same-origin' |
  /** 从不发送cookies */
  'omit';


/** 缓存策略 */
type Cache =
  /** 浏览器从HTTP缓存中寻找匹配的请求 */
  'default' |
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'no-cache' |
  /** 浏览器直接从远程服务器获取资源，不查看缓存，然后使用下载的资源更新缓存 */
  'reload' |
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'force-cache' |
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'only-if-cached';


interface ITaroResponse<T = any> {
  /** 开发者服务器返回的数据 */
  data: T
  /** 开发者服务器返回的 HTTP Response Header */
  header: TaroGeneral.IAnyObject
  /** 开发者服务器返回的 HTTP 状态码 */
  statusCode: number
  /** 调用结果 */
  errMsg: string
  /** cookies */
  cookies?: string[]
}
