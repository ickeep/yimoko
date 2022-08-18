import { observer } from '@formily/react';
import { Typography } from 'antd';
import { LinkProps as ALinkProps } from 'antd/lib/typography/Link';
import { forwardRef, useMemo } from 'react';
import { LinkProps as RLinkProps, useHref, useLinkClickHandler } from 'react-router-dom';

const { Link: ALink } = Typography;

export type LinkProps = Pick<RLinkProps, 'to' | 'reloadDocument' | 'replace' | 'state'> & ALinkProps & React.RefAttributes<HTMLElement>;

export const Link = observer((props: LinkProps) => {
  const { href, to, target, ...args } = props;

  const isExternal = useMemo(() => href && /^[\w]+:\/\//.test(href), [href]);

  const curTarget = useMemo(() => {
    if (target) {
      return target;
    }
    return isExternal ? '_blank' : undefined;
  }, [isExternal, target]);

  if (!isExternal) {
    return (<LinkAdapter {...args} target={curTarget} to={href ?? to} />);
  }

  return <ALink rel="noopener noreferrer" {...args} href={href} target={curTarget} />;
});

export const LinkAdapter = forwardRef<any, LinkProps>((props, ref) => {
  const { onClick, replace = false, state, target, to, type, ...args } = props;
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, { replace, state, target });
  return (
    <ALink
      {...args}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        !event.defaultPrevented && handleClick(event);
      }}
      ref={ref}
      target={target}
    />
  );
});
