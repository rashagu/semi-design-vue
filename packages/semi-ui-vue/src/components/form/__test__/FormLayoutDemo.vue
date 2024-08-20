<script setup>
import { ref } from 'vue';
import {
  Form,
  FormRadio,
  FormRadioGroup,
  FormCheckbox,
  FormCheckboxGroup,
  FormSelect,
  FormSelectOption,
  FormInputNumber,
  FormSwitch,
  FormInput,
  FormLabel,
} from '../index';
import Select, {SelectOption,} from '../../select/index'

const labelPosition = ref('left');
const labelAlign = ref('left');
const labelWidth = ref('180px');

const changeLabelPos = (newLabelPosition) => {
  labelWidth.value = newLabelPosition === 'left' ? '180px' : 'auto';
  labelPosition.value = newLabelPosition;
};

const changeLabelAlign = (newLabelAlign) => {
  labelAlign.value = newLabelAlign;
};
</script>

<template>
  <div>
    <div style="border-bottom: 1px solid var(--semi-color-border); padding-bottom: 12px">
      <FormLabel style="margin-left: 10px">切换Label位置:</FormLabel>
      <Select :value="labelPosition" @change="changeLabelPos" style="width: 200px" insetLabel="labelPosition">
        <SelectOption value="top">top</SelectOption>
        <SelectOption value="left">left</SelectOption>
      </Select>
      <FormLabel style="margin-left: 10px">切换Label文本对齐方向:</FormLabel>
      <Select :value="labelAlign" @change="changeLabelAlign" style="width: 200px" insetLabel="labelAlign">
        <SelectOption value="left">left</SelectOption>
        <SelectOption value="right">right</SelectOption>
      </Select>
    </div>
    <Form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :label-align="labelAlign"
      :key="labelPosition + labelAlign"
      style="padding: 10px; width: 600px"
    >
      <FormInput
        field="input"
        label="手机号码"
        trigger="blur"
        style="width: 200px"
        :rules="[
          { required: true, message: 'required error' },
          { type: 'string', message: 'type error' },
          { validator: (rule, value) => value === 'semi', message: 'should be semi' },
        ]"
      />
      <FormSwitch label="是否同意" field="agree" />
      <FormInputNumber field="price" label="价格" style="width: 200px" />
      <FormSelect label="姓名" field="name" style="width: 200px">
        <FormSelectOption :field="''" value="mike">mike</FormSelectOption>
        <FormSelectOption :field="''" value="jane">jane</FormSelectOption>
        <FormSelectOption :field="''" value="kate">kate</FormSelectOption>
      </FormSelect>
      <FormCheckboxGroup label="角色" field="role" direction="horizontal">
        <FormCheckbox :field="''" value="admin">admin</FormCheckbox>
        <FormCheckbox :field="''" value="user">user</FormCheckbox>
        <FormCheckbox :field="''" value="guest">guest</FormCheckbox>
        <FormCheckbox :field="''" value="root">root</FormCheckbox>
      </FormCheckboxGroup>
      <FormRadioGroup field="性别">
        <FormRadio :field="''" value="1">man</FormRadio>
        <FormRadio :field="''" value="2">woman</FormRadio>
      </FormRadioGroup>
    </Form>
  </div>
</template>

