/* eslint-disable eqeqeq */
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/modal/constants';
import Button from '../iconButton';
import { Title as TypographyTitle } from '../typography';
import { useBaseComponent } from '../_base/baseComponent';
// eslint-disable-next-line max-len
import ModalContentFoundation, {
  ModalContentAdapter,
  ModalContentProps,
  ModalContentState,
} from '@douyinfe/semi-foundation/modal/modalContentFoundation';
import { get, isFunction, isNumber, noop } from 'lodash';
import { IconClose } from '@kousum/semi-icons-vue';
import FocusTrapHandle from '@douyinfe/semi-foundation/utils/FocusHandle';
import {
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  VNodeRef,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useConfigContext } from '../configProvider/context/Consumer';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { useAttrs } from 'vue';
import { CombineProps } from '../interface';

let uuid = 0;

export interface ModalContentReactProps extends ModalContentProps {}

const propTypes: CombineProps<ModalContentReactProps> = {
  onClose: {
    type: Function as PropType<ModalContentReactProps['onClose']>,
    required: true
  },
  // close: PropTypes.func as PropType<ModalContentReactProps['close']>,
  getContainerContext: {
    type: PropTypes.func as PropType<ModalContentReactProps['getContainerContext']>,
    required: true
  },
  contentClassName: PropTypes.string,
  maskClassName: PropTypes.string,
  onAnimationEnd: PropTypes.func as PropType<ModalContentReactProps['onAnimationEnd']>,
  preventScroll: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  maskExtraProps: Object,
  contentExtraProps: Object,

  title: PropTypes.any,
  afterClose: Function as PropType<ModalContentReactProps['afterClose']>,
  bodyStyle: Object,
  cancelButtonProps: PropTypes.any,
  cancelText: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
  closable: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  cancelLoading: PropTypes.bool,
  content: {
    type: PropTypes.any,
    default: undefined,
  },
  footer: {
    type: PropTypes.any,
    default: undefined,
  },
  hasCancel: PropTypes.bool,
  header: {
    type: PropTypes.any,
    default: undefined,
  },
  height: [PropTypes.bool, PropTypes.string] as PropType<ModalContentReactProps['height']>,
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  maskStyle: Object,
  maskFixed: PropTypes.bool,
  motion: PropTypes.any as PropType<ModalContentReactProps['motion']>,
  okButtonProps: PropTypes.any,
  okText: String,
  okType: String as PropType<ModalContentReactProps['okType']>,
  onCancel: Function as PropType<ModalContentReactProps['onCancel']>,
  onOk: Function as PropType<ModalContentReactProps['onOk']>,
  style: Object,
  visible: PropTypes.bool,
  width: [String, Number],
  zIndex: Number,
  icon: PropTypes.any,
  getPopupContainer: Function as PropType<ModalContentReactProps['getPopupContainer']>,
  closeIcon: PropTypes.any,
  closeOnEsc: PropTypes.bool,
  size: String as PropType<ModalContentReactProps['size']>,
  lazyRender: PropTypes.bool,
  keepDOM: PropTypes.bool,
  direction: PropTypes.any,
  fullScreen: PropTypes.bool,
  modalContentClass: String,
  footerFill: Boolean,
};
const defaultProps = {
  close: noop,
  onClose: noop,
  getContainerContext: noop,
  contentClassName: '',
  maskClassName: '',
};
export const vuePropsType = vuePropsMake<ModalContentReactProps>(propTypes, defaultProps);
const ModalContent = defineComponent({
  props: { ...vuePropsType },
  name: 'ModalContent',
  setup(props, {}) {
    const slots = useSlots();
    const attr = useAttrs();
    let timeoutId: NodeJS.Timeout;

    let { context } = useConfigContext();
    let focusTrapHandle: FocusTrapHandle;

    const state = reactive<ModalContentState>({
      dialogMouseDown: false,
      prevFocusElement: FocusTrapHandle.getActiveElement(),
    });
    let dialogId: string = `dialog-${uuid++}`;
    const modalDialogRef = ref();

    const { adapter: adapterInject } = useBaseComponent<ModalContentReactProps>(props, state);
    function adapter_(): ModalContentAdapter {
      return {
        ...adapterInject<ModalContentReactProps, ModalContentState>(),
        notifyClose: (e: MouseEvent) => {
          props.onClose(e);
        },
        notifyDialogMouseDown: () => {
          state.dialogMouseDown = true;
        },
        notifyDialogMouseUp: () => {
          if (state.dialogMouseDown) {
            // Not setting setTimeout triggers close when modal external mouseUp
            timeoutId = setTimeout(() => {
              state.dialogMouseDown = false;
            }, 0);
          }
        },
        addKeyDownEventListener: () => {
          if (props.closeOnEsc) {
            document.addEventListener('keydown', foundation.handleKeyDown.bind(foundation));
          }
        },
        removeKeyDownEventListener: () => {
          if (props.closeOnEsc) {
            document.removeEventListener('keydown', foundation.handleKeyDown.bind(foundation));
          }
        },
        getMouseState: () => state.dialogMouseDown,
        modalDialogFocus: () => {
          const { preventScroll } = props;
          let activeElementInDialog;
          if (modalDialogRef.value) {
            const activeElement = FocusTrapHandle.getActiveElement();
            activeElementInDialog = modalDialogRef.value.contains(activeElement);
            focusTrapHandle?.destroy();
            focusTrapHandle = new FocusTrapHandle(modalDialogRef.value, { preventScroll });
          }
          if (!activeElementInDialog) {
            modalDialogRef?.value.focus({ preventScroll });
          }
        },
        modalDialogBlur: () => {
          modalDialogRef.value.blur();
          focusTrapHandle?.destroy();
        },
        prevFocusElementReFocus: () => {
          const { prevFocusElement } = state;
          const { preventScroll } = props;
          const focus = get(prevFocusElement, 'focus');
          isFunction(focus) && prevFocusElement.focus({ preventScroll });
        },
      };
    }
    const adapter = adapter_();
    const foundation = new ModalContentFoundation(adapter);

    onMounted(() => {
      foundation.handleKeyDownEventListenerMount();
      foundation.modalDialogFocus();
      const nodes = FocusTrapHandle.getFocusableElements(modalDialogRef.value);
      if (!modalDialogRef.value.contains(document.activeElement)) {
        // focus on first focusable element
        nodes[0]?.focus();
      }
    });

    onBeforeUnmount(() => {
      clearTimeout(timeoutId);
      foundation.destroy();
    });

    const onKeyDown = (e: MouseEvent) => {
      foundation.handleKeyDown(e);
    };

    // Record when clicking the modal box
    const onDialogMouseDown = () => {
      foundation.handleDialogMouseDown();
    };

    // Cancel recording when clicking the modal box at the end
    const onMaskMouseUp = () => {
      foundation.handleMaskMouseUp();
    };

    // onMaskClick will judge dialogMouseDown before onMaskMouseUp updates dialogMouseDown
    const onMaskClick = (e: MouseEvent) => {
      foundation.handleMaskClick(e);
    };

    const close = (e: MouseEvent) => {
      foundation.close(e);
    };

    const getMaskElement = () => {
      const { mask, maskClassName } = props;
      if (mask) {
        const className = cls(`${cssClasses.DIALOG}-mask`, {
          // [`${cssClasses.DIALOG}-mask-hidden`]: !props.visible,
        });
        return <div key="mask" class={cls(className, maskClassName)} style={props.maskStyle} />;
      }
      return null;
    };

    const renderCloseBtn = () => {
      const { closable, closeIcon } = props;
      let closer;
      if (closable) {
        const iconType = (typeof closeIcon === 'function' ? closeIcon() : closeIcon) || (
          <IconClose x-semi-prop="closeIcon" />
        );
        closer = (
          <Button
            aria-label="close"
            class={`${cssClasses.DIALOG}-close`}
            key="close-btn"
            onClick={close}
            type="tertiary"
            icon={iconType}
            theme="borderless"
            size="small"
          />
        );
      }
      return closer;
    };

    const renderIcon = () => {
      const { icon } = props;
      return icon ? (
        <span class={`${cssClasses.DIALOG}-icon-wrapper`} x-semi-prop="icon">
          {typeof icon === 'function' ? icon() : icon}
        </span>
      ) : null;
    };

    const renderHeader = () => {
      if ('header' in adapter.getProps()) {
        return typeof props.header === 'function' ? props.header() : props.header;
      }
      const { title } = props;
      const closer = renderCloseBtn();
      const icon = renderIcon();
      return title === null || title === undefined ? null : (
        <div class={`${cssClasses.DIALOG}-header`}>
          {icon}
          <TypographyTitle
            heading={5}
            class={`${cssClasses.DIALOG}-title`}
            id={`${cssClasses.DIALOG}-title`}
            x-semi-prop="title"
          >
            {title}
          </TypographyTitle>
          {closer}
        </div>
      );
    };

    const renderBody = () => {
      const { bodyStyle, title } = props;
      const bodyCls = cls(`${cssClasses.DIALOG}-body`, {
        [`${cssClasses.DIALOG}-withIcon`]: props.icon,
      });
      const closer = renderCloseBtn();
      const icon = renderIcon();
      const hasHeader = (title !== null && title !== undefined) || 'header' in adapter.getProps();
      return hasHeader ? (
        <div class={bodyCls} id={`${cssClasses.DIALOG}-body`} style={bodyStyle} x-semi-prop="children">
          {{
            default: slots.default,
          }}
        </div>
      ) : (
        <div class={`${cssClasses.DIALOG}-body-wrapper`}>
          {icon}
          <div class={bodyCls} style={bodyStyle} x-semi-prop="children">
            {{
              default: slots.default,
            }}
          </div>
          {closer}
        </div>
      );
    };

    const getDialogElement = () => {
      const style: CSSProperties = {};
      const digCls = cls(`${cssClasses.DIALOG}`, {
        [`${cssClasses.DIALOG}-centered`]: props.centered,
        [`${cssClasses.DIALOG}-${props.size}`]: props.size,
      });
      if (props.width) {
        style.width = isNumber(props.width) ? props.width + 'px' : props.width;
      }
      if (props.height) {
        style.height = isNumber(props.height) ? props.height + 'px' : props.height;
      }
      if (props.isFullScreen) {
        style.width = '100%';
        style.height = '100%';
        style.margin = 'unset';
      }
      const body = renderBody();
      const header = renderHeader();
      const footer = props.footer ? (
        <div class={`${cssClasses.DIALOG}-footer`} x-semi-prop="footer">
          {props.footer}
        </div>
      ) : null;
      const dialogElement = (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key="dialog-element"
          class={digCls}
          onMousedown={onDialogMouseDown}
          style={{ ...props.style, ...style }}
          id={dialogId}
        >
          <div
            role="dialog"
            ref={modalDialogRef}
            aria-modal="true"
            aria-labelledby={`${cssClasses.DIALOG}-title`}
            aria-describedby={`${cssClasses.DIALOG}-body`}
            onAnimationend={props.onAnimationEnd}
            class={cls([
              `${cssClasses.DIALOG}-content`,
              props.contentClassName,
              { [`${cssClasses.DIALOG}-content-fullScreen`]: props.isFullScreen },
            ])}
          >
            {header}
            {body}
            {footer}
          </div>
        </div>
      );
      // return props.visible ? dialogElement : null;
      return dialogElement;
    };

    return () => {
      const { maskClosable, className, getPopupContainer, maskFixed, getContainerContext, ...rest } = props;
      const { direction } = context.value;
      const classList = cls(className, {
        [`${cssClasses.DIALOG}-popup`]: getPopupContainer && !maskFixed,
        [`${cssClasses.DIALOG}-fixed`]: maskFixed,
        [`${cssClasses.DIALOG}-rtl`]: direction === 'rtl',
      });

      const containerContext = getContainerContext();
      const dataAttr = getDataAttr({ ...rest, ...attr });

      const elem = (
        <div class={classList} {...dataAttr}>
          {getMaskElement()}
          <div
            role="none"
            class={cls({
              [`${cssClasses.DIALOG}-wrap`]: true,
              [`${cssClasses.DIALOG}-wrap-center`]: props.centered,
            })}
            onClick={maskClosable ? onMaskClick : null}
            onMouseup={maskClosable ? onMaskMouseUp : null}
            {...props.contentExtraProps}
          >
            {getDialogElement()}
          </div>
        </div>
      );

      // eslint-disable-next-line max-len
      return containerContext && containerContext.Provider ? (
        <containerContext.Provider value={containerContext.value}>{elem}</containerContext.Provider>
      ) : (
        elem
      );
    };
  },
});

export default ModalContent;
