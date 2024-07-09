/* eslint-disable prefer-template */
import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';
import { IconAlertTriangle, IconAlertCircle } from '@kousum/semi-icons-vue';
import { VueJsxNode } from '../interface';
import { cloneVNode, ComponentObjectPropsOptions, CSSProperties, defineComponent, h, isVNode, useSlots } from 'vue';
import { vuePropsMake } from '../PropTypes';

const prefix = cssClasses.PREFIX;

export type ReactFieldError = Array<any> | VueJsxNode;

export interface ErrorMessageProps {
  error?: ReactFieldError;
  className?: string;
  style?: CSSProperties;
  showValidateIcon?: boolean;
  validateStatus?: string;
  helpText?: VueJsxNode;
  isInInputGroup?: boolean;
  errorMessageId?: string;
  helpTextId?: string;
}

const propTypes: ComponentObjectPropsOptions<Required<ErrorMessageProps>> = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.array, PropTypes.node]),
  className: PropTypes.string,
  style: PropTypes.object,
  validateStatus: PropTypes.string,
  showValidateIcon: PropTypes.bool,
  helpText: PropTypes.node,
  isInInputGroup: PropTypes.bool,
  // internal props
  errorMessageId: PropTypes.string,
  helpTextId: PropTypes.string,
};

export const vuePropsType = vuePropsMake(propTypes, {});
const ErrorMessage = defineComponent({
  props: vuePropsType,
  name: 'ErrorMessage',
  setup(props, {}) {
    const slots = useSlots();

    function generatorText(error: ReactFieldError) {
      const { helpTextId, errorMessageId } = props;
      const propsError = props.error;
      let id = errorMessageId;
      if (!propsError) {
        id = helpTextId;
      }
      if (typeof error === 'string') {
        return <span id={id}>{error}</span>;
      } else if (Array.isArray(error)) {
        const err = error.filter((e) => e);
        return err.length ? <span id={id}>{err.join(', ')}</span> : null;
      } else if (isVNode(error)) {
        return error;
      }
      return null;
    }

    return () => {
      const { error, className, style, validateStatus, helpText, showValidateIcon, isInInputGroup } = props;
      const cls = classNames(
        {
          [prefix + '-field-error-message']: Boolean(error),
          [prefix + '-field-help-text']: Boolean(helpText),
        },
        className
      );

      if (!error && !helpText) {
        return null;
      }
      const iconMap = {
        warning: <IconAlertTriangle />,
        error: <IconAlertCircle />,
      };
      const text = error ? generatorText(error) : generatorText(helpText);
      const iconCls = `${prefix}-field-validate-status-icon`;
      let icon = null;
      if (isInInputGroup) {
        icon = <IconAlertCircle className={iconCls} />;
      } else {
        if (iconMap[validateStatus]) {
          icon = cloneVNode(iconMap[validateStatus], { class: iconCls });
        }
      }

      return (
        <div class={cls} style={style}>
          {showValidateIcon && text ? icon : null}
          {text}
        </div>
      );
    };
  },
});

export default ErrorMessage;
