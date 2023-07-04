import {
  defineComponent,
  ref,
  h,
  Fragment,
  CSSProperties,
  reactive,
  onMounted,
  onUnmounted,
  provide,
  PropType
} from 'vue'
import classnames from 'classnames';

import {cssClasses} from '@douyinfe/semi-foundation/grid/constants';
import '@douyinfe/semi-foundation/grid/grid.scss';
import {registerMediaQuery} from '../_utils/index';
import {ComponentObjectPropsOptions} from "vue/dist/vue";

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const RowContext: { gutters: Gutter | [Gutter, Gutter] } = null;

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type Gutter = number | Partial<Record<Breakpoint, number>>;

export interface RowProps {
  type?: 'flex';
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  className?: string;
  style?: CSSProperties;
  gutter?: Gutter | [Gutter, Gutter];
  prefixCls?: string;
}

export interface RowState {
  screens: Partial<Record<Breakpoint, boolean>>;
}

const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};


export const vuePropsType:ComponentObjectPropsOptions<RowProps> = {
  type: String as PropType<RowProps['type']>,
  align: String as PropType<RowProps['align']>,
  justify: String as PropType<RowProps['justify']>,
  className: String,
  style: [String, Object] as PropType<RowProps['style']>,
  gutter: [Number],
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX
  },
}
const Row = defineComponent<RowProps>((props, {slots}) => {


  const RowContext = {
    prefixCls: cssClasses.PREFIX,
  };

  const state = reactive({
    screens: {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
    }
  })

  let unRegisters: Array<() => void> = [];

  onMounted(() => {
    unRegisters = Object.keys(responsiveMap).map(screen => registerMediaQuery(responsiveMap[screen], {
      match: () => {
        if (typeof props.gutter !== 'object') {
          return;
        }
        state.screens[screen] = true
      },
      unmatch: () => {
        if (typeof props.gutter !== 'object') {
          return;
        }
        state.screens[screen] = true
      },
    }));
  })

  onUnmounted(() => {
    unRegisters.forEach(unRegister => unRegister());
  })

  function getGutter() {
    const {gutter = 0} = props;
    const results: [number, number] = [0, 0];
    const normalizedGutter = Array.isArray(gutter) ? gutter.slice(0, 2) : [gutter, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i];
          if (state.screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  }

  provide('gutters', getGutter())

  return () => {

    const {prefixCls, type, justify, align, className, style, ...others} = props;
    const gutters = getGutter();

    const prefix = `${prefixCls}-row`;

    const classes = classnames(
      {
        [prefix]: type !== 'flex',
        [`${prefix}-${type}`]: type,
        [`${prefix}-${type}-${justify}`]: type && justify,
        [`${prefix}-${type}-${align}`]: type && align,
      },
      className
    );
    const rowStyle = {
      ...(gutters[0] > 0 ?
        {
          marginLeft: gutters[0] / -2,
          marginRight: gutters[0] / -2,
        } :
        {}),
      ...(gutters[1] > 0 ?
        {
          marginTop: gutters[1] / -2,
          marginBottom: gutters[1] / -2,
        } :
        {}),
      ...style,
    };

    const otherProps = {...others};
    delete otherProps.gutter;
    return (
      <div {...otherProps} class={classes} style={rowStyle}>
        {slots.default ? slots.default() : null}
      </div>
    );
  }
}, {
  props: vuePropsType,
  name:'Row'
})


export default Row

