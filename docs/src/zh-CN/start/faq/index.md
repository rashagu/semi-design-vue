---
category: 开始
title: FAQ 常见问题
icon: doc-faq
outline: deep
localeCode: zh-CN
order: 10
---

<script setup>
import { useData } from 'vitepress';




const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}


#### 各版本之间的关系

-   Semi 版本号遵循 Semver 规范（主版本号-次版本号-修订版本号），我们会在 minor 版本新增 feature 或组件，在 patch 版本我们仅会进行 bug 修复，而不会做新功能更新。**但不同 minor 版本之间可能存在样式上的调整**，当你需要升级时，我们推荐你在 changelog 页面使用版本 Diff 功能，检查所有变更并确实是否对你的业务系统有影响。
-   后续所有新 Feature、新组件都会基于 2.x 版本进行开发，我们推荐业务方尽可能地保持使用最新版本
-   2.x 各版本之间，API 会保持**向前兼容**
-   1.x 各版本之间，API 也会保持**向前兼容**。由 1.x 升级到 2.x 时，会包含 breaking change，具体升级注意事项请查阅文档
-   0.x 版本目前已停止更新，当且仅当必须进行 bugfix 时才会进行 hotfix 更新。由 0.x 升级至 1.x 时，会包含 breaking change，具体升级注意事项请查阅文档

#### Semi 的默认的主题风格跟我们系统的定位不符，可以配置另外的主题吗？

- 具体请参考 [定制主题]() 。Semi 提供**多达 2300+ Design Token 允许用户进行深度定制**，无论你是研发还是设计师，在[Semi DSM]() 里可以非常方便地进行样式层配置，并在代码、设计稿始终保持双向同步。基于 Semi 你可以**低成本定制属于你自己的 Design System** 将 `Semi Design` 定制为 `Any Design`
- 并且在使用时，你也只需要在 webpack.config.js 里指定使用的主题包名即可完成接入（需接入 Semi 插件）。

#### Semi 是否支持 Tree Shaking

-   Semi 执行发包时，发布的其实是 esModule 源码，因此天然支持 tree shaking，不需要再进行额外的配置。
-   组件的 Scss 也是由组件的 index.(j|t)sx 负责 import 的，因此样式也会 shaking。简单来说，只有你使用的组件会被打包

#### 为什么 defaultValue、defaultXXX 不起作用？

Semi 组件中，所有的 defaultValue、defaultXXX 传参只会在组件被 mounted 时进行消费（即仅消费一次）。如果你的 defaultXXX 属性是后期进行异步更新的，组件不会重新进行消费该值。如有需要，你应该使用受控的 value，受控的 xxx。或者直接通过传入一个不一样的`key`值，强制 React 重新挂载该组件。

#### 安装新版本 Semi 后，提示 can't resolve date-fns/esm/\_libs/cloneObject.js 或其他有 date-fns 相关的依赖错误

检查下项目中的 package-lock.json，是否有其他包依赖了 date-fns（大概率是 1.x 的），导致 semi 依赖声明的 date-fns 2.x 没有被安装上。手动 install date-fns，确保是 2.x 版本的即可 `npm install date-fns date-fns-tz`

#### Semi 支持 i18n 吗？

Semi 目前支持 21 种语言，具体使用可以查阅 [Semi·LocaleProvider]()

#### Semi 的样式是基于 Scss 还是 Less ？为什么不用 CSS Module？

我们的样式基于 Scss，与此我们还使用了 CSS Variable 作为色盘变量。色盘变量和通用变量挂载在 body 下。不使用 CSS Module 是因为我们希望有固定的 className，为业务方保留修改/覆盖 Semi 样式的能力（虽然不提倡，但有些业务场景下确实需要）

#### 为什么 Tooltip、Typography 不默认配置 word-break 样式？

不同语言内容（纯英文、中文、中英文混合）对 word-break 的需求不太一致，所以组件层没有做这个预设。可以根据需求，使用 CSS 进行设置。

#### 有新组件需求、或者现有组件 Feature 不能满足我的业务需求，该找谁？

右上角问题反馈，提交 Issue，描述你的需求以及业务场景，Label 选择 `Feature Request` / `New Component Request`


#### 希望自定义滚动条的样式？

可以使用 `.semi-light-scrollbar` 类名，会对 webkit (chrome/safari) 的浏览器应用 Semi 的滚动条样式。该类名放在最外层的 DOM 元素即可，会对所有子元素生效。注：使用了通配符，可能会对性能有影响。其他浏览器可以参考是否有相关的 css 属性支持滚动条的样式定制。

#### 更多的 FAQ

请查阅 https://bytedance.feishu.cn/docs/doccnMRDbkhde6p3dMokfFpcNug
