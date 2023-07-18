import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import {isEqual, omit, isNull, isUndefined, isFunction, get, debounce} from 'lodash';
import {cssClasses, strings, numbers} from '@douyinfe/semi-foundation/overflowList/constants';
import ResizeObserver, {ResizeEntry} from '../resizeObserver';
import IntersectionObserver from './intersectionObserver';

import OverflowListFoundation, {OverflowListAdapter} from '@douyinfe/semi-foundation/overflowList/foundation';

import '@douyinfe/semi-foundation/overflowList/overflowList.scss';
import {VueJsxNode} from "../interface";
import {
  cloneVNode, ComponentObjectPropsOptions,
  createVNode,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  isVNode, nextTick, PropType,
  reactive, shallowRef,
  useSlots,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {getProps, useBaseComponent} from "../_base/baseComponent";
import {AutoCompleteProps} from "../autoComplete";

const prefixCls = cssClasses.PREFIX;
const Boundary = strings.BOUNDARY_MAP;
const OverflowDirection = strings.OVERFLOW_DIR;
const RenderMode = strings.MODE_MAP;

export type {ReactIntersectionObserverProps} from './intersectionObserver';
export type OverflowItem = Record<string, any>;

type Key = string | number;

export interface OverflowListProps {
  className?: string;
  collapseFrom?: 'start' | 'end';
  items?: Array<OverflowItem>;
  minVisibleItems?: number;
  onIntersect?: (res: { [key: string]: IntersectionObserverEntry }) => void;
  onOverflow?: (overflowItems: Array<OverflowItem>) => void;
  overflowRenderer?: (overflowItems: Array<OverflowItem>) => VueJsxNode | VueJsxNode[];
  renderMode?: 'collapse' | 'scroll';
  style?: CSSProperties;
  threshold?: number;
  visibleItemRenderer?: (item: OverflowItem, index: number) => VueJsxNode;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  itemKey?: Key | ((item: OverflowItem) => Key)
}

export interface OverflowListState {
  direction?: typeof OverflowDirection.GROW;
  lastOverflowCount?: number;
  overflow?: Array<OverflowItem>;
  visible?: Array<OverflowItem>;
  visibleState?: Map<string, boolean>;
  prevProps?: OverflowListProps;
  itemSizeMap?: Map<Key, number>;
  containerWidth?: number;
  maxCount?: number;
  overflowStatus?: 'calculating' | 'overflowed' | 'normal';
  pivot?: number;
  overflowWidth?: number
}

// reference to https://github.com/palantir/blueprint/blob/1aa71605/packages/core/src/components/overflow-list/overflowList.tsx#L34
const defaultProps = {
  collapseFrom: 'end',
  minVisibleItems: 0,
  overflowRenderer: (): VueJsxNode => null,
  renderMode: 'collapse',
  threshold: 0.75,
  visibleItemRenderer: (): VueJsxNode => null,
  onOverflow: () => null,
};
const propTypes:ComponentObjectPropsOptions<OverflowListProps> = {
  // if render in scroll mode, key is required in items
  className: PropTypes.string,
  collapseFrom: PropTypes.string as PropType<OverflowListProps['collapseFrom']>,
  // direction: PropTypes.string as PropType<OverflowListProps['direction']>,
  items: PropTypes.array,
  minVisibleItems: PropTypes.number,
  onIntersect: PropTypes.func as PropType<OverflowListProps['onIntersect']>,
  onOverflow: PropTypes.func as PropType<OverflowListProps['onOverflow']>,
  overflowRenderer: PropTypes.func as PropType<OverflowListProps['overflowRenderer']>,
  renderMode: PropTypes.string as PropType<OverflowListProps['renderMode']>,
  style: PropTypes.object,
  threshold: PropTypes.number,
  visibleItemRenderer: PropTypes.func as PropType<OverflowListProps['visibleItemRenderer']>,
  wrapperClassName: PropTypes.string,
  wrapperStyle: PropTypes.object,
};
export const vuePropsType = vuePropsMake<OverflowListProps>(propTypes, defaultProps)
const OverflowList = defineComponent<OverflowListProps>((props, {}) => {
  const slots = useSlots()

  const state = reactive<OverflowListState>({
    direction: OverflowDirection.GROW,
    lastOverflowCount: 0,
    overflow: [],
    visible: [],
    containerWidth: 0,
    visibleState: new Map(),
    itemSizeMap: new Map(),
    overflowStatus: "calculating",
    pivot: 0,
    overflowWidth: 0,
    maxCount: 0,
  })

  function getDerivedStateFromProps(props: OverflowListProps): OverflowListState {
    const {prevProps} = state;
    const newState: OverflowListState = {};
    newState.prevProps = props;

    const needUpdate = (name: string): boolean => {
      return (!prevProps && name in getProps(props)) || (prevProps && !isEqual(prevProps[name], props[name]));
    };
    if (needUpdate('items') || needUpdate('style')) {
      // reset visible state if the above props change.
      newState.direction = OverflowDirection.GROW;
      newState.lastOverflowCount = 0;
      if (props.renderMode === RenderMode.SCROLL) {
        newState.visible = props.items;
        newState.overflow = [];
      } else {
        newState.visible = [];
        newState.overflow = [];
      }
      newState.pivot = 0;
      newState.maxCount = 0;
      newState.overflowStatus = "calculating";
    }
    return newState;
  }

  watch(() => props, (val) => {
    const newState = getDerivedStateFromProps(props)
    newState && Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }, {deep: true, immediate: true})

  const {adapter: adapterInject} = useBaseComponent<OverflowListProps>(props, state)

  function adapter_(): OverflowListAdapter {
    return {
      ...adapterInject(),
      updateVisibleState: (visibleState): void => {
        state.visibleState = visibleState
      },
      updateStates: (states): void => {
        states && Object.keys(states).forEach(key => {
          state[key] = states[key]
        })
      },
      notifyIntersect: (res): void => {
        props.onIntersect && props.onIntersect(res);
      },
      getItemSizeMap: () => {
        return itemSizeMap
      }
    };
  }

  const adapter = adapter_()

  const foundation = new OverflowListFoundation(adapter);


  let itemRefs: Record<string, any> = {};

  let scroller: HTMLDivElement = null;
  let spacer: HTMLDivElement = null;

  let previousWidths: Map<Element, number> = new Map();

  let itemSizeMap: Map<string, number> = new Map();




  const isScrollMode = (): boolean => {
    const {renderMode} = props;
    return renderMode === RenderMode.SCROLL;
  };

  const onItemResizeNum = shallowRef(0)

  watch([
    ()=>props.items,
    ()=>props.collapseFrom,
    ()=>state.overflow,
    ()=>state.containerWidth,
    ()=>state.visible,
    ()=>state.overflowStatus,
    ()=>onItemResizeNum.value
  ], (value, oldValue)=>{

    const prevItemsKeys = value[0].map((item) =>
      item.key
    );
    const nowItemsKeys = props.items.map((item) =>
      item.key
    );

    if (!isEqual(prevItemsKeys, nowItemsKeys)) {
      itemRefs = {};
      state.visibleState = new Map()
    }
    if (isScrollMode() || state.overflowStatus !== "calculating") {
      return;
    }
    if (state.visible.length === 0 && state.overflow.length === 0 && props.items.length !== 0) {
      // 推测container最多能渲染的数量
      // Figure out the maximum number of items in this container
      const maxCount = Math.min(props.items.length, Math.floor(state.containerWidth / numbers.MINIMUM_HTML_ELEMENT_WIDTH));
      // 如果collapseFrom是start, 第一次用来计算容量时，倒转列表顺序渲染
      // If collapseFrom === start, render item from end to start. Figuring out how many items in the end could fit in container.
      const isCollapseFromStart = props.collapseFrom === Boundary.START;
      const visible = isCollapseFromStart ? foundation.getReversedItems().slice(0, maxCount) : props.items.slice(0, maxCount);
      const overflow = isCollapseFromStart ? foundation.getReversedItems().slice(maxCount) : props.items.slice(maxCount);
      state.overflowStatus = 'calculating'
      state.visible = visible
      state.overflow = overflow
      state.maxCount = maxCount
      itemSizeMap.clear();
    } else {
      foundation.handleCollapseOverflow();
    }
  })




  const resize = (entries: Array<ResizeEntry> = []): void => {
    const containerWidth = entries[0]?.target.clientWidth;
    state.containerWidth = containerWidth
    state.overflowStatus = 'calculating'
  };

  const reintersect = (entries: Array<IntersectionObserverEntry>): void => {
    foundation.handleIntersect(entries);
  };

  const mergeRef = (ref: any, node: Element, key: Key): void => {
    itemRefs[key] = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (typeof ref === 'object' && ref && 'current' in ref) {
      ref.current = node;
    }
  };

  const renderOverflow = (): VueJsxNode => {
    const overflow = foundation.getOverflowItem();
    return props.overflowRenderer(overflow);
  };

  const getItemKey = (item, defalutKey?: Key) => {
    const {itemKey} = props;
    if (isFunction(itemKey)) {
      return itemKey(item);
    }
    return get(item, itemKey || 'key', defalutKey);
  }

  const renderItemList = () => {
    const {
      className,
      wrapperClassName,
      wrapperStyle,
      style,
      visibleItemRenderer,
      renderMode,
      collapseFrom
    } = props;

    const {visible, overflowStatus} = state;
    let overflow = renderOverflow();
    if (!isScrollMode()) {
      if (Array.isArray(overflow)) {
        overflow = (
          <Fragment>
            {overflow}
          </Fragment>
        );
      }
      if (isVNode(overflow)) {
        const child = cloneVNode(overflow);
        overflow = (<ResizeObserver
          onResize={([entry]) => {
            state.overflowWidth = entry.target.clientWidth
            state.overflowStatus = 'calculating'
          }}
        >
          <div class={`${prefixCls}-overflow`}>
            {child}
          </div>
        </ResizeObserver>);
      }
    }
    const inner =
      renderMode === RenderMode.SCROLL ?
        [
          overflow[0],
          <div
            class={cls(wrapperClassName, `${prefixCls}-scroll-wrapper`)}
            ref={(ref): void => {
              // @ts-ignore
              scroller = ref;
            }}
            style={{...wrapperStyle}}
            key={`${prefixCls}-scroll-wrapper`}
          >
            {visible.map(visibleItemRenderer).map((item: VueJsxNode) => {
              const {forwardRef, key} = item as any;
              return cloneVNode(item as any, {
                ref: (node: any) => mergeRef(forwardRef, node, key),
                'data-scrollkey': `${key}`,
                key,
              });
            })}
          </div>,
          overflow[1],
        ] :
        [
          collapseFrom === Boundary.START ? overflow : null,
          visible.map((item, idx) => {
            const {key} = item;
            const element = visibleItemRenderer(item, idx);
            const child = cloneVNode(element as any);
            return (
              <ResizeObserver
                key={key}
                onResize={([entry]) => onItemResize(entry, item, idx)}
              >
                {/* 用div包起来，可以直接在resize回调中拿到宽度，不用通过获取元素的padding, margin, border-width求和计算宽度*/}
                {/* This div wrap can get width directly rather than do the math of padding, margin, border-width*/}
                <div key={key} class={`${prefixCls}-item`}>
                  {child}
                </div>
              </ResizeObserver>);
          }),
          collapseFrom === Boundary.END ? overflow : null
        ];
    const list = createVNode(
      'div',
      {
        class: cls(`${prefixCls}`, className),
        style: {
          ...style,
          ...(renderMode === RenderMode.COLLAPSE ? {
            maxWidth: '100%',
            visibility: overflowStatus === "calculating" ? "hidden" : "visible",
          } : null)
        },
      },
      [...inner]
    );
    return list;
  };

  /**
   * 调用时机问题
   * onItemResize -> handleCollapseOverflow(拿到更新后的itemSizeMap)
   */
  const onItemResizeNum_ = debounce(()=>{
    onItemResizeNum.value++
  }, 10)

  const onItemResize = (entry: ResizeEntry, item: OverflowItem, idx: number) => {
    const key = getItemKey(item, idx);
    const width = itemSizeMap.get(key)
    if (!width) {
      itemSizeMap.set(key, entry.target.clientWidth);
    } else if (width !== entry.target.clientWidth) {
      // 某个item发生resize后，重新计算
      itemSizeMap.set(key, entry.target.clientWidth);
      state.overflowStatus = 'calculating'
    }
    const {maxCount} = state;
    // 已经按照最大值maxCount渲染完毕，触发真正的渲染。(-1 是overflow部分会占1)
    // Already rendered maxCount items, trigger the real rendering. (-1 for the overflow part)
    if (itemSizeMap.size === maxCount - 1) {
      state.overflowStatus = 'calculating'
    }
    onItemResizeNum_();
  }



  return () => {

    const list = renderItemList();
    const {renderMode} = props;
    if (renderMode === RenderMode.SCROLL) {
      return (
        <IntersectionObserver
          onIntersect={reintersect}
          root={scroller}
          threshold={props.threshold}
          items={itemRefs}
        >
          {list}
        </IntersectionObserver>
      );
    }
    return <ResizeObserver onResize={resize}>{list}</ResizeObserver>;
  }
}, {
  props: vuePropsType,
  name: 'OverflowList'
})



export default OverflowList





