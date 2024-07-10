import { defineComponent, ref, h, Fragment, VNode, CSSProperties, ComponentObjectPropsOptions, PropType } from 'vue';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/select/constants';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { CombineProps } from '../interface';

export interface OptionGroupProps {
  children?: string | number | VNode | VNode[];
  label?: string | number | VNode | VNode[];
  className?: string;
  style?: CSSProperties;
}
const prefixCls = cssClasses.PREFIX_GROUP;

export const vuePropsType: CombineProps<OptionGroupProps> = {
  label: [String, Number, Object, Array],
  children: [String, Number, Object, Array],
  className: String,
  style: [String, Object] as PropType<OptionGroupProps['style']>,
};
const OptionGroup = defineComponent({
  props: vuePropsType,
  name: 'isSelectOptionGroup',
  setup(props, { slots, attrs }) {
    return () => {
      const { label, className, style, ...rest } = props;
      const groupCls = cls(className, {
        [prefixCls]: true,
      });
      if (!label && typeof label !== 'number') {
        return null;
      }
      return (
        <div class={groupCls} style={style} {...getDataAttr(attrs)}>
          {label}
        </div>
      );
    };
  },
});

export default OptionGroup;
