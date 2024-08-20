import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import { Form } from '../index';

interface FormSlotDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<FormSlotDemoProps> = {
  name: String,
};
const FormSlotDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'FormSlotDemo',
  setup(props, { attrs }) {
    const slots = useSlots();


    return () => (
      <Form
        onChange={v=>console.log(v)}
        onSubmit={v=>console.log(v)}
        style={{ width: 600 }}
        labelPosition='left'
        labelWidth={100}
      >
        <Form.Input field='特效名称' style={{ width: 250 }}/>
        <Form.Slot label={{ text: 'SlotA' }} error='我是SlotA的ErrorMessage'>
          <div style={{ display: 'flex', alignItems: 'center', height: 32, marginTop: 8 }}>
            我是Semi Form SlotA, 我是自定义的ReactNode
          </div>
        </Form.Slot>
        <Form.Slot label={{ text: 'SlotB', width: 160, align: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            我是Semi Form SlotB, 我的Label Align、Width与众不同
          </div>
        </Form.Slot>
      </Form>
    );
  },
});


export default FormSlotDemo;

