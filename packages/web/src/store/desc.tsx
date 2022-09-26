import { ISchema, observer } from '@formily/react';
import { getItemPropsBySchema, IFieldsConfig, IStore, judgeIsEmpty, useCurStore, useSchemaField, useSchemaItems } from '@yimoko/store';
import { Descriptions, DescriptionsProps, Space } from 'antd';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { get } from 'lodash-es';
import { isValidElement, Key, ReactNode, useMemo } from 'react';

import { Tooltip, TooltipProps } from '../out/tooltip';

interface IFieldObj extends Partial<DescriptionsItemProps> {
  field: string
  tooltip?: TooltipProps
  schema?: ISchema
}

export interface StoreDescProps<T extends object = Record<Key, any>> extends DescriptionsProps {
  fields?: Array<keyof T | string | IFieldObj>
  store?: IStore
  valuesTarget?: 'values' | 'response.data' | string
  tipIcon?: TooltipProps['icon']
}

export const StoreDesc: <T extends object = Record<Key, any>>(props: StoreDescProps<T>) => React.ReactElement | null = observer((props) => {
  const { fields, children, store, valuesTarget = 'values', tipIcon, ...args } = props;
  const SchemaField = useSchemaField();
  const curStore = useCurStore(store);
  const curItems = useSchemaItems();

  const fieldsItems: DescriptionsItemProps[] = useMemo(() => {
    // eslint-disable-next-line complexity
    const getItemProps = (field: Key, item?: IFieldObj): DescriptionsItemProps => {
      const fieldConfig = curStore?.fieldsConfig?.[`${field}`] as IFieldsConfig[Key] | undefined;
      const { field: iField, schema, tooltip, ...args } = item ?? {};
      const { title, tooltip: fTooltip, desc: { schema: dSchema = undefined, tooltip: dTooltip = undefined, ...dArgs } = {} } = fieldConfig ?? {};
      const props = { label: title, ...dArgs, ...args };

      let tooltipProps: TooltipProps = {};
      [fTooltip, dTooltip, tooltip].forEach((item) => {
        if (!judgeIsEmpty(item)) {
          if ((isValidElement(item) || typeof item !== 'object')) {
            tooltipProps.title = item;
          } else {
            tooltipProps = { ...tooltipProps, ...item };
          }
        }
      });
      if (!judgeIsEmpty(tooltipProps)) {
        judgeIsEmpty(tooltipProps.icon) && (tooltipProps.icon = tipIcon);
        props.label = <Space size={4} ><span>{props.label}</span><Tooltip  {...tooltipProps} /></Space >;
      }

      const curSchema = schema ?? dSchema;

      let children: ReactNode = null;
      if (!judgeIsEmpty(curSchema)) {
        children = <SchemaField schema={curSchema} />;
      } else if (judgeIsEmpty(props.children)) {
        const data = get(curStore, valuesTarget);
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
      return { children: null };
    }) ?? [];
  }, [fields, curStore, valuesTarget, tipIcon, SchemaField]);

  const itemsProps = useMemo(() => curItems.map(item => getItemPropsBySchema(item, 'DescItem')), [curItems]);

  return (
    <Descriptions {...args}>
      {fieldsItems.map((item, index) => (<Descriptions.Item key={index} {...item} />))}
      {itemsProps.map((item, index) => (<Descriptions.Item key={index} children="" {...item} />))}
      {children}
    </Descriptions>
  );
});
