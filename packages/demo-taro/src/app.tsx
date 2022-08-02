import Taro from '@tarojs/taro';

import { createSchemaField } from '@formily/react';
import { APIExecutorProvider, SchemaComponentsProvider, SchemaFieldProvider } from '@yimoko/store';
import { httpRequest } from '@yimoko/taro';
import { Component } from 'react';

import './app.less';
import { componentsMap } from './components';

const apiHost = 'http://localhost:9527';


const SchemaField = createSchemaField({ components: componentsMap });

class App extends Component<any, any> {
  componentDidMount() {
    Taro.addInterceptor((chain) => {
      const { requestParams } = chain;
      const { url } = requestParams;
      if (process.env.TARO_ENV !== 'h5' || process.env.NODE_ENV !== 'development') {
        requestParams.url = /^[\w]+:\/\//.test(url) ? url : apiHost + url;
      }
      return chain.proceed(requestParams);
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <APIExecutorProvider value={httpRequest}>
        <SchemaComponentsProvider value={componentsMap}>
          <SchemaFieldProvider value={SchemaField}>
            {this.props.children}
          </SchemaFieldProvider>
        </SchemaComponentsProvider>
      </APIExecutorProvider >);
  }
}

export default App;
