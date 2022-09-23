import { Form } from '@formily/core';
import { action, define, observable } from '@formily/reactive';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { Key } from 'react';

import { IAPIRequestConfig, IHTTPResponse } from '../tools/api';
import { changeNumInRange } from '../tools/num';
import { IOptions } from '../tools/options';
import { judgeIsEmpty } from '../tools/tool';
import { ITransformRule, transformData } from '../tools/transform';

import { runStoreAPI } from './utils/api';
import { getSearchParamByValue, getValueBySearchParam, IFieldsConfig } from './utils/field';

import { IStore } from '.';

type ITransformFn = (values: any, store?: IStore) => any;
export interface IStoreTransform {
  reqParams?: ITransformRule | ITransformRule[] | ITransformFn
  resData?: ITransformRule | ITransformRule[] | ITransformFn
}
export class BaseStore<V extends object = IStoreValues, R extends object = any> {
  isFilterEmptyAtRun = false;
  isBindSearch = false;
  isRunNow = false;
  dictConfig: IStoreDictConfig<V> = [];
  fieldsConfig: IFieldsConfig<V> = Object({});

  transform: IStoreTransform = {};

  defaultValues: IV<V>;
  apiExecutor?: IHTTPRequest<R, V>;
  api?: IStoreAPI<V, R>;

  dict: IStoreDict<V> = {};
  values: IV<V>;
  response: IStoreResponse<R, V> = {};
  loading = false;

  form?: Form<IV<V>>;

  private lastFetchID = 0;

  constructor(config: IBaseStoreConfig<V, R> = {}) {
    const {
      api,
      isFilterEmptyAtRun = false,
      defaultValues = Object({}),
      isBindSearch = false,
      isRunNow = false,
      dictConfig = [],
      fieldsConfig = Object({}),
      transform = {},
      apiExecutor,
      form,
      defineConfig,
    } = config;
    this.dictConfig = dictConfig;
    this.fieldsConfig = fieldsConfig;

    this.transform = transform;

    this.defaultValues = defaultValues;
    this.values = cloneDeep(defaultValues);

    this.api = api;
    this.isRunNow = isRunNow;
    this.isFilterEmptyAtRun = isFilterEmptyAtRun;
    this.isBindSearch = isBindSearch;

    this.form = form;

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

  // type all undefined 则填默认值  "" 则填空字符串
  setValuesBySearch = (search: string | Partial<Record<Key, any>>, type: 'all' | 'part' = 'all') => {
    let newValues: any = {};
    if (typeof search === 'string') {
      const searchParams = new URLSearchParams(search);
      Object.keys(this.values).forEach((key) => {
        const strValue = searchParams.get(key);
        strValue !== null && (newValues[key] = getValueBySearchParam(strValue, this.fieldsConfig[key], this.defaultValues[key]));
      });
    }
    if (typeof search === 'object') {
      Object.entries(search).forEach(([key, value]) => newValues[key] = getValueBySearchParam(value, this.fieldsConfig[key], this.defaultValues[key]));
    }

    type === 'all' && (newValues = { ...this.getDefaultValues(), ...newValues });

    this.setValues(newValues);
  };

  getURLSearch = () => {
    // todo 兼容小程序 小程序不支持 URLSearchParams
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

  getAPIParams = () => {
    const params = this.isFilterEmptyAtRun ? pickBy(this.values, value => (!judgeIsEmpty(value))) : this.values;
    return transformStoreData(params, this.transform.reqParams, this);
  };

  runAPI = async () => {
    this.setLoading(true);
    this.lastFetchID = changeNumInRange(this.lastFetchID);;
    const fetchID = this.lastFetchID;
    const { api } = this;
    const params = this.getAPIParams();
    const response = await runStoreAPI(api, this.apiExecutor, params);

    response && (response.data = transformStoreData(response.data, this.transform.resData, this));

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

  runAPIDataBySearch = async (search: string | Partial<Record<Key, any>>) => {
    this.setValuesBySearch(search);
    return this.runAPI();
  };
}

export const transformStoreData = (values: any, transform: ITransformRule | ITransformRule[] | ITransformFn = [], store: IStore<any, any>) => {
  if (typeof transform === 'function') {
    return transform(values, store);
  }
  return transformData(values, transform);
};

export type IBaseStoreConfig<V extends object = IStoreValues, R extends object = any> = {
  defaultValues?: V,
  api?: IStoreAPI<V, R>,
  keysConfig?: Record<string, string>,
  dictConfig?: IStoreDictConfig<V>
  fieldsConfig?: IFieldsConfig<V>;
  transform?: IStoreTransform
  isFilterEmptyAtRun?: boolean;
  isBindSearch?: boolean;
  isRunNow?: boolean,
  apiExecutor?: IHTTPRequest;
  defineConfig?: Record<Key, any>;
  form?: Form<IV<V>>;
};

export interface IStoreValues extends Object {
  [key: Key]: any
}

type IV<V = IStoreValues> = V & Record<Key, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R = any, V = any> = Partial<IHTTPResponse<R, IV<V>>>;

export type IStoreAPI<V = any, R = any> = IAPIRequestConfig<V> | ((params: V) => Promise<IStoreResponse<R, V>>);

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

export type IDictConfigItem<V extends object = IStoreValues> = {
  field: IField<V>,
} & ({
  type?: 'self'
  data?: IOptions | any,
  api?: IAPIRequestConfig | (() => Promise<IStoreResponse>)
} | IDictConfigItemBy<V>);

export interface IDictConfigItemBy<V extends object = any> {
  field: IField<V>,
  type: 'by'
  byField: IField<V>,
  getData?: (value: any) => IOptions | any
  api?: IStoreAPI<any, IOptions[] | any>
  paramKey?: string
  isUpdateValue?: boolean
  isEmptyGetData?: boolean
}

export type IField<P extends object = IStoreValues> = keyof P | string;

export type IHTTPRequest<R = any, P = any> = (config: IAPIRequestConfig<P>) => Promise<IHTTPResponse<R, P>>;

