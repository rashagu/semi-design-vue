<script setup lang="ts">
import { Row, Col } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="grid">
    <p>sub-element align left</p>
    <Row type="flex" justify="start">
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
    </Row>

    <p>sub-element align center</p>
    <Row type="flex" justify="center">
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
    </Row>

    <p>sub-element align right</p>
    <Row type="flex" justify="end">
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
    </Row>

    <p>sub-element monospaced arrangement</p>
    <Row type="flex" justify="space-between">
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
    </Row>

    <p>sub-element align full</p>
    <Row type="flex" justify="space-around">
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
      <Col :span="4"><div class="col-content">col-4</div></Col>
    </Row>
  </div>
</template>

<style scoped>

</style>
