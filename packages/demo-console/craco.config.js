/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const { getPlugin, pluginByName } = require('@craco/craco/lib/webpack-plugins');

const externals = {
  react: 'React',
  'react-is': 'ReactIs',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  antd: 'antd',
  '@ant-design/icons': 'icons',
  moment: 'moment',
  axios: 'axios',
  'lodash-es': '_',
  '@formily/path': 'Formily.Path',
  '@formily/shared': 'Formily.Shared',
  '@formily/reactive': 'Formily.Reactive',
  '@formily/validator': 'Formily.Validator',
  '@formily/core': 'Formily.Core',
  '@formily/reactive-react': 'Formily.ReactiveReact',
  '@formily/react': 'Formily.React',
  '@formily/antd': 'Formily.Antd',
  '@formily/json-schema': 'Formily.JSONSchema',
};

const cdn = {
  devCSS: [
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.variable.css',
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.variable.css.map',

    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/antd.css',
    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/antd.css.map',
  ],
  prodCSS: [
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.variable.min.css',
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.variable.min.css.map',

    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/antd.css',
    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/antd.css.map',
  ],
  devJS: [
    'https://cdn.jsdelivr.net/npm/react@18.1.0/umd/react.development.min.js',
    'https://cdn.jsdelivr.net/npm/react-is@18.1.0/umd/react-is.development.min.js',
    'https://cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.development.min.js',

    'https://cdn.jsdelivr.net/npm/react-router-dom@6.3.0/umd/react-router-dom.development.js',
    'https://cdn.jsdelivr.net/npm/react-router-dom@6.3.0/umd/react-router-dom.development.js.map',

    'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.js',

    'https://cdn.jsdelivr.net/npm/moment@2.29.3/min/moment.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.29.3/min/moment.min.js.map',

    'https://cdn.jsdelivr.net/npm/moment@2.29.3/locale/zh-cn.js',

    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.js',
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.js.map',

    'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.js',
    'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.map',

    'https://cdn.jsdelivr.net/npm/@formily/path@2.1.4/dist/formily.path.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/path@2.1.4/dist/formily.path.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/shared@2.1.4/dist/formily.shared.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/shared@2.1.4/dist/formily.shared.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/reactive@2.1.4/dist/formily.reactive.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/reactive@2.1.4/dist/formily.reactive.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/validator@2.1.4/dist/formily.validator.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/validator@2.1.4/dist/formily.validator.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/core@2.1.4/dist/formily.core.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/core@2.1.4/dist/formily.core.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/reactive-react@2.1.4/dist/formily.reactive-react.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/reactive-react@2.1.4/dist/formily.reactive-react.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/react@2.1.4/dist/formily.react.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/react@2.1.4/dist/formily.react.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/json-schema@2.1.4/dist/formily.json-schema.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/json-schema@2.1.4/dist/formily.json-schema.umd.development.js.map',

    'https://cdn.jsdelivr.net/npm/@ant-design/icons@4.7.0/dist/index.umd.js',

    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/formily.antd.umd.development.js',
    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/formily.antd.umd.development.js.map',
  ],

  prodJS: [
    'https://cdn.jsdelivr.net/npm/react@18.1.0/umd/react.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-is@18.1.0/umd/react-is.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.production.min.js',

    'https://cdn.jsdelivr.net/npm/react-router-dom@6.3.0/umd/react-router-dom.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-router-dom@6.3.0/umd/react-router-dom.production.min.js.map',

    'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',

    'https://cdn.jsdelivr.net/npm/moment@2.29.3/min/moment.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.29.3/min/moment.min.js.map',

    'https://cdn.jsdelivr.net/npm/moment@2.29.3/locale/zh-cn.js',

    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.min.js',
    'https://cdn.jsdelivr.net/npm/antd@4.21.0/dist/antd.min.js.map',

    'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.map',

    'https://cdn.jsdelivr.net/npm/@formily/path@2.1.4/dist/formily.path.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/path@2.1.4/dist/formily.path.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/shared@2.1.4/dist/formily.shared.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/shared@2.1.4/dist/formily.shared.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/reactive@2.1.4/dist/formily.reactive.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/reactive@2.1.4/dist/formily.reactive.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/validator@2.1.4/dist/formily.validator.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/validator@2.1.4/dist/formily.validator.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/core@2.1.4/dist/formily.core.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/core@2.1.4/dist/formily.core.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/reactive-react@2.1.4/dist/formily.reactive-react.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/reactive-react@2.1.4/dist/formily.reactive-react.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/react@2.1.4/dist/formily.react.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/react@2.1.4/dist/formily.react.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@formily/json-schema@2.1.4/dist/formily.json-schema.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/json-schema@2.1.4/dist/formily.json-schema.umd.production.js.map',

    'https://cdn.jsdelivr.net/npm/@ant-design/icons@4.7.0/dist/index.umd.min.js',

    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/formily.antd.umd.production.js',
    'https://cdn.jsdelivr.net/npm/@formily/antd@2.1.4/dist/formily.antd.umd.production.js.map',
  ],
};

module.exports = {
  cdn,
  webpack: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
      '@/tests': path.resolve(__dirname, './tests'),
      // 解决 Context 值指向不一致的问题
      '@yimoko/store': path.resolve(__dirname, '../store'),
    },

    configure: (webpackConfig) => {
      const newConf = webpackConfig;
      newConf.resolve.plugins.pop();
      const tsRule = newConf.module.rules[1].oneOf[2];
      tsRule.include = undefined;
      tsRule.exclude = /node_modules/;

      newConf.externals = externals;
      if (process.env.NODE_ENV === 'production') {
        // newConf.output.publicPath = 'https://merchant-rsstu-1251135819.file.myqcloud.com/';
      }
      const { optimization } = newConf;
      delete optimization.splitChunks;
      delete optimization.runtimeChunk;
      newConf.optimization = optimization;
      const { match: htmlWebpackPlugin } = getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin'));
      const filter = str => !/.map$/.test(str);
      const host = 'npm.ickeep.com';
      const changeHost = str => str.replace(/:\/\/(cdn.jsdelivr.net\/npm|unpkg.com)\//, `://${host}/`).replace(/@(\d+)/, '/$1');
      if (process.env.NODE_ENV === 'development') {
        htmlWebpackPlugin.userOptions.cdnCSS = cdn.devCSS.filter(filter).map(changeHost);
        htmlWebpackPlugin.userOptions.cdnJS = cdn.devJS.filter(filter).map(changeHost);
      } else {
        htmlWebpackPlugin.userOptions.cdnCSS = cdn.prodCSS.filter(filter).map(changeHost);
        htmlWebpackPlugin.userOptions.cdnJS = cdn.prodJS.filter(filter).map(changeHost);
      }
      return webpackConfig;
    },
  },
};
