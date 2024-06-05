<template>
  <div>
    <TypographyTitle :heading="5">默认行距</TypographyTitle>
    <TypographyParagraph>
      Semi Design 是由抖音前端团队与 UED
      团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
      Web 应用。
    </TypographyParagraph>
    <br />
    <TypographyTitle :heading="5">宽松行距</TypographyTitle>
    <TypographyParagraph spacing="extended">
      Semi Design 是由抖音前端团队与 UED
      团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
      Web 应用。
    </TypographyParagraph>
  </div>
</template>
<script setup lang="ts">
import { TypographyParagraph, TypographyTitle } from '@kousum/semi-ui-vue';
</script>
