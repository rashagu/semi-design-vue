import { defineComponent, ref, h, onActivated, Fragment, inject, ComponentObjectPropsOptions, PropType } from 'vue';

import { cssClasses } from '@douyinfe/semi-foundation/dropdown/constants';
import cls from 'classnames';
import { BaseProps } from '../_base/baseComponent';
import { DropdownContext } from './context';
import { useDropdownContext } from './context/Consumer';

const prefixCls = cssClasses.PREFIX;
export type DropdownTitleProps = BaseProps;

export const vuePropsType: ComponentObjectPropsOptions<Required<DropdownTitleProps>> = {
  style: [Object, String] as PropType<DropdownTitleProps['style']>,
  className: String,
};
const DropdownTitle = defineComponent({
  props: vuePropsType,
  name: 'DropdownTitle',
  setup(props, { slots }) {
    const { context } = useDropdownContext();
    return () => {
      const { className, style } = props;
      const titleCls = cls(
        {
          [`${prefixCls}-title`]: true,
          [`${prefixCls}-title-withTick`]: context.value.showTick,
        },
        className
      );
      return (
        <div class={titleCls} style={style}>
          {slots.default ? slots.default() : null}
        </div>
      );
    };
  },
});

export default DropdownTitle;
