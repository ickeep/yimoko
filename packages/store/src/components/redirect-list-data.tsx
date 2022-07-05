import { observer, useExpressionScope } from '@formily/react';

import { RedirectValues } from './redirect-values';

export const RedirectListData = observer(() => {
  const scope = useExpressionScope();
  const { curStore } = scope;
  const { response } = curStore ?? {};
  const values = Array.isArray(response?.data) ? response.data : (response?.data?.data ?? []);

  return <RedirectValues values={values} />;
});
