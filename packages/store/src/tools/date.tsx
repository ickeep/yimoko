import moment, { Moment } from 'moment';

import { judgeIsEmpty } from './tool';

export const valToDate = (value?: string | number | Date, format?: IFormatKey | string, timestamp: 'ms' | 's' = 'ms') => {
  if (judgeIsEmpty(value)) {
    return undefined;
  }
  const timeMap = {
    ms: (num: number) => (num >= 0 ? moment(num) : undefined),
    s: (num: number) => (num >= 0 ? moment.unix(num) : undefined),
  };
  if (timestamp) {
    const num = Number(value);
    return timeMap[timestamp]?.(num);
  }
  return format ? moment(value, format) : moment(value);
};

export const dateToVal = (v: Moment | null, format?: IFormatKey, timestamp: 'ms' | 's' = 'ms') => {
  if (!v) {
    return '';
  }
  if (timestamp === 'ms') {
    return v.valueOf();
  }
  if (timestamp === 's') {
    return v.unix();
  }
  return v.format(format);
};


export interface IPickerFormat {
  year: 'YYYY',
  quarter: 'YYYY Q',
  month: 'YYYY-MM',
  week: 'YYYY W',
  day: 'YYYY-MM-DD',
  date: 'YYYY-MM-DD',
  hour: 'YYYY-MM-DD HH',
  minute: 'YYYY-MM-DD HH:mm',
  seconds: 'YYYY-MM-DD HH:mm:ss',
  time: 'YYYY-MM-DD HH:mm:ss',
};
type IFormatKey = keyof IPickerFormat;
