import { createSelectorQuery, NodesRef } from '@tarojs/taro';

export function getRect(selector: string, context?: any): Promise<null | NodesRef.BoundingClientRectCallbackResult> {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .select(selector)
      .boundingClientRect()
      .exec((rect: any = []) => resolve(rect[0]));
  });
}

export function getAllRect(selector: string, context?: any): Promise<null | NodesRef.BoundingClientRectCallbackResult[]> {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}


export function getNode(selector: string, context?: any): Promise<null | NodesRef.NodeCallbackResult['node']> {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .select(selector)
      .node()
      .exec((rect = []) => resolve(rect[0].node));
  });
};
export function getScroll(selector: string, context?: any): Promise<null | NodesRef.ScrollOffsetCallbackResult> {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .select(selector)
      .scrollOffset()
      .exec((rect = []) => resolve(rect[0]));
  });
};
