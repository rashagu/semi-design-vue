import * as PropTypes from '../PropTypes';
import { BaseProps } from '../_base/baseComponent';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  useSlots,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';

/** A parallel type to `ResizeObserverEntry` (from resize-observer-polyfill). */
export interface ResizeEntry {
  contentRect: DOMRectReadOnly;
  target: Element;
}

export interface ReactResizeObserverProps extends BaseProps {
  onResize?: (entries: ResizeEntry[]) => void;
  observeParent?: boolean;
  observerProperty?: ObserverProperty;
  delayTick?: number;
}

export enum ObserverProperty {
  Width = 'width',
  Height = 'height',
  All = 'all',
}
const propTypes: ComponentObjectPropsOptions<ReactResizeObserverProps> = {
  onResize: PropTypes.func as PropType<ReactResizeObserverProps['onResize']>,
  observeParent: PropTypes.bool,
  observerProperty: PropTypes.string as PropType<ReactResizeObserverProps['observerProperty']>,
  delayTick: PropTypes.number,
};

const defaultProps = {
  onResize: () => {}, // eslint-disable-line
  observeParent: false,
  observerProperty: 'all',
  delayTick: 0,
};
export const vuePropsType = vuePropsMake<ReactResizeObserverProps>(propTypes, defaultProps);
const ReactResizeObserver = defineComponent({
  props: vuePropsType,
  name: 'ReactResizeObserver',
  setup(props, {}) {
    const slots = useSlots();
    let observer: ResizeObserver;
    if (globalThis['ResizeObserver']) {
      observer = new ResizeObserver(handleResizeEventTriggered);
    }
    let childNode: any;
    let element: Element;
    let _parentNode: HTMLElement;

    let formerPropertyValue: Map<Element, number> = new Map();

    onMounted(() => {
      if (globalThis['ResizeObserver']) {
        observeElement();
      }
    });
    watch(
      () => props.observeParent,
      (value, oldValue) => {
        if (globalThis['ResizeObserver']) {
          observeElement(value !== oldValue);
        }
      }
    );

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
        element = null;
      }
    });

    const getElement = () => {
      try {
        // using findDOMNode for two reasons:
        // 1. cloning to insert a ref is unwieldy and not performant.
        // 2. ensure that we resolve to an actual DOM node (instead of any JSX ref instance).
        // eslint-disable-next-line
        return childNode;
      } catch (error) {
        // swallow error if findDOMNode is run on unmounted component.
        return null;
      }
    };

    function handleResizeEventTriggered(entries: ResizeEntry[]) {
      if (props.observerProperty === ObserverProperty.All) {
        props.onResize?.(entries);
      } else {
        const finalEntries: ResizeEntry[] = [];
        for (const entry of entries) {
          if (formerPropertyValue.has(entry.target)) {
            if (entry.contentRect[props.observerProperty] !== formerPropertyValue.get(entry.target)) {
              formerPropertyValue.set(entry.target, entry.contentRect[props.observerProperty]);
              finalEntries.push(entry);
            }
          } else {
            formerPropertyValue.set(entry.target, entry.contentRect[props.observerProperty]);
            finalEntries.push(entry);
          }
        }
        if (finalEntries.length > 0) {
          props.onResize?.(finalEntries);
        }
      }
    }

    function observeElement(force = false) {
      const element_ = getElement();
      if (!observer) {
        observer = new ResizeObserver(handleResizeEventTriggered);
      }
      if (!(element_ && element_ instanceof Element)) {
        // stop everything if not defined
        observer.disconnect();
        return;
      }

      if (element_ === element && !force) {
        // abort if given same element -- nothing to update (unless forced)
        return;
      } else {
        // clear observer list if new element
        observer.disconnect();
        // remember element reference for next time
        element = element_;
      }

      // observer callback is invoked immediately when observing new elements
      observer.observe(element_);

      if (
        props.observeParent &&
        element_.parentNode &&
        element_.parentNode.ownerDocument &&
        element_.parentNode.ownerDocument.defaultView &&
        element_.parentNode instanceof element_.parentNode.ownerDocument.defaultView.HTMLElement
      ) {
        _parentNode = element_.parentNode;
        observer.observe(_parentNode);
      }
    }

    const mergeRef = (ref: any, node: HTMLDivElement) => {
      childNode = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        ref.current = node;
      }
    };

    return () => {
      const child = slots.default?.();
      const { ref } = child?.[0] as any;
      return cloneVNode(child[0], {
        ref: (node: any) => mergeRef(ref?.r, node),
      });
    };
  },
});

export default ReactResizeObserver;
