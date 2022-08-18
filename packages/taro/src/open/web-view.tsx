import { observer } from '@formily/react';
import { WebView as TWebView, WebViewProps as TWebViewProps } from '@tarojs/components';

// todo 常用处理 取参 刷新
export interface WebViewProps extends TWebViewProps {
  onChange?: (v: string) => void
}

export const WebView = observer((props: WebViewProps) => {
  const { onChange, ...args } = props;

  return <TWebView {...args} ></TWebView>;
});
