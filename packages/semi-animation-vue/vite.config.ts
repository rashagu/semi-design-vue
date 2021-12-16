import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/packages/icons",
      name: 'MyLib',
      formats: ['es', 'umd', 'cjs','iife'],
      // fileName: ((format) => format),
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: 'Vue'
        // }
      }
    }
  },
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
