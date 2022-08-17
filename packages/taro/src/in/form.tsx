import { observer, useExpressionScope, useForm } from '@formily/react';
import { Form as TForm, FormProps as TFormProps } from '@tarojs/components';

export const Form = observer((props: TFormProps) => {
  const { onSubmit, ...args } = props;
  const form = useForm();
  const scope = useExpressionScope();
  return (
    <TForm {...args} onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onSubmit?.(e);
      form?.submit(() => {
        scope?.curStore?.runAPI();
      });
    }} />
  );
});
