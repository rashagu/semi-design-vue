import { defineComponent, ref, h, onActivated, Fragment } from 'vue';

import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/dropdown/constants';

import { BaseProps } from '../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;
export type DropdownMenuProps = BaseProps;

export const vuePropsType = {
  style: Object,
  className: String,
};
const DropdownMenu = defineComponent({
  props: vuePropsType,
  name: 'DropdownMenu',
  setup(props, { slots }) {
    const { className, style, ...rest } = props;
    return () => (
      <ul {...rest} class={classnames(`${prefixCls}-menu`, className)} style={style}>
        {slots.default ? slots.default() : null}
      </ul>
    );
  },
});

export default DropdownMenu;
