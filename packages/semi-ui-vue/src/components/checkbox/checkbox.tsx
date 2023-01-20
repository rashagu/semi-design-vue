import {defineComponent, ref, h, Fragment, useSlots, CSSProperties, VNode, reactive, inject, watch} from 'vue'
import classnames from 'classnames';
import * as PropTypes from '../PropTypes'
import {checkboxClasses as css, strings} from '@douyinfe/semi-foundation/checkbox/constants';
import CheckboxFoundation, {
  CheckboxAdapter,
  BasicCheckboxEvent,
  BasicTargetObject,
  BaseCheckboxProps
} from '@douyinfe/semi-foundation/checkbox/checkboxFoundation';
import CheckboxInner from './checkboxInner';
import {getProps, useBaseComponent} from '../_base/baseComponent';
import '@douyinfe/semi-foundation/checkbox/checkbox.scss';
import {isUndefined, isBoolean, noop} from 'lodash';
import {getUuidShort} from '@douyinfe/semi-foundation/utils/uuid';
import {CheckboxType} from './checkboxGroup';

export type CheckboxEvent = BasicCheckboxEvent;
export type TargetObject = BasicTargetObject;
import {AriaAttributes} from "../AriaAttributes";
import {useCheckboxContext} from "./context/Consumer";
import {vuePropsMake} from "../PropTypes";
import {propTypesCheckbox} from "./propType";

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
  type?: CheckboxType;
}

interface CheckboxState {
  checked: boolean;
  addonId?: string;
  extraId?: string;
  focusVisible?: boolean;
}


const defaultProps = {
  defaultChecked: false,
  indeterminate: false,
  onChange: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  type: 'default',
};
export const vuePropsType = vuePropsMake(propTypesCheckbox, defaultProps)
const Checkbox = defineComponent<CheckboxProps>((props, {}) => {
  const slots = useSlots()

  const checked = false;
  const state = reactive<CheckboxState>({
    checked: props.checked || props.defaultChecked || checked,
    addonId: props.addonId,
    extraId: props.extraId,
    focusVisible: false
  });
  const checkboxEntity = ref(null);
  const {adapter: adapterInject} = useBaseComponent<CheckboxProps>(props, state)

  const {context} = useCheckboxContext()

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

      generateEvent: (checked, e) => {
        const cbValue = {
          target: {
            ...props,
            checked,
          },
          stopPropagation: () => {
            e.stopPropagation();
          },
          preventDefault: () => {
            e.preventDefault();
          },
          nativeEvent: {
            stopImmediatePropagation: () => {
              if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
                e.nativeEvent.stopImmediatePropagation();
              }
            }
          },
        };
        return cbValue;
      },
      getIsInGroup: () => isInGroup(),
      getGroupValue: () => (context && context.value.checkboxGroup.value) || [],
      notifyGroupChange: cbContent => {
        context.value.checkboxGroup.onChange(cbContent);
      },
      getGroupDisabled: () => (context && context.value.checkboxGroup.disabled),
      setAddonId: () => {
        state.addonId = getUuidShort({prefix: 'addon'})
      },
      setExtraId: () => {
        state.extraId = getUuidShort({prefix: 'extra'})
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
    // Why do we need to determine whether there is a value in props?
    // If there is no value in the props of the checkbox in the context of the checkboxGroup,
    // it will be considered not to belong to the checkboxGroup。
    return Boolean(context && context.value.checkboxGroup && ('value' in getProps(props)));
  }

  function focus() {
    checkboxEntity.value && checkboxEntity.value.focus();
  }

  function blur() {
    checkboxEntity.value && checkboxEntity.value.blur();
  }

  const handleChange: any = e => foundation.handleChange(e);

  const handleEnterPress = (e: any) => foundation.handleEnterPress(e);

  const handleFocusVisible = (event: FocusEvent) => {
    foundation.handleFocusVisible(event);
  }

  const handleBlur = (event: FocusEvent) => {
    foundation.handleBlur();
  }

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
      id,
      type,
    } = props;
    const {checked, addonId, extraId, focusVisible} = state;
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
    } else {
      props_.isPureCardType = type === strings.TYPE_PURECARD;
      props_.isCardType = type === strings.TYPE_CARD || props_.isPureCardType;
    }

    const prefix = prefixCls || css.PREFIX;

    const focusOuter = props_.isCardType || props_.isPureCardType;
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
      [`${prefix}-focus`]: focusVisible && focusOuter,
    });

    const extraCls = classnames(`${prefix}-extra`, {
      [`${prefix}-cardType_extra_noChildren`]: props_.isCardType && !children,
    });

    const name = inGroup ? context.value.checkboxGroup.name : undefined;
    const xSemiPropChildren = props['x-semi-children-alias'] || 'children';


    const renderContent = () => {
      if (!children && !extra) {
        return null;
      }

      return (
        <div class={`${prefix}-content`}>
          {children ? (
            <span id={addonId} class={`${prefix}-addon`} x-semi-prop={xSemiPropChildren}>
                            {children}
                        </span>
          ) : null}
          {extra ? (
            <div id={extraId} class={extraCls} x-semi-prop="extra">
              {extra}
            </div>
          ) : null}
        </div>
      );
    };
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
          {...{
            ...props,
            ...props_,
            addonId: children && addonId,
            extraId: extra && extraId,
            isPureCardType: props_.isPureCardType,
            ref: checkboxEntity,
            focusInner: focusVisible && !focusOuter,
            onInputFocus: handleFocusVisible,
            onInputBlur: handleBlur
          }}
        />
        {renderContent()}
      </span>
    );
  }
})

Checkbox.props = vuePropsType
Checkbox.name = 'Checkbox'

export default Checkbox

