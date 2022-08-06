import { IRouteType, navigate } from '../adapter/route';

interface IItem {
  click?: Function;
  url?: string;
  routeType?: IRouteType;
  [key: string]: any;
}

export const handleClick = (item: IItem, i?: number) => {
  const { url, click, routeType = 'to' } = item;
  if (typeof click === 'function') {
    click(item, i);
  }
  if (typeof url === 'string' && url) {
    // const compiled = template(url);
    navigate(url, routeType);
  }
};
