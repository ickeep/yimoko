import Taro from '@tarojs/taro';
import { Component } from 'react';

import './app.less';

class App extends Component {
  componentDidMount() {
    Taro.addInterceptor((chain) => {
      const { requestParams } = chain;
      const { url } = requestParams;
      requestParams.url = /^[\w]+:\/\//.test(url) ? url : `http://127.0.0.1:9527${url}`;
      return chain.proceed(requestParams);
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}
export default App;
