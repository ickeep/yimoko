import { Key } from 'react';

import { judgeIsEmpty } from './tool';

// 字符串转数组，空字符应该被转换为空数组
export const strToArr = (str?: string, splitter = ',') => (str ? (str?.split?.(splitter) ?? []) : []);

export function judgeValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

export type IVersion = string | number | Record<Key, string | number>;

// eslint-disable-next-line complexity
export const getAutoHref = (href: string, host = '', version?: IVersion, name?: string, versionKey?: string) => {
  const isExternal = /^[\w]+:\/\//.test(href);
  const url = isExternal ? href : host + href;

  if (judgeIsEmpty(version)) {
    return url;
  }
  const versionStr = typeof version === 'object' ? (version[name ?? href] ?? '') : version;
  if (!versionStr) {
    return url;
  }
  const versionMark = /\?/.test(url) ? '&' : '?';
  return `${url}${versionMark}${versionKey ? versionKey : '__ver__'}=${versionStr}`;
};
