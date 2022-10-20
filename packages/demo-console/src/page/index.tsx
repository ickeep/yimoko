import { observer } from '@formily/react';
import { Icon, AntPlots } from '@yimoko/web';

export const IndexPage = observer(() => {
  console.log('IndexPage');
  return <div>
    IndexPage
    <Icon name='MinusCircleFilled' fill="#F04352" />
    <AntPlots.Line data={[{ value: 1, type: '1' }, { value: 2, type: '2' }]} xField="type" yField='value' />
  </div>;
});
