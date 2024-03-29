import { ConfigProvider, Loading } from '@antmjs/vantui';
import { LoadingProps } from '@antmjs/vantui/types/loading';
import { observer } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { IStore, judgeIsSuccess, useConfig, useRoot } from '@yimoko/store';
import cls from 'classnames';
import { useEffect, useMemo } from 'react';

import { setBackgroundColor, setBackgroundTextStyle } from '../adapter/background';
import { hideNavigationBarLoading, setNavigationBarColor, setNavigationBarTitle, showNavigationBarLoading } from '../adapter/navigation-bar';
import { ResponseError } from '../out/response-error';
import { IConfig } from '../store/config';

export interface PageProps extends ViewProps {
  store?: IStore
  loading?: LoadingProps
  navigationBar?: {
    title?: string
    color?: Omit<Taro.setNavigationBarColor.Option, 'complete' | 'fail' | 'success'>
  }
  background?: {
    textStyle?: 'dark' | 'light',
    color?: Omit<Taro.setBackgroundColor.Option, 'complete' | 'fail' | 'success'>
  }
}

export const Page = observer(({ className, children, loading, store, navigationBar = {}, background = {}, ...args }: PageProps) => {
  const { loading: rootLoading } = useRoot();
  const { response, loading: storeLoading } = store ?? {};
  const { title, color: barColor } = navigationBar;
  const { textStyle, color: bColor } = background;

  const curLoading = useMemo(() => rootLoading || !!storeLoading, [rootLoading, storeLoading]);
  const { themeVars } = useConfig<IConfig>();

  useEffect(() => {
    if (curLoading) {
      showNavigationBarLoading();
    } else {
      hideNavigationBarLoading();
    }
  }, [curLoading]);

  useEffect(() => {
    title && setNavigationBarTitle(title);
  }, [title]);

  useEffect(() => {
    barColor && setNavigationBarColor(barColor);
  }, [barColor]);

  useEffect(() => {
    textStyle && setBackgroundTextStyle(textStyle);
  }, [textStyle]);

  useEffect(() => {
    bColor && setBackgroundColor(bColor);
  }, [bColor]);

  const curChildren = useMemo(() => {
    if (curLoading) {
      return <Loading {...loading} className={cls('c-page-loading', loading?.className)} />;
    }
    if (response && !judgeIsSuccess(response)) {
      return <ResponseError response={response} />;
    }
    return children;
  }, [curLoading, response, children, loading]);

  return (
    // taro App 挂载 ConfigProvider 无效
    <ConfigProvider themeVars={themeVars}>
      <View className={cls('y-page', className)} {...args} >
        {curChildren}
      </View>
    </ConfigProvider>
  );
});
