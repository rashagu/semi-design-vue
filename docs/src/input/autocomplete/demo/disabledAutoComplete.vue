<template>
  <div>
    <div>
      <AutoComplete
        :data="[1, 2, 3, 4]"
        placeholder="禁用下拉菜单"
        :style="{ width: '200px' }"
        :disabled="true"
      ></AutoComplete>
    </div>
  </div>
</template>

<script setup>
import { AutoComplete } from '@kousum/semi-ui-vue';
</script>

