import { LangStore } from '@yimoko/store';
import { useMemo } from 'react';

export const zhCN = {
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  edit: '编辑',
  add: '添加',
  save: '保存',
  search: '搜索',
  reset: '重置',
  loading: '加载中...',
  noData: '暂无数据',
  noMoreData: '没有更多数据了',
};

export const langStore: LangStore<typeof zhCN> = new LangStore(zhCN);

export const useLang = (keys?: string | string[]) => useMemo(
  () => [langStore.getLang(keys), langStore.loading],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [langStore.lang, langStore.loading],
);
