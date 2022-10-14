import { observer } from '@formily/react';
import { render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import { SchemaComponentsProvider, useSchemaComponents } from './schema-components';

const NameConsumer = observer(({ c, cs }: { c: string, cs?: any }) => {
  const components = useSchemaComponents(cs);
  const C = components[c] as ComponentType;

  if (!C) {
    return <>unknown</>;
  }
  return <C />;
});

const NameC = () => <p>name</p>;
const TypeC = () => <p>type</p>;
const DescC = () => <p>desc</p>;

describe('SchemaComponents', () => {
  test('SchemaComponentsContext', () => {
    render(<NameConsumer c='' />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  test('SchemaComponentsProvider', () => {
    render(<SchemaComponentsProvider value={{ Name: NameC, Desc: DescC }}>
      <NameConsumer c="Name" />
      <NameConsumer c="Type" cs={{ Type: TypeC }} />
      <NameConsumer c="Desc" />
    </SchemaComponentsProvider>);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('type')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
  });
});
