---
category: 开始
title: Change Log 更新日志
icon: doc-changelog
outline: deep
localeCode: zh-CN
order: 8
brief: 关于 Semi Design For React 优化与更新。我们提供了版本间的 Changelog Diff，你可以通过 hover 版本号唤出 Diff 控件。如果你想查看单个组件的变更历史，可以通过对应组件文档的 版本对比 按钮查看
---

<script setup>
import { useData } from 'vitepress';
import DesignToken from '../../../DesignToken.vue';



const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}

Semi 版本号遵循 **Semver** 规范（主版本号-次版本号-修订版本号）：
-   主版本号（major）：重大性能/使用变更，允许做 breaking change
-   次版本号（minor）：Semi 固定每两周发布一个 minor 版本，包括以下类型变更：添加了新组件/新 feature，或者样式变更
-   修订版本号（patch）：仅会进行 bugfix，发布时间不限
-   不同版本间的详细关系，可查阅 [FAQ]()

