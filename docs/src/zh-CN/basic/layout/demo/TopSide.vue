<template>
  <Layout style="border: 1px solid var(--semi-color-border)">
    <LayoutHeader style="background-color: var(--semi-color-bg-1)">
      <div>
        <Nav mode="horizontal" defaultSelectedKeys="Home">
          <NavHeader>
            <IconSemiLogo style="font-size: 36px" />
          </NavHeader>
          <NavItem itemKey="Home" text="首页" :icon="IconHome" />
          <NavItem itemKey="Live" text="直播" :icon="IconLive" />
          <NavItem itemKey="Setting" text="设置" :icon="IconSetting" />
          <NavFooter>
            <Button theme="borderless" :icon="h(IconBell)" style="color: var(--semi-color-text-2); margin-right: 12px" />
            <Button
              theme="borderless"
              :icon="h(IconHelpCircle)"
              style="color: var(--semi-color-text-2); margin-right: 12px"
            />
            <Avatar color="orange" size="small">YJ</Avatar>
          </NavFooter>
        </Nav>
      </div>
    </LayoutHeader>
    <LayoutContent style="padding: 24px; background-color: var(--semi-color-bg-0)">
      <Breadcrumb style="margin-bottom: 24px" :routes="['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']" />
      <div style="border-radius: 10px; border: 1px solid var(--semi-color-border); height: 276px; padding: 32px">
        <Skeleton :placeholder="h(SkeletonParagraph,{ rows: 2 }, [])" :loading="true">
          <p>Hi, Bytedance dance dance.</p>
          <p>Hi, Bytedance dance dance.</p>
        </Skeleton>
      </div>
    </LayoutContent>
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
  Layout,
  LayoutHeader,
  LayoutFooter,
  LayoutContent,
  LayoutSider,
  Skeleton,
  SkeletonParagraph,
  Breadcrumb,
  Nav,
  NavItem,
  NavHeader,
  NavFooter,
  Avatar,
  Button,
} from '@kousum/semi-ui-vue';
import {
  IconSemiLogo,
  IconBell,
  IconHelpCircle,
  IconBytedanceLogo,
  IconHome,
  IconLive,
  IconSetting,
} from '@kousum/semi-icons-vue';
import { h } from 'vue';

</script>
