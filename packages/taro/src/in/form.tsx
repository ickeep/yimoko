import { observer } from '@formily/reactive-react';
import { Form as TForm, FormProps as TFormProps } from '@tarojs/components';
import classNames from 'classNames';
import { ReactNode } from 'react';

import { Ilayout } from '../props';
export interface FormProps extends TFormProps {
  layout?: Ilayout
  value?: ReactNode
  children?: ReactNode,
}

export const Form = observer((props: FormProps) => {
  const { value, children, className, layout, ...args } = props;

  // @ts-ignore
  return <TForm {...args} className={classNames('y-form', { [`y-form-${layout}`]: layout }, className)} >{value ?? children}</TForm>;
});
