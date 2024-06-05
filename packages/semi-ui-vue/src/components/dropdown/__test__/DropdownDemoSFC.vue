<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import { DropdownItem, DropdownMenu, Dropdown, Button } from '../../index';

defineOptions({});

interface Props {
  msg?: any,
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>();

const count = ref(0);
const list = ref([
])
onMounted(()=>{

  setTimeout(()=>{
    list.value = [
      '1',
      '2',
    ]
  }, 3000)
})

</script>
<script lang="ts">
export default {
  name: 'DropdownDemoSFC',
};
</script>
<template>
  <Dropdown
    :render="h(DropdownMenu, {}, () => list.map((item, index) => {
      return h(DropdownItem, {key: index}, ()=>item)
    }))"
  >
    <Button>Hover Me</Button>
  </Dropdown>
</template>

<style scoped>
</style>
