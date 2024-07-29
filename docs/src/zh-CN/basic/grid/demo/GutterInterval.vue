<script setup lang="ts">
import { Row, Col } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="grid grid-gutter">
    <p>horizontal</p>
    <hr />
    <Row :gutter="16">
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
    </Row>
    <p>vertical</p>
    <hr />
    <Row :gutter="[16, 24]">
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
      <Col :span="6">
        <div class="col-content">col-6</div>
      </Col>
    </Row>
  </div>
</template>

<style scoped></style>
