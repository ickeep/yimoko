import { observer } from '@formily/react';
import { Page, FormItem, Icon, Input, useStore, Button, SchemaPage, judgeIsSuccess, SchemaPageProps } from '@yimoko/taro';

const components = {
  FormItem,
  Input,
  Icon,
  Button,
};

const IndexPage = observer(() => {
  const { loading, response } = useStore<{}, SchemaPageProps>({ api: { url: '/api/page/detail' }, isRunNow: true });
  return (
    <Page loading={loading} data={response} className='index'>
      {judgeIsSuccess(response) && <SchemaPage
        options={response.data?.options}
        components={components}
        schema={response.data?.schema}
        type="form"
      />}
    </Page>
  );
});

export default IndexPage;
