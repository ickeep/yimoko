import TIcon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { judgeIsSuccess, useAPIExecutor, useConfig } from '@yimoko/store';
import { Spin } from 'antd';
import htmr from 'htmr';
import { HTMLAttributes, useEffect, useMemo, useState } from 'react';

import { IConfig } from '../store/config';

export type IconProps = Partial<Omit<CustomIconComponentProps, 'component'>> & Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name?: string
  value?: string
};

const fetchMap: Record<string, Promise<string | null>> = {};
const { icons = {} } = globalThis as any;

export const Icon = (props: IconProps) => {
  const { name, value, ...args } = props;
  const http = useAPIExecutor();
  const [loading, setLoading] = useState(false);
  const { static: { icon = '' } = {} } = useConfig<IConfig>();

  const file = name ?? value ?? '';
  const src = useMemo(() => (file.includes('://') ? file : `${icon + file}.svg`), [file, icon]);
  const component = icons[file];

  useEffect(() => {
    if (!component) {
      const fetch = fetchMap[src] ?? (fetchMap[src] = new Promise((resolve) => {
        http({ url: src }).then(res => resolve(judgeIsSuccess(res) ? res.data : null));
      }));
      setLoading(true);
      fetch.then((data) => {
        data && (icons[file] = () => (data ? htmr(data) : null));
        delete fetchMap[src];
        setLoading(false);
      });
    }
  }, [component, file, http, src]);

  if (component) {
    return <TIcon component={component}  {...args} />;
  }

  return <Spin size='small' spinning={loading} />;
};
