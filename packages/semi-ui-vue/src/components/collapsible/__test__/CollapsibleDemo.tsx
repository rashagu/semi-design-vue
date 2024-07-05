import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Button from "../../button";
import Collapsible from "../index";

interface CollapsibleDemoProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CollapsibleDemo = defineComponent((props, {}) => {
  const slots = useSlots()

  const isOpen = ref();
  const toggle = () => {
    isOpen.value = !isOpen.value
  };
  const collapsed = (
    <ul>
      <li>
        <p>Semi Design 以内容优先进行设计。</p>
      </li>
      <li>
        <p>更容易地自定义主题。</p>
      </li>
      <li>
        <p>适用国际化场景。</p>
      </li>
      <li>
        <p>效率场景加入人性化关怀。</p>
      </li>
    </ul>
  );
  return () => {

    return (
      <div>
        <Button onClick={toggle}>Toggle</Button>
        <Collapsible isOpen={isOpen.value}>{collapsed}</Collapsible>
      </div>
    );
  }
})



export default CollapsibleDemo

