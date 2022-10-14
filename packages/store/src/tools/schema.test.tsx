import { createSchemaField, ISchema } from '@formily/react';
import { render, screen } from '@testing-library/react';

import { SchemaPage } from '../components/schema-page';
import { SchemaFieldProvider } from '../context/schema-field';
import { useSchemaItems } from '../hooks/use-schema-items';

import { getItemPropsBySchema } from './schema';


describe('useSchemaItemsOut', () => {
  const Render = ({ schema }: { schema?: ISchema }) => {
    const components = {
      A: ({ componentName, schemaKey }: { componentName: string, schemaKey: string | number }) => {
        const items = useSchemaItems();
        return <div> {items.map((item, i) => <div key={i} {...getItemPropsBySchema(item, componentName, schemaKey)} />)}</div>;
      },
    };
    const SchemaField = createSchemaField({ components });
    return (
      <SchemaFieldProvider value={SchemaField}>
        <SchemaPage components={components} schema={schema} />
      </SchemaFieldProvider>
    );
  };

  test('componentName === component', () => {
    render(<Render schema={{
      type: 'object', properties: {
        A: {
          'x-component': 'A',
          'x-component-props': { componentName: 'div' },
          items: { 'x-component': 'div', 'x-component-props': { children: 'div' } },
        },
      },
    }} />);
    expect(screen.getByText('div')).toBeInTheDocument();
  });

  test('componentName ===component   has properties', () => {
    render(<Render schema={{
      type: 'object', properties: {
        A: {
          'x-component': 'A',
          'x-component-props': { componentName: 'div' },
          items: {
            'x-component': 'div',
            properties: {
              div: { 'x-component': 'div', 'x-component-props': { children: 'div' } },
            },
          },
        },
      },
    }} />);
    expect(screen.getByText('div')).toBeInTheDocument();
  });


  test('decorator props  ', () => {
    render(<Render schema={{
      type: 'object', properties: {
        A: {
          'x-component': 'A',
          'x-component-props': { componentName: 'div' },
          items: { 'x-decorator-props': { 'data-testid': 'div' } },
        },
      },
    }} />);
    expect(screen.getByTestId('div')).toBeInTheDocument();
  });

  test('decorator props decorator === componentName  ', () => {
    render(<Render schema={{
      type: 'object', properties: {
        A: {
          'x-component': 'A',
          'x-component-props': { componentName: 'div' },
          items: { 'x-decorator': 'div', 'x-decorator-props': { 'data-testid': 'div1' } },
        },
      },
    }} />);
    expect(screen.getByTestId('div1')).toBeInTheDocument();
  });

  test('decorator !== componentName  ', async () => {
    render(<Render schema={{
      type: 'object', properties: {
        A: {
          'x-component': 'A',
          'x-component-props': { componentName: 'div' },
          items: {
            'x-decorator': 'button',
            'x-decorator-props': { className: 'button' },
            properties: {
              button: { 'x-component': 'button', 'x-component-props': { children: 'button' } },
            },
          },
        },
      },
    }} />);
    expect(screen.getByText('button')).toBeInTheDocument();
    expect(document.querySelector('.button')).toBeNull();
  });
});
