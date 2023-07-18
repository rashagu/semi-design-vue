import type {
  CollapsibleAdapter,
  CollapsibleFoundationProps,
  CollapsibleFoundationState,
} from '@douyinfe/semi-foundation/collapsible/foundation';
import CollapsibleFoundation from '@douyinfe/semi-foundation/collapsible/foundation';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/collapsible/constants';
import { isEqual } from 'lodash';
import '@douyinfe/semi-foundation/collapsible/collapsible.scss';
import {
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted, PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { PreviewImageProps } from '../image';
import {ComponentObjectPropsOptions} from "vue/dist/vue";

interface CollapsibleProps extends CollapsibleFoundationProps {
  motion?: boolean;
  children?: VNode[];
  isOpen?: boolean;
  duration?: number;
  keepDOM?: boolean;
  className?: string;
  style?: CSSProperties;
  collapseHeight?: number;
  reCalcKey?: number | string;
  id?: string;
  onMotionEnd?: () => void;
}

interface CollapsibleState extends CollapsibleFoundationState {
  domInRenderTree: boolean;
  domHeight: number;
  visible: boolean;
  isTransitioning: boolean;
}
const propTypes:ComponentObjectPropsOptions<CollapsibleProps> = {
  motion: PropTypes.bool,
  children: PropTypes.node as PropType<any>,
  isOpen: PropTypes.bool,
  duration: PropTypes.number,
  keepDOM: PropTypes.bool,
  collapseHeight: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  reCalcKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const defaultProps = {
  isOpen: false,
  duration: 250,
  motion: true,
  keepDOM: false,
  collapseHeight: 0,
  fade: false,
};
export const vuePropsType = vuePropsMake<CollapsibleProps>(propTypes, defaultProps);
const Collapsible = defineComponent<CollapsibleProps>((props, {}) => {
  const slots = useSlots();

  const domRef = ref();
  let resizeObserver: ResizeObserver | null;

  const state = reactive<CollapsibleState>({
    domInRenderTree: false,
    domHeight: 0,
    visible: props.isOpen,
    isTransitioning: false,
  });
  const { adapter: adapterInject, getDataAttr } = useBaseComponent<CollapsibleProps>(props, state);
  function adapter_(): CollapsibleAdapter<CollapsibleProps, CollapsibleState> {
    return {
      ...adapterInject(),
      setDOMInRenderTree: (domInRenderTree) => {
        if (state.domInRenderTree !== domInRenderTree) {
          state.domInRenderTree = domInRenderTree;
        }
      },
      setDOMHeight: (domHeight) => {
        if (state.domHeight !== domHeight) {
          state.domHeight = domHeight;
        }
      },
      setVisible: (visible) => {
        if (state.visible !== visible) {
          state.visible = visible;
        }
      },
      setIsTransitioning: (isTransitioning) => {
        if (state.isTransitioning !== isTransitioning) {
          state.isTransitioning = isTransitioning;
        }
      },
    };
  }

  const adapter = adapter_();
  const foundation = new CollapsibleFoundation(adapter);
  const getEntryInfo = (entry: ResizeObserverEntry) => {
    //judge whether parent or self display none
    let inRenderTree: boolean;
    if (entry.borderBoxSize) {
      inRenderTree = !(entry.borderBoxSize[0].blockSize === 0 && entry.borderBoxSize[0].inlineSize === 0);
    } else {
      inRenderTree = !(entry.contentRect.height === 0 && entry.contentRect.width === 0);
    }

    let height = 0;
    if (entry.borderBoxSize) {
      height = Math.ceil(entry.borderBoxSize[0].blockSize);
    } else {
      const target = entry.target as HTMLElement;
      height = target.clientHeight;
    }

    return {
      isShown: inRenderTree,
      height,
    };
  };

  onMounted(() => {
    // super.componentDidMount();
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(domRef.value);
    const domInRenderTree = isChildrenInRenderTree();
    foundation.updateDOMInRenderTree(domInRenderTree);
    if (domInRenderTree) {
      foundation.updateDOMHeight(domRef.value.scrollHeight);
    }
  });

  watch(
    () => props.reCalcKey,
    (value, oldValue, onCleanup) => {
      foundation.updateDOMHeight(domRef.value.scrollHeight);
    }
  );
  watch(
    () => state.domInRenderTree,
    (value, oldValue, onCleanup) => {
      if (state.domInRenderTree) {
        foundation.updateDOMHeight(domRef.value.scrollHeight);
      }
    }
  );
  watch(
    () => props.isOpen,
    (value, oldValue, onCleanup) => {
      if (props.isOpen || !props.motion) {
        foundation.updateVisible(props.isOpen);
      }
    }
  );

  watch([() => props.isOpen, () => props.motion], (value, oldValue, onCleanup) => {
    if (props.motion && oldValue[0] !== props.isOpen) {
      foundation.updateIsTransitioning(true);
    }
  });

  onBeforeUnmount(() => {
    // super.componentWillUnmount();
    resizeObserver.disconnect();
  });

  const handleResize = (entryList: ResizeObserverEntry[]) => {
    const entry = entryList[0];
    if (entry) {
      const entryInfo = getEntryInfo(entry);
      foundation.updateDOMHeight(entryInfo.height);
      foundation.updateDOMInRenderTree(entryInfo.isShown);
    }
  };

  const isChildrenInRenderTree = () => {
    if (domRef.value) {
      return domRef.value.offsetHeight > 0;
    } else {
      return false;
    }
  };

  return () => {
    const wrapperStyle: CSSProperties = {
      overflow: 'hidden',
      height: (props.isOpen ? state.domHeight : props.collapseHeight) + 'px',
      opacity: props.isOpen || !props.fade || props.collapseHeight !== 0 ? 1 : 0,
      transitionDuration: `${props.motion && state.isTransitioning ? props.duration : 0}ms`,
      ...props.style,
    };
    const wrapperCls = cls(
      `${cssClasses.PREFIX}-wrapper`,
      {
        [`${cssClasses.PREFIX}-transition`]: props.motion && state.isTransitioning,
      },
      props.className
    );

    return (
      <div
        class={wrapperCls}
        style={wrapperStyle}
        onTransitionend={() => {
          if (!props.isOpen) {
            foundation.updateVisible(false);
          }
          foundation.updateIsTransitioning(false);
          props.onMotionEnd?.();
        }}
        {...getDataAttr()}
      >
        <div
          x-semi-prop="children"
          ref={domRef}
          style={{ overflow: 'hidden' }}
          id={props.id}
        >
          {
            (props.keepDOM || props.collapseHeight !== 0 || state.visible || props.isOpen) && props.children
          }
        </div>
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'Collapsible'
});


export default Collapsible;
