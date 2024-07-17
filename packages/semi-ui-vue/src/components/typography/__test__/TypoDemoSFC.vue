<script setup lang="ts">
import { ref } from 'vue';
import Numeral from '../numeral';


interface Props {
  msg?: any,
}

defineOptions({name: 'TypoDemoSFC'})
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  change: [id: number] // named tuple syntax
  update: [value: string]
}>();

const count = ref(0);

</script>
<template>
  <Numeral :precision="1">
    <p>点赞量：1.6111e1 K</p>
  </Numeral>
</template>

<style scoped lang="scss">
</style>
