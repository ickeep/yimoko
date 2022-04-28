import { action, define, observable } from '@formily/reactive';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { judgeIsEmpty } from './tool';

export class BaseStore<V extends object = IStoreValues, R = IStoreValues> {
  defaultValues: IV<V>;
  dictConfig?: IStoreDictConfig<V>;
  // 兼容不同端 如 小程序 web rn
  apiExecutor?: IHTTPRequest;
  api: IStoreAPI<V, R>;

  values: IV<V>;
  dict: IStoreDict<V> = {};
  response: IStoreResponse<R, V> = {};
  loading = false;

  private lastFetchID = 0;

  constructor(config: IStoreConfig<V, R>) {
    const { defaultValues, api, dictConfig } = config;
    this.defaultValues = defaultValues;
    this.dictConfig = dictConfig;
    this.api = api;

    this.values = cloneDeep(defaultValues);
    define(this, {
      values: observable,
      dict: observable,
      response: observable,
      loading: observable,

      setValues: action,
      resetValues: action,
      resetValuesByFields: action,

      setDict: action,
      setDictByField: action,

      setLoading: action,

      setResponse: action,
      runAPI: action,
      runAPIByField: action,
      runAPIByValues: action,
    });
  }

  setValues = (values: Partial<V>) => {
    Object.entries(values).forEach((item) => {
      const [key, value] = item as [keyof typeof values, any];
      this.values[key] = value;
    });
  };

  resetValues = () => this.values = cloneDeep(this.defaultValues);

  resetValuesByFields = (fields: Array<keyof V>) => {
    this.setValues(cloneDeep(pick(this.defaultValues, fields)));
  };

  setValuesByField = (field: IField<V>, value: any) => this.values[field] = value;

  setDict = (dict: IStoreDict<V>) => this.dict = dict;

  setDictByField = (field: IField<V>, value: any) => this.dict[field] = value;

  setLoading = (loading: boolean) => this.loading = loading;

  setResponse = (data: IStoreResponse<R, V>) => this.response = data;

  runAPI = async () => {
    this.setLoading(true);
    this.lastFetchID += 1;
    const fetchID = this.lastFetchID;
    const params = pickBy(this.values, value => (!judgeIsEmpty(value))) as IV<V>;
    const { api } = this;
    const response = await (typeof api === 'function' ? api(params) : this.apiExecutor?.(api));
    if (response && fetchID === this.lastFetchID) {
      this.setResponse(response);
      this.setLoading(false);
    }
    return response;
  };

  runAPIByField = (field: IField<V>, value: any) => {
    this.setValuesByField(field, value);
    return this.runAPI();
  };

  runAPIByValues = (values: Partial<V>) => {
    this.setValues(values);
    return this.runAPI();
  };
}

export type IStoreConfig<V extends object = IStoreValues, R = IStoreValues> = {
  defaultValues: V,
  api: IStoreAPI<V, R>,
  dictConfig?: IStoreDictConfig<V>
};

export type IStoreValues = Record<string, any>;

type IV<V = IStoreValues> = V & Record<string, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R, V> = Partial<IHTTPResponse<R, IV<V>>>;

export type IStoreAPI<V, R> = AxiosRequestConfig<V> | ((params: V) => Promise<IStoreResponse<R, V>>);

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

export type IDictConfigItem<V extends object = IStoreValues> = {
  field: IField<V>,
} & ({
  type?: 'self'
  data?: IOptions | any,
  runAPI?: () => Promise<IHTTPResponse<IOptions | any>>
} | IDictConfigItemBy<V>);

export interface IDictConfigItemBy<V extends object = IStoreValues> {
  field: IField<V>,
  type: 'by'
  byField: IField<V>,
  getData?: (value: any) => IOptions | any
  runAPI?: (value?: any) => Promise<IHTTPResponse<IOptions | any>>
}

export type IField<P extends object = IStoreValues> = keyof P | string;

export type IOptions = Array<{ label: string, value: any }>;

export interface IHTTPResponse<T = any, D = any> extends Partial<AxiosResponse<T, D>> {
  code: number
  msg: string,
}

export type IHTTPRequest = <R = any, P = any>(config: AxiosRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;
