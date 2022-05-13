import { isEmpty, isNumber } from 'lodash-es';

export const judgeIsEmpty = (value: any) => (!isNumber(value) && isEmpty(value));

export const JSONParse = (text: string, defaultValue: object = {}, reviver?: (this: any, key: string, value: any) => any) => {
  try {
    return JSON.parse(text, reviver);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const JSONStringify = (value: any, defaultValue = '', ...args: any[]) => {
  try {
    return JSON.stringify(value, ...args);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};
