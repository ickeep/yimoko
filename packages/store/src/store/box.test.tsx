import { observer } from '@formily/reactive-react';
import { screen, render, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

import { BaseStore } from './base';
import { BoxContentProvider, BoxContentRender, BoxStore, useBoxBindContentStore, useBoxContent, useBoxStore } from './box';

describe('BoxStore', () => {
  test('store', () => {
    const store = new BoxStore();
    expect(store).toBeInstanceOf(BoxStore);
    expect(store.isOpen).toBeUndefined();
    expect(store.contentStore).toBeUndefined();

    store.setOpen(true);
    expect(store.isOpen).toBeTruthy();

    store.setOpen(false);
    expect(store.isOpen).toBeFalsy();

    const contentStore = new BaseStore();
    store.setContentStore(contentStore);
    expect(store.contentStore).toBe(contentStore);

    expect(store.onClose).toBeUndefined();
    expect(store.onOpen).toBeUndefined();

    const onClose = jest.fn();
    const onOpen = jest.fn();
    const store2 = new BoxStore({ onClose, onOpen, isOpen: false });
    expect(store2.isOpen).toBeFalsy();
    expect(store2.onClose).toBe(onClose);
    expect(store2.onOpen).toBe(onOpen);

    store2.openUp();
    expect(store2.isOpen).toBeTruthy();
    expect(onOpen).toBeCalledTimes(1);

    store2.close();
    expect(store2.isOpen).toBeFalsy();
    expect(onClose).toBeCalledTimes(1);
  });

  test('useBoxStore', () => {
    const { result, rerender } = renderHook((config: any) => useBoxStore(config));
    const store = result.current;
    expect(store).toBeInstanceOf(BoxStore);
    expect(store.isOpen).toBeUndefined();
    expect(store.contentStore).toBeUndefined();

    rerender({ isOpen: true });
    expect(store.isOpen).toBeTruthy();

    const onClose = jest.fn();
    const onOpen = jest.fn();
    rerender({ onClose, onOpen, isOpen: false });
    expect(store.isOpen).toBeFalsy();
    expect(store.onClose).toBe(onClose);
    expect(store.onOpen).toBe(onOpen);

    store.openUp();
    expect(store.isOpen).toBeTruthy();
    expect(onOpen).toBeCalledTimes(1);

    store.close();
    expect(store.isOpen).toBeFalsy();
    expect(onClose).toBeCalledTimes(1);
  });

  test('useBoxBindContentStore', () => {
    const contentStore = new BaseStore({ defaultValues: { name: 'name' } });
    const { result: { current: boxStore } } = renderHook((config: any) => useBoxStore(config));
    expect(boxStore.contentStore).toBeUndefined();

    const { rerender } = renderHook((isBind: any) => useBoxBindContentStore(contentStore, isBind));
    expect(boxStore.contentStore).toBeUndefined();
    rerender(true);
    // contentStore 不挂载到 defaultBoxStore 上
    expect(boxStore.contentStore).toBeUndefined();

    const customRender = (ui: ReactNode, boxStore: BoxStore) => render(<BoxContentProvider value={boxStore}>{ui}</BoxContentProvider>);

    const Name = observer(() => {
      useBoxBindContentStore(contentStore, true);
      const boxStore = useBoxContent();
      return <div>{boxStore.contentStore?.values.name}</div>;
    });

    customRender(<Name />, boxStore);
    expect(boxStore.contentStore).toBe(contentStore);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  test('BoxContentRender', () => {
    render(<BoxContentRender />);
    expect(document.querySelector('body')?.textContent).toBe('');

    render(<BoxContentRender isBind />);
    expect(document.querySelector('body')?.textContent).toBe('');


    const C = (props: any) => <div>{Object.keys(props).join(',')}</div>;
    const Content = (props: any) => <div>{`${props.isBoxContent ? 'true' : 'false'}`}</div>;

    const { rerender } = render(<BoxContentRender isBind  ><C /></BoxContentRender>);
    expect(document.querySelector('body')?.textContent).toBe('onClose,isBoxContent');

    rerender(<BoxContentRender isBind={false}><C /></BoxContentRender>);
    expect(document.querySelector('body')?.textContent).toBe('');

    rerender(<BoxContentRender isBind={false}><Content /></BoxContentRender>);
    expect(screen.getByText('false')).toBeInTheDocument();

    rerender(<BoxContentRender   ><Content /></BoxContentRender>);
    expect(screen.getByText('true')).toBeInTheDocument();

    rerender(<BoxContentRender content={<C />} />);
    expect(document.querySelector('body')?.textContent).toBe('onClose,isBoxContent');

    rerender(<BoxContentRender isBind={false} content={<C />} />);
    expect(document.querySelector('body')?.textContent).toBe('');


    rerender(<BoxContentRender content={<Content />} />);
    expect(screen.getByText('true')).toBeInTheDocument();

    rerender(<BoxContentRender isBind={false} content={<Content />} />);
    expect(screen.getByText('false')).toBeInTheDocument();

    rerender(<BoxContentRender content={C} />);
    expect(document.querySelector('body')?.textContent).toBe('onClose,isBoxContent');

    rerender(<BoxContentRender isBind={false} content={C} />);
    expect(document.querySelector('body')?.textContent).toBe('');

    rerender(<BoxContentRender content={Content} />);
    expect(screen.getByText('true')).toBeInTheDocument();

    rerender(<BoxContentRender isBind={false} content={Content} />);
    expect(screen.getByText('false')).toBeInTheDocument();
  });
});


