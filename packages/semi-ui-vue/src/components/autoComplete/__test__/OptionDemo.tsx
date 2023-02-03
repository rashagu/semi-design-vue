import {defineComponent, ref, h, Fragment, useSlots} from "vue";
import Option from "../option";
import {StateOptionItem} from "@douyinfe/semi-foundation/autoComplete/foundation";

interface OptionDemoProps {
  name?: string;
}

export const vuePropsType = {
  name: String,
};
const OptionDemo = defineComponent<OptionDemoProps>((props, {}) => {
  const slots = useSlots();

  const option = { key: '16753935370932', label: 's@qq.com', show: true, value: 's@qq.com' };
  return ()=>(<div>
    <Option
      showTick={false}
      onSelect={(v: StateOptionItem, e: MouseEvent | KeyboardEvent) => {}}
      onMouseEnter={() => {}}
      key={option.key}
      {...option}
    >
      {option.label}
    </Option>
  </div>)
});

OptionDemo.props = vuePropsType;
OptionDemo.name = "OptionDemo";

export default OptionDemo;
