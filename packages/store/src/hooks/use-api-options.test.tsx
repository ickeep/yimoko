import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';

import { ConfigStore, ConfigStoreProvider } from '../store/config';

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
    render(<C data={[{ label: 'l', value: 'v' }]} />);
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"label":"l","value":"v"}]')).toBeInTheDocument();
  });

  test('api', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: { a: 'a', b: 'b' } }));
    const configStore = new ConfigStore({}, { apiExecutor, notifier: () => '' });

    render(<ConfigStoreProvider value={configStore}>
      <C data={[{ label: 'l', value: 'v' }]} api={{}} />
    </ConfigStoreProvider>);
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('[{"label":"l","value":"v"}]')).toBeInTheDocument();
    await act((async () => { }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"value":"a","label":"a"},{"value":"b","label":"b"}]')).toBeInTheDocument();
    await act((async () => {
      screen.getByText('setOptions').click();
    }));
    expect(screen.getByText('[{"label":"l","value":"v"}]')).toBeInTheDocument();
  });

  test('keys', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: [{ id: 1, name: 'n1' }] }));
    const configStore = new ConfigStore({}, { apiExecutor, notifier: () => '' });
    await act((async () => {
      render(<ConfigStoreProvider value={configStore}>
        <C keys={{ label: 'name', value: 'id' }} api={{}} />
      </ConfigStoreProvider>);
    }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"label":"n1","value":1}]')).toBeInTheDocument();
  });

  test('keys', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: 'a|b' }));
    const configStore = new ConfigStore({}, { apiExecutor, notifier: () => '' });
    await act((async () => {
      render(<ConfigStoreProvider value={configStore}>
        <C splitter='|' api={{}} />
      </ConfigStoreProvider>);
    }));
    expect(screen.getByText('false')).toBeInTheDocument();
    expect(screen.getByText('[{"label":"a","value":"a"},{"label":"b","value":"b"}]')).toBeInTheDocument();
  });
});

