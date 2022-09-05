import { RecordScope, RecursionField } from '@formily/react';
import { observer } from '@formily/reactive-react';

import { useSchemaItems } from '../hooks/use-schema-items';

export interface DataItemsProps {
  value?: any[];
  data?: any[],
  name?: string
}

export const DataItems = observer((props: DataItemsProps) => {
  const { value, data, name } = props;
  const curItems = useSchemaItems();
  if (curItems.length < 1) {
    return null;
  };
  return <>
    {(data ?? value)?.map((r, i) => {
      const curItem = curItems[(curItems.length + i) % curItems.length] ?? curItems[0];
      return (
        <RecordScope key={i} getRecord={() => r ?? {}} getIndex={() => i ?? 0}>
          <RecursionField schema={curItem} name={name ? `${name}.${i}` : i} onlyRenderProperties />
        </RecordScope>
      );
    })}
  </>;
});
