import { View } from '@tarojs/components';

import { useExpressionScope, observer, useForm } from '@formily/react';

import { JSONStringify } from '@yimoko/store';
import { convertPropsComponents } from '@yimoko/taro';

export const Test = observer((props: any) => {
  const { value, children } = props;
  const scope = useExpressionScope();
  const form = useForm();
  // console.log('test', props);
  // console.log('test scope', JSON.stringify(scope));
  // console.log('test form', form);

  return (
    <>
      <View>value:{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</View>
      <View>children: {children}</View>
    </>
  );
});


export const componentsMap = {
  ...convertPropsComponents,
  Test,
};

