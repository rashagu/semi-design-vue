/* eslint-disable max-len */
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import SwitchFoudation, { SwitchAdapter } from '@douyinfe/semi-foundation/switch/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/switch/constants';
import {useBaseComponent} from '../_base/baseComponent';
import '@douyinfe/semi-foundation/switch/switch.scss';

import { noop } from 'lodash';
import Spin from '../spin';
import {CSSProperties, defineComponent, h, onMounted, onUnmounted, reactive, ref, useSlots, VNode, watch} from "vue";
import {AriaAttributes} from "../AriaAttributes";
import {vuePropsMake} from "../PropTypes";
import {TimeInputProps} from "../timePicker";
export interface SwitchProps {
    'aria-label'?: AriaAttributes['aria-label'];
    'aria-describedby'?: AriaAttributes['aria-describedby'];
    'aria-errormessage'?: AriaAttributes['aria-errormessage'];
    'aria-invalid'?: AriaAttributes['aria-invalid'];
    'aria-labelledby'?: AriaAttributes['aria-labelledby'];
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean, e: any) => void;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    onMouseEnter?: (e: MouseEvent) => any;
    onMouseLeave?: (e: MouseEvent) => any;
    size?: 'large' | 'default' | 'small';
    checkedText?: VNode | string;
    uncheckedText?: VNode | string;
    id?: string
}

export interface SwitchState {
    nativeControlChecked: boolean;
    nativeControlDisabled: boolean;
    focusVisible: boolean;
}

const propTypes = {
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-invalid': PropTypes.bool,
    'aria-errormessage': PropTypes.string,
    'aria-describedby': PropTypes.string,
    className: PropTypes.string,
    checked: {
        type: PropTypes.bool,
        default: undefined
    },
    checkedText: PropTypes.node,
    defaultChecked: {
        type: PropTypes.bool,
        default: undefined
    },
    disabled: {
        type: PropTypes.bool,
        default: undefined
    },
    loading: {
        type: PropTypes.bool,
        default: undefined
    },
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object,
    size: String,
    uncheckedText: PropTypes.node,
    id: PropTypes.string
};

const defaultProps: Partial<SwitchProps> = {
    disabled: false,
    className: '',
    onChange: noop,
    loading: false,
    onMouseEnter: noop,
    onMouseLeave: noop,
    size: 'default',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Switch = defineComponent<SwitchProps>((props, {}) => {

    const slots = useSlots()

    const state = reactive<SwitchState>({
        nativeControlChecked: props.defaultChecked || props.checked,
        nativeControlDisabled: false,
        focusVisible: false
    })

    const switchRef = ref()
    const {adapter: adapterInject} = useBaseComponent<SwitchProps>(props, state)


    function adapter_(): SwitchAdapter<SwitchProps, SwitchState> {
        return {
            ...adapterInject<SwitchProps, SwitchState>(),
            setNativeControlChecked: (nativeControlChecked: boolean): void => {
                state.nativeControlChecked = nativeControlChecked
            },
            setNativeControlDisabled: (nativeControlDisabled: boolean): void => {
                state.nativeControlDisabled = nativeControlDisabled
            },
            setFocusVisible: (focusVisible: boolean): void => {
                state.focusVisible = focusVisible
            },
            notifyChange: (checked: boolean, e: any): void => {
                props.onChange(checked, e);
            },
        };
    }
    const adapter = adapter_()
    const foundation = new SwitchFoudation(adapter);


    onMounted(()=>{
        foundation.init();
    })

    onUnmounted(()=>{
        foundation.init();
    })

    watch(()=>props.checked, ()=>{
        foundation.setChecked(props.checked);
    })
    watch(()=>props.disabled, ()=>{
        foundation.setDisabled(props.disabled);
    })

    const handleFocusVisible = (event: FocusEvent) => {
        foundation.handleFocusVisible(event);
    }

    const handleBlur = (event: FocusEvent) => {
        foundation.handleBlur();
    }

    return () => {
        const { nativeControlChecked, nativeControlDisabled, focusVisible } = state;
        const { className, style, onMouseEnter, onMouseLeave, size, checkedText, uncheckedText, loading, id } = props;
        const wrapperCls = cls(className, {
            [cssClasses.PREFIX]: true,
            [cssClasses.CHECKED]: nativeControlChecked,
            [cssClasses.DISABLED]: nativeControlDisabled,
            [cssClasses.LARGE]: size === 'large',
            [cssClasses.SMALL]: size === 'small',
            [cssClasses.LOADING]: loading,
            [cssClasses.FOCUS]: focusVisible,
        });
        const switchProps = {
            type: 'checkbox',
            className: cssClasses.NATIVE_CONTROL,
            disabled: nativeControlDisabled || loading,
            checked: nativeControlChecked || false,
        };
        const showCheckedText = checkedText && nativeControlChecked && size !== 'small';
        const showUncheckedText = uncheckedText && !nativeControlChecked && size !== 'small';
        return (
          <div class={wrapperCls} style={style} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
              {loading ? (
                <Spin wrapperClassName={cssClasses.LOADING_SPIN} size={size === 'default' ? 'middle' : size} />
              ) : (
                <div class={cssClasses.KNOB} aria-hidden={true} />
              )}
              {showCheckedText ? (
                <div class={cssClasses.CHECKED_TEXT} x-semi-prop="checkedText">
                    {checkedText}
                </div>
              ) : null}
              {showUncheckedText ? (
                <div class={cssClasses.UNCHECKED_TEXT} x-semi-prop="uncheckedText">
                    {uncheckedText}
                </div>
              ) : null}
              <input
                {...switchProps}
                ref={switchRef}
                id={id}
                role="switch"
                aria-checked={nativeControlChecked}
                aria-invalid={props['aria-invalid']}
                aria-errormessage={props['aria-errormessage']}
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                aria-describedby={props['aria-describedby']}
                aria-disabled={props['disabled']}
                onChange={e => {
                    // @ts-ignore
                    foundation.handleChange(e.target.checked, e)
                }}
                onFocus={e => handleFocusVisible(e)}
                onBlur={e => handleBlur(e)}
              />
          </div>
        );
    }
})

Switch.props = vuePropsType
Switch.name = 'Switch'

export default Switch
