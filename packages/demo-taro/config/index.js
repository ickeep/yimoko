/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const config = {
  alias: {
    react: path.resolve(__dirname, '../../..', 'node_modules/react'),
    '@taroify/core': path.resolve(__dirname, '../../..', 'node_modules/@taroify/core'),
    '@taroify/icons': path.resolve(__dirname, '../../..', 'node_modules/@taroify/icons'),
    '@formily/core': path.resolve(__dirname, '../../..', 'node_modules/@formily/core'),
    '@formily/react': path.resolve(__dirname, '../../..', 'node_modules/@formily/react'),
    '@formily/reactive': path.resolve(__dirname, '../../..', 'node_modules/@formily/reactive'),
    '@formily/reactive-react': path.resolve(__dirname, '../../..', 'node_modules/@formily/reactive-react'),
  },
  projectName: 'taro',
  date: '2022-5-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    '@tarojs/plugin-mock',
    // 'taro-plugin-compiler-optimization',
    // [
    //   'import',
    //   {
    //     libraryName: '@taroify/core',
    //     libraryDirectory: '',
    //     style: true,
    //   },
    //   '@taroify/core',
    // ],
    // [
    //   'import',
    //   {
    //     libraryName: '@taroify/icons',
    //     libraryDirectory: '',
    //     camel2DashComponentName: false,
    //     style: () => '@taroify/icons/style',
    //   },
    //   '@taroify/icons',
    // ],
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  framework: 'react',
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
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
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
  rn: {
    appName: 'taro',
    output: {
      ios: './ios/main.jsbundle',
      iosAssetsDest: './ios',
      android: './android/app/src/main/assets/index.android.bundle',
      androidAssetsDest: './android/app/src/main/res',
      // iosSourceMapUrl: '',
      iosSourcemapOutput: './ios/main.map',
      // iosSourcemapSourcesRoot: '',
      // androidSourceMapUrl: '',
      androidSourcemapOutput: './android/app/src/main/assets/index.android.map',
      // androidSourcemapSourcesRoot: '',
    },
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
