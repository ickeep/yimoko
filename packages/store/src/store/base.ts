import { action, define, observable } from '@formily/reactive';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { getSearchParamByValue, getFields, getValueBySearchParam, IFieldsConfig, IFieldNames } from '../field';
import { judgeIsEmpty } from '../tool';

export class BaseStore<V extends object = IStoreValues, R = IStoreValues> {
  isFilterEmptyAtRun = true;
  dictConfig: IStoreDictConfig<V> = [];
  fieldsConfig: IFieldsConfig = {};
  formFieldsConfig: IFieldNames = [];

  defaultValues: IV<V>;
  apiExecutor?: IHTTPRequest<R, V>;
  api: IStoreAPI<V, R>;

  dict: IStoreDict<V> = {};
  values: IV<V>;
  response: IStoreResponse<R, V> = {};
  loading = false;

  private lastFetchID = 0;

  constructor(config: IStoreConfig<V, R>) {
    const { defaultValues, api, isFilterEmptyAtRun = true, dictConfig = [], fieldsConfig = {}, formFieldsConfig = [], apiExecutor } = config;
    this.defaultValues = defaultValues;
    this.dictConfig = dictConfig;
    this.fieldsConfig = fieldsConfig;
    this.formFieldsConfig = formFieldsConfig;
    this.api = api;
    this.isFilterEmptyAtRun = isFilterEmptyAtRun;
    apiExecutor && (this.apiExecutor = apiExecutor);
    this.values = cloneDeep(defaultValues);

    define(this, {
      formFieldsConfig: observable,
      values: observable,
      dict: observable,
      response: observable,
      loading: observable,

      formFields: observable.computed,

      setValues: action,
      resetValues: action,
      resetValuesByFields: action,
      setValuesByField: action,
      setValuesBySearch: action,

      setDict: action,
      setDictByField: action,

      setLoading: action,
      setResponse: action,

      runAPI: action,
      runAPIByField: action,
      runAPIByValues: action,
      runAPIDataBySearch: action,
    });
  }

  getDefaultValues = () => cloneDeep(this.defaultValues);

  get formFields() {
    return getFields(this.formFieldsConfig, this.fieldsConfig);
  }

  setValues = (values: Partial<V>) => {
    Object.entries(values).forEach((item) => {
      const [key, value] = item as [keyof typeof values, any];
      this.values[key] = value;
    });
  };

  resetValues = () => this.values = this.getDefaultValues();

  resetValuesByFields = (fields: Array<keyof V>) => {
    this.setValues(pick(this.getDefaultValues(), fields));
  };

  setValuesByField = (field: IField<V>, value: any) => this.values[field] = value;

  setValuesBySearch = (search: string) => {
    const newValues = this.getDefaultValues();
    const searchParams = new URLSearchParams(search);
    Object.keys(this.values).forEach((key) => {
      // @ts-ignore
      searchParams.has(key) && (newValues[key] = getValueBySearchParam(searchParams.get(key), this.fieldsConfig[key]));
    });
    this.setValues(newValues);
  };

  getURLSearch = () => {
    const searchParams = new URLSearchParams();
    Object.entries(this.values).forEach(([key, value]) => {
      const defaultValue = this.defaultValues[key];
      if (value !== defaultValue && (!judgeIsEmpty(value) || !judgeIsEmpty(defaultValue))) {
        const str = getSearchParamByValue(value);
        searchParams.append(key, str);
      }
    });
    return searchParams.toString();
  };

  setDict = (dict: IStoreDict<V>) => this.dict = dict;

  setDictByField = (field: IField<V>, value: any) => this.dict[field] = value;

  setLoading = (loading: boolean) => this.loading = loading;

  setResponse = (data: IStoreResponse<R, V>) => this.response = data;

  getAPIParams = () => (this.isFilterEmptyAtRun ? pickBy(this.values, value => (!judgeIsEmpty(value))) : this.values) as IV<V>;

  runAPI = async () => {
    this.setLoading(true);
    this.lastFetchID += 1;
    const fetchID = this.lastFetchID;
    const { api } = this;
    const params = this.getAPIParams();
    const response = await (typeof api === 'function' ? api(params) : this.apiExecutor?.({ ...api, params, data: params }));
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

  runAPIDataBySearch = async (search: string) => {
    this.setValuesBySearch(search);
    return this.runAPI();
  };
}

export type IStoreConfig<V extends object = IStoreValues, R = IStoreValues> = {
  defaultValues: V,
  api: IStoreAPI<V, R>,
  dictConfig?: IStoreDictConfig<V>
  fieldsConfig?: IFieldsConfig;
  formFieldsConfig?: IFieldNames;
  isFilterEmptyAtRun?: boolean;
  apiExecutor?: IHTTPRequest;
};

export interface IStoreValues extends Object {
  [key: string]: any
}

type IV<V = IStoreValues> = V & Record<string, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R, V> = Partial<IHTTPResponse<R, IV<V>>>;

export type IStoreAPI<V, R> = IAPIRequestConfig<V> | ((params: V) => Promise<IStoreResponse<R, V>>);

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

export type IAPIRequestConfig<V> = {
  url: string,
  method?: IMethod,
  params?: V | any,
  data?: V,
  [key: string]: any
};

export type IDictConfigItem<V extends object = IStoreValues> = {
  field: IField<V>,
} & ({
  type?: 'self'
  data?: IOptions | any,
  api?: IStoreAPI<any, IOptions[] | any>
} | IDictConfigItemBy<V>);

export interface IDictConfigItemBy<V extends object = IStoreValues> {
  field: IField<V>,
  type: 'by'
  byField: IField<V>,
  getData?: (value: any) => IOptions | any
  api?: IStoreAPI<any, IOptions[] | any>
}

export type IField<P extends object = IStoreValues> = keyof P | string;

export type IOptions = Array<{ label: string, value: any, [key: string]: any }>;

export interface IHTTPResponse<R = any, P = any> {
  code: number
  msg: string,
  data: R
  config?: IAPIRequestConfig<P>
  status?: number;
  statusText?: string;
  headers?: Record<string, any>;
  [key: string]: any
}

export type IHTTPRequest<R = any, P = any> = (config: IAPIRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

export type IMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | string;
