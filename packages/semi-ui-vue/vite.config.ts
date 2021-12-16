import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "~@douyinfe/semi-theme-default/scss/_font.scss";
          @import "~@douyinfe/semi-theme-default/scss/_palette.scss";
          @import "~@douyinfe/semi-theme-default/scss/global.scss";
          @import "~@douyinfe/semi-theme-default/scss/index.scss";
        `,
      }
    }
  },
  plugins: [
    vue(),

    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  resolve: {
    alias: [
      {find: /^~/, replacement: ''},
    ]
  }
})
