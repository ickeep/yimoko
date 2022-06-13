import TIcon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { judgeIsSuccess, useAPIExecutor, useConfig } from '@yimoko/store';
import { Spin } from 'antd';
import htmr from 'htmr';
import { useEffect, useMemo, useState } from 'react';

export interface IconProps extends CustomIconComponentProps {
  name?: string
  value?: string
}

const fetchMap: Record<string, Promise<string | null>> = {};
// @ts-ignore
const icons: Record<string, any> = globalThis.icons ?? {};

export const Icon = (props: IconProps) => {
  const { name, value, ...args } = props;
  const http = useAPIExecutor();
  const [loading, setLoading] = useState(false);
  const { static: { icon } } = useConfig();

  const file = name ?? value ?? '';

  const src = useMemo(() => (file.includes('://') ? file : `${icon + file}.svg`), [file, icon]);

  const component = icons[file];

  useEffect(() => {
    if (!component) {
      const fetch = fetchMap[src] ?? (fetchMap[src] = new Promise((resolve) => {
        setLoading(true);
        http({ url: src }).then((res) => {
          setLoading(false);
          resolve(judgeIsSuccess(res) ? res.data : null);
        });
      }));

      fetch.then(data => icons[file] = () => (data ? htmr(data) : null));
    }
  }, [component, file, http, src]);

  if (component) {
    return <TIcon component={component}  {...args} />;
  }

  return <Spin spinning={loading} />;
};
