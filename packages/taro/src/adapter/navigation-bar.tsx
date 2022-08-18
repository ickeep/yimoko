import Taro from '@tarojs/taro';

import { adapter } from './adapter';

export function showNavigationBarLoading() {
  return adapter<TaroGeneral.CallbackResult>(Taro.showNavigationBarLoading);
}

export function setNavigationBarTitle(title: string) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setNavigationBarTitle, { title });
}

export function setNavigationBarColor(option: Omit<Taro.setNavigationBarColor.Option, 'complete' | 'fail' | 'success'>) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setNavigationBarColor, option);
}

export function hideNavigationBarLoading() {
  return adapter<TaroGeneral.CallbackResult>(Taro.hideNavigationBarLoading);
}

export function hideHomeButton() {
  return adapter<TaroGeneral.CallbackResult>(Taro.hideHomeButton);
}


