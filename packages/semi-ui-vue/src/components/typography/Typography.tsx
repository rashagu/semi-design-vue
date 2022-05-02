import {defineComponent, ref, h, Fragment, CSSProperties, Ref} from 'vue'
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/typography/constants';
import '@douyinfe/semi-foundation/typography/typography.scss';
import { BaseProps } from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
interface TypographyProps extends BaseProps{
  component_?: any;
  forwardRef?: Ref<any>;
  style?: CSSProperties
  className?: string
}

export const vuePropsType = {
  component_: {
    component_: [String, Array, Boolean, Object,Number],
    default: 'article'
  },
  style: [String, Object],
  className: String,
  forwardRef: Object,
}
const Typography = defineComponent<TypographyProps>((props, {slots}) => {


  const { component_, className, children, forwardRef, ...rest } = props;
  const classNames = cls(prefixCls, className);
  // console.debug(component_,{class:classNames,ref:forwardRef,...rest})
  return ()=>{
    const children = slots.default?slots.default():null
    // console.log(children)
    return component_?h(component_, {class:classNames,ref:forwardRef,...rest}, children):<span />
  };
})

Typography.props = vuePropsType

export default Typography

