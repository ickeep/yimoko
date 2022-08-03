import { Form as FormType } from '@formily/core';
import { observer } from '@formily/react';
import { Form as TForm, FormProps as TFormProps } from '@tarojs/components';
import { SchemaBox } from '@yimoko/store';
import classNames from 'classnames';
import { ReactNode } from 'react';


import { Ilayout } from '../props';
export interface FormProps extends TFormProps {
  model?: FormType
  layout?: Ilayout
  value?: ReactNode
  children?: ReactNode,
}

export const Form = observer((props: FormProps) => {
  const { model, value, children, className, layout, ...args } = props;

  return (
    <SchemaBox model={model}>
      <TForm {...args} className={classNames('y-form', { [`y-form-${layout}`]: layout }, className)} >{value ?? children}</TForm>
    </SchemaBox>
  );
});

// import { Form as TForm } from '@antmjs/vantui';
// import { FormProps as TFormProps } from '@antmjs/vantui/types/form';
// import { Form as FormType } from '@formily/core';
// import { SchemaBox } from '@yimoko/store';
// export interface FormProps extends TFormProps {
//   model?: FormType
// }

// export const Form = ({ model, ...args }: FormProps) => <SchemaBox model={model}><TForm {...args} /></SchemaBox>;
