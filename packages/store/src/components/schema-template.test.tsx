import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { render, screen } from '@testing-library/react';

import { SchemaFieldProvider } from '../context/schema-field';

import { SchemaBox } from './schema-box';
import { SchemaPage } from './schema-page';
import { SchemaTemplate } from './schema-template';

describe('SchemaTemplate', () => {
  const A = ({ value }: any) => <p>{value ?? 'a'}</p>;
  const B = ({ children }: any) => <div>b <div>{children}</div></div>;
  const C = ({ value }: any) => <p>{value ?? 'c'}</p>;
  const components = { A, B, C, SchemaTemplate };
  const model = createForm({ values: { a: 'a1', c: 'c1' } });

  test('schema', () => {
    render(<SchemaFieldProvider value={createSchemaField({ components })}>
      <SchemaPage model={model} components={components} schema={{
        type: 'object', properties: {
          t: { type: 'void', 'x-component': 'SchemaTemplate', 'x-component-props': { schema: { properties: { a: { 'x-component': 'A' } } } } },
          t2: {
            type: 'void',
            'x-component': 'SchemaTemplate', 'x-component-props': {
              schema: {
                type: 'void',
                properties: { b: { 'x-component': 'B' }, children: { 'x-component': 'Children' } },
              },
            },
            properties: { c: { 'x-component': 'C' } },
          },
        },
      }} /></SchemaFieldProvider>);
    expect(screen.getByText('a1')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c1')).toBeInTheDocument();
  });

  test('children', () => {
    render(<SchemaFieldProvider value={createSchemaField({ components })}>
      <SchemaBox model={model} >
        <SchemaTemplate schema={{ properties: { a: { 'x-component': 'A' }, children: { 'x-component': 'Children' } } }}>
          <p>b</p>
        </SchemaTemplate>
      </SchemaBox>
    </SchemaFieldProvider>);
    expect(screen.getByText('a1')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  test('decorator', () => {
    render(<SchemaFieldProvider value={createSchemaField({ components })}>
      <SchemaPage model={model} components={components} schema={{
        type: 'object', properties: {
          b: {
            type: 'void',
            'x-component': 'B',
            'x-decorator': 'SchemaTemplate',
            'x-decorator-props': {
              schema: {
                properties: {
                  children: { 'x-component': 'Children' },
                  a: { type: 'string', 'x-component': 'A' },
                },
              },
            },
            properties: {
              c: { 'x-component': 'C' },
            },
          },
        },
      }} /></SchemaFieldProvider>);
    expect(screen.getByText('a1')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c1')).toBeInTheDocument();
  });
});
