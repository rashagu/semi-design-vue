import {defineComponent, ref, h, Fragment, useSlots, CSSProperties, VNode, reactive, inject, watch} from 'vue'
import classnames from 'classnames';
import {checkboxClasses as css} from '@douyinfe/semi-foundation/checkbox/constants';
import CheckboxFoundation, {
  CheckboxAdapter,
  BasicCheckboxEvent,
  BasicTargetObject,
  BaseCheckboxProps
} from '@douyinfe/semi-foundation/checkbox/checkboxFoundation';
import CheckboxInner from './CheckboxInner';
import BaseComponent, {useBaseComponent} from '../_base/baseComponent';
import '@douyinfe/semi-foundation/checkbox/checkbox.scss';
import {CheckboxContext, Context} from './Context';
import {isUndefined, isBoolean, noop} from 'lodash';
import {getUuidShort} from '@douyinfe/semi-foundation/utils/uuid';

export type CheckboxEvent = BasicCheckboxEvent;
export type TargetObject = BasicTargetObject;
import {AriaAttributes} from "../AriaAttributes";
// import {TagInputProps} from "../tagInput/Index";

export interface CheckboxProps extends BaseCheckboxProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  onChange?: (e: CheckboxEvent) => any;
  // TODO, docs
  style?: CSSProperties;
  onMouseEnter?: any;
  onMouseLeave?: any;
  extra?: VNode | string;
  'aria-label'?: AriaAttributes['aria-label'];
  role?: any; // a11y: wrapper role
  tabIndex?: number; // a11y: wrapper tabIndex
  addonId?: string;
  extraId?: string;
}

interface CheckboxState {
  checked: boolean;
  addonId?: string;
  extraId?: string;
  focusVisible?: boolean;
}

export const vuePropsType = {
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': String,
  onChange: {
    type: Function,
    default: noop,
  },
  // TODO, docs
  style: [Object, String],
  onMouseEnter: {
    type: Function,
    default: noop,
  },
  onMouseLeave: {
    type: Function,
    default: noop,
  },
  extra: [Object, String],
  'aria-label': String,
  role: String,
  tabIndex: Number,
  defaultChecked: false,
  indeterminate: false,
  addonId: String,
  extraId: String,
}
const Checkbox = defineComponent<CheckboxProps>((props, {}) => {
  const slots = useSlots()

  const checked = false;
  const state = reactive<CheckboxState>({
    checked: props.checked || props.defaultChecked || checked,
    addonId: props.addonId,
    extraId: props.extraId,
  });
  const checkboxEntity = ref(null);
  const {cache, adapter: adapterInject, log, context: context_} = useBaseComponent<CheckboxProps>(props, state)

  const context = inject('CheckboxContext', ref<CheckboxContext>({}))

  function adapter(): CheckboxAdapter<CheckboxProps, CheckboxState> {
    return {
      ...adapterInject<CheckboxProps, CheckboxState>(),
      setNativeControlChecked: checked => {
        state.checked = checked
      },
      notifyChange: cbContent => {
        const {onChange} = props;
        onChange && onChange(cbContent);
      },
      getIsInGroup: () => isInGroup(),
      getGroupValue: () => (context && context.value.checkboxGroup.value) || [],
      notifyGroupChange: cbContent => {
        context.value.checkboxGroup.onChange(cbContent);
      },
      getGroupDisabled: () => (context && context.value.checkboxGroup.disabled),
      setAddonId: () => {
        state.addonId = getUuidShort({ prefix: 'addon' })
      },
      setExtraId: () => {
        state.extraId = getUuidShort({ prefix: 'extra' })
      },
      setFocusVisible: (focusVisible: boolean): void => {
        state.focusVisible = focusVisible;
      },
      focusCheckboxEntity: () => {
        focus();
      },
    };
  }


  const foundation = new CheckboxFoundation(adapter());


  watch(() => props.checked, () => {
    if (isUndefined(props.checked)) {
      foundation.setChecked(false);
    } else if (isBoolean(props.checked)) {
      foundation.setChecked(props.checked);
    }
  })


  function isInGroup(): boolean {
    return !!(context.value && context.value.checkboxGroup);
  }

  function focus() {
    checkboxEntity.value && checkboxEntity.value.focus();
  }

  function blur() {
    checkboxEntity.value && checkboxEntity.value.blur();
  }

  const handleChange: any = e => foundation.handleChange(e);

  const handleEnterPress = (e: any) => foundation.handleEnterPress(e);


  return () => {
    const children = slots.default ? slots.default() : null
    const {
      disabled,
      style,
      prefixCls,
      className,
      indeterminate,
      onMouseEnter,
      onMouseLeave,
      extra,
      value,
      role,
      tabIndex,
      id
    } = props;
    const { checked, addonId, extraId } = state;
    const props_: Record<string, any> = {
      checked,
      disabled,
    };

    const inGroup = isInGroup();
    if (inGroup) {
      if (context.value.checkboxGroup.value) {
        const realChecked = (context.value.checkboxGroup.value || []).includes(value);
        props_.checked = realChecked;
      }
      if (context.value.checkboxGroup.disabled) {
        props_.disabled = context.value.checkboxGroup.disabled || props.disabled;
      }
      const {isCardType, isPureCardType} = context.value.checkboxGroup;
      props_.isCardType = isCardType;
      props_.isPureCardType = isPureCardType;
    }

    const prefix = prefixCls || css.PREFIX;

    const wrapper = classnames(prefix, {
      [`${prefix}-disabled`]: props_.disabled,
      [`${prefix}-indeterminate`]: indeterminate,
      [`${prefix}-checked`]: props_.checked,
      [`${prefix}-unChecked`]: !props_.checked,
      [`${prefix}-cardType`]: props_.isCardType,
      [`${prefix}-cardType_disabled`]: props_.disabled && props_.isCardType,
      [`${prefix}-cardType_unDisabled`]: !(props_.disabled && props_.isCardType),
      [`${prefix}-cardType_checked`]: props_.isCardType && props_.checked && !props_.disabled,
      [`${prefix}-cardType_checked_disabled`]: props_.isCardType && props_.checked && props_.disabled,
      [className]: Boolean(className),
    });

    const extraCls = classnames(`${prefix}-extra`, {
      [`${prefix}-cardType_extra_noChildren`]: props_.isCardType && !children,
    });

    const name = inGroup? context.value.checkboxGroup.name:undefined;

    const renderContent = () => (
      <>
        {children ? <span id={addonId} class={`${prefix}-addon`}>{children}</span> : null}
        {extra ? <div id={extraId} class={extraCls}>{extra}</div> : null}
      </>
    );
    return (
      // label is better than span, however span is here which is to solve gitlab issue #364
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <span
        role={role}
        tabindex={tabIndex}
        style={style}
        class={wrapper}
        id={id}
        onMouseenter={onMouseEnter}
        onMouseleave={onMouseLeave}
        onClick={handleChange}
        onKeypress={handleEnterPress}
        aria-labelledby={props['aria-labelledby']}
      >
                <CheckboxInner
                  {...props}
                  {...props_}
                  addonId={children && addonId}
                  extraId={extra && extraId}
                  name={name}
                  isPureCardType={props_.isPureCardType}
                  ref={checkboxEntity}
                />
        {
          props_.isCardType ?
            <div>{renderContent()}</div> :
            renderContent()
        }
            </span>
    );
  }
})

Checkbox.props = vuePropsType

export default Checkbox

