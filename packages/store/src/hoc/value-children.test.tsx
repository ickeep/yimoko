import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { withValueChildren } from '../hoc/value-children';

describe('withValueChildren', () => {
  const Button = ({ children, ...args }: any) => <button {...args}>{children}</button>;
  const Btn = withValueChildren(Button);
  test('children', () => {
    render(<Btn value="123">456</Btn>);
    expect(screen.getByText('456')).toBeInTheDocument();
  });

  test('val', () => {
    render(<Btn value="123" />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('val empty', () => {
    render(<Btn value="" />);
    expect(document.getElementsByTagName('body')[0].textContent).toBe('');
  });

  test('val node', () => {
    render(<Btn value={<>node</>} />);
    expect(screen.getByText('node')).toBeInTheDocument();
  });

  test('props', () => {
    render(<Btn value='123' type="submit" />);
    expect(screen.getByText('123').getAttribute('type')).toBe('submit');
  });
});
