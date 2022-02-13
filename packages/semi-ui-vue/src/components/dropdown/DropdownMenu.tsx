import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/dropdown/constants';

import BaseComponent, { BaseProps } from '../_base/BaseComponent';

const prefixCls = cssClasses.PREFIX;
export type DropdownMenuProps = BaseProps;


export const vuePropsType = {
  style: Object,
  className: String,
}
const DropdownMenu = defineComponent<DropdownMenuProps>((props, {slots}) => {
  const { className, style, ...rest } = props;
  return ()=>(
    <ul {...rest} class={classnames(`${prefixCls}-menu`, className)} style={style}>
      {slots.default?slots.default():null}
    </ul>
  );
})

DropdownMenu.props = vuePropsType

export default DropdownMenu

