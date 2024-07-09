import { defineComponent, ref, h, Fragment, CSSProperties, Ref, ComponentObjectPropsOptions, PropType } from 'vue';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/typography/constants';
import '@douyinfe/semi-foundation/typography/typography.scss';
import { BaseProps } from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
interface TypographyProps extends BaseProps {
  component_?: any;
  forwardRef?: Ref<any>;
  style?: CSSProperties;
  className?: string;
}

export const vuePropsType: ComponentObjectPropsOptions<Required<TypographyProps>> = {
  component_: {
    type: [String, Array, Boolean, Object, Number] as PropType<TypographyProps['component_']>,
    default: 'article',
  },
  style: [String, Object] as PropType<TypographyProps['style']>,
  className: String,
  forwardRef: Object,
};
const Typography = defineComponent({
  props: vuePropsType,
  name: 'Typography',
  setup(props, { slots }) {
    return () => {
      const { component_, className, forwardRef, ...rest } = props;
      const classNames = cls(prefixCls, className);
      const children = slots.default ? slots.default() : null;
      return h(component_, { class: classNames, ref: forwardRef, ...rest }, children);
    };
  },
});

export default Typography;
