import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  CSSProperties,
  reactive,
  nextTick, onMounted, onUnmounted, isVNode, watch, cloneVNode, provide, inject, watchEffect, isRef,
} from 'vue'
import classNames from 'classnames';

import {throttle, noop, get, omit, each, isEmpty, isFunction} from 'lodash';

import {BASE_CLASS_PREFIX} from '@douyinfe/semi-foundation/base/constants';
import warning from '@douyinfe/semi-foundation/utils/warning';
import Event from '@douyinfe/semi-foundation/utils/Event';
import {ArrayElement} from '@douyinfe/semi-foundation/utils/type';
import {convertDOMRectToObject, DOMRectLikeType} from '@douyinfe/semi-foundation/utils/dom';
import TooltipFoundation from '@douyinfe/semi-foundation/tooltip/foundation';
import type {
  TooltipAdapter,
  Position,
  PopupContainerDOMRect
} from '@douyinfe/semi-foundation/tooltip/foundation';
import {strings, cssClasses, numbers} from '@douyinfe/semi-foundation/tooltip/constants';
import '@douyinfe/semi-foundation/tooltip/tooltip.scss';
import BaseComponent, {BaseProps, useBaseComponent} from '../_base/baseComponent';
import {isHTMLElement} from '../_base/reactUtils';
import {getActiveElement, getFocusableElements, stopPropagation} from '../_utils';
import {getUuidShort} from '@douyinfe/semi-foundation/utils/uuid';
import Portal from '../_portal/Index';
import TriangleArrow from './TriangleArrow';
import TriangleArrowVertical from './TriangleArrowVertical';
import TooltipTransition from './TooltipStyledTransition';
import {Motion} from '../_base/base';
import {DefaultAdapter} from "@douyinfe/semi-foundation/base/foundation";

export type Trigger = ArrayElement<typeof strings.TRIGGER_SET>;
export {Position}
export interface ArrowBounding {
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
}

export interface TooltipProps extends BaseProps {
  children?: JSX.Element;
  motion?: Motion;
  autoAdjustOverflow?: boolean;
  position?: Position;
  getPopupContainer?: () => HTMLElement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  trigger?: Trigger;
  className?: string;
  clickToHide?: boolean;
  visible?: boolean;
  style?: CSSProperties;
  content?: JSX.Element | string;
  prefixCls?: string;
  onVisibleChange?: (visible: boolean) => void;
  onClickOutSide?: (e: MouseEvent) => void;
  spacing?: number;
  showArrow?: boolean | JSX.Element;
  zIndex?: number;
  rePosKey?: string | number;
  arrowBounding?: ArrowBounding;
  transformFromCenter?: boolean;
  arrowPointAtCenter?: boolean;
  wrapWhenSpecial?: boolean;
  stopPropagation?: boolean;
  clickTriggerToHide?: boolean;
  wrapperClassName?: string;
  closeOnEsc?: boolean;
  guardFocus?: boolean;
  returnFocusOnClose?: boolean;
  onEscKeyDown?: (e: KeyboardEvent) => void;
  wrapperId?: string;
}

interface TooltipState {
  visible: boolean;
  transitionState: string;
  triggerEventSet: {
    [key: string]: any;
  };
  portalEventSet: {
    [key: string]: any;
  };
  containerStyle: CSSProperties;
  isInsert: boolean;
  placement: Position;
  transitionStyle: Record<string, any>;
  cancelText: string,
  okText: string,
  contentClassName: string,
  role: string
}

const prefix = cssClasses.PREFIX;
const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

const blockDisplays = ['flex', 'block', 'table', 'flow-root', 'grid'];
const defaultGetContainer = () => document.body;

