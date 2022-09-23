import { Collapse as TCollapse, Skeleton, CollapseItem } from '@antmjs/vantui';
import { CollapseItemProps, CollapseProps as TCollapseProps } from '@antmjs/vantui/types/collapse';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { Key, useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateConvertForProps } from '../tools/template';

export type CollapseProps = TCollapseProps & IOptionsAPIProps<keyof CollapseItemProps | 'desc' | 'url' | 'click' | 'value'> & {
  onChange?: (value: any, e?: ITouchEvent) => void;
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
  itemURLPrefix?: string
  itemDefault?: Record<Key, any>
};

const defaultKeys = {
  children: 'desc', name: 'name', title: 'title', value: 'value', icon: 'icon', label: 'label',
  disabled: 'disabled', clickable: 'clickable', border: 'border', isLink: 'isLink', size: 'size',
};

export const Collapse = (props: CollapseProps) => {
  const { value, options, api, keys, splitter, valueType, onChange, children, skeleton, accordion, itemURLPrefix, itemDefault, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<CollapseProps['value']>();
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const isControlled = value !== undefined;
  const curValue = useMemo(() => {
    const tmp = !isControlled ? val : value;

    const single = () => `${(Array.isArray(tmp) ? tmp[0] : tmp) ?? ''}`;

    const multiple = () => {
      if (!tmp) {
        return [];
      }
      return Array.isArray(tmp) ? tmp : [tmp];
    };
    return accordion ? single() : multiple();
  }, [accordion, isControlled, val, value]);

  const curChildren = useMemo(() => {
    const dataChildren = data?.map((item, i) => (
      <CollapseItem key={`d-${i}`} onClick={() => handleClick({ ...itemDefault, ...item }, itemURLPrefix, i)} {...item} name={`data-${i}`} />
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateConvertForProps(getItemPropsBySchema(item, 'CollapseItem', i), scope);
      return <CollapseItem key={`i-${i}`} onClick={() => handleClick({ ...itemDefault, ...props }, itemURLPrefix, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, itemDefault, itemURLPrefix, scope]);


  return (
    <Skeleton {...skeleton} loading={loading}>
      <TCollapse
        {...args}
        accordion={accordion}
        value={curValue}
        onChange={(e) => {
          onChange?.(e.detail);
          !isControlled && setVal(e.detail);
        }}
      >
        {curChildren}
      </TCollapse>
    </Skeleton>
  );
};
