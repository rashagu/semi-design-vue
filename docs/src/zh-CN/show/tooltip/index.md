---
localeCode: zh-CN
order: 67
category: 展示类
title: Tooltip 工具提示
icon: doc-tooltip
width: 65%
brief: 工具提示用于对一个元素进行标识或者附上少量辅助信息，最典型的场景是向用户解释图标的含义、展示被截断的文本、显示图片的描述等。
---

<script setup>
import { useData } from 'vitepress';




const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });

const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
