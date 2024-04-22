<script setup lang="ts">
import { Row, Col } from '@kousum/semi-ui-vue';
</script>

<template>
  <div class="grid">
    <Row :gutter="{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }">
      <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div class="col-content">Col</div></Col>
      <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"><div class="col-content">Col</div></Col>
      <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div class="col-content">Col</div></Col>
    </Row>
    <br />
    <Row>
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><div class="col-content">Col</div></Col>
      <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"><div class="col-content">Col</div></Col>
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><div class="col-content">Col</div></Col>
    </Row>
  </div>
</template>

<style scoped></style>
