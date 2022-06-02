export type IOptions<T extends string = 'label' | 'value'> = Record<T | string, any>[];

export type IKeys<T extends string = 'label' | 'value'> = Record<T | string, string>;

export const transformOptions = <T extends string = 'label' | 'value'>(options?: IOptions<T>, keys?: IKeys<T>) => {
  if (!keys) {
    return options ?? [];
  }
  return options?.map((item) => {
    const newItem = { ...item };
    (Object.entries(keys) as [T, string][]).forEach(([key, value]) => {
      value && (newItem[key] = item[value]);
    });
    return newItem;
  }) ?? [];
};
