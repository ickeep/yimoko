import { useFieldSchema } from '@formily/react';
import { useMemo } from 'react';

import { judgeIsEmpty } from '../tools/tool';

// 判断是否是一个展示组件，并且使用到 Schema items 来渲染其子项
export const useIsOut = () => {
  const fieldSchema = useFieldSchema();
  const { type, items } = fieldSchema ?? {};
  return useMemo(() => (!type || type === 'void') && !judgeIsEmpty(items), [type, items]);
};
