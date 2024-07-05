import {defineComponent, ref, h, Fragment, useSlots} from "vue";
import Spin from "../index";

interface SpinDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const SpinDemo = defineComponent((props, {}) => {
  const slots = useSlots();

  return () => <div>
    <div style={{ marginLeft: '30px' }}>
      <div style={{ marginBottom: '10px' }}>A basic spin.</div>
      <Spin />
    </div>
  </div>;
});




export default SpinDemo;
