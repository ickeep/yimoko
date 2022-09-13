// 字符串转数组，空字符应该被转换为空数组
export const strToArr = (str?: string, splitter = ',') => (str ? (str?.split?.(splitter) ?? []) : []);

export function judgeValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}
