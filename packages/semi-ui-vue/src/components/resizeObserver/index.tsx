import * as PropTypes from '../PropTypes';
import { BaseProps } from '../_base/baseComponent';
import ResizeObserver from '@kousum/resize-observer-polyfill';
import {cloneVNode, defineComponent, h, onBeforeUnmount, onMounted, useSlots, watch} from "vue";
import {vuePropsMake} from "../PropTypes";

/** A parallel type to `ResizeObserverEntry` (from resize-observer-polyfill). */
export interface ResizeEntry {
    contentRect: DOMRectReadOnly;
    target: Element;
}

export interface ReactResizeObserverProps extends BaseProps {
    onResize?: (entries: ResizeEntry[]) => void;
    observeParent?: boolean;
}

const propTypes = {
    onResize: PropTypes.func,
    observeParent: PropTypes.bool,
};

const defaultProps = {
    onResize: () => {}, // eslint-disable-line
    observeParent: false,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const ReactResizeObserver = defineComponent<ReactResizeObserverProps>((props, {}) => {
    const slots = useSlots()
    let observer: ResizeObserver = new ResizeObserver(props.onResize);
    let childNode: any;
    let element: Element;
    let _parentNode: HTMLElement;

    onMounted(()=>{
        observeElement();
    })
    watch(()=>props.observeParent, (value, oldValue)=>{
        observeElement(value !== oldValue);
    })

    onBeforeUnmount(()=>{
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    })


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

    function observeElement(force = false) {
        const element_ = getElement();
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
        const { ref } = child as any;
        return cloneVNode(child[0], {
            ref: (node: any) => mergeRef(ref, node),
        }, );
    }
})


ReactResizeObserver.props = vuePropsType
ReactResizeObserver.name = 'ReactResizeObserver'

export default ReactResizeObserver
