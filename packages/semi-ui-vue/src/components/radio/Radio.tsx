import {defineComponent, ref, h, Fragment, CSSProperties, VNode, reactive, inject, Ref} from 'vue'
import cls from 'classnames';
import { noop } from 'lodash';
import RadioFoundation, { RadioAdapter } from '@douyinfe/semi-foundation/radio/radioFoundation';
import { RadioChangeEvent } from '@douyinfe/semi-foundation/radio/radioInnerFoundation';
import { strings, radioClasses as css } from '@douyinfe/semi-foundation/radio/constants';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
import '@douyinfe/semi-foundation/radio/radio.scss';

import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';
import RadioInner from './RadioInner';
import Context, { RadioContextValue, RadioMode } from './Context';
import {InputProps, InputState} from "../input";

export type RadioDisplayMode = 'vertical' | '';
export type RadioType =
  typeof strings.TYPE_DEFAULT |
  typeof strings.TYPE_BUTTON |
  typeof strings.TYPE_CARD |
  typeof strings.TYPE_PURECARD;

export type RadioProps = {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string | number;
  disabled?: boolean;
  prefixCls?: string;
  displayMode?: RadioDisplayMode;
  onChange?: (e: RadioChangeEvent) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  mode?: RadioMode;
  extra?: VNode | string;
  style?: CSSProperties;
  className?: string;
  addonStyle?: CSSProperties;
  addonClassName?: string;
  type?: RadioType;
  'aria-label'?: any;
};

export interface RadioState {
  hover?: boolean;
}

