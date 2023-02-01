# semi-design-vue

> 基于`semi-design`的`Vue3`适配

[![NPM][npm-badge]][npm-url] [![CI][ci-badge]][ci-url] [![LICENSE][license-badge]][license-url] [![codecov](https://codecov.io/gh/rashagu/semi-design-vue/branch/master/graph/badge.svg?token=MOL39F8RO4)](https://codecov.io/gh/rashagu/semi-design-vue)


[npm-badge]: https://img.shields.io/npm/v/@kousum/semi-ui-vue.svg
[npm-url]: https://www.npmjs.com/package/@kousum/semi-ui-vue

[license-badge]: https://img.shields.io/npm/l/@kousum/semi-ui-vue
[license-url]: https://github.com/rashagu/semi-design-vue/blob/dev/LICENSE

[ci-badge]: https://github.com/rashagu/semi-design-vue/workflows/publish/badge.svg?branch=master&event=push
[ci-url]: https://github.com/rashagu/semi-design-vue/actions?query=branch%3Amaster+event%3Apush



# 🔥 安装

```sh
# with npm
npm install @kousum/semi-ui-vue
npm install @kousum/semi-icons-vue

# with yarn
yarn add @kousum/semi-ui-vue
yarn add @kousum/semi-icons-vue

```

# 👍 使用

```vue
#Component.vue
<script setup>
import { Button } from "@kousum/semi-ui-vue"
</script>

<template>
  <div>
    <Button>hello word</Button>
  </div>
</template>
```


# 💖 Thanks

<div>
<a href="https://jb.gg/OpenSourceSupport" style="color:inherit"><img style="width: 70px;" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg" alt="JetBrains Logo (Main) logo."></a>
</div>

Thanks to [JetBrains](https://jb.gg/OpenSourceSupport) for providing Open Source development license(s).



# 开发
1. 使用`typescript`,`changeSets`
2. `node: >= 16`


### 安装依赖
> `pnpm install`

### 打包
> `pnpm build:lib`

### 运行
> `pnpm dev`

### 运行 storybook
> `pnpm storybook`



## TODO
 
- [ ] bug fix & 单元测试覆盖
- [ ] Vue版的文档（也可以直接参考 [官方文档](https://semi.design/zh-CN/)）



