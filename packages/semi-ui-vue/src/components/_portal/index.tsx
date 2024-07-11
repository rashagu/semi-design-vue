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
  Teleport,
  reactive,
  PropType,
  onBeforeUnmount,
} from 'vue';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';

import classnames from 'classnames';
import '@douyinfe/semi-foundation/_portal/portal.scss';
import { useConfigContext } from '../configProvider/context/Consumer';
import type { ComponentObjectPropsOptions } from 'vue';
import { ContextValue } from '../configProvider/context';
import { CombineProps } from '../interface';

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

export const vuePropsType: CombineProps<PortalProps> = {
  style: [Object, String] as PropType<PortalProps['style']>,
  prefixCls: {
    type: String,
    default: `${BASE_CLASS_PREFIX}-portal`,
  },
  className: String,
  getPopupContainer: Function as PropType<PortalProps['getPopupContainer']>,
  didUpdate: Function as PropType<PortalProps['didUpdate']>,
};

const Index = defineComponent({
  props: { ...vuePropsType },
  name: 'Portal',
  setup(props, { slots }) {
    const { context } = useConfigContext();
    let el: HTMLElement;
    const state = reactive({
      container: undefined,
    });
    // onBeforeMount(()=>{
    //   try {
    //     el = initContainer(context.value, true);
    //   } catch (e) {
    //   }
    // })

    onMounted(() => {
      const container = initContainer(context.value);
      if (container !== state.container) {
        state.container = container;
      }
    });
    function initContainer(context: ContextValue, catchError = false) {
      try {
        let container: HTMLElement | undefined = undefined;
        if (!el || !state.container || !Array.from(state.container.childNodes).includes(el)) {
          el = document.createElement('div');
          const getContainer = props.getPopupContainer || context.getPopupContainer || defaultGetContainer;
          const portalContainer = getContainer();
          portalContainer.appendChild(el);
          addStyle(props.style);
          addClass(props.prefixCls, context, props.className);
          container = portalContainer;
          return container;
        }
      } catch (e) {
        if (!catchError) {
          throw e;
        }
      }
      return state?.container;
    }

    watch(
      () => props,
      (newProps, prevProps) => {
        const { didUpdate } = props;
        if (didUpdate) {
          didUpdate(prevProps);
        }
      }
    );
    onBeforeUnmount(() => {
      if (state.container) {
        state.container.removeChild(el);
      }
    });

    const addStyle = (style: any = {}) => {
      if (el) {
        for (const key of Object.keys(style)) {
          // @ts-ignore
          el.style[key] = style[key];
        }
      }
    };
    const addClass = (prefixCls: string, context_ = context.value, ...classNames: string[]) => {
      const { direction } = context_;
      const cls = classnames(prefixCls, ...classNames, {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      });
      if (el) {
        el.className = cls;
      }
    };

    return () => {
      if (state.container) {
        return (
          <Teleport to={el}>
            {{
              default: slots.default,
            }}
          </Teleport>
        );
      }
      return null;
    };
  },
});

export default Index;
