<template>
  <AutoComplete
    :loading="loading"
    :data="data"
    :empty-content="emptyContent"
    placeholder="自定义空内容"
    :style="{ width: '200px' }"
    @search="fetchData"
  />
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import { AutoComplete, Empty } from '@kousum/semi-ui-vue';
import { IllustrationNoContent } from '@kousum/semi-illustrations-vue';

const data = ref([]);
const loading = ref(false);

const fetchData = (v) => {
  loading.value = true;
  setTimeout(() => {
    if (!v) {
      data.value = [];
      loading.value = false;
      return;
    }
    data.value = Array.from(Array(5)).map((c) => Math.random());
    loading.value = false;
  }, 1000);
};

const emptyContent = () => (
  <Empty
    style={{ padding: '12px', width: '300px' }}
    image={<IllustrationNoContent style={{ width: '150px', height: '150px' }} />}
    description={'暂无内容'}
  />
);

onMounted(() => {
  fetchData('');
});
</script>

<style scoped></style>
