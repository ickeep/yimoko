import { ISchema } from '@formily/react';

import { DF_KEYS } from '../../tools/options';

import { JSONParse, JSONStringify } from '../../tools/tool';
import { BaseStore, IField } from '../base';

export const getSearchParamByValue = (value: any) => (typeof value === 'object' ? JSONStringify(value) : value?.toString?.() ?? '');

export const getValueBySearchParam = (searchParam?: string, schema: ISchema = {}, dfValue: any = '') => {
  const { type = Array.isArray(dfValue) ? 'array' : typeof dfValue } = schema;
  const typeFnMap: Record<string, Function> = {
    number: (value: string) => Number(value),
    bigint: (value: string) => BigInt(value),
    boolean: (value: string) => value === 'true',
    object: (value: string) => JSONParse(value),
    array: (value: string) => {
      const arr = JSONParse(value, []);
      return Array.isArray(arr) ? arr : [];
    },
    void: () => undefined,
  };
  const typeFn = typeFnMap[type];
  return typeFn ? typeFn(searchParam) : searchParam;
};

export const getFieldSplitter = (field: IField<any>, store: BaseStore<any, any>) => {
  const { fieldsConfig } = store;
  return fieldsConfig?.[field]?.['x-component-props']?.splitter ?? ',';
};

export const getFieldType = (field: IField<any>, store: BaseStore<any, any>) => {
  const { fieldsConfig, defaultValues } = store;
  const type = fieldsConfig?.[field]?.type;
  if (type) {
    return type;
  }
  const df = defaultValues[field];
  if (Array.isArray(df)) {
    return 'array';
  };
  const valType = typeof df;
  if (valType !== 'undefined') {
    return valType;
  }
  return undefined;
};

export const getFieldIsMultiple = (field: IField<any>, store: BaseStore<any, any>) => {
  const mode = store.fieldsConfig?.[field]?.['x-component-props']?.mode;
  return !!(mode && ['multiple', 'tags'].includes(mode));
};

export const getFieldKeys = (field: IField<any>, store: BaseStore<any, any>) => {
  const { fieldsConfig } = store;
  return { ...DF_KEYS, ...fieldsConfig?.[field]?.['x-component-props']?.keys };
};

export type IFieldsConfig<P extends object = Record<string, any>> = Record<keyof P | string, ISchema<any>>;

export type IGetFields<P extends object = Record<string, any>> = (fieldNames: IFieldNames<P>, config: IFieldsConfig) => ISchema[];

export type IFieldNames<P extends object = Record<string, any>> = ((ISchema & { name: string }) | keyof P | string)[];
