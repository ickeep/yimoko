import { SchemaReactComponents } from '@formily/react';
import { createContext, useContext } from 'react';

export const SchemaComponentsContext = createContext<SchemaReactComponents>({});

export const SchemaComponentsProvider = SchemaComponentsContext.Provider;

export const SchemaComponentsConsumer = SchemaComponentsContext.Consumer;

export const useSchemaComponents = <Components extends SchemaReactComponents = any>(components?: Components) => {
  const df = useContext(SchemaComponentsContext);

  return components ? { ...df, ...components } : df;
};
