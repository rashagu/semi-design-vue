---
localeCode: zh-CN
order: 13
category: 基础
title:  Grid 栅格
icon: doc-grid
dir: column
brief: 24 栅格系统。
---
<script setup>
import { useData } from 'vitepress';
import LiveCode from '../../../LiveCode.vue';
import DesignToken from '../../../DesignToken.vue';


const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });
const { site, theme, page, frontmatter } = useData()
</script>
# {{page.title}}

{{page.frontmatter.brief}}

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。

## 弹性布局

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 `order` 来定义元素的排列顺序。

## 代码演示

## 如何引入

```jsx import
import { Col, Row } from '@douyinfe/semi-ui';
```

## 基础使用

从堆叠到水平排列。

使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有 Col 必须放在 Row 内。

<div style="width: 100%;height: 600px;">
<LiveCode layout="vertical" :files="{'src/GridBase.vue':modules['./demo/GridBase.vue']}"/>
</div>

## Gutter 间隔

栅格常常需要和间隔进行配合，你可以使用 Row 的 `gutter` 属性，我们推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)

垂直间隔可以使用数组形式，数组第一项为横向间隔，第二项为垂直间隔。  

如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`  

**从`1.11.0`版本起支持数组形式的垂直间隔**

深色为内容物区域，浅色为间隔

<div style="width: 100%;height: 800px;">
<LiveCode layout="vertical" :files="{'src/GutterInterval.vue':modules['./demo/GutterInterval.vue']}"/>
</div>
```

## Offset 偏移


<div style="width: 100%;height: 500px;">
<LiveCode layout="vertical" :files="{'src/Offset.vue':modules['./demo/Offset.vue']}"/>
</div>

## Flex 布局

使用 `row-flex` 定义 Flex 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。


<div style="width: 100%;height: 1000px;">
<LiveCode layout="vertical" :files="{'src/Flex.vue':modules['./demo/Flex.vue']}"/>
</div>

## Flex 子元素垂直对齐

<div style="width: 100%;height: 500px;">
<LiveCode layout="vertical" :files="{'src/FlexJustify.vue':modules['./demo/FlexJustify.vue']}"/>
</div>

## Flex 元素排序

通过 Flex 布局的 Order 来改变元素的排序。

<div style="width: 100%;height: 500px;">
<LiveCode layout="vertical" :files="{'src/FlexOder.vue':modules['./demo/FlexOder.vue']}"/>
</div>

## 响应式

参照 Bootstrap 的 响应式设计，预设六个响应尺寸：`xs`, `sm`, `md`, `lg`, `xl`, `xxl`。

<div style="width: 100%;height: 500px;">
<LiveCode layout="vertical" :files="{'src/FlexReact.vue':modules['./demo/FlexReact.vue']}"/>
</div>

## API 参考

## Row

| 属性  | 说明  | 类型  | 默认值  |
| -- | -- | -- | -- |
| align   | flex 布局下的垂直对齐方式：`top` `middle` `bottom`  | string  | |
| className | 类名 | string| |
| gutter  | 栅格间隔，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`<br />**从1.11.0版本起支持垂直间隔**  | number\|object\|Array<number\|object> | |
| justify | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | string  | `start` |
| style | 自定义样式 | CSSProperties | |
| type  | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效  | string   |  |

## Col

| 属性   | 说明  | 类型 | 默认值 |
| ---- | ----| ---- | ---- |
| lg     | `≥992px` 响应式栅格，可为栅格数或对象配置  | number\|object | - |
| md     | `≥768px` 响应式栅格，可为栅格数或对象配置  | number\|object | - |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | 0 |
| order  | 栅格顺序，`flex` 布局模式下有效  | number | 0 |
| pull   | 栅格向左移动格数 | number | 0 |
| push   | 栅格向右移动格数 | number | 0 |
| sm     | `≥575px` 响应式栅格，可为栅格数或对象配置  | number\|object | - |
| span   | 栅格占位格数，为 0 时相当于 `display: none` | number | -      |
| xl     | `≥1200px` 响应式栅格，可为栅格数或对象配置 | number\|object | - |
| xs     | `<576px` 响应式栅格，可为栅格数或对象配置  | number\|object | - |
| xxl    | `≥1600px` 响应式栅格，可为栅格数或对象配置 | number\|object | - |

## 设计变量

<DesignToken :title="page.title"/>
