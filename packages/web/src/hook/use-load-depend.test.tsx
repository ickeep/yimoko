import { act, fireEvent, renderHook, cleanup } from '@testing-library/react';

import { useLoadDepend } from './use-load-depend';

describe('use-load-depend', () => {
  beforeEach(() => {
    cleanup();
    document.querySelectorAll('link').forEach(element => element.remove());
    document.querySelectorAll('script').forEach(element => element.remove());
  });
  test('useLoadDepend js', async () => {
    const { result } = renderHook(() => useLoadDepend([{ name: 'jsonEdit' }]));
    const [isLoading, errs, load] = result.current;
    expect(isLoading).toBe(true);
    expect(errs).toEqual([]);
    expect(load).toBeInstanceOf(Function);
    const scriptEl = document.querySelector('script[src="jsonEdit.js"]');
    expect(scriptEl).toBeInstanceOf(HTMLScriptElement);

    await act(async () => {
      scriptEl && fireEvent.load(scriptEl);
    });

    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual([new Error('脚本加载成功,但 jsonEdit 未定义')]);

    // 再次加载
    await act(async () => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(true);

    const scriptEls = document.querySelectorAll('script[src="jsonEdit.js"]');
    const lastScriptEl = scriptEls[scriptEls.length - 1];

    await act(async () => {
      lastScriptEl && fireEvent.error(lastScriptEl);
    });
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual([new Error('加载: <script crossorigin="" type="text/javascript" src="jsonEdit.js"></script> 失败')]);

    // 再次加载
    await act(async () => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(true);

    const successScriptEls = document.querySelectorAll('script[src="jsonEdit.js"]');
    const successLastScriptEl = successScriptEls[successScriptEls.length - 1];

    // @ts-ignore
    globalThis.jsonEdit = () => 'Loaded';
    await act(async () => {
      successLastScriptEl && fireEvent.load(successLastScriptEl);
    });
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual([]);
  });

  test('useLoadDepend css', async () => {
    const { result } = renderHook(() => useLoadDepend([undefined, 'css.css']));
    const [isLoading, errs, load] = result.current;
    expect(isLoading).toBe(true);
    expect(errs).toEqual([]);
    expect(load).toBeInstanceOf(Function);
    const linkEl = document.querySelector('link[href="css.css"]');
    expect(linkEl).toBeInstanceOf(HTMLLinkElement);

    await act(async () => {
      linkEl && fireEvent.error(linkEl);
    });

    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual([new Error('加载: <link rel="stylesheet" href="css.css"> 失败')]);

    // 再次加载
    await act(async () => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(true);

    const lastLinkEl = document.querySelector('link[href="css.css"]');

    await act(async () => {
      lastLinkEl && fireEvent.load(lastLinkEl);
    });
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual([]);
  });

  test('useLoadDepend multiple scripts css', async () => {
    const { result } = renderHook(() => useLoadDepend([[{ name: 'var1' }, { name: 'var2', src: '2.js' }], ['1.css', '2.css']]));
    const [isLoading, errs, load] = result.current;
    expect(isLoading).toBe(true);
    expect(errs).toEqual([]);
    expect(load).toBeInstanceOf(Function);
    expect(document.querySelectorAll('script').length).toBe(2);
    expect(document.querySelectorAll('link').length).toBe(2);

    await act(async () => {
      document.querySelectorAll('script').forEach((scriptEl) => {
        scriptEl && fireEvent.error(scriptEl);
      });
      document.querySelectorAll('link').forEach((linkEl) => {
        linkEl && fireEvent.error(linkEl);
      });
    });
    expect(result.current[0]).toBe(false);
    expect(result.current[1].length).toBe(4);

    // 再次加载
    await act(async () => {
      result.current[2]();
    });
    // @ts-ignore
    globalThis.var1 = () => 'Loaded';
    // @ts-ignore
    globalThis.var2 = () => 'Loaded';
    expect(result.current[0]).toBe(true);
    expect(document.querySelectorAll('script').length).toBe(2);
    expect(document.querySelectorAll('link').length).toBe(2);
    await act(async () => {
      document.querySelectorAll('script').forEach((scriptEl) => {
        scriptEl && fireEvent.load(scriptEl);
      });
      document.querySelectorAll('link').forEach((linkEl) => {
        linkEl && fireEvent.load(linkEl);
      });
    });
    expect(result.current[0]).toBe(false);
    expect(result.current[1].length).toBe(0);
  });
});

