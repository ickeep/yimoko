import { ISchema } from '@formily/react';

import { JSONParse, JSONStringify } from './tool';

export const getFields: IGetFields = (fieldNames, config) => fieldNames.map((field) => {
  if (typeof field === 'string') {
    return config[field] ?? { name: field };
  }
  return { ...config[field.name], ...field };
});

export const getSearchParamByValue = (value: any) => (typeof value === 'object' ? JSONStringify(value) : value?.toString?.());

export const getValueBySearchParam = (searchParam: string, schema: ISchema = {}) => {
  const { type = 'string' } = schema;
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
