import { isEqual } from 'lodash-es';
import { useRef, DependencyList, useMemo } from 'react';

import { changeNumInRange } from '../tools/num';

export const useDeepMemo: typeof useMemo = (factory, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !isEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current = changeNumInRange(signalRef.current);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, [signalRef.current]);
};
