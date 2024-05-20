<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { FormSelect, FormSelectOption, Button, Select,
  SelectOption } from "../../index"
import Form from '../../form/baseForm';

defineProps<{
  // field: string
  // label?: string
}>()

// onMounted(() => {
//   console.log("tableMetaList", tableMetaList)
// })
const testOption = ref<string[]>(['fgh'])
const add = () => {
  testOption.value.push("test" + testOption.value.length)
  console.log("testOption", testOption.value)
  testOption.value = [...testOption.value]
}
</script>

<template>
  <Select
    :style="{width:'200px'}"
    placeholder="请选择"
    @change="(v)=>{
      console.log('change', v)
    }"
  >
    <template
      v-for="item in testOption"
      :key="item"
    >
      <SelectOption :value="item">
        {{ item }}
      </SelectOption>
    </template>
  </Select>

  <Form>
    <FormSelect
      :field="'fieldxx'"
      :label="'label'"
      :style="{width:'200px'}"
      placeholder="请选择"
    >
      <template
        v-for="item in testOption"
        :key="item"
      >
        <FormSelectOption :value="item">
          {{ item }}
        </FormSelectOption>
      </template>
    </FormSelect>
  </Form>
  <Button @click="add">Add</Button>
</template>
