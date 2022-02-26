# semi-design-vue

> 基于`semi-design`的`Vue3`适配


[![NPM][npm-badge]][npm-url]  [![LICENSE][license-badge]][license-url] [![codecov](https://codecov.io/gh/rashagu/semi-design-vue/branch/dev/graph/badge.svg?token=MOL39F8RO4)](https://codecov.io/gh/rashagu/semi-design-vue)


[npm-badge]: https://img.shields.io/npm/v/@kousum/semi-ui-vue.svg
[npm-url]: https://www.npmjs.com/package/@kousum/semi-ui-vue

[license-badge]: https://img.shields.io/npm/l/@kousum/semi-ui-vue
[license-url]: https://github.com/@kousum/semi-ui-vue/blob/main/LICENSE


# 🔥 安装

```sh
# with npm
npm install @lousum/semi-ui-vue
npm install @lousum/semi-icons-vue

# with yarn
yarn add @douyinfe/semi-ui-vue
yarn add @douyinfe/semi-icons-vue

```

# 👍 使用

```jsx
#main.js
import '@kousum/semi-ui-vue/lib/_base/base.css'
```
```vue
#Component.vue
<script setup>
import Button from "@kousum/semi-ui-vue"
</script>

<template>
  <div>
    <Button>hello word</Button>
  </div>
</template>
```


### 开发
1. 需要同时掌握vue3(vue tsx)与react的开发知识.
2. 使用`typescript`,`lerna`

### 安装lerna
> `pnpm add --global lerna`

### 安装依赖
> `lerna bootstrap --hoist`

### 运行
> `lerna run --scope @kousum/semi-ui-vue dev`


### lerna
> `lerna publish`
> 
> `lerna add @kousum/semi-icons-vue --scope=@kousum/semi-ui-vue`

> `lerna add @kousum/semi-animation-vue --scope=@kousum/semi-ui-vue`

> `lerna add @douyinfe/semi-foundation --scope=@kousum/semi-ui-vue`


