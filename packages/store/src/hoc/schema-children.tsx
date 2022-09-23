import { createForm, IFormProps } from '@formily/core';
import { ISchema } from '@formily/react';
import React, { Key, useMemo } from 'react';

import { SchemaBox } from '../components/schema-box';
import { useSchemaField } from '../context/schema-field';
import { judgeIsEmpty } from '../tools/tool';

export type WithSchemaChildrenProps<T extends Object = Record<Key, any>, F extends Object = any> = Omit<T, 'children'> & {
  schema?: ISchema
  model?: IFormProps<F>
};

// 适配子项(例如 Tabs 的 Tab) 让其支持 schema 渲染
export function withSchemaChildren<T extends Object = Record<Key, any>>(C: React.ComponentClass<T> | React.FunctionComponent<T>) {
  return (props: WithSchemaChildrenProps<T>) => {
    const { model, schema, ...args } = props;
    const cProps = args as T;

    const SchemaField = useSchemaField();
    const curModel = useMemo(() => (!judgeIsEmpty(schema) ? createForm({ ...model, values: { data: model?.values } }) : undefined), [schema, model]);

    if (judgeIsEmpty(schema)) {
      return <C {...cProps} />;
    }

    return (
      <C {...cProps}>
        <SchemaBox model={curModel}>
          <SchemaField schema={{ type: 'object', properties: { data: schema } }} />
        </SchemaBox>
      </C>);
  };
}
