import { BaseEventOrig, Picker as TPicker, PickerMultiSelectorProps } from '@tarojs/components';

import { IOptionsAPIProps, judgeIsEmpty, useAPIOptions } from '@yimoko/store';
import { useEffect, useState } from 'react';

import { TextProps } from '../base/text';

import { PickerLabel, PickerWp } from './picker';

const defaultKeys = {
  value: 'value',
  child: 'child',
  label: 'label',
};

export type PickerMultiProps = Omit<TextProps, 'value'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => void
  value?: any
  clearable?: boolean
  labelSplitter?: string
};

export const PickerMulti = (props: PickerMultiProps) => {
  const { options, api, keys, splitter, onChange, value, clearable, labelSplitter = '/', ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);

  const [curColumns, setCurColumns] = useState<any[]>([]);
  const [curIndexs, setCurIndexs] = useState<any[]>([]);
  const [curLabel, setCurLabel] = useState<any>();

  useEffect(() => {
    const columnArr: any[] = [data];
    const indexs: any[] = [];
    const labelArr: any[] = [];
    // eslint-disable-next-line complexity
    const getFindIndex = (colsData: Record<string, any>[], level = 0) => colsData.findIndex((item, i) => {
      const { child } = item;
      if (!judgeIsEmpty(child)) {
        const index = getFindIndex(child, level + 1);
        if (index !== -1) {
          columnArr[level] = colsData;
          indexs[level] = i;
          labelArr[level] = item.label;
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
        labelArr[level] = item.label;
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
    setCurLabel(labelArr.join(labelSplitter));
  }, [data, labelSplitter, value]);

  return (
    <PickerWp onChange={onChange} value={curLabel} clearable={clearable} >
      <TPicker className='y-picker' rangeKey="label" mode="multiSelector" value={curIndexs} range={curColumns}
        // eslint-disable-next-line complexity
        onColumnChange={(e) => {
          const { value, column } = e.detail;
          // 滚动空项
          const { child } = curColumns?.[column]?.[value] ?? {};
          if (!judgeIsEmpty(child)) {
            const newColumns = [...curColumns];
            newColumns[column + 1] = child;
            const newIndexs = [...curIndexs];
            newIndexs[column] = value;
            newIndexs[column + 1] = 0;
            for (let i = column + 2; i < curColumns.length; i += 1) {
              const curChild = newColumns[i - 1]?.[0]?.child;
              newColumns[i] = curChild;
              newIndexs[i] = judgeIsEmpty(curChild) ? -1 : 0;
            }
            setCurColumns(newColumns);
            setCurIndexs(newIndexs);
          }
        }}
        onChange={(e) => {
          const { value } = e.detail;
          onChange?.(curColumns[curColumns.length - 1][value[value.length - 1]]?.value, e);
        }} >
        <PickerLabel {...args} value={curLabel} />
      </TPicker>
    </PickerWp>
  );
};

