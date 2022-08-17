import { Loading } from '@antmjs/vantui';
import { LoadingProps } from '@antmjs/vantui/types/loading';
import { observer } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { IStore, judgeIsSuccess, useRoot } from '@yimoko/store';
import cls from 'classnames';
import { useEffect, useMemo } from 'react';

import { hideNavigationBarLoading, setNavigationBarColor, setNavigationBarTitle, showNavigationBarLoading } from '../adapter/navigation-bar';

import { ResponseError } from '../out/response-error';

export interface PageProps extends ViewProps {
  store?: IStore
  loading?: LoadingProps
  navigationBar?: {
    title?: string
    color?: Omit<Taro.setNavigationBarColor.Option, 'complete' | 'fail' | 'success'>
  }
}

export const Page = observer(({ className, children, loading, store, navigationBar, ...args }: PageProps) => {
  const { loading: rootLoading } = useRoot();
  const { response, loading: storeLoading } = store ?? {};
  const { title, color } = navigationBar ?? {};
  const curLoading = useMemo(() => rootLoading || !!storeLoading, [rootLoading, storeLoading]);

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
    color && setNavigationBarColor(color);
  }, [color]);

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
    <View className={cls('y-page', className)} {...args} >
      {curChildren}
    </View>
  );
});
