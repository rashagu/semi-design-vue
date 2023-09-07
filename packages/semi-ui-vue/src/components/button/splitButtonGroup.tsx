import {defineComponent, ref, h, onActivated, Fragment, StyleValue, ComponentObjectPropsOptions, onMounted} from 'vue'
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
  const containerRef = ref()



  onMounted(()=>{
    if (containerRef.value) {
      const buttons = containerRef.value.querySelectorAll('button');
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];
      firstButton?.classList.add(`${prefixCls}-first`);
      lastButton?.classList.add(`${prefixCls}-last`);
    }
  })

  return ()=>(
    <div ref={containerRef} class={cls} style={style} role="group"
         aria-label={props['aria-label']}>
      {slots.default?slots.default():null}
    </div>
  );
}, {
  props: vuePropsType,
  name: 'SplitButtonGroup'
})


export default SplitButtonGroup

