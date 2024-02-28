import * as PropTypes from '../PropTypes';
import Portal from '../_portal';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/sideSheet/constants';
import SideSheetContent from './SideSheetContent';
import { noop } from 'lodash';
import SideSheetFoundation, {
  SideSheetAdapter,
  SideSheetProps,
  SideSheetState,
} from '@douyinfe/semi-foundation/sideSheet/sideSheetFoundation';
import '@douyinfe/semi-foundation/sideSheet/sideSheet.scss';
import CSSAnimation from '../_cssAnimation';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  Fragment,
  h,
  onBeforeUnmount,
  onMounted, PropType,
  reactive,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { useConfigContext } from '../configProvider/context/Consumer';
import { VueJsxNode } from '../interface';
import {func, vuePropsMake} from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { getScrollbarWidth } from "../_utils";


const prefixCls = cssClasses.PREFIX;
const defaultWidthList = strings.WIDTH;
const defaultHeight = strings.HEIGHT;

export type { SideSheetContentProps } from './SideSheetContent';

export interface SideSheetReactProps extends SideSheetProps {
  bodyStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  maskStyle?: CSSProperties;
  style?: CSSProperties;
  title?: VueJsxNode;
  footer?: VueJsxNode;
  onCancel?: (e: MouseEvent | KeyboardEvent) => void;
}

export type { SideSheetState };

const propTypes:ComponentObjectPropsOptions<SideSheetProps> = {
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  className: PropTypes.string,
  closable: PropTypes.bool,
  disableScroll: PropTypes.bool,
  getPopupContainer: PropTypes.func as PropType<SideSheetProps['getPopupContainer']>,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  maskStyle: PropTypes.object,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
  onCancel: PropTypes.func as PropType<SideSheetProps['onCancel']>,
  placement: PropTypes.string as PropType<SideSheetProps['placement']>,
  size: PropTypes.string as PropType<SideSheetProps['size']>,
  style: PropTypes.object,
  title: PropTypes.node,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zIndex: PropTypes.number,
  afterVisibleChange: PropTypes.func as PropType<SideSheetProps['afterVisibleChange']>,
  closeOnEsc: PropTypes.bool,
  footer: PropTypes.node,
  keepDOM: PropTypes.bool,
  'aria-label': PropTypes.string,
};

