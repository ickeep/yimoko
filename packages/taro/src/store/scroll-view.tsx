import { useExpressionScope } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import { IListStoreConfig, judgeIsSuccess, ListStore, useAPIExecutor, useDeepMemo } from '@yimoko/store';

import { ResponseError } from '../out/response-error';

import { StoreSearch } from './search';

export interface StoreScrollViewProps extends ScrollViewProps {
  store?: ListStore | IListStoreConfig
}
export const StoreScrollView = observer((props: StoreScrollViewProps) => {
  const { store, ...args } = props;
  const apiExecutor = useAPIExecutor();
  const scope = useExpressionScope();
  const curStore: ListStore | undefined = useDeepMemo(() => {
    if (store instanceof ListStore) {
      return store;
    }
    if (store) {
      return new ListStore({ apiExecutor, ...store });
    }
    return scope?.curStore;
  }, [store]);

  if (!curStore) {
    return null;
  }

  const { loading, response, runAPI } = curStore;

  return (
    <View className='y-store-scroll-view'>
      {!judgeIsSuccess(response)
        ? <ResponseError response={response} onAgain={runAPI} loading={loading} />
        : <ScrollView {...args}>

        </ScrollView>
      }
      {store && <StoreSearch store={curStore} />}
    </View>
  );
});
