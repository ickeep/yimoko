import Taro from '@tarojs/taro';

export const getCssSize = (value: number | string) => {
  if (typeof value === 'number') {
    return Taro.pxTransform(value, 750);
  }
  if (/^\d+(px)?$/.test(value)) {
    return Taro.pxTransform(Number(value?.replace('px', '')), 750);
  }
  return value;
};
