import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { noop, get } from 'lodash';
import { cssClasses, numbers } from '@douyinfe/semi-foundation/popconfirm/constants';
import PopconfirmFoundation, { PopconfirmAdapter } from '@douyinfe/semi-foundation/popconfirm/popconfirmFoundation';
import { IconClose, IconAlertTriangle } from '@kousum/semi-icons-vue';
import Popover, { PopoverProps } from '../popover';
import { Position, Trigger } from '../tooltip';
import Button, { ButtonProps } from '../button';
import { Type as ButtonType } from '../button/Button';
import ConfigContext, { ContextValue } from '../configProvider/context';
import LocaleConsumer_ from '../locale/localeConsumer';
import { Locale as LocaleObject } from '../locale/interface';
import '@douyinfe/semi-foundation/popconfirm/popconfirm.scss';
import { Motion } from '../_base/base';
import {defineComponent, h, reactive, useSlots, Fragment, isVNode, watch} from "vue";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";
import {useBaseComponent} from "../_base/baseComponent";
import {RatingProps} from "../rating";

const LocaleConsumer = LocaleConsumer_()

export interface PopconfirmProps extends PopoverProps {
    cancelText?: string;
    cancelButtonProps?: ButtonProps;
    cancelType?: ButtonType;
    content?: VueJsxNode;
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



const propTypes = {
    motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
    disabled: PropTypes.bool,
    content: PropTypes.any,
    title: PropTypes.any,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    okText: PropTypes.string,
    okType: PropTypes.string,
    cancelText: PropTypes.string,
    cancelType: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClickOutSide: PropTypes.func,
    onVisibleChange: PropTypes.func,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    okButtonProps: PropTypes.object,
    cancelButtonProps: PropTypes.object,
    stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    zIndex: PropTypes.number,
    // private
    trigger: PropTypes.string,
    position: PropTypes.string,
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
    onCancel: noop,
    onConfirm: noop,
    onClickOutSide: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Popconfirm = defineComponent<PopconfirmProps>((props, {}) => {
    const slots = useSlots()

    const {context} = useConfigContext()
    const state = reactive<PopconfirmState>({
        cancelLoading: false,
        confirmLoading: false,
        visible: props.defaultVisible || false,
    })

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
                    <Button type={cancelType} onClick={handleCancel} loading={cancelLoading} {...cancelButtonProps}>
                        {cancelText || get(locale, 'cancel')}
                    </Button>
                    <Button type={okType} theme="solid" onClick={handleConfirm} loading={confirmLoading} {...okButtonProps}>
                        {okText || get(locale, 'confirm')}
                    </Button>
                </>
              )}
          </LocaleConsumer>
        );
    }

    function renderConfirmPopCard() {
        const { content, title, className, style, cancelType, icon, prefixCls } = props;
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

        console.log(icon)
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div class={popCardCls} onClick={stopImmediatePropagation} style={style}>
              <div class={`${prefixCls}-inner`}>
                  <div class={`${prefixCls}-header`}>
                      <i class={`${prefixCls}-header-icon`} x-semi-prop="icon">
                          {isVNode(icon) ? icon : null}
                      </i>
                      <div class={`${prefixCls}-header-body`}>
                          {showTitle ? (
                            <div class={`${prefixCls}-header-title`} x-semi-prop="title">
                                {title}
                            </div>
                          ) : null}
                      </div>
                      <Button
                        className={`${prefixCls}-btn-close`}
                        icon={<IconClose />}
                        size="small"
                        theme={'borderless'}
                        type={cancelType}
                        onClick={handleCancel}
                      />
                  </div>
                  {showContent ? (
                    <div class={`${prefixCls}-body`} x-semi-prop="content">
                        {content}
                    </div>
                  ) : null}
                  <div class={`${prefixCls}-footer`}>{renderControls()}</div>
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
        const popContent = renderConfirmPopCard();
        const popProps: PopProps = {
            onVisibleChange: handleVisibleChange,
            className: cssClasses.POPOVER,
            onClickOutSide: handleClickOutSide,
        };

        if (isControlled('visible')) {
            popProps.trigger = 'custom';
        }

        console.log({
            ...attrs,
            content: popContent,
            visible: visible,
            position: position,
            ...popProps
        })

        return (
          <Popover
            {...{
                ...attrs,
                content: popContent,
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
})

Popconfirm.props = vuePropsType
Popconfirm.name = 'Popconfirm'

export default Popconfirm
