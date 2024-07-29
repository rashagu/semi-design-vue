---
outline: deep
localeCode: zh-CN
order: 20
category: 输入类
title:  Button 按钮
icon: doc-button
dir: column
brief: 用户使用按钮来触发一个操作或者进行跳转。
---

<script setup>
import { useData } from 'vitepress';




const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });

const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## 代码演示

### 如何引入

```jsx import
import { Button, SplitButtonGroup } from '@kousum/semi-ui-vue';
```

### 按钮类型

按钮支持以下类型：

-   主按钮（"primary"，默认）
-   次要按钮（"secondary"）
-   第三按钮（"tertiary"）
-   警告按钮（"warning"）
-   危险按钮（"danger"）

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/base.vue':modules['./demo/base.vue']}"/>
</div>

#### 关于类型字体色值

按钮的字体色值使用的都是 [CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)，分别为：

-   `var(--semi-color-primary)`：主要
-   `var(--semi-color-secondary)`：次要
-   `var(--semi-color-tertiary)`：第三
-   `var(--semi-color-warning)`：警告
-   `var(--semi-color-danger)`：危险

你可以直接使用这些主题色定义你的元素。

```vue live=true height="340"
<template>
  <article>
    <strong v-for="(type, index) in types" :key="index"
            :style="{ color: `var(--semi-color-${Array.isArray(type) ? type[0] : type})`, marginRight: '10px' }">
      {{Array.isArray(type) ? type[1]: type}}
    </strong>
  </article>
</template>
<script setup>
  const types = [['primary', '主要'], ['secondary', '次要'], ['tertiary', '第三'], ['warning', '警告'], ['danger', '危险']];
</script>
```

### 按钮主题

目前可用的主题（theme）为：

-   `light`：浅色背景
-   `solid`：深色背景
-   `borderless`：无背景

默认的主题为 `light`

#### 浅色背景

```vue live=true dir="column"
<template>
  <Button theme='light' type='primary' style="margin-right: 8px">浅色主要</Button>
  <Button theme='light' type='secondary' style="margin-right: 8px">浅色次要</Button>
  <Button theme='light' type='tertiary' style="margin-right: 8px">浅色第三</Button>
  <Button theme='light' type='warning' style="margin-right: 8px">浅色警告</Button>
  <Button theme='light' type='danger' style="margin-right: 8px">浅色危险</Button>
</template>

<script setup>
  import { Button } from '@kousum/semi-ui-vue';
</script>

```

#### 深色背景

```vue live=true dir="column"
<template>
  <Button theme='solid' type='primary' style="margin-right: 8px">浅色主要</Button>
  <Button theme='solid' type='secondary' style="margin-right: 8px">浅色次要</Button>
  <Button theme='solid' type='tertiary' style="margin-right: 8px">浅色第三</Button>
  <Button theme='solid' type='warning' style="margin-right: 8px">浅色警告</Button>
  <Button theme='solid' type='danger' style="margin-right: 8px">浅色危险</Button>
</template>

<script setup>
  import { Button } from '@kousum/semi-ui-vue';
</script>

```

#### 无背景

```vue live=true dir="column"
<template>
  <Button theme='borderless' type='primary' style="margin-right: 8px">浅色主要</Button>
  <Button theme='borderless' type='secondary' style="margin-right: 8px">浅色次要</Button>
  <Button theme='borderless' type='tertiary' style="margin-right: 8px">浅色第三</Button>
  <Button theme='borderless' type='warning' style="margin-right: 8px">浅色警告</Button>
  <Button theme='borderless' type='danger' style="margin-right: 8px">浅色危险</Button>
</template>

<script setup>
  import { Button } from '@kousum/semi-ui-vue';
</script>
```

### 尺寸

默认定义了三种尺寸：

-   大："large"
-   默认："default"
-   小："small"

```vue live=true dir="column"
<template>
  <div>
    <Button size='large' :style="{ marginRight: '8px' }">大尺寸</Button>
    <Button size='default' :style="{ marginRight: '8px' }">默认尺寸</Button>
    <Button size='small'>小尺寸</Button>
  </div>
</template>

<script setup>
  import { Button } from '@kousum/semi-ui-vue';
</script>
```

