import { RecursionField, Schema } from '@formily/react';
import React, { Key } from 'react';

import { judgeIsEmpty } from './tool';

// 用于在有子项项目，例如 menu 之类，获取 schema item 子项配置
// eslint-disable-next-line complexity
export function getItemPropsBySchema(schema: Schema, componentName: string, schemaKey: string | number): Record<Key, any> {
  const {
    'x-component': component,
    'x-component-props': componentProps,
    'x-decorator': decorator,
    'x-decorator-props': decoratorProps,
    ...args
  } = schema;

  if (component === componentName) {
    if (judgeIsEmpty(schema.properties)) {
      return componentProps;
    }
    return {
      ...componentProps,
      children: <RecursionField schema={{ ...args, type: 'void' }} onlyRenderProperties name={schemaKey} />,
    };
  }

  if (!decorator || decorator === componentName) {
    return {
      ...decoratorProps,
      children: <RecursionField name={schemaKey} schema={{ ...args, 'x-component': component, 'x-component-props': componentProps }} />,
    };
  }

  return { children: <RecursionField schema={schema} name={schemaKey} /> };
};
