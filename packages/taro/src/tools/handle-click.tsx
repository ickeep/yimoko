import { IRouteType, navigate } from '../adapter/route';

import { template } from './template';

interface IItem {
  click?: Function;
  url?: string;
  routeType?: IRouteType;
  [key: string]: any;
}

export const handleClick = (item: IItem, itemURLPrefix = '', i?: number) => {
  const { url, click, routeType = 'to' } = item;

  if (typeof click === 'function') {
    click(item, i);
  }
  if (typeof url === 'string' && url) {
    navigate(itemURLPrefix + template(url, { $i: i, ...item }), routeType);
  }
};
