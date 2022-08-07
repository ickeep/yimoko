import { Checkbox as TCheckbox, CheckboxGroup as TCheckboxGroup, Skeleton } from '@antmjs/vantui';
import { CheckboxProps as TCheckboxProps, CheckboxGroupProps as TCheckboxGroupProps } from '@antmjs/vantui/types/checkbox';
import { observer, RecursionField, useFieldSchema } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, strToArr, useAPIOptions } from '@yimoko/store';
import { useMemo } from 'react';

export interface CheckboxProps extends Omit<TCheckboxProps, 'onChange' | 'value'> {
  onChange: (value: any, event: ITouchEvent) => void
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
    <TCheckbox {...args}
      value={curValue}
      onChange={(e) => {
        const { detail } = e;
        let val = detail;
        if (values) {
          val = detail ? values.true : values.false;
        }
        onChange(val, e);
      }} />
  );
};

export type CheckboxGroupProps = Omit<TCheckboxGroupProps, 'onChange'> & IOptionsAPIProps & {
  onChange: (value: any, event: ITouchEvent) => void
};

export const CheckboxGroup = observer((props: CheckboxGroupProps) => {
  const { options, api, keys, splitter, value, valueType, onChange, ...args } = props;

  const { items } = useFieldSchema();
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

  const curItems = useMemo(() => {
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }, [items]);

  return (
    <Skeleton loading={loading}>
      <TCheckboxGroup
        {...args}
        value={curValue}
        onChange={e => onChange(valueType === 'string' ? e.detail?.join(splitter) : [...e.detail], e)}
      >
        {data.map?.(({ label, value, ...itemArgs }, i) => (
          <TCheckbox key={i} name={value} {...itemArgs}>{label}</TCheckbox>
        ))}
        {curItems.map?.((item, i) => (
          <RecursionField schema={item} name={i} />
        ))}
      </TCheckboxGroup>
    </Skeleton>
  );
});
