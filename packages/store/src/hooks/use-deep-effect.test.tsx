import { renderHook } from '@testing-library/react';

import { useDeepEffect } from './use-deep-effect';

describe('useDeepEffect', () => {
  test('useDeepEffect', () => {
    let num = 0;
    const { rerender } = renderHook((deep?: any[]) => useDeepEffect(() => {
      num += 1;
    }, deep));

    expect(num).toBe(1);
    rerender();
    expect(num).toBe(2);
    rerender([{ a: 'a' }, { b: 'b' }]);
    expect(num).toBe(3);
    rerender([{ a: 'a' }, { b: 'b' }]);
    expect(num).toBe(3);
    rerender([{ a: 'a1' }, { b: 'b' }]);
    expect(num).toBe(4);
  });
});
