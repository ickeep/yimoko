import { Loading } from '@antmjs/vantui';
import { createForm } from '@formily/core';
import { useExpressionScope, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import {
  IListStoreConfig, judgeIsEmpty, judgeIsSuccess, ListStore, SchemaBox,
  useAPIExecutor, useDeepMemo, useIsOut, useSchemaField,
} from '@yimoko/store';
import cls from 'classnames';
import { useMemo } from 'react';

import { ResponseError } from '../out/response-error';

import { StoreSearch } from './search';

const defaultMore = {
  noMore: '没有更多了',
  loading: '加载中...',
  loadMore: '加载更多',
  loadError: '加载出错，点击重新加载',
};

export interface StoreScrollViewProps extends ScrollViewProps {
  store?: ListStore | IListStoreConfig
  isToLowerLoad?: boolean
  more?: Partial<typeof defaultMore>
}
export const StoreScrollView = observer((props: StoreScrollViewProps) => {
  const { store, onRefresherRefresh, onScrollToLower, isToLowerLoad = true, className, children, ...args } = props;
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

  const { loading, response, runAPI, loadMore, listData, runAPIByField } = curStore;

  return (
    <View className={cls('y-store-scroll-view', className)}>
      {!judgeIsSuccess(response)
        ? <ResponseError response={response} onAgain={runAPI} loading={loading} />
        : <ScrollView
          scrollY
          enhanced
          refresherEnabled
          refresherTriggered={loading}
          {...args}
          onRefresherRefresh={(e) => {
            onRefresherRefresh?.(e);
            const { page } = curStore.keysConfig;
            runAPIByField(page, 1);
          }}
          onScrollToLower={(e) => {
            isToLowerLoad && loadMore();
            onScrollToLower?.(e);
          }}
          className="c-scroll">
          <RenderItems data={listData} />
          {children}
          <RenderMoreState store={curStore} />
        </ScrollView>
      }
      {store && <StoreSearch store={curStore} />}
    </View>
  );
});

const RenderItems = (props: { data: any[] }) => {
  const { data } = props;
  const isOut = useIsOut();
  const model = useMemo(() => (isOut ? createForm({ values: { data } }) : undefined), [data, isOut]);
  const SchemaField = useSchemaField();
  const fieldSchema = useFieldSchema();
  const schema = useMemo(() => {
    if (isOut) {
      const { name, 'x-component-props': props, ...args } = fieldSchema?.toJSON();
      return {
        type: 'object',
        properties: {
          data: {
            ...args,
            type: 'array',
            'x-component': 'DataItems',
            'x-component-props': { ...props, data },
          },
        },
      };
    }
    return {};
  }, [data, fieldSchema, isOut]);
  return (
    <SchemaBox model={model}>
      <SchemaField schema={schema} />
    </SchemaBox>
  );
};

const RenderMoreState = observer((props: Pick<StoreScrollViewProps, 'more'> & { store: ListStore }) => {
  const { store, more } = props;
  const { isNoMore, moreLoading, moreResponse, loadMore } = store;
  const curMore = useMemo(() => ({ ...defaultMore, ...more }), [more]);

  return (
    <View className="c-more">
      {isNoMore
        ? curMore.noMore
        : <>{moreLoading
          ? <Loading size='24px' >{curMore.loading}</Loading>
          : <View onClick={loadMore}>
            {!judgeIsEmpty(moreResponse) && !judgeIsSuccess(moreResponse) ? curMore.loadError : curMore.loadMore}
          </View>
        }</>
      }
    </View>
  );
});


