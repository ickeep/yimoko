import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { LoadDepend } from './load-depend';

describe('LoadDepend', () => {
  beforeEach(() => {
    cleanup();
    document.querySelectorAll('link').forEach(element => element.remove());
    document.querySelectorAll('script').forEach(element => element.remove());
  });
  test('empty', async () => {
    await act(async () => {
      render(<LoadDepend ></LoadDepend>);
    });
    expect(document.querySelector('body')?.textContent).toBe('');
  });

  test('js', async () => {
    await act(async () => {
      render(<LoadDepend js={{ name: 'v1' }} >content</LoadDepend>);
    });
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    const scriptEl = document.querySelector('script');
    expect(scriptEl).toBeInTheDocument();
    expect(scriptEl?.getAttribute('src')).toBe('v1.js');
    await act(async () => {
      scriptEl?.dispatchEvent(new Event('load'));
    });
    expect(screen.getByText('Error: 脚本加载成功,但 v1 未定义')).toBeInTheDocument();
    await act(async () => {
      screen.getByText('再试一次').click();
    });
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    const scriptEls = document.querySelectorAll('script');
    expect(scriptEls.length).toBe(2);
    const lastScriptEl = scriptEls[1];
    // @ts-ignore
    globalThis.v1 = () => 'v1';
    await act(async () => {
      lastScriptEl?.dispatchEvent(new Event('load'));
    });
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('LoadDepend', async () => {
    await act(async () => {
      render(<LoadDepend component={(props: any) => <div {...props} />} props={{ children: 'content' }} js={[{ name: 'v2' }, { name: 'v3' }]} css={['1.css', '2.css']} />);
    });
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    // @ts-ignore
    globalThis.v2 = () => 'v2';
    // @ts-ignore
    globalThis.v3 = () => 'v3';
    await act(async () => {
      document.querySelectorAll('script').forEach((scriptEl) => {
        scriptEl && fireEvent.load(scriptEl);
      });
      document.querySelectorAll('link').forEach((linkEl) => {
        linkEl && fireEvent.load(linkEl);
      });
    });
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
