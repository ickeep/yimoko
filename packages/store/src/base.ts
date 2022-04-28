import { action, define, observable } from '@formily/reactive';
import { AxiosRequestConfig } from 'axios';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { httpRequest, IHTTPResponse } from './http';
import { judgeIsEmpty } from './tool';


export class BaseStore<V extends object = IStoreValues, R = IStoreValues> {
  defaultValues: IV<V>;
  dictConfig?: IStoreDictConfig<V>;
  api: IStoreApi<V, R>;

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
      fetchData: action,
      fetchDataByField: action,
      fetchDataByValues: action,
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

  fetchData = async () => {
    this.setLoading(true);
    this.lastFetchID += 1;
    const fetchID = this.lastFetchID;
    const params = pickBy(this.values, value => (!judgeIsEmpty(value))) as IV<V>;
    const { api } = this;
    const response = await (typeof api === 'function' ? api(params) : httpRequest(api));
    if (fetchID === this.lastFetchID) {
      this.setResponse(response);
      this.setLoading(false);
    }
    return response;
  };

  fetchDataByField = (field: IField<V>, value: any) => {
    this.setValuesByField(field, value);
    return this.fetchData();
  };

  fetchDataByValues = (values: Partial<V>) => {
    this.setValues(values);
    return this.fetchData();
  };
}

export type IStoreConfig<V extends object = IStoreValues, R = IStoreValues> = {
  defaultValues: V,
  api: IStoreApi<V, R>,
  dictConfig?: IStoreDictConfig<V>
};

export type IStoreValues = Record<string, any>;

type IV<V = IStoreValues> = V & Record<string, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R, V> = Partial<IHTTPResponse<R, IV<V>>>;

export type IStoreApi<V, R> = AxiosRequestConfig<V> | ((params: V) => Promise<IStoreResponse<R, V>>);

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

export type IDictConfigItem<V extends object = IStoreValues> = {
  field: IField<V>,
} & ({
  type?: 'self'
  data?: IOptions | any,
  fetchData?: () => Promise<IHTTPResponse<IOptions | any>>
} | IDictConfigItemBy<V>);

export interface IDictConfigItemBy<V extends object = IStoreValues> {
  field: IField<V>,
  type: 'by'
  byField: IField<V>,
  getData?: (value: any) => IOptions | any
  fetchData?: (value?: any) => Promise<IHTTPResponse<IOptions | any>>
}

export type IField<P extends object = IStoreValues> = keyof P | string;

export type IOptions = Array<{ label: string, value: any }>;
