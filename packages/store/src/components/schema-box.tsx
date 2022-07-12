import { Form } from '@formily/core';
import { useParentForm, FormProvider, ExpressionScope } from '@formily/react';
import { useMemo } from 'react';

export interface SchemaBoxProps {
  model?: Form
  children?: React.ReactNode
}

export const SchemaBox = (props: SchemaBoxProps) => {
  const { model, children } = props;
  const top = useParentForm();
  const value = useMemo(() => ({ $$form: model ?? top }), [model, top]);

  if (model) {
    return (
      <FormProvider form={model}>
        <ExpressionScope value={value}>{children}</ExpressionScope>
      </FormProvider>
    );
  };

  if (!top) throw new Error('must pass form instance by createForm');

  return <ExpressionScope value={value}>{children}</ExpressionScope>;
};
