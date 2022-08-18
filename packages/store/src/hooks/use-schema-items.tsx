import { useFieldSchema } from '@formily/react';
import { useMemo } from 'react';

export const useSchemaItems = () => {
  const fieldSchema = useFieldSchema();
  return useMemo(() => {
    const items = fieldSchema?.items;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }, [fieldSchema?.items]);
};
