---
outline: deep
localeCode: zh-CN
order: 12
category: 基础 
title:  Divider 分割线 
icon: doc-divider 
brief: 分割线是一个呈线状的轻量化组件，用于有逻辑的组织元素内容和页面结构或区域。
---

<script setup>
import { useData } from 'vitepress';
import DesignToken from '../../../DesignToken.vue';
import DividerDemo0 from './demo/DividerDemo0.vue';
import DividerDemo1 from './demo/DividerDemo1.vue';



const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}




### 如何引入

```jsx import
import { Divider } from '@kousum/semi-ui-vue';
```

### 基本用法

<DividerDemo0/>
::: details  Click me to view the code
::: code-group
<<< @/basic/divider/demo/DividerDemo0.vue
:::


### 包含内容

<DividerDemo1 />

::: details  Click me to view the code
::: code-group
<<< @/basic/divider/demo/DividerDemo1.vue
:::




## API参考

| 属性        | 说明                             | 类型          | 默认值     | 版本 |
|-----------|--------------------------------|-------------|---------| --------- |
| align     | 带内容时，内容对齐方式                    | left \| center \| right | center      |2.9.0 |
| children  | 内容                             | ReactNode   | 无       | 2.9.0 |
| className | 类名                             | string      | 无       |2.9.0 |
| dashed    | 是否为虚线                          | boolean     | false   |2.9.0 |
| layout    | 分割线方向                          | horizontal \| vertical | horizontal    |2.9.0 |
| margin    | 分割线上下 margin (垂直方向时为左右 margin) | number \| string  | 无        |2.9.0 |
| style     | 自定义样式                          | CSSProperties | 无       |2.9.0 |

## 设计变量

<DesignToken :title="page.title"/>
