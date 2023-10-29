---
category: 开始
title: Getting Started 快速开始
subTitle: 快速开始
outline: deep
localeCode: zh-CN
icon: doc-gettingstarted
order: 2
---

<script setup>
import { useData } from 'vitepress';
import DesignToken from '../../../DesignToken.vue';



const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## 1、安装 Semi

```bash
# 使用 npm
npm i @kousum/semi-ui-vue

# 使用 yarn
yarn add @kousum/semi-ui-vue

# 使用 pnpm
pnpm add @kousum/semi-ui-vue
```

## 2、使用组件

在 Webpack、create-react-app 或 Vite 项目中使用时，无需进行任何编译项配置，直接使用即可。构建时所有相关资源均会按需打包。

```vue
<script setup>
  import { Button } from "@kousum/semi-ui-vue"
</script>

<template>
  <div>
    <Button>hello word</Button>
  </div>
</template>
```

> 推荐在项目中引入 [reset.css](https://www.npmjs.com/package/reset-css)，它可以重置浏览器自带的默认样式，避免不同UA之间的样式差异。

