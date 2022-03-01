import {defineComponent, ref, h, Fragment, CSSProperties, onMounted, inject} from 'vue'
import cls from 'classnames';
import {cssClasses, strings} from '@douyinfe/semi-foundation/layout/constants';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import {registerMediaQuery} from '../_utils/index';
import LayoutContext from "./layoutContext";

export interface ResponsiveMap {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}


const responsiveMap: ResponsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

const generateId = ((): () => string => {
  let i = 0;
  return (): string => {
    i += 1;
    return `${cssClasses.PREFIX}-sider-${i}`;
  };
})();

const bpt = strings.BREAKPOINT;

export interface SiderProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  breakpoint?: Array<keyof ResponsiveMap>;
  onBreakpoint?: (screen: keyof ResponsiveMap, match: boolean) => void;
  'aria-label'?: string;
  'role'?: string
}


export const vuePropsType = {
  name: String,
  prefixCls: {
    type: String,
    default: cssClasses.PREFIX
  },
  style: [String, Object],
  className: String,
  breakpoint: Array,
  onBreakpoin: Function,
  'aria-label': String,
  'role': String,
}
const Sider = defineComponent<SiderProps>((props, {slots}) => {

  let unRegisters: Array<() => void> = [];
  const uniqueId = generateId();
  const context = inject<any>('LayoutContext', LayoutContext)

  onMounted(()=>{
    const { breakpoint } = props;
    const matchBpt: Array<keyof ResponsiveMap> = (Object.keys(responsiveMap) as (keyof ResponsiveMap)[]).filter((item) => breakpoint && breakpoint.indexOf(item) !== -1) as any;
    const unRegisters_ = matchBpt.map(screen => registerMediaQuery(responsiveMap[screen], {
      match: () => {
        responsiveHandler(screen, true);
      },
      unmatch: () => {
        responsiveHandler(screen, false);
      },
    }));
    unRegisters = unRegisters_;

    if (context.siderHook) {
      context.siderHook.addSider(uniqueId);
    }
  })

  function responsiveHandler(screen: keyof ResponsiveMap, matches: boolean): void {
    const { onBreakpoint } = props;
    if (onBreakpoint) {
      onBreakpoint(screen, matches);
    }
  }

  return () => {
    const { prefixCls, className, style, ...others } = props;
    const classString = cls(className, {
      [`${prefixCls}-sider`]: true,
    });
    return (
      <aside class={classString} aria-label={props['aria-label']} style={style} {...getDataAttr(others)}>
        <div class={`${prefixCls}-sider-children`}>
          {slots.default?slots.default():null}
        </div>
      </aside>
    );
  }
})

Sider.props = vuePropsType

export default Sider

