import { createSchemaField, ISchema } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen, renderHook } from '@testing-library/react';

import { SchemaPage } from '../components/schema-page';
import { SchemaFieldProvider } from '../context/schema-field';

import { useSchemaItemsOut } from './use-is-schema-items-out';

describe('useSchemaItemsOut', () => {
  const Render = ({ schema }: { schema?: ISchema }) => {
    const components = {
      A: () => {
        const isOut = useSchemaItemsOut();
        return <div>{String(isOut)}</div>;
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
    const { result } = renderHook(() => useSchemaItemsOut());
    expect(result.current).toBeFalsy();
  });

  test('false', () => {
    render(<Render schema={{ type: 'object', properties: { A: { 'x-component': 'A' } } }} />);
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  test('false type string', () => {
    render(<Render schema={{ type: 'object', properties: { A: { type: 'string', 'x-component': 'A', items: [{}] } } }} />);
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  test('true', () => {
    render(<Render schema={{ type: 'object', properties: { A: { 'x-component': 'A', items: [{}] } } }} />);
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  test('type void', () => {
    render(<Render schema={{ type: 'object', properties: { A: { type: 'void', 'x-component': 'A', items: [{}] } } }} />);
    expect(screen.getByText('true')).toBeInTheDocument();
  });
});
