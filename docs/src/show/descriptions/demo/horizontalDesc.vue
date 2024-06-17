<script setup lang="ts">
import { h, ref } from 'vue';
import { Descriptions, Tag, Divider } from '@kousum/semi-ui-vue';

const data = [
  { key: '抖音号', value: 'SemiDesign' },
  { key: '主播类型', value: '自由主播' },
  { key: '安全等级', value: '3级' },
  { key: '垂类标签', value: h(Tag, {size: 'small', shape:'circle', color: 'violet'}, ()=>'编程')},
  { key: '作品数量', value: '88888888' },
  { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长的值', span: 3 },
  { key: '上次直播时间', value: '2024-05-01 12:00:00', span: 3 },
];

const data2 = [
  { key: '抖音号', value: 'SemiDesign' },
  { key: '主播类型', value: '自由主播' },
  { key: '安全等级', value: '3级' },
  { key: '垂类标签', value: h(Tag, {size: 'small', shape:'circle', color: 'violet'}, ()=>'编程')},
  { key: '作品数量', value: '88888888' },
  { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的值' },

];

const data3 = [
  { key: '抖音号', value: 'SemiDesign' },
  { key: '主播类型', value: '自由主播' },
  { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的值' },
  { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的值', span: 5 },
  { key: '认证状态', value: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的值' },

];
</script>
<template>
  <div>
    <Descriptions layout='horizontal' align='plain' :data="data" :column="5" />
    <Divider margin="12px" />
    <Descriptions layout='horizontal' align='plain' :data="data2" :column="5" />
    <Divider margin="12px" />
    <Descriptions layout='horizontal' align='plain' :data="data3" :column="5" />
    <Divider margin="12px" />
    <Descriptions layout='horizontal' :data="data" :column="5" />
    <Divider margin="12px" />
    <Descriptions layout='horizontal' :data="data2" :column="5" />
    <Divider margin="12px" />
    <Descriptions layout='horizontal' :data="data3" :column="5" />
  </div>
</template>
