---
category: 开始
title:  Dark Mode 暗色模式
icon: doc-darkmode
outline: deep
localeCode: zh-CN
order: 5
---

<script setup>

import { useData } from 'vitepress';
import LiveCode from '../../../LiveCode.vue';
import DesignToken from '../../../DesignToken.vue';
import Notice from '../../../Notice';
import PureA from '../../../PureA';
import DarkDemo from './demo/darkDemo';
import Test from './demo/test';


const modules = import.meta.glob('./demo/*.tsx', { query: '?raw', import: 'default', eager: true });
const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## 能力介绍

🤩 Semi 的默认主题或任意通过 [Semi DSM]() 配置的定制主题都自带了亮色模式与暗色模式，可以方便地进行切换。  
🌒 Semi 也支持在页面的局部范围使用亮/暗色模式。

## 推荐设置
Semi 会自动在 body 元素上挂载全局色盘，我们内置了一些常用的 CSS Token，详细的 Token 详情可查阅 [设计变量]()  
我们推荐你在 body 上配置 `color`、`background-color`, 你的业务组件可从 body 自动继承获得默认的背景色、文本颜色，自适应亮/暗色切换

```css
// css
body {
    color: var(--semi-color-text-0);
    background-color: var( --semi-color-bg-0);
}
```

## 如何切换
Semi 暗色模式的切换是通过给 `body` 添加属性 `[theme-mode='dark']` 来实现的（我们在 body 下同时挂载了两套色盘）。你可以使用任何你喜欢的方式来进行切换。比如：
```jsx
const body = document.body;
if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode');
} else {
    body.setAttribute('theme-mode', 'dark');
}
```

这里也有一个🌰：
```jsx live=true
import { h } from 'vue';
import { Button } from '@kousum/semi-ui-vue';

function Demo() {
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            // 以下这行代码，window.setMode仅用于当通过本Demo切换时，通知Semi官网Header记录更新当前模式（只用于演示）。在您的代码里无需存在。
            window.setMode('light');
        } else {
            body.setAttribute('theme-mode', 'dark');
            window.setMode('dark');
        }
    };

    return (
        <Button
            onClick={switchMode}
        >
            Switch Mode
        </Button>
    );
}
```

## 和系统主题保持一致

如果你希望页面的亮色/暗色模式能自动和系统主题保持一致，可以参考 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 属性。该属性目前处于实验阶段，请留意浏览器兼容性 (Chrome >= 76, Safari >= 12.1) 及未来可能发生的改变。

macOS 下的系统主题可以通过 `系统偏好设置 -> 通用 -> 外观` 来配置。

由于我们不建议直接修改 npm 主题包的内容，你可以通过 JS 的方式监听该属性的变化，这里也有一个🌰：
```jsx
const mql = window.matchMedia('(prefers-color-scheme: dark)');

function matchMode(e) {
    const body = document.body;
    if (e.matches) {
        if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
        }
    } else {
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        }
    }
}

mql.addListener(matchMode);
```

## 局部暗色/亮色模式

Semi 2.0 原生支持局部暗色/亮色模式。使用时，在顶级元素上添加 `.semi-always-dark` 或 `.semi-always-light` 类，这个类下的组件会使用对应模式的颜色变量。

<Notice>
    注意：由于弹出层默认是插入到 body 中，局部暗色/亮色对弹出层元素不生效。若你希望对弹出层也生效，应当使用 getPopupContainer 将弹出层插入节点置于你挂载 `.semi-always-dark` 或 `.semi-always-light`类名的元素内部
</Notice>

<div style="width: 100%;height: 2200px;">
<LiveCode layout="vertical" :files="{'src/darkDemo.tsx':modules['./demo/darkDemo.tsx']}" />
</div>
