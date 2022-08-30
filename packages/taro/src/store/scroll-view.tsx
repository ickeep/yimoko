import { createForm } from '@formily/core';
import { RecordScope, RecursionField, useExpressionScope, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import {
  IListStoreConfig, judgeIsSuccess, ListStore, SchemaBox, useAPIExecutor,
  useDeepMemo, useIsOut, useSchemaField, useSchemaItems,
} from '@yimoko/store';
import { useMemo } from 'react';

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

  const { loading, response, runAPI, listData } = curStore;

  return (
    <View className='y-store-scroll-view'>
      {!judgeIsSuccess(response)
        ? <ResponseError response={response} onAgain={runAPI} loading={loading} />
        : <ScrollView {...args}>
          <RenderItems data={listData} />
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


export const RenderDataItems = (props: { data: any[] }) => {
  const { data } = props;
  const curItems = useSchemaItems();

  return data?.map((r, i) => {
    const curItem = curItems[i] ?? curItems[0];
    return (
      <RecordScope getRecord={() => r ?? {}} getIndex={() => i ?? 0}>
        <RecursionField schema={curItem} name={i} onlyRenderProperties />
      </RecordScope>
    );
  });
};
