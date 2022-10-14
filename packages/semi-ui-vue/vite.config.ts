import {defineConfig, build} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888
  },
  build:{
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      name: 'SemiUiVue',
      // the proper extensions will be added
      fileName: 'semi-ui-vue'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "@douyinfe/semi-foundation",
        "@douyinfe/semi-theme-default",
        "@douyinfe/semi-animation",
        "@kousum/semi-animation-vue",
        "@kousum/semi-icons-vue",
        "@kousum/semi-illustrations-vue",
        "@kousum/vue3-window",
        "async-validator",
        "classnames",
        "copy-text-to-clipboard",
        "date-fns",
        "date-fns-tz",
        "lodash",
        "@kousum/resize-observer-polyfill",
        "sass",
        "scroll-into-view-if-needed",
        "utility-types",
        "pinyin-pro",
        "vue",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
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
