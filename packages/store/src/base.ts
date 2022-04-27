import { action, IBoundable, observable } from '@formily/reactive';
import { cloneDeep, pick, pickBy } from 'lodash-es';

import { IResponse } from './http';
import { getIsEmpty } from './tool';

const actionBound = action.bound as Required<IBoundable>['bound'];

export class BaseStore<V extends object = IStoreValues, R = IStoreValues> {
  defaultValues: IV<V>;
  values: IV<V>;
  dictConfig?: IStoreDictConfig<V>;
  api: IStoreApi<V, R>;

  dict: IStoreDict<V> = observable({});
  response: IStoreResponse<R> = observable({});
  loading = observable.box(false);

  setValues = actionBound((values: Partial<V>) => {
    Object.entries(values).forEach((item) => {
      const [key, value] = item as [keyof typeof values, any];
      this.values[key] = value;
    });
  });

  resetValues = actionBound(() => this.values = cloneDeep(this.defaultValues));

  resetValuesByFields = actionBound((fields: Array<keyof V>) => {
    this.setValues(cloneDeep(pick(this.defaultValues, fields)));
  });

  setValuesByField = actionBound((field: IField<V>, value: any) => this.values[field] = value);


  setDict = actionBound((dict: IStoreDict<V>) => this.dict = dict);

  setDictByField = actionBound((field: IField<V>, value: any) => {
    this.dict[field] = value;
  });

  setLoading = actionBound((loading: boolean) => this.loading.set(loading));

  setResponse = actionBound((data: IStoreResponse<R>) => this.response = data);

  fetchData = actionBound(async () => {
    this.setLoading(true);
    this.lastFetchID += 1;
    const fetchID = this.lastFetchID;
    const params = pickBy(this.values, value => (!getIsEmpty(value))) as IV<V>;
    const response = await this.api(params);
    if (fetchID === this.lastFetchID) {
      this.setResponse(response);
      this.setLoading(false);
    }
    return response;
  });

  fetchDataByField = actionBound((field: IField<V>, value: any) => {
    this.setValuesByField(field, value);
    return this.fetchData();
  });

  fetchDataByValues = actionBound((values: Partial<V>) => {
    this.setValues(values);
    return this.fetchData();
  });

  private lastFetchID = 0;

  constructor(config: IStoreConfig<V, R>) {
    const { defaultValues, api, dictConfig } = config;
    this.defaultValues = defaultValues;
    this.dictConfig = dictConfig;
    this.api = api;

    this.values = observable<V>(cloneDeep(defaultValues));
  }
}

export type IStoreConfig<V extends object = IStoreValues, R = IStoreValues> = {
  defaultValues: V,
  api: IStoreApi<V, R>,
  dictConfig?: IStoreDictConfig<V>
};

export type IStoreValues = Record<string, any>;

type IV<V = IStoreValues> = V & Record<string, any>;

export type IStoreDict<V extends object = IStoreValues> = { [key in IField<V>]?: any };

export type IStoreResponse<R> = Partial<IResponse<R>>;

export type IStoreApi<V, R> = (params: V) => Promise<IStoreResponse<R>>;

export type IStoreDictConfig<V extends object = IStoreValues> = Array<IDictConfigItem<V>>;

export type IDictConfigItem<V extends object = IStoreValues> = {
  field: IField<V>,
} & ({
  type?: 'self'
  data?: IOptions | any,
  fetchData?: () => Promise<IResponse<IOptions | any>>
} | IDictConfigItemBy<V>);

export interface IDictConfigItemBy<V extends object = IStoreValues> {
  field: IField<V>,
  type: 'by'
  byField: IField<V>,
  getData?: (value: any) => IOptions | any
  fetchData?: (value?: any) => Promise<IResponse<IOptions | any>>
}

export type IField<P extends object = IStoreValues> = keyof P | string;

export type IOptions = Array<{ label: string, value: any }>;
