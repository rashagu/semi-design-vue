/* eslint-disable one-var */
/* eslint-disable react/prefer-stateless-function, max-len */
import { Subtract } from 'utility-types';
import type { RuleItem } from 'async-validator';
import { Options as ScrollIntoViewOptions } from 'scroll-into-view-if-needed';

import type { BaseFormApi as FormApi, FormState, WithFieldOption, AllErrors, FieldValidateTriggerType } from '@douyinfe/semi-foundation/form/interface';
import type { SelectProps } from '../select/index';
import Option from '../select/option';
import OptGroup from '../select/optionGroup';
import type { CheckboxProps } from '../checkbox/index';
import type { RadioProps } from '../radio/index';

import type { ErrorMessageProps, ReactFieldError as FieldError } from './errorMessage';
import type { LabelProps } from './label';
import type {VueJsxNode} from "../interface";
import type {CSSProperties, DefineComponent, VNode} from "vue";
import type {AriaAttributes} from "../AriaAttributes";

export type { FormState, FormApi, WithFieldOption, RuleItem };

export type CommonFieldProps = {
    /** Field is required (except Form. Checkbox within the Group, Form. Radio) */
    field: string;
    /** The label text of the form control is the same name as the field by default when it is not passed */
    label?: LabelProps | VueJsxNode;
    labelPosition?: 'top' | 'left' | 'inset';
    labelAlign?: 'left' | 'right';
    labelWidth?: number | string;
    noLabel?: boolean;
    noErrorMessage?: boolean;
    name?: string;
    fieldClassName?: string;
    fieldStyle?: CSSProperties;
    initValue?: any;
    validate?: (fieldValue: any, values: Record<string, any>) => string | Promise<string> | VNode;
    /** Check rules, check library based on async-validator */
    rules?: Array<RuleItem>;
    /** Check trigger timing */
    trigger?: 'blur' | 'change' | 'custom' | 'mount' | Array<string>;
    // onChange: (fieldValue: any) => void;
    /** Converts form control values before validation */
    transform?: (fieldValue: any) => any;
    /** Make a second change to the component's value before the UI update */
    convert?: (fieldValue: any) => any;
    allowEmptyString?: boolean;
    /** When true, use rules verification, after encountering the first rule that fails the test, the verification of subsequent rules will no longer be triggered */
    stopValidateWithError?: boolean;
    /* Custom prompt information is displayed in the same block as the verification information. When both have values, the verification information is displayed first */
    helpText?: VueJsxNode;
    /* Extra message, you can use this when you need an error message and the prompt text to appear at the same time, after helpText/errorMessage */
    extraText?: VueJsxNode;
    extraTextPosition?: 'middle' | 'bottom';
    /** These declaration just hack for Subtract, not valid props in CommonFieldProps */
    defaultValue?: any;
    /** Whether to take over only the data stream, when true, it will not automatically insert modules such as ErrorMessage, Label, extraText, etc. The style and DOM structure are consistent with the original component */
    pure?: boolean;
};

export type CommonexcludeType = {
    defaultValue?: any;
    value?: any;
    checked?: boolean;
    defaultChecked?: boolean;
};

export type RadioCheckboxExcludeProps = {
    defaultValue?: any;
    chekced?: boolean;
    defaultChecked?: boolean;
    field: string;
};

export type RCIncludeType = {
    // Need to take into account the use of Form. Checkbox, Form. Radio and Group scenarios
    field?: string;
};

export const FormSelect = {
    Option,
    OptGroup
}


export interface SelectStatic {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
}

export type Field<P> = Subtract<P & CommonFieldProps, CommonexcludeType>
export let FormSelectType: DefineComponent<Subtract<SelectProps & CommonFieldProps, CommonexcludeType>& SelectStatic>;
export let FormCheckboxType: DefineComponent<Subtract<CommonFieldProps, RadioCheckboxExcludeProps> & CheckboxProps & RCIncludeType>;
export let FormRadioType: DefineComponent<Subtract<CommonFieldProps, RadioCheckboxExcludeProps> & RadioProps & RCIncludeType>;

export interface ErrorMsg {
    [optionalKey: string]: FieldError;
}
export interface FormFCChild<K extends Record<string, any> = any> {
    formState: FormState<K>;
    values: K;
    formApi: FormApi<K>;
}

interface setValuesConfig {
    isOverride: boolean;
}

export interface BaseFormProps <Values extends Record<string, any> = any> {
    'aria-label'?: AriaAttributes['aria-label'];
    onSubmit?: (values: Values, e?: any) => void;
    onSubmitFail?: (errors: Record<keyof Values, FieldError>, values: Partial<Values>, e?: any) => void;
    onReset?: () => void;
    onValueChange?: (values: Values, changedValue: Partial<Values>) => void;
    onChange?: (formState: FormState) => void;
    allowEmpty?: boolean;
    validateFields?: (values: Values) => string | Partial<AllErrors<Values>>;
    /** Use this if you want to populate the form with initial values. */
    initValues?: Values;
    id?: string;
    /** getFormApi will be call once when Form mounted, u can save formApi reference in your component  */
    getFormApi?: (formApi: FormApi<Values>) => void;
    style?: CSSProperties;
    className?: string;
    extraTextPosition?: 'middle' | 'bottom';
    layout?: 'horizontal' | 'vertical';
    labelPosition?: 'top' | 'left' | 'inset';
    labelWidth?: number | string;
    labelAlign?: 'left' | 'right';
    labelCol?: Record<string, any>;
    wrapperCol?: Record<string, any>;
    render?: (internalProps: FormFCChild) => VueJsxNode;
    component?: VNode | string;
    autoScrollToError?: boolean | ScrollIntoViewOptions;
    disabled?: boolean;
    showValidateIcon?: boolean;
    stopValidateWithError?: boolean;
    trigger?: FieldValidateTriggerType
}
