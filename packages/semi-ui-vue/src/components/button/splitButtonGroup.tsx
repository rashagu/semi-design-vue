import {defineComponent, ref, h, onActivated, Fragment, StyleValue, ComponentObjectPropsOptions} from 'vue'
import classNames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/button/constants';
import '@douyinfe/semi-foundation/button/button.scss';
import { BaseProps } from '../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;


// eslint-disable-next-line
export interface SplitButtonGroupProps extends BaseProps {}

export const vuePropsType:ComponentObjectPropsOptions<SplitButtonGroupProps> = {
  style: Object,
  className: String,
}
const SplitButtonGroup = defineComponent<SplitButtonGroupProps>((props, {slots}) => {
  const { style, className } = props;
  const cls = classNames(`${prefixCls}-split`, className);
  return ()=>(
    <div class={cls} style={style}>
      {slots.default?slots.default():null}
    </div>
  );
}, {
  props: vuePropsType,
  name: 'SplitButtonGroup'
})


export default SplitButtonGroup

