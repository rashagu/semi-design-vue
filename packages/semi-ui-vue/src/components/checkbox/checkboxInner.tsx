import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import { noop } from 'lodash';
import { checkboxClasses as css } from '@douyinfe/semi-foundation/checkbox/constants';
import { IconCheckboxTick, IconCheckboxIndeterminate } from '@kousum/semi-icons-vue';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';
import { VueHTMLAttributes } from '../interface';
import {propTypesCheckbox} from "./propType";

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
  focusInner?: boolean;
  onInputFocus?: (e: any) => void;
  onInputBlur?: (e: any) => void;
  preventScroll?: boolean;
}

const propTypes = {
  ...propTypesCheckbox,
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
  grouped: PropTypes.bool,
  value: PropTypes.any,
  isPureCardType: PropTypes.bool,
  addonId: PropTypes.string,
  extraId: PropTypes.string,
  focusInner: PropTypes.bool,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
  preventScroll: PropTypes.bool,

  indeterminate: Boolean,
  prefixCls: String,
  name: String,
  'aria-label': String,
};

const defaultProps = {
  onChange: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const CheckboxInner = defineComponent<CheckboxInnerProps>((props, { expose }) => {
  const slots = useSlots();
  const inputEntity = ref();

  function blur() {
    inputEntity.value.blur();
  }

  function focus() {
    const { preventScroll } = props;
    inputEntity.value.focus({ preventScroll });
  }

  expose({
    blur,
    focus,
  });

  return () => {
    const {
      indeterminate,
      checked,
      disabled,
      prefixCls,
      name,
      isPureCardType,
      addonId,
      extraId,
      focusInner,
      onInputFocus,
      onInputBlur,
    } = props;
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
      [`${prefix}-focus`]: focusInner,
      [`${prefix}-focus-border`]: focusInner && !checked,
    });

    const icon = checked ? <IconCheckboxTick /> : indeterminate ? <IconCheckboxIndeterminate /> : null;

    const inputProps: VueHTMLAttributes = {
      type: 'checkbox',
      'aria-label': props['aria-label'],
      'aria-disabled': disabled,
      'aria-checked': checked,
      'aria-labelledby': addonId,
      'aria-describedby': extraId || props['aria-describedby'],
      'aria-invalid': props['aria-invalid'],
      'aria-errormessage': props['aria-errormessage'],
      'aria-required': props['aria-required'],
      class: css.INPUT,
      onChange: noop,
      checked: checked,
      disabled: disabled,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
    };
    name && (inputProps['name'] = name);

    return (
      <span class={wrapper}>
        <input {...inputProps} ref={inputEntity} />
        <span class={inner}>{icon}</span>
      </span>
    );
  };
});

CheckboxInner.props = vuePropsType;

export default CheckboxInner;
