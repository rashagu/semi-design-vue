---
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
import { Divider, Typography } from '@kousum/semi-ui-vue';
import { IconSemiLogo } from '@kousum/semi-icons-vue';
import { DividerDemo1 } from './demo/DividerDemo1.vue';

const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}



## 代码演示

### 如何引入

```jsx import
import { Divider } from '@kousum/semi-ui-vue';
```

### 基本用法

```jsx live=true
import React from 'react';
import { Divider } from '@kousum/semi-ui-vue';

() => {

    return (
        <div>
            <h3>水平实线</h3>
            <span>Semi Design 是一个设计系统。</span>
            <Divider margin='12px'/>
            <span>它定义了一套中后台设计与前端基础组件。</span>

            <h3 style={{ "marginTop": "40px" }}>水平虚线</h3>
            <span>Semi Design 是一个设计系统。</span>
            <Divider dashed={true} margin='12px'/>
            <span>它定义了一套中后台设计与前端基础组件。</span>

            <h3 style={{ "marginTop": "40px" }}>垂直实线</h3>

            <div>
                <span>左</span>
                <Divider layout="vertical" margin='12px'/>
                <span>中</span>
                <Divider layout="vertical" margin='12px'/>
                <span>右</span>
            </div>

            <h3 style={{ "marginTop": "40px" }}>垂直虚线</h3>
            <div>
                <span>左</span>
                <Divider layout="vertical" dashed={true} margin='12px'/>
                <span>中</span>
                <Divider layout="vertical" dashed={true} margin='12px'/>
                <span>右</span>
            </div>

        </div>
    );
};

```
### 包含内容

<DividerDemo1 />

::: details code-group Click me to view the code

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
