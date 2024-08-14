import {defineComponent, ref, h, onActivated, StyleValue, VNode, ComponentObjectPropsOptions, PropType} from 'vue'
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
  svg?: VNode,
  style?: StyleValue,
  onClick?:(e:any)=>void,
  role?: string
  tabIndex?: number
  onKeypress?: (e:any)=>void
}
export const vuePropsType:ComponentObjectPropsOptions<IconProps> = {
  size: String as PropType<IconSize>,
  spin: Boolean,
  rotate: Number,
  prefixCls: String,
  type: String,
  className: String,
  style: Object,
  svg: Object,
  onClick:Function as PropType<IconProps['onClick']>,
  role: String,
  tabIndex: Number,
  onKeypress: Function as PropType<IconProps['onKeypress']>,
}

const Icon = defineComponent<IconProps>((props, {slots}) => {
  return ()=> {
    const { svg, spin = false, rotate, style, className, prefixCls = BASE_CLASS_PREFIX, type, size = 'default', ...restProps } = props;
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
    return <span
      role="img"
      class={classes}
      style={outerStyle}
      {...restProps}
    >
    {slots.default ? slots.default() : svg}
  </span>
  };

}, {
  props: vuePropsType,
  name: 'Icon',
})


export interface convertIconType extends IconProps{
  svg:any,
  iconType:string
}
const ConvertIcon = defineComponent<convertIconType>((props, {slots}) => {

  onActivated(() => {

  })

  return () => {
    const propsUn = {}
    Object.keys(props).forEach(key=>{
      // @ts-ignore
      if (props[key]){
        // @ts-ignore
        propsUn[key] = props[key]
      }
    })
    return (
      <Icon type={props.iconType} ref={ref as any} {...propsUn} >
        {{
          default:()=>slots.default ? slots.default() : null,
        }}
      </Icon>
    )
  }
},{
  props: {
    ...vuePropsType,
    svg:Object,
    iconType: String,
  } as any,
  name: 'ConvertIcon'
})


export { ConvertIcon };
export default Icon
