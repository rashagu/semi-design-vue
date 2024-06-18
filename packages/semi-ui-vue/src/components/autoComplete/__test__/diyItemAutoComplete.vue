<template>
  <AutoComplete
    :data="data"
    show-clear
    :prefix="h(IconSearch)"
    @search="handleStringSearch"
    placeholder="搜索... "
    :render-item="renderOption"
    :render-selected-item="(option) => option.email"
    style="width: 280px"
  />
</template>

<script setup lang="tsx">
import { ref, computed, h } from 'vue';
import { AutoCompleteFunc, Avatar } from '../../index';
import { IconSearch } from '@kousum/semi-icons-vue';
const AutoComplete = AutoCompleteFunc<{ name: string; email: string; abbr: string; color: string }>();
const color = ['amber', 'indigo', 'cyan'];
const data = ref([
  { name: '夏可漫', email: 'xiakeman@example.com', abbr: 'XK', color: 'amber' },
  { name: '申悦', email: 'shenyue@example.com', abbr: 'SY', color: 'indigo' },
  { name: '曲晨一', email: 'quchenyi@example.com', abbr: 'CY', color: 'blue' },
  { name: '文嘉茂', email: 'wenjiamao@example.com', abbr: 'JM', color: 'cyan' },
]);
const value = ref('');

const handleStringSearch = (value) => {
  let result;
  if (value) {
    result = data.value.map((item) => {
      return { ...item, value: item.name, label: item.email };
    });
  } else {
    result = [];
  }
  data.value = result;
};

const renderOption = (item: any) => {
  let optionStyle = {
    display: 'flex',
  };
  return (
    <>
      <Avatar color={item.color} size="small">
        {item.abbr}
      </Avatar>
      <div style={{ marginLeft: '4px' }}>
        <div style={{ fontSize: '14px', marginLeft: '4px' }}>{item.name}</div>
        <div style={{ marginLeft: '4px' }}>{item.email}</div>
      </div>
    </>
  );
};
</script>

<style scoped></style>
