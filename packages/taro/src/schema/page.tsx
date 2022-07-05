import { IFormProps, createForm } from '@formily/core';
import { createSchemaField, ISchema, SchemaReactComponents, observer } from '@formily/react';
import { useMemo } from 'react';

import { SchemaBox } from './box';

export interface SchemaPageProps<T extends object = Record<string, any>> {
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  type?: 'view' | 'form';
  schema?: ISchema
}

export const SchemaPage = observer((props: SchemaPageProps) => {
  const { options, components, scope, type, schema } = props;

  const model = useMemo(() => createForm(options), [options]);
  const SchemaField = useMemo(() => createSchemaField({ components, scope }), [components, scope]);

  return (
    <SchemaBox type={type} model={model}>
      <SchemaField schema={schema} />
    </SchemaBox>
  );
});
