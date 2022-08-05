import Taro from '@tarojs/taro';

import { adapter } from './adapter';

export const getSystemInfo = adapter<Taro.getSystemInfo.Result>(Taro.getSystemInfo);