const defaultProps: SideSheetReactProps = {
  visible: false,
  motion: true,
  mask: true,
  placement: 'right',
  closable: true,
  footer: null,
  zIndex: 1000,
  maskClosable: true,
  size: 'small',
  disableScroll: true,
  closeOnEsc: false,
  afterVisibleChange: noop,
  keepDOM: false,
};
export const vuePropsType = vuePropsMake<SideSheetProps>(propTypes, defaultProps);
const SideSheet = defineComponent<SideSheetProps>((props, {}) => {
  const slots = useSlots();

  let bodyOverflow: string = '';
  let scrollBarWidth: number = 0;
  let originBodyWidth: string = '100%';

  let _active: boolean;
  const state = reactive({ displayNone: !props.visible });
  const { context } = useConfigContext();

  const { adapter: adapterInject } = useBaseComponent<SideSheetProps>(props, state);
  function adapter_(): SideSheetAdapter {
    return {
      ...adapterInject(),
      disabledBodyScroll: () => {
        const { getPopupContainer } = props;
        bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${originBodyWidth || '100%'} - ${scrollBarWidth}px)`;

        }
      },
      enabledBodyScroll: () => {
        const { getPopupContainer } = props;
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = bodyOverflow;
          document.body.style.width = originBodyWidth;
        }
      },
      notifyCancel: (e: MouseEvent | KeyboardEvent) => {
        props.onCancel && props.onCancel(e);
      },
      notifyVisibleChange: (visible: boolean) => {
        props.afterVisibleChange(visible);
      },
      setOnKeyDownListener: () => {
        if (window) {
          window.addEventListener('keydown', handleKeyDown);
        }
      },
      removeKeyDownListener: () => {
        if (window) {
          window.removeEventListener('keydown', handleKeyDown);
        }
      },
      toggleDisplayNone: (displayNone: boolean) => {
        if (displayNone !== state.displayNone) {
          state.displayNone = displayNone;
        }
      },
    };
  }
  const adapter = adapter_();
  const foundation = new SideSheetFoundation(adapter);

  function getDerivedStateFromProps(props: SideSheetReactProps) {
    const newState: Partial<SideSheetState> = {};

    if (props.visible && state.displayNone) {
      newState.displayNone = false;
    }

    if (!props.visible && !props.motion && !state.displayNone) {
      newState.displayNone = true;
    }
    return newState;
  }

  watch([() => props.visible, () => props.motion, () => state.displayNone], () => {
    const newState = getDerivedStateFromProps(props);
    if (newState) {
      Object.keys(newState).forEach((key) => {
        state[key] = newState[key];
      });
    }
  });

  onMounted(() => {
    scrollBarWidth = getScrollbarWidth();
    originBodyWidth = document.body.style.width;
    if (props.visible) {
      foundation.beforeShow();
    }
  });

  watch(
    [() => props.visible, () => state.displayNone],
    (value, [prevPropsVisible, prevStateDisplayNone], onCleanup) => {
      // hide => show
      if (!prevPropsVisible && props.visible) {
        foundation.beforeShow();
      }
      // show => hide
      if (prevPropsVisible && !props.visible) {
        foundation.afterHide();
      }

      if (prevStateDisplayNone !== state.displayNone) {
        foundation.onVisibleChange(!state.displayNone);
      }
    }
  );

  onBeforeUnmount(() => {
    if (props.visible) {
      foundation.destroy();
    }
  });

  const handleCancel = (e: MouseEvent) => {
    foundation.handleCancel(e);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    foundation.handleKeyDown(e);
  };

  const updateState = () => {
    foundation.toggleDisplayNone(!props.visible);
  };

  function renderContent() {
    const {
      placement,
      className,
      width,
      height,
      motion,
      visible,
      style,
      maskStyle,
      size,
      zIndex,
      getPopupContainer,
      keepDOM,
      afterVisibleChange,
      disableScroll,
      closeOnEsc,
      ...props_
    } = props;
    let wrapperStyle: CSSProperties = {
      zIndex,
    };
    if (getPopupContainer) {
      wrapperStyle = {
        zIndex,
        position: 'static',
      };
    }
    const { direction } = context.value;
    const isVertical = placement === 'left' || placement === 'right';
    const isHorizontal = placement === 'top' || placement === 'bottom';
    const sheetWidth = isVertical ? (width ? width : defaultWidthList[size]) : '100%';
    const sheetHeight = isHorizontal ? (height ? height : defaultHeight) : '100%';
    const classList = cls(prefixCls, className, {
      [`${prefixCls}-${placement}`]: placement,
      [`${prefixCls}-popup`]: getPopupContainer,
      [`${prefixCls}-horizontal`]: isHorizontal,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-hidden`]: keepDOM && state.displayNone,
    });
    const contentProps = {
      ...(isVertical ? (width ? { width } : {}) : { width: "100%" }),
      ...props_,
      visible,
      motion: false,
      size,
      className: classList,
      width: sheetWidth,
      height: sheetHeight,
      onClose: handleCancel,
    };
    const shouldRender = props.visible || props.keepDOM || (props.motion && !state.displayNone);
    /* When there is animation, we use displayNone to judge whether animation is ended and judge whether to unmount content */ // Since user could change animate duration , we don't know which animation end first. So we call updateState func twice.
    return (
      <CSSAnimation
        motion={props.motion}
        animationState={visible ? 'enter' : 'leave'}
        startClassName={visible ? `${prefixCls}-animation-mask_show` : `${prefixCls}-animation-mask_hide`}
        onAnimationEnd={updateState}
        children={({
          animationClassName: maskAnimationClassName,
          animationEventsNeedBind: maskAnimationEventsNeedBind,
        }) => {
          return (
            <CSSAnimation
              motion={props.motion}
              animationState={visible ? 'enter' : 'leave'}
              startClassName={
                visible
                  ? `${prefixCls}-animation-content_show_${props.placement}`
                  : `${prefixCls}-animation-content_hide_${props.placement}`
              }
              onAnimationEnd={updateState /* for no mask case*/}
              children={({ animationClassName, animationStyle, animationEventsNeedBind }) => {
                return shouldRender ? (
                  <Portal getPopupContainer={getPopupContainer} style={wrapperStyle}>
                    <SideSheetContent
                      {...contentProps}
                      maskExtraProps={maskAnimationEventsNeedBind}
                      wrapperExtraProps={animationEventsNeedBind}
                      dialogClassName={animationClassName}
                      maskClassName={maskAnimationClassName}
                      maskStyle={{ ...maskStyle }}
                      style={{ ...animationStyle, ...style }}
                    >
                      {{
                        default: slots.default,
                      }}
                    </SideSheetContent>
                  </Portal>
                ) : null;
              }}
            ></CSSAnimation>
          );
        }}
      ></CSSAnimation>
    );
  }

  return () => {
    // const {
    //   zIndex,
    //   getPopupContainer,
    //   visible
    // } = props;

    return renderContent();
  };
}, {
  props: vuePropsType,
  name: 'SideSheet'
});


export default SideSheet;
