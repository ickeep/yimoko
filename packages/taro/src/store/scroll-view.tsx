import { Loading } from '@antmjs/vantui';
import { createForm } from '@formily/core';
import { RecordScope, RecursionField, useExpressionScope, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import {
  IListStoreConfig, judgeIsEmpty, judgeIsSuccess, ListStore, SchemaBox, useAPIExecutor,
  useDeepMemo, useIsOut, useSchemaField, useSchemaItems,
} from '@yimoko/store';
import { useMemo } from 'react';

import { ResponseError } from '../out/response-error';

import { StoreSearch } from './search';

export interface StoreScrollViewProps extends ScrollViewProps {
  store?: ListStore | IListStoreConfig
}
export const StoreScrollView = observer((props: StoreScrollViewProps) => {
  const { store, onRefresherRefresh, onScrollToLower, children, ...args } = props;
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
    <View className='y-store-scroll-view'>
      {!judgeIsSuccess(response)
        ? <ResponseError response={response} onAgain={runAPI} loading={loading} />
        : <ScrollView
          scrollY
          enhanced
          {...args}
          refresherEnabled
          refresherTriggered={loading}
          onRefresherRefresh={(e) => {
            onRefresherRefresh?.(e);
            const { page } = curStore.keysConfig;
            runAPIByField(page, 1);
          }}
          onScrollToLower={(e) => {
            loadMore();
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
            'x-component': 'RenderDataItems',
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

const RenderMoreState = observer((props: { store: ListStore }) => {
  const { store } = props;
  const { isNoMore, moreLoading, moreResponse, loadMore } = store;

  return (
    <View className="c-more">
      {isNoMore
        ? '没有更多了'
        : <>{moreLoading
          ? <Loading size='24px' >加载中…</Loading>
          : <>{!judgeIsEmpty(moreResponse) && !judgeIsSuccess(moreResponse)
            ? <View onClick={loadMore}>加载出错，点击重新加载</View>
            : '加载更多'
          }</>
        }</>
      }
    </View>
  );
});

export const RenderDataItems = observer((props: { data: any[] }) => {
  const { data } = props;
  const curItems = useSchemaItems();
  return <>
    {data?.map((r, i) => {
      const curItem = curItems[i] ?? curItems[0];
      return (
        <RecordScope key={i} getRecord={() => r ?? {}} getIndex={() => i ?? 0}>
          <RecursionField schema={curItem} name={i} onlyRenderProperties />
        </RecordScope>
      );
    })}
  </>;
});
