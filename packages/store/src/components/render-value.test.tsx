import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RenderValue } from './render-value';

describe('RenderValue', () => {
  const arr: any[] = [
    { name: 'str', value: 'str', result: 'str' },
    { name: 'true', value: true, result: 'true' },
    { name: 'false', value: false, result: 'false' },
    { name: 'number', value: 1, result: '1' },
    { name: 'bigint', value: BigInt('1234567890123456789012345678901234567890'), result: '1234567890123456789012345678901234567890' },
    { name: 'obj', value: { a: 'a' }, result: '{"a":"a"}' },
    { name: 'arr', value: ['a', 'b'], result: '["a","b"]' },
    { name: 'node', value: <p>123</p>, result: '123' },
    { name: 'esModule', value: { __esModule: {}, default: '123' }, result: '123' },
  ];

  arr.forEach(({ name, value, result }) => {
    test(`RenderValue-${name}`, () => {
      render(<RenderValue value={value} />);
      expect(screen.getByText(result)).toBeInTheDocument();
    });
  });

  test('RenderValue-null', () => {
    render(<RenderValue value={null} />);
    expect(document.getElementsByTagName('body')[0].textContent).toBe('');
  });

  test('RenderValue-component', () => {
    const Component = ({ value }: any) => <p>{value}</p>;
    render(<RenderValue value={Component} props={{ value: '123' }} />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
