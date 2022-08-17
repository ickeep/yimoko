
import { observer } from '@formily/react';
import { APIPage, httpGet } from '@yimoko/taro';

const getPageJSON = ({ pagePath }: { pagePath: string }) => httpGet(`${pagePath}.json` + `?t=${new Date().getTime()}`);

export default observer(() => <APIPage store={{ api: getPageJSON }} pagePath='/component/list' />);
