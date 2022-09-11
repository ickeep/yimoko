import { useFieldSchema } from '@formily/react';
import { useMemo } from 'react';

export const useSchemaItems = () => {
  const fieldSchema = useFieldSchema();
  const items = fieldSchema?.items;
  return useMemo(() => {
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }, [items]);
};
