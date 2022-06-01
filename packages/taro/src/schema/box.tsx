import { Form as FormType, ObjectField } from '@formily/core';
import { useParentForm, FormProvider, ExpressionScope } from '@formily/react';
import { pickBy } from 'lodash-es';
import React, { } from 'react';

import { Form, FormProps } from '../in/form';
import { View, ViewProps } from '../out/view';

import { useSchemaInherit, SchemaInheritContext, SchemaItemInheritProps } from './context';

export type SchemaBoxProps = {
  model?: FormType
  previewTextPlaceholder?: React.ReactNode
  children?: React.ReactNode
} & SchemaItemInheritProps & (({ type: 'form' } & FormProps) | ({ type?: 'view' } & ViewProps));

export const SchemaBox = (props: SchemaBoxProps) => {
  const { type, model, previewTextPlaceholder, colon, helpIcon, layout, size, labelStyle, labelAlign, labelWidth, ...args } = props;
  const formInherit = useSchemaInherit();

  const itemProps = pickBy({ colon, helpIcon, layout, size, labelStyle, labelAlign, labelWidth }, v => v !== undefined);
  const top = useParentForm();
  const renderContent = (form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: form }}>
      <SchemaInheritContext.Provider value={{ ...formInherit, ...itemProps }}>
        {type === 'form' ? <Form {...args} /> : <View {...args} />}
      </SchemaInheritContext.Provider>
    </ExpressionScope>
  );

  if (model) return <FormProvider form={model}>{renderContent(model)}</FormProvider>;

  if (!top) throw new Error('must pass form instance by createForm');

  return renderContent(top);
};
