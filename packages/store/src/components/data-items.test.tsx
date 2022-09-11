import { createForm } from '@formily/core';
import { createSchemaField, ISchema, useExpressionScope } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SchemaFieldProvider } from '../context/schema-field';

import { DataItems } from './data-items';
import { SchemaPage } from './schema-page';

describe('useSchemaItems', () => {
  const RenderItems = ({ schema, values }: { schema?: ISchema, values?: any }) => {
    const model = createForm({ values });
    const components = {
      DataItems,
      Text: ({ value }: { value: any }) => {
        const scope = useExpressionScope();
        return <>
          <div>v:{value} - i:{scope?.$index}</div>
          <div>record:{JSON.stringify(scope?.$record)}</div>
        </>;
      },
      T1: ({ value }: { value: any }) => <div>t1:{value}</div>,
      T2: ({ value }: { value: any }) => <div>t2:{value}</div>,
      T3: ({ value }: { value: any }) => <div>t3:{value}</div>,
    };
    const SchemaField = createSchemaField({ components });
    return (
      <SchemaFieldProvider value={SchemaField}>
        <SchemaPage components={components} model={model} schema={schema} />
      </SchemaFieldProvider>
    );
  };

  test('null', () => {
    render(<RenderItems schema={{ type: 'object', properties: { arr: { type: 'array', 'x-component': 'DataItems' } } }} />);
    expect(document.querySelector('body')?.textContent).toBe('');
  });

  test('obj', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    render(<RenderItems values={{ arr }} schema={{
      type: 'object', properties: {
        arr: {
          type: 'array',
          'x-component': 'DataItems',
          items: { type: 'object', properties: { a: { type: 'string', 'x-component': 'Text' } } },
        },
      },
    }} />);
    expect(screen.getByText('v:1 - i:0')).toBeInTheDocument();
    expect(screen.getByText('v:2 - i:1')).toBeInTheDocument();
    expect(screen.getByText(`record:${JSON.stringify({ a: 1, $lookup: { arr }, $index: 0 })}`)).toBeInTheDocument();
  });

  test('obj 指定 name', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    render(<RenderItems values={{ arr }} schema={{
      type: 'object', properties: {
        arr: {
          type: 'void',
          'x-component': 'DataItems',
          'x-component-props': { name: 'arr', data: arr },
          items: { type: 'object', properties: { a: { type: 'string', 'x-component': 'Text' } } },
        },
      },
    }} />);
    expect(screen.getByText('v:1 - i:0')).toBeInTheDocument();
    expect(screen.getByText('v:2 - i:1')).toBeInTheDocument();
    expect(screen.getByText(`record:${JSON.stringify({ a: 1, $lookup: { arr }, $index: 0 })}`)).toBeInTheDocument();
  });

  test('arr', () => {
    const arr = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }, { a: 7 }, { a: 8 }, { a: 9 }, { a: 10 }];
    render(<RenderItems values={{ arr }} schema={{
      type: 'object', properties: {
        arr: {
          type: 'array',
          'x-component': 'DataItems',
          items: [
            { type: 'object', properties: { a: { type: 'string', 'x-component': 'T1' } } },
            { type: 'object', properties: { a: { type: 'string', 'x-component': 'T2' } } },
            { type: 'object', properties: { a: { type: 'string', 'x-component': 'T3' } } },
          ],
        },
      },
    }} />);
    expect(screen.getByText('t1:1')).toBeInTheDocument();
    expect(screen.getByText('t2:2')).toBeInTheDocument();
    expect(screen.getByText('t3:3')).toBeInTheDocument();

    expect(screen.getByText('t1:7')).toBeInTheDocument();
    expect(screen.getByText('t2:8')).toBeInTheDocument();
    expect(screen.getByText('t3:9')).toBeInTheDocument();
  });
});
