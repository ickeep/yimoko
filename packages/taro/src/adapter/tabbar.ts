import Taro from '@tarojs/taro';

import { adapter } from './adapter';

export function showTabBarRedDot(index: number) {
  return adapter<TaroGeneral.CallbackResult>(Taro.showTabBarRedDot, { index });
}
export function showTabBar(animation?: boolean) {
  return adapter<TaroGeneral.CallbackResult>(Taro.showTabBar, { animation });
}

export function setTabBarStyle(options: Omit<Taro.setTabBarStyle.Option, 'complete' | 'fail' | 'success'>) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setTabBarStyle, options);
}

export function setTabBarItem(options: Omit<Taro.setTabBarItem.Option, 'complete' | 'fail' | 'success'>) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setTabBarItem, options);
}

export function setTabBarBadge(options: Omit<Taro.setTabBarBadge.Option, 'complete' | 'fail' | 'success'>) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setTabBarBadge, options);
}

export function removeTabBarBadge(index: number) {
  return adapter<TaroGeneral.CallbackResult>(Taro.removeTabBarBadge, { index });
}

export function hideTabBarRedDot(index: number) {
  return adapter<TaroGeneral.CallbackResult>(Taro.hideTabBarRedDot, { index });
}

export function hideTabBar(animation?: boolean) {
  return adapter<TaroGeneral.CallbackResult>(Taro.hideTabBar, { animation });
}
