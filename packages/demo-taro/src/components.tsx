import { observer } from '@formily/react';
import { JSONStringify } from '@yimoko/store';
import { covnPropsComponents } from '@yimoko/taro';

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

export const componentsMap = {
  ...covnPropsComponents,
  Test,
};

