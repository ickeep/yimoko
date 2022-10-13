import { observer } from '@formily/react';
import { Icon, loadJS, LoadDepend } from '@yimoko/web';
import { useEffect } from 'react';

export const IndexPage = observer(() => {
  console.log('IndexPage');
  return <div>
    IndexPage
    <LoadDepend js={[{ name: 'xxx' }]} spin={{}}>
      123
    </LoadDepend>
    <Icon name='MinusCircleFilled' fill="#F04352" />
  </div>;
});
