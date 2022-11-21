import { observer } from '@formily/reactive-react';
import { Breadcrumb, BreadcrumbItemProps, BreadcrumbProps, Space, Typography } from 'antd';

import { Icon } from '../out/icon';
import { Link } from '../out/link';

export interface PageBreadcrumbItem extends BreadcrumbItemProps {
  label?: string;
  icon?: string;
}

export interface PageBreadcrumbProps extends BreadcrumbProps {
  items: Array<PageBreadcrumbItem>
}

export const PageBreadcrumb = observer((props: PageBreadcrumbProps) => {
  const { items, children, style, ...rest } = props;

  const content = (
    <Breadcrumb {...rest} >
      {items.map((item, i) => {
        const { href, label, icon, children, ...rest } = item;
        let content = label ?? children;
        icon && (content = <><Icon name={icon} />{content}</>);
        href && (content = <Link to={href}><Typography.Text type="secondary">{content}</Typography.Text></Link>);

        return (<Breadcrumb.Item key={i} {...rest}>{content}</Breadcrumb.Item>);
      })}
    </Breadcrumb>
  );

  if (children) {
    return (
      <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }} >
        {content}
        {children}
      </Space>
    );
  }

  return content;
});


