import { createForm } from '@formily/core';
import { useExpressionScope, useFieldSchema } from '@formily/react';
import { useMemo } from 'react';

import { useSchemaComponents } from '../context/schema-components';
import { useSchemaField } from '../context/schema-field';

import { SchemaBox } from './schema-box';

export interface RedirectValuesProps {
  values: any;
}

export const RedirectValues = (props: RedirectValuesProps) => {
  const { values } = props;
  const scope = useExpressionScope();
  const schema = useFieldSchema();
  const { properties, 'x-decorator': decorator, ...args } = schema?.toJSON();
  const curComponents = useSchemaComponents();
  const SchemaField = useSchemaField(curComponents, scope);
  const model = useMemo(() => createForm({ values: { values } }), [values]);

  const isDecorator = decorator?.indexOf('Redirect') > -1;

  const propertiesSchema = isDecorator
    ? { values: { ...args, type: typeof values, properties } }
    : { values: { type: typeof values, properties } };

  return (
    <SchemaBox model={model} >
      <SchemaField schema={{ type: 'object', properties: propertiesSchema }} />
    </SchemaBox>
  );
};

// data: {
//   'x-component': 'RedirectValues', 'x-component-props': { values: '{{curStore.response?.data}}' },
//   properties: {
//     data: {
//       'x-component': 'Table',
//       properties: {
//         id: { type: 'number', 'x-component': 'Test' },
//       },
//     },
//   },
// },
// data2: {
//   'x-component': 'Table', 'x-decorator': 'RedirectValues', 'x-decorator-props': { values: '{{curStore.response?.data?.data}}' },
//   properties: {
//     id: { type: 'number', 'x-component': 'Test' },
//   },
// },
