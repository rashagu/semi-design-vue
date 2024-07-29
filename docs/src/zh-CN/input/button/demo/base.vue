<script setup lang="ts">
import { Button } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="btn-margin-right">
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </div>
</template>

<style scoped>
.btn-margin-right button{
  margin-right: 10px;
}
</style>