### 块级按钮

块级按钮具有预先定义好的宽度，它的宽度与按钮里面内容的宽度无关。

```vue live=true height="200"
<template>
  <Button block>块级按钮</Button>
</template>
<script setup>
  import {Button} from '@kousum/semi-ui-vue'
</script>
```

### 图标按钮

可定义按钮的图标。

```vue live=true
<template>
  <div>
    <strong>默认状态：</strong>
    <Button :icon="h(IconCamera)" aria-label="截屏" />
    <br /><br />
    <strong>禁用状态：</strong>
    <Button :disabled="true" :icon="h(IconCamera)" aria-label="截屏" />
    <br /><br />
    <strong>复合类型：</strong>
    <span class="btn-margin-right">
      <Button type="primary" :icon="h(IconCamera)" aria-label="截屏" />
      <Button type="secondary" :icon="h(IconCamera)" aria-label="截屏" />
      <Button type="warning" :icon="h(IconCamera)" aria-label="截屏" />
      <Button type="danger" :icon="h(IconCamera)" aria-label="截屏" />
    </span>
    <br /><br />
    <strong>更改主题：</strong>
    <Button :icon="h(IconCamera)" theme="solid" :style="{ marginRight: '10px' }" aria-label="截屏" />
    <Button :icon="h(IconCamera)" theme="light" aria-label="截屏" />
    <br /><br />
    <strong>更改图标位置：</strong>
    <Button :icon="h(IconSidebar)" theme="solid" :style="{ marginRight: '10px' }">收起</Button>
    <Button :icon="h(IconChevronDown)" theme="solid" iconPosition="right">展开选项</Button>
    <br /><br />
  </div>
</template>

<script setup>
  import { ref, h } from 'vue';
  import { Button } from '@kousum/semi-ui-vue';
  import { IconCamera, IconSidebar, IconChevronDown } from '@kousum/semi-icons-vue';

</script>
```

### 链接按钮

我们推荐使用 Typography 的 link 属性来实现链接型的文字按钮，具体用法详见[Typography]()

```vue live=true
<template>
    <div>
        <TypographyText link="https://semi.design/">链接文本</TypographyText>
        <br />
        <br />
        <TypographyText link="https://semi.design/">打开网站</TypographyText>
        <br />
        <br />
        <TypographyText link="https://semi.design/" :icon="h(IconLink)" underline>带下划线的网页链接</TypographyText>
    </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { TypographyText } from '@kousum/semi-ui-vue';
import { IconLink } from '@kousum/semi-icons-vue';
</script>
```

### 禁用状态

```vue live=true dir="column"
<template>
  <div>
    <Button disabled>禁用</Button>
    <Button disabled theme="borderless">无背景禁用</Button>
    <Button disabled theme="light">浅色禁用</Button>
    <Button disabled theme="borderless" type="primary">无背景主要禁用</Button>
    <Button disabled theme="solid" type="warning">深色警告禁用</Button>
  </div>
</template>

<script setup>
  import { Button } from '@kousum/semi-ui-vue';
</script>
```

### 加载状态

按钮支持加载状态，通过设置 loading 参数值为 true 即可，注意：disabled 状态优先级高于 loading 状态。

```vue live=true dir="column"
<template>
  <div>
    <div>
      <div class="btn-margin-right" style="display: inline-flex; align-items: center; padding-bottom: 14px;">
        <Button @click="reset(false)">关闭加载态</Button>
      <Button @click="reset(true)">开启加载态</Button>
  </div>
</div>
<hr/>
<Button :loading="saveLoading" @click="saveLoading = true" style="margin-right: 14px;">保存</Button>
<Button :loading="delLoading" icon="IconDelete" type="danger" @click="delLoading = true" style="margin-right: 14px;">删除</Button>
<div style="width: 200px; display: inline-block;">
  <Button :loading="repLoading" type="warning" block theme="solid" @click="repLoading = true">撤销</Button>
</div>
</div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Button } from '@kousum/semi-ui-vue';
  import { IconDelete } from '@kousum/semi-icons-vue';

  const saveLoading = ref(false);
  const delLoading = ref(true);
  const repLoading = ref(true);

  const reset = (status) => {
  status = !!status;
  saveLoading.value = status;
  delLoading.value = status;
  repLoading.value = status;
};
</script>

<style scoped>
  .btn-margin-right {
  display: inline-flex;
  align-items: center;
  padding-bottom: 14px;
}
</style>
```

