import { observer } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen, renderHook } from '@testing-library/react';

import { SchemaPage } from '../components/schema-page';
import { BaseStore } from '../store/base';

import { useCurStore } from './use-cur-store';


describe('useCurStore', () => {
  const RenderValue = observer(({ store }: any) => {
    const curStore = useCurStore(store);
    return <div>{curStore?.values?.name}</div>;
  });

  test('empty', () => {
    const { result: { current } } = renderHook(() => useCurStore());
    expect(current).toBeUndefined();
  });

  test('store', () => {
    const store = new BaseStore();
    const { result: { current } } = renderHook(() => useCurStore(store));
    expect(current).toBe(store);
  });

  test('useStore', () => {
    const store = new BaseStore({ defaultValues: { name: 'test' } });
    render(<SchemaPage scope={{ curStore: store }}><RenderValue /></SchemaPage>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('useStore 多层', () => {
    const store = new BaseStore({ defaultValues: { name: 'test' } });
    const store2 = new BaseStore({ defaultValues: { name: 'test2' } });
    render(<SchemaPage scope={{ curStore: store }}>
      <SchemaPage scope={{ curStore: store2 }}>
        <RenderValue />
      </SchemaPage>
    </SchemaPage>);
    expect(screen.getByText('test2')).toBeInTheDocument();
  });

  test('useStore props', () => {
    const store = new BaseStore({ defaultValues: { name: 'test' } });
    const store2 = new BaseStore({ defaultValues: { name: 'test2' } });
    render(<SchemaPage scope={{ curStore: store }}><RenderValue store={store2} /></SchemaPage>);
    expect(screen.getByText('test2')).toBeInTheDocument();
  });
});
