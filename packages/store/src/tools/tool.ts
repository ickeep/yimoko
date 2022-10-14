import { isEmpty } from 'lodash-es';
// 判断值是否等于 {} | [] | '' | null | undefined  使用 is 可使后续使用不再提示 undefined null
export const judgeIsEmpty = (value: any): value is (null | undefined | '') => {
  const type = typeof value;
  if (['boolean', 'number', 'bigint', 'function'].includes(type)) {
    return false;
  }
  return isEmpty(value);
};

export const JSONParse = (text: string, defaultValue: object = {}, reviver?: (this: any, key: string, value: any) => any) => {
  try {
    return JSON.parse(text, reviver);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const JSONStringify = (value: any, defaultValue = '', ...args: any[]) => {
  if (!value || typeof value !== 'object') {
    return defaultValue;
  }

  try {
    return JSON.stringify(value, ...args);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const getAutoArr = (value: any) => {
  if (judgeIsEmpty(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};
