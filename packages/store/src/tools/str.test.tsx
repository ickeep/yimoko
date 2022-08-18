import { strToArr } from './str';

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
});
