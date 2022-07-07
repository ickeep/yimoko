import { ISchema } from '@formily/react';

import { JSONParse, JSONStringify } from '../../tools/tool';
import { BaseStore } from '../base';

export const getFields: IGetFields = (fieldNames, config) => fieldNames.map((field) => {
  if (typeof field === 'string') {
    return config[field] ?? { name: field };
  }
  return { ...config[field.name], ...field };
});

export const getSearchParamByValue = (value: any) => (typeof value === 'object' ? JSONStringify(value) : value?.toString?.());

export const getValueBySearchParam = (searchParam: string, schema: ISchema = {}, dfValue: any = '') => {
  const { type = typeof dfValue } = schema;
  const typeFnMap: Record<string, Function> = {
    number: (value: string) => Number(value),
    boolean: (value: string) => value === 'true',
    object: (value: string) => JSONParse(value),
    array: (value: string) => {
      const arr = JSONParse(value, []);
      return Array.isArray(arr) ? arr : [];
    },
    void: () => undefined,
  };
  return typeFnMap[type]?.(searchParam) ?? searchParam;
};

export type IFieldsConfig<P extends object = Record<string, any>> = Record<keyof P | string, ISchema>;

export type IGetFields<P extends object = Record<string, any>> = (fieldNames: IFieldNames<P>, config: IFieldsConfig) => ISchema[];

export type IFieldNames<P extends object = Record<string, any>> = ((ISchema & { name: string }) | keyof P | string)[];


export const getFieldSplitter = (field: string, store: BaseStore<any, any>) => store.fieldsConfig?.[field]?.['x-component-props']?.splitter ?? ',';

export const getFieldType = (field: string, store: BaseStore<any, any>) => {
  const { fieldsConfig, defaultValues } = store;
  const type = fieldsConfig?.[field]?.type;
  if (type) {
    return type;
  }
  const valType = typeof defaultValues[field];
  if (valType !== 'undefined') {
    return valType;
  }
  return undefined;
};
