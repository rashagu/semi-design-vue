<script setup lang="ts">
import {ref} from 'vue'

defineOptions({})

interface Props {
  svg?: string,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>()

const count = ref(0)

</script>
<script lang="ts">
export default {
  name: 'InlineSvg'
}
</script>
<template>
  <span v-html="svg"></span>
</template>

<style scoped>
</style>
