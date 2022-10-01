import {cssClasses, strings} from '@douyinfe/semi-foundation/modal/constants';
import Button from '../button';
import ModalFoundation, {ModalAdapter, ModalProps, ModalState} from '@douyinfe/semi-foundation/modal/modalFoundation';
import ModalContent from './ModalContent';
import Portal from '../_portal';
import LocaleConsumer_ from '../locale/localeConsumer';
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import {noop} from 'lodash';
import '@douyinfe/semi-foundation/modal/modal.scss';
import BaseComponent, {useBaseComponent} from '../_base/baseComponent';
import confirm, {withConfirm, withError, withInfo, withSuccess, withWarning} from './confirm';
import {Locale} from '../locale/interface';
import useModal from './useModal';
import {ButtonProps} from '../button/Button';
import {MotionObject} from "@douyinfe/semi-foundation/utils/type";
import {
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots,
  VNode,
  watch
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {CascaderProps} from "../cascader";

export const destroyFns: any[] = [];
export type ConfirmType = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export type Directions = 'ltr' | 'rtl';
export type {ModalState};

export interface ModalReactProps extends ModalProps {
  getContainerContext?: () => ({ Provider: VNode }),
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  bodyStyle?: CSSProperties;
  maskStyle?: CSSProperties;
  style?: CSSProperties;
  icon?: VNode | string;
  closeIcon?: VNode | string;
  title?: VNode | string;
  content?: VNode | string;
  footer?: VNode | string;
  header?: VNode | string;
  onCancel?: (e: MouseEvent) => void | Promise<any>;
  onOk?: (e: MouseEvent) => void | Promise<any>;
}


const LocaleConsumer = LocaleConsumer_()

const propTypes = {
  mask: PropTypes.bool,
  closable: PropTypes.bool,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  confirmLoading: PropTypes.bool,
  cancelLoading: PropTypes.bool,
  okText: PropTypes.string,
  okType: PropTypes.string,
  cancelText: PropTypes.string,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  afterClose: PropTypes.func,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  maskStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  zIndex: PropTypes.number,
  title: PropTypes.node,
  icon: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  hasCancel: PropTypes.bool,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  getPopupContainer: PropTypes.func,
  getContainerContext: PropTypes.func,
  maskFixed: PropTypes.bool,
  closeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  closeOnEsc: PropTypes.bool,
  size: String,
  keepDOM: PropTypes.bool,
  lazyRender: PropTypes.bool,
  direction: String,
  fullScreen: PropTypes.bool,
  content: [Object, String],
  type: String,
};
const defaultProps = {
  zIndex: 1000,
  motion: true,
  mask: true,
  centered: false,
  closable: true,
  visible: false,
  confirmLoading: false,
  cancelLoading: false,
  okType: 'primary',
  maskClosable: true,
  hasCancel: true,
  onCancel: noop,
  onOk: noop,
  afterClose: noop,
  maskFixed: false,
  closeOnEsc: true,
  size: 'small',
  keepDOM: false,
  lazyRender: true,
  fullScreen: false,
  getContainerContext: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)

console.log(vuePropsType)
const Modal = defineComponent<ModalReactProps>((props, {expose}) => {

  const slots = useSlots()

  const state = reactive<ModalState>({
    hidden: !props.visible,
    isFullScreen: props.fullScreen,
  });
  const modalRef = ref();
  let bodyOverflow = '';
  let scrollBarWidth = 0;
  let originBodyWith = '100%';

  let _active: boolean;


  const {cache, adapter: adapterInject, log, context} = useBaseComponent<ModalReactProps>(props, state)

  function adapter_(): ModalAdapter {
    return {
      ...adapterInject<ModalReactProps, ModalState>(),
      // getProps: () => props,
      disabledBodyScroll: () => {
        const {getPopupContainer} = props;
        bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${originBodyWith || '100%'} - ${scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        const {getPopupContainer} = props;
        if (!getPopupContainer && bodyOverflow !== 'hidden') {
          document.body.style.overflow = bodyOverflow;
          document.body.style.width = originBodyWith;
        }
      },
      notifyCancel: (e: MouseEvent) => {
        props.onCancel(e);
      },
      notifyOk: (e: MouseEvent) => {
        props.onOk(e);
      },
      notifyClose: () => {
        (props.motion as MotionObject)?.didLeave?.();
        props.afterClose();
      },
      toggleHidden: (hidden: boolean, callback?: (hidden: boolean) => void) => {
        if (hidden !== state.hidden) {
          state.hidden = hidden
          nextTick(callback || noop)
        }
      },
      notifyFullScreen: (isFullScreen: boolean) => {
        if (isFullScreen !== state.isFullScreen) {
          state.isFullScreen = isFullScreen;
        }
      },
    };
  }

  const adapter = adapter_()
  const foundation = new ModalFoundation(adapter);

  function getDerivedStateFromProps(props: ModalReactProps, prevState: ModalState) {
    const newState: Partial<ModalState> = {};

    if (props.fullScreen !== prevState.isFullScreen) {
      newState.isFullScreen = props.fullScreen;
    }


    return newState;
  }

  watch(() => props.fullScreen, (value) => {
    getDerivedStateFromProps(props, state)
  })

  function getScrollbarWidth() {
    if (globalThis && Object.prototype.toString.call(globalThis) === '[object Window]') {
      return window.innerWidth - document.documentElement.clientWidth;
    }
    return 0;
  }


  expose({
    getScrollbarWidth,
  })

  onMounted(() => {
    scrollBarWidth = getScrollbarWidth();
    originBodyWith = document.body.style.width;
    if (props.visible) {
      foundation.beforeShow();
      _active = _active || props.visible;
    }
  })

  watch(() => props.visible, (value, oldValue) => {
    // hide => show
    if (!oldValue && value) {
      foundation.beforeShow();
    }
    // show => hide
    if (oldValue && !value) {
      foundation.afterHide();
    }

  })

  watch(() => props.motion, () => {
    if (!props.motion) {
      updateHiddenState();
    }
  })

  onUnmounted(() => {
    if (props.visible) {
      foundation.destroy();
    }
  })

  const handleCancel = (e: MouseEvent) => {
    foundation.handleCancel(e);
  };

  const handleOk = (e: MouseEvent) => {
    foundation.handleOk(e);
  };

  const updateHiddenState = () => {
    const {visible} = props;
    const {hidden} = state;
    if (!visible && !hidden) {
      foundation.toggleHidden(true, () => foundation.afterClose());
    } else if (visible && state.hidden) {
      foundation.toggleHidden(false);
    }
  };

  const renderFooter = (): VNode => {
    const {
      okText,
      okType,
      cancelText,
      confirmLoading,
      cancelLoading,
      hasCancel,
    } = props;
    const getCancelButton = (locale: Locale['Modal']) => {
      if (!hasCancel) {
        return null;
      } else {
        return (
          <Button
            aria-label="cancel"
            onClick={handleCancel}
            loading={cancelLoading}
            type="tertiary"
            autoFocus={true}
            {...props.cancelButtonProps}
            x-semi-children-alias="cancelText"
          >
            {cancelText || locale.cancel}
          </Button>
        );
      }
    };

    return (
      <LocaleConsumer componentName="Modal">
        {(locale: Locale['Modal'], localeCode: Locale['code']) => (
          <div>
            {getCancelButton(locale)}
            <Button
              aria-label="confirm"
              type={okType}
              theme="solid"
              loading={confirmLoading}
              onClick={handleOk}
              {...props.okButtonProps}
              x-semi-children-alias="okText"
            >
              {okText || locale.confirm}
            </Button>
          </div>
        )}
      </LocaleConsumer>
    );
  };

  // getDialog = () => {
  //     const {
  //         footer,
  //         ...restProps
  //     } = props;
  //     const renderFooter = 'footer' in props ? footer : renderFooter();
  //     return <ModalContent {...restProps} footer={renderFooter} onClose={handleCancel}/>;
  // };

  const renderDialog = () => {
    let {
      footer,
      className,
      motion,
      maskStyle: maskStyleFromProps,
      keepDOM,
      style: styleFromProps,
      zIndex,
      getPopupContainer,
      visible,
      getContainerContext,
      ...restProps
    } = props;

    let style = styleFromProps;
    const maskStyle = maskStyleFromProps;
    const renderFooter_ = 'footer' in adapter.getProps() ? footer : renderFooter();
    let wrapperStyle: CSSProperties = {
      zIndex,
      width: '10px'
    };
    if (getPopupContainer) {
      wrapperStyle = {
        zIndex,
        position: 'static',
      };
    }

    const classList = cls(className, {
      [`${cssClasses.DIALOG}-displayNone`]: keepDOM && state.hidden && !visible,
    });
    const contentClassName = motion ? cls({
      [`${cssClasses.DIALOG}-content-animate-hide`]: !visible,
      [`${cssClasses.DIALOG}-content-animate-show`]: visible
    }) : null;
    const maskClassName = motion ? cls({
      [`${cssClasses.DIALOG}-mask-animate-hide`]: !visible,
      [`${cssClasses.DIALOG}-mask-animate-show`]: visible
    }) : null;
    return (
      <Portal style={wrapperStyle} getPopupContainer={getPopupContainer}>
        <ModalContent
          getContainerContext={()=>{}}
          {...restProps}
          isFullScreen={state.isFullScreen}
          contentClassName={contentClassName}
          maskClassName={maskClassName}
          className={classList}
          getPopupContainer={getPopupContainer}
          maskStyle={maskStyle}
          style={style}
          ref={modalRef}
          onAnimationEnd={() => {
            updateHiddenState();
          }}
          footer={renderFooter_}
          onClose={handleCancel}>
          {{
            default: slots.default
          }}
        </ModalContent>
      </Portal>
    );
  };
  return () => {
    const {
      visible,
      keepDOM,
      lazyRender,
    } = props;
    _active = _active || visible;
    const shouldRender = ((visible || keepDOM) && (!lazyRender || _active)) || !state.hidden;
    if (shouldRender) {
      return renderDialog();
    }

    return null;
  }
})

Modal.props = vuePropsType
Modal.name = 'Modal'


const info = function (props: ModalReactProps) {
  return confirm<ReturnType<typeof withInfo>>(withInfo(props));
};

const success = function (props: ModalReactProps) {
  return confirm<ReturnType<typeof withSuccess>>(withSuccess(props));
};

const error = function (props: ModalReactProps) {
  return confirm<ReturnType<typeof withError>>(withError(props));
};

const warning = function (props: ModalReactProps) {
  return confirm<ReturnType<typeof withWarning>>(withWarning(props));
};

const confirm_ = function (props: ModalReactProps) {
  return confirm<ReturnType<typeof withConfirm>>(withConfirm(props));
};

const destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};
Modal.info = info
Modal.success = success
Modal.error = error
Modal.warning = warning
Modal.confirm = confirm_
Modal.destroyAll = destroyAll
Modal.useModal = useModal
export default Modal

