# semi-design-vue

> 基于`semi-design`的`Vue3`适配

[![NPM][npm-badge]][npm-url] [![CI][ci-badge]][ci-url] [![LICENSE][license-badge]][license-url] [![codecov](https://codecov.io/gh/rashagu/semi-design-vue/branch/dev/graph/badge.svg?token=MOL39F8RO4)](https://codecov.io/gh/rashagu/semi-design-vue)


[npm-badge]: https://img.shields.io/npm/v/@kousum/semi-ui-vue.svg
[npm-url]: https://www.npmjs.com/package/@kousum/semi-ui-vue

[license-badge]: https://img.shields.io/npm/l/@kousum/semi-ui-vue
[license-url]: https://github.com/rashagu/semi-design-vue/blob/dev/LICENSE

[ci-badge]: https://github.com/rashagu/semi-design-vue/workflows/test/badge.svg?branch=dev&event=push
[ci-url]: https://github.com/rashagu/semi-design-vue/actions?query=branch%3Adev+event%3Apush



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
import Button from "@kousum/semi-ui-vue"
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
1. 需要同时掌握vue3(vue tsx)与react的开发知识.
2. 使用`typescript`,`lerna`
3. `node: last version`


### 安装依赖
> `pnpm install`

### 运行
> `pnpm dev`



# TODO

### 基础

- [x] Grid
- [x] Icon
- [x] Layout
- [ ] Tokens
- [x] Space
- [x] Typography

### 输入类

- [x] AutoComplete
- [x] Button
- [x] Cascader 5f0912f
- [x] Checkbox 5f0912f
- [ ] DatePicker
- [ ] Form
- [x] Input
- [ ] InputNumber
- [x] Radio
- [ ] Rating
- [x] Select
- [ ] Slider
- [ ] Switch
- [x] TagInput 5f0912f
- [ ] TimePicker
- [ ] TreeSelect
- [ ] Upload

### 导航类

- [ ] Anchor
- [ ] BackTop
- [ ] Breadcrumb
- [ ] Navigation
- [ ] Pagination
- [ ] Steps
- [ ] Tabs
- [ ] Tree

### 展示类

- [x] Avatar
- [ ] Badge
- [ ] Calendar
- [ ] Card
- [ ] Collapse
- [ ] Collapsible
- [ ] Descriptions
- [x] Dropdown
- [x] Empty
- [ ] List
- [ ] Modal
- [ ] OverflowList
- [x] Popover
- [x] ScrollList
- [ ] SideSheet
- [ ] Table
- [x] Tag
- [ ] Timeline
- [x] Tooltip

### 反馈类

- [ ] Banner
- [ ] Notification
- [ ] Popconfirm
- [ ] Progress
- [ ] Skeleton
- [x] Spin
- [ ] Toast

### 其他

- [ ] ConfigProvider
- [ ] LocaleProvider



