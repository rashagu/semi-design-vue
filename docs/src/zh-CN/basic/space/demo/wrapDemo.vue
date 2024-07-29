<template>
  <Space wrap>
    <Button
      v-for="(item, index) in new Array(10).fill(null)"
      :key="index"
      theme="solid"
      type="secondary"
    >
      按钮
    </Button>
  </Space>
</template>

<script setup>
import { Space, Button } from '@kousum/semi-ui-vue';
</script>
