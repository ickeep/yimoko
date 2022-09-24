import { ISchema, observer } from '@formily/react';
import { getItemPropsBySchema, IStore, judgeIsEmpty, useCurStore, useSchemaField, useSchemaItems } from '@yimoko/store';
import { Descriptions, DescriptionsProps } from 'antd';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { get } from 'lodash-es';
import { Key, ReactNode, useMemo } from 'react';

import { IconProps } from '../out/icon';

export interface StoreDescProps<T extends object = Record<Key, any>> extends DescriptionsProps {
  fields?: Array<keyof T | string | (ISchema & { field: string } & Partial<DescriptionsItemProps>)>
  store?: IStore
  valuesTarget?: 'values' | 'response.data' | string
  // todo: 未实现
  tipIcon?: string | IconProps
}

export const StoreDesc = observer((props: StoreDescProps) => {
  const { fields, children, store, valuesTarget = 'values', ...args } = props;
  const SchemaField = useSchemaField();
  const curStore = useCurStore(store);
  const curItems = useSchemaItems();

  const fieldsItems: DescriptionsItemProps[] = useMemo(() => {
    // eslint-disable-next-line complexity
    const getItemProps = (field: Key, item: Partial<DescriptionsItemProps> = {}): DescriptionsItemProps => {
      const { title, desc: { schema = {}, ...args } = {} } = curStore?.fieldsConfig[field] ?? {};
      const props = { label: title ?? field, ...args, ...item };
      const data = get(curStore, valuesTarget);
      let children: ReactNode = null;
      if (!judgeIsEmpty(schema)) {
        children = <SchemaField schema={schema} />;
      } else if (judgeIsEmpty(props.children)) {
        children = get(data, field) ?? '';
      }
      return { ...props, children };
    };

    return fields?.map((field) => {
      if (typeof field === 'string') {
        return getItemProps(field);
      }
      if (typeof field === 'object') {
        return getItemProps(field.field, field);
      }
      return { label: field, children: null };
    }) ?? [];
  }, [fields, curStore, SchemaField, valuesTarget]);

  const itemsProps = useMemo(() => curItems.map(item => getItemPropsBySchema(item, 'DescItem')), [curItems]);

  return (
    <Descriptions {...args}>
      {fieldsItems.map((item, index) => (<Descriptions.Item key={index} {...item} />))}
      {itemsProps.map((item, index) => (<Descriptions.Item key={index} children="" {...item} />))}
      {children}
    </Descriptions>
  );
});
