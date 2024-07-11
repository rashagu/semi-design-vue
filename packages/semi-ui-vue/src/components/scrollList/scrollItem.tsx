import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  CSSProperties,
  reactive,
  onUnmounted,
  onMounted,
  watch,
  watchEffect,
  nextTick,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';

import { useBaseComponent } from '../_base/baseComponent';
import classnames from 'classnames';
import { noop, debounce, throttle, find, map, findIndex, times } from 'lodash';

import { cssClasses, numbers } from '@douyinfe/semi-foundation/scrollList/constants';
import ItemFoundation, { Item, ScrollItemAdapter } from '@douyinfe/semi-foundation/scrollList/itemFoundation';
import animatedScrollTo from '@douyinfe/semi-foundation/scrollList/scrollTo';
import isElement from '@douyinfe/semi-foundation/utils/isElement';
import { Motion } from '../_base/base';
import { AriaAttributes } from '../AriaAttributes';
import { CombineProps } from '../interface';

const msPerFrame = 1000 / 60;
const blankReg = /^\s*$/;
const wheelMode = 'wheel';

interface DebounceSelectFn {
  (e: UIEvent, newSelectedNode: HTMLElement): void;

  cancel(): void;
}

export interface ScrollItemProps<T extends Item> {
  mode?: string;
  cycled?: boolean;
  list?: T[];
  selectedIndex?: number;
  onSelect?: (data: T) => void;
  transform?: (value: any, text: string) => string;
  className?: string;
  motion?: Motion;
  style?: CSSProperties;
  type?: string | number; // used to identify the scrollItem, used internally by the semi component, and does not need to be exposed to the user
  'aria-label'?: AriaAttributes['aria-label'];
  class?: string;
}

export interface ScrollItemState {
  prependCount: number;
  appendCount: number;
}

