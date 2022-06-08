import { changeNumInRange } from './num';

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
});
