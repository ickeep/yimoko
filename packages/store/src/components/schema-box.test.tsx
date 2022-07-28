import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SchemaBox } from './schema-box';

describe('SchemaBox', () => {
  const SchemaField = createSchemaField({ components: { A: ({ value }: any) => <>{value}</> } });
  test('model', () => {
    const model = createForm({ values: { a: 'a' } });

    render(<SchemaBox model={model}>
      <SchemaField schema={{ type: 'object', properties: { a: { 'x-component': 'A' } } }} />
    </SchemaBox>);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('top', () => {
    const model = createForm({ values: { a: 'a' } });

    render(<SchemaBox model={model}>
      <SchemaBox>
        <SchemaField schema={{ type: 'object', properties: { a: { 'x-component': 'A' } } }} />
      </SchemaBox>
    </SchemaBox>);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('err', () => {
    try {
      render(<SchemaBox >
        <SchemaField schema={{ type: 'object', properties: { a: { 'x-component': 'A' } } }} />
      </SchemaBox>);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
