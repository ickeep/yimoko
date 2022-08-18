import { ISchema, SchemaReactComponents, useFieldSchema } from '@formily/react';
import { useMemo } from 'react';

import { useSchemaField } from '../context/schema-field';

export interface SchemaTemplateProps {
  schema: ISchema;
  children?: React.ReactNode;
  components?: SchemaReactComponents;
  scope?: any;
}

export const SchemaTemplate = (props: SchemaTemplateProps) => {
  const { schema, children, components, scope } = props;

  const SchemaField = useSchemaField(components, scope);
  const fieldSchema = useFieldSchema()?.toJSON();
  const { properties, 'x-decorator': decorator } = fieldSchema ?? {};


  const childrenSchema = useMemo(() => {
    if (decorator !== 'SchemaTemplate' && properties) {
      return { properties };
    }
    return undefined;
  }, [decorator, properties]);

  const childComponents = useMemo(() => ({
    Children: () => <>
      {children}
      {childrenSchema && <SchemaField schema={childrenSchema} />}
    </>,
  }), [SchemaField, children, childrenSchema]);

  return (
    <SchemaField components={childComponents} schema={schema} />
  );
};
