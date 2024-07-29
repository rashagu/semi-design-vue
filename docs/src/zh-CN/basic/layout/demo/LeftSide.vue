
<template>
  <Layout className="components-layout-demo">
    <LayoutHeader :style="commonStyle">Header</LayoutHeader>
    <Layout>
      <LayoutSider style="width: 120px; background: var(--semi-color-fill-2);">Sider</LayoutSider>
      <LayoutContent style="height: 300px; line-height: 300px;">Content</LayoutContent>
    </Layout>
    <LayoutFooter :style="commonStyle">Footer</LayoutFooter>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { Layout, LayoutHeader, LayoutFooter, LayoutContent, LayoutSider } from '@kousum/semi-ui-vue';


const commonStyle = ref({
  height: 64,
  lineHeight: '64px',
  background: 'var(--semi-color-fill-0)'
});
</script>