function scrollItemFunc<T extends Item>() {
  const vuePropsType: CombineProps<ScrollItemProps<T>> = {
    className: String,
    style: Object,
    class: String,
    selectedIndex: {
      type: Number,
      default: 0,
    },
    motion: {
      type: [Object, String, Boolean, Function],
      default: true,
    },
    transform: Function as PropType<ScrollItemProps<any>['transform']>,
    list: {
      type: [Array],
      default: [],
    },
    onSelect: {
      type: Function as PropType<ScrollItemProps<any>['onSelect']>,
      default: noop,
    },
    cycled: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: wheelMode,
    },
    type: [String, Number], //used to identify the scrollItem, used internally by the semi component, and does not need to be exposed to the user
    'aria-label': String,
  };
  const scrollItem_ = defineComponent({
    props: { ...vuePropsType },
    name: 'ScrollItem',
    setup(props, {}) {
      const slots = useSlots();

      const state = reactive<ScrollItemState>({
        prependCount: 0,
        appendCount: 0,
        // selectedIndex: props.selectedIndex,
        // fakeSelectedIndex: props.selectedIndex,
      });

      const selectedNode = ref();
      const willSelectNode = ref();
      const list = ref();
      const selector = ref();
      const wrapper = ref();

      let scrollAnimation: any;
      let scrolling: boolean;
      let throttledAdjustList: DebounceSelectFn;
      let debouncedSelect: DebounceSelectFn;

      scrollAnimation = null;

      // cache if select action comes from outside
      const { adapter: adapterInject } = useBaseComponent<ScrollItemProps<any>>(props, state);

      /**
       *
       * reset position to center of the scrollWrapper
       *
       * @param selectedNode_
       * @param scrollWrapper
       * @param {number} duration
       */
      const scrollToCenter: ScrollItemAdapter['scrollToCenter'] = (selectedNode_, scrollWrapper, duration) => {
        selectedNode_ = selectedNode_ || selectedNode.value;

        scrollWrapper = scrollWrapper || wrapper.value;
        if (isElement(selectedNode_) && isElement(scrollWrapper)) {
          const scrollRect = scrollWrapper.getBoundingClientRect();
          const selectedRect = selectedNode_.getBoundingClientRect();

          const targetTop =
            scrollWrapper.scrollTop +
            (selectedRect.top - (scrollRect.top + scrollRect.height / 2 - selectedRect.height / 2));

          scrollToPos(targetTop, typeof duration === 'number' ? duration : numbers.DEFAULT_SCROLL_DURATION);
        }
      };

      const isDisabledIndex = (index: number) => {
        if (Array.isArray(props.list) && props.list.length && index > -1) {
          const size = props.list.length;
          const indexInData = index % size;

          return isDisabledData(props.list[indexInData]);
        }

        return false;
      };
      function adapter(): ScrollItemAdapter<ScrollItemProps<any>, ScrollItemState, any> {
        return {
          ...adapterInject<ScrollItemProps<any>, ScrollItemState>(),
          setState: (states_, callback) => {
            for (const statesKey in states_) {
              if (states_.hasOwnProperty(statesKey)) {
                state[statesKey] = states_[statesKey];
              }
            }

            // TODO callback需要nextTick
            nextTick(() => {
              callback();
            });
          },
          setPrependCount: (prependCount) => (state.prependCount = prependCount),
          setAppendCount: (appendCount) => (state.appendCount = appendCount),
          isDisabledIndex: isDisabledIndex,
          setSelectedNode: (selectedNode_) => _cacheWillSelectNode(selectedNode_),
          notifySelectItem: (...args) => props.onSelect(...args),
          scrollToCenter: scrollToCenter,
        };
      }

      const foundation = new ItemFoundation<ScrollItemProps<any>, ScrollItemState, any>(adapter());

      onMounted(() => {
        foundation.init();

        const { mode, cycled, selectedIndex } = props;

        const selectedNode_ = getNodeByIndex(
          typeof selectedIndex === 'number' && selectedIndex > -1 ? selectedIndex : 0
        ) as HTMLElement;

        _cacheSelectedNode(selectedNode_);
        _cacheWillSelectNode(selectedNode_);

        if (mode === wheelMode && cycled) {
          foundation.initWheelList(list.value, wrapper.value, () => {
            // we have to scroll in next tick
            // setTimeout(() => {
            scrollToNode(selectedNode_, 0);
            // });
          });
        } else {
          scrollToNode(selectedNode_, 0);
        }
      });
      onUnmounted(() => {
        if (props.cycled) {
          throttledAdjustList.cancel();
          debouncedSelect.cancel();
        }
      });

      throttledAdjustList = throttle((e, nearestNode) => {
        foundation.adjustInfiniteList(list.value, wrapper.value, nearestNode);
      }, msPerFrame);

      debouncedSelect = debounce((e, nearestNode) => {
        _cacheSelectedNode(nearestNode);
        foundation.selectNode(nearestNode, list.value);
      }, msPerFrame * 5);

      watch(
        [() => props.selectedIndex, willSelectNode, list, selectedNode, selector, wrapper],
        (value, [prevPropsSelectedIndex]) => {
          const { selectedIndex } = props;
          if (prevPropsSelectedIndex !== selectedIndex) {
            // smooth scroll to selected option
            const willSelectIndex = getIndexByNode(willSelectNode.value);

            if (!indexIsSame(willSelectIndex, selectedIndex)) {
              const newSelectedNode = getNodeByOffset(
                selectedNode.value,
                selectedIndex - prevPropsSelectedIndex,
                list.value
              );
              _cacheWillSelectNode(newSelectedNode);
            }

            _cacheSelectedNode(willSelectNode.value);

            scrollToIndex(selectedIndex);
          }
        }
      );

      const _cacheNode = (name: string, node: any) => {
        if (name && node) {
          switch (name) {
            case 'selectedNode':
              selectedNode.value = node;
              break;
            case 'willSelectNode':
              willSelectNode.value = node;
              break;
            case 'list':
              list.value = node;
              break;
            case 'selector':
              selector.value = node;
              break;
            case 'wrapper':
              wrapper.value = node;
              break;
            default:
              break;
          }
        }
      };

      const _cacheSelectedNode = (selectedNode_: any) => _cacheNode('selectedNode', selectedNode_);

      const _cacheWillSelectNode = (node: any) => _cacheNode('willSelectNode', node);

      const _cacheListNode = (list: any) => _cacheNode('list', list);

      const _cacheSelectorNode = (selector: any) => _cacheNode('selector', selector);

      const _cacheWrapperNode = (wrapper: any) => _cacheNode('wrapper', wrapper);

      /* istanbul ignore next */
      const _isFirst = (node: Element) => {
        if (isElement(node) && isElement(list)) {
          const children = list.value.children;
          const index = findIndex(children, node);

          return index === 0;
        }

        return false;
      };

      /* istanbul ignore next */
      const _isLast = (node: Element) => {
        if (isElement(node) && isElement(list.value)) {
          const { children } = list.value;
          const index = findIndex(children, node);

          return index === children.length - 1;
        }

        return false;
      };

      /**
       *
       * @param {HTMLElement} refNode
       * @param {number} offset
       * @param {HTMLElement} listWrapper
       *
       * @returns {HTMLElement}
       */
      function getNodeByOffset(refNode: Element, offset: number, listWrapper: Element) {
        const { list } = props;

        if (
          isElement(refNode) &&
          isElement(listWrapper) &&
          typeof offset === 'number' &&
          Array.isArray(list) &&
          list.length
        ) {
          offset = offset % list.length;
          const refIndex = getIndexByNode(refNode);

          let targetIndex = refIndex + offset;

          while (targetIndex < 0) {
            targetIndex += list.length;
          }

          if (offset) {
            return getNodeByIndex(targetIndex);
          }
        }
        return refNode;
      }

      const indexIsSame = (index1: number, index2: number) => {
        const { list } = props;

        if (list.length) {
          return index1 % list.length === index2 % list.length;
        }
        return undefined;
      };

      const isDisabledNode = (node: Element) => {
        const listWrapper = list;

        if (isElement(node) && isElement(listWrapper.value)) {
          const index = findIndex(listWrapper.value.children, (child) => child === node);

          return isDisabledIndex(index);
        }

        return false;
      };

      const isDisabledData = (data: any) => data && typeof data === 'object' && data.disabled;

      const isWheelMode = () => props.mode === wheelMode;

      const addClassToNode = (selectedNode_: Element, selectedCls = cssClasses.SELECTED) => {
        selectedNode_ = selectedNode_ || selectedNode.value;

        if (isElement(selectedNode_) && isElement(list.value)) {
          const { children } = list.value;
          const reg = new RegExp(`\\s*${selectedCls}\\s*`, 'g');

          map(children, (node) => {
            node.className = node.className && node.className.replace(reg, ' ');

            if (blankReg.test(node.className)) {
              node.className = '';
            }
          });

          if (selectedNode_.className && !blankReg.test(selectedNode_.className)) {
            selectedNode_.className += ` ${selectedCls}`;
          } else {
            selectedNode_.className = selectedCls;
          }
        }
      };

      // 必须用函数判断一下 不然返回值一直是0
      const getIndexByNode = (node: Element) =>
        findIndex(list.value.children, function (o) {
          return o == node;
        });

      const getNodeByIndex = (index: number) => {
        if (index > -1) {
          return find(list.value.children, (node, idx: number) => {
            if (idx === index) {
              node.scrollTop;
            }
            return idx === index;
          });
        }

        const defaultSelectedNode = find(list.value.children, (child) => !isDisabledNode(child));

        return defaultSelectedNode;
      };

      const scrollToIndex = (selectedIndex: number, duration?: number) => {
        // move to selected item
        duration = typeof duration === 'number' ? duration : numbers.DEFAULT_SCROLL_DURATION;
        // eslint-disable-next-line
        selectedIndex = selectedIndex == null ? props.selectedIndex : selectedIndex;

        // isWheelMode() && addClassToNode();
        scrollToNode(selectedNode.value, duration);
      };

      const scrollToNode = (node: HTMLElement, duration: number) => {
        const wrapperHeight = wrapper.value.offsetHeight;
        const itemHeight = getItmHeight(node);
        const targetTop =
          (node.offsetTop || (list.value.children.length * itemHeight) / 2) - (wrapperHeight - itemHeight) / 2;

        scrollToPos(targetTop, duration);
      };

      const scrollToPos = (targetTop: number, duration = numbers.DEFAULT_SCROLL_DURATION) => {
        // isWheelMode() && addClassToNode();

        if (duration && props.motion) {
          if (scrollAnimation) {
            scrollAnimation.destroy();
            scrolling = false;
          }

          if (wrapper.value.scrollTop === targetTop) {
            if (isWheelMode()) {
              const nodeInfo = foundation.getNearestNodeInfo(list.value, selector.value);
              addClassToNode(nodeInfo.nearestNode);
            }
          } else {
            scrollAnimation = animatedScrollTo(wrapper.value, targetTop, duration);
            scrollAnimation.on('rest', () => {
              if (isWheelMode()) {
                const nodeInfo = foundation.getNearestNodeInfo(list.value, selector.value);
                addClassToNode(nodeInfo.nearestNode);
              }
            });
            scrollAnimation.start();
          }
        } else {
          wrapper.value.scrollTop = targetTop;
        }
      };

      const scrollToSelectItem = (e) => {
        const { nearestNode } = foundation.getNearestNodeInfo(list.value, selector.value);

        if (props.cycled) {
          throttledAdjustList(e, nearestNode);
        }

        debouncedSelect(e, nearestNode);
      };

      const clickToSelectItem = (e) => {
        // const index = foundation.selectNearestIndex(e.nativeEvent, list);
        e && e.stopImmediatePropagation && e.stopImmediatePropagation();
        const { targetNode: node, infoInList } = foundation.getTargetNode(e, list.value);

        if (node && infoInList && !infoInList.disabled) {
          debouncedSelect(null, node);
        }
      };

      const getItmHeight = (itm: HTMLElement) => (itm && itm.offsetHeight) || numbers.DEFAULT_ITEM_HEIGHT;

      const renderItemList = (prefixKey = '') => {
        const { selectedIndex, mode, transform: commonTrans } = props;

        return props.list.map((item, index) => {
          const { transform: itemTrans } = item;

          const transform = typeof itemTrans === 'function' ? itemTrans : commonTrans;
          const selected = selectedIndex === index;
          const cls = classnames({
            [`${cssClasses.PREFIX}-item-sel`]: selected && mode !== wheelMode,
            [`${cssClasses.PREFIX}-item-disabled`]: Boolean(item.disabled),
          });

          let text = '';

          if (selected) {
            if (typeof transform === 'function') {
              text = transform(item.value, item.text);
            } else {
              // eslint-disable-next-line
              text = item.text == null ? item.value : item.text;
            }
          } else {
            // eslint-disable-next-line
            text = item.text == null ? item.value : item.text;
          }

          const events: { onClick?: () => void } = {};

          if (!isWheelMode() && !item.disabled) {
            events.onClick = () => foundation.selectIndex(index, list.value);
          }

          return (
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            <li
              key={prefixKey + index}
              {...events}
              class={cls}
              role="option"
              aria-selected={selected}
              aria-disabled={item.disabled}
            >
              {text}
            </li>
          );
        });
      };

      const renderNormalList = () => {
        const { className, style } = props;

        const inner = renderItemList();

        const wrapperCls = classnames(`${cssClasses.PREFIX}-item`, className);

        return (
          <div style={style} class={wrapperCls} ref={_cacheWrapperNode}>
            <ul role="listbox" aria-multiselectable={false} aria-label={props['aria-label']} ref={_cacheListNode}>
              {inner}
            </ul>
          </div>
        );
      };

      /**
       * List of Rendering Unlimited Modes
       */
      const renderInfiniteList = () => {
        const { cycled, className, style } = props;
        const { prependCount, appendCount } = state;

        const prependList = times(prependCount).reduce((arr, num) => {
          const items = renderItemList(`pre_${num}_`);
          arr.unshift(...items);

          return arr;
        }, []);
        const appendList = times(appendCount).reduce((arr, num) => {
          const items = renderItemList(`app_${num}_`);
          arr.push(...items);
          return arr;
        }, []);

        const inner = renderItemList();

        const listWrapperCls = classnames(`${cssClasses.PREFIX}-list-outer`, {
          [`${cssClasses.PREFIX}-list-outer-nocycle`]: !cycled,
        });

        const wrapperCls = classnames(`${cssClasses.PREFIX}-item-wheel`, className);

        const selectorCls = classnames(`${cssClasses.PREFIX}-selector`);

        const preShadeCls = classnames(`${cssClasses.PREFIX}-shade`, `${cssClasses.PREFIX}-shade-pre`);
        const postShadeCls = classnames(`${cssClasses.PREFIX}-shade`, `${cssClasses.PREFIX}-shade-post`);

        return (
          <div class={wrapperCls} style={style}>
            <div class={preShadeCls} />
            <div class={selectorCls} ref={_cacheSelectorNode} />
            <div class={postShadeCls} />
            <div class={listWrapperCls} ref={_cacheWrapperNode} onScroll={scrollToSelectItem}>
              <ul
                role="listbox"
                aria-label={props['aria-label']}
                aria-multiselectable={false}
                ref={_cacheListNode}
                onClick={clickToSelectItem}
              >
                {prependList}
                {inner}
                {appendList}
              </ul>
            </div>
          </div>
        );
      };

      return () => {
        return isWheelMode() ? renderInfiniteList() : renderNormalList();
      };
    },
  });

  return scrollItem_;
}
const ScrollItem = scrollItemFunc<any>();
export default ScrollItem;
export { scrollItemFunc };
