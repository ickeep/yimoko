import Taro from '@tarojs/taro';

import { adapter } from './adapter';

export function getStorage<T = any>(key: string) {
  return adapter<Taro.getStorage.SuccessCallbackResult<T>>(Taro.getStorage, { key });
}

export function setStorage(key: string, data: any) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setStorage, { key, data });
}

export function removeStorage(key: string) {
  return adapter<TaroGeneral.CallbackResult>(Taro.removeStorage, { key });
}

export function clearStorage() {
  return adapter<TaroGeneral.CallbackResult>(Taro.clearStorage);
}
