import { Form as FormType, ObjectField } from '@formily/core';
import { useParentForm, FormProvider, ExpressionScope } from '@formily/react';
import { Form as TForm, FormProps } from '@tarojs/components';
import React from 'react';

export interface IFormProps extends FormProps {
  form?: FormType
  previewTextPlaceholder?: React.ReactNode
  children?: React.ReactNode
}

export const Form: React.FC<IFormProps> = (props) => {
  const { form, previewTextPlaceholder, children, ...args } = props;
  const top = useParentForm();

  const renderContent = (form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: form }}>
      <TForm {...args} >
        {children}
      </TForm>
    </ExpressionScope>
  );

  if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>;

  if (!top) throw new Error('must pass form instance by createForm');

  return renderContent(top);
};
