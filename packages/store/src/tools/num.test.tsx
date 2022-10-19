import { changeNumInRange, toNumber } from './num';

describe('num', () => {
  test('changeNumInRange', () => {
    expect(changeNumInRange(0)).toBe(1);
    expect(changeNumInRange(1, 2)).toBe(3);

    expect(changeNumInRange(0, -1)).toBe(-1);

    expect(changeNumInRange(Infinity)).toBe(0);
    expect(changeNumInRange(-Infinity)).toBe(0);

    expect(changeNumInRange(Infinity, 1, Infinity, -Infinity, 1)).toBe(1);

    let x = Number.MAX_VALUE / 10;
    x = changeNumInRange(x, x * 9);
    expect(x).not.toBe(0);
    x = changeNumInRange(x, 1);
    expect(x).toBe(0);

    x = -(Number.MAX_VALUE / 10);
    x = changeNumInRange(x, x * 9);
    expect(x).not.toBe(0);
    x = changeNumInRange(x, -1);
    expect(x).toBe(0);
  });

  test('toNumber', () => {
    expect(toNumber(1)).toBe(1);
    expect(toNumber('1')).toBe(1);
    expect(toNumber('1.1')).toBe(1.1);
    expect(toNumber('1.1.1')).toBeNaN();
    expect(toNumber('1.1.1', { pattern: '.[^.]+.[^.]' })).toBe(1);
    expect(toNumber([])).toBe(0);
    expect(toNumber({}, { defaults: 1 })).toBe(1);
    expect(toNumber('1123', { pattern: '1', flags: '' })).toBe(123);
    expect(toNumber('1123', { pattern: '1' })).toBe(23);
  });
});
