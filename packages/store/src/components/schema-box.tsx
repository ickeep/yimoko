import { Form, isForm } from '@formily/core';
import { useParentForm, FormProvider, RecordScope } from '@formily/react';

export interface SchemaBoxProps {
  model?: Form
  children?: React.ReactNode
}

export const SchemaBox = (props: SchemaBoxProps) => {
  const { model, children } = props;
  const top = useParentForm();

  if (model) {
    return (
      <FormProvider form={model}>
        <RecordScope getRecord={() => model.values}>{children}</RecordScope>
      </FormProvider>
    );
  };

  if (!top) throw new Error('must pass form instance by createForm');

  return <RecordScope getRecord={() => (isForm(top) ? top.values : top.value)}>{children}</RecordScope>;
};
