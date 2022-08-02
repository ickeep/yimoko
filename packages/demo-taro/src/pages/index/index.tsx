import { Switch } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { useBaseStore } from '@yimoko/store';
import { Page, FormItem, Icon, Input, Button, SchemaPage, judgeIsSuccess, SchemaPageProps } from '@yimoko/taro';

const components = {
  FormItem,
  Input,
  Icon,
  Button,
};

const IndexPage = observer(() => {
  const { loading, response } = useBaseStore<{}, SchemaPageProps>({ api: { url: '/api/page/detail' }, isRunNow: true });
  return (
    <Page loading={loading} data={response} className='index'>
      <Switch />
      {judgeIsSuccess(response) && <SchemaPage
        options={response.data?.options}
        components={components}
        schema={response.data?.schema}
        type='form'
      />}
    </Page>
  );
});

export default IndexPage;
