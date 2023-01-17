import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  CSSProperties,
  reactive,
  nextTick, onMounted, onUnmounted, isVNode, watch, cloneVNode, provide, inject, watchEffect, isRef, useSlots, getCurrentInstance
} from 'vue'
import classNames from 'classnames';
import * as PropTypes from '../PropTypes'
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
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import {isHTMLElement} from '../_base/reactUtils';
import {getActiveElement, getFocusableElements, stopPropagation} from '../_utils';
import {getUuidShort} from '@douyinfe/semi-foundation/utils/uuid';
import Portal from '../_portal';
import TriangleArrow from './TriangleArrow';
import TriangleArrowVertical from './TriangleArrowVertical';
import CSSAnimation from "../_cssAnimation";
import TooltipTransition from './TooltipStyledTransition';
import {Motion} from '../_base/base';
import {DefaultAdapter} from "@douyinfe/semi-foundation/base/foundation";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";

export type Trigger = ArrayElement<typeof strings.TRIGGER_SET>;
export {Position}
export interface ArrowBounding {
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
}
export interface RenderContentProps {
  initialFocusRef?: any;
}
export type RenderContent = (props: RenderContentProps) => VueJsxNode;

export interface TooltipProps extends BaseProps {
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
  content?: VueJsxNode | RenderContent;
  prefixCls?: string;
  onVisibleChange?: (visible: boolean) => void;
  onClickOutSide?: (e: MouseEvent) => void;
  spacing?: number;
  margin?: number | { marginLeft: number; marginTop: number; marginRight: number; marginBottom: number };
  showArrow?: boolean | VueJsxNode;
  zIndex?: number;
  rePosKey?: string | number;
  role?: string;
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
  disableArrowKeyDown?: boolean;
  wrapperId?: string;
  preventScroll?: boolean;
  disableFocusListener?: boolean;
  afterClose?: () => void
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
  isPositionUpdated: boolean;
  id: string;
}

const prefix = cssClasses.PREFIX;
const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

const blockDisplays = ['flex', 'block', 'table', 'flow-root', 'grid'];
const defaultGetContainer = () => document.body;

const propTypes = {
  children: PropTypes.node,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
  autoAdjustOverflow: PropTypes.bool,
  position: String,
  getPopupContainer: PropTypes.func,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  trigger: [Boolean, String],
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  clickToHide: PropTypes.bool,
  // used with trigger === hover, private
  clickTriggerToHide: PropTypes.bool,
  visible: PropTypes.bool,
  style: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  prefixCls: PropTypes.string,
  onVisibleChange: PropTypes.func,
  onClickOutSide: PropTypes.func,
  spacing: PropTypes.number,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  showArrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  zIndex: PropTypes.number,
  rePosKey: [String, Number, Boolean],
  arrowBounding: Object,
  transformFromCenter: PropTypes.bool, // Whether to change from the center of the trigger (for dynamic effects)
  arrowPointAtCenter: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  // private
  role: PropTypes.string,
  wrapWhenSpecial: PropTypes.bool, // when trigger has special status such as "disabled" or "loading", wrap span
  guardFocus: PropTypes.bool,
  returnFocusOnClose: PropTypes.bool,
  preventScroll: PropTypes.bool,


  name: String,

  cancelText: String,
  okText: String,
  contentClassName: String,
  closeOnEsc:{
    type: Boolean,
    default: false
  },
  onEscKeyDown:{
    type: Function,
    default: noop
  },
  wrapperId: String,
  disableArrowKeyDown: Boolean,
  afterClose: Function
};

