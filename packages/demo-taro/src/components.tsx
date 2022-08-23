import { ScrollView, View } from '@tarojs/components';

import { Skeleton } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { JSONStringify, judgeIsSuccess, useStore } from '@yimoko/store';
import { Card, covnPropsComponents, ResponseError, Sidebar } from '@yimoko/taro';
import { useRef, useState } from 'react';

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
  const scrollRef = useRef();

  const [barValue, setBarValue] = useState(0);

  if (loading) {
    <Skeleton loading={loading} row={20} />;
  }

  if (!judgeIsSuccess(response)) {
    return <ResponseError loading={loading} response={response} onAgain={() => {
      runAPI();
    }}
    />;
  }

  return (
    <View className='y-products-index'>
      <Sidebar className='c-sidebar' value={barValue} onChange={(v) => {
        setBarValue(v);
      }} options={response.data}
      />
      <ScrollView
        scrollY
        className='c-scroll-view'
        ref={scrollRef}
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={() => {
          runAPI();
        }}
        onScroll={() => {
          console.log(scrollRef.current);
        }}
      >
        {response.data?.map(item => item.products?.map((p, i) => <Card price='' key={p?.id ?? i} {...p} />))}
      </ScrollView>
    </View>

  );
});

export const componentsMap = {
  ...covnPropsComponents,
  Test,
  ProductsIndex,
};

