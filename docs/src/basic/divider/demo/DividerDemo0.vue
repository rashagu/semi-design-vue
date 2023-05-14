<script setup lang="ts">
import { Divider } from '@kousum/semi-ui-vue';
</script>

<template>
  <div>
    <h3>水平实线</h3>
    <span>Semi Design 是一个设计系统。</span>
    <Divider margin="12px" />
    <span>它定义了一套中后台设计与前端基础组件。</span>

    <h3 :style="{ marginTop: '40px' }">水平虚线</h3>
    <span>Semi Design 是一个设计系统。</span>
    <Divider dashed="{true}" margin="12px" />
    <span>它定义了一套中后台设计与前端基础组件。</span>

    <h3 :style="{ marginTop: '40px' }">垂直实线</h3>

    <div>
      <span>左</span>
      <Divider layout="vertical" margin="12px" />
      <span>中</span>
      <Divider layout="vertical" margin="12px" />
      <span>右</span>
    </div>

    <h3 :style="{ marginTop: '40px' }">垂直虚线</h3>
    <div>
      <span>左</span>
      <Divider layout="vertical" :dashed="true" margin="12px" />
      <span>中</span>
      <Divider layout="vertical" :dashed="true" margin="12px" />
      <span>右</span>
    </div>
  </div>
</template>
