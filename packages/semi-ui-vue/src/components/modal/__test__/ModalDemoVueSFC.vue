<script setup lang="ts">
import { h, ref, useSlots } from 'vue';
import Button from '../../button';
import Modal from '../index';

defineOptions({ name: 'ModalDemoVueSFC' });

interface Props {
  msg?: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void;
}>();

const count = ref(0);

const slots = useSlots();
const visible = ref(false);
function setVisible(val) {
  visible.value = val;
}
const showDialog = () => {
  setVisible(true);
};
const handleOk = () => {
  setVisible(false);
  console.log('Ok button clicked');
};
const handleCancel = () => {
  setVisible(false);
  console.log('Cancel button clicked');
};
const handleAfterClose = () => {
  console.log('After Close callback executed');
};

const vv = ref('content');

const popupContainer = ref();
</script>
<script lang="ts">
export default {
  name: 'ModalDemoVueSFC',
};
</script>
<template>
  <div>
    <div>
      <Button @click="showDialog" role="bt">打开弹窗</Button>
      <Modal
        :title="() => '基本对话框'"
        :header="() => h('div', '基本对话框')"
        :visible="visible"
        @ok="handleOk"
        :afterClose="handleAfterClose"
        @cancel="handleCancel"
        :closeOnEsc="true"
        :footer="() => h('div', {}, [h(Button, {}, () => '确定')])"
      >
        <Button @click="() => (vv = 'qweqwe')">test</Button>
        This is the content of a basic modal.
        <br />
        More content...
      </Modal>
    </div>
  </div>
</template>

<style scoped></style>
