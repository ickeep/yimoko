import { observer } from '@formily/react';
import { SchemaPage, useBaseStore, judgeIsSuccess } from '@yimoko/store';
import { Page } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading, response } = useBaseStore({ api: { url: '/api/components/swiper' }, isRunNow: true });

  return (
    <Page loading={loading} data={response} >
      {judgeIsSuccess(response) && <SchemaPage
        options={response.data?.options}
        schema={response.data?.schema}
      />}
    </Page>
  );
});

export default IndexPage;
