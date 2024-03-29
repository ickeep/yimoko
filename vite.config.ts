import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: !process.env.VITE_WATCH,
    target: process.env.VITE_WATCH ? 'modules' : 'es2015',
    lib: {
      formats: ['cjs', 'es', 'umd'],
      entry: path.resolve(__dirname, `packages/${process.env.VITE_LIB}/src/index.ts`),
      name: `Yimoko${process.env.VITE_LIB?.replace(process.env.VITE_LIB[0], process.env.VITE_LIB[0].toUpperCase())}`,
      fileName: format => `yimoko-${process.env.VITE_LIB}.${format}.js`,
    },
    watch: process.env.VITE_WATCH ? { buildDelay: 100 } : null,
    outDir: path.resolve(__dirname, `packages/${process.env.VITE_LIB}/dist`),
    rollupOptions: {
      external: [
        'react',
        'react-is',
        'react-dom',
        'history',
        'react-router',
        'react-router-dom',
        'lodash-es',
        'moment',
        'axios',
        'classnames',
        '@ant-design/icons',
        'antd',
        '@antmjs/vantui',
        '@formily/core',
        '@formily/reactive',
        '@formily/react',
        '@formily/antd',
        '@tarojs/taro',
        '@tarojs/components',
        '@yimoko/store',
      ],
      output: {
        globals: {
          react: 'React',
          'react-is': 'ReactIs',
          'react-dom': 'ReactDOM',
          history: 'HistoryLibrary',
          'react-router': 'ReactRouter',
          'react-router-dom': 'ReactRouterDOM',
          antd: 'antd',
          '@ant-design/icons': 'icons',
          moment: 'moment',
          axios: 'axios',
          classnames: 'classNames',
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
          '@tarojs/taro': 'taro',
          '@tarojs/components': 'taroComponents',

          '@yimoko/store': 'YimokoStore',
        },
      },
    },
  },
  plugins: [
    react({ fastRefresh: process.env.NODE_ENV !== 'test', jsxRuntime: 'classic' }),
    dts({
      entryRoot: path.resolve(__dirname, `packages/${process.env.VITE_LIB}/src`),
      outputDir: path.resolve(__dirname, `packages/${process.env.VITE_LIB}/types`),
    }),
  ],
});

