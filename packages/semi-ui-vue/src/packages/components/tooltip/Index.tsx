import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  CSSProperties,
  reactive,
  nextTick, onMounted, onUnmounted, isVNode, watch, cloneVNode, provide, inject, watchEffect,
} from 'vue'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { throttle, noop, get, omit, each, isEmpty } from 'lodash';

import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/base/constants';
import warning from '@douyinfe/semi-foundation/utils/warning';
import Event from '@douyinfe/semi-foundation/utils/Event';
import { ArrayElement } from '@douyinfe/semi-foundation/utils/type';
import { convertDOMRectToObject, DOMRectLikeType } from '@douyinfe/semi-foundation/utils/dom';
import TooltipFoundation, { TooltipAdapter, Position, PopupContainerDOMRect } from '../../../../../semi-foundation/tooltip/foundation';
import { strings, cssClasses, numbers } from '@douyinfe/semi-foundation/tooltip/constants';
import '@douyinfe/semi-foundation/tooltip/tooltip.scss';

import BaseComponent, {BaseProps, useBaseComponent} from '../_base/baseComponent';
import { isHTMLElement } from '../_base/reactUtils';
import { stopPropagation } from '../_utils';
import Portal from '../_portal/index';
import ConfigContext, {ContextValue} from '../configProvider/context';
import TriangleArrow from './TriangleArrow';
import TriangleArrowVertical from './TriangleArrowVertical';
import TooltipTransition from './TooltipStyledTransition';
import ArrowBoundingShape from './ArrowBoundingShape';
import { Motion } from '../_base/base';
import {DefaultAdapter} from "@douyinfe/semi-foundation/base/foundation";

export type Trigger = ArrayElement<typeof strings.TRIGGER_SET>;

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
  style: [Object,  String],
  content: [Object,  String, Number],
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
    type:[Boolean, Object],
    default: true,
  },
  zIndex: {
    type: Number,
    default: numbers.DEFAULT_Z_INDEX,
  },
  rePosKey: [String, Number],
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
}


