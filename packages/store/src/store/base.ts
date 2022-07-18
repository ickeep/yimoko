import { action, define, observable } from '@formily/reactive';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { IAPIRequestConfig, IHTTPResponse } from '../data/api';
import { IOptions } from '../data/options';
import { changeNumInRange } from '../tools/num';
import { judgeIsEmpty } from '../tools/tool';

import { getSearchParamByValue, getValueBySearchParam, IFieldsConfig } from './utils/field';

export class BaseStore<V extends object = IStoreValues, R = IStoreValues> {
  isFilterEmptyAtRun = true;
  isBindSearch = false;
  isRunNow = false;
  dictConfig: IStoreDictConfig<V> = [];
  fieldsConfig: IFieldsConfig<V> = Object({});

  defaultValues: IV<V>;
  apiExecutor?: IHTTPRequest<R, V>;
  api: IStoreAPI<V, R>;

  dict: IStoreDict<V> = {};
  values: IV<V>;
  response: IStoreResponse<R, V> = {};
  loading = false;

  private lastFetchID = 0;

  constructor(config: IBaseStoreConfig<V, R>) {
    const {
      defaultValues = Object({}), api, isFilterEmptyAtRun = true, isBindSearch = false, isRunNow = false,
      dictConfig = [], fieldsConfig = Object({}), apiExecutor, defineConfig,
    } = config;
    this.dictConfig = dictConfig;
    this.fieldsConfig = fieldsConfig;

    this.defaultValues = defaultValues;
    this.values = cloneDeep(defaultValues);

    this.api = api;
    this.isRunNow = isRunNow;
    this.isFilterEmptyAtRun = isFilterEmptyAtRun;
    this.isBindSearch = isBindSearch;
    apiExecutor && (this.apiExecutor = apiExecutor);

    define(this, {
      values: observable,
      dict: observable,
      response: observable,
      loading: observable,

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
      ...defineConfig,
    });

    isRunNow && !isBindSearch && this.runAPI();
  }

  getDefaultValues = () => cloneDeep(this.defaultValues);

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
    const newValues = {};
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
    this.lastFetchID = changeNumInRange(this.lastFetchID);;
    const fetchID = this.lastFetchID;
    const { api } = this;
    const params = this.getAPIParams();
    let response: Partial<IHTTPResponse<R, IV<V>>> | undefined;
    if (typeof api === 'function') {
      response = await api(params);
    } else {
      const getAPIConfig = () => {
        const { method = 'GET' } = api;
        if (['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
          return { ...api, params };
        }
        return { ...api, data: params };
      };
      response = await this.apiExecutor?.(getAPIConfig());
    }

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

export type IBaseStoreConfig<V extends object = IStoreValues, R = IStoreValues> = {
  defaultValues?: V,
  api: IStoreAPI<V, R>,
  keysConfig?: Record<string, string>,
  dictConfig?: IStoreDictConfig<V>
  fieldsConfig?: IFieldsConfig<V>;
  isFilterEmptyAtRun?: boolean;
  isBindSearch?: boolean;
  isRunNow?: boolean,
  apiExecutor?: IHTTPRequest;
  defineConfig?: Record<string, any>;
};

export interface IStoreValues extends Object {
  [key: string]: any
}

type IV<V = IStoreValues> = V & Record<string, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R, V> = Partial<IHTTPResponse<R, IV<V>>>;

export type IStoreAPI<V, R> = IAPIRequestConfig<V> | ((params: V) => Promise<IStoreResponse<R, V>>);

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

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

export type IHTTPRequest<R = any, P = any> = (config: IAPIRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

