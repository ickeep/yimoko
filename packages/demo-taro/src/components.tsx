import { ScrollView, View } from '@tarojs/components';

import { Skeleton } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { JSONStringify, useStore } from '@yimoko/store';
import { covnPropsComponents, ResponseError, Sidebar } from '@yimoko/taro';

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
  console.log('products index', props);

  const store = useStore(props.store);

  const { loading, response, runAPI } = store;

  console.log(response.data);

  return (
    <Skeleton loading={loading} row={20}>
      <ResponseError loading={loading} response={response} onAgain={() => {
        runAPI();
      }}
      >
        <View>
          <ScrollView scrollY>
            <Sidebar options={response.data ?? []} />
          </ScrollView>
        </View>
      </ResponseError>
    </Skeleton>
  );
});

export const componentsMap = {
  ...covnPropsComponents,
  Test,
  ProductsIndex,
};

