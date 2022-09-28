import { IFormProps, createForm, Form } from '@formily/core';
import { ExpressionScope, ISchema, SchemaReactComponents } from '@formily/react';
import { Key, useEffect, useMemo } from 'react';

import { useSchemaComponents } from '../context/schema-components';
import { SchemaFieldProvider, useSchemaField } from '../context/schema-field';

import { SchemaBox } from './schema-box';

export interface SchemaPageProps<T extends object = Record<Key, any>> {
  model?: Form<T>
  options?: IFormProps<T>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
  children?: React.ReactNode
}

export function SchemaPage<T extends object = Record<Key, any>>(props: SchemaPageProps<T>) {
  const { model, options, components, scope, schema, children } = props;
  const curModel = useMemo(() => (model ? model : createForm(options)), [model, options]);
  const curComponents = useSchemaComponents(components);
  const SchemaField = useSchemaField(curComponents, scope);

  const { curStore } = scope ?? {};
  const schemaDefinitions = curStore?.schemaDefinitions;

  const curSchema = useMemo(() => {
    const { definitions = {}, ...args } = schema ?? {};
    if (schemaDefinitions && typeof schemaDefinitions === 'object') {
      return { definitions: typeof definitions === 'object' ? { ...schemaDefinitions, ...definitions } : schemaDefinitions, ...args };
    }
    return { definitions, ...args };
  }, [schema, schemaDefinitions]);

  useEffect(() => {
    curStore && curModel && curStore.setForm?.(curModel);
  }, [curModel, curStore]);

  return (
    <SchemaFieldProvider value={SchemaField}>
      <SchemaBox model={curModel} >
        <SchemaField schema={curSchema} />
        <ExpressionScope value={scope}>
          {children}
        </ExpressionScope>
      </SchemaBox>
    </SchemaFieldProvider>
  );
};
