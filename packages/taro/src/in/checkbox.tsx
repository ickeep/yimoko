import { Checkbox as TCheckbox, CheckboxGroup as TCheckboxGroup, Skeleton } from '@antmjs/vantui';
import { CheckboxProps as TCheckboxProps, CheckboxGroupProps as TCheckboxGroupProps } from '@antmjs/vantui/types/checkbox';
import { observer, RecursionField } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, strToArr, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

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
};

export const CheckboxGroup = observer((props: CheckboxGroupProps) => {
  const { options, api, keys, splitter, value, valueType, onChange, children, ...args } = props;

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

  return (
    <Skeleton loading={loading}>
      <TCheckboxGroup
        {...args}
        value={curValue}
        onChange={e => onChange?.(valueType === 'string' ? e.detail?.join(splitter) : [...e.detail], e)}
      >
        {data.map?.(({ label, value, ...itemArgs }, i) => (
          <TCheckbox shape="square" key={i} name={value} {...itemArgs}>{label}</TCheckbox>
        ))}
        {curItems.map?.((item, i) => (
          <RecursionField schema={item} name={i} />
        ))}
        {children}
      </TCheckboxGroup>
    </Skeleton>
  );
});
