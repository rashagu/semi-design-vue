<template>
  <AutoComplete
    :data="list"
    style="width: 250px"
    :prefix="h(IconSearch)"
    @search="search"
    :loading="loading"
    :renderItem="renderItem"
    :renderSelectedItem="renderSelectedItem"
    @select="handleSelect"
  ></AutoComplete>
</template>

<script setup lang="tsx">
import { ref, reactive, onMounted, h } from 'vue';
import { AutoComplete } from '@kousum/semi-ui-vue';
import { IconSearch } from '@kousum/semi-icons-vue';
import { IconSelect, IconForm, IconTable, IconInput, IconButton } from '@kousum/semi-icons-lab-vue';
import lodash from 'lodash';


let initList = [
  { value: 'select', label: '选择器', icon: h(IconSelect) },
  { value: 'input', label: '输入框', icon: h(IconInput) },
  { value: 'form', label: '表单', icon: h(IconForm) },
  { value: 'button', label: '按钮', icon: h(IconButton) },
  { value: 'table', label: '表格', icon: h(IconTable) },
];

const loading = ref(false);
const list = ref(initList);

const handleSearch = (inputValue) => {
  loading.value = true;
  let newList = initList;
  if (inputValue) {
    newList = list.value.filter(item => item.value.includes(inputValue));
  }
  setTimeout(() => {
    list.value = newList;
    loading.value = false;
  }, 1000);
};

const search = lodash.debounce(handleSearch, 200);

const handleSelect = (value) => {
  console.log(value);
};

const renderItem = (item) => {
  return (
    <div style="display: flex; align-items: center;">
      <div style="font-size: 32px">{item.icon}</div>
      <div style="margin-left: 12px;">
        <p>{item.value}</p>
        <p>{item.label}</p>
      </div>
    </div>
  );
};

const renderSelectedItem = (item) => {
  // 注意：与其他组件如Select不同，此处只能返回String类型的值，不能返回ReactNode
  return item.value;
};
</script>
