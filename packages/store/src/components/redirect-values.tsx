import { createForm, IFormProps } from '@formily/core';
import { observer, useFieldSchema } from '@formily/react';
import { useEffect, useMemo, useState } from 'react';

import { useSchemaField } from '../context/schema-field';

import { SchemaBox } from './schema-box';

export interface RedirectValuesProps {
  values: any;
}

export const RedirectValues = observer((props: IFormProps) => {
  const { values, ...args } = props;
  const schema = useFieldSchema();
  const SchemaField = useSchemaField();

  const [model] = useState(() => createForm({ ...args, values: { values } }));

  useEffect(() => {
    model.setValues({ values });
  }, [model, values]);

  const type = typeof values;

  const curSchema = useMemo(() => {
    const { properties, 'x-decorator': decorator, ...args } = schema?.toJSON();
    const isDecorator = decorator?.indexOf('Redirect') === 0;
    const propertiesSchema = isDecorator ? { values: { ...args, type, properties } } : { values: { type, properties } };
    return { type: 'object', properties: propertiesSchema };
  }, [schema, type]);

  return (
    <SchemaBox model={model} >
      <SchemaField schema={curSchema} />
    </SchemaBox>
  );
});

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
