<template>
  <Tabs type="line">
    <TabPane tab="tight" itemKey="1">
      <Space :spacing="'tight'" style="margin-top: 15px">
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
      </Space>
    </TabPane>
    <TabPane tab="medium" itemKey="2">
      <Space :spacing="'medium'" style="margin-top: 15px">
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
      </Space>
    </TabPane>
    <TabPane tab="loose" itemKey="3">
      <Space :spacing="'loose'" style="margin-top: 15px">
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
      </Space>
    </TabPane>
    <TabPane tab="array" itemKey="4">
      <Space :spacing="[8, 16]" wrap style="margin-top: 15px">
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
        <Button theme='solid' type='primary'>按钮</Button>
      </Space>
    </TabPane>
  </Tabs>
</template>

<script setup>
import { Space, Tabs, TabPane, Button } from '@kousum/semi-ui-vue';
</script>
