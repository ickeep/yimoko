import { IFormProps, createForm } from '@formily/core';
import { ISchema, SchemaReactComponents, observer } from '@formily/react';
import { useSchemaField, useSchemaComponents, SchemaBox } from '@yimoko/store';
import { useMemo } from 'react';

export interface SchemaPageProps<T extends object = Record<string, any>> extends React.HTMLAttributes<HTMLDivElement> {
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

export const SchemaPage = observer((props: SchemaPageProps) => {
  const { options, components, scope, schema, children = null, ...args } = props;

  const model = useMemo(() => createForm(options), [options]);
  const curComponents = useSchemaComponents(components);
  const SchemaField = useSchemaField(curComponents, scope);

  return (
    <SchemaBox model={model} {...args}>
      {schema && <SchemaField schema={schema} />}
      {children}
    </SchemaBox>
  );
});
