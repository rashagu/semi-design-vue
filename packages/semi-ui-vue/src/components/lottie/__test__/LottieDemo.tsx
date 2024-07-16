import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import Lottie from '../index';


const LottieDemo = defineComponent({
  name: 'LottieDemo',
  setup(props, { attrs }) {
    const slots = useSlots();

    const jsonURL = "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/lottie_demo.json";

    return () => {
      return  <div>
        <Lottie params={{ path: jsonURL }} width={"300px"} />
      </div>;
    };
  },
});


export default LottieDemo;

