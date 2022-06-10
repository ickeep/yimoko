import { IFormProps, createForm } from '@formily/core';
import { ISchema, SchemaReactComponents } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { useSchemaField } from '@yimoko/store';
import { useMemo } from 'react';

import { SchemaBox } from './box';

export interface SchemaPageProps<T extends object = Record<string, any>> extends React.HTMLAttributes<HTMLDivElement> {
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

export const SchemaPage = observer((props: SchemaPageProps) => {
  const { options, components, scope, schema, children, ...args } = props;

  const model = useMemo(() => createForm(options), [options]);
  const SchemaField = useSchemaField(components, scope);

  return (
    <SchemaBox model={model} {...args}>
      {schema && <SchemaField schema={schema} />}
      {children}
    </SchemaBox>
  );
});
