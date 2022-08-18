import { observer } from '@formily/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { get } from 'lodash-es';

import { ConfigProvider, useConfig } from './config';

const ConfConsumer = observer(({ name }: { name: string }) => {
  const config = useConfig();
  return <div>{get(config, name) ?? 'unknown'}</div>;
});

describe('ConfigContext', () => {
  test('null', async () => {
    render(<ConfConsumer name='x' />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  test('config', async () => {
    render(<ConfigProvider value={{ static: { img: 'xxx', icon: 'xxx' } }}><ConfConsumer name='static.img' /></ConfigProvider>);
    expect(screen.getByText('xxx')).toBeInTheDocument();
  });
});