### 按钮组合

可以将多个按钮放入`ButtonGroup`的容器中，通过设置`size`，`disabled`，`type`可统一设置按钮组合中的按钮尺寸，是否禁用和类型。

#### 组合尺寸

```vue live=true dir="column"
<template>
  <div style="display: flex;">
    <div v-for="(size, index) in sizes" :key="index" style="margin-right: 10px;">
      <ButtonGroup :size="size">
        <Button>拷贝</Button>
        <Button>查询</Button>
        <Button>剪切</Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { ButtonGroup, Button } from '@kousum/semi-ui-vue';

  const sizes = ref(['large', 'default', 'small']);
</script>
```

#### 组合禁用

```jsx live=true dir="column"
import { h } from 'vue';
import { ButtonGroup, Button } from '@kousum/semi-ui-vue';

export default function() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
                <ButtonGroup disabled>
                    <Button>拷贝</Button>
                    <Button>查询</Button>
                    <Button>剪切</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}
```

#### 组合类型

```jsx live=true dir="column"
import { h } from 'vue';
import { ButtonGroup, Button } from '@kousum/semi-ui-vue';

export default function() {
    const types = ['primary', 'secondary', 'tertiary', 'warning', 'danger'];

    return (
        <div style={{ display: 'flex' }}>
            {types.map(type => (
                <div style={{ marginRight: '10px' }} key={type}>
                    <ButtonGroup type={type} aria-label="操作按钮组">
                        <Button>拷贝</Button>
                        <Button>查询</Button>
                        <Button>剪切</Button>
                    </ButtonGroup>
                </div>
            ))}
        </div>
    );
}
```

### 分裂按钮组合

**V1.12.0新增**

在`Button`和`Dropdown`结合的场景下，可以使用分裂按钮，分裂按钮添加了按钮之间的间隔，并改变了按钮的边框圆角

#### 基础使用

<div style="width: 100%;height: 600px;">
<LiveCode :files="{'src/SplitButtonDemo.vue':modules['./demo/SplitButtonDemo.vue']}"/>
</div>



## API 参考

### Button

| 属性                | 说明                                                                                                       | 类型                            | 默认值    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------- | --------- |
| aria-label          | 按钮的标签                                                                                       | string                            | -    |
| block               | 将按钮设置为块级按钮                                                                                       | bool                            | false     |
| className           | 类名                                                                                                       | string                          |           |
| disabled            | 禁用状态                                                                                                   | boolean                         | false     |
| htmlType           | 设置 `button` 原生的 `type` 值，可选值：`button`、`reset`、`submit`                                        | string                          | "button"  |
| icon                | 图标                                                                                                       | ReactNode               |           |
| iconPosition        | 图标位置，可选值：`left`\|`right`                                                                          | string                          | `left`    |
| loading             | 加载状态                                                                                                   | boolean                         | false     |
| noHorizontalPadding | 设置水平方向是否去掉内边距，只对设置了 icon 的 Button 有效。可选值：`true`（等效于 \["left", "right"\]），"left"，"right"，\["left", "right"\] | boolean\|string\|Array<string\> | false     |
| size                | 按钮大小，可选值：`large`、`default`、`small`                                                              | string                          | "default" |
| style               | 自定义样式                                                                                                 | CSSProperties                          |           |
| theme               | 按钮主题，可选值：`solid`（有背景色）、 `borderless`（无背景色）、 `light`（浅背景色）                     | string                          | "light"   |
| type                | 类型，可选值：`primary`、`secondary`、`tertiary`、`warning`、 `danger`                                     | string                          | "primary" |
| onClick             | 单击事件                                                                                                   | function(MouseEvent)                        |           |
| onMouseDown             | 鼠标按下事件                                                                                                   | function(MouseEvent)                        |           |
| onMouseEnter             | 鼠标移入事件                                                                                                   | function(MouseEvent)                        |           |
| onMouseLeave             | 鼠标移出事件                                                                                                   | function(MouseEvent)                        |           |

