import Taro from '@tarojs/taro';

import { adapter } from './adapter';

export function setBackgroundTextStyle(textStyle: 'dark' | 'light') {
  return adapter<TaroGeneral.CallbackResult>(Taro.setBackgroundTextStyle, { textStyle });
}

export function setBackgroundColor(options: Omit<Taro.setBackgroundColor.Option, 'complete' | 'fail' | 'success'>) {
  return adapter<TaroGeneral.CallbackResult>(Taro.setBackgroundColor, options);
}