export const vuePropsType = {
  name: String,
  children: Object,
  motion: {
    type: [Object, Boolean],
    default: true,
  },
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'top'
  },
  getPopupContainer: Function,
  mouseEnterDelay: {
    type: Number,
    default: numbers.MOUSE_ENTER_DELAY
  },
  mouseLeaveDelay: {
    type: Number,
    default: numbers.MOUSE_LEAVE_DELAY
  },
  trigger: {
    type: [Array, String],
    default: 'hover'
  },
  className: String,
  clickToHide: Boolean,
  visible: Boolean,
  style: [Object, String],
  content: [Object, String, Number],
  prefixCls: {
    type: String,
    default: prefix,
  },
  onVisibleChange: {
    type: Function,
    default: noop,
  },
  onClickOutSide: {
    type: Function,
    default: noop,
  },
  spacing: {
    type: Number,
    default: numbers.SPACING
  },
  showArrow: {
    type: [Boolean, Object],
    default: true,
  },
  zIndex: {
    type: Number,
    default: numbers.DEFAULT_Z_INDEX,
  },
  rePosKey: [String, Number, Boolean],
  arrowBounding: {
    type: Object,
    default: numbers.ARROW_BOUNDING
  },
  transformFromCenter: {
    type: Boolean,
    default: true,
  },
  arrowPointAtCenter: {
    type: Boolean,
    default: true,
  },
  wrapWhenSpecial: {
    type: Boolean,
    default: true,
  },
  stopPropagation: Boolean,
  clickTriggerToHide: Boolean,
  wrapperClassName: String,

  cancelText: String,
  okText: String,
  contentClassName: String,
  role: String,
  closeOnEsc:{
    type: Boolean,
    default: false
  },
  guardFocus:{
    type: Boolean,
    default: false
  },
  returnFocusOnClose:{
    type: Boolean,
    default: false
  },
  onEscKeyDown:{
    type: Function,
    default: noop
  },
  wrapperId: String
}


