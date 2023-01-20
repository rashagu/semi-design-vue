import * as PropTypes from '../PropTypes';
import {isEqual, isEmpty} from 'lodash';
import {defineComponent, h, onBeforeUnmount, onMounted, useSlots, watch} from 'vue';
import {vuePropsMake} from '../PropTypes';
import {VueJsxNode} from "../interface";

export interface ReactIntersectionObserverProps {
  onIntersect?: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
  children?: VueJsxNode;
  root?: IntersectionObserverInit['root'];
  threshold?: IntersectionObserverInit['threshold'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  items?: Record<string, Element>;
}

const propTypes = {
  onIntersect: PropTypes.func,
  option: PropTypes.object,
  root: PropTypes.any,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  items: PropTypes.object,
};

const defaultProps = {
  onIntersect: (): void => undefined,
  threshold: 0.75,
  rootMargin: '0px',
  option: {},
  items: {},
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const ReactIntersectionObserver = defineComponent<ReactIntersectionObserverProps>((props, {}) => {
  const slots = useSlots();
  let observer: IntersectionObserver;
  let cachedKeys: Array<string>;
  onMounted(() => {
    const {items} = props;
    cachedKeys = Object.keys(items);
    const {root, threshold, rootMargin, option, onIntersect} = props;
    observer = new IntersectionObserver(onIntersect, {
      root,
      threshold,
      rootMargin,
      ...option,
    });
    observeElement();
  });

  watch(
    () => props.items,
    () => {
      const {items} = props;
      const itemKeys = Object.keys(items);
      if (!isEqual(cachedKeys, itemKeys)) {
        observeElement(true);
        cachedKeys = itemKeys;
      }
    }
  );

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  function observeElement(force = false): void {
    const {items} = props;
    if (isEmpty(items)) {
      // stop everything if not defined
      observer.disconnect();
      return;
    }
    if (force) {
      observer.disconnect();
    }

    // observer callback is invoked immediately when observing new elements
    Object.keys(items).forEach((key) => {
      const node = items[key];
      if (!node) {
        return;
      }
      observer.observe(node);
    });
  }

  // 不能直接 return slots.default，会失去响应
  return ()=>slots.default?.();
});

ReactIntersectionObserver.props = vuePropsType;
ReactIntersectionObserver.name = 'ReactIntersectionObserver';

export default ReactIntersectionObserver;
