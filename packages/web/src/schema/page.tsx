import { IFormProps, createForm, Form } from '@formily/core';
import { ISchema, SchemaReactComponents, observer } from '@formily/react';
import { useSchemaField, useSchemaComponents, SchemaBox } from '@yimoko/store';
import { useMemo } from 'react';

export interface SchemaPageProps<T extends object = Record<string, any>> extends React.HTMLAttributes<HTMLDivElement> {
  model?: Form<T>
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

export const SchemaPage = observer((props: SchemaPageProps) => {
  const { model, options, components, scope, schema, children = null, ...args } = props;
  const curModel = useMemo(() => (model ? model : createForm(options)), [model, options]);
  const curComponents = useSchemaComponents(components);
  const SchemaField = useSchemaField(curComponents, scope);

  const { curStore: { fieldsConfig = {} } = {} } = scope;

  const curSchema = useMemo(() => (fieldsConfig ? { ...schema, definitions: fieldsConfig } : schema), [fieldsConfig, schema]);

  return (
    <div  {...args}>
      <SchemaBox model={curModel} >
        {curSchema && <SchemaField schema={curSchema} />}
        {children}
      </SchemaBox>
    </div>
  );
});
