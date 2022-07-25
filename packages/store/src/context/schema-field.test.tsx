import { createForm } from '@formily/core';
import { createSchemaField, ISchema } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SchemaBox } from '../components/schema-box';

import { SchemaFieldProvider, useSchemaField } from './schema-field';

describe('SchemaField', () => {
  const C = (props: { components?: any, scope?: any, schema: ISchema, values?: any }) => {
    const { components, scope, schema, values = {} } = props;
    const SchemaField = useSchemaField(components, scope);
    const model = createForm({ values });
    return <SchemaBox model={model} ><SchemaField schema={schema} /></SchemaBox>;
  };

  const NameC = () => <p>name</p>;

  test('useSchemaField', () => {
    render(<C components={{ Name: NameC }} schema={{ type: 'object', properties: { name: { type: 'string', 'x-component': 'Name' } } }} />);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  test('SchemaFieldProvider', () => {
    const SchemaField = createSchemaField({ components: { Name: NameC } });
    render(<SchemaFieldProvider value={SchemaField}>
      <C schema={{ type: 'object', properties: { name: { type: 'string', 'x-component': 'Name' } } }} />
    </SchemaFieldProvider>);
    expect(screen.getByText('name')).toBeInTheDocument();
  });
});
