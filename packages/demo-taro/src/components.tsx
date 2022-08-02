import { FormItem as TFormItem, Form as TForm } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { JSONStringify } from '@yimoko/store';
import { components } from '@yimoko/taro';


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


const FormItem = observer((props: any) => {
  console.log(props);
  return <TFormItem {...props} />;
});

const Form = observer((props: any) => {
  console.log('xxxx', props);
  return <TForm {...props} />;
});


export const componentsMap = {
  ...components,
  Test,
  Form,
  FormItem,
};

