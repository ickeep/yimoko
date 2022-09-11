import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SchemaFieldProvider } from '../context/schema-field';
import { BaseStore } from '../store/base';

import { RedirectValues } from './redirect-values';
import { SchemaPage } from './schema-page';

describe('RedirectValues', () => {
  const components = { RedirectValues, A: ({ value }: any) => <p>{value}</p> };
  const curStore = new BaseStore({ api: {}, fieldsConfig: { a: { 'x-component': 'A' } } });
  curStore.response = { code: 0, msg: '', data: { a: 'a' } };
  const SchemaField = createSchemaField({ components, scope: { curStore } });
  const model = createForm({ values: {} });

  test('empty', () => {
    render(<RedirectValues />);
    expect(document.querySelector('body')?.textContent).toBe('');
  });

  test('component', () => {
    render(<SchemaFieldProvider value={SchemaField}>
      <SchemaPage
        scope={{ curStore }}
        components={components}
        model={model} schema={{
          type: 'object',
          properties: {
            data: {
              type: 'object',
              'x-component': 'RedirectValues',
              'x-component-props': { values: '{{curStore.response?.data}}' },
              properties: { a: { 'x-component': 'A' } },
            },
          },
        }} />
    </SchemaFieldProvider>);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('component', () => {
    render(<SchemaFieldProvider value={SchemaField}>
      <SchemaPage
        scope={{ curStore }}
        components={components}
        model={model} schema={{
          type: 'object',
          properties: {
            data: {
              type: 'void',
              'x-decorator': 'RedirectValues',
              'x-decorator-props': { values: '{{curStore.response?.data}}' },
              properties: { a: { 'x-component': 'A' } },
            },
          },
        }} />
    </SchemaFieldProvider>);
    expect(screen.getByText('a')).toBeInTheDocument();
  });
});
