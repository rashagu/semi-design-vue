# semi-design-vue

> 基于`semi-design`的`Vue3`适配


# 🔥 Install

```sh
# with npm
npm install @lousum/semi-ui-vue
npm install @lousum/semi-icons-vue

# with yarn
yarn add @douyinfe/semi-ui-vue
yarn add @douyinfe/semi-icons-vue

```

# 👍 Usage

Here is a quick example to get you started, it's all you need:

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


