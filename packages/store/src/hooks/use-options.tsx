import { useState, useEffect, SetStateAction, Dispatch } from 'react';

import { IKeys, IOptions, dataToOptions } from '../tools/options';

export const useOptions = <T extends string = 'label' | 'value'>(
  data: any, keys?: IKeys<T>, splitter?: string,
): [IOptions<T>, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);

  useEffect(() => {
    setOptions(dataToOptions(data, keys, splitter));
  }, [data, keys, splitter]);

  return [options, setOptions];
};
