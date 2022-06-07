import { useState, useEffect } from 'react';

import { IKeys, IOptions, dataToOptions } from '../data/options';

export const useOptions = <T extends string = 'label' | 'value'>(data: any, keys?: IKeys<T>, splitter?: string) => {
  const [options, setOptions] = useState<IOptions<T>>([]);

  useEffect(() => {
    setOptions(dataToOptions(data, keys, splitter));
  }, [data, keys, splitter]);

  return [options, setOptions];
};
