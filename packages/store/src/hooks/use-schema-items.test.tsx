import { createSchemaField, ISchema } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen, renderHook } from '@testing-library/react';

import { SchemaPage } from '../components/schema-page';
import { SchemaFieldProvider } from '../context/schema-field';

import { useSchemaItems } from './use-schema-items';

describe('useSchemaItems', () => {
  const RenderItems = ({ items }: { items?: ISchema['items'] }) => {
    const components = {
      A: () => {
        const items = useSchemaItems();
        return <div>{JSON.stringify(items)}</div>;
      },
    };
    const SchemaField = createSchemaField({ components });
    return (
      <SchemaFieldProvider value={SchemaField}>
        <SchemaPage components={components} schema={{ type: 'object', properties: { data: { items, 'x-component': 'A' } } }} />
      </SchemaFieldProvider>
    );
  };

  test('base', () => {
    const { result } = renderHook(() => useSchemaItems());
    expect(result.current).toEqual([]);
  });

  test('items', () => {
    render(<RenderItems />);
    expect(screen.getByText(JSON.stringify([]))).toBeInTheDocument();
  });

  test('items obj', () => {
    const items: ISchema = { type: 'object', 'x-component': 'A' };
    render(<RenderItems items={items} />);
    expect(screen.getByText(JSON.stringify([{ _isJSONSchemaObject: true, version: '2.0', ...items }]))).toBeInTheDocument();
  });

  test('items arr', () => {
    const items: ISchema[] = [{ type: 'object', 'x-component': 'A' }, { type: 'object', 'x-component': 'B' }];
    render(<RenderItems items={items} />);
    expect(screen.getByText(JSON.stringify([
      { _isJSONSchemaObject: true, version: '2.0', ...items[0] },
      { _isJSONSchemaObject: true, version: '2.0', ...items[1] },
    ]))).toBeInTheDocument();
  });
});
