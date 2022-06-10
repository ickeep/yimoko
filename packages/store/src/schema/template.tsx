import { ISchema, SchemaReactComponents } from '@formily/react';
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
  const childComponents = useMemo(() => (children ? { Children: () => <>{children}</> } : undefined), [children]);

  return (
    <SchemaField components={childComponents} schema={schema} />
  );
};
