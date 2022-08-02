import { observer } from '@formily/react';
import { SchemaPage, useBaseStore, judgeIsSuccess } from '@yimoko/store';
import { Page } from '@yimoko/taro';


const IndexPage = observer(() => {
  const { loading, response } = useBaseStore({ api: { url: '/api/page/detail' }, isRunNow: true });
  console.log('judgeIsSuccess(response)', response.data?.schema);

  return (
    <Page loading={loading} data={response} className='index'>
      {/* <Form>
        <FormItem label='步进器' name='stepper'>
          <Switch />
        </FormItem>
      </Form> */}
      {judgeIsSuccess(response) && <SchemaPage
        options={response.data?.options}
        schema={response.data?.schema}
      />}
    </Page>
  );
});

export default IndexPage;
