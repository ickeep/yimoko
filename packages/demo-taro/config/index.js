/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line import/no-commonjs
// const path = require('path');

const config = {
  alias: {
    // react: path.resolve(__dirname, '../../..', 'node_modules/react'),
    // '@tarojs/taro': path.resolve(__dirname, '../../..', 'node_modules/@tarojs/taro'),
    // '@tarojs/components': path.resolve(__dirname, '../../..', 'node_modules/@tarojs/components'),
    // '@antmjs/vantui': path.resolve(__dirname, '../../..', 'node_modules/@antmjs/vantui'),
    // '@formily/core': path.resolve(__dirname, '../../..', 'node_modules/@formily/core'),
    // '@formily/react': path.resolve(__dirname, '../../..', 'node_modules/@formily/react'),
    // '@formily/reactive': path.resolve(__dirname, '../../..', 'node_modules/@formily/reactive'),
    // '@formily/reactive-react': path.resolve(__dirname, '../../..', 'node_modules/@formily/reactive-react'),
  },
  projectName: 'demo-taro',
  date: '2022-8-2',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: [/@antmjs[\\/]vantui/],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse('"http://localhost:9527"'),
          changeOrigin: true,
        },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
