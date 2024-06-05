<script setup lang="ts">
import { Space, Switch, Button } from '@kousum/semi-ui-vue';
</script>

<template>
  <Space>
    <Switch :defaultChecked="true" />
    <Button type="secondary">次要</Button>
    <Button type="tertiary">第三</Button>
    <Button type="warning">警告</Button>
  </Space>
</template>