const Tooltip = defineComponent<TooltipProps>((props, {slots}) => {


  const eventManager = ref<Event>(new Event);
  let triggerEl = ref(null);
  const containerEl = ref(null);
  const initialFocusRef = ref(null);
  const resizeHandler = ref(null);
  let isWrapped: boolean;
  let mounted: any;
  let scrollHandler: any;
  let getPopupContainer: () => HTMLElement;
  let containerPosition: string;

  const eventManagerRef = new Event();
  const triggerElRef = ref(null);
  const containerElRef = ref(null);
  const clickOutsideHandler = ref(null);
  const resizeHandlerRef = ref(null);
  const isWrappedRef = ref(false); // Identifies whether a span element is wrapped
  const containerPositionRef = ref(undefined);

  const isInsertRef = ref(undefined)
  const transitionStateRef = ref(undefined)
  const containerStyleRef = ref(undefined)

  const state = reactive({
    visible: false,
    /**
     *
     * Note: The transitionState parameter is equivalent to isInsert
     */
    transitionState: '',
    triggerEventSet: {},
    portalEventSet: {},
    containerStyle: {
      // zIndex: props.zIndex,
    },
    isInsert: false,
    placement: props.position || 'top',
    transitionStyle: {},
    willUpdateStates: {},
    isPositionUpdated: false,
    id: props.wrapperId, // auto generate id, will be used by children.aria-describedby & content.id, improve a11y

  })
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<TooltipProps>(props, state)

  const theAdapter = adapter()

  function adapter(): TooltipAdapter<TooltipProps, TooltipState> {
    return {
      ...adapterInject<TooltipProps, TooltipState>(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      on: (...args: any[]) => eventManager.value.on(...args),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      off: (...args: any[]) => eventManager.value.off(...args),
      insertPortal: (content: string, {position, ...containerStyle}: { position: Position }) => {


        state.isInsert = true;
        state.transitionState = 'enter';
        // @ts-ignore
        state.containerStyle = {...state.containerStyle, containerStyle};
        // console.log()


        nextTick(() => {
          eventManager.value.emit('portalInserted');
        })
      },
      removePortal: () => {
        //console.log('removePortal')
        state.isInsert = false;
      },
      getEventName: () => ({
        mouseEnter: 'onMouseenter',
        mouseLeave: 'onMouseleave',
        mouseOut: 'onMouseout',
        mouseOver: 'onMouseover',
        click: 'onClick',
        focus: 'onFocus',
        blur: 'onBlur',
        keydown: 'onKeydown',
      }),
      registerTriggerEvent: (triggerEventSet: Record<string, any>) => {
        //console.log(triggerEventSet)
        state.triggerEventSet = triggerEventSet
      },
      unregisterTriggerEvent: () => {
      },
      registerPortalEvent: (portalEventSet: Record<string, any>) => {
        state.portalEventSet = portalEventSet
      },
      unregisterPortalEvent: () => {
      },
      getTriggerBounding: () => {
        // eslint-disable-next-line
        // It may be a React component or an html element
        // There is no guarantee that triggerE l.current can get the real dom, so call findDOMNode to ensure that you can get the real dom



        // console.log(triggerEl.value)
        return triggerEl.value && triggerEl.value.getBoundingClientRect();
      },
      // Gets the outer size of the specified container
      getPopupContainerRect: () => {
        const container = getPopupContainer();

        let rect: PopupContainerDOMRect = null;

        if (container && isHTMLElement(container)) {
          const boundingRect: DOMRectLikeType = convertDOMRectToObject(container.getBoundingClientRect());
          rect = {
            ...boundingRect,
            scrollLeft: container.scrollLeft,
            scrollTop: container.scrollTop,
          };
        }

        return rect;
      },
      containerIsBody: () => {
        const container = getPopupContainer();

        return container === document.body;
      },
      containerIsRelative: () => {
        const container = getPopupContainer();
        const computedStyle = window.getComputedStyle(container);
        return computedStyle.getPropertyValue('position') === 'relative';
      },
      containerIsRelativeOrAbsolute: () => ['relative', 'absolute'].includes(containerPosition),
      // Get the size of the pop-up layer
      getWrapperBounding: () => {
        const el = containerEl.value;
        return el && (el as Element).getBoundingClientRect();
      },
      getDocumentElementBounding: () => document.documentElement.getBoundingClientRect(),
      setPosition: ({position, ...style}: { position: Position }) => {
        state.containerStyle = {...state.containerStyle, ...style}
        state.placement = position
        state.isPositionUpdated = true
        nextTick(() => {
          // console.log('positionUpdated')
          eventManager.value.emit('positionUpdated');
        })

      },
      updatePlacementAttr: (placement: Position) => {
        state.placement = placement
      },
      togglePortalVisible: (visible: boolean, cb: () => void) => {
        const willUpdateStates: Partial<TooltipState> = {};

        if (theAdapter.canMotion()) {
          // console.log(visible ? 'enter' : 'leave');
          willUpdateStates.transitionState = visible ? 'enter' : 'leave';
          willUpdateStates.visible = visible;
        } else {
          willUpdateStates.visible = visible;
        }

        if (mounted){
          state.transitionState = willUpdateStates.transitionState
          state.visible = willUpdateStates.visible
          //console.log('willUpdateStates')
          nextTick(() => {
            cb();
          })
        }
      },
      registerClickOutsideHandler: (cb: () => void) => {
        if (clickOutsideHandler.value) {
          theAdapter.unregisterClickOutsideHandler();
        }
        clickOutsideHandler.value = (e: any): any => {
          if (!mounted) {
            return false;
          }
          let el = triggerEl.value;
          let popupEl = containerEl.value;
          if (
            (el && !(el as any).contains(e.target) && popupEl && !(popupEl as any).contains(e.target)) ||
            props.clickTriggerToHide
          ) {
            props.onClickOutSide(e);
            cb();
          }
        };
        document.addEventListener('mousedown', clickOutsideHandler.value, {capture: true});
      },
      unregisterClickOutsideHandler: () => {
        if (clickOutsideHandler.value) {
          document.removeEventListener('mousedown', clickOutsideHandler.value, {capture: true});
          clickOutsideHandler.value = null;
        }
      },
      registerResizeHandler: (cb: (e: any) => void) => {
        if (resizeHandler.value) {
          theAdapter.unregisterResizeHandler();
        }
        resizeHandler.value = throttle((e): any => {
          if (!mounted) {
            return false;
          }
          cb(e);
        }, 10);
        window.addEventListener('resize', resizeHandler.value, false);
      },
      unregisterResizeHandler: () => {
        if (resizeHandler.value) {
          window.removeEventListener('resize', resizeHandler, false);
          resizeHandler.value = null;
        }
      },
      notifyVisibleChange: (visible: boolean) => {
        props.onVisibleChange(visible);
      },
      registerScrollHandler: (rePositionCb: (arg: { x: number; y: number }) => void) => {
        if (scrollHandler) {
          theAdapter.unregisterScrollHandler();
        }
        scrollHandler = throttle((e): any => {
          if (!mounted) {
            return false;
          }
          let triggerDOM = triggerEl.value;
          if (!isHTMLElement(triggerEl.value)) {
            triggerDOM = triggerEl.value;
          }
          const isRelativeScroll = e.target.contains(triggerDOM);
          if (isRelativeScroll) {
            const scrollPos = {x: e.target.scrollLeft, y: e.target.scrollTop};
            rePositionCb(scrollPos);
          }
        }, 10); // When it is greater than 16ms, it will be very obvious
        window.addEventListener('scroll', scrollHandler, true);
      },
      unregisterScrollHandler: () => {
        if (scrollHandler) {
          window.removeEventListener('scroll', scrollHandler, true);
          scrollHandler = null;
        }
      },
      canMotion: () => Boolean(props.motion),
      updateContainerPosition: () => {
        const container = getPopupContainer();
        if (container && isHTMLElement(container)) {
          // getComputedStyle need first parameter is Element type
          const computedStyle = window.getComputedStyle(container);
          const position = computedStyle.getPropertyValue('position');
          //console.log(position)
          containerPosition = position;
        }
      },
      getContainerPosition: () => containerPosition,
      getContainer: () => containerEl.value,
      getTriggerNode: () => {
        let triggerDOM = triggerEl.value;
        if (!isHTMLElement(triggerEl.value)) {
          triggerDOM = triggerEl.value;
        }
        return triggerDOM as Element;
      },
      getFocusableElements: (node: HTMLDivElement) => {
        return getFocusableElements(node);
      },
      getActiveElement: () => {
        return getActiveElement();
      },
      setInitialFocus: () => {
        const focusRefNode = initialFocusRef.value;
        if (focusRefNode && focusRefNode.focus) {
          focusRefNode.focus();
        }
      },
      notifyEscKeydown: (event: KeyboardEvent) => {
        props.onEscKeyDown(event);
      },
      setId: () => {
        state.id = getUuidShort()
      }
    };
  }


  const foundation = new TooltipFoundation(theAdapter);

  onMounted(() => {
    mounted = true;
    getPopupContainer = props.getPopupContainer || context.getPopupContainer || defaultGetContainer;
    foundation.init();
  })

  onUnmounted(() => {
    mounted = false;
    foundation.destroy();
  })

  const isSpecial = (elem: JSX.Element | HTMLElement | any) => {
    if (isHTMLElement(elem)) {
      return Boolean(elem.disabled);
    } else if (isVNode(elem)) {
      const disabled = get(elem, 'props.disabled');

      if (disabled) {
        return strings.STATUS_DISABLED;
      }

      const loading = get(elem, 'props.loading');

      /* Only judge the loading state of the Button, and no longer judge other components */
      const isButton = !isEmpty(elem)
        && !isEmpty(elem.type)
        && (elem.type as any).name === 'Button'
        || (elem.type as any).name === 'IconButton';
      if (loading && isButton) {
        return strings.STATUS_LOADING;
      }
    }

    return false;
  };

  // const willEnter = () => {
  //   foundation.calcPosition();
  //   /**
  //    * Dangerous: remove setState in motion fix #1379
  //    * because togglePortalVisible callback function will use visible state to notifyVisibleChange
  //    * if visible state is old value, then notifyVisibleChange function will not be called
  //    * we should ensure that after calling togglePortalVisible, callback function can get right visible value
  //    */
  //   // this.setState({ visible: true });
  // };
  const didLeave = () => {
    // console.error('didLeave')
    theAdapter.unregisterClickOutsideHandler();
    theAdapter.unregisterScrollHandler();
    theAdapter.unregisterResizeHandler();
    theAdapter.removePortal();
  };

  /** for transition - end */

  function rePosition() {
    return foundation.calcPosition();
  }

  watchEffect(() => {
    //console.log(state.willUpdateStates,props.visible,props.rePosKey);
  })


  watch([() => props.mouseLeaveDelay, () => props.mouseEnterDelay], () => {
    warning(
      props.mouseLeaveDelay < props.mouseEnterDelay,
      "[Semi Tooltip] 'mouseLeaveDelay' cannot be less than 'mouseEnterDelay', which may cause the dropdown layer to not be hidden."
    );
  })
  watch(() => props.visible, () => {
    props.visible ? foundation.delayShow() : foundation.delayHide();
  })
  watch(() => props.rePosKey, () => {
    rePosition();
  })

  watch(state, () => {
    // console.log(state)
  })


  const renderIcon = () => {
    const {placement} = state;
    const {showArrow, prefixCls, style} = props;
    let icon = null;
    const triangleCls = classNames([`${prefixCls}-icon-arrow`]);
    const bgColor = get(style, 'backgroundColor');

    const iconComponent = placement.includes('left') || placement.includes('right') ?
      <TriangleArrowVertical/> :
      <TriangleArrow/>;
    if (showArrow) {
      if (isVNode(showArrow)) {
        icon = showArrow;
      } else {
        icon = cloneVNode(iconComponent, {className: triangleCls, style: {color: bgColor, fill: 'currentColor'}});
      }
    }

    return icon;
  };

  const handlePortalInnerClick = (e: any) => {
    if (props.clickToHide) {
      foundation.hide();
    }
    if (props.stopPropagation) {
      stopPropagation(e);
    }
  };

  const handlePortalInnerKeyDown = (e: KeyboardEvent) => {
    foundation.handleContainerKeydown(e);
  }

  const renderContentNode = (content: TooltipProps['content']) => {
    const contentProps = {
      initialFocusRef: initialFocusRef
    };
    return !isFunction(content) ? content : content(contentProps);
  };

  const renderPortal = () => {
    const {containerStyle = {}, visible, portalEventSet, placement, transitionState, id, isPositionUpdated} = state;
    const {prefixCls, content, showArrow, style, motion, role, zIndex} = props;
    const contentNode = renderContentNode(content);
    const {className: propClassName} = props;
    const direction = context.direction;
    const className = classNames(propClassName, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-show`]: visible,
      [`${prefixCls}-with-arrow`]: Boolean(showArrow),
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    const icon = renderIcon();
    let portalInnerStyle: CSSProperties = omit(containerStyle, motion ? ['transformOrigin'] : undefined);
    const transformOrigin = get(containerStyle, 'transformOrigin');

    portalInnerStyle = {
      ...portalInnerStyle, ...{
        ...portalInnerStyle,
        left: portalInnerStyle.left + 'px',
        top: portalInnerStyle.top + 'px'
      }
    }
    return (
      <Portal getPopupContainer={props.getPopupContainer} style={{zIndex}}>
        <div
          class={`${BASE_CLASS_PREFIX}-portal-inner`}
          style={portalInnerStyle}
          ref={containerEl}
          onClick={handlePortalInnerClick}
          onKeydown={handlePortalInnerKeyDown}
        >
          {motion && isPositionUpdated ? (
            <TooltipTransition transitionState={state.transitionState} position={placement} didLeave={didLeave}
                               motion={motion}>
              {{
                default: transitionState === 'enter' ? ({animateCls, animateStyle, animateEvents}: any) => {
                  return (<div
                    className={classNames(className, animateCls)}
                    style={{
                      visibility: 'visible',
                      ...animateStyle,
                      transformOrigin,
                      ...style,
                    }}
                    {...portalEventSet}
                    {...animateEvents}
                    x-placement={placement}
                    id={state.id}
                  >
                    {contentNode}
                    {icon}
                  </div>)
                } : null
              }}
            </TooltipTransition>
          ) : (
            <div class={className} {...portalEventSet} x-placement={placement}  style={{ visibility: motion ? undefined : 'visible', ...style }}>
              {contentNode}
              {icon}
            </div>
          )}
        </div>
      </Portal>
    );
  };

  const wrapSpan = (elem: any) => {
    const {wrapperClassName} = props;
    const display = get(elem, 'props.style.display');
    const block = get(elem, 'props.block');

    const style: CSSProperties = {
      display: 'inline-block',
    };

    if (block || blockDisplays.includes(display)) {
      style.width = '100%';
    }

    return <span class={wrapperClassName} style={style}>{elem}</span>;
  };

  const mergeEvents = (rawEvents: Record<string, any>, events: Record<string, any>) => {
    const mergedEvents = {};
    each(events, (handler: any, key) => {
      if (typeof handler === 'function') {
        // @ts-ignore
        mergedEvents[key] = (...args: any[]) => {
          handler(...args);
          if (rawEvents && typeof rawEvents[key] === 'function') {
            rawEvents[key](...args);
          }
        };
      }
    });

    return mergedEvents;
  };


  return () => {

    const {triggerEventSet, visible, id} = state;
    const {wrapWhenSpecial, role} = props;
    let children: any = slots.default ? slots.default()[0] : null;
    const childrenStyle = {...get(children, 'props.style')};
    const extraStyle: CSSProperties = {};

    if (wrapWhenSpecial) {
      const isSpecial_ = isSpecial(children);

      if (isSpecial_) {
        childrenStyle.pointerEvents = 'none';

        if (isSpecial_ === strings.STATUS_DISABLED) {
          extraStyle.cursor = 'not-allowed';
        }

        children = cloneVNode(children, {style: childrenStyle});
        children = wrapSpan(children);
        isWrapped = true;
      } else if (!isVNode(children)) {
        children = wrapSpan(children);
        isWrapped = true;
      }
    }
    // eslint-disable-next-line prefer-const
    let ariaAttribute = {};

    // Take effect when used by Popover component
    if (role === 'dialog') {
      ariaAttribute['aria-expanded'] = visible ? 'true' : 'false';
      ariaAttribute['aria-haspopup'] = 'dialog';
      ariaAttribute['aria-controls'] = id;
    } else {
      ariaAttribute['aria-describedby'] = id;
    }


    //console.log(children.props)
    // The incoming children is a single valid element, otherwise wrap a layer with span
    const newChild = cloneVNode(children, {
      ...children.props,
      ...mergeEvents((children).props, triggerEventSet),
      style: {
        ...get(children, 'props.style'),
        ...extraStyle,
      },
      class: classNames(
        get(children, 'props.className')
        // `${prefixCls}-trigger`
      ),
      // to maintain refs with callback
      ref: (node: any) => {
        // Keep your own reference
        // TODO 与 react 不同的地方
        triggerEl.value = node && (node.content || node.$el || node);
        // Call the original ref, if any
        const {ref} = children as any;
        // this.log('tooltip render() - get ref', ref);
        if (typeof ref.r === 'function') {
          ref(node);
        } else if (ref.r && typeof ref.r === 'object' && isRef(ref.r)) {
          ref.r.value = node;
        }
      },
    });

    //console.log(children.props, {...mergeEvents((children).props, triggerEventSet)})
    // If you do not add a layer of div, in order to bind the events and className in the tooltip, you need to cloneElement children, but this time it may overwrite the children's original ref reference
    // So if the user adds ref to the content, you need to use callback ref: https://github.com/facebook/react/issues/8873
    return (
      <>
        {state.isInsert ? renderPortal() : null}
        {newChild}
      </>
    );
  }
})

Tooltip.props = vuePropsType
Tooltip.name = 'Tooltip'

export default Tooltip


