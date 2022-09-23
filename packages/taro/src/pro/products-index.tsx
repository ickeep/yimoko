import { Skeleton, Sidebar, SidebarItem, Card } from '@antmjs/vantui';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer } from '@formily/react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import Taro, { NodesRef } from '@tarojs/taro';
import { useStore, judgeIsSuccess, judgeIsEmpty, IStore, IStoreConfig, dataToOptions, IOptions } from '@yimoko/store';
import { useState, useMemo, useEffect, useCallback, Key } from 'react';

import { getNode, getScroll, getRect, getAllRect } from '../adapter/dom';
import { sidebarDefaultKeys } from '../nav/sidebar';
import { cardDefaultKeys } from '../out/card';
import { ResponseError } from '../out/response-error';
import { debounce } from '../tools/debounce';
import { handleClick } from '../tools/handle-click';

const defaultKeys = {
  ...sidebarDefaultKeys,
  id: 'id',
  products: 'products',
};

const productsDefaultKeys = {
  ...cardDefaultKeys,
  id: 'id',
};

export interface ProductsIndexProps extends ScrollViewProps {
  value?: any[];
  data?: any[];
  locateSidebarDiffTop?: number
  skeleton?: Omit<SkeletonProps, 'loading'>
  store?: IStore | IStoreConfig
  scrollConf?: {
    velocity?: number
    duration?: number
    animated?: boolean
  }
  keys?: Partial<typeof defaultKeys>
  productsKeys?: Partial<typeof productsDefaultKeys>
  itemURLPrefix?: string
  itemDefault?: Record<Key, any>
}

export const ProductsIndex = observer((props: ProductsIndexProps) => {
  const { store, skeleton, keys, productsKeys, data, value, refresherEnabled, refresherTriggered, onRefresherRefresh, ...args } = props;
  const curStore = useStore<any, any[]>(store ?? {});
  const { response, loading, runAPI } = curStore;

  const curData = useMemo(() => {
    const arr = curStore?.response?.data ?? data ?? value ?? [];
    return dataToOptions(arr, { ...defaultKeys, ...keys }).map(item => ({
      ...item,
      products: dataToOptions(item.products, { ...productsDefaultKeys, ...productsKeys }),
    }));
  }, [curStore?.response.data, data, keys, productsKeys, value]);

  const propsForStore = useMemo(() => ({
    refresherEnabled: refresherEnabled ?? !!store,
    refresherTriggered: refresherTriggered ?? loading,
  }), [loading, refresherEnabled, refresherTriggered, store]);

  const firstLoading = useMemo(() => loading && judgeIsEmpty(curData), [loading, curData]);

  if (firstLoading) {
    return <Skeleton row={20} {...skeleton} loading={loading} />;
  }

  if (!judgeIsSuccess(response)) {
    return <ResponseError loading={loading} response={curStore?.response} onAgain={() => runAPI()} />;
  }

  if (judgeIsEmpty(curData)) {
    return <View>暂无数据</View>;
  }

  return (
    <ProductsIndexContent {...args}
      {...propsForStore}
      onRefresherRefresh={(e) => {
        onRefresherRefresh?.(e);
        store && runAPI();
      }}
      data={curData} />
  );
});

interface ProductsIndexContentProps extends Omit<ProductsIndexProps, 'store' | 'skeleton' | 'value' | 'keys' | 'productsKeys' | 'data'> {
  data: Array<{
    id: string
    title: string
    products: IOptions<keyof typeof productsDefaultKeys>
  }>
};

const dfScrollConf = {
  velocity: 0.5,
  duration: 300,
  animated: true,
};

