<script setup lang="ts">
import Skeleton, {SkeletonParagraph, SkeletonButton} from '../index';
import { CSSProperties } from 'vue';
const style:CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  marginBottom: '10px',
};
</script>

<template>
  <div :style="style" >
    <SkeletonParagraph :style="style" :rows="3" />
    <SkeletonButton />
  </div>
</template>

<style scoped>

</style>
