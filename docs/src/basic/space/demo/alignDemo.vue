<template>
  <Space vertical>
    <Space align='start'>
      <div :style="divStyle">文本</div>
      <Button theme='solid' type='primary'>按钮</Button>
      <Tag color='green' size='large'>标签</Tag>
    </Space>
    <Space align='center'>
      <div :style="divStyle">文本</div>
      <Button theme='solid' type='primary'>按钮</Button>
      <Tag color='green' size='large'>标签</Tag>
    </Space>
    <Space align='end'>
      <div :style="divStyle">文本</div>
      <Button theme='solid' type='primary'>按钮</Button>
      <Tag color='green' size='large'>标签</Tag>
    </Space>
    <Space align='baseline'>
      <div :style="divStyle">文本</div>
      <Button theme='solid' type='primary'>按钮</Button>
      <Tag color='green' size='large'>标签</Tag>
    </Space>
  </Space>
</template>

<script setup>
import { ref } from 'vue';
import { Space, Button, Tag } from '@kousum/semi-ui-vue';

const divStyle = ref({
  width: '80px',
  height: '100px',
  lineHight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--semi-color-border)',
  borderRadius: '3px'
});
</script>
