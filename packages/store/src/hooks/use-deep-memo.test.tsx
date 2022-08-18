import { renderHook } from '@testing-library/react';

import { useDeepMemo } from './use-deep-memo';

describe('useDeepMemo', () => {
  test('useDeepMemo', () => {
    let num = 0;
    const { result, rerender } = renderHook((deep?: any[]) => useDeepMemo(() => {
      num += 1;
      return num;
    }, deep));

    expect(result.current).toBe(1);
    rerender();
    expect(result.current).toBe(2);
    rerender([{ a: 'a' }, { b: 'b' }]);
    expect(result.current).toBe(3);
    rerender([{ a: 'a' }, { b: 'b' }]);
    expect(result.current).toBe(3);
    rerender([{ a: 'a1' }, { b: 'b' }]);
    expect(result.current).toBe(4);
  });
});
