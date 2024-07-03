---
localeCode: zh-CN
order: 21
category: 输入类
title: AutoComplete 自动完成
icon: doc-autocomplete
brief: 输入框自动填充。
---

<script setup>
import { useData } from 'vitepress';
import LiveCode from '../../../LiveCode.vue';
import DesignToken from '../../../DesignToken.vue';



const modules = import.meta.glob('./demo/*.*', { query: '?raw', import: 'default', eager: true });

const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## 使用场景

用于对输入框提供输入建议，进行自动补全的操作


与可搜索的 Select 组件的区别：
- AutoComplete 本质上是一个增强型的提供了输入建议的 Input 组件，而 Select 是一个选择器
- 点击展开时，Select 会将输入框的值全部清空，而 AutoComplete 会保留上次选中的值
- Select 的已选项渲染（renderSelectedItem）可定制化程度更高，可以为任意类型的 ReactNode，而 AutoComplete 只允许为字符串

## 代码演示

### 如何引入

```jsx import
import { AutoComplete } from '@kousum/semi-ui-vue';
```

### 基本用法

通过 onSearch 监听用户输入，将输入建议通过更新 props.data 传入。通过 onChange 保持受控，当输入框变化/选中输入项时会触发 onChange

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/baseAutoComplete.vue':modules['./demo/baseAutoComplete.vue']}"></LiveCode>
</div>

### 自定义候选项渲染

需要自定义候选项渲染时，data 可以传入一个对象数组（每个 Object 必须含有 label、value 两个 key，value 为候选项选中的值，label 为候选项展示的内容）  
通过 renderItem 可以自定义候选项的渲染

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/diyItemAutoComplete.vue':modules['./demo/diyItemAutoComplete.vue']}"></LiveCode>
</div>

### 远程搜索

从 onSearch 中获取用户输入值，动态更新 data 值

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/remoteAutoComplete.vue':modules['./demo/remoteAutoComplete.vue']}"></LiveCode>
</div>

### 尺寸

通过设置 size 可设置输入框尺寸，可选`small`，`default`(默认)，`large`

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/sizeAutoComplete.vue':modules['./demo/sizeAutoComplete.vue']}"></LiveCode>
</div>

### 下拉菜单的位置

通过设置 position 可设置下拉菜单位置，可选值参考 Tooltip position

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/positionAutoComplete.vue':modules['./demo/positionAutoComplete.vue']}"></LiveCode>
</div>

### 禁用

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/disabledAutoComplete.vue':modules['./demo/disabledAutoComplete.vue']}"></LiveCode>
</div>

### 校验状态

可设置不同校验状态，展示不同样式

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/statusAutoComplete.vue':modules['./demo/statusAutoComplete.vue']}"></LiveCode>
</div>

### 自定义空内容

可设置自定义展示空内容

<div style="width: 100%;height: 400px;">
<LiveCode :files="{'src/emptyAutoComplete.vue':modules['./demo/emptyAutoComplete.vue']}"></LiveCode>
</div>

## API 参考

