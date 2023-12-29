import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { noop, get, isFunction, omit } from 'lodash';
import { cssClasses, numbers } from '@douyinfe/semi-foundation/popconfirm/constants';
import PopconfirmFoundation, { PopconfirmAdapter } from '@douyinfe/semi-foundation/popconfirm/popconfirmFoundation';
import { IconClose, IconAlertTriangle } from '@kousum/semi-icons-vue';
import Popover, { PopoverProps } from '../popover';
import { Position, Trigger, RenderContentProps } from '../tooltip';
import Button, { ButtonProps } from '../button';
import { Type as ButtonType } from '../button/Button';
import LocaleConsumer from '../locale/localeConsumer';
import { Locale as LocaleObject } from '../locale/interface';
import '@douyinfe/semi-foundation/popconfirm/popconfirm.scss';
import { Motion } from '../_base/base';
import {
    defineComponent,
    h,
    reactive,
    useSlots,
    Fragment,
    isVNode,
    watch,
    ref,
    ComponentObjectPropsOptions,
    PropType
} from "vue";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";
import {useBaseComponent} from "../_base/baseComponent";
import {RatingProps} from "../rating";


export interface PopconfirmProps extends PopoverProps {
    cancelText?: string;
    cancelButtonProps?: ButtonProps;
    cancelType?: ButtonType;
    // content?: VueJsxNode;
    defaultVisible?: boolean;
    disabled?: boolean;
    icon?: VueJsxNode;
    okText?: string;
    okType?: ButtonType;
    okButtonProps?: ButtonProps;
    motion?: Motion;
    title?: VueJsxNode;
    visible?: boolean;
    prefixCls?: string;
    zIndex?: number;
    trigger?: Trigger;
    showCloseIcon?: boolean;
    position?: Position;
    onCancel?: (e: MouseEvent) => Promise<any> | void;
    onConfirm?: (e: MouseEvent) => Promise<any> | void;
    onVisibleChange?: (visible: boolean) => void;
    onClickOutSide?: (e: MouseEvent) => void;
}

export interface PopconfirmState {
    visible: boolean;
    cancelLoading: boolean;
    confirmLoading: boolean;
}

interface PopProps {
    [x: string]: any;
}



