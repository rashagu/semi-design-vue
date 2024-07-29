<script setup lang="ts">
import { Row, Col } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="grid grid-flex">
    <p>Align Top</p>
    <Row type="flex" justify="center" align="top">
      <Col :span="4"><div class="col-content" :value="100">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="50">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="120">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="80">col-4</div></Col>
    </Row>

    <p>Align Center</p>
    <Row type="flex" justify="space-around" align="middle">
      <Col :span="4"><div class="col-content" :value="100">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="50">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="120">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="80">col-4</div></Col>
    </Row>

    <p>Align Bottom</p>
    <Row type="flex" justify="space-between" align="bottom">
      <Col :span="4"><div class="col-content" :value="100">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="50">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="120">col-4</div></Col>
      <Col :span="4"><div class="col-content" :value="80">col-4</div></Col>
    </Row>
  </div>
</template>

<style scoped></style>
