import { observer } from '@formily/reactive-react';
import { Tag, Space } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

export interface KeyToValProps {
  value?: string | number | Array<string | number>,
  options?: { [key: string]: string | number },
  color?: string,
  colors?: { [key: string]: string },
  isTag?: boolean
  split?: ReactNode,
  splitKey?: string
}

export const KeyToVal = observer((props: KeyToValProps) => {
  const { value = '', splitKey = ',' } = props;
  const newVal = typeof value === 'string' && value.indexOf(splitKey) > 0 ? value.split(splitKey) : value;
  if (Array.isArray(newVal)) {
    return <ArrKeyToVal {...props} value={newVal} />;
  }
  return <StrKeyToVal {...props} value={newVal} />;
});

const StrKeyToVal = observer((props: Omit<KeyToValProps, 'value'> & { value: string | number }) => {
  const { value, options = {}, colors = {}, isTag = false, color = 'blue' } = props;
  const [newColor, setNewColor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    isTag && setNewColor(String(colors?.[value] ?? color));
  }, [color, colors, isTag, value]);

  useEffect(() => {
    setText(String(options?.[value] ?? value ?? ''));
  }, [options, value]);

  if (!text) {
    return null;
  }

  if (!isTag) {
    return <>{text}</>;
  }

  return (<Tag color={newColor}>{text}</Tag>);
});

const ArrKeyToVal = observer((props: Omit<KeyToValProps, 'value'> & { value: Array<string | number> }) => {
  const { value, isTag = false, split } = props;
  return (
    <Space split={split ?? isTag ? null : ','} wrap>
      {value.map((val, i) => <StrKeyToVal {...props} key={i} value={val} />)}
    </Space >
  );
});

