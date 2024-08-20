/**
 * The early design of Semi Form was inspired by informed （https://github.com/joepuzzo/informed） and formik（https://github.com/formium/formik）
 * The informed API design is very concise, and formik has very clear naming of the form status.
 * However, due to the requirements of convenient scalability (we need to split into F/A architecture), in additional they have their own binding verification library,
 * we cannot directly reuse such libraries.
 * So we fully absorbed these excellent api designs. Combining the technical principles of the two to implement our own code,
 */

// FormComponent
import Form from './baseForm';
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
    FormSelectOptionGroup
} from "./field";
import FormInputGroup from "./group";
import ErrorMessage from './errorMessage';
import Label from './label';
import Section from './section';
import Slot from './slot';
export type { FormApi, FormFCChild } from './interface';



export {
    FormTextArea,
    FormInputNumber,
    FormSelect,
    FormInput,
    FormSelectOption,
    FormSelectOptionGroup,

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
    FormUpload,
    Label as FormLabel,
    Slot as FormSlot
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


export type FormType = typeof Form & {
    TextArea: typeof FormTextArea;
    InputNumber: typeof FormInputNumber;
    Select: typeof FormSelect;
    Input: typeof FormInput;
    SelectOption: typeof FormSelectOption;
    SelectOptionGroup: typeof FormSelectOptionGroup;
    AutoComplete: typeof FormAutoComplete;
    Cascader: typeof FormCascader;
    Checkbox: typeof FormCheckbox;
    CheckboxGroup: typeof FormCheckboxGroup;
    DatePicker: typeof FormDatePicker;
    Radio: typeof FormRadio;
    RadioGroup: typeof FormRadioGroup;
    Rating: typeof FormRating;
    Slider: typeof FormSlider;
    Switch: typeof FormSwitch;
    TagInput: typeof FormTagInput;
    TimePicker: typeof FormTimePicker;
    TreeSelect: typeof FormTreeSelect;
    Upload: typeof FormUpload,
    ErrorMessage: typeof ErrorMessage,
    InputGroup: typeof InputGroup,
    Label: typeof Label,
    Section: typeof Section,
    Slot: typeof Slot,
}
const BaseForm = Form as FormType
BaseForm.TextArea = FormTextArea
BaseForm.InputNumber = FormInputNumber
BaseForm.Select = FormSelect
BaseForm.Input = FormInput
BaseForm.SelectOption = FormSelectOption
BaseForm.SelectOptionGroup = FormSelectOptionGroup
BaseForm.AutoComplete = FormAutoComplete
BaseForm.Cascader = FormCascader
BaseForm.Checkbox = FormCheckbox
BaseForm.CheckboxGroup = FormCheckboxGroup
BaseForm.DatePicker = FormDatePicker
BaseForm.Radio = FormRadio
BaseForm.RadioGroup = FormRadioGroup
BaseForm.Rating = FormRating
BaseForm.Slider = FormSlider
BaseForm.Switch = FormSwitch
BaseForm.TagInput = FormTagInput;
BaseForm.TimePicker = FormTimePicker;
BaseForm.TreeSelect = FormTreeSelect;
BaseForm.Upload = FormUpload;
BaseForm.ErrorMessage = ErrorMessage;
BaseForm.InputGroup = InputGroup;
BaseForm.Label = Label;
BaseForm.Section = Section;
BaseForm.Slot = Slot;

export default BaseForm;
export {
    BaseForm as Form,
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