const propTypes:ComponentObjectPropsOptions<PopconfirmProps> = {
    motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
    disabled: PropTypes.bool,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    title: PropTypes.any as PropType<PopconfirmProps['title']>,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    okText: PropTypes.string,
    okType: PropTypes.string as PropType<PopconfirmProps['okType']>,
    cancelText: PropTypes.string,
    cancelType: PropTypes.string as PropType<PopconfirmProps['cancelType']>,
    onCancel: PropTypes.func as PropType<PopconfirmProps['onCancel']>,
    onConfirm: PropTypes.func as PropType<PopconfirmProps['onConfirm']>,
    onClickOutSide: PropTypes.func as PropType<PopconfirmProps['onClickOutSide']>,
    onVisibleChange: PropTypes.func as PropType<PopconfirmProps['onVisibleChange']>,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    okButtonProps: PropTypes.object,
    cancelButtonProps: PropTypes.object,
    stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    showCloseIcon: PropTypes.bool,
    zIndex: PropTypes.number,
    // private
    trigger: PropTypes.string as PropType<PopconfirmProps['trigger']>,
    position: PropTypes.string as PropType<PopconfirmProps['position']>,
};
const defaultProps = {
    stopPropagation: true,
    trigger: 'click',
    // position: 'bottomLeft',
    onVisibleChange: noop,
    disabled: false,
    icon: <IconAlertTriangle size="extra-large" />,
    okType: 'primary',
    cancelType: 'tertiary',
    prefixCls: cssClasses.PREFIX,
    zIndex: numbers.DEFAULT_Z_INDEX,
    showCloseIcon: true,
    onCancel: noop,
    onConfirm: noop,
    onClickOutSide: noop,
};
export const vuePropsType = vuePropsMake<PopconfirmProps>(propTypes, defaultProps)
const Popconfirm = defineComponent<PopconfirmProps>((props, {}) => {
    const slots = useSlots()

    const {context} = useConfigContext()
    const state = reactive<PopconfirmState>({
        cancelLoading: false,
        confirmLoading: false,
        visible: props.defaultVisible || false,
    })

    const footerRef = ref();
    const popoverRef = ref();
    const {adapter: adapterInject, isControlled} = useBaseComponent<RatingProps>(props, state)
    function adapter_(): PopconfirmAdapter<PopconfirmProps, PopconfirmState> {
        return {
            ...adapterInject<PopconfirmProps, PopconfirmState>(),
            setVisible: (visible: boolean): void => {
                state.visible = visible
            },
            updateConfirmLoading: (loading: boolean): void => {
                state.confirmLoading = loading
            },
            updateCancelLoading: (loading: boolean): void => {
                state.cancelLoading = loading
            },
            notifyConfirm: (e: MouseEvent): Promise<any> | void => props.onConfirm(e),
            notifyCancel: (e: MouseEvent): Promise<any> | void => props.onCancel(e),
            notifyVisibleChange: (visible: boolean): void => props.onVisibleChange(visible),
            notifyClickOutSide: (e: MouseEvent) => props.onClickOutSide(e),
            focusCancelButton: () => {
                const buttonNode = footerRef.value?.querySelector('[data-type=cancel]') as HTMLElement;
                buttonNode?.focus({ preventScroll: true });
            },
            focusOkButton: () => {
                const buttonNode = footerRef.value?.querySelector('[data-type=ok]') as HTMLElement;
                buttonNode?.focus({ preventScroll: true });
            },
            focusPrevFocusElement: () => {
                popoverRef.value?.focusTrigger();
            }
        };
    }
    const adapter = adapter_()
    const foundation = new PopconfirmFoundation(adapter);

    function getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmState) {
        const willUpdateStates: Partial<PopconfirmState> = {};
        const { hasOwnProperty } = Object.prototype;

        if (hasOwnProperty.call(props, 'visible')) {
            willUpdateStates.visible = props.visible;
        }

        return willUpdateStates;
    }

    watch(()=>props.visible, (val)=>{
        const newState = getDerivedStateFromProps(props, state)
        if (newState){
            Object.keys(newState).forEach(key=>{
                state[key] = newState[key]
            })
        }
    }, {immediate: true})




    const handleCancel = (e: MouseEvent): void => foundation.handleCancel(e);

    const handleConfirm = (e: MouseEvent): void => foundation.handleConfirm(e);

    const handleVisibleChange = (visible: boolean): void => foundation.handleVisibleChange(visible);

    const handleClickOutSide = (e: MouseEvent) => foundation.handleClickOutSide(e);

    const stopImmediatePropagation = (e: any): void => e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();

    function renderControls() {
        const { okText, cancelText, okType, cancelType, cancelButtonProps, okButtonProps } = props;
        const { cancelLoading, confirmLoading } = state;
        return (
          <LocaleConsumer componentName="Popconfirm">
              {(locale: LocaleObject['Popconfirm'], localeCode: string) => (
                <>
                    <Button
                      data-type="cancel"
                      type={cancelType}
                      onClick={handleCancel}
                      loading={cancelLoading}
                      {...omit(cancelButtonProps, 'autoFocus')}
                    >
                        {cancelText || get(locale, 'cancel')}
                    </Button>
                    <Button
                      data-type="ok"
                      type={okType}
                      theme="solid"
                      onClick={handleConfirm}
                      loading={confirmLoading}
                      {...omit(okButtonProps, 'autoFocus')}
                    >
                        {okText || get(locale, 'confirm')}
                    </Button>
                </>
              )}
          </LocaleConsumer>
        );
    }

    function renderConfirmPopCard({ initialFocusRef }: { initialFocusRef?: RenderContentProps['initialFocusRef'] }) {
        const { content, title, className, style, cancelType, icon, prefixCls, showCloseIcon } = props;
        const { direction } = context.value;
        const popCardCls = cls(
          prefixCls,
          className,
          {
              [`${prefixCls}-rtl`]: direction === 'rtl',
          }
        );
        const showTitle = title !== null && typeof title !== 'undefined';
        const showContent = !(content === null || typeof content === 'undefined');

        const hasIcon = isVNode(icon);
        const bodyCls = cls({
            [`${prefixCls}-body`]: true,
            [`${prefixCls}-body-withIcon`]: hasIcon
        });
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div class={popCardCls} onClick={stopImmediatePropagation} style={style}>
              <div class={`${prefixCls}-inner`}>
                  <div class={`${prefixCls}-header`}>
                      { hasIcon ? <i class={`${prefixCls}-header-icon`} x-semi-prop="icon">{icon}</i> : null}
                      <div class={`${prefixCls}-header-body`}>
                          {showTitle ? (
                            <div class={`${prefixCls}-header-title`} x-semi-prop="title">
                                {title}
                            </div>
                          ) : null}
                      </div>
                      {
                          showCloseIcon ? (
                            <Button
                              className={`${prefixCls}-btn-close`}
                              icon={<IconClose />}
                              size="small"
                              theme={'borderless'}
                              type={cancelType}
                              onClick={handleCancel}
                            />
                          ) : null
                      }
                  </div>
                  {showContent ? (
                    <div class={bodyCls} x-semi-prop="content">
                        {isFunction(content) ? content({ initialFocusRef }) : content}
                    </div>
                  ) : null}
                  <div class={`${prefixCls}-footer`} ref={footerRef}>{renderControls()}</div>
              </div>
          </div>
        );
    }



    return () => {
        // rtl changes the default position
        const { direction } = context.value;
        const defaultPosition = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
        const children = slots.default?.()
        const {
            className,
            prefixCls,
            disabled,
            style,
            position = defaultPosition,
            title, icon, okType, cancelType, defaultVisible, okButtonProps, cancelButtonProps,onCancel,onConfirm,
            ...attrs
        } = props;

        if (disabled) {
            return children;
        }

        const { visible } = state;
        const popProps: PopProps = {
            onVisibleChange: handleVisibleChange,
            className: cssClasses.POPOVER,
            onClickOutSide: handleClickOutSide,
        };

        if (isControlled('visible')) {
            popProps.trigger = 'custom';
        }


        return (
          <Popover
            ref={popoverRef}
            {...{
                ...attrs,                // A arrow function needs to be passed here, otherwise the content will not be updated after the Popconfirm state is updated
                // Popover is a PureComponent, same props will not trigger update
                content: ({ initialFocusRef }) => renderConfirmPopCard({ initialFocusRef }),
                visible: visible,
                position: position,
                ...popProps
            }}
          >
              {{
                  default: slots.default
              }}
          </Popover>
        );
    }
}, {
    props: vuePropsType,
    name: 'Popconfirm'
})


export default Popconfirm
