
<template>
  <Layout className="components-layout-demo">
    <Header :style="commonStyle">Header</Header>
    <Layout>
      <Sider
        style="width: 120px; background: var(--semi-color-fill-2);"
        :breakpoint="['md']"
        @onBreakpoint="onbreakpoint"
      >
        Sider
      </Sider>
      <Content style="height: 300px; line-height: 300px;">Content</Content>
    </Layout>
    <Footer :style="commonStyle">Footer</Footer>
  </Layout>
</template>

<script setup>
import { Layout, LayoutHeader, LayoutFooter, LayoutContent, LayoutSider } from '@kousum/semi-ui-vue';

const onbreakpoint = (screen, bool) => {
  console.log(screen, bool);
};
const commonStyle = {
  height: '64px',
  lineHeight: '64px',
  background: 'var(--semi-color-fill-0)'
};
</script>
