<template>
  <div>
    <AutoComplete
      :data="stringData"
      :value="value"
      show-clear
      :prefix="h(IconSearch)"
      placeholder="搜索... "
      @search="handleStringSearch"
      @change="handleChange"
      :style="{ width: '200px' }"
    />
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { AutoComplete } from '../../index';
import { IconSearch } from '@kousum/semi-icons-vue';

const stringData = ref([]);
const value = ref('');

const handleStringSearch = (value) => {
  let result;
  if (value) {
    result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
  } else {
    result = [];
  }
  stringData.value = result;
};

const handleChange = (value_) => {
  console.log('onChange', value_);
  value.value = value_;
};
</script>

