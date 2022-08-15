// import { Picker as TPicker } from '@antmjs/vantui';
// import { PickerChangeEvents, PickerProps as TPickerProps } from '@antmjs/vantui/types/picker';
import { BaseEventOrig, Picker as TPicker, PickerMultiSelectorProps, PickerSelectorProps } from '@tarojs/components';

import { IOptionsAPIProps, judgeIsEmpty, useAPIOptions } from '@yimoko/store';
import { useEffect, useMemo, useState } from 'react';

import { Text } from '../base/text';

const defaultKeys = {
  value: 'value',
  child: 'child',
  label: 'label',
  disabled: 'disabled',
};

export type PickerProps = Omit<PickerSelectorProps, 'onChange' | 'type' | 'rangeKey'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<PickerSelectorProps.ChangeEventDetail>) => void
  value?: any
};

export const Picker = (props: PickerProps) => {
  const { options, api, keys, splitter, onChange, value, placeholder = '请选择', ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);

  const curIndex = useMemo(() => data.findIndex(item => item.value === value), [data, value]);
  const curLabel = useMemo(() => data.find(item => item.value === value)?.label, [data, value]);

  return (
    <TPicker rangeKey="label" value={curIndex} range={data} onChange={(e) => {
      // @ts-ignore
      const item = data[e.detail.value];
      onChange?.(item.value, e);
    }} >{curIndex > -1 ? <Text>{curLabel}</Text> : <Text >{placeholder}</Text>}</TPicker>
  );
};

export type PickerMultiProps = Omit<PickerMultiSelectorProps, 'onChange' | 'type' | 'rangeKey'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => void
  value?: any
};


export const PickerMulti = (props: PickerMultiProps) => {
  const { options, api, keys, splitter, onChange, value, placeholder = '请选择', ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);


  const [curColumns, setCurColumns] = useState<any[]>([]);
  const [curIndexs, setCurIndexs] = useState<any[]>([]);
  const [curLabel, setCurLabel] = useState<any>();

  useEffect(() => {
    const columnArr: any[] = [data];
    const indexs: any[] = [];
    let label: any;
    // eslint-disable-next-line complexity
    const getFindIndex = (colsData: Record<string, any>[], level = 0) => colsData.findIndex((item, i) => {
      const { child } = item;
      if (!judgeIsEmpty(child)) {
        const index = getFindIndex(child, level + 1);
        if (index !== -1) {
          columnArr[level] = colsData;
          indexs[level] = i;
          return true;
        }
        if (judgeIsEmpty(columnArr[level])) {
          columnArr[level] = [];
        }
        indexs[level] = -1;
        return false;
      }

      if (item.value === value) {
        columnArr[level] = colsData;
        indexs[level] = i;
        label = item.label;
        return true;
      }
      if (judgeIsEmpty(columnArr[level])) {
        columnArr[level] = [];
      }
      indexs[level] = -1;

      return false;
    });
    getFindIndex(data, 0);
    setCurColumns(columnArr);
    setCurIndexs(indexs);
    setCurLabel(label);
  }, [data, value]);

  console.log('curLabel', curLabel);


  return (
    <TPicker rangeKey="label" mode="multiSelector" value={curIndexs} range={curColumns}
      onColumnChange={(e) => {
        const { value, column } = e.detail;
        const { child } = curColumns[column][value];
        if (!judgeIsEmpty(child)) {
          const newColumns = [...curColumns];
          newColumns[column + 1] = child;
          setCurColumns(newColumns);
          const newIndexs = [...curIndexs];
          newIndexs[column] = value;
          newIndexs[column + 1] = 0;
          setCurIndexs(newIndexs);
        }
      }}
      onChange={(e) => {
        const { value } = e.detail;
        onChange?.(curColumns[curColumns.length - 1][value[value.length - 1]]?.value, e);
      }} >{curLabel !== undefined ? <Text>{curLabel}</Text> : <Text >{placeholder}</Text>}</TPicker>
  );
};
