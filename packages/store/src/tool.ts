import { isEmpty } from 'lodash-es';

export const judgeIsEmpty = (value: any) => {
  const type = typeof value;
  if (type === 'boolean') {
    return false;
  }
  if (type === 'number') {
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

