import { Form, IFormItemProps, FormProps, IFormGridProps, FormGrid } from '@formily/antd';
import { useExpressionScope, useFieldSchema, RecursionField, observer } from '@formily/react';
import { IStore, ListStore, useSchemaField } from '@yimoko/store';
import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const defaultGrid: IFormGridProps = {
  maxWidth: 380,
  minWidth: 280,
};

export const StoreForm = observer((props: StoreFormProps) => {
  const { fields, store, children, onAutoSubmit, grid = {}, ...args } = props;
  const scope = useExpressionScope() ?? {};
  const { curStore } = scope;
  const curUseStore = store ?? curStore as IStore;
  const location = useLocation();
  const nav = useNavigate();
  const { isBindSearch, getURLSearch } = curUseStore ?? {};

  const autoSubmit = (values: any) => {
    onAutoSubmit?.(values);
    curUseStore?.runAPI();
    const isList = curUseStore instanceof ListStore;
    if (isList && isBindSearch) {
      const { pathname, search } = location;
      const valSearch = getURLSearch();
      search !== `?${valSearch}` && nav(`${pathname}?${valSearch}`, { replace: curUseStore.queryRoutingType === 'replace' });
    }
  };

  const curChildren = useMemo(
    () => <><StoreFormFields fields={fields} store={curUseStore} />{children}</>,
    [children, curUseStore, fields],
  );

  return (
    <Form {...args} onAutoSubmit={autoSubmit}>
      {grid ? <FormGrid {...defaultGrid} {...grid}>{curChildren}</FormGrid> : curChildren}
    </Form>
  );
});

const StoreFormFields = observer((props: StoreFormFieldsProps) => {
  const { fields = [] } = props;
  const schema = useFieldSchema();
  const scope = useExpressionScope() ?? {};
  const { curStore } = scope;
  const SchemaField = useSchemaField();

  if (!(fields?.length > 0)) {
    return null;
  }

  const properties: Record<string, any> = {};

  fields.forEach((field) => {
    if (typeof field === 'string') {
      properties[field] = { $ref: `#/definitions/${field}` };
    } else {
      const { field: f, itemProps, ...args } = field;
      properties[f] = { $ref: `#/definitions/${f}`, ...args, 'x-decorator-props': itemProps };
    }
  });

  if (schema) {
    return <RecursionField schema={{ ...schema, 'x-component': undefined, 'x-decorator': undefined, properties }} />;
  }

  return <SchemaField schema={{ type: 'object', definitions: curStore?.fieldsConfig, properties }} />;
});

export interface StoreFormFieldsProps {
  fields?: Array<string | IStoreFormField>
  store?: IStore
}

export interface IStoreFormField {
  field: string,
  'itemProps'?: React.PropsWithChildren<IFormItemProps>
  [key: string]: any
}

export type StoreFormProps = FormProps & StoreFormFieldsProps & { children?: ReactNode, grid?: false | IFormGridProps };
