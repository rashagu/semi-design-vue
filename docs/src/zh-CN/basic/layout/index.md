---
localeCode: zh-CN
order: 16
category: 基础
title: Layout 布局
icon: doc-layout
dir: column
brief: 用于快捷划分页面整体布局
---
<script setup>
import { useData } from 'vitepress';




const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });
const { site, theme, page, frontmatter } = useData()
</script>
# {{page.title}}

{{page.frontmatter.brief}}

## 概述

-   `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
-   `Header`：顶部布局，其下可嵌套任何元素，只能放在 `Layout` 中。
-   `Sider`：侧边栏，其下可嵌套任何元素，只能放在 `Layout` 中。
-   `Content`：内容部分，其下可嵌套任何元素，只能放在 `Layout` 中。
-   `Footer`：底部布局，其下可嵌套任何元素，只能放在 `Layout` 中。

<Notice title='注意事项'>
1、布局组件采用 Flex 布局实现，无法在非现代浏览器中工作  <br/>
2、Layout 组件仅会帮你实现布局，但不会附带背景色、文本色、宽高度等样式。你可以根据自己实际需求传入 style 或给定特定 className 另行编写css实现
</Notice>


## 代码演示

### 如何引入

```jsx import
import { Layout } from '@kousum/semi-ui-vue';
```

##### 三行布局

<div style="width: 100%;height: 1300px;">
<LiveCode layout="vertical" :files="{'src/ThreeRows.vue':modules['./demo/ThreeRows.vue']}"/>
</div>

### 左侧边栏布局

<div style="width: 100%;height: 1300px;">
<LiveCode layout="vertical" :files="{'src/LeftSide.vue':modules['./demo/LeftSide.vue']}"/>
</div>


### 右侧边栏布局

<div style="width: 100%;height: 1400px;">
<LiveCode layout="vertical" :files="{'src/RightSide.vue':modules['./demo/RightSide.vue']}"/>
</div>

### 侧边栏布局

<div style="width: 100%;height: 1400px;">
<LiveCode layout="vertical" :files="{'src/SimpleLeftSide.vue':modules['./demo/SimpleLeftSide.vue']}"/>
</div>

### 响应式布局

侧边栏预设了六个响应尺寸：`xs`、`sm`、`md`、`lg`、`xl`、`xxl`。可以通过设置 `breakpoint` 属性设置断点，通过 `onBreakpoint` 调用回调函数。

<div style="width: 100%;height: 1400px;">
<LiveCode layout="vertical" :files="{'src/ReactLayout.vue':modules['./demo/ReactLayout.vue']}"/>
</div>

## 布局示例

### 顶部导航布局

<div style="width: 100%;height: 1400px;">
<LiveCode layout="vertical" :files="{'src/TopSide.vue':modules['./demo/TopSide.vue']}"/>
</div>

### 顶部导航-侧边布局

<div style="width: 100%;height: 1440px;">
<LiveCode layout="vertical" :files="{'src/TopLeftSide.vue':modules['./demo/TopLeftSide.vue']}"/>
</div>

### 侧边导航

<div style="width: 100%;height: 1440px;">
<LiveCode layout="vertical" :files="{'src/LeftNavSide.vue':modules['./demo/LeftNavSide.vue']}"/>
</div>

## API 参考

### Layout

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

| 属性      | 说明                                                               | 类型    | 默认值 |
| --------- | ------------------------------------------------------------------ | ------- | ------ |
| className | 类名                                                               | string  | -      |
| hasSider  | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | -      |
| style     | 样式                                                               | CSSProperties  | -      |
| aria-label | [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) 属性，用来给当前元素加上的标签描述, 提升可访问性 >=2.3.0 | string | - |
| role | [role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) 属性, 提升可访问性 >=2.3.0 | string | - |

### Layout.Sider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的断点，可选值'xs', 'sm', 'md', 'lg', 'xl', 'xxl' | string[] | - |
| className | 类名 | string | - |
| style | 样式 | CSSProperties | - |
| onBreakpoint | 触发响应式布局断点时的回调 | (screen: string, broken: bool) => void | - |
| aria-label | [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)属性，用来给当前元素加上的标签描述, 提升可访问性 >=2.3.0 | string | - |
| role | [role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)属性, 提升可访问性 >=2.3.0  | string | - |

### responsive map

```text
{
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
};
```

## Accessibility

### ARIA

- Sider 可传入 aria-label props，描述该 Sider 作用。
- Header Content Main Footer 可传入 role aria-label 描述对应元素作用。



