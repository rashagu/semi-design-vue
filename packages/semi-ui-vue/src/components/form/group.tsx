/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import { isString } from 'lodash';
import { isValid } from '@douyinfe/semi-foundation/form/utils';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';
import * as ObjectUtil from '@douyinfe/semi-foundation/utils/object';
import ErrorMessage, { ReactFieldError } from './errorMessage';
import Label, { LabelProps } from './label';
import { FormUpdaterContext } from './context';
import { useFormState } from './hooks/index';
import InputGroup, { InputGroupProps as BacisInputGroupProps } from '../input/inputGroup';
import { BaseFormProps, FormState } from './interface';
import { FormUpdaterContextType } from '@douyinfe/semi-foundation/form/interface';
import { Col, Row } from '../grid/index';
import {defineComponent, h, useSlots, Fragment, cloneVNode, PropType} from "vue";
import {useFormUpdaterContext} from "./context/FormUpdaterContext/Consumer";
import {noop} from "@douyinfe/semi-foundation/utils/function";
import {VueJsxNode} from "../interface";
import {ComponentObjectPropsOptions} from "vue";
interface GroupErrorProps {
    showValidateIcon?: boolean;
    isInInputGroup?: boolean;
    error?: ReactFieldError;
    fieldSet?: string[];
}
export interface InputGroupProps extends BacisInputGroupProps {
    label?: LabelProps;
    labelPosition?: 'left' | 'top';
    extraText?: VueJsxNode;
    extraTextPosition?: 'bottom' | 'middle'
}

const prefix = cssClasses.PREFIX;

// Group component to remove Labels and ErrorMessages from its child fields
// Unified insertion of Labels and ErrorMessages from the group level

// Get Errors of all field in this group
const GroupError = (props: GroupErrorProps) => {
    const { fieldSet } = props;
    const formState = useFormState();
    const error = fieldSet.map((field: string) => ObjectUtil.get(formState.value.errors, field));

    if (isValid(error)) {
        return null;
    }
    return (
        <ErrorMessage error={error} showValidateIcon={props.showValidateIcon} isInInputGroup={props.isInInputGroup} />
    );
};



export const vuePropsType:ComponentObjectPropsOptions<InputGroupProps> = {
    className: { type: String, default: '' },
    size: { type: String as PropType<InputGroupProps['size']>, default: 'default' },
    style: [String, Object],
    onBlur: {
        type: Function as PropType<InputGroupProps['onBlur']>,
        default: noop,
    },
    onFocus: {
        type: Function as PropType<InputGroupProps['onFocus']>,
        default: noop,
    },
    label: Object,
    labelPosition: String as PropType<InputGroupProps['labelPosition']>,
    disabled: Boolean,
}
const FormInputGroup = defineComponent((props, {}) => {
    const slots = useSlots()

    const {context} = useFormUpdaterContext()
    function renderLabel(label: LabelProps, formProps: BaseFormProps) {
        if (label) {
            if (isString(label)) {
                return (<Label width={formProps.labelWidth} text={label} />);
            } else {
                return (<Label width={formProps.labelWidth} {...label} />);
            }
        }
        return null;
    }

    return () => {
        const children= slots.default?.()
        const { label, extraText, extraTextPosition, ...rest } = props;

        const updater = context.value;
        const formProps = updater.getFormProps(['labelPosition', 'labelWidth', 'labelAlign', 'showValidateIcon', 'wrapperCol', 'labelCol', 'disabled']);
        const labelPosition = props.labelPosition || formProps.labelPosition;
        const groupFieldSet: Array<string> = [];
        const inner = children.map((child: any) => {
            if (child && child.props && child.props.field) {
                groupFieldSet.push(child.props.field);
                return cloneVNode(child, {
                    isInInputGroup: true,
                    // noErrorMessage: true,
                    // noLabel: true
                });
            }
            return null;
        });

        const groupCls = classNames({
            [`${prefix}-field-group`]: true
        });

        const labelCol = formProps.labelCol;
        const wrapperCol = formProps.wrapperCol;
        const labelAlign = formProps.labelAlign;
        const appendCol = labelCol && wrapperCol;

        const labelColCls = labelCol ? `${prefix}-col-${labelAlign}` : '';

        const labelContent = renderLabel(label, formProps);
        const inputGroupContent = (
          <InputGroup disabled={formProps.disabled} {...rest}>
              {inner}
          </InputGroup>
        );
        const groupErrorContent = (<GroupError fieldSet={groupFieldSet} showValidateIcon={formProps.showValidateIcon} isInInputGroup />);
        const extraCls = classNames(`${prefix}-field-extra`, {
            [`${prefix}-field-extra-string`]: typeof extraText === 'string',
            [`${prefix}-field-extra-middle`]: extraTextPosition === 'middle',
            [`${prefix}-field-extra-bottom`]: extraTextPosition === 'bottom',
        });

        const extraContent = extraText ? <div class={extraCls} x-semi-prop="extraText">{extraText}</div> : null;

        let content: any;

        switch (true) {
            case !appendCol:
                content = (
                  <>
                      {labelContent}
                      <div>
                          {extraTextPosition === 'middle' ? extraContent : null}
                          {inputGroupContent}
                          {extraTextPosition === 'bottom' ? extraContent : null}
                          {groupErrorContent}
                      </div>
                  </>
                );
                break;
            case appendCol && labelPosition === 'top':
                // When labelPosition is top, you need to add an overflow hidden div to the label, otherwise it will be arranged horizontally
                content = (
                  <>
                      <div style={{ overflow: 'hidden' }}>
                          <Col {...labelCol} className={labelColCls}>
                              {labelContent}
                          </Col>
                      </div>
                      <Col {...wrapperCol}>
                          {extraTextPosition === 'middle' ? extraContent : null}
                          {inputGroupContent}
                          {extraTextPosition === 'bottom' ? extraContent : null}
                          {groupErrorContent}
                      </Col>
                  </>
                );
                break;
            case appendCol && labelPosition !== 'top':
                content = (
                  <>
                      <Col {...labelCol} className={labelColCls}>
                          {labelContent}
                      </Col>
                      <Col {...wrapperCol}>
                          {extraTextPosition === 'middle' ? extraContent : null}
                          {inputGroupContent}
                          {extraTextPosition === 'bottom' ? extraContent : null}
                          {groupErrorContent}
                      </Col>
                  </>
                );
                break;
            default:
                break;
        }

        return (
          <div x-label-pos={labelPosition} class={groupCls}>
              {content}
          </div>
        );
    }
}, {
    props: vuePropsType,
    name: 'FormInputGroup'
})


export default FormInputGroup

