import { observer } from '@formily/react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';

import { APIExecutorProvider, useAPIExecutor, unknownAPIRes } from './api';

const APIConsumer = observer(({ params }: { params: Record<string, string> }) => {
  const fn = useAPIExecutor();
  const [res, setRes] = useState<Record<string, any>>({});
  useEffect(() => {
    fn(params).then(res => setRes(res));
  }, [fn, params]);
  return <div> <p>{res.msg ?? ''}</p><p>{res.data ?? 'unknown'}</p></div>;
});

describe('APIExecutor', () => {
  test('null', async () => {
    await act(async () => {
      render(<APIConsumer params={{ data: 'data' }} />);
    });
    expect(screen.getByText(unknownAPIRes.msg)).toBeInTheDocument();
  });

  test('api', async () => {
    const api = jest.fn(params => Promise.resolve({ code: 200, data: params.data, msg: '' }));
    await act(async () => {
      render(<APIExecutorProvider value={api}><APIConsumer params={{ data: 'xxx' }} /></APIExecutorProvider>);
    });
    expect(screen.getByText('xxx')).toBeInTheDocument();
  });
});
