import {defineComponent, ref, h, onActivated, Fragment} from 'vue'
import classnames from 'classnames';

import { cssClasses } from '@douyinfe/semi-foundation/dropdown/constants';
import { BaseProps } from '../_base/baseComponent';



const prefixCls = cssClasses.PREFIX;

export interface DropdownDividerProps extends BaseProps {


}


export const vuePropsType = {
  style: Object,
  className: String,
}
const DropdownDivider = defineComponent<DropdownDividerProps>((props, {slots}) => {

  const { style, className } = props;
  return ()=> <div class={classnames(`${prefixCls}-divider`, className)} style={style}/>;
}, {
  props:vuePropsType,
  name:'DropdownDivider'
})


export default DropdownDivider

