import { createContext, CSSProperties, useContext } from 'react';

import { Ilayout, ISize } from '../props';

export interface SchemaItemInheritProps {
  colon?: boolean
  helpIcon?: React.ReactNode
  layout?: Ilayout
  size?: ISize
  labelStyle?: CSSProperties
  labelAlign?: 'left' | 'right'
  labelWidth?: number | string
}

export const SchemaInheritContext = createContext<SchemaItemInheritProps>({});

export const useSchemaInherit = () => useContext(SchemaInheritContext);
