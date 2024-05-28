<template>
  <Layout className="components-layout-demo">
    <LayoutHeader :style="commonStyle">Header</LayoutHeader>
    <LayoutContent style="height: 300px; line-height: 300px;">Content</LayoutContent>
    <LayoutFooter :style="commonStyle">Footer</LayoutFooter>
  </Layout>
</template>

<script setup>
import { Layout, LayoutHeader, LayoutFooter, LayoutContent } from '@kousum/semi-ui-vue';


const commonStyle = {
  height: '64px',
  lineHeight: '64px',
  background: 'var(--semi-color-fill-0)'
};
</script>
