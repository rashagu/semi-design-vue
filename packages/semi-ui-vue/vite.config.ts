import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "~@douyinfe/semi-theme-default/scss/global.scss";
          @import "~@douyinfe/semi-theme-default/scss/index.scss";
        `,
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      name: 'semiVue',
      // fileName: (format) => `semi-design-vue.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        '@kousum/semi-icons-vue',
        '@kousum/semi-animation-vue',
        '@kousum/semi-illustrations-vue',
        '@kousum/vue3-window',
        '@douyinfe/semi-foundation',
        '@douyinfe/semi-theme-default'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'semi-icons-vue': '@kousum/semi-icons-vue',
          'semi-animation-vue': '@kousum/semi-animation-vue',
          'semi-illustrations-vue': '@kousum/semi-illustrations-vue',
          'vue3-window': '@kousum/vue3-window',
          'semi-foundation': '@douyinfe/semi-foundation',
          'semi-theme-default': '@douyinfe/semi-theme-default'
        }
      }
    }
  },
  plugins: [
    vue(),

    // @ts-ignore
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  resolve: {
    alias: [
      {find: /^~/, replacement: ''},
      {find: '@kousum/semi-icons-vue', replacement: path.resolve('../semi-icons-vue/index')},
      {find: '@kousum/semi-animation-vue', replacement: path.resolve('../semi-animation-vue/index')},
      {find: '@kousum/semi-illustrations-vue', replacement: path.resolve('../semi-illustrations-vue/index')}
    ]
  }
});
