/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const CracoLessPlugin = require('craco-less');

const  externals = {
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

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
      '@/tests': path.resolve(__dirname, './tests'),
    },

    configure: (webpackConfig) => {
      const newConf = webpackConfig;
      newConf.externals = externals;
      if (process.env.NODE_ENV === 'production') {
        // newConf.output.publicPath = 'https://merchant-rsstu-1251135819.file.myqcloud.com/';
      }
      const { optimization } = newConf;
      delete optimization.splitChunks;
      delete optimization.runtimeChunk;
      newConf.optimization = optimization;
      return webpackConfig;
    },
  },
};
