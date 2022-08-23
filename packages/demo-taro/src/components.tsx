import { ScrollView, View } from '@tarojs/components';

import { Skeleton } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { JSONStringify, judgeIsSuccess, useStore } from '@yimoko/store';
import { Card, covnPropsComponents, ResponseError, Sidebar } from '@yimoko/taro';

export const Test = observer((props: any) => {
  const { value, children } = props;
  console.log('test', props);
  return (
    <>
      <div>value:{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</div>
      <div>children: {children}</div>
    </>
  );
});

const ProductsIndex = observer((props: any) => {
  const store = useStore<any, any[]>(props.store);
  const { loading, response, runAPI } = store;

  console.log('xxx');

  return (
    <Skeleton loading={loading} row={20}>
      <ResponseError loading={loading} response={response} onAgain={() => {
        runAPI();
      }}
      >

      </ResponseError>
      {judgeIsSuccess(response) && (
        <View>
          <ScrollView scrollY>
            {response.data?.map(item => item.products?.map((p, i) => <Card price='' key={p?.id ?? i} {...p} />))}
          </ScrollView>
          <Sidebar options={response.data} />
        </View>
      )}
    </Skeleton>
  );
});

export const componentsMap = {
  ...covnPropsComponents,
  Test,
  ProductsIndex,
};

