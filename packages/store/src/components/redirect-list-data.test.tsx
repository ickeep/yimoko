import { createForm } from '@formily/core';
import { createSchemaField, useForm } from '@formily/react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { SchemaFieldProvider } from '../context/schema-field';

import { ListStore } from '../store/list';
import { JSONStringify } from '../tools/tool';

import { RedirectListData } from './redirect-list-data';
import { SchemaPage } from './schema-page';

describe('RedirectListData', () => {
  const components = {
    RedirectListData, A: () => {
      const { values } = useForm();
      return <p>{JSONStringify(values)}</p>;
    },
  };
  const curStore = new ListStore({ api: {}, fieldsConfig: { a: { 'x-component': 'A' } } });
  curStore.response = { code: 0, msg: '', data: [{ a: 'a' }] };
  const SchemaField = createSchemaField({ components, scope: { curStore } });
  const model = createForm({ values: {} });

  test('component', () => {
    render(<SchemaFieldProvider value={SchemaField}>
      <SchemaPage
        components={components}
        model={model} schema={{
          type: 'object',
          properties: {
            data: {
              type: 'object',
              'x-component': 'RedirectListData',
              properties: { a: { 'x-component': 'A' } },
            },
          },
        }} />
    </SchemaFieldProvider>);
    expect(document.getElementsByTagName('body')[0].textContent).toBe('');
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
              'x-component': 'RedirectListData',
              properties: { a: { 'x-component': 'A' } },
            },
          },
        }} />
    </SchemaFieldProvider>);
    expect(screen.getByText('{"values":[{"a":"a"}]}')).toBeInTheDocument();
  });

  test('decorator', async () => {
    render(<SchemaFieldProvider value={SchemaField}>
      <SchemaPage
        scope={{ curStore }}
        components={components}
        model={model} schema={{
          type: 'object',
          properties: {
            data: {
              type: 'object',
              'x-decorator': 'RedirectListData',
              properties: { a: { 'x-component': 'A' } },
            },
          },
        }} />
    </SchemaFieldProvider>);
    expect(screen.getByText('{"values":[{"a":"a"}]}')).toBeInTheDocument();
    await act(async () => {
      curStore.setResponse({ code: 0, msg: '', data: [{ a: 'a' }, { a: 'b' }] });
    });
    expect(screen.getByText('{"values":[{"a":"a"},{"a":"b"}]}')).toBeInTheDocument();
  });
});
