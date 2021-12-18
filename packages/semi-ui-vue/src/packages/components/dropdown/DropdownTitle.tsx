import {defineComponent, ref, h, onActivated, Fragment, inject} from 'vue'
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/dropdown/constants';
import cls from 'classnames';
import { BaseProps } from '../_base/baseComponent';
import {DropdownContext} from "./context";

const prefixCls = cssClasses.PREFIX;
export type DropdownTitleProps = BaseProps;


export const vuePropsType = {
  name: String
}
const DropdownTitle = defineComponent<DropdownTitleProps>((props, {slots}) => {
  const { className, style,  } = props;
  const { showTick } = inject('DropdownContext', DropdownContext);
  const titleCls = cls({
    [`${prefixCls}-title`]: true,
    [`${prefixCls}-title-withTick`]: showTick,
  }, className);
  return (
    <div class={titleCls} style={style}>
      {slots.default?slots.default():null}
    </div>
  );
})

DropdownTitle.props = vuePropsType

export default DropdownTitle