const ProductsIndexContent = observer((props: ProductsIndexContentProps) => {
  const { data, locateSidebarDiffTop = 60, scrollConf, itemURLPrefix, itemDefault, ...args } = props;
  const [id] = useState(() => `c-${Math.random()}`.replace('.', ''));
  const [scrollClient, setScrollClient] = useState<Partial<Taro.IntersectionObserver.IntersectionRectResult>>({});
  const [barValue, setBarValue] = useState(0);

  const curScrollConf = useMemo(() => ({ ...dfScrollConf, ...scrollConf }), [scrollConf]);

  const getSiderBarItemID = (itemID: string) => `${id}-s-${itemID}`;
  const getCardItemID = useCallback((barItemID: string, itemID: string) => `${id}-${barItemID}-${itemID}`, [id]);

  const curCards = useMemo(
    () => data?.map(item => item.products?.map((p: Record<Key, any>, i) => (
      <Card
        key={p?.id ?? i}
        price="" {...p}
        id={getCardItemID(item.id, p.id)}
        onClick={() => handleClick({ ...itemDefault, ...p }, itemURLPrefix, i)}
      />
    ))),
    [data, getCardItemID, itemDefault, itemURLPrefix],
  );

  useEffect(() => {
    let intersection: Taro.IntersectionObserver;
    Taro.nextTick(() => {
      intersection?.disconnect?.();
      // @ts-ignore
      intersection = Taro.createIntersectionObserver();
      intersection.relativeToViewport().observe(`#${id}`, res => setScrollClient(res.intersectionRect));
    });
    return () => {
      intersection?.disconnect?.();
    };
  }, [id]);

  const adjustSidebar = (activeRect: NodesRef.BoundingClientRectCallbackResult) => {
    const { top = 0, bottom = 0 } = scrollClient;
    const topDiff = activeRect.top - top;
    const runDiff = (diff: number) => {
      const sID = `#${id} .c-sidebar`;
      getNode(sID).then(node => node && getScroll(sID).then(rect => rect && node.scrollTo({ ...curScrollConf, top: rect.scrollTop + diff })));
    };
    if (topDiff < 0) {
      runDiff(topDiff);
    } else {
      const bottomDiff = activeRect.bottom - bottom;
      if (bottomDiff > 0) {
        runDiff(bottomDiff);
      }
    }
  };

  const toSidebar = (barID: string) => {
    const bIndex = data?.findIndex(item => `${item.id}` === barID);
    // todo 如果原本的 bar 有商品在可视区域内，则不需要调整
    setBarValue(bIndex ?? 0);
    getRect(`#${getSiderBarItemID(barID)}`).then(rect => rect && adjustSidebar(rect));
  };

  const toProducts = (sItem: Record<Key, any>) => {
    const pItem = sItem?.products?.[0];
    if (pItem) {
      const cID = getCardItemID(sItem.id, pItem.id);
      getRect(`#${cID}`).then((rect) => {
        const pID = `#${id} .c-products`;
        rect && getNode(pID).then((node) => {
          node && getScroll(pID).then((scroll) => {
            if (scroll) {
              const { top = 0, height = 0 } = scrollClient;
              // @ts-ignore 存在 scrollHeight
              const { scrollHeight, scrollTop } = scroll;
              const max = scrollHeight - height;
              scroll && node?.scrollTo({ ...curScrollConf, top: Math.min(max, Math.max(0, scrollTop + (rect.top - top))) });
            }
          });
        });
      });
    }
  };

  const scroll = useMemo(() => {
    const fn = (activeKey: number, toSidebar: Function) => {
      const { top = 0, bottom = 0 } = scrollClient;
      getAllRect(`#${id} .van-card`).then((cards) => {
        const getIsViewable = (card: NodesRef.BoundingClientRectCallbackResult) => {
          const curTop = card.top - top + locateSidebarDiffTop;
          const curBottom = card.bottom - bottom - locateSidebarDiffTop;
          return curTop > 0 && curBottom < 0;
        };
        const viewableCards: NodesRef.BoundingClientRectCallbackResult[] = [];
        const curSideId = data?.[activeKey]?.id;
        const curValueViewable = cards?.find((card) => {
          if (!getIsViewable(card)) {
            return false;
          }
          viewableCards.push(card);
          return card.id?.indexOf?.(`-${curSideId}-`) > -1;
        });
        if (!curValueViewable) {
          const topCard = viewableCards[0];
          topCard && toSidebar(topCard.id.split?.('-')?.[2]);
        }
      });
    };
    return debounce(fn, 100);
  }, [data, id, locateSidebarDiffTop, scrollClient]);

  return (
    <View className='y-products-index' id={id}>
      <ScrollView scrollY enhanced className='c-sidebar'>
        <Sidebar activeKey={barValue} onChange={e => setBarValue(e.detail ?? 0)} >
          {data?.map(item => <SidebarItem key={item.id} {...item} id={getSiderBarItemID(item.id)} onClick={() => toProducts(item)} />)}
        </Sidebar>
      </ScrollView>
      <ScrollView
        enhanced
        scrollY
        className='c-products'
        {...args}
        onScroll={() => scroll(barValue, toSidebar)}
      >
        {curCards}
      </ScrollView>
    </View>
  );
});
