import { Steps as TSteps, Skeleton } from '@antmjs/vantui';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { StepsProps as TStepsProps } from '@antmjs/vantui/types/steps';
import { IOptionsAPIProps, useAPIOptions } from '@yimoko/store';
import { useMemo } from 'react';

const defaultKeys = {
  value: 'value',
  desc: 'desc',
  text: 'text',
  activeIcon: 'activeIcon',
  inactiveIcon: 'inactiveIcon',
};

export type StepsProps = Omit<TStepsProps, 'steps' | 'active'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  value?: any
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

export const Steps = (props: StepsProps) => {
  const { value, options, api, keys, splitter, skeleton, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter) as [any[], boolean, Function];

  const curValue = useMemo(() => {
    let index = 0;
    // undefined 默认会显示第一个
    if (value === undefined) {
      return '';
    }
    const item = data.find((item, i) => {
      index = i;
      return item.value === value;
    });
    if (!item) {
      return '';
    }
    return item.index ?? index;
  }, [data, value]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <TSteps  {...args} steps={data} active={curValue} />
    </Skeleton>
  );
};
