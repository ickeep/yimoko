import { Cell, IndexAnchor, IndexBar as TIndexBar, Skeleton } from '@antmjs/vantui';
import { IndexBarProps as TIndexBarProps } from '@antmjs/vantui/types/index-bar';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { RecursionField } from '@formily/react';
import { Block } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

const defaultKeys = {
  index: 'index',
  child: 'child',
};

export type IndexBarProps = Omit<TIndexBarProps, 'steps' | 'active'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

export const IndexBar = (props: IndexBarProps) => {
  const { options, api, keys, splitter, skeleton, indexList, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);

  const curItems = useSchemaItems();

  const curIndexList = useMemo(() => {
    const arr: any[] = [];
    data.forEach(item => arr.push(item.index));
    indexList && arr.push(...indexList);
    return arr;
  }, [data, indexList]);

  return (
    <Skeleton {...skeleton} loading={loading} >
      <TIndexBar sticky  {...args} indexList={curIndexList}>
        {data?.map((item, i) => <Block key={i}>
          <IndexAnchor index={item.index} />
          {item.child?.map?.((c: any, i: number) => (typeof c === 'string' ? <Cell key={i} title={c} /> : <Cell key={i} {...c} />))}
        </Block>)}
        {curItems.map((item, i) => <RecursionField key={i} schema={item} name={i} />)}
      </TIndexBar>
    </Skeleton>
  );
};
