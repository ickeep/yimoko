

import { isEqual } from 'lodash-es';
import { useRef, DependencyList, useEffect, useLayoutEffect } from 'react';

import { changeNumInRange } from '../tools/num';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepEffect: CreateUpdateEffect = hook => (effect, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !isEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current = changeNumInRange(signalRef.current);;
  }

  hook(effect, [signalRef.current]);
};


export const useDeepEffect = createDeepEffect(useEffect);

export const useDeepLayoutEffect = createDeepEffect(useLayoutEffect);
