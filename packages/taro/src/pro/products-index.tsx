import { Skeleton, Sidebar, SidebarItem, Card } from '@antmjs/vantui';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer } from '@formily/react';
import { ScrollView, ScrollViewProps, View } from '@tarojs/components';
import Taro, { NodesRef } from '@tarojs/taro';
import { useStore, judgeIsSuccess, judgeIsEmpty, IStore, IStoreConfig } from '@yimoko/store';
import { useState, useMemo, useEffect } from 'react';

import { getNode, getScroll, getRect, getAllRect } from '../adapter/dom';
import { ResponseError } from '../out/response-error';
import { debounce } from '../tools/debounce';

export interface ProductsIndexProps extends ScrollViewProps {
  locateSidebarDiffTop?: number
  skeleton?: Omit<SkeletonProps, 'loading'>
  store: IStore | IStoreConfig
}

export const ProductsIndex = observer((props: ProductsIndexProps) => {
  const { store, skeleton, ...args } = props;
  const curStore = useStore<any, any[]>(store);
  const { loading, response, runAPI } = curStore;
  const { data } = response;

  if (loading) {
    return <Skeleton row={20} {...skeleton} loading={loading} />;
  }

  if (!judgeIsSuccess(response)) {
    return <ResponseError loading={loading} response={response} onAgain={() => runAPI()} />;
  }

  if (judgeIsEmpty(data)) {
    return <div>暂无数据</div>;
  }

  return <ProductsIndexContent store={curStore} {...args} />;
});

interface ProductsIndexContentProps extends Omit<ProductsIndexProps, 'store' | 'skeleton'> {
  store: IStore<any, any[]>
}

const ProductsIndexContent = observer((props: ProductsIndexContentProps) => {
  const { store, locateSidebarDiffTop = 60, ...args } = props;
  const [id] = useState(() => `c-${Math.random()}`.replace('.', ''));
  const [scrollClient, setScrollClient] = useState<Partial<Taro.IntersectionObserver.IntersectionRectResult>>({});
  const [barValue, setBarValue] = useState(0);

  const { loading, response, runAPI } = store;
  const { data } = response;

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

  const getSiderBarItemID = (itemID: string) => `${id}-s-${itemID}`;
  const getCardItemID = (barItemID: string, itemID: string) => `${id}-${barItemID}-${itemID}`;

  const adjustSidebar = (activeRect: NodesRef.BoundingClientRectCallbackResult) => {
    const { top = 0, bottom = 0 } = scrollClient;
    const topDiff = activeRect.top - top;
    const runDiff = (diff: number) => {
      const sID = `#${id} .c-sidebar`;
      getNode(sID).then(node => node && getScroll(sID).then(rect => rect && node.scrollTo({ top: rect.scrollTop + diff })));
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

  const toProducts = (sItem: Record<string, any>) => {
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
              scroll && node?.scrollTo({ top: Math.min(max, Math.max(0, scrollTop + (rect.top - top))) });
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
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={() => {
          runAPI();
        }}
        onScroll={() => scroll(barValue, toSidebar)}
      >
        {data?.map(item => item.products?.map((p: Record<string, any>, i: Number) => (
          <Card price='' key={p?.id ?? i} {...p} id={getCardItemID(item.id, p.id)} />
        )))}
      </ScrollView>
    </View>
  );
});
