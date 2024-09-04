import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { isEqual, omit, isNull, isUndefined, isFunction, get, debounce } from 'lodash';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/overflowList/constants';
import ResizeObserver, { ResizeEntry } from '../resizeObserver';
import IntersectionObserver from './intersectionObserver';

import OverflowListFoundation, { OverflowListAdapter } from '@douyinfe/semi-foundation/overflowList/foundation';

import '@douyinfe/semi-foundation/overflowList/overflowList.scss';
import { CombineProps, VueJsxNode } from '../interface';
import copy from 'fast-copy';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  createVNode,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  isVNode,
  nextTick,
  PropType,
  reactive,
  ref,
  shallowRef,
  toRaw,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent, useHasInProps } from '../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;
const Boundary = strings.BOUNDARY_MAP;
const OverflowDirection = strings.OVERFLOW_DIR;
const RenderMode = strings.MODE_MAP;

export type { ReactIntersectionObserverProps } from './intersectionObserver';
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
  threshold?: number | number[];
  visibleItemRenderer?: (item: OverflowItem, index: number) => VueJsxNode;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  itemKey?: Key | ((item: OverflowItem) => Key);
  onVisibleStateChange?: (visibleState: Map<string, boolean>) => void;
  overflowRenderDirection?: 'both' | 'start' | 'end'; // used in tabs, not exposed to user
  collapseMask?: any;
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
  overflowWidth?: number;
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
  overflowRenderDirection: 'both',
};
const propTypes: CombineProps<OverflowListProps> = {
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
  threshold: [PropTypes.number, PropTypes.array] as PropType<OverflowListProps['threshold']>,
  visibleItemRenderer: PropTypes.func as PropType<OverflowListProps['visibleItemRenderer']>,
  wrapperClassName: PropTypes.string,
  wrapperStyle: PropTypes.object,
  collapseMask: PropTypes.object as PropType<OverflowListProps['collapseMask']>,
  overflowRenderDirection: PropTypes.string as PropType<OverflowListProps['overflowRenderDirection']>,
  onVisibleStateChange: PropTypes.func as PropType<OverflowListProps['onVisibleStateChange']>,
  itemKey: [PropTypes.string, PropTypes.bool, PropTypes.func] as PropType<OverflowListProps['itemKey']>,
};
export const vuePropsType = vuePropsMake<OverflowListProps>(propTypes, defaultProps);
const OverflowList = defineComponent({
  props: { ...vuePropsType },
  name: 'OverflowList',
  setup(props, {}) {
    const { getProps } = useHasInProps();
    const slots = useSlots();

    const state = reactive<OverflowListState>({
      direction: OverflowDirection.GROW,
      lastOverflowCount: 0,
      overflow: [],
      visible: [],
      containerWidth: 0,
      visibleState: new Map(),
      itemSizeMap: new Map(),
      overflowStatus: 'calculating',
      pivot: 0,
      overflowWidth: 0,
      maxCount: 0,
    });

    function getDerivedStateFromProps(props_: OverflowListProps, prevState: OverflowListState): OverflowListState {
      const { prevProps } = prevState;
      const newState: OverflowListState = {};
      newState.prevProps = props_;

      const needUpdate = (name: string): boolean => {
        return (!prevProps && name in props_) || (prevProps && !isEqual(prevProps[name], props_[name]));
      };
      if (needUpdate('items') || needUpdate('style')) {
        // reset visible state if the above props change.
        newState.direction = OverflowDirection.GROW;
        newState.lastOverflowCount = 0;
        newState.maxCount = 0;
        if (props_.renderMode === RenderMode.SCROLL) {
          newState.visible = props_.items;
          newState.overflow = [];
        } else {
          let maxCount = props_.items.length;
          if (Math.floor(prevState.containerWidth / numbers.MINIMUM_HTML_ELEMENT_WIDTH) !== 0) {
            maxCount = Math.min(maxCount, Math.floor(prevState.containerWidth / numbers.MINIMUM_HTML_ELEMENT_WIDTH));
          }

          const isCollapseFromStart = props_.collapseFrom === Boundary.START;
          const visible = isCollapseFromStart
            ? copy(props_.items).reverse().slice(0, maxCount)
            : props_.items.slice(0, maxCount);
          const overflow = isCollapseFromStart
            ? copy(props_.items).reverse().slice(maxCount)
            : props_.items.slice(maxCount);
          newState.visible = visible;
          newState.overflow = overflow;
          newState.maxCount = maxCount;
        }
        newState.pivot = -1;
        newState.overflowStatus = 'calculating';
      }
      return newState;
    }

    watch(
      [() => props.items, () => props.style, () => props.renderMode, () => props.collapseFrom],
      (val) => {
        const newState = getDerivedStateFromProps({ ...getProps(props) }, { ...state });
        newState &&
          Object.keys(newState).forEach((key) => {
            state[key] = newState[key];
          });
      },
      { immediate: true }
    );

    const { adapter: adapterInject } = useBaseComponent<OverflowListProps>(props, state);

    function adapter_(): OverflowListAdapter {
      return {
        ...adapterInject(),
        updateVisibleState: (visibleState): void => {
          state.visibleState = visibleState;
          nextTick(() => {
            props.onVisibleStateChange?.(visibleState);
          });
        },
        updateStates: (states): void => {
          states &&
            Object.keys(states).forEach((key) => {
              state[key] = states[key];
            });
        },
        notifyIntersect: (res): void => {
          props.onIntersect && props.onIntersect(res);
        },
        getItemSizeMap: () => {
          return itemSizeMap;
        },
      };
    }

    const adapter = adapter_();

    const foundation = new OverflowListFoundation(adapter);

    let itemRefs = shallowRef({});

    let scroller = null;
    let spacer: HTMLDivElement = null;

    let previousWidths: Map<Element, number> = new Map();

    let itemSizeMap: Map<string, number> = new Map();

    const isScrollMode = (): boolean => {
      const { renderMode } = props;
      return renderMode === RenderMode.SCROLL;
    };

    const onItemResizeNum = shallowRef(0);

    watch(
      [
        () => props.items,
        () => props.collapseFrom,
        () => state.overflow,
        () => state.containerWidth,
        () => state.visible,
        () => state.overflowStatus,
        () => onItemResizeNum.value,
      ],
      (value, oldValue) => {
        const prevItemsKeys = oldValue[0].map((item) => item.key);
        const nowItemsKeys = props.items.map((item) => item.key);

        // Determine whether to update by comparing key values
        if (!isEqual(prevItemsKeys, nowItemsKeys)) {
          itemRefs.value = {};
          state.visibleState = new Map();
        }

        const { overflow, containerWidth, visible, overflowStatus } = state;

        if (isScrollMode() || overflowStatus !== 'calculating') {
          return;
        }
        foundation.handleCollapseOverflow();
      }
    );

    const resize = (entries: Array<ResizeEntry> = []): void => {
      const containerWidth = entries[0]?.target.clientWidth;
      state.containerWidth = containerWidth;
      state.overflowStatus = 'calculating';
    };

    const reintersect = (entries: Array<IntersectionObserverEntry>): void => {
      foundation.handleIntersect(entries);
    };

    const mergeRef = (ref_: any, node: Element, key: Key): void => {
      if (!itemRefs.value[key]) {
        itemRefs.value[key] = node;
        itemRefs.value = {
          ...itemRefs.value
        }
      }
      if (typeof ref_ === 'function') {
        ref_(node);
      } else if (typeof ref_ === 'object' && ref_ && 'value' in ref_) {
        ref_.value = node;
      }
    };

    const renderOverflow = (): VueJsxNode => {
      // 不要删除，这里需要它进行更新渲染，不然页面似乎不会更新
      console.debug(state.visibleState.size);
      const overflow = foundation.getOverflowItem();
      return props.overflowRenderer(overflow);
    };

    const getItemKey = (item, defalutKey?: Key) => {
      const { itemKey } = props;
      if (isFunction(itemKey)) {
        return itemKey(item);
      }
      return get(item, itemKey || 'key', defalutKey);
    };


    const renderItemList = () => {
      const { className, wrapperClassName, wrapperStyle, style, visibleItemRenderer, renderMode, collapseFrom } = props;

      const { visible, overflowStatus } = state;
      let overflow = renderOverflow();
      if (!isScrollMode()) {
        if (Array.isArray(overflow)) {
          overflow = <Fragment>{overflow}</Fragment>;
        }
        if (isVNode(overflow)) {
          const child = cloneVNode(overflow);
          overflow = (
            <ResizeObserver
              onResize={([entry]) => {
                state.overflowWidth = entry.target.clientWidth;
                state.overflowStatus = 'calculating';
              }}
            >
              <div class={`${prefixCls}-overflow`}>{child}</div>
            </ResizeObserver>
          );
        }
      }
      const inner =
        renderMode === RenderMode.SCROLL
          ? (() => {
              const list = [
                <div
                  class={cls(wrapperClassName, `${prefixCls}-scroll-wrapper`)}
                  ref={(ref): void => {
                    scroller = ref as any;
                  }}
                  style={{ ...wrapperStyle }}
                  key={`${prefixCls}-scroll-wrapper`}
                >
                  {visible.map(visibleItemRenderer).map((item) => {
                    const { forwardRef, key } = (item as any).props;
                    return cloneVNode(item as VNode, {
                      ref: (node: any) => mergeRef(forwardRef, node, key),
                      'data-scrollkey': `${key}`,
                      key,
                    });
                  })}
                </div>,
              ];
              if (props.overflowRenderDirection === 'both') {
                list.unshift(overflow[0]);
                list.push(overflow[1]);
              } else if (props.overflowRenderDirection === 'start') {
                list.unshift(overflow[1]);
                list.unshift(overflow[0]);
              } else {
                list.push(overflow[0]);
                list.push(overflow[1]);
              }
              return list;
            })()
          : [
              collapseFrom === Boundary.START ? overflow : null,
              visible.map((item, idx) => {
                const { key } = item;
                const element = visibleItemRenderer(item, idx);
                const child = cloneVNode(element as any);
                return (
                  <ResizeObserver key={key ?? idx} onResize={([entry]) => onItemResize(entry, item, idx)}>
                    {/* 用div包起来，可以直接在resize回调中拿到宽度，不用通过获取元素的padding, margin, border-width求和计算宽度*/}
                    {/* This div wrap can get width directly rather than do the math of padding, margin, border-width*/}
                    <div key={key ?? idx} class={`${prefixCls}-item`}>
                      {child}
                    </div>
                  </ResizeObserver>
                );
              }),
              collapseFrom === Boundary.END ? overflow : null,
            ];
      const list = createVNode(
        'div',
        {
          class: cls(`${prefixCls}`, className),
          style: {
            ...style,
            ...(renderMode === RenderMode.COLLAPSE
              ? {
                  maxWidth: '100%',
                  visibility: overflowStatus === 'calculating' ? 'hidden' : 'visible',
                }
              : null),
          },
        },
        [...inner]
      );
      return list;
    };

    /**
     * 调用时机问题 for Vue
     * onItemResize -> handleCollapseOverflow(拿到更新后的itemSizeMap)
     */
    const onItemResizeNum_ = debounce(() => {
      onItemResizeNum.value++;
    }, 10);

    const onItemResize = (entry: ResizeEntry, item: OverflowItem, idx: number) => {
      let hasChangeMap = false;
      const key = getItemKey(item, idx);
      const width = itemSizeMap.get(key);
      if (!width) {
        itemSizeMap.set(key, entry.target.clientWidth);
        hasChangeMap = true;
      } else if (width !== entry.target.clientWidth) {
        // 某个item发生resize后，重新计算
        itemSizeMap.set(key, entry.target.clientWidth);
        state.overflowStatus = 'calculating';
        hasChangeMap = true;
      }
      const { maxCount } = state;
      // 已经按照最大值maxCount渲染完毕，触发真正的渲染。(-1 是overflow部分会占1)
      // Already rendered maxCount items, trigger the real rendering. (-1 for the overflow part)
      if (itemSizeMap.size === maxCount - 1) {
        state.overflowStatus = 'calculating';
      }
      hasChangeMap && onItemResizeNum_();
    };

    return () => {
      const list = renderItemList();
      const { renderMode } = props;
      if (renderMode === RenderMode.SCROLL) {
        return (
          <IntersectionObserver onIntersect={reintersect} threshold={props.threshold} root={scroller} items={itemRefs.value}

          children={()=>list}>
          </IntersectionObserver>
        );
      }
      return <ResizeObserver onResize={resize}>{list}</ResizeObserver>;
    };
  },
});

export default OverflowList;
