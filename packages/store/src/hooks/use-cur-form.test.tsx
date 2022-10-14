import { createForm } from '@formily/core';
import { observer } from '@formily/react';
import { render, screen, renderHook } from '@testing-library/react';

import { SchemaBox } from '../components/schema-box';

import { useCurForm } from './use-cur-form';


describe('useCurForm', () => {
  const RenderValue = observer(({ form }: any) => {
    const curForm = useCurForm(form);
    return <div>{curForm?.values?.name}</div>;
  });

  test('empty', () => {
    const { result: { current } } = renderHook(() => useCurForm());
    expect(current).toBeNull();
  });

  test('form', () => {
    const form = createForm();
    const { result: { current } } = renderHook(() => useCurForm(form));
    expect(current).toBe(form);
  });

  test('useForm', () => {
    const form = createForm({ values: { name: 'test' } });
    render(<SchemaBox model={form}><RenderValue /></SchemaBox>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('useForm 多层', () => {
    const form = createForm({ values: { name: 'test' } });
    const form2 = createForm({ values: { name: 'test2' } });
    render(<SchemaBox model={form}>
      <SchemaBox model={form2}>
        <RenderValue />
      </SchemaBox>
    </SchemaBox>);
    expect(screen.getByText('test2')).toBeInTheDocument();
  });

  test('useForm props', () => {
    const form = createForm({ values: { name: 'test' } });
    const form2 = createForm({ values: { name: 'test2' } });
    render(<SchemaBox model={form}><RenderValue form={form2} /></SchemaBox>);
    expect(screen.getByText('test2')).toBeInTheDocument();
  });
});
