import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import _ from 'lodash';

import { APIExecutorProvider } from '../context/api';
import { IKeys } from '../tools/options';
import { JSONStringify } from '../tools/tool';

import { IOptionsAPI, useAPIOptions } from './use-api-options';

describe('useAPIOptions', () => {
  const C = (props: { data?: any, api?: IOptionsAPI, keys?: IKeys, splitter?: string, }) => {
    const [options, loading, setOptions] = useAPIOptions(props.data, props.api, props.keys, props.splitter);
    return <div>
      <p>{loading?.toString()}</p>
      <p>{JSONStringify(options)}</p>
      <button onClick={() => setOptions(props.data)}>setOptions</button>
    </div>;
  };

  test('data', () => {
    render(<C data={[{ lable: 'l', value: 'v' }]} />);
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"lable":"l","value":"v"}]')).toBeInTheDocument();
  });

  test('api', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: { a: 'a', b: 'b' } }));
    render(<APIExecutorProvider value={apiExecutor}>
      <C data={[{ lable: 'l', value: 'v' }]} api={{}} />
    </APIExecutorProvider>);
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('[{"lable":"l","value":"v"}]')).toBeInTheDocument();
    await act((async () => { }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"value":"a","label":"a"},{"value":"b","label":"b"}]')).toBeInTheDocument();
    await act((async () => {
      screen.getByText('setOptions').click();
    }));
    expect(screen.getByText('[{"lable":"l","value":"v"}]')).toBeInTheDocument();
  });

  test('keys', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: [{ id: 1, name: 'n1' }] }));
    await act((async () => {
      render(<APIExecutorProvider value={apiExecutor}>
        <C keys={{ lable: 'name', value: 'id' }} api={{}} />
      </APIExecutorProvider>);
    }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"lable":"n1","value":1}]')).toBeInTheDocument();
  });

  test('keys', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: 'a|b' }));
    await act((async () => {
      render(<APIExecutorProvider value={apiExecutor}>
        <C splitter='|' api={{}} />
      </APIExecutorProvider>);
    }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"label":"a","value":"a"},{"label":"b","value":"b"}]')).toBeInTheDocument();
  });
});

