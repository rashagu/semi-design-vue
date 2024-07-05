/**
 * Implementation reference from: https://github.com/ant-design/ant-design/blob/master/components/grid/col.tsx
 */
import { defineComponent, ref, h, Fragment, CSSProperties, inject, ComponentObjectPropsOptions, PropType } from 'vue';
// import { RowContext } from './row';
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/grid/constants';

export interface ColSize {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
}

export interface ColProps {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
  className?: string;
  prefixCls?: string;
  style?: CSSProperties;
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  xxl?: number | ColSize;
}

export const vuePropsType: ComponentObjectPropsOptions<ColProps> = {
  span: Number,
  order: Number,
  offset: Number,
  push: Number,
  pull: Number,
  className: String,
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX,
  },
  style: [Object, String] as PropType<ColProps['style']>,
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object],
  xxl: [Number, Object],
};
const Col = defineComponent({
  props: vuePropsType,
  name: 'Col',
  setup(props, { slots }) {
    return () => {
      const { prefixCls, span, order, offset, push, pull, className, ...others } = props;

      let sizeClassObj = {};
      const prefix = `${prefixCls}-col`;

      ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
        let sizeProps: ColSize = {};
        if (typeof props[size] === 'number') {
          sizeProps.span = props[size];
        } else if (typeof props[size] === 'object') {
          sizeProps = props[size] || {};
        }

        delete others[size];

        sizeClassObj = {
          ...sizeClassObj,
          [`${prefix}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
          [`${prefix}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
          [`${prefix}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
          [`${prefix}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
          [`${prefix}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
        };
      });

      const classes = classnames(
        prefix,
        {
          [`${prefix}-${span}`]: span !== undefined,
          [`${prefix}-order-${order}`]: order,
          [`${prefix}-offset-${offset}`]: offset,
          [`${prefix}-push-${push}`]: push,
          [`${prefix}-pull-${pull}`]: pull,
        },
        className,
        sizeClassObj
      );
      let { style } = others;
      const gutters = inject('gutters', []);
      // console.log(gutters)

      style = {
        ...(gutters[0] > 0
          ? {
              paddingLeft: gutters[0] / 2 + 'px',
              paddingRight: gutters[0] / 2 + 'px',
            }
          : {}),
        ...(gutters[1] > 0
          ? {
              paddingTop: gutters[1] / 2 + 'px',
              paddingBottom: gutters[1] / 2 + 'px',
            }
          : {}),
        ...style,
      };

      // console.log(style)
      return (
        <div {...others} style={style} class={classes}>
          {slots.default ? slots.default() : null}
        </div>
      );
    };
  },
});

export default Col;
