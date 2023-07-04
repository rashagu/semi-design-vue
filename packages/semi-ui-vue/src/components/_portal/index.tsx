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
  Teleport, reactive, PropType
} from 'vue'
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';

import classnames from 'classnames';
import '@douyinfe/semi-foundation/_portal/portal.scss';
import {useConfigContext} from "../configProvider/context/Consumer";
import type {ComponentObjectPropsOptions} from "vue";

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

export const vuePropsType:ComponentObjectPropsOptions<PortalProps> = {
  style: [Object, String] as PropType<PortalProps['style']>,
  prefixCls: {
    type:String,
    default:`${BASE_CLASS_PREFIX}-portal`
  },
  className: String,
  getPopupContainer: Function as PropType<PortalProps['getPopupContainer']>,
  didUpdate: Function as PropType<PortalProps['didUpdate']>,
}

const Index = defineComponent<PortalProps>((props, {slots}) => {
  const {context} = useConfigContext()
  let el: HTMLElement;
  const state = reactive({
    container: undefined
  })
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

    const getContainer = props.getPopupContainer || context.value.getPopupContainer || defaultGetContainer;
    const container = getContainer();
    // console.log(container)
    if (container !== state.container) {
      // const computedStyle = window.getComputedStyle(container);
      // if (computedStyle.position !== 'relative') {
      //    container.style.position = 'relative';
      // }
      container.appendChild(el);
      addStyle(props.style);
      addClass(props.prefixCls, props.className);
      state.container = container;
    }
  })
  watch(()=>props, (newProps,prevProps)=>{
    const { didUpdate } = props;
    if (didUpdate) {
      didUpdate(prevProps);
    }
  })
  onUnmounted(()=>{
    if (state.container) {
      state.container.removeChild(el);
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
    const { direction } = context.value;
    const cls = classnames(prefixCls, ...classNames, {
      [`${prefixCls}-rtl`]: direction === 'rtl'
    });
    if (el) {
      el.className = cls;
    }
  };

  return () => {
    if (state.container) {
      return  (
        <Teleport to={el}>
          {{
            default: slots.default,
          }}
        </Teleport>
      )
    }
    return null;
  }
}, {
  props: vuePropsType,
  name: 'Portal'
})


export default Index

