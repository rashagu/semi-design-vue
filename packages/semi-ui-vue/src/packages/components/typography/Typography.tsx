import {defineComponent, ref, h, Fragment, CSSProperties, Ref} from 'vue'
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/typography/constants';
import '@douyinfe/semi-foundation/typography/typography.scss';
import { BaseProps } from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
interface TypographyProps extends BaseProps{
  component?: any;
  forwardRef?: Ref<any>;
  style?: CSSProperties
  className?: string
}

export const vuePropsType = {
  component: {
    type: [Object,String,Array],
    default: 'article'
  },
  style: [String, Object],
  className: String,
  forwardRef: Object,
}
const Typography = defineComponent<TypographyProps>((props, {slots}) => {


  const { component, className, children, forwardRef, ...rest } = props;
  const Component = component;
  const classNames = cls(prefixCls, className);
  return ()=>(
    <Component
      className={classNames}
      ref={forwardRef}
      {...rest}
    >
      {slots.default?slots.default():null}
    </Component>
  );
})

Typography.props = vuePropsType

export default Typography

