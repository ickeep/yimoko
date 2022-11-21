import { useExpressionScope } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { useMemo } from 'react';

import { Link, LinkProps } from './link';

export const DetailLink = observer((props: LinkProps) => {
  const { to, ...rest } = props;

  const { getDetailPath, $record } = useExpressionScope();
  const curTo = useMemo(() => to ?? getDetailPath?.($record), [to, getDetailPath, $record]);
  return <Link to={curTo}  {...rest} />;
});
