import { observer } from '@formily/react';
import { APIPage, httpGet } from '@yimoko/taro';

const getPageJSON = ({ name }: { name: string }) => httpGet(`/component/detail/${name}.json` + `?t=${new Date().getTime()}`);

export default observer(() => <APIPage store={{ api: getPageJSON }} paramKey='name' />);
