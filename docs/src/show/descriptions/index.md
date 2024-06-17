---
localeCode: zh-CN
order: 53
category: 展示类
title: Descriptions 描述列表
icon: doc-descriptions
dir: column
brief: 描述列表用于键值对的呈现。
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


## 代码演示

### 如何引入

```jsx import
import { Descriptions } from '@douyinfe/semi-ui';
```

### 基本用法

可以通过 `props.data` 以键值对 `{ key: value }` 数组方式传入数据  
key、value 均支持 ReactNode 类型，你可以传入字符串或更高自由度的 ReactNode 自由定制渲染效果

<div style="width: 100%;height: 500px;">
<LiveCode :files="{'src/baseDesc.vue':modules['./demo/baseDesc.vue']}"/>
</div>

### 设置对齐方式

可以通过设置 `align` 值选择对齐方式，支持 `center`, `justify`, `left`, 和 `plain`。默认对齐方式为 `center`  
当 row 为 true 时，该配置无效

<div style="width: 100%;height: 1250px;">
<LiveCode :files="{'src/alignDesc.vue':modules['./demo/alignDesc.vue']}"/>
</div>


### 子元素 写法

除了通过 props.data 声明数据外，还可以通过 children 写法声明数据
注意 `DescriptionItem` 应当是 `Description` 的直接子元素。

<div style="width: 100%;height: 450px;">
<LiveCode :files="{'src/childrenDesc.vue':modules['./demo/childrenDesc.vue']}"/>
</div>


### 设置布局模式

可以通过 `layout` 设置布局模式（v2.54.0 后支持）, 默认为 `vertical` 纵向布局 。

<div style="width: 100%;height: 450px;">
<LiveCode :files="{'src/verticalDesc.vue':modules['./demo/verticalDesc.vue']}"/>
</div>


横向布局可设置 layout为 `horizontal` 。当设置 horizontal 时，可配合 column 指定每行最大列数

<div style="width: 100%;height: 1450px;">
<LiveCode layout="vertical" :files="{'src/horizontalDesc.vue':modules['./demo/horizontalDesc.vue']}"/>
</div>


### 双行显示

可以通过设置 `row` 可选择双行显示，支持三种不同的大小：`small`, `medium`, `large`。默认大小为 `medium`，此时 align 配置不再生效

<div style="width: 100%;height: 650px;">
<LiveCode layout="vertical" :files="{'src/rowDesc.vue':modules['./demo/rowDesc.vue']}"/>
</div>

## API 参考

### Descriptions

| 属性      | 说明                                                             | 类型       | 默认值   |
| --------- | ---------------------------------------------------------------- | ---------- | -------- |
| align     | 描述列表的对齐方式，可选 `center`、 `justify`、 `left`、 `plain` | string     | `center` |
| className | 类名                                                             | string     | 无       |
| data      | 列表显示的内容                                                   | DataItem[] | 无       |
| row       | 是否双行显示                                                     | boolean    | `false`  |
| size      | 设置双行显示时的列表的大小，可选 `small`、 `medium`、 `large`    | string     | `medium` |
| style     | 列表的样式                                                       | CSSProperties     | 无       |
| layout    | 列表布局模式，可选 `vertical`、`horizontal`  **v>=2.54.0**          | string        | `vertical` |
| column    | `horizontal` 横向布局下，每行的总列数 **v>=2.54.0**                | number        | 3          |

### DataItem

| 属性   | 说明                             | 类型                        | 默认值 |
| ------ | -------------------------------- | --------------------------- | ------ |
| key    | 键值        | ReactNode           | -      |
| value  | 属性值                           | ReactNode \| (() => ReactNode) | -      |
| hidden | 该数据是否需要展示 **v>=1.12.0** | boolean                     | -      |
| span   | 单元格应跨越的列数 **v>=2.54.0** | number      | 1                 |

### DescriptionItem

| 属性      | 说明                      | 类型              | 默认值 |
| --------- | ------------------------- | ----------------- | ------ |
| itemKey   | 键值 | ReactNode | -      |
| hidden    | 该数据是否需要展示        | boolean           | -      |
| className | Item 外部wrapper: tr 的类名                      | string            | -     |
| style     | Item 外部wrapper: tr 的内联样式                | CSSProperties            | -     |
| span   | 单元格应跨越的列数 **v>=2.54.0**  | number      | 1                 |



## 文案规范
- 字段名和值都按 Sentence case 原则书写大小写

## 设计变量

<DesignToken/>
