import {defineComponent, ref, h, Fragment, CSSProperties, ComponentObjectPropsOptions, PropType} from 'vue'
import cls from 'classnames';
import {strings, cssClasses} from '@douyinfe/semi-foundation/space/constants';
import '@douyinfe/semi-foundation/space/space.scss';
import {isString, isArray, isNumber} from 'lodash';
import {flatten} from './utils';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';

const prefixCls = cssClasses.PREFIX;

export type Align = 'start' | 'center' | 'end' | 'baseline';
export type Spacing = 'loose' | 'medium' | 'tight' | number;

export type SpaceProps = {
  wrap?: boolean;
  align?: Align;
  vertical?: boolean;
  spacing?: Spacing | Spacing[];
  style?: CSSProperties;
  className?: string;
};

export const vuePropsType:ComponentObjectPropsOptions<SpaceProps> = {
  wrap: {
    type: Boolean,
    default: false
  },
  align: {
    type: String as PropType<SpaceProps['align']>,
    default: 'center',
  },
  vertical: {
    type: Boolean,
    default: false
  },
  spacing: {
    type: [Number, Array, String] as PropType<SpaceProps['spacing']>,
    default: 'tight',
  },
  style: [String, Object] as PropType<SpaceProps['style']>,
  className: String,
}
const Index = defineComponent((props, {slots}) => {


  return ()=>{


    const {
      style,
      className,
      spacing,
      wrap,
      align,
      vertical
    } = props;
    const isWrap = wrap && vertical ? false : wrap;
    const realStyle:CSSProperties = { ...style };
    let spacingHorizontalType = '';
    let spacingVerticalType = '';
    if (isString(spacing)) {
      spacingHorizontalType = spacing;
      spacingVerticalType = spacing;
    } else if (isNumber(spacing)) {
      realStyle.rowGap = spacing + 'px';
      realStyle.columnGap = spacing + 'px';
    } else if (isArray(spacing)) {
      if (isString(spacing[0])) {
        spacingHorizontalType = spacing[0];
      } else if (isNumber(spacing[0])) {
        realStyle.columnGap = `${spacing[0]}px`;
      }
      if (isString(spacing[1])) {
        spacingVerticalType = spacing[1];
      } else if (isNumber(spacing[1])) {
        realStyle.rowGap = `${spacing[1]}px`;
      }
    }
    const classNames = cls(prefixCls, className, {
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-vertical`]: vertical,
      [`${prefixCls}-horizontal`]: !vertical,
      [`${prefixCls}-wrap`]: isWrap,
      [`${prefixCls}-tight-horizontal`]: spacingHorizontalType === strings.SPACING_TIGHT,
      [`${prefixCls}-tight-vertical`]: spacingVerticalType === strings.SPACING_TIGHT,
      [`${prefixCls}-medium-horizontal`]: spacingHorizontalType === strings.SPACING_MEDIUM,
      [`${prefixCls}-medium-vertical`]: spacingVerticalType === strings.SPACING_MEDIUM,
      [`${prefixCls}-loose-horizontal`]: spacingHorizontalType === strings.SPACING_LOOSE,
      [`${prefixCls}-loose-vertical`]: spacingVerticalType === strings.SPACING_LOOSE,
    });
    const childrenNodes = slots.default?flatten(slots.default()):null;
    const dataAttributes = getDataAttr(props);
    return <div {...dataAttributes} class={classNames} style={realStyle} x-semi-prop="children">
      {childrenNodes}
    </div>
  };
}, {
  props: vuePropsType,
  name: 'Space'
})



export default Index