export const vuePropsType = {
  autoFocus: {
    type: Boolean,
    default: false
  },
  checked: {
    type: [Boolean],
// @ts-ignore
    default: undefined
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  value: [String, Number],
  disabled: Boolean,
  prefixCls: String,
  displayMode: String,
  onChange: Function,
  onMouseEnter: {type: Function, default: noop},
  onMouseLeave: {type: Function, default: noop},
  mode: {type:String, default:''},
  extra: [Object, String],
  style: [Object, String],
  className: String,
  addonStyle: [Object, String],
  addonClassName: String,
  type: {type:String, default:'default'},
  'aria-label': String,
}
const Radio = defineComponent<RadioProps>((props, {slots}) => {
  let radioEntity: any;
  let context!: Ref<RadioContextValue>;
  let foundation: RadioFoundation;
  let addonId: string;
  let extraId: string;
  const state = reactive({
    hover: false,
  });
  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<RadioProps>(props, state)
  context = inject('RadioContextValue', ref<RadioContextValue>(null))
  // console.log(context)
  const theAdapter = adapter()
  function adapter(): RadioAdapter {
    return {
      ...adapterInject<RadioProps, RadioState>(),
      setHover: (hover: boolean) => {
        state.hover = hover
      }
    };
  }
  foundation = new RadioFoundation(theAdapter);
  radioEntity = null;
  addonId = getUuidShort({ prefix: 'addon' });
  extraId = getUuidShort({ prefix: 'extra' });


  function isInGroup() {
    // eslint-disable-next-line react/destructuring-assignment
    return context && context.value && context.value.radioGroup;
  }

  function focus() {
    radioEntity.focus();
  }

  function blur() {
    radioEntity.blur();
  }

  const onChange = (e: RadioChangeEvent) => {
    const { onChange } = props;
    // console.log(isInGroup())
    if (isInGroup()) {
      const { radioGroup } = context.value;
      // console.log(radioGroup)
      radioGroup.onChange && radioGroup.onChange(e);
    }
    onChange && onChange(e);
  };

  const handleMouseEnter = (e: any) => {
    props.onMouseEnter(e);
    foundation.setHover(true);
  };

  const handleMouseLeave = (e: any) => {
    props.onMouseLeave(e);
    foundation.setHover(false);
  };


  return () => {

    const {
      addonClassName,
      addonStyle,
      checked,
      disabled,
      style,
      className,
      prefixCls,
      displayMode,
      extra,
      mode,
      type,
      value: propValue
    } = props;
    const children = slots.default?slots.default():null;

    let realChecked,
      isDisabled,
      realMode,
      isButtonRadioGroup,
      isCardRadioGroup,
      isPureCardRadioGroup,
      isButtonRadioComponent,
      buttonSize,
      realPrefixCls;
    const isHover = state.hover;
    let props_:{ checked?: boolean, disabled?: boolean } = {};

    // console.log(context.value)
    if (isInGroup()) {
       // console.log('realChecked',context.value, context.value.radioGroup.value, propValue)
      realChecked = context.value.radioGroup.value === propValue;
      isDisabled = disabled || context.value.radioGroup.disabled;
      realMode = context.value.mode;
      isButtonRadioGroup = context.value.radioGroup.isButtonRadio;
      isCardRadioGroup = context.value.radioGroup.isCardRadio;
      isPureCardRadioGroup = context.value.radioGroup.isPureCardRadio;
      buttonSize = context.value.radioGroup.buttonSize;
      realPrefixCls = prefixCls || context.value.radioGroup.prefixCls;
      props_ = { checked: realChecked, disabled: isDisabled };
    } else {
      realChecked = checked;
      isDisabled = disabled;
      realMode = mode;
      isButtonRadioComponent = type === 'button';
      realPrefixCls = prefixCls;
    }
    const isButtonRadio = typeof isButtonRadioGroup === 'undefined' ? isButtonRadioComponent : isButtonRadioGroup;

    const prefix = realPrefixCls || css.PREFIX;

    const wrapper = cls(prefix, {
      [`${prefix}-disabled`]: isDisabled,
      [`${prefix}-checked`]: realChecked,
      [`${prefix}-${displayMode}`]: Boolean(displayMode),
      [`${prefix}-buttonRadioComponent`]: isButtonRadioComponent,
      [`${prefix}-buttonRadioGroup`]: isButtonRadioGroup,
      [`${prefix}-buttonRadioGroup-${buttonSize}`]: isButtonRadioGroup && buttonSize,
      [`${prefix}-cardRadioGroup`]: isCardRadioGroup,
      [`${prefix}-cardRadioGroup_disabled`]: isDisabled && isCardRadioGroup,
      [`${prefix}-cardRadioGroup_checked`]: isCardRadioGroup && realChecked && !isDisabled,
      [`${prefix}-cardRadioGroup_checked_disabled`]: isCardRadioGroup && realChecked && isDisabled,
      [`${prefix}-cardRadioGroup_hover`]: isCardRadioGroup && !realChecked && isHover && !isDisabled,
      [className]: Boolean(className),
    });

    const name = isInGroup() && context.value.radioGroup.name;
    const addonCls = cls({
      [`${prefix}-addon`]: !isButtonRadio,
      [`${prefix}-addon-buttonRadio`]: isButtonRadio,
      [`${prefix}-addon-buttonRadio-checked`]: isButtonRadio && realChecked,
      [`${prefix}-addon-buttonRadio-disabled`]: isButtonRadio && isDisabled,
      [`${prefix}-addon-buttonRadio-hover`]: isButtonRadio && !realChecked && !isDisabled && isHover,
      [`${prefix}-addon-buttonRadio-${buttonSize}`]: isButtonRadio && buttonSize,
    }, addonClassName);
    const renderContent = () => (
      <>
        {children ? <span class={addonCls} style={addonStyle} id={addonId}>{children}</span> : null}
        {extra && !isButtonRadio ? <div class={`${prefix}-extra`} id={extraId}>{extra}</div> : null}
      </>
    );
    // console.log('radio', props, props_)
    return (
      <label
        style={style}
        class={wrapper}
      >
        <RadioInner
          {...props}
          {...props_}
          mode={realMode}
          name={name}
          isButtonRadio={isButtonRadio}
          isPureCardRadioGroup={isPureCardRadioGroup}
          onChange={onChange}
          ref={(ref: any) => {
            radioEntity = ref;
          }}
          addonId={children && addonId}
          extraId={extra && extraId}
        />
        {
          isCardRadioGroup ?
            <div class={`${prefix}-isCardRadioGroup_content`}>{renderContent()}</div> :
            renderContent()
        }
      </label>
    );
  }
})

Radio.props = vuePropsType

export default Radio

