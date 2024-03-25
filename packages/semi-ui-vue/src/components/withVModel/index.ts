import WithVModel from './WithVModel';
import Input from '../input';
import AutoComplete from '../autoComplete';
import Cascader from '../cascader';
import Checkbox from '../checkbox/checkbox';
import { CheckboxGroup } from '../checkbox';
import DatePicker from '../datePicker';
import InputNumber from '../inputNumber';
import { Radio } from '../radio';
import RadioGroup from '../radio/radioGroup';
import Rating from '../rating';
import Select from '../select';
import Slider from '../slider';
import Switch from '../switch';
import TagInput from '../tagInput';
import TimePicker from '../timePicker';
import Transfer from '../transfer';
import TreeSelect from '../treeSelect';
import Upload from '../upload';

export const AutoCompleteVModel = WithVModel(AutoComplete);
export const CascaderVModel = WithVModel(Cascader);
export const CheckboxGroupVModel = WithVModel(CheckboxGroup);
export const DatePickerVModel = WithVModel(DatePicker);
export const InputVModel = WithVModel(Input);
export const InputNumberVModel = WithVModel(InputNumber);
export const RadioGroupVModel = WithVModel(RadioGroup, { valuePath: 'target.value' });
export const RatingVModel = WithVModel(Rating);
export const SelectVModel = WithVModel(Select);
export const SliderVModel = WithVModel(Slider);
export const SwitchVModel = WithVModel(Switch, { valueKey: 'checked' });
export const TagInputVModel = WithVModel(TagInput);
export const TimePickerVModel = WithVModel(TimePicker);
export const TransferVModel = WithVModel(Transfer);
export const TreeSelectVModel = WithVModel(TreeSelect);
export const UploadVModel = WithVModel(Upload, {
  valueKey: 'fileList',
  valuePath: 'fileList',
  onKeyChangeFnName: 'onChange',
});
