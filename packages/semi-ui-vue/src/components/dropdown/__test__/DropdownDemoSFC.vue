<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import DropdownItem from '../dropdownItem';
import DropdownMenu from '../dropdownMenu';
import { Dropdown } from '../index';
import Button from '../../button';


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
