import {
    defineComponent,
    ref,
    h,
    Fragment,
    reactive,
    onMounted,
    watch,
    onUnmounted,
    ComponentObjectPropsOptions, PropType
} from 'vue';
import RadioInnerFoundation, {
    RadioChangeEvent,
    RadioInnerAdapter,
} from '@douyinfe/semi-foundation/radio/radioInnerFoundation';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import { radioClasses as css } from '@douyinfe/semi-foundation/radio/constants';
import Context from './context';
import classnames from 'classnames';
import { IconRadio } from '@kousum/semi-icons-vue';
import { noop } from 'lodash';
import { RadioProps, RadioState } from './radio';

export type RadioInnerMode = 'advanced' | '';
export interface RadioInnerProps extends BaseProps {
    checked?: boolean;
    disabled?: boolean;
    isButtonRadio?: boolean;
    onChange?: (e: RadioChangeEvent) => void;
    mode?: RadioInnerMode;
    autoFocus?: boolean;
    name?: string;
    prefixCls?: string;
    ref?: any;
    isPureCardRadioGroup?: boolean;
    addonId?: string;
    extraId?: string;
    'aria-label'?: any;
    focusInner?: boolean;
    onInputFocus?: (e: any) => void;
    onInputBlur?: (e: any) => void;
    preventScroll?: boolean;

    defaultChecked?: boolean
    value?: any
    type?: string
}

interface RadioInnerState {
    checked?: boolean;
}

export const vuePropsType:ComponentObjectPropsOptions<RadioInnerProps> = {
    checked: {
        type: Boolean,
        // @ts-ignore
        default: undefined,
    },
    disabled: Boolean,
    isButtonRadio: { type: Boolean, default: false },
    onChange: { type: Function as PropType<RadioInnerProps['onChange']>, default: noop },
    mode: String as PropType<RadioInnerProps['mode']>,
    autoFocus: Boolean,
    name: String,
    prefixCls: String,
    ref: [Object, String],
    isPureCardRadioGroup: Boolean,
    addonId: String,
    extraId: String,
    'aria-label': String,

    className: String, // TODO 区别
    defaultChecked: {
        type: Boolean as PropType<RadioInnerProps['defaultChecked']>,
        default: false,
    },
    value: [String, Boolean, Number] as PropType<RadioInnerProps['value']>,
    type: { type: String as PropType<RadioInnerProps['type']>, default: 'default' },
    focusInner: Boolean,
    onInputFocus: Function as PropType<RadioInnerProps['onInputFocus']>,
    onInputBlur: Function as PropType<RadioInnerProps['onInputBlur']>,
    preventScroll: Boolean,
};
const RadioInner = defineComponent<RadioInnerProps>((props, { slots }) => {
    let inputEntity!: any;
    let foundation: RadioInnerFoundation;

    const state = reactive({
        checked: false,
    });

    const { adapter: adapterInject } = useBaseComponent<RadioInnerProps>(props, state);

    const theAdapter = adapter();
    function adapter(): RadioInnerAdapter {
        return {
            ...adapterInject<RadioInnerProps, RadioInnerState>(),
            setNativeControlChecked: (checked: boolean) => {
                // console.log('setNativeControlChecked', checked)
                state.checked = checked;
            },
            notifyChange: (e: RadioChangeEvent) => {
                // console.log(e,props)
                props.onChange(e);
            },
        };
    }

    foundation = new RadioInnerFoundation(theAdapter);

    onMounted(() => {
        foundation.init();
    });

    watch(
        () => props.checked,
        (prevPropsChecked, nextPropsChecked) => {
            // // console.log('inner watch',prevPropsChecked, nextPropsChecked)
            if (prevPropsChecked !== nextPropsChecked) {
                foundation.setChecked(props.checked);
            }
        }
    );

    onUnmounted(() => {
        foundation.destroy();
    });

    function blur() {
        inputEntity.blur();
    }

    function focus() {
        inputEntity.focus();
    }

    function onChange(e: any) {
        // console.log(e)
        // console.log(props)
        foundation.handleChange(e);
    }

    return () => {
        const {
            disabled,
            mode,
            autoFocus,
            name,
            isButtonRadio,
            isPureCardRadioGroup,
            addonId,
            extraId,
            'aria-label': ariaLabel,
            focusInner,
            onInputFocus,
            onInputBlur,
        } = props;
        // console.log(props)
        const { checked } = state;

        const prefix = props.prefixCls || css.PREFIX;

        const wrapper = classnames({
            [`${prefix}-inner`]: true,
            [`${prefix}-inner-checked`]: Boolean(checked),
            [`${prefix}-inner-buttonRadio`]: isButtonRadio,
            [`${prefix}-inner-pureCardRadio`]: isPureCardRadioGroup,
        });

        const inner = classnames({
          [`${prefix}-focus`]: focusInner,
          [`${prefix}-focus-border`]:  focusInner && !checked,
          [`${prefix}-inner-display`]: !isButtonRadio,
        });

        // console.log(checked)
        return (
            <span class={wrapper} style={{ opacity: 1 }}>
                <input
                    ref={ref => {
                        inputEntity = ref;
                    }}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autofocus={autoFocus}
                    type={mode === 'advanced' ? 'checkbox' : 'radio'}
                    checked={Boolean(checked)}
                    disabled={disabled}
                    onChange={onChange}
                    name={name}
                    aria-label={ariaLabel}
                    aria-labelledby={addonId}
                    aria-describedby={extraId}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                />
                <span class={inner}>{checked ? <IconRadio /> : null}</span>
            </span>
        );
    };
}, {
    props: vuePropsType,
    name: 'RadioInner'
});



export default RadioInner;