| 属性                       | 说明                                                                                                           | 类型                                   | 默认值                 | 版本     |
|--------------------------|--------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------------|--------|
| autoFocus                | 是否自动聚焦                                                                                                       | bool                                 | false               | 1.16.0 |
| autoAdjustOverflow       | 浮层被遮挡时是否自动调整方向                                                                                               | bool                                 | true                |        |
| className                | 样式类名                                                                                                         | string                               |                     |        |
| clearIcon                | 可用于自定义清除按钮, showClear为true时有效                                                                                | ReactNode                            |                     | 2.25.0 |
| data                     | 候选项的数据源，可以为字符串数组或对象数组                                                                                        | array                                | []                  |        |
| defaultActiveFirstOption | 是否默认高亮第一个选项（按回车可直接选中）                                                                                        | bool                                 | false               |        |
| defaultOpen              | 是否默认展开下拉菜单                                                                                                   | boolean                              | false               |        |
| defaultValue             | 默认值                                                                                                          | string                               |                     |        |
| disabled                 | 是否禁用                                                                                                         | boolean                              | false               |        |
| dropdownClassName        | 下拉列表的 CSS 类名                                                                                                 | string                               |                     |        |
| dropdownStyle            | 下拉列表的内联样式                                                                                                    | object                               |                     |        |
| emptyContent             | data 为空时自定义下拉内容                                                                                              | ReactNode                            | null                | 1.16.0 |
| getPopupContainer        | 指定下拉列表浮层的父级容器，浮层将会渲染至该 DOM 中。自定义该项时需给容器设置 `position: relative` 这会改变浮层 DOM 树位置，但不会改变视图渲染位置                    | () => HTMLElement                    | () => document.body |        |
| loading                  | 下拉列表是否展示加载动画                                                                                                 | boolean                              | false               |        |
| maxHeight                | 下拉列表的最大高度                                                                                                    | number\|string                       | 300                 |        |
| motion                   | 下拉列表出现/隐藏时，是否有动画                                                                                             | boolean                              | true                |        |
| onSelectWithObject       | 点击候选项时，是否将选中项 option 的其他属性也作为回调入参。设为 true 时，onSelect 的入参类型会从 `string` 变为 object: `{ value, label, ...rest }` | boolean                              | false               | 1.23.0 |
| placeholder              | 输入框默认提示文案                                                                                                    | string                               |                     |        |
| position                 | 下拉菜单的显示位置，可选值同 tooltip 组件                                                                                    | string                               | 'bottomLeft'        |        |
| prefix                   | 选择框的前缀标签                                                                                                     | ReactNode                            |                     | 0.23.0 |
| renderItem               | 控制下拉列表候选项的渲染                                                                                                 | (option: string\|Item)=> React.Node  |                     |        |
| renderSelectedItem       | 通过 renderSelectedItem 自定义下拉列表候选项被点击选中后，在选择框中的渲染内容<br/>**仅支持 String 类型的返回值**<br/>                             | (option: string\|Item) => string     |                     |        |
| showClear                | 是否展示清除按钮                                                                                                     | boolean                              | false               |        |
| size                     | 尺寸，可选`small`, `default`, `large`                                                                             | string                               | `default`           |        |
| style                    | 样式                                                                                                           | object                               |                     |        |
| suffix                   | 选择框的前缀标签                                                                                                     | ReactNode                            |                     |        |
| validateStatus           | 校验状态，可选值`default`、`error`、`warning`，默认 default。仅影响展示样式                                                       | string                               | 'default'           | 1.14.0 |
| value                    | 当前值                                                                                                          | string\|number                       | 无                   |        |
| zIndex                   | 下拉菜单的 zIndex                                                                                                 | number                               |                     |        |
| onBlur                   | 失去焦点时的回调                                                                                                     | Function(event)                      |                     |        |
| onChange                 | 输入框变化/候选项选中时变化                                                                                               | Function(value:string\|number)       |                     | 1.23.0 |
| onFocus                  | 获得焦点时的回调                                                                                                     | Function(event)                      |                     |        |
| onKeyDown                | keydown 回调                                                                                                   | (e: React.KeyboardEvent) => void     |                     | 2.21.0 |
| onSearch                 | 输入变化时的回调                                                                                                     | Function(value: string)              |                     |        |
| onSelect                 | 下拉菜单候选项被选中时的回调                                                                                               | Function(item: string\|number\|Item) |                     |        |

## Accessibility
### 键盘和焦点

- AutoComplete 的 input 框可被聚焦，聚焦后，键盘用户可以通过 `上箭头` 或 `下箭头` 打开选项面板（如有）
- AutoComplete 也支持通过 `Enter` 键打开和收起面板
- 若用户将 defaultActiveFirstOption 属性设置为 true 时，选项面板打开后默认高亮第一个选项
- 若下拉菜单打开时：
  - 使用 `Esc` 可以关闭菜单
  - 使用 `上箭头` 或 `下箭头` 可以切换选项
  - 被聚焦的选项可以通过 `Enter` 键选中，并收起面板

## 文案规范
- 需要清晰地展示内容，让用户显而易见地感知到可用的各个选项
- 限制一次性展示的选项数量

## 设计变量
<DesignToken/>
