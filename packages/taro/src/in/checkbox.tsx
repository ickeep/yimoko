import { Checkbox as TCheckbox, CheckboxGroup as TCheckboxGroup, Skeleton } from '@antmjs/vantui';
import { CheckboxProps as TCheckboxProps, CheckboxGroupProps as TCheckboxGroupProps } from '@antmjs/vantui/types/checkbox';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer, useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, strToArr, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

import { templateConvertForProps } from '../tools/template';

export interface CheckboxProps extends Omit<TCheckboxProps, 'onChange' | 'value'> {
  onChange?: (value: any, event: ITouchEvent) => void
  values?: { true: any, false: any }
  value?: any
}

export const Checkbox = (props: CheckboxProps) => {
  const { onChange, value, values, ...args } = props;

  const curValue = useMemo(() => {
    if (value === undefined) {
      return undefined;
    }
    if (values) {
      return value === values.true;
    }
    return !!value;
  }, [value, values]);

  return (
    <TCheckbox
      shape="square"
      {...args}
      value={curValue}
      onChange={(e) => {
        const { detail } = e;
        let val = detail;
        if (values) {
          val = detail ? values.true : values.false;
        }
        onChange?.(val, e);
      }} />
  );
};

export type CheckboxGroupProps = Omit<TCheckboxGroupProps, 'onChange'> & IOptionsAPIProps & {
  onChange?: (value: any, event: ITouchEvent) => void
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

export const CheckboxGroup = observer((props: CheckboxGroupProps) => {
  const { options, api, keys, splitter, value, valueType, onChange, skeleton, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, keys, splitter);

  const curValue = useMemo(() => {
    const type = typeof value;
    if (!Array.isArray(value)) {
      if (type === 'string') {
        return strToArr(value, splitter);
      }
      return [];
    }
    return value;
  }, [value, splitter]);

  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data.map?.(({ label, value, ...itemArgs }, i) => (
      <TCheckbox shape="square" key={`d-${i}`} name={value} {...itemArgs}>{label}</TCheckbox>
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateConvertForProps(getItemPropsBySchema(item, 'Checkbox', i), scope);
      return <TCheckbox shape="square" key={`i-${i}`} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, scope]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <TCheckboxGroup
        direction="horizontal"
        {...args}
        value={curValue}
        onChange={e => onChange?.(valueType === 'string' ? e.detail?.join(splitter) : [...e.detail], e)}
      >
        {curChildren}
      </TCheckboxGroup>
    </Skeleton>
  );
});
