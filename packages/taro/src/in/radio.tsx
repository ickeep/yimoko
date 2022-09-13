import { Radio as TRadio, RadioGroup as TRadioGroup, Skeleton } from '@antmjs/vantui';
import { RadioGroupProps as TRadioGroupProps } from '@antmjs/vantui/types/radio';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer, useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

import { templateConvertForProps } from '../tools/template';

export const Radio = TRadio;

export type RadioGroupProps = Omit<TRadioGroupProps, 'onChange'> & IOptionsAPIProps & {
  onChange?: (value: any, event: ITouchEvent) => void
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

export const RadioGroup = observer((props: RadioGroupProps) => {
  const { options, api, keys, splitter, onChange, skeleton, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, keys, splitter);
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data.map?.(({ label, value, ...itemArgs }, i) => (
      <TRadio key={i} name={value} {...itemArgs}>{label}</TRadio>
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateConvertForProps(getItemPropsBySchema(item, 'Radio', i), scope);
      return <TRadio key={`i-${i}`} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, scope]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <TRadioGroup direction='horizontal' {...args} onChange={e => onChange?.(e.detail, e)}>
        {curChildren}
      </TRadioGroup>
    </Skeleton>
  );
});
