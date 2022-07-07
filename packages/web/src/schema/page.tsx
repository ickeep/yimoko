import { IFormProps, createForm, Form } from '@formily/core';
import { ISchema, SchemaReactComponents, observer } from '@formily/react';
import { useSchemaField, useSchemaComponents, SchemaBox } from '@yimoko/store';
import classnames from 'classnames';
import { useMemo } from 'react';

export interface SchemaPageProps<T extends object = Record<string, any>> extends React.HTMLAttributes<HTMLDivElement> {
  model?: Form<T>
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

export const SchemaPage = observer((props: SchemaPageProps) => {
  const { model, options, components, scope, schema, children = null, className, ...args } = props;
  const curModel = useMemo(() => (model ? model : createForm(options)), [model, options]);
  const curComponents = useSchemaComponents(components);
  const SchemaField = useSchemaField(curComponents, scope);

  return (
    <div className={classnames('schema-page', className)} {...args}>
      <SchemaBox model={curModel} >
        {schema && <SchemaField schema={schema} />}
        {children}
      </SchemaBox>
    </div>
  );
});
