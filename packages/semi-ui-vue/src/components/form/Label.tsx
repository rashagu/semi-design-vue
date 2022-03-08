import {defineComponent, ref, h, CSSProperties, VNode, Fragment} from 'vue'

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';

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
}

export const VuePropsType = {
  id: String,
  /** Whether to display the required * symbol */
  required: {type:Boolean,default:false},
  /** Content of label */
  text: [String, Object],
  disabled: Boolean,
  /** Used to configure the htmlFor attribute of the label tag */
  name: {
    type:String,
    default:''
  },
  /** text-align of label */
  align: {type:String,default:'left'},
  /** width of label */
  width: [Number, String],
  style:[String, Object],
  className: {
    type: String,
    default: ''
  },
}
const Label = defineComponent<LabelProps>((props, {slots}) => {

  return () => {
    const children = slots.default?slots.default():null
    const { required, text, disabled, name, width, align, style, className, extra, id } = props;

    const labelCls = classNames(className, {
      [`${prefixCls}-field-label`]: true,
      [`${prefixCls}-field-label-left`]: align === 'left',
      [`${prefixCls}-field-label-right`]: align === 'right',
      [`${prefixCls}-field-label-required`]: required,
      [`${prefixCls}-field-label-disabled`]: disabled,
      [`${prefixCls}-field-label-with-extra`]: extra,
    });
    const labelStyle = style ? style : {};
    width ? labelStyle.width = width : null;

    const textContent = (
      <div class={`${prefixCls}-field-label-text`}>
        {typeof text !== 'undefined' ? text : children}
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
  }
})


Label.props = VuePropsType

export default Label
