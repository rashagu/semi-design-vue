<script setup lang="ts">
import { h, ref } from 'vue';
import Tabs from '../index';
import TabPane from '../TabPane';
import Button from '../../button/Button';

defineOptions({});

interface Props {
  msg?: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void;
}>();

const count = ref(0);
</script>
<script lang="ts">
export default {
  name: 'TabsDemo3VueSFC',
};
</script>
<template>
  <div>
    <Tabs>
      <TabPane :tab="h('span', { role: 'symbol' }, 'symbol0')" itemKey="0">
        <div>symbol0</div>
      </TabPane>
      <TabPane
        v-for="item in [1, 2, 3]"
        :key="item"
        :tab="h('span', { role: 'symbol' }, 'symbol' + item)"
        :itemKey="''+item"
      >
        <div>symbol0</div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped></style>
