import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { withSchemaChildren } from './schema-children';

describe('withSchemaChildren', () => {
  const Div = withSchemaChildren(({ children, ...args }: any) => <div {...args}>{children}</div>);

  test('children', () => {
    render(<Div>children</Div>);
    expect(screen.getByText('children')).toBeInTheDocument();
  });


  test('schema', () => {
    render(<Div schema={{ type: 'object' }}>children</Div>);
    expect(document.querySelector('body')?.textContent).toBe('');
  });
});
