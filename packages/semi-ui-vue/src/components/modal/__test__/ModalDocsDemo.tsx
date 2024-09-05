
import { defineComponent } from 'vue';
import {ModalClass as Modal} from '../Modal';
import Button from '../../button';
import ConfigProvider from '../../configProvider';



const Demo = defineComponent(()=>{

  let a
  const [modal, contextHolder] = Modal.useModal();
  const config = { title: 'This is a success message', content: <div>
      'Context consumer'

      <Button onClick={()=>{
        a.update({title: 'a'})
      }}> de</Button>
    </div> };

  return ()=>(
    <ConfigProvider direction={'rtl'}>
      <div>
        <Button
          onClick={() => {
            a = modal.confirm(config);
          }}
        >
          Confirm Modal
        </Button>
      </div>
      {contextHolder.value}
    </ConfigProvider>
  );
})
export default Demo
