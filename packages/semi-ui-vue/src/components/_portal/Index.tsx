import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  CSSProperties,
  onBeforeMount,
  onMounted,
  watch,
  onUnmounted,
  Teleport
} from 'vue'
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';

import classnames from 'classnames';
import ConfigContext from '../configProvider/Context';
import '@douyinfe/semi-foundation/_portal/portal.scss';

export interface PortalProps {
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
  getPopupContainer?: () => HTMLElement;
  didUpdate?: (props: PortalProps) => void;
}

export interface PortalState {
  container: undefined | HTMLElement;
}

const defaultGetContainer = () => document.body;

export const vuePropsType = {
  name: String,
  children: Object,
  style: [Object, String],
  prefixCls: {
    type:String,
    default:`${BASE_CLASS_PREFIX}-portal`
  },
  className: String,
  getPopupContainer: Function,
  didUpdate: Function,
}

const Index = defineComponent<PortalProps>((props, {slots}) => {
  const contextType = ConfigContext;
  const context = ConfigContext
  let el: HTMLElement;
  const containerRef = ref(undefined);
  onBeforeMount(()=>{
    try {
      el = document.createElement('div');
    } catch (e) {
    }
  })

  onMounted(()=>{

    if (!el) {
      el = document.createElement('div');
    }

    const getContainer = props.getPopupContainer || context.getPopupContainer || defaultGetContainer;
    const container = getContainer();
    // console.log(container)
    if (container !== containerRef.value) {
      // const computedStyle = window.getComputedStyle(container);
      // if (computedStyle.position !== 'relative') {
      //    container.style.position = 'relative';
      // }
      container.appendChild(el);
      addStyle(props.style);
      addClass(props.prefixCls, props.className);
      containerRef.value = container;
    }
  })
  watch(()=>props, (newProps,prevProps)=>{
    const { didUpdate } = props;
    if (didUpdate) {
      didUpdate(prevProps);
    }
  })
  onUnmounted(()=>{
    if (containerRef.value) {
      containerRef.value.removeChild(el);
    }
  })

  const addStyle = (style:any = {}) => {
    if (el) {
      for (const key of Object.keys(style)) {
        // @ts-ignore
        el.style[key] = style[key];
      }
    }
  };
  const addClass = (prefixCls: string, ...classNames: string[]) => {
    const { direction } = context;
    const cls = classnames(prefixCls, ...classNames, {
      [`${prefixCls}-rtl`]: direction === 'rtl'
    });
    if (el) {
      el.className = cls;
    }
  };

  return () => {
    if (containerRef.value) {
      return  (
        <Teleport to={el}>
          {{
            default:()=> slots.default?slots.default():null,
          }}
        </Teleport>
      )
    }
    return null;
  }
})

Index.props = vuePropsType

export default Index

