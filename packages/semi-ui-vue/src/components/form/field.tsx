/* eslint-disable max-len */

import withField from './hoc/withField';

// Basic component
import Input, {InputProps, VuePropsType as InputVuePropsType} from '../input/index';
import TextArea, {VuePropsType as TextAreaVuePropsType} from '../input/textArea';
import InputNumber, {vuePropsType as InputNumberVuePropsType} from '../inputNumber/index';
import Select, {vuePropsType as SelectVuePropsType} from '../select/index';
import SelectOption from "../select/option";
import SelectOptionGroup from "../select/optionGroup";
import { Checkbox } from '../checkbox/index';
import { vuePropsType as CheckboxVuePropsType } from '../checkbox/checkbox';
import CheckboxGroup from '../checkbox/checkboxGroup';
import { vuePropsType as CheckboxGroupVuePropsType } from '../checkbox/checkboxGroup';
import { Radio } from '../radio/index';
import { vuePropsType as RadioVuePropsType } from '../radio/radio';
import RadioGroup from '../radio/radioGroup';
import { vuePropsType as RadioGroupVuePropsType } from '../radio/radioGroup';

import DatePicker, { vuePropsType as DatePickerVuePropsType } from '../datePicker/index';

import Switch, { vuePropsType as SwitchVuePropsType } from '../switch/index';
import Slider, { vuePropsType as SliderVuePropsType } from '../slider/index';
import TimePicker, { vuePropsType as TimePickerVuePropsType } from '../timePicker/index';
import TreeSelect, { vuePropsType as TreeSelectVuePropsType } from '../treeSelect/index';
import Cascader, { vuePropsType as CascaderVuePropsType } from '../cascader/index';
import Rating, { vuePropsType as RatingVuePropsType } from '../rating/index';
import AutoComplete, { vuePropsType as AutoCompleteVuePropsType } from '../autoComplete/index';
import Upload, { vuePropsType as UploadVuePropsType } from '../upload/index';
import TagInput, { vuePropsType as TagInputVuePropsType } from '../tagInput/index';
import { FormCheckboxType, FormRadioType, FormSelectType } from './interface';


const FormInput = withField(Input, { maintainCursor: true }, InputVuePropsType);
const FormInputNumber = withField(InputNumber, { maintainCursor: true }, InputNumberVuePropsType);
const FormTextArea = withField(TextArea, { maintainCursor: true }, TextAreaVuePropsType);

const FormSelect = withField(Select, undefined, SelectVuePropsType);
// Select after withField is a new Component, without the Option attribute, it needs to be manually assigned once
const FormSelectOption = SelectOption;
const FormSelectOptionGroup = SelectOptionGroup;

const FormCheckboxGroup = withField(CheckboxGroup, undefined, CheckboxGroupVuePropsType);
const FormCheckbox = withField(Checkbox, {
    valueKey: 'checked',
    valuePath: 'target.checked',
    shouldInject: false,
}, CheckboxVuePropsType) as typeof FormCheckboxType;
const FormRadioGroup = withField(RadioGroup, { valuePath: 'target.value' }, RadioGroupVuePropsType);
const FormRadio = withField(Radio, {
    valueKey: 'checked',
    valuePath: 'target.checked',
    shouldInject: false,
}, RadioVuePropsType) as unknown as typeof FormRadioType;

const FormDatePicker = withField(DatePicker, undefined, DatePickerVuePropsType);
const FormSwitch = withField(Switch, { valueKey: 'checked' }, SwitchVuePropsType);
const FormSlider = withField(Slider, undefined, SliderVuePropsType);
const FormTimePicker = withField(TimePicker, undefined, TimePickerVuePropsType);
const FormTreeSelect = withField(TreeSelect, undefined, TreeSelectVuePropsType);
const FormCascader = withField(Cascader, undefined, CascaderVuePropsType);
const FormRating = withField(Rating, undefined, RatingVuePropsType);
const FormAutoComplete = withField(AutoComplete, { valueKey: 'value', onKeyChangeFnName: 'onChange' }, AutoCompleteVuePropsType);
const FormUpload = withField(Upload, { valueKey: 'fileList', valuePath: 'fileList', onKeyChangeFnName: 'onChange' }, UploadVuePropsType);
const FormTagInput = withField(TagInput, undefined, TagInputVuePropsType);

export {
    FormInput,
    FormInputNumber,
    FormTextArea,
    FormSelect,
    FormSelectOption,
    FormSelectOptionGroup,
    FormCheckboxGroup,
    FormCheckbox,
    FormRadioGroup,
    FormRadio,
    FormDatePicker,
    FormSwitch,
    FormSlider,
    FormTimePicker,
    FormTreeSelect,
    FormCascader,
    FormRating,
    FormAutoComplete,
    FormUpload,
    FormTagInput
};
