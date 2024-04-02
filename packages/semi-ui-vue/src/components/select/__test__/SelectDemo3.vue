<script setup lang="ts">
import { ref } from 'vue';
import Select from '../index';
import SelectOptionGroup from '../optionGroup';
import SelectOption from '../option';

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

</script>
<script lang="ts">
export default {
  name: 'SelectDemo3',
};
</script>
<template>
  <div>
    <Select :style="{ width: '300px' }" placeholder="带搜索功能的多选">
      <SelectOptionGroup label="Europe">
        <SelectOption v-for="item in ['a', 'b']" :key="item" :value="item">{{item}}</SelectOption>
      </SelectOptionGroup>
      <SelectOptionGroup label="South America">
        <SelectOption value="c-1">Peru</SelectOption>
      </SelectOptionGroup>
    </Select>
  </div>
</template>

<style scoped>
</style>
