# vite-plugin-semi-theme

- [theme options docs](https://github.com/DouyinFE/semi-design/tree/main/packages/semi-webpack#api)
- support `vite > 5.0` `pnpm`

```js
// vite.config.js
import SemiTheme from "@kousum/vite-plugin-semi-theme";

export default {
  plugins: [
    SemiTheme({
      // name: '@douyinfe/semi-theme-default'
      theme: '@semi-bot/semi-theme-nky'
    })
  ],
}
```
