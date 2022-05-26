import Taro from '@tarojs/taro';

export const getSystemInfo = () => new Promise<Taro.getSystemInfo.Result | null>((resolve) => {
  try {
    Taro.getSystemInfo({
      success: res => resolve(res),
      fail: () => resolve(null),
    });
  } catch (error) {
    console.error(error);
    resolve(null);
  }
});
