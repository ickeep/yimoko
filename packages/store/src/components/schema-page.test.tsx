import { createForm } from '@formily/core';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BaseStore } from '../store/base';

import { SchemaPage } from './schema-page';

describe('SchemaPage', () => {
  const components = { A: ({ value }: any) => <p>{value}</p> };
  test('empty', () => {
    const model = createForm({ values: { a: 'a' } });
    render(<SchemaPage components={components} model={model} />);
    expect(document.getElementsByTagName('body')[0].textContent).toBe('');
  });

  test('model', () => {
    const model = createForm({ values: { a: 'a' } });
    render(<SchemaPage components={components} model={model} schema={{ type: 'object', properties: { a: { 'x-component': 'A' } } }} />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('options', () => {
    render(<SchemaPage
      components={components}
      options={{ values: { a: 'a' } }}
      schema={{ type: 'object', properties: { a: { 'x-component': 'A' } } }}
    />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('curStore', () => {
    const curStore = new BaseStore({ api: {}, fieldsConfig: { a: { 'x-component': 'A' } } });
    render(<SchemaPage
      components={components}
      options={{ values: { a: 'a' } }}
      scope={{ curStore }}
      schema={{ type: 'object', properties: { a: { $ref: '#/definitions/a' } } }}
    />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('definitions str', () => {
    const curStore = new BaseStore({ api: {}, fieldsConfig: { a: { 'x-component': 'A' } } });
    render(<SchemaPage
      components={components}
      options={{ values: { a: 'a' } }}
      scope={{ curStore }}
      schema={{ type: 'object', definitions: 'xxx', properties: { a: { $ref: '#/definitions/a' } } }}
    />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });


  test('definitions assign', () => {
    const curStore = new BaseStore({ api: {}, fieldsConfig: { a: { 'x-component': 'A' } } });
    render(<SchemaPage
      components={components}
      options={{ values: { a: 'a', b: 'b' } }}
      scope={{ curStore }}
      schema={{
        type: 'object', definitions: { b: { 'x-component': 'A' } },
        properties: { a: { $ref: '#/definitions/a' }, b: { $ref: '#/definitions/b' } },
      }}
    />);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
