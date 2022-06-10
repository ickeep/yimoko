import { ISchema, observer } from '@formily/react';
import { SchemaTemplate, useDeepEffect, useStore } from '@yimoko/store';
import { ReactNode, useMemo } from 'react';

export interface LoadTemplateProps {
  template: string | ISchema
  children?: ReactNode
}

export const LoadTemplate = observer((props: LoadTemplateProps) => {
  const { template, children } = props;
  const { runAPIByField, loading, response } = useStore({ defaultValues: { name: '' }, api: { url: '/api/template' } });

  const schema = useMemo(() => (typeof template === 'string' ? response.data : template), [template, response.data]);

  // todo 骨架屏 及 初次加载不显示 children
  console.log(loading);

  useDeepEffect(() => {
    typeof template === 'string' && runAPIByField('name', template);
  }, [template]);

  return schema ? <SchemaTemplate schema={schema}>{children}</SchemaTemplate> : <>{children}</>;
});
