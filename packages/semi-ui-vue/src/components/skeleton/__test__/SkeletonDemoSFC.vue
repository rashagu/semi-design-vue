<script setup lang="ts">
import Skeleton from '../index';
import placeholder from './placeholder.vue';
import { Button } from '../../index';
import { h } from 'vue';

</script>

<template>
  <Skeleton :placeholder="h(placeholder)" :loading="true" :style="{ textAlign: 'center' }">
    <div :style="{ textAlign: 'center' }">
      <p>Hi, Bytedance dance dance.</p>
      <p>Hi, Bytedance dance dance.</p>
      <Button>Button</Button>
    </div>
  </Skeleton>
</template>

<style scoped></style>
