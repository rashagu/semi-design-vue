<template>
  <div style="padding-top: 120px">
    <AutoComplete
      :data="data"
      position="top"
      @search="change"
      placeholder="选项菜单在上方显示"
      style="width: 200px; margin: 10px;"
    ></AutoComplete>
    <AutoComplete
      :data="data"
      position="rightTop"
      @search="change"
      placeholder="选项菜单在右侧显示"
      style="width: 200px; margin: 10px;"
    ></AutoComplete>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AutoComplete } from '@kousum/semi-ui-vue';

const data = ref([]);

const change = (input) => {
  let newData = ['gmail.com', '163.com', 'qq.com'].map(domain => `${input}@${domain}`);
  if (!input) {
    newData = [];
  }
  data.value = newData;
};
</script>

<style scoped>
</style>
