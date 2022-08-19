import { observer } from '@formily/react';
import { Text as TText, TextProps as TTextProps } from '@tarojs/components';
import { RenderValue } from '@yimoko/store';
import cls from 'classnames';
import { ReactNode, useMemo } from 'react';

import { IType, ISize } from '../props';

export interface TextProps extends TTextProps {
  bold?: boolean;
  block?: boolean;
  size?: ISize
  type?: IType,
  value?: ReactNode
  children?: ReactNode,
}

export const Text = observer((props: TextProps) => {
  const { className, size, value, bold, block, type, children, ...args } = props;
  const curClassName = useMemo(() => cls(
    'y-text',
    {
      'y-text--bold': bold,
      'y-text--block': block,
      [`y-text--${size}`]: size,
      [`y-text--${type}`]: type,
    },
    className,
  ), [block, bold, className, size, type]);

  console.log('testxxx');

  return <TText {...args} className={curClassName}><RenderValue value={children ?? value} /></TText>;
});
