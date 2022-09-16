import { RecordScope, RecursionField, observer } from '@formily/react';

import { useSchemaItems } from '../hooks/use-schema-items';

export interface DataItemsProps {
  value?: any[];
  data?: any[],
  name?: string
}

export const DataItems = observer((props: DataItemsProps) => {
  const { value, data, name } = props;
  const curItems = useSchemaItems();
  const len = curItems.length;

  if (len < 1) {
    return null;
  };

  return <>
    {(data ?? value)?.map((r, i) => {
      const curItem = curItems[(len + i) % len];
      return (
        <RecordScope key={i} getRecord={() => r} getIndex={() => i}>
          <RecursionField schema={curItem} name={name ? `${name}.${i}` : i} onlyRenderProperties />
        </RecordScope>
      );
    })}
  </>;
});
