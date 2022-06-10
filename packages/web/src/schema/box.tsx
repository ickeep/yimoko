import { Form as FormType, ObjectField } from '@formily/core';
import { useParentForm, FormProvider, ExpressionScope } from '@formily/react';

export interface SchemaBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  model?: FormType
}

export const SchemaBox = (props: SchemaBoxProps) => {
  const { model, ...args } = props;

  const top = useParentForm();
  const renderContent = (form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: form }}>
      <div {...args} />
    </ExpressionScope>
  );

  if (model) return <FormProvider form={model}>{renderContent(model)}</FormProvider>;

  if (!top) throw new Error('must pass form instance by createForm');

  return renderContent(top);
};
