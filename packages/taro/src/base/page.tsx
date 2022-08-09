import { Loading } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { IStore, judgeIsSuccess, useRoot } from '@yimoko/store';
import cls from 'classnames';
import { useMemo } from 'react';

import { ResponseError } from '../out/response-error';

export interface PageProps extends ViewProps {
  store?: IStore
}

export const Page = observer(({ className, children, store, ...args }: PageProps) => {
  const { loading } = useRoot();
  const { response, loading: storeLoading } = store ?? {};

  const curLoading = useMemo(() => loading || !!storeLoading, [loading, storeLoading]);

  const curChildren = useMemo(() => {
    if (curLoading) {
      return <Loading className='c-page-loading' />;
    }
    if (response && !judgeIsSuccess(response)) {
      return <ResponseError response={response} />;
    }
    return children;
  }, [curLoading, response, children]);

  return (
    <View className={cls('y-page', className)} {...args} >
      {curChildren}
    </View>
  );
});
