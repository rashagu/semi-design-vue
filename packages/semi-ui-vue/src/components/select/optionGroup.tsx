import {defineComponent, ref, h, Fragment, VNode, CSSProperties} from 'vue'
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/select/constants';

export interface OptionGroupProps {
  children?: string | number | VNode | VNode[];
  label?: string | number | VNode | VNode[];
  className?: string;
  style?: CSSProperties;
}
const prefixCls = cssClasses.PREFIX_GROUP;


export const vuePropsType = {
  label: [String, Number, Object, Array],
  children: [String, Number, Object, Array],
  className: String,
  style: [String, Object],
}
const OptionGroup = defineComponent<OptionGroupProps>({
  name:'isSelectOptionGroup',
  setup:(props, {slots}) => {
    return () => {
      const { label, className, style } = props;
      const groupCls = cls(className, {
        [prefixCls]: true,
      });
      if (!label && typeof label !== 'number') {
        return null;
      }
      return (
        <div class={groupCls} style={style}>
          {label}
        </div>
      );
    }
  }
})

OptionGroup.props = vuePropsType

export default OptionGroup

