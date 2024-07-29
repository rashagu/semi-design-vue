
<template>
  <Layout className="components-layout-demo">
    <LayoutHeader :style="commonStyle">Header</LayoutHeader>
    <Layout>
      <LayoutContent style="height: 300px; line-height: 300px;">Content</LayoutContent>
      <LayoutSider style="width: 120px; background: var(--semi-color-fill-2);">Sider</LayoutSider>
    </Layout>
    <LayoutFooter :style="commonStyle">Footer</LayoutFooter>
  </Layout>
</template>

<script setup>
import { Layout, LayoutHeader, LayoutFooter, LayoutContent, LayoutSider } from '@kousum/semi-ui-vue';
const commonStyle = {
  height: '64px',
  lineHeight: '64px',
  background: 'var(--semi-color-fill-0)'
};
</script>
