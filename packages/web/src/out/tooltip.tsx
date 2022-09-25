import { observer } from '@formily/react';
import { Tooltip as ATooltip, TooltipProps as ATooltipProps } from 'antd';
import { isValidElement, useMemo } from 'react';

import { Icon, IconProps } from './icon';

export type TooltipProps = ATooltipProps & {
  value?: ATooltipProps['children']
  icon?: string | React.ReactNode | IconProps
};

const dfIcon = 'QuestionCircleOutlined';

export const Tooltip = observer((props: TooltipProps) => {
  const { icon = dfIcon, value, children, ...args } = props;

  // eslint-disable-next-line complexity
  const curChildren = useMemo(() => {
    const node = children || value;
    if (node) {
      return node;
    }
    if (typeof icon === 'string') {
      return <Icon name={icon} />;
    }
    if (isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'object') {
      return <Icon name={dfIcon} {...icon} />;
    }
  }, [children, icon, value]);

  return <ATooltip {...args}>{curChildren}</ATooltip>;
});
