---
localeCode: zh-CN
order: 61
category: 展示类
title: Popover 气泡卡片
icon: doc-popover
brief: 点击/鼠标移入元素，弹出气泡式的卡片浮层。
---

<script setup>
import { useData } from 'vitepress';




const modules = import.meta.glob('./demo/*.vue', { query: '?raw', import: 'default', eager: true });

const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
