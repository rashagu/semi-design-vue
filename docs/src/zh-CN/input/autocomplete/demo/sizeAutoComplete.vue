<template>
  <div>
    <div>
      <AutoComplete
        :data="[1, 2, 3, 4]"
        size="small"
        placeholder="small"
        :style="{ width: '200px' }"
      ></AutoComplete>
      <br />
      <br />
      <AutoComplete
        :data="[1, 2, 3, 4]"
        size="default"
        placeholder="default"
        :style="{ width: '200px' }"
      ></AutoComplete>
      <br />
      <br />
      <AutoComplete
        :data="[1, 2, 3, 4]"
        size="large"
        placeholder="large"
        :style="{ width: '200px' }"
      ></AutoComplete>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { AutoComplete } from '@kousum/semi-ui-vue';
</script>

