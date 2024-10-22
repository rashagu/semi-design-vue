import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizeGroupFoundation, ResizeGroupAdapter } from '@douyinfe/semi-foundation/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import { ResizeContext, type ResizeContextProps } from './resizeContext';
import { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/resizable/singleConstants';
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
  VNode,
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
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        cursor: 'auto',
        opacity: 0,
        position: 'fixed',
        zIndex: 9999,
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
      },
      curHandler: null,
    });

    const groupRef = ref();

    let groupSize: number;
    let availableSize: number;
    const itemRefs: Ref<HTMLDivElement>[] = [];
    let itemMinMap: Map<number, string> = new Map();
    let itemMaxMap: Map<number, string> = new Map();
    let itemMinusMap: Map<number, number> = new Map();
    let itemDefaultSizeList: (string | number)[] = [];
    let itemResizeStart: Map<number, ResizeStartCallback> = new Map();
    let itemResizing: Map<number, ResizeCallback> = new Map();
    let itemResizeEnd: Map<number, ResizeCallback> = new Map();
    const handlerRefs: Ref<HTMLDivElement>[] = [];

    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): ResizeGroupAdapter<ResizeGroupProps, ResizeGroupState> {
      return {
        ...adapterInject(),
        getGroupRef: () => groupRef.value,
        getItem: (id: number) => itemRefs[id].value,
        getItemCount: () => itemRefs.length,
        getHandler: (id: number) => handlerRefs[id].value,
        getHandlerCount: () => handlerRefs.length,
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
          return itemDefaultSizeList[index];
        },
        registerEvents: registerEvent,
        unregisterEvents: unregisterEvent,
      };
    }
    const adapter = adapter_();
    const foundation = new ResizeGroupFoundation(adapter);

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    function window(): Window | null {
      return (groupRef.value.ownerDocument.defaultView as Window) ?? null;
    }

    function registerEvent() {
      if (window) {
        window().addEventListener('mousemove', foundation.onResizing);
        window().addEventListener('mouseup', foundation.onResizeEnd);
        window().addEventListener('mouseleave', foundation.onResizeEnd);
      }
    };

    function unregisterEvent() {
      if (window) {
        window().removeEventListener('mousemove', foundation.onResizing);
        window().removeEventListener('mouseup', foundation.onResizeEnd);
        window().removeEventListener('mouseleave', foundation.onResizeEnd);
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
      itemRefs.push(ref);
      let index = itemRefs.length - 1;
      itemMinMap.set(index, min);
      itemMaxMap.set(index, max);
      itemDefaultSizeList.push(defaultSize);
      itemResizeStart.set(index, onResizeStart);
      itemResizing.set(index, onChange);
      itemResizeEnd.set(index, onResizeEnd);
      return index;
    };

    const registerHandler = (ref: Ref<HTMLDivElement>) => {
      handlerRefs.push(ref);
      return handlerRefs.length - 1;
    };

    const getGroupSize = () => {
      return groupSize;
    };

    const contextValue = {
      direction: props.direction,
      registerItem: registerItem,
      registerHandler: registerHandler,
      notifyResizeStart: foundation.onResizeStart,
      getGroupSize: getGroupSize,
    };

    return () => {
      const { direction, className, ...rest } = props;
      return (
        <ResizeContext.Provider value={contextValue}>
          <div
            style={{
              flexDirection: direction === 'vertical' ? 'column' : 'row',
            }}
            ref={groupRef}
            class={classNames(className, prefixCls + '-group')}
            {...rest}
          >
            {state.isResizing && <div style={state.backgroundStyle} />}
            {slots.default?.()}
          </div>
        </ResizeContext.Provider>
      );
    };
  },
});

export default ResizeGroup;
