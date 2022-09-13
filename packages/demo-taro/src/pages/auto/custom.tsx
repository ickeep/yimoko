import { observer } from '@formily/react';
import { APIPage, httpGet } from '@yimoko/taro';

export const getPageJSON = ({ _page: page }: { _page: string }) => httpGet(`/page/${page}.json` + `?t=${new Date().getTime()}`);

export default observer(() => <APIPage store={{ api: getPageJSON }} paramKey='_page' />);
