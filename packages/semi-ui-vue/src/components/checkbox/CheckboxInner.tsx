import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import classnames from 'classnames';
import { noop } from 'lodash';
import { checkboxClasses as css } from '@douyinfe/semi-foundation/checkbox/constants';
import { IconCheckboxTick, IconCheckboxIndeterminate } from '@kousum/semi-icons-vue';
import {AriaAttributes} from "../AriaAttributes";

export interface CheckboxInnerProps {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
  prefixCls?: string;
  name?: string;
  isPureCardType?: boolean;
  addonId?: string;
  extraId?: string;
  'aria-label'?: AriaAttributes['aria-label'];
}
export const vuePropsType = {
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': String,
  indeterminate: Boolean,
  checked: Boolean,
  disabled: Boolean,
  prefixCls: String,
  name: String,
  isPureCardType: Boolean,
  addonId: String,
  extraId: String,
  'aria-label': String,
  onChange: {
    type:Function,
    default:noop
  },
}
const CheckboxInner = defineComponent<CheckboxInnerProps>((props, {expose}) => {
  const slots = useSlots()
  const inputEntity = ref(null)

  function blur() {
    inputEntity.value.blur();
  }

  function focus() {
    inputEntity.value.focus();
  }

  expose({
    blur,
    focus,
  })

  return () => {

    const { indeterminate, checked, disabled, prefixCls, name, isPureCardType, addonId, extraId } = props;
    const prefix = prefixCls || css.PREFIX;

    const wrapper = classnames(
      {
        [`${prefix}-inner`]: true,
        [`${prefix}-inner-checked`]: Boolean(checked),
        [`${prefix}-inner-pureCardType`]: isPureCardType,
      },
      css.WRAPPER
    );

    const inner = classnames({
      [`${prefix}-inner-display`]: true,
    });

    const icon = checked ? (
      <IconCheckboxTick />
    ) : indeterminate ? (
      <IconCheckboxIndeterminate />
    ) : null;

    return (
      <span class={wrapper}>
                <input
                  type="checkbox"
                  aria-label={props['aria-label']}
                  aria-disabled={disabled}
                  aria-checked={checked}
                  aria-labelledby={addonId}
                  aria-describedby={extraId || props['aria-describedby']}
                  aria-invalid={props['aria-invalid']}
                  aria-errormessage={props['aria-errormessage']}
                  aria-required={props['aria-required']}
                  ref={inputEntity}
                  class={css.INPUT}
                  onChange={noop}
                  checked={checked}
                  disabled={disabled}
                  name={name}
                />
                <span class={inner}>{icon}</span>
            </span>
    );
  }
})

CheckboxInner.props = vuePropsType

export default CheckboxInner