const defaultProps = {
  arrowBounding: numbers.ARROW_BOUNDING,
  autoAdjustOverflow: true,
  arrowPointAtCenter: true,
  trigger: 'hover',
  transformFromCenter: true,
  position: 'top',
  prefixCls: prefix,
  role: 'tooltip',
  mouseEnterDelay: numbers.MOUSE_ENTER_DELAY,
  mouseLeaveDelay: numbers.MOUSE_LEAVE_DELAY,
  motion: true,
  onVisibleChange: noop,
  onClickOutSide: noop,
  spacing: numbers.SPACING,
  margin: numbers.MARGIN,
  showArrow: true,
  wrapWhenSpecial: true,
  zIndex: numbers.DEFAULT_Z_INDEX,
  closeOnEsc: false,
  guardFocus: false,
  returnFocusOnClose: false,
  onEscKeyDown: noop,
  disableFocusListener: false,
  disableArrowKeyDown: false,
};

const vuePropsType = vuePropsMake(propTypes, defaultProps)

const Tooltip = defineComponent<TooltipProps>((props, {expose}) => {

  const slots = useSlots()
  const eventManager = ref<Event>(new Event);
  let triggerEl = ref();
  const containerEl = ref();
  const initialFocusRef = ref();
  const resizeHandler = ref();
  let isWrapped: boolean;
  let mounted: any;
  let scrollHandler: any;
  let getPopupContainer: () => HTMLElement;
  let containerPosition: string;


  let clickOutsideHandler;


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
    isPositionUpdated: false,
    id: props.wrapperId, // auto generate id, will be used by children.aria-describedby & content.id, improve a11y
  })
  // TODO context
  const {adapter: adapterInject, context} = useBaseComponent<TooltipProps>(props, state)

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
      insertPortal: (content: TooltipProps['content'], {position, ...containerStyle}: { position: Position }) => {
        state.isInsert = true;
        state.transitionState = 'enter';
        // @ts-ignore
        state.containerStyle = {...state.containerStyle, containerStyle};

        nextTick(() => {
          setTimeout(() => {
            eventManager.value.emit('portalInserted');
          }, 0)
        })
      },
      removePortal: () => {
        state.isInsert = false;
        state.isPositionUpdated = false;
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
        state.triggerEventSet = triggerEventSet
      },
      registerPortalEvent: (portalEventSet: Record<string, any>) => {
        state.portalEventSet = portalEventSet
      },
      getTriggerBounding: () => {
        // eslint-disable-next-line
        // It may be a React component or an html element
        // There is no guarantee that triggerE l.current can get the real dom, so call findDOMNode to ensure that you can get the real dom
        const triggerDOM = theAdapter.getTriggerNode();
        triggerEl.value = triggerDOM
        return triggerDOM && triggerDOM.getBoundingClientRect();
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
          eventManager.value.emit('positionUpdated');
        })

      },
      updatePlacementAttr: (placement: Position) => {
        state.placement = placement
      },
      togglePortalVisible: (visible: boolean, cb: () => void) => {
        const willUpdateStates: Partial<TooltipState> = {};



        willUpdateStates.transitionState = visible ? 'enter' : 'leave';
        willUpdateStates.visible = visible;

        if (mounted){
          state.transitionState = willUpdateStates.transitionState
          state.visible = willUpdateStates.visible
          nextTick(() => {
            cb();
          })
        }
      },
      registerClickOutsideHandler: (cb: () => void) => {
        if (clickOutsideHandler) {
          theAdapter.unregisterClickOutsideHandler();
        }
        clickOutsideHandler = (e: any): any => {
          if (!mounted) {
            return false;
          }
          let el = triggerEl.value;
          let popupEl = containerEl.value;
          if (
            (el && !(el as any).contains(e.target) && popupEl && !(popupEl as any).contains(e.target)) ||
            (props.clickTriggerToHide && el && (el as any).contains(e.target))
          ) {
            props.onClickOutSide(e);
            cb();
          }
        };
        document.addEventListener('mousedown', clickOutsideHandler, {capture: true});
      },
      unregisterClickOutsideHandler: () => {
        if (clickOutsideHandler) {
          document.removeEventListener('mousedown', clickOutsideHandler, {capture: true});
          clickOutsideHandler = null;
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
          window.removeEventListener('resize', resizeHandler.value, false);
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
          const triggerDOM = theAdapter.getTriggerNode();
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
        const { preventScroll } = props;
        const focusRefNode = initialFocusRef.value;
        if (focusRefNode && 'focus' in focusRefNode) {
          focusRefNode.focus({ preventScroll });
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
    getPopupContainer = props.getPopupContainer || context.value.getPopupContainer || defaultGetContainer;
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
    foundation.removePortal();
    foundation.unBindEvent();
  };

  /** for transition - end */

  function rePosition() {
    return foundation.calcPosition();
  }




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

  const handlePortalMouseDown = (e: MouseEvent) => {
    if (props.stopPropagation) {
      stopPropagation(e);
    }
  }

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
    const { containerStyle = {}, visible, portalEventSet, placement, transitionState, id, isPositionUpdated } = state;
    const { prefixCls, content, showArrow, style, motion, role, zIndex }  = props;
    const contentNode = renderContentNode(content);
    const {className: propClassName} = props;
    const direction = context.value.direction;
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
      ...portalInnerStyle,
      left: portalInnerStyle.left + 'px',
      top: portalInnerStyle.top + 'px'
    }
    const inner =
      <CSSAnimation
        fillMode="forwards"
        animationState={transitionState as "enter" | "leave"}
        motion={motion && isPositionUpdated}
        startClassName={transitionState === 'enter' ? `${prefix}-animation-show` : `${prefix}-animation-hide`}
        onAnimationEnd={() => {
          if (transitionState === 'leave') {
            didLeave();
            props.afterClose?.();
          }
        }}
        children={({ animationStyle, animationClassName, animationEventsNeedBind }) => {
          return <div
            class={classNames(className, animationClassName)}
            style={{
              opacity: isPositionUpdated ? '1' : "0",
              ...animationStyle,
              transformOrigin,
              ...style,
            }}
            {...portalEventSet}
            {...animationEventsNeedBind}
            role={role}
            x-placement={placement}
            id={id}
          >
            {contentNode}
            {icon}
          </div>;
        }}
      >
      </CSSAnimation>;

    return (
      <Portal getPopupContainer={props.getPopupContainer} style={{zIndex}}>
        <div
          class={`${BASE_CLASS_PREFIX}-portal-inner`}
          style={portalInnerStyle}
          ref={containerEl}
          onClick={handlePortalInnerClick}
          onMousedown={handlePortalMouseDown}
          onKeydown={handlePortalInnerKeyDown}
        >
          {inner}
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

  const getPopupId = () => {
    return state.id;
  }

  expose({
    getPopupId
  })
  return () => {

    // 这里取的话，值可能会被缓存或者可能不是最新的
    // const { isInsert, triggerEventSet, visible, id } = state;
    const { wrapWhenSpecial, role, trigger } = props;
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
        if (trigger !== 'custom') {
          // no need to wrap span when trigger is custom, cause it don't need bind event
          children = wrapSpan(children);
        }
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
      ariaAttribute['aria-expanded'] = state.visible ? 'true' : 'false';
      ariaAttribute['aria-haspopup'] = 'dialog';
      ariaAttribute['aria-controls'] = state.id;
    } else {
      ariaAttribute['aria-describedby'] = state.id;
    }


    // The incoming children is a single valid element, otherwise wrap a layer with span
    const newChild = cloneVNode(children, {
      ...ariaAttribute,
      ...children.props,
      ...mergeEvents((children).props, state.triggerEventSet),
      style: {
        ...get(children, 'props.style'),
        ...extraStyle,
      },
      class: classNames(
        get(children, 'props.class')
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
        if(ref){
          if (typeof ref.r === 'function') {
            ref.r(node);
          } else if (ref.r && typeof ref.r === 'object' && isRef(ref.r)) {
            ref.r.value = node;
          }
        }
      },
      tabIndex: children.props?.tabIndex || 0, // a11y keyboard, in some condition select's tabindex need to -1 or 0
      'data-popupid': state.id
    });
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


