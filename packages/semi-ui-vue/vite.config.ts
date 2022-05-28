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
