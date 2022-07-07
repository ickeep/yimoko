import { observer, useForm } from '@formily/react';
import { JSONStringify } from '@yimoko/store';
import { components } from '@yimoko/web';

import { LoadTemplate } from './components/load-template';

export const Test = observer((props: any) => {
  const { value, children } = props;
  console.log('test', props);
  const form = useForm();
  console.log(form.values);

  return (
    <>
      <div>value:{typeof value === 'object' ? JSONStringify(value) : props.value?.toString() ?? null}</div>
      <div>children: {children}</div>
    </>
  );
});

export const componentsMap = {
  ...components,
  Test,
  LoadTemplate,
};


