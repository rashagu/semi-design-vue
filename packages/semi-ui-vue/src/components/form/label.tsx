import { defineComponent, ref, h, CSSProperties, VNode, Fragment, PropType } from 'vue';
import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';
import { LocaleConsumerFunc } from '../locale/localeConsumer';
import { Locale } from '../locale/interface';
import { vuePropsMake } from '../PropTypes';
import { ComponentObjectPropsOptions } from 'vue';
import { styleNum } from '../_utils';

const LocaleConsumer = LocaleConsumerFunc<Locale['Form']>();
const prefixCls = cssClasses.PREFIX;

export interface LabelProps {
  id?: string;
  /** Whether to display the required * symbol */
  required?: boolean;
  /** Content of label */
  text?: any;
  disabled?: boolean;
  /** Used to configure the htmlFor attribute of the label tag */
  name?: string;
  /** text-align of label */
  align?: string;
  /** width of label */
  width?: number | string;
  style?: CSSProperties;
  className?: string;
  extra?: VNode;

  optional?: boolean;
}

const propTypes: ComponentObjectPropsOptions<LabelProps> = {
  id: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  extra: PropTypes.node as PropType<any>,
  optional: PropTypes.bool,
};
const defaultProps = {
  required: false,
  name: '',
  align: 'left',
  className: '',
  optional: false,
};
export const VuePropsType = vuePropsMake<LabelProps>(propTypes, defaultProps);
const Label = defineComponent({
  props: VuePropsType,
  name: 'Label',
  setup(props, { slots }) {
    return () => {
      const children = slots.default ? slots.default() : null;
      const { required, text, disabled, name, width, align, style, className, extra, id, optional } = props;

      const labelCls = classNames(className, {
        [`${prefixCls}-field-label`]: true,
        [`${prefixCls}-field-label-left`]: align === 'left',
        [`${prefixCls}-field-label-right`]: align === 'right',
        [`${prefixCls}-field-label-required`]: required,
        [`${prefixCls}-field-label-disabled`]: disabled,
        [`${prefixCls}-field-label-with-extra`]: extra,
      });
      const labelStyle = style ? style : {};
      width ? (labelStyle.width = styleNum(width)) : null;

      const optionalText = (
        <LocaleConsumer componentName="Form">
          {{
            default: (locale: Locale['Form']) => {
              return <span class={`${prefixCls}-field-label-optional-text`}>{locale.optional}</span>;
            },
          }}
        </LocaleConsumer>
      );

      const textContent = (
        <div class={`${prefixCls}-field-label-text`} x-semi-prop="label">
          {typeof text !== 'undefined' ? text : children}
          {optional ? optionalText : null}
        </div>
      );

      const contentWithExtra = (
        <>
          {textContent}
          <div class={`${prefixCls}-field-label-extra`}>{extra}</div>
        </>
      );

      return (
        <label class={labelCls} for={name} style={labelStyle} id={id}>
          {extra ? contentWithExtra : textContent}
        </label>
      );
    };
  },
});

export default Label;
