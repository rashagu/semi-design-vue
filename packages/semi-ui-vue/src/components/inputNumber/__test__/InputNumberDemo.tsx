import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import InputNumber from '../index';

interface InputNumberDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const InputNumberDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  const value = ref(1);
  return () => (
    <div>
      <div style={{ width: 280 }}>
        <label>简单数字输入框</label>
        <InputNumber
          value={value.value}
          onChange={(v) => {
            console.log(v);
            value.value = v as any;
          }}
          placeholder="请输入"
        />
        <br />
        <br />

        <label>设置了步长 step=2 </label>
        <InputNumber step={2} placeholder="请输入" />
        <br />
        <br />

        <label>设置 shiftStep=100， 按住 shift 同时点击按钮，可以一次增加/减少100 </label>
        <InputNumber shiftStep={100} placeholder="请输入" />
        <br />
        <br />

        <label>设置了上下界 min=1,max=10</label>
        <InputNumber min={1} max={10} defaultValue={1} />
        <br />
        <br />
      </div>
    </div>
  );
});

export default InputNumberDemo;
