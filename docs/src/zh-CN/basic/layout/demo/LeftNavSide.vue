<template>
  <Layout style="border: 1px solid var(--semi-color-border)">
    <Layout>
      <LayoutSider style="background-color: var(--semi-color-bg-1)">
        <Nav
          :header="{
            logo: h(IconSemiLogo, { style: { fontSize: '36px' } }),
            text: 'Semi Design',
          }"
          style="max-width: 220px; height: 100%"
          :defaultSelectedKeys="['Home']"
          :footer="{ collapseButton: true }"
        >
          <NavItem itemKey="Home" text="首页" :icon="h(IconHome, { size: 'large' })" />
          <NavItem itemKey="Histogram" text="基础数据" :icon="h(IconHistogram, { size: 'large' })" />
          <NavItem itemKey="Live" text="测试功能" :icon="h(IconLive, { size: 'large' })" />
          <NavItem itemKey="Setting" text="设置" :icon="h(IconSetting, { size: 'large' })" />
        </Nav>
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background-color: var(--semi-color-bg-1)">
          <div>
            <Nav mode="horizontal" :defaultSelectedKeys="['Home']">
              <NavFooter>
                <Button
                  theme="borderless"
                  :icon="h(IconBell, { size: 'large' })"
                  style="color: var(--semi-color-text-2); margin-right: 12px"
                />
                <Button
                  theme="borderless"
                  :icon="h(IconHelpCircle, { size: 'large' })"
                  style="color: var(--semi-color-text-2); margin-right: 12px"
                />
                <Avatar color="orange" size="small">YJ</Avatar>
              </NavFooter>
            </Nav>
          </div>
        </LayoutHeader>
        <LayoutContent style="padding: 24px; background-color: var(--semi-color-bg-0)">
          <Breadcrumb
            style="margin-bottom: 24px"
            :routes="['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']"
          />
          <div style="border-radius: 10px; border: 1px solid var(--semi-color-border); height: 376px; padding: 32px">
            <Skeleton :placeholder="h(SkeletonParagraph, { rows: 2 })" :loading="true">
              <p>Hi, Bytedance dance dance.</p>
              <p>Hi, Bytedance dance dance.</p>
            </Skeleton>
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
    <LayoutFooter
      style="
        display: flex;
        justify-content: space-between;
        padding: 20px;
        color: var(--semi-color-text-2);
        background-color: rgba(var(--semi-grey-0), 1);
      "
    >
      <span style="display: flex; align-items: center">
        <IconBytedanceLogo size="large" style="margin-right: 8px" />
        <span>Copyright © 2023 ByteDance. All Rights Reserved. </span>
      </span>
      <span>
        <span style="margin-right: 24px">平台客服</span>
        <span>反馈建议</span>
      </span>
    </LayoutFooter>
  </Layout>
</template>

<script setup>
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  LayoutFooter,
  Nav,
  NavFooter,
  NavItem,
  Skeleton,
  SkeletonParagraph,
} from '@kousum/semi-ui-vue';
import {
  IconBell,
  IconBytedanceLogo,
  IconHelpCircle,
  IconHistogram,
  IconHome,
  IconLive,
  IconSemiLogo,
  IconSetting,
} from '@kousum/semi-icons-vue';
import { h } from 'vue';
</script>
