import { Radio as TRadio, RadioGroup as TRadioGroup, Skeleton } from '@antmjs/vantui';
import { RadioGroupProps as TRadioGroupProps } from '@antmjs/vantui/types/radio';
import { observer, RecursionField } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';

export const Radio = TRadio;

export type RadioGroupProps = Omit<TRadioGroupProps, 'onChange'> & IOptionsAPIProps & {
  onChange?: (value: any, event: ITouchEvent) => void
};

export const RadioGroup = observer((props: RadioGroupProps) => {
  const { options, api, keys, splitter, onChange, children, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, keys, splitter);
  const curItems = useSchemaItems();

  return (
    <Skeleton loading={loading}>
      <TRadioGroup direction='horizontal' {...args} onChange={e => onChange?.(e.detail, e)}>
        {data.map?.(({ label, value, ...itemArgs }, i) => (
          <TRadio key={i} name={value} {...itemArgs}>{label}</TRadio>
        ))}
        {curItems.map?.((item, i) => (
          <RecursionField schema={item} name={i} />
        ))}
        {children}
      </TRadioGroup>
    </Skeleton>
  );
});
