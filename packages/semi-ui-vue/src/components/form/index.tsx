/**
 * The early design of Semi Form was inspired by informed （https://github.com/joepuzzo/informed） and formik（https://github.com/formium/formik）
 * The informed API design is very concise, and formik has very clear naming of the form status.
 * However, due to the requirements of convenient scalability (we need to split into F/A architecture), in additional they have their own binding verification library,
 * we cannot directly reuse such libraries.
 * So we fully absorbed these excellent api designs. Combining the technical principles of the two to implement our own code,
 */

// FormComponent
import Form from './baseForm';
import Label from './label';
import ArrayField from './arrayField';

// Form Hooks
import { useFormApi, useFormState, useFieldState, useFieldApi } from './hooks/index';

// Form Hoc
import withField from './hoc/withField';
import withFormState from './hoc/withFormState';
import withFormApi from './hoc/withFormApi';
import {
    FormAutoComplete,
    FormCascader,
    FormCheckbox,
    FormCheckboxGroup, FormDatePicker,
    FormInput,
    FormInputNumber,
    FormRadio,
    FormRadioGroup,
    FormRating,
    FormSelect,
    FormSlider,
    FormSwitch,
    FormTagInput,
    FormTextArea,
    FormTimePicker,
    FormTreeSelect,
    FormUpload,
    FormSelectOption,
    FormSelectSelectOptionGroup
} from "./field";
import FormInputGroup from "./group";
export type { FormApi } from './interface';



export {
    FormTextArea,
    FormInputNumber,
    FormSelect,
    FormInput,
    FormSelectOption,
    FormSelectSelectOptionGroup,

    FormAutoComplete,
    FormCascader,
    FormCheckbox,
    FormCheckboxGroup, FormDatePicker,
    FormRadio,
    FormRadioGroup,
    FormRating,
    FormSlider,
    FormSwitch,
    FormTagInput,
    FormTimePicker,
    FormTreeSelect,
    FormUpload
}
export const Checkbox = FormCheckbox;
export const CheckboxGroup = FormCheckboxGroup;
export const Radio = FormRadio;
export const RadioGroup = FormRadioGroup;
export const DatePicker = FormDatePicker;
export const TimePicker = FormTimePicker;
export const Switch = FormSwitch;
export const Slider = FormSlider;
export const TreeSelect = FormTreeSelect;
export const Cascader = FormCascader;
export const Rating = FormRating;
export const AutoComplete = FormAutoComplete;
export const Upload = FormUpload;
export const TagInput = FormTagInput;
export const InputGroup = FormInputGroup;


export {
    Form,
    ArrayField,
    withField,
    useFormApi,
    useFormState,
    useFieldApi,
    useFieldState,
    withFormState,
    withFormApi
};

export * from './interface';
export type { ArrayFieldProps } from './arrayField';
export type { ReactFieldError, ErrorMessageProps } from './errorMessage';
export type { InputGroupProps } from './group';
export type { LabelProps } from './label';
export type { SectionProps } from './section';
export type { SlotProps } from './slot';
