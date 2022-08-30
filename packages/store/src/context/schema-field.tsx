import { createSchemaField, ISchemaFieldProps, SchemaReactComponents } from '@formily/react';
import { createContext, FC, useContext } from 'react';

import { useDeepMemo } from '../hooks/use-deep-memo';

import { SchemaComponentsContext } from './schema-components';

const SchemaField = createSchemaField();

export const SchemaFieldContext = createContext<FC<ISchemaFieldProps>>(SchemaField);

export const SchemaFieldProvider = SchemaFieldContext.Provider;

export const SchemaFieldConsumer = SchemaFieldContext.Consumer;

export const useSchemaField = <Components extends SchemaReactComponents = any>(components?: Components, scope?: any) => {
  const df = useContext(SchemaFieldContext);
  const dfComponents = useContext(SchemaComponentsContext);
  return useDeepMemo(() => {
    if (!(components || scope)) {
      return df;
    }
    return createSchemaField({ components: { ...dfComponents, ...components }, scope });
  }, [dfComponents, components, scope]);
};
