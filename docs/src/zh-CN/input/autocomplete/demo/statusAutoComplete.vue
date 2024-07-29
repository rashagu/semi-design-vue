<template>
  <div>
    <AutoComplete
      defaultValue="ies"
      validateStatus="warning"
      :style="{ width: '200px' }"
    />
    <br />
    <br />
    <AutoComplete
      defaultValue="ies"
      validateStatus="error"
      :style="{ width: '200px' }"
    />
    <br />
    <br />
    <AutoComplete
      defaultValue="ies"
      :style="{ width: '200px' }"
    />
  </div>
</template>

<script setup>
import { AutoComplete } from '@kousum/semi-ui-vue';
</script>

