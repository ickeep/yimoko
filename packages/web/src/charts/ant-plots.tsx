import * as plots from '@ant-design/plots';

import { observer } from '@formily/react';
import { RenderValue, useConfig } from '@yimoko/store';

import { LoadDepend, LoadDependProps } from '../common/load-depend';
import { IConfig } from '../store/config';

export const LoadDependAntPlots = observer((props: Omit<LoadDependProps, 'js' | 'css'>) => {
  const { deep: { antPlots } } = useConfig<IConfig>();
  return <LoadDepend {...props} {...antPlots} />;
});

const getAntPlotsComponent = (key: string) => observer((props: any) => {
  const g = globalThis as Record<string, any>;
  return <LoadDependAntPlots component={() => <RenderValue value={g.Plots?.[key]} props={props} />} />;
});

// @ts-ignore 使用 Omit Pick 会导致类型推断 any
export const AntPlots: typeof plots = {};
[
  'Area', 'Bar', 'BidirectionalBar', 'Box', 'Bullet', 'Chord', 'CirclePacking', 'Column', 'DualAxes',
  'Facet', 'Funnel', 'G2', 'Gauge', 'Heatmap', 'Histogram', 'Line', 'Liquid', 'Mix', 'MultiView', 'Pie', 'Plot', 'Progress', 'Radar',
  'RadialBar', 'RingProgress', 'Rose', 'Sankey', 'Scatter', 'Stock', 'Sunburst', 'TinyArea', 'TinyColumn', 'TinyLine', 'Treemap', 'Venn',
  'Violin', 'Waterfall', 'WordCloud',
  // @ts-ignore
].forEach(key => AntPlots[key] = getAntPlotsComponent(key));
