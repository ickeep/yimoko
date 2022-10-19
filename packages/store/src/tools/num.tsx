export const changeNumInRange = (num: number, step = 1, max = Number.MAX_VALUE, min = - Number.MAX_VALUE, initial = 0) => {
  if (num >= max || num <= min) {
    return initial;
  }
  return num + step;
};


export interface IToNumberOption {
  defaults?: number,
  pattern?: string,
  flags?: string
}

export const toNumber = (v: any, option?: IToNumberOption) => {
  if (typeof v === 'number') {
    return v;
  }
  const { defaults = 0, pattern = '[^0-9.]', flags = 'g' } = option ?? {};
  if (typeof v === 'string') {
    const reg = new RegExp(pattern, flags);
    const numStr = v.replace(reg, '');
    return Number(numStr);
  }
  return defaults;
};
