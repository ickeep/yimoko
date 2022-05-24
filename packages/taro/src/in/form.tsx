import { Form as FormType, ObjectField } from '@formily/core';
import { useParentForm, FormProvider, ExpressionScope } from '@formily/react';
import { Form as TForm, FormProps } from '@tarojs/components';
import classNames from 'classnames';
import { pickBy } from 'lodash-es';
import React, { createContext, useContext } from 'react';

import { FormItemInheritProps } from './form-item';

export interface IFormProps extends FormProps {
  form?: FormType
  previewTextPlaceholder?: React.ReactNode
  children?: React.ReactNode
}

export const FormInheritContext = createContext<FormItemInheritProps>({});
export const useFormInherit = () => useContext(FormInheritContext);

export const Form: React.FC<IFormProps & FormItemInheritProps> = (props) => {
  const {
    form, className, previewTextPlaceholder, children,
    colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size,
    ...args
  } = props;
  const formInherit = useFormInherit();

  const itemProps = pickBy({ colon, helpIcon, layout, labelStyle, labelAlign, labelWidth, size }, v => v !== undefined);
  const top = useParentForm();
  const renderContent = (form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: form }}>
      <TForm {...args} className={classNames('y-form', className)} >
        <FormInheritContext.Provider value={{ ...formInherit, ...itemProps }}>
          {children}
        </FormInheritContext.Provider>
      </TForm>
    </ExpressionScope>
  );

  if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>;

  if (!top) throw new Error('must pass form instance by createForm');

  return renderContent(top);
};
