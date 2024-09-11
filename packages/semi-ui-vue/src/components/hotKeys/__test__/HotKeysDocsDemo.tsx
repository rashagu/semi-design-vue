
import { defineComponent, ref } from 'vue';
import Input from '../../input';
import HotKeys from '../index';
import Modal from '../../modal';

const Demo = defineComponent(()=>{
  const hotKeys = ["Control", "q"]
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

  const inputRef = ref(null);
  return () => (
    <div>
      <Input ref={inputRef} placeholder='test for target'></Input>
      <HotKeys hotKeys={hotKeys} onHotKey={showDialog}
               getListenerTarget={() => {
                 console.log(inputRef.value, inputRef.value?.getDom());
                 return inputRef.value?.getDom()
               }}>
      </HotKeys>
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
})

export default Demo
