---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'semi-design-vue'
  text: 'Vue3 UI components'
  tagline: based on semi-design
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-CN/start/getting-started/
    - theme: alt
      text: Semi Design 官方文档
      link: https://semi.design/zh-CN/

---

```vue live=true noInline=true height="360"
<script setup>
  import { Button, Toast } from '@kousum/semi-ui-vue';
  import { defineComponent, ref } from 'vue';

  function clickFn() {
    Toast.info('OK')
  }
</script>
<template>
  <Button type='primary' @click="clickFn">按钮</Button>
</template>
```


<div style="position: fixed;right: 0;bottom: 0;width: calc(100% - 280px);z-index: 99;text-align:center;background-color: var(--semi-color-bg-0);border-top: 1px solid var(--semi-color-border);padding: 1rem">
<a href="https://beian.miit.gov.cn/">浙ICP备2021003967号-1</a>
</div>
