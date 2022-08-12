import { RecursionField, Schema } from '@formily/react';
import React from 'react';

// 用于在有子项项目，例如 menu 之类，获取 schema item 子项配置
export function getItemPropsBySchema(schema: Schema, componentName: string, schemaKey: string | number): Record<string, any> {
  const {
    'x-component': component,
    'x-component-props': componentProps,
    'x-decorator': decorator,
    'x-decorator-props': decoratorProps,
    ...args } = schema;
  if (component === componentName) {
    return {
      ...componentProps,
      children: <RecursionField schema={schema} onlyRenderProperties name={schemaKey} />,
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
