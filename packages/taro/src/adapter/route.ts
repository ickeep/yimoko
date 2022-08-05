import Taro from '@tarojs/taro';

import { getIsTabURL } from '../store/config';

import { adapter } from './adapter';

export const route = {
  to: (url: string, events?: TaroGeneral.IAnyObject) => adapter<TaroGeneral.CallbackResult, Error>(
    getIsTabURL(url) ? Taro.switchTab : Taro.navigateTo,
    { url, events },
  ),
  tab: (url: string) => adapter<TaroGeneral.CallbackResult, Error>(getIsTabURL(url) ? Taro.switchTab : Taro.navigateTo, { url }),
  reLaunch: (url: string) => adapter<TaroGeneral.CallbackResult, Error>(getIsTabURL(url) ? Taro.switchTab : Taro.reLaunch, { url }),
  redirect: (url: string) => adapter<TaroGeneral.CallbackResult, Error>(getIsTabURL(url) ? Taro.switchTab : Taro.redirectTo, { url }),
  back: (delta: number) => adapter<TaroGeneral.CallbackResult, Error>(Taro.navigateBack, { delta }),
};

export const navigate = (url: string, routeType: IRouteType) => {
  if (routeType === 'back') {
    const urlNum = Number(url);
    route.back(isNaN(urlNum) ? 1 : urlNum);
  } else {
    route[routeType](url);
  }
};

export type IRouteType = keyof typeof route;
