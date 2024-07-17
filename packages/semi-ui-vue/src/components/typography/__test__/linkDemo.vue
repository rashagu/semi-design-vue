<template>
  <div>
    <Text :link="{ href: 'https://semi.design/' }">链接文本</Text>
    <br />
    <br />
    <Text :link="{ href: 'https://semi.design/' }">打开网站</Text>
    <br />
    <br />
    <Text :link="{ href: 'https://semi.design/' }" :icon="h(IconLink)" :underline="true">带下划线的网页链接</Text>
  </div>
</template>

<script setup>
import { TypographyText } from '../index';
import { IconLink } from '@kousum/semi-icons-vue';
import { h } from 'vue';

const Text = TypographyText;
</script>
