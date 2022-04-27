/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const CracoLessPlugin = require('craco-less');

const  externals = {
  react: { amd: 'React', var: 'React', root: 'React', commonjs2: 'react', commonjs: 'react' },
  'react-dom': { amd: 'ReactDOM', var: 'ReactDOM', root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom' },
  'react-router-dom': { amd: 'ReactRouterDOM', var: 'ReactRouterDOM', root: 'ReactRouterDOM', commonjs2: 'react-router-dom', commonjs: 'react-router-dom' },
  antd: 'antd',
  moment: 'moment',
  axios: 'axios',
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
