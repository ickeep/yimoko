import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/' + process.env.VITE_LIB + '/src/index.ts'),
      name: 'Yimoko' + process.env.VITE_LIB?.replace(process.env.VITE_LIB[0], process.env.VITE_LIB[0].toUpperCase()),
      fileName: format => `yimoko-${process.env.VITE_LIB}.${format}.js`,
    },
    outDir: path.resolve(__dirname, 'packages/' + process.env.VITE_LIB + '/dist'),
    rollupOptions: {
      external: [
        'react',
        'react-is',
        'react-dom',
        'react-router-dom',
        'lodash-es',
        'moment',
        'axios',
        'antd',
        '@formily/core',
        '@formily/reactive',
        '@formily/react',
        '@formily/antd',
        "@yimoko/store"
      ],
      output: {
        globals: {
          react: 'React',
          'react-is': 'ReactIs',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          antd: 'antd',
          moment: 'moment',
          axios: 'axios',
          'lodash-es': '_',
          '@formily/reactive-react': 'Formily.ReactiveReact',
          '@formily/reactive': 'Formily.Reactive',
          '@formily/path': 'Formily.Path',
          '@formily/shared': 'Formily.Shared',
          '@formily/validator': 'Formily.Validator',
          '@formily/core': 'Formily.Core',
          '@formily/json-schema': 'Formily.JSONSchema',
          '@formily/react': 'Formily.React',

          "@yimoko/store": "YimokoStore",
        },
      },
    },
  },
  // @ts-ignore
  plugins: [react(), dts({ outputDir: path.resolve(__dirname, 'packages/' + process.env.VITE_LIB + '/types') })],
});

