/**
 * Implementation reference from: https://github.com/ant-design/ant-design/blob/master/components/grid/col.tsx
 */
import {defineComponent, ref, h, Fragment, CSSProperties} from 'vue'
import PropTypes from 'prop-types';
// import { RowContext } from './row';
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/grid/constants';

const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);


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
  children?: any;
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  xxl?: number | ColSize;
}


export const vuePropsType = {
  name: String,
  span:{
    type:Number,
    default: PropTypes.number
  },
  order:{
    type:Number,
    default: PropTypes.number
  },
  offset:{
    type:Number,
    default: PropTypes.number
  },
  push:{
    type:Number,
    default: PropTypes.number
  },
  pull:{
    type:Number,
    default: PropTypes.number
  },
  className:{
    type:String,
    default: PropTypes.string
  },
  prefixCls:{
    type:String,
    default: PropTypes.string
  },
  style: [Object, String,],
  children: [Object,Array,String,Number],
  xs: {
    type: [Number, Object],
    default: objectOrNumber,
  },
  sm: {
    type: [Number, Object],
    default: objectOrNumber,
  },
  md: {
    type: [Number, Object],
    default: objectOrNumber,
  },
  lg: {
    type: [Number, Object],
    default: objectOrNumber,
  },
  xl: {
    type: [Number, Object],
    default: objectOrNumber,
  },
  xxl: {
    type: [Number, Object],
    default: objectOrNumber,
  },
}
const Col = defineComponent<ColProps>((props, {slots}) => {
  const { prefixCls, span, order, offset, push, pull, className, children, ...others } = props;

  let sizeClassObj = {};
  const prefix = `${prefixCls}-col`;

  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
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
  let gutters:any = [];
  try {
    // gutters = this.context.gutters;
  } catch (error) {
    throw new Error('please make sure <Col> inside <Row>');
  }

  style = {
    ...(gutters[0] > 0 ?
      {
        paddingLeft: gutters[0] / 2,
        paddingRight: gutters[0] / 2,
      } :
      {}),
    ...(gutters[1] > 0 ?
      {
        paddingTop: gutters[1] / 2,
        paddingBottom: gutters[1] / 2,
      } :
      {}),
    ...style,
  };

  return () => (
    <div>
      Col
    </div>
  )
})

Col.props = vuePropsType

export default Col

