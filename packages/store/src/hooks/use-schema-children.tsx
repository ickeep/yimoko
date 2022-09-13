import { RecursionField, useFieldSchema } from '@formily/react';
import { useMemo, ReactNode } from 'react';

import { judgeIsEmpty } from '../tools/tool';

export const useSchemaChildren = (children?: ReactNode) => {
  const fieldSchema = useFieldSchema();
  const { properties } = fieldSchema ?? {};
  return useMemo(() => {
    if (children || judgeIsEmpty(properties)) {
      return children ?? null;
    }
    return <RecursionField schema={{ ...fieldSchema, 'x-component': undefined, 'x-decorator': undefined }} />;
  }, [children, fieldSchema, properties]);
};
