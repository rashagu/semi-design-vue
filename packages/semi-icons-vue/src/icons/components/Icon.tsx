import {defineComponent, ref, h, onActivated, StyleValue, VNode} from 'vue'
import { BASE_CLASS_PREFIX } from '../env';
import cls from 'classnames';
import '../styles/icons.scss';

export type IconSize = 'inherit' | 'extra-small' | 'small' | 'default' | 'large' | 'extra-large';

export interface IconProps  {
  size?: IconSize,
  spin?: boolean,
  rotate?: number,
  prefixCls?: string,
  type?: string,
  className?: string,
  svg: VNode,
  style?: StyleValue,
}
export const vuePropsType = {
  size: String,
  spin: Boolean,
  rotate: Number,
  prefixCls: String,
  type: String,
  className: String,
  style: Object,
  svg: Object,
}

const Icon = defineComponent<IconProps>((props, {slots}) => {
  const { spin = false, rotate, style, className, prefixCls = BASE_CLASS_PREFIX, type, size = 'default', ...restProps } = props;
  const classes = cls(`${prefixCls}-icon`, {
    [`${prefixCls}-icon-extra-small`]: size === 'extra-small', // 8x8
    [`${prefixCls}-icon-small`]: size === 'small', // 12x12
    [`${prefixCls}-icon-default`]: size === 'default', // 16x16
    [`${prefixCls}-icon-large`]: size === 'large', // 20x20
    [`${prefixCls}-icon-extra-large`]: size === 'extra-large', // 24x24
    [`${prefixCls}-icon-spinning`]: spin,
    [`${prefixCls}-icon-${type}`]: Boolean(type)
  }, className);
  const outerStyle: StyleValue = {
  };
  if (Number.isSafeInteger(rotate)) {
    outerStyle.transform = `rotate(${rotate}deg)`;
  }
  Object.assign(outerStyle, style);


  return ()=> <span role="img" ref={ref} class={classes} style={outerStyle}>{slots.default ? slots.default() : null}</span>;

})

Icon.props = vuePropsType



// @ts-ignore used to judge whether it is a semi-icon in semi-ui
// custom icon case
Icon.elementType = 'Icon';

export interface convertIconType extends IconProps{
  svg:any,
  iconType:string
}
const ConvertIcon = defineComponent<convertIconType>((props, {slots}) => {

  onActivated(() => {

  })

  return () => (
    <Icon type={props.iconType} ref={ref as any} {...props} >
      {{
        default:()=>slots.default ? slots.default() : null,
      }}
    </Icon>
  )
})
ConvertIcon.props = {
  ...vuePropsType,
  svg:Object,
  iconType: String,
}

export { ConvertIcon };
export default Icon
