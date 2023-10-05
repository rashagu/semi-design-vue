// .vitepress/theme/index.js

// You can directly import Vue files in the theme entry
// VitePress is pre-configured with @vitejs/plugin-vue.
import DefaultTheme from 'vitepress/theme'
//@ts-ignore
import myTheme from './layout'

export default {
  // ...DefaultTheme,
  ...myTheme
}
