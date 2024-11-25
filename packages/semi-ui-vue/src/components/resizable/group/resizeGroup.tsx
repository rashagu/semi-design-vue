import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizeGroupFoundation, ResizeGroupAdapter } from '@douyinfe/semi-foundation/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import { ResizeContext, type ResizeContextProps } from './resizeContext';
import { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/resizable/types';
import '@douyinfe/semi-foundation/resizable/resizable.scss';
import {
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  Ref,
  ref,
  useSlots,
  useTemplateRef,
  VNode, watch,
} from 'vue';
import { CombineProps } from '../../interface';
import { vuePropsMake } from '../../PropTypes';
import { useBaseComponent } from '../../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;

export interface ResizeGroupProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export interface ResizeGroupState {
  isResizing: boolean;
  originalPosition: {
    x: number;
    y: number;
    lastItemSize: number;
    nextItemSize: number;
    lastOffset: number;
    nextOffset: number;
  };
  backgroundStyle: CSSProperties;
  curHandler: number;
  contextValue: ResizeContextProps
}

const propTypes: CombineProps<ResizeGroupProps> = {
  className: String,
  direction: {
    type: String as PropType<ResizeGroupProps['direction']>,
    required: false
  },
};

const defaultProps: Partial<ResizeGroupProps> = {
  direction: 'horizontal',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const ResizeGroup = defineComponent({
  props: { ...vuePropsType },
  name: 'ResizeGroup',
  setup(props, { attrs }) {
    const slots = useSlots();
    const state = reactive<ResizeGroupState>({
      isResizing: false,
      originalPosition: {
        x: 0,
        y: 0,
        lastItemSize: 0,
        nextItemSize: 0,
        lastOffset: 0,
        nextOffset: 0,
      },
      backgroundStyle: {
        cursor: 'auto',
      },
      curHandler: null,
      contextValue: {
        direction: props.direction,
        registerItem: registerItem,
        registerHandler: registerHandler,
        notifyResizeStart: ()=>{}, //
        getGroupSize: getGroupSize,
      },
    });

    const groupRef = ref();

    let groupSize: number;
    let availableSize: number;
    const itemRefs: Map<number, Ref<HTMLDivElement>> = new Map();
    let itemMinMap: Map<number, string> = new Map();
    let itemMaxMap: Map<number, string> = new Map();
    let itemMinusMap: Map<number, number> = new Map();
    let itemDefaultSizeList: Map<number, (string|number)> = new Map();
    let itemResizeStart: Map<number, ResizeStartCallback> = new Map();
    let itemResizing: Map<number, ResizeCallback> = new Map();
    let itemResizeEnd: Map<number, ResizeCallback> = new Map();
    const handlerRefs: Map<number, Ref<HTMLDivElement>> = new Map();

    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): ResizeGroupAdapter<ResizeGroupProps, ResizeGroupState> {
      return {
        ...adapterInject(),
        getGroupRef: () => groupRef.value,
        getItem: (id: number) => itemRefs.get(id).value,
        getItemCount: () => itemRefs.size,
        getHandler: (id: number) => handlerRefs.get(id).value,
        getHandlerCount: () => handlerRefs.size,
        getItemMin: (index) => {
          return itemMinMap.get(index);
        },
        getItemMax: (index) => {
          return itemMaxMap.get(index);
        },
        getItemChange: (index) => {
          return itemResizing.get(index);
        },
        getItemEnd: (index) => {
          return itemResizeEnd.get(index);
        },
        getItemStart: (index) => {
          return itemResizeStart.get(index);
        },
        getItemDefaultSize: (index) => {
          return itemDefaultSizeList.get(index);
        },
        registerEvents: registerEvent,
        unregisterEvents: unregisterEvent,
      };
    }
    const adapter = adapter_();
    const foundation = new ResizeGroupFoundation(adapter);
    state.contextValue.notifyResizeStart = foundation.onResizeStart;

    onMounted(() => {
      foundation.init();
      // 监听窗口大小变化，保证一些限制仍生效
      window.addEventListener('resize', foundation.ensureConstraint);

    });
    watch([
      ()=>props.direction,
    ], (v, [prevPropsDirection])=>{
      // 支持动态调整伸缩direction
      if (props.direction !== prevPropsDirection) {
        state.contextValue = {
          ...state.contextValue, // 保留其他上下文值
          direction: props.direction,
        }
        foundation.direction = props.direction;
      }
    })

    onUnmounted(() => {
      foundation.destroy();
      window.removeEventListener('resize', foundation.ensureConstraint);

    });

    function window_(): Window | null {
      return (groupRef.value.ownerDocument.defaultView as Window) ?? null;
    }

    function registerEvent() {
      if (window_) {
        window_().addEventListener('mousemove', foundation.onResizing);
        window_().addEventListener('mouseup', foundation.onResizeEnd);
        window_().addEventListener('mouseleave', foundation.onResizeEnd);
      }
    };

    function unregisterEvent() {
      if (window_) {
        window_().removeEventListener('mousemove', foundation.onResizing);
        window_().removeEventListener('mouseup', foundation.onResizeEnd);
        window_().removeEventListener('mouseleave', foundation.onResizeEnd);
      }
    };

    function registerItem (
      ref: Ref<HTMLDivElement>,
      min: string,
      max: string,
      defaultSize: string | number,
      onResizeStart: ResizeStartCallback,
      onChange: ResizeCallback,
      onResizeEnd: ResizeCallback
    ) {
      if (Array.from(itemRefs.values()).some(r => r === ref)) {
        return -1;
      }
      let index = itemRefs.size;
      itemRefs.set(index, ref);
      itemMinMap.set(index, min);
      itemMaxMap.set(index, max);
      itemDefaultSizeList.set(index, defaultSize);
      itemResizeStart.set(index, onResizeStart);
      itemResizing.set(index, onChange);
      itemResizeEnd.set(index, onResizeEnd);
      return index;
    };

    function registerHandler(ref: Ref<HTMLDivElement>) {
      if (Array.from(handlerRefs.values()).some(r => r === ref)) {
        return -1;
      }
      let index = handlerRefs.size;
      handlerRefs.set(index, ref);
      return index;
    };

    function getGroupSize() {
      return groupSize;
    }

    const contextValue: ResizeContextProps = {
      direction: props.direction,
      registerItem: registerItem,
      registerHandler: registerHandler,
      notifyResizeStart: foundation.onResizeStart,
      getGroupSize: getGroupSize,
    };

    return () => {
      const { direction, className, ...rest } = props;
      return (
        <ResizeContext.Provider value={state.contextValue}>
          <div
            style={{
              flexDirection: direction === 'vertical' ? 'column' : 'row',
            }}
            ref={groupRef}
            class={classNames(className, prefixCls + '-group')}
            {...rest}
          >
            {state.isResizing && <div style={state.backgroundStyle} class={classNames(className, prefixCls + '-background')}/>}
            {slots.default?.()}
          </div>
        </ResizeContext.Provider>
      );
    };
  },
});

export default ResizeGroup;
