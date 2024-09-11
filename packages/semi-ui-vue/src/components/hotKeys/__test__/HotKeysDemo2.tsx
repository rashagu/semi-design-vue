import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import HotKeys, { vuePropsType } from '../index';
import Modal from '../../modal';

interface HotKeysDemoProps {
  name?: string;
}

const HotKeysDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'HotKeysDemo',
  setup(props, { attrs }) {
    const slots = useSlots();
    const visible = ref(false);
    const showDialog = () => {
      visible.value = (true);
    };
    const handleOk = () => {
      visible.value = (false);
    };
    const handleCancel = () => {
      visible.value = (false);
    };
    const hotKeys = [HotKeys.Keys.Control, 'Shift', HotKeys.Keys.A]


    return () => {

      return (
        <div>
          <HotKeys hotKeys={hotKeys} onHotKey={showDialog} ></HotKeys>
          <Modal
            title="Dialog"
            visible={visible.value}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            This is the Modal opened by hotkey: {hotKeys.join('+')}.
          </Modal>
        </div>
      );
    };
  },
});


export default HotKeysDemo;

