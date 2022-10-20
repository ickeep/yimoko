import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { RemoteComponent } from './remote-component';

describe('LoadDepend', () => {
  beforeEach(() => {
    cleanup();
    document.querySelectorAll('link').forEach(element => element.remove());
    document.querySelectorAll('script').forEach(element => element.remove());
  });

  test('js', async () => {
    await act(async () => {
      render(<RemoteComponent name='v1'>content</RemoteComponent>);
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
    globalThis.v1 = (props: any) => <div {...props} />;
    await act(async () => {
      lastScriptEl?.dispatchEvent(new Event('load'));
    });
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('deep', async () => {
    await act(async () => {
      render(<RemoteComponent jsDeep={[{ name: 'd1' }]} cssDeep="d1" css="v1" name='v2' props={{ children: 'content' }} />);
    });
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    // 先加载依赖
    expect(document.querySelectorAll('script').length).toBe(1);
    expect(document.querySelectorAll('link').length).toBe(1);
    // @ts-ignore
    globalThis.d1 = () => 'd1';
    await act(async () => {
      document.querySelectorAll('script').forEach((scriptEl) => {
        scriptEl && fireEvent.load(scriptEl);
      });
      document.querySelectorAll('link').forEach((linkEl) => {
        linkEl && fireEvent.load(linkEl);
      });
    });

    // 加载组件
    expect(document.querySelectorAll('script').length).toBe(2);
    expect(document.querySelectorAll('link').length).toBe(2);
    // @ts-ignore
    globalThis.v2 = (props: any) => <div {...props} />;
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
