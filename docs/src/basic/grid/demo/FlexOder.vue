<script setup lang="ts">
import { Row, Col } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="grid">
    <Row type="flex">
      <Col :span="6" :order="4"><div class="col-content">col-4</div></Col>
      <Col :span="6" :order="3"><div class="col-content">col-3</div></Col>
      <Col :span="6" :order="2"><div class="col-content">col-2</div></Col>
      <Col :span="6" :order="1"><div class="col-content">col-1</div></Col>
    </Row>
  </div>
</template>

<style scoped></style>
