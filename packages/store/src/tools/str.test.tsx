import { getAutoHref, judgeValidKey, strToArr } from './str';

describe('str', () => {
  const testArr: any[] = [
    { value: undefined, result: [] },
    { value: null, result: [] },
    { value: true, result: [] },
    { value: false, result: [] },
    { value: {}, result: [] },
    { value: () => '', result: [] },
    { name: '空字符', value: '', result: [] },
    { value: '1,2,3', result: ['1', '2', '3'] },
    { value: 'a,b,c', result: ['a', 'b', 'c'] },
  ];
  testArr?.forEach((item) => {
    test(`strToArr - ${item.name ?? item.value}`, () => {
      expect(strToArr(item.value)).toEqual(item.result);
    });
  });
  test('strToArr - splitter', () => {
    expect(strToArr('a|b,c', '|')).toEqual(['a', 'b,c']);
  });

  test('judgeValidKey', () => {
    expect(judgeValidKey('a', { a: 1 })).toBeTruthy();
    expect(judgeValidKey('a', { b: 1 })).toBeFalsy();
  });

  test('getAutoHref', () => {
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com')).toBe('http://www.baidu.com/xxx.js');
    expect(getAutoHref('http://www.baidu.com/xxx.js')).toBe('http://www.baidu.com/xxx.js');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', '1.0.0')).toBe('http://www.baidu.com/xxx.js?__ver__=1.0.0');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', { a: 'aaa' }, 'a')).toBe('http://www.baidu.com/xxx.js?__ver__=aaa');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', { b: 'aaa' }, 'a')).toBe('http://www.baidu.com/xxx.js');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', { '/xxx.js': 'aaa' })).toBe('http://www.baidu.com/xxx.js?__ver__=aaa');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', { b: 'aaa' })).toBe('http://www.baidu.com/xxx.js');
    expect(getAutoHref('/xxx.js', 'http://www.baidu.com', '1.0.0', 'a', 'v')).toBe('http://www.baidu.com/xxx.js?v=1.0.0');
    expect(getAutoHref('/xxx.js?name=xxx', 'http://www.baidu.com', '1.0.0', 'a', 'v')).toBe('http://www.baidu.com/xxx.js?name=xxx&v=1.0.0');
  });
});
