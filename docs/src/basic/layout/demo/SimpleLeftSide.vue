
<template>
  <Layout className="components-layout-demo">
    <LayoutSider style="width: 120px; background: var(--semi-color-fill-2);">Sider</LayoutSider>
    <Layout>
      <LayoutHeader style="height: 64px; line-height: 64px; background: var(--semi-color-fill-0);">Header</LayoutHeader>
      <LayoutContent style="height: 300px; line-height: 300px;">Content</LayoutContent>
      <LayoutFooter style="height: 64px; line-height: 64px; background: var(--semi-color-fill-0);">Footer</LayoutFooter>
    </Layout>
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
