import { RecordScope, RecursionField, RecordsScope, observer, useExpressionScope } from '@formily/react';
import { dataToOptions, IKeys, IStore, judgeIsEmpty, ListStore, useDeepMemo, useSchemaItems } from '@yimoko/store';
import { Table as TTable, TableProps as TTableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { get } from 'lodash-es';
import moment from 'moment';
import { DataIndex, RenderExpandIconProps } from 'rc-table/lib/interface';
import { cloneElement, isValidElement, ReactNode, useMemo, useState } from 'react';

import { Icon, IconProps } from './icon';

// 表格增强
// 自动筛选 自动排序 自动宽度

type IExpandableIcon = string | ReactNode | IconProps;

export interface TableProps<T extends object = Record<string, any>> extends Omit<TTableProps<T>, 'columns' | 'expandable'> {
  value?: TTableProps<T>['dataSource'];
  defaultColumnsWidth?: number; // 自动计算 scroll.x 时的默认列宽
  columns?: IColumns<T> | string[]
  store?: ListStore<any, T[]>
  isUserItems?: boolean;
  expandable?: TTableProps<T>['expandable'] & {
    isTitleControlsAll?: boolean;
    icon?: {
      expanded: IExpandableIcon;
      collapsed: IExpandableIcon;
    }
  };
}

export const Table: <T extends object = Record<string, any>>(props: TableProps<T>) => React.ReactElement | null = observer((props) => {
  const { defaultColumnsWidth, scroll, value, columns, dataSource, store, isUserItems = true, expandable, rowKey = 'id', ...args } = props;
  const scope = useExpressionScope() ?? {};
  const curStore = store ?? scope.curStore as ListStore<any, any>;
  const { listData } = curStore ?? {};

  const curDataSource = useMemo(() => {
    const val = !judgeIsEmpty(dataSource) ? dataSource : (value ?? listData);
    return Array.isArray(val) ? val : [];
  }, [listData, dataSource, value]) as any[];

  const curColumns = useTableColumns<any>(columns, curStore, curDataSource, isUserItems);
  const curScroll = useTableScroll(scroll, curColumns, defaultColumnsWidth);

  const curExpandable = useExpandable(expandable, listData, rowKey);

  return (
    <RecordsScope getRecords={() => curDataSource}>
      <TTable size='small' {...args} expandable={curExpandable} rowKey={rowKey} scroll={curScroll} columns={curColumns} dataSource={curDataSource} />
    </RecordsScope>
  );
});

// eslint-disable-next-line max-len
const getTitle = (field?: string | number, store?: IStore, title?: any): string => title ?? store?.fieldsConfig?.[`${field}`]?.title ?? `${field ?? ''}`;

export const useColumnsForSchema = () => {
  const items = useSchemaItems();
  return useMemo(() => {
    const tmpColumns: IColumns = [];
    items.forEach((item) => {
      const { name, 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': colProps, ...colSchema } = item;
      const field = name;
      const col: IColumns[number] = { dataIndex: field, ...colProps };
      if (component) {
        col.render = (v, r, i) => (
          <RecordScope getRecord={() => r ?? {}} getIndex={() => i ?? 0}>
            <RecursionField schema={{ ...colSchema, name, 'x-component': component }} name={`${i}.${field}`} />
          </RecordScope>
        );
      }
      tmpColumns.push(col);
    });
    return tmpColumns;
  }, [items]);
};

export const dataIndexToKey = (dataIndex?: DataIndex) => (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex) as string | number;

export const judgeIsAutoFilter = (column: IColumnType<any>) => {
  const { autoFilter, onFilter, filters } = column;
  return autoFilter && !onFilter && !filters;
};

// eslint-disable-next-line complexity
const getAutoFilterProps = (column: IColumnType<any>, filtersMap: Record<string, ColumnFilterItem[]>, store?: IStore) => {
  const props: Pick<IColumnType<any>, 'filters' | 'onFilter'> = {};
  const { dataIndex, isFilterContains, filterSplitter = ',', filteredValue, filterKeys } = column;
  if (dataIndex && judgeIsAutoFilter(column)) {
    const key = dataIndexToKey(column.dataIndex);
    const dictFilters = dataToOptions(get(store?.dict, key), { text: 'label', value: 'value', ...filterKeys }, filterSplitter);
    const filters = !judgeIsEmpty(dictFilters) ? dictFilters : filtersMap[key];
    if (!judgeIsEmpty(filters)) {
      props.filters = filters;
      typeof filteredValue === 'undefined' && (props.onFilter = (value: any, record: any) => {
        const val = get(record, key);
        if (isFilterContains) {
          if (typeof val === 'string') {
            return val.split(filterSplitter).includes(value);
          }
          return Array.isArray(val) && val.includes(value);
        }
        return val === value;
      });
    }
  }
  return props;
};

const getAutoSorter = (column: IColumnType<any>) => {
  const { dataIndex, sorter, autoSorter, sorterParams } = column;
  if (sorter) {
    return sorter;
  }
  if (!autoSorter) {
    return undefined;
  }
  const fnMap: Record<Required<IColumnType>['autoSorter'], (a: any, b: any) => number> = {
    number: (a, b) => Number(a) - Number(b),
    string: (a, b) => (sorterParams ? a?.localeCompare(b, ...(Array.isArray(sorterParams) ? sorterParams : [sorterParams])) : a?.localeCompare(b)),
    percentage: (a, b) => Number(a.replace('%', '')) - Number(b.replace('%', '')),
    date: (a, b) => (moment(a).isBefore(b) ? -1 : 1),
    time: (a, b) => (moment(`2022-01-01 ${a}`).isBefore(`2022-01-01 ${b}`) ? -1 : 1),
    length: (a, b) => a?.length - b?.length,
  };
  return (a: any, b: any) => {
    const valA = get(a, dataIndexToKey(dataIndex));
    const valB = get(b, dataIndexToKey(dataIndex));
    return fnMap[autoSorter]?.(valA, valB);
  };
};

export const useTableColumns = <T extends object = Record<string, any>>(
  columns: IColumns<T> | string[] = [],
  store?: IStore,
  data?: T[],
  isUserItems = false,
) => {
  const itemsColumns = useColumnsForSchema() as IColumns<T>;
  const mixColumns = useMemo(() => {
    const arr = isUserItems ? [...columns, ...itemsColumns] : columns;
    // eslint-disable-next-line complexity
    const handleItem = (item: IColumn<T> | string) => {
      if (typeof item === 'string') {
        if (store?.fieldsConfig?.[item]?.column) {
          return { ...store?.fieldsConfig?.[item]?.column, dataIndex: item };
        }
        return item;
      }
      if (typeof item === 'object') {
        if ('dataIndex' in item) {
          const { dataIndex } = item;
          if (dataIndex) {
            return { ...store?.fieldsConfig?.[dataIndexToKey(dataIndex)]?.column, ...item };
          }
        }
        if ('children' in item) {
          item.children?.map(handleItem);
        }
      }
      return item;
    };
    return arr.map(handleItem);
  }, [columns, isUserItems, itemsColumns, store?.fieldsConfig]);

  const filterConfigs = useMemo(() => {
    const arr: IAutoFilterConfig[] = [];
    // eslint-disable-next-line complexity
    const handle = (column: IColumn<T> | string) => {
      if (typeof column === 'object') {
        if ('dataIndex' in column) {
          const { dataIndex = '', autoFilter, isFilterContains, filterSplitter } = column;
          if (judgeIsAutoFilter(column) && !get(store?.dict, dataIndexToKey(dataIndex))) {
            arr.push({ dataIndex, autoFilter, isFilterContains, filterSplitter });
          }
        } else if ('children' in column) {
          column.children?.forEach(item => handle(item));
        }
      }
    };
    mixColumns.forEach((item => handle(item)));
    return arr;
  }, [mixColumns, store?.dict]);

  const filtersMap = useDeepMemo(() => {
    const obj: Record<string, ColumnFilterItem[]> = {};
    const hash: Record<string, Record<string, boolean>> = {};
    if (judgeIsEmpty(filterConfigs)) {
      return obj;
    }
    filterConfigs.forEach((field) => {
      const key = dataIndexToKey(field.dataIndex);
      obj[key] = [];
      hash[key] = {};
    });

    data?.forEach((item) => {
      // eslint-disable-next-line complexity
      filterConfigs.forEach((field) => {
        const { dataIndex, isFilterContains, filterSplitter = ',' } = field;
        const key = dataIndexToKey(dataIndex);
        const val = get(item, key);
        if (!judgeIsEmpty(val)) {
          if (isFilterContains) {
            let arr: any[];
            if (typeof val === 'string') {
              arr = val.split(filterSplitter);
            } else {
              arr = Array.isArray(val) ? val : [];
            }
            arr.forEach((v) => {
              if (!hash[key][v]) {
                hash[key][v] = true;
                obj[key].push({ text: v, value: v });
              }
            });
          } else if (!hash[key][val]) {
            obj[key].push({ text: val, value: val });
            hash[key][val] = true;
          }
        }
      });
    });
    return obj;
  }, [data, filterConfigs]);

  return useMemo(() => {
    const getAutoColumn = (column: IColumn<T> | string): IColumn<T> => {
      const col = typeof column === 'string' ? { dataIndex: column } : column;
      if ('dataIndex' in col) {
        col.title = getTitle(dataIndexToKey(col.dataIndex), store, col.title);
        const { isFilterContains, autoFilter, autoSorter, filterKeys, ...args } = col;
        return { ...args, ...getAutoFilterProps(col, filtersMap, store), sorter: getAutoSorter(col) };
      }
      if ('children' in col) {
        return { ...col, children: col.children?.map(item => getAutoColumn(item)) };
      }
      return col;
    };
    return mixColumns.map(getAutoColumn);
  }, [filtersMap, mixColumns, store]);
};

export const useTableScroll = (scroll: TTableProps<any>['scroll'], columns: TTableProps<any>['columns'], defaultColumnsWidth = 120) => useMemo(() => {
  if (scroll?.x) {
    return scroll;
  }
  let width = 0;
  columns?.forEach(col => width += (Number(col.width ?? defaultColumnsWidth)));
  return {
    ...scroll,
    x: width,
  };
}, [columns, defaultColumnsWidth, scroll]);

// 增加展开  全部展开收起 自定义图标
const useExpandable = (
  expandable: TableProps<any>['expandable'],
  listData: any[],
  rowKey: Required<TableProps<any>>['rowKey'],
): TTableProps<any>['expandable'] => {
  const [localExpandedRowKeys, setLocalExpandedRowKeys] = useState<React.Key[]>([]);
  const { isTitleControlsAll, icon, columnTitle, expandedRowKeys, onExpandedRowsChange, expandIcon, ...args } = expandable ?? {};
  const curExpandedRowKeys = useMemo(() => expandedRowKeys ?? localExpandedRowKeys, [expandedRowKeys, localExpandedRowKeys]);

  const RenderIcon = ({ name, ...args }: { name: IExpandableIcon, [key: string]: any }) => {
    if (typeof name === 'string') {
      return <Icon name={name} {...args} />;
    }
    if (isValidElement(name)) {
      return cloneElement(name, args);
    }
    if (typeof name === 'object' && name) {
      // @ts-ignore
      return <Icon {...name} {...args} />;
    }
    return null;
  };

  const curColumnTitle = useMemo(() => {
    if (columnTitle) {
      return columnTitle;
    }
    if (!isTitleControlsAll) {
      return undefined;
    }
    const isAllExpand = curExpandedRowKeys.length > 0 && listData?.length === curExpandedRowKeys.length;
    const collapsed = () => (expandedRowKeys ? onExpandedRowsChange?.([]) : setLocalExpandedRowKeys([]));
    const expand = () => {
      const keys = listData?.map((item, i) => (typeof rowKey === 'function' ? rowKey(item, i) : get(item, rowKey))) ?? [];
      if (expandedRowKeys) {
        onExpandedRowsChange?.(keys);
      } else {
        setLocalExpandedRowKeys(keys);
      }
    };
    const RenderAll = ({ isAllExpand }: { isAllExpand: boolean }) => {
      const [name, onClick, state] = isAllExpand ? [icon?.collapsed, collapsed, 'expanded'] : [icon?.expanded, expand, 'collapsed'];
      if (!name) {
        const baseClass = 'ant-table-row-expand-icon';
        return <button onClick={onClick} type="button" className={`${baseClass} ${baseClass}-${state}`} />;
      }
      return <RenderIcon name={name} onClick={onClick} />;
    };

    return <RenderAll isAllExpand={isAllExpand} />;
  }, [columnTitle, isTitleControlsAll, curExpandedRowKeys.length, listData, icon, expandedRowKeys, onExpandedRowsChange, rowKey]);

  const curExpandIcon = useMemo(() => {
    if (expandIcon) {
      return expandIcon;
    }
    if (!icon) {
      return undefined;
    }
    return ({ expanded, onExpand, record }: RenderExpandIconProps<any>) => (
      <RenderIcon name={expanded ? icon?.collapsed : icon?.expanded} onClick={(e: any) => onExpand(record, e)} />
    );
  }, [expandIcon, icon]);

  const curOnExpandedRowsChange = useMemo(() => {
    if (expandedRowKeys) {
      return onExpandedRowsChange;
    }
    return (expandedKeys: readonly React.Key[]) => {
      onExpandedRowsChange?.(expandedKeys);
      setLocalExpandedRowKeys([...expandedKeys]);
    };
  }, [onExpandedRowsChange, expandedRowKeys]);

  return {
    ...args,
    expandedRowKeys: curExpandedRowKeys,
    onExpandedRowsChange: curOnExpandedRowsChange,
    columnTitle: curColumnTitle,
    expandIcon: curExpandIcon,
  };
};


export type IColumnType<T extends object = Record<string, any>> = ColumnType<T> & {
  autoFilter?: boolean;
  isFilterContains?: boolean,
  filterSplitter?: string
  // 取 store dict 时 使用 filterKeys 进行转换
  filterKeys?: IKeys<'text' | 'value'>;

  // 非受控模式下自动排序
  autoSorter?: 'number' | 'string' | 'percentage' | 'date' | 'time' | 'length';
  sorterParams?: 'zh' | any;
};
export interface IColumnGroupType<T extends object = Record<string, any>> extends Omit<ColumnType<T>, 'dataIndex'> {
  children: IColumns<T>;
}

export type IColumn<T extends object = Record<string, any>> = IColumnType<T> | IColumnGroupType<T>;

export type IColumns<T extends object = Record<string, any>> = IColumn<T>[];

export type IAutoFilterConfig = Pick<IColumnType, 'isFilterContains' | 'filterSplitter' | 'autoFilter'> & { 'dataIndex': DataIndex };
