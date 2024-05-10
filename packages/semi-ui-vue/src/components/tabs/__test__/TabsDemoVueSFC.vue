<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '../index';
import TabPane from '../TabPane';
import Button from '../../button/Button';

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
  name: 'TabsDemoVueSFC',
};
</script>
<template>
  <div>
    <Tabs>
      <TabPane tab="1fdsdsdsdsddsdsdsdsd5656f23" itemKey="1">
        <Button>sdssdfdfsfsfd</Button>
      </TabPane>
      <TabPane tab="23dfddsdf44" itemKey="2">
        2123sdsd
      </TabPane>
      <TabPane tab="25344444t" itemKey="3">
        <Button>sdserd</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped>
</style>
