import { renderHook } from '@testing-library/react';

import { useOptions } from './use-options';

describe('useOptions', () => {
  test('useOptions', () => {
    const data = [{ a: 'a' }, { a: 'a2' }];
    const keys: Record<string, string> = { value: 'a', label: 'a' };
    const { result, rerender } = renderHook(([data, keys, splitter]: any) => useOptions(data ?? [], keys, splitter), { initialProps: [data, keys] });
    expect(result.current[0]).toEqual([{ value: 'a', label: 'a' }, { value: 'a2', label: 'a2' }]);
    rerender([data, { name: 'a', id: 'a' }]);
    expect(result.current[0]).toEqual([{ id: 'a', name: 'a' }, { id: 'a2', name: 'a2' }]);
  });
});
