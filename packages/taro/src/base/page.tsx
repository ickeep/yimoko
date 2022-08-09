import { Loading } from '@antmjs/vantui';
import { LoadingProps } from '@antmjs/vantui/types/loading';
import { observer } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { IStore, judgeIsSuccess, useRoot } from '@yimoko/store';
import cls from 'classnames';
import { useMemo } from 'react';

import { ResponseError } from '../out/response-error';

export interface PageProps extends ViewProps {
  store?: IStore
  loading?: LoadingProps
}

export const Page = observer(({ className, children, loading, store, ...args }: PageProps) => {
  const { loading: rootLoading } = useRoot();
  const { response, loading: storeLoading } = store ?? {};

  const curLoading = useMemo(() => rootLoading || !!storeLoading, [rootLoading, storeLoading]);

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
