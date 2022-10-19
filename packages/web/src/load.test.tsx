import { fireEvent, act, cleanup } from '@testing-library/react';

import { loadElement, loadJS, loadCSS } from './load';

describe('loadElement', () => {
  beforeEach(() => {
    cleanup();
  });
  test('should be defined', () => {
    expect(loadElement).toBeDefined();
  });

  test('success', async () => {
    const fn = jest.fn();
    loadElement('script', { src: 'https://www.baidu.com' }).then(result => fn(result));;
    const scriptEls = document.querySelectorAll('script');
    expect(scriptEls.length).toBe(1);
    const scriptEl = scriptEls[0];
    expect(scriptEl).toBeInTheDocument();
    expect(scriptEl.outerHTML).toBe('<script src="https://www.baidu.com"></script>');
    await act(async () => {
      scriptEl && fireEvent.load(scriptEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(true);
  });

  test('error', async () => {
    const fn = jest.fn();
    loadElement('script', { src: 'https://www.baidu.com/err.js' }).then(result => fn(result));;
    const scriptEl = document.querySelector('script[src="https://www.baidu.com/err.js"]');
    expect(scriptEl).toBeInTheDocument();
    await act(async () => {
      scriptEl && fireEvent.error(scriptEl);
    });
    expect(document.querySelector('script[src="https://www.baidu.com/err.js"]')).not.toBeInTheDocument();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(expect.any(Error));
  });

  test('place', async () => {
    const fn = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);
    loadElement('script', { src: 'https://www.baidu.com' }, div).then(result => fn(result));;
    const scriptEls = div.querySelectorAll('script');
    expect(scriptEls.length).toBe(1);
    const scriptEl = scriptEls[0];
    expect(scriptEl).toBeInTheDocument();
    expect(scriptEl.outerHTML).toBe('<script src="https://www.baidu.com"></script>');
    await act(async () => {
      scriptEl && fireEvent.load(scriptEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(true);
  });

  test('palace head', async () => {
    const fn = jest.fn();
    loadElement('link', { src: 'https://www.baidu.com' }, 'head').then(result => fn(result));;
    const linkEls = document.querySelectorAll('link');
    expect(linkEls.length).toBe(1);
    const linkEl = linkEls[0];
    expect(linkEl).toBeInTheDocument();
    expect(linkEl.outerHTML).toBe('<link src="https://www.baidu.com">');
    await act(async () => {
      linkEl && fireEvent.load(linkEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(true);
  });
});

describe('loadJs', () => {
  test('success', async () => {
    const fn = jest.fn();
    loadJS('name', 'https://www.baidu.com/js').then(result => fn(result));
    const scriptEl = document.querySelector('script[src="https://www.baidu.com/js"]');
    expect(scriptEl).toBeInTheDocument();
    expect(scriptEl?.outerHTML).toBe('<script crossorigin="" type="text/javascript" src="https://www.baidu.com/js"></script>');
    // @ts-ignore
    globalThis.name = () => 'Loaded';
    await act(async () => {
      scriptEl && fireEvent.load(scriptEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(true);

    // 再次加载
    loadJS('name', 'https://www.baidu.com/js');
    expect(document.querySelectorAll('script[src="https://www.baidu.com/js"]').length).toBe(1);
  });

  test('error', async () => {
    const fn = jest.fn();
    loadJS('err', 'https://www.baidu.com/err').then(result => fn(result));
    const scriptEl = document.querySelector('script[src="https://www.baidu.com/err"]');
    expect(scriptEl).toBeInTheDocument();
    await act(async () => {
      scriptEl && fireEvent.error(scriptEl);
    });
    expect(document.querySelector('script[src="https://www.baidu.com/err"]')).not.toBeInTheDocument();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(expect.any(Error));
  });

  test('name err', async () => {
    const fn = jest.fn();
    loadJS('nameErr', 'https://www.baidu.com/nameErr').then(result => fn(result));
    const scriptEl = document.querySelector('script[src="https://www.baidu.com/nameErr"]');
    expect(scriptEl).toBeInTheDocument();
    await act(async () => {
      scriptEl && fireEvent.load(scriptEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(expect.any(Error));
  });

  test('Concurrency', async () => {
    const fn = jest.fn();
    loadJS('Concurrency', 'https://www.baidu.com/concurrency').then(result => fn(result));
    loadJS('Concurrency', 'https://www.baidu.com/concurrency').then(result => fn(result));
    loadJS('Concurrency', 'https://www.baidu.com/concurrency').then(result => fn(result));
    loadJS('Concurrency', 'https://www.baidu.com/concurrency').then(result => fn(result));
    const scriptEls = document.querySelectorAll('script[src="https://www.baidu.com/concurrency"]');
    expect(scriptEls.length).toBe(1);
    // @ts-ignore
    globalThis.Concurrency = () => 'Loaded';
    await act(async () => {
      scriptEls[0] && fireEvent.load(scriptEls[0]);
    });
    expect(fn).toBeCalledTimes(4);
    expect(fn).toHaveBeenLastCalledWith(true);
  });
});

describe('loadCss', () => {
  test('success', async () => {
    const fn = jest.fn();
    loadCSS('https://www.baidu.com/css').then(result => fn(result));
    const linkEl = document.querySelector('link[href="https://www.baidu.com/css"]');
    expect(linkEl).toBeInTheDocument();
    expect(linkEl?.outerHTML).toBe('<link rel="stylesheet" href="https://www.baidu.com/css">');
    await act(async () => {
      linkEl && fireEvent.load(linkEl);
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(true);

    loadCSS('https://www.baidu.com/css').then(result => fn(result));
    expect(document.querySelectorAll('link[href="https://www.baidu.com/css"]').length).toBe(1);
  });

  test('error', async () => {
    const fn = jest.fn();
    loadCSS('https://www.baidu.com/err').then(result => fn(result));
    const linkEl = document.querySelector('link[href="https://www.baidu.com/err"]');
    expect(linkEl).toBeInTheDocument();
    await act(async () => {
      linkEl && fireEvent.error(linkEl);
    });
    expect(document.querySelector('link[href="https://www.baidu.com/err"]')).not.toBeInTheDocument();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(expect.any(Error));
  });

  test('Concurrency', async () => {
    const fn = jest.fn();
    loadCSS('https://www.baidu.com/concurrency').then(result => fn(result));
    loadCSS('https://www.baidu.com/concurrency').then(result => fn(result));
    loadCSS('https://www.baidu.com/concurrency').then(result => fn(result));
    loadCSS('https://www.baidu.com/concurrency').then(result => fn(result));
    const linkEls = document.querySelectorAll('link[href="https://www.baidu.com/concurrency"]');
    expect(linkEls.length).toBe(1);
    await act(async () => {
      linkEls[0] && fireEvent.load(linkEls[0]);
    });
    expect(fn).toBeCalledTimes(4);
    expect(fn).toHaveBeenLastCalledWith(true);
  });
});
