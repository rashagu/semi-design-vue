---
localeCode: zh-CN
order: 19
category: 基础
title:  Space 间距
icon: doc-space
brief: 设置组件之间的间距。
---
<script setup>
import { useData } from 'vitepress';




const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });
const { site, theme, page, frontmatter } = useData()
</script>
# {{page.title}}

{{page.frontmatter.brief}}

### 基本用法

<div style="width: 100%;height: 300px;">
<LiveCode :files="{'src/base.vue':modules['./demo/base.vue']}"/>
</div>

### 对齐方式

可使用 `align` 设置对齐方式，可选值：`start`、`center`（默认）、`end`、`baseline`。

<div style="width: 100%;height: 500px;">
<LiveCode :files="{'src/alignDemo.vue':modules['./demo/alignDemo.vue']}"/>
</div>

### 间距尺寸

可使用 `spacing` 设置间距大小，内置可选值：`tight`（8px，默认）、`medium`（16px）、`loose`（24px），并且支持传入 number 来自定义间距大小，也支持传入 array 来同时设置水平和垂直方向的间距。

<div style="width: 100%;height: 500px;">
<LiveCode :files="{'src/spacingDemo.vue':modules['./demo/spacingDemo.vue']}"/>
</div>

### 间距方向

可使用 `vertical` 设置间距是否为垂直方向，默认情况下为 false。

<div style="width: 100%;height: 300px;">
<LiveCode :files="{'src/verticalDemo.vue':modules['./demo/verticalDemo.vue']}"/>
</div>


### 设置换行

当间距为水平方向时，可使用 `wrap` 设置是否自动换行，默认情况下为 false。

<div style="width: 100%;height: 300px;">
<LiveCode :files="{'src/wrapDemo.vue':modules['./demo/wrapDemo.vue']}"/>
</div>

## API参考

|属性|说明|类型|默认值|版本|
|-|-|-|-|-|
|align|对齐方式, 支持 `start`、`end`、`center`、`baseline`|string|`center`|>=1.17.0|
|className|样式类名|string|-|>=1.17.0|
|spacing|间距尺寸, 支持 `loose`、`medium`、`tight` 或 number、array|string\|number\|array|`tight`|>=1.17.0|
|style|内联样式|CSSProperties|-|>=1.17.0|
|vertical|是否为垂直间距|boolean|false|>=1.17.0|
|wrap|是否自动换行|boolean|false|>=1.17.0|

## 设计变量
<DesignToken/>
