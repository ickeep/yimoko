import { ISchema, observer } from '@formily/react';
import { judgeIsEmpty, SchemaTemplate, useDeepEffect, useStore } from '@yimoko/store';
import { Skeleton, SkeletonProps, Spin, SpinProps } from 'antd';
import { ReactNode, useMemo } from 'react';

export interface LoadTemplateProps {
  spin?: SpinProps | true;
  skeleton?: Omit<SkeletonProps, 'loading'>
  template: string | ISchema
  children?: ReactNode
}

export const LoadTemplate = observer((props: LoadTemplateProps) => {
  const { template, children, spin, skeleton } = props;
  const { runAPIByField, loading, response } = useStore({ defaultValues: { name: '' }, api: { url: '/api/template' } });

  const schema = useMemo(() => (typeof template === 'string' ? response.data : template) as ISchema, [template, response.data]);

  const spinProps = useMemo(() => (typeof spin === 'object' ? spin : {}), [spin]);

  const content = schema ? <SchemaTemplate schema={schema}>{children}</SchemaTemplate> : children;

  useDeepEffect(() => {
    typeof template === 'string' && runAPIByField('name', template);
  }, [template]);

  if (spin) {
    return <Spin {...spinProps} spinning={loading}>{content}</Spin>;
  }

  const isFirstLoad = loading && judgeIsEmpty(response.data);

  return <Skeleton active  {...skeleton} loading={isFirstLoad}>{content}</Skeleton>;
});
