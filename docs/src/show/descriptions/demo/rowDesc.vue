<script setup lang="ts">
import { h, ref } from 'vue';
import { Descriptions, Tag, Card } from '@kousum/semi-ui-vue';
import { IconArrowUp } from '@kousum/semi-icons-vue';

const data = [
  { key: '实际用户数量', value: '1,480,000' },
  {
    key: '7天留存',
    value: h('span', {}, ['98%', h(IconArrowUp, { size: 'small', style: { color: 'red', marginLeft: '4px' } })]),
  },
  { key: '安全等级', value: '3级' },
];

const style = {
  boxShadow: 'var(--semi-shadow-elevated)',
  backgroundColor: 'var(--semi-color-bg-2)',
  borderRadius: '4px',
  padding: '10px',
  marginRight: '20px',
  width: '600px',
};
</script>
<template>
  <div>
    <Descriptions :data="data" :row="true" size="small" :style="style" />
    <br />
    <Descriptions :data="data" :row="true" :style="style" />
    <br />
    <Descriptions :data="data" :row="true" size="large" :style="style" />
  </div>
</template>
