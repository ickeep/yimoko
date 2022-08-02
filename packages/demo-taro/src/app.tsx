import Taro from '@tarojs/taro';

import { APIExecutorProvider } from '@yimoko/store';
import { httpRequest } from '@yimoko/taro';

import { Component } from 'react';

import './app.less';

class App extends Component<any, any> {
  componentDidMount() {
    Taro.addInterceptor((chain) => {
      const { requestParams } = chain;
      const { url } = requestParams;
      // requestParams.url = /^[\w]+:\/\//.test(url) ? url : `http://localhost:9527${url}`;

      return chain.proceed({ mode: 'cors', ...requestParams });
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      //
      <APIExecutorProvider value={httpRequest}>
        {/* <SchemaComponentsProvider value={componentsMap}> */}
        {this.props.children}
        {/* </SchemaComponentsProvider> */}
      </APIExecutorProvider>);
  }
}

export default App;
