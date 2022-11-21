import { useExpressionScope } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { useMemo } from 'react';

import { Link, LinkProps } from './link';

export const EditLink = observer((props: LinkProps) => {
  const { to, ...rest } = props;
  const { getEditPath, $record } = useExpressionScope();
  const curTo = useMemo(() => to ?? getEditPath?.($record), [to, getEditPath, $record]);
  return <Link to={curTo} children="编辑" {...rest} />;
});
