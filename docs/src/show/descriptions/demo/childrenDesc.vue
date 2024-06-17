<script setup lang="ts">
import { h, ref } from 'vue';
import { Descriptions, Tag, Card, DescriptionsItem } from '@kousum/semi-ui-vue';
import { IconArrowUp } from '@kousum/semi-icons-vue';

</script>
<template>
  <div>
    <Descriptions>
      <DescriptionsItem itemKey="实际用户数量">1,480,000</DescriptionsItem>
      <DescriptionsItem itemKey="7天留存">98%</DescriptionsItem>
      <DescriptionsItem itemKey="安全等级">3级</DescriptionsItem>
      <DescriptionsItem itemKey="垂类标签">电商</DescriptionsItem>
      <DescriptionsItem itemKey="认证状态">未认证</DescriptionsItem>
    </Descriptions>
  </div>
</template>