const Index = defineComponent<TooltipProps>((props, {slots}) => {



  const eventManager = ref<Event>(new Event);
  let triggerEl = ref(null);
  const containerEl = ref(null);
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
    willUpdateStates:{
    },
  })
  const {cache, adapter: adapterInject, log, context} = useBaseComponent<TooltipProps>(props, state)

  const theAdapter = adapter()
  function adapter(): TooltipAdapter<TooltipProps, TooltipState> {
    return  {
      ...adapterInject<TooltipProps, TooltipState>(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      on: (...args: any[]) => eventManager.value.on(...args),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      off: (...args: any[]) => eventManager.value.off(...args),
      insertPortal: (content: string, { position, ...containerStyle }: { position: Position }) => {


        state.isInsert = true;
        state.transitionState = 'enter';
        // @ts-ignore
        state.containerStyle = containerStyle;
        console.log()


        nextTick(()=>{
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
      }),
      registerTriggerEvent: (triggerEventSet: Record<string, any>) => {
        //console.log(triggerEventSet)
        state.triggerEventSet = triggerEventSet
      },
      unregisterTriggerEvent: () => {},
      registerPortalEvent: (portalEventSet: Record<string, any>) => {

        state.portalEventSet = portalEventSet
      },
      unregisterPortalEvent: () => {},
      getTriggerBounding: () => {
        // eslint-disable-next-line
        // It may be a React component or an html element
        // There is no guarantee that triggerE l.current can get the real dom, so call findDOMNode to ensure that you can get the real dom
        let triggerDOM = triggerEl.value;
        return triggerDOM && (triggerDOM as Element).getBoundingClientRect();
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
        const el = containerEl.value && containerEl.value.current;
        return el && (el as Element).getBoundingClientRect();
      },
      getDocumentElementBounding: () => document.documentElement.getBoundingClientRect(),
      setPosition: ({ position, ...style }: { position: Position }) => {
        state.containerStyle = { ...state.containerStyle, ...style }
        state.placement = position
        nextTick(()=>{
          console.log('positionUpdated')
          eventManager.value.emit('positionUpdated');
        })

      },
      updatePlacementAttr: (placement: Position) => {
        state.placement = placement
      },
      togglePortalVisible: (visible: boolean, cb: () => void) => {
        const willUpdateStates: Partial<TooltipState> = {};

        if (theAdapter.canMotion()) {
          console.log(visible ? 'enter' : 'leave');
          willUpdateStates.transitionState = visible ? 'enter' : 'leave';
          willUpdateStates.visible = visible;
        } else {
          willUpdateStates.visible = visible;
        }

        state.transitionState = willUpdateStates.transitionState
        state.visible = willUpdateStates.visible



        //console.log('willUpdateStates')
        nextTick(()=>{
          cb();
        })
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
          let popupEl = containerEl.value && containerEl.value.current;
          if (
            (el && !(el as any).contains(e.target) && popupEl && !(popupEl as any).contains(e.target)) ||
            props.clickTriggerToHide
          ) {
            props.onClickOutSide(e);
            cb();
          }
        };
        document.addEventListener('click', clickOutsideHandler.value, false);
      },
      unregisterClickOutsideHandler: () => {
        if (clickOutsideHandler.value) {
          document.removeEventListener('click', clickOutsideHandler.value, false);
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
            const scrollPos = { x: e.target.scrollLeft, y: e.target.scrollTop };
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
    };
  }


  const foundationRef = ref(new TooltipFoundation(theAdapter));

  const setContainerEl = (node: any) => (containerEl.value = { current: node });


  onMounted(()=>{
    mounted = true;
    getPopupContainer = props.getPopupContainer || context.getPopupContainer || defaultGetContainer;
    foundationRef.value.init();
  })

  onUnmounted(()=>{
    mounted = false;
    foundationRef.value.destroy();
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

  const willEnter = () => {
    foundationRef.value.calcPosition();
    /**
     * Dangerous: remove setState in motion fix #1379
     * because togglePortalVisible callback function will use visible state to notifyVisibleChange
     * if visible state is old value, then notifyVisibleChange function will not be called
     * we should ensure that after calling togglePortalVisible, callback function can get right visible value
     */
    // this.setState({ visible: true });
  };
  const didLeave = () => {
    // console.error('didLeave')
    theAdapter.unregisterClickOutsideHandler();
    theAdapter.unregisterScrollHandler();
    theAdapter.unregisterResizeHandler();
    theAdapter.removePortal();
  };

  /** for transition - end */

  function rePosition() {
    return foundationRef.value.calcPosition();
  }

  watchEffect(()=>{
    //console.log(state.willUpdateStates,props.visible,props.rePosKey);
  })



  watch([()=>props.mouseLeaveDelay,()=>props.mouseEnterDelay], ()=>{
    warning(
      props.mouseLeaveDelay < props.mouseEnterDelay,
      "[Semi Tooltip] 'mouseLeaveDelay' cannot be less than 'mouseEnterDelay', which may cause the dropdown layer to not be hidden."
    );
  })
  watch(()=>props.visible, ()=>{
    props.visible ? foundationRef.value.delayShow() : foundationRef.value.delayHide();
  })
  watch(()=>props.rePosKey, ()=>{
    rePosition();
  })

  watch(state, ()=>{
    // console.log(state)
  })


  const renderIcon = () => {
    const { placement } = state;
    const { showArrow, prefixCls, style } = props;
    let icon = null;
    const triangleCls = classNames([`${prefixCls}-icon-arrow`]);
    const bgColor = get(style, 'backgroundColor');

    const iconComponent = placement.includes('left') || placement.includes('right') ?
      <TriangleArrowVertical /> :
      <TriangleArrow />;
    if (showArrow) {
      if (isVNode(showArrow)) {
        icon = showArrow;
      } else {
        icon = cloneVNode(iconComponent, { className: triangleCls, style: { color: bgColor, fill: 'currentColor' } });
      }
    }

    return icon;
  };

  const handlePortalInnerClick = (e: any) => {
    if (props.clickToHide) {
      foundationRef.value.hide();
    }
    if (props.stopPropagation) {
      stopPropagation(e);
    }
  };

  watch(()=>state.visible, ()=>{
    //console.log(state.visible);
  }, {immediate:true})
  const renderPortal = () => {
    const { containerStyle = {}, visible, portalEventSet, placement, transitionState } = state;
    const { prefixCls, content, showArrow, style, motion, zIndex } = props;
    const { className: propClassName } = props;
    const direction = context.direction;
    const className = classNames(propClassName, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-show`]: visible,
      [`${prefixCls}-with-arrow`]: Boolean(showArrow),
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    const icon = renderIcon();
    let portalInnerStyle:CSSProperties = omit(containerStyle, motion ? ['transformOrigin'] : undefined);
    const transformOrigin = get(containerStyle, 'transformOrigin');

    // console.error(visible)
    console.error(portalInnerStyle)
    portalInnerStyle = { ...portalInnerStyle, ...{...portalInnerStyle,left: portalInnerStyle.left + 'px', top: portalInnerStyle.top + 'px'} }
    return (
      <Portal getPopupContainer={props.getPopupContainer} style={{ zIndex }}>
        <div
          class={`${BASE_CLASS_PREFIX}-portal-inner`}
          style={portalInnerStyle}
          ref={setContainerEl}
          onClick={handlePortalInnerClick}
        >
          {motion ? (
            <TooltipTransition transitionState={state.transitionState} position={placement} willEnter={willEnter} didLeave={didLeave} motion={motion}>
              {{//state.transitionState === 'enter'
                // TODO 离开时 先 改变 样式再消失
                // default: state.transitionState === 'enter' ? ({animateCls, animateStyle, animateEvents}: any) => {
                default: ({animateCls, animateStyle, animateEvents}: any) => {

                  //console.log({animateCls, animateStyle, animateEvents, portalEventSet})
                  // console.error(className)
                  //  console.error(state.transitionState,animateStyle)

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
                  >
                    {content}
                    {icon}
                  </div>)
                }
              }}
            </TooltipTransition>
          ) : (
            <div class={className} {...portalEventSet} x-placement={placement} style={style}>
              {content}
              {icon}
            </div>
          )}
        </div>
      </Portal>
    );
  };

  const wrapSpan = (elem: any) => {
    const { wrapperClassName } = props;
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

    const { triggerEventSet } = state;
    const { wrapWhenSpecial } = props;
    let children:any = slots.default()[0];
    const childrenStyle = { ...get(children, 'props.style') };
    const extraStyle: CSSProperties = {};

    if (wrapWhenSpecial) {
      const isSpecial_ = isSpecial(children);

      if (isSpecial_) {
        childrenStyle.pointerEvents = 'none';

        if (isSpecial_ === strings.STATUS_DISABLED) {
          extraStyle.cursor = 'not-allowed';
        }

        children = cloneVNode(children, { style: childrenStyle });
        children = wrapSpan(children);
        isWrapped = true;
      } else if (!isVNode(children)) {
        children = wrapSpan(children);
        isWrapped = true;
      }
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
      className: classNames(
        get(children, 'props.className')
        // `${prefixCls}-trigger`
      ),
      // to maintain refs with callback
      ref: (node: any) => {
        console.log(node)
        // Keep your own reference
        triggerEl.value = node;
        // Call the original ref, if any
        const { ref } = children as any;
        // this.log('tooltip render() - get ref', ref);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && typeof ref === 'object') {
          ref.current = node;
        }
      },
    });

    //console.log(children.props, {...mergeEvents((children).props, triggerEventSet)})
    // If you do not add a layer of div, in order to bind the events and className in the tooltip, you need to cloneElement children, but this time it may overwrite the children's original ref reference
    // So if the user adds ref to the content, you need to use callback ref: https://github.com/facebook/react/issues/8873
    return (
      <div>
        {state.isInsert ? renderPortal() : null}
        {newChild}
      </div>
    );
  }
})

Index.props = vuePropsType

export default Index


