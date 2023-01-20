import cls from 'classnames';
import * as PropTypes from "../PropTypes";
import ConfigContext, { ContextValue } from '../configProvider/context';
import ToastFoundation, { ToastAdapter, ToastState, ToastProps } from '@douyinfe/semi-foundation/toast/toastFoundation';
import { numbers, cssClasses, strings } from '@douyinfe/semi-foundation/toast/constants';
import Button from '../iconButton/index';
import { IconClose, IconAlertTriangle, IconInfoCircle, IconTickCircle, IconAlertCircle } from '@kousum/semi-icons-vue';
import { noop } from 'lodash';
import { isSemiIcon } from '../_utils';
import {
    cloneVNode,
    CSSProperties,
    defineComponent,
    h,
    onBeforeUnmount,
    onMounted,
    onUnmounted,
    reactive,
    useSlots,
    VNode
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {VueJsxNode} from "../interface";
import {useConfigContext} from "../configProvider/context/Consumer";
import {useBaseComponent} from "../_base/baseComponent";
import {SliderProps} from "../slider";

const prefixCls = cssClasses.PREFIX;

export interface ToastReactProps extends ToastProps {
    style?: CSSProperties;
    icon?: VueJsxNode;
    content: VueJsxNode;
    onAnimationEnd?: (e: AnimationEvent) => void;
    onAnimationStart?: (e: AnimationEvent) => void
}

const propTypes = {
    onClose: PropTypes.func,
    content: PropTypes.node,
    close: PropTypes.func,
    duration: PropTypes.number,
    theme: String,
    type: String,
    textMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    className: PropTypes.string,
    showClose: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    direction: String,
    id: String,
};
const defaultProps = {
    onClose: noop,
    content: '',
    close: noop,
    duration: numbers.duration,
    textMaxWidth: 450,
    showClose: true,
    theme: 'normal'
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Toast = defineComponent<ToastReactProps>((props, {expose}) => {
    const slots = useSlots()

    const {context} = useConfigContext()
    const state = reactive<ToastState>({});

    const {adapter: adapterInject} = useBaseComponent<ToastReactProps>(props, state)
    function adapter_(): ToastAdapter {
        return {
            ...adapterInject<ToastReactProps, ToastState>(),
            notifyWrapperToRemove: (id: string) => {
                props.close(id);
            },
            notifyClose: () => {
                props.onClose();
            },
        };
    }
    const adapter = adapter_()
    const foundation = new ToastFoundation(adapter);


    onMounted(()=>{
        foundation.init();
    })
    onBeforeUnmount(()=>{
        foundation.destroy();
    })


    function close(e: MouseEvent) {
        foundation.close(e);
    }

    const clearCloseTimer = () => {
        foundation.clearCloseTimer_();
    };

    const startCloseTimer = () => {
        foundation.startCloseTimer_();
    };

    const restartCloseTimer = () => {
        foundation.restartCloseTimer();
    }

    function renderIcon() {
        const { type, icon } = props;
        const iconMap = {
            warning: <IconAlertTriangle />,
            success: <IconTickCircle />,
            info: <IconInfoCircle />,
            error: <IconAlertCircle />
        };
        const iconType = iconMap[type];
        const iconSize = 'large';
        const iconCls = cls(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`);
        if (icon) {
            return isSemiIcon(icon) ? cloneVNode(icon as VNode, { size: iconSize, className: `${prefixCls}-icon` }) : icon;
        }
        if (type && iconType) {
            return cloneVNode(iconType, { size: iconSize, className: iconCls });
        }
        return null;
    }

    // onUnmounted(()=>{
    //     console.log('toast 销毁')
    // })

    // TODO
    expose({
        foundation,
        close
    })
    return () => {
        const { content, type, theme, showClose, textMaxWidth, className, style } = props;
        const direction = props.direction || context.value.direction;
        const toastCls = cls(prefixCls, className, {
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-${theme}`]: theme === 'light',
            [`${prefixCls}-rtl`]: direction === 'rtl',
        });
        const textStyle: CSSProperties = {};
        textStyle.maxWidth = textMaxWidth;
        const btnTheme = 'borderless';
        const btnSize = 'small';

        return (
          <div
            role="alert"
            aria-label={`${type ? type : 'default'} type`}
            class={toastCls}
            style={style}
            onMouseenter={clearCloseTimer}
            onMouseleave={startCloseTimer}
            onAnimationstart={props.onAnimationStart}
            onAnimationend={props.onAnimationEnd}
          >
              <div class={`${prefixCls}-content`}>
                  {renderIcon()}
                  <span class={`${prefixCls}-content-text`} style={textStyle} x-semi-prop="content">
                        {content}
                    </span>
                  {showClose && (
                    <div class={`${prefixCls}-close-button`}>
                        <Button
                          onClick={e => {
                              close(e)
                          }}
                          type="tertiary"
                          icon={<IconClose x-semi-prop="icon" />}
                          theme={btnTheme}
                          size={btnSize}
                        />
                    </div>
                  )}
              </div>
          </div>
        );
    }
})

Toast.props = vuePropsType
Toast.name = 'Toast'

export default Toast