### ButtonGroup

| 属性     | 说明          | 类型    | 默认值      | 版本 |
| -------- | -------------| ------- | --------- |---- |
| aria-label | 按钮组的标签 | string  | - | |
| className  | 自定义类名   | string  | - | |
| disabled   | 禁用状态     | boolean | false | |
| size       | 按钮大小，可选值：`large`、`default`、`small` | string  | "default" | |
| style      | 自定义样式   | CSSProperties   | - | 2.20.0 |
| theme      | 按钮主题，可选值：`solid`（有背景色）、 `borderless`（无背景色）、 `light`（浅背景色） | string | "light"   | |
| type     | 类型，可选值：`primary`、`secondary`、`tertiary`、`warning`、 `danger` | string  | "primary" | |

### SplitButtonGroup **V1.12.0新增**
| 属性          | 说明                 | 类型      | 默认值     |
| -----------  | ---------------------| -------- | --------- |
| aria-label   | 分裂按钮组的标签        | string   | - |
| className    | 自定义类名             | string   | - |
| style        | 自定义样式             | CSSProperties   | - |

## Accessibility

### ARIA

- `aria-label` 用于表示按钮的作用，对于图标按钮，我们推荐使用此属性
- `aria-disabled` 与 disabled 属性同步，表示按钮禁用

### 键盘和焦点

- Button 的焦点管理与原生 button 一致，键盘用户可以使用 Tab 及  Shift + Tab 切换焦点
- Button 的触发与原生 button 一致，当按钮聚焦时，可以通过 Enter 或 Space 键激活
- ButtonGroup 中的按钮与单个按钮的焦点管理方式一致，可以通过 Tab 以及 Shift + Tab 进行切换


## 文案规范
- 按钮需要清晰可预测，用户应该能够预测他们点击按钮时会发生什么
- 按钮应该总是以鼓励行动的强动词开头
- 为了给用户提供足够的上下文，在按钮上使用 {动词}+{名词} 内容公式；除了常见的动作，如“Done”、“Close”、“Cancel”或“OK”

| ✅ 推荐用法                                                                                                                                                                                                                                                                                                                                              | ❌ 不推荐用法                                                                                                                                                                                                                                                                                                                                 |   
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| <div :style="{ textAlign: 'center' }"><Empty image={<IllustrationNoAccess :style="{ width: 150, height: 150 }" />} darkModeImage={<IllustrationNoAccessDark :style="{ width: 150, height: 150 }" />} description='No permission to view this page'/><Button theme='solid' type='primary' :style="{ marginTop: 12 }">Apply permission</Button></div> | <div style="{ textAlign: 'center' }"><Empty image={<IllustrationNoAccess :style="{ width: 150, height: 150 }" />} darkModeImage={<IllustrationNoAccessDark :style="{ width: 150, height: 150 }" />} description='No permission to view this page'/><Button theme='solid' type='primary' :style="{ marginTop: 12 }">Apply</Button></div> |

- 当按钮和其他组件一起时候，如果其他组件（比如 Modal 和Sidesheet）已经提供了足够信息的上下文的话，按钮可以只展示 {动词}，如“Add”、“Create”；
  
| ✅ 推荐用法                                                                                                                                        | ❌ 不推荐用法                                                                                                                                      |   
|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------| 
| <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/content_guide/button-good-2.png' style="width: 350px" /> | <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/content_guide/button-bad-2.png' style="width: 350px" /> |

- 始终按句子大小写（Sentence case）原则书写

| ✅ 推荐用法 | ❌ 不推荐用法 |   
| --- | --- | 
| Create project | Create <br/> Create a project|
| Edit profile | Edit |

## 设计变量
<DesignToken :title="page.title"/>

## FAQ
- #### 为什么Button中的icon属性不起作用？  
  请检查你的Button import路径，正确的import路径应该为```import { Button } from '@kousum/semi-ui-vue;'```，如果你错误地从 @kousum/semi-ui-vue/button/button中import的话，获取到的是不带icon功能的基础Button组件



