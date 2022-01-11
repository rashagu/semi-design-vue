# semi-ui-vue

> install
> 
> `yarn add @kousum/semi-ui-vue`

定制主题：[https://semi.design/dsm/](https://semi.design/dsm/)
```ts
//vite 配置 主题
//
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@douyinfe/semi-theme-default/scss/global.scss";
          @import "@douyinfe/semi-theme-default/scss/index.scss";
        `,
      }
    }
  },
  plugins: [vue()],
})

```
