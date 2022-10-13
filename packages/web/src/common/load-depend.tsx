import { observer } from '@formily/react';
import { judgeIsEmpty, RenderValue } from '@yimoko/store';
import { Alert, AlertProps, Button, Space, Spin, SpinProps, Typography } from 'antd';

import { CSSDeeps, JSDeep, useLoadDepend } from '../hook/use-load-depend';
import { Icon } from '../out/icon';
import { Link } from '../out/link';

export interface LoadDependProps {
  js?: JSDeep,
  css?: CSSDeeps
  children?: any
  component?: any
  props?: Record<string, any>
  spin?: Omit<SpinProps, 'spinning'>
}

export const LoadDepend = observer((props: LoadDependProps) => {
  const { js, css, children, component, props: p, spin } = props;
  const [loading, errs, load] = useLoadDepend([js, css]);

  if (loading) {
    return <Spin delay={50} {...spin} spinning />;
  }

  if (!judgeIsEmpty(errs)) {
    const errMsg = errs.filter(e => e !== false);
    let description: AlertProps['description'] = 'js/css依赖加载失败';
    if (!judgeIsEmpty(errMsg)) {
      description = <Space direction="vertical">{errMsg.map((e, i) => <Typography.Text key={i}>{String(e)}</Typography.Text>)}</Space>;
    }
    const retry = () => {
      load();
    };
    return (<Alert
      type="error"
      message={<Space direction="vertical">{description}<Typography.Link onClick={retry}><Icon name="ReloadOutlined" /> 再试一次</Typography.Link></Space>}
    />);
  }
  return <RenderValue value={children ?? component} props={p} />;
});
