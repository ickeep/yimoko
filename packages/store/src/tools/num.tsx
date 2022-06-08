export const changeNumInRange = (num: number, step = 1, max = Number.MAX_VALUE, min = - Number.MAX_VALUE, initial = 0) => {
  if (num >= max || num <= min) {
    return initial;
  }
  return num + step;
};
