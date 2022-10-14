import { createSchemaField, ISchema } from '@formily/react';
import { render, screen, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

import { SchemaPage } from '../components/schema-page';
import { SchemaFieldProvider } from '../context/schema-field';

import { useSchemaChildren } from './use-schema-children';


describe('useSchemaItems', () => {
  const Render = ({ schema }: { schema?: ISchema }) => {
    const components = {
      A: ({ children }: { children: ReactNode }) => {
        const curChildren = useSchemaChildren(children);
        return <div>{curChildren}</div>;
      },
    };
    const SchemaField = createSchemaField({ components });
    return (
      <SchemaFieldProvider value={SchemaField}>
        <SchemaPage components={components} schema={schema} />
      </SchemaFieldProvider>
    );
  };

  test('base', () => {
    const { result } = renderHook(() => useSchemaChildren());
    expect(result.current).toBeNull();
  });

  test('children', () => {
    render(<Render schema={{ type: 'object', properties: { A: { 'x-component': 'A', 'x-component-props': { children: 'children' } } } }} />);
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('schema', () => {
    render(<Render schema={{
      type: 'object',
      properties: { A: { 'x-component': 'A', properties: { div: { 'x-component': 'div', 'x-component-props': { children: 'children' } } } } },
    }} />);
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
