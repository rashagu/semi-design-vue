<template>
  <div>
    <TypographyNumeral :precision="1">
      <p>点赞量：1.6111e1 K</p>
    </TypographyNumeral>

    <p>
      播放量:
      <TypographyNumeral rule="numbers" :precision="1">
        2.4444e2
      </TypographyNumeral>
      K
    </p>

    <TypographyNumeral rule="percentages" :precision="2" :style="{ marginBottom: '12px' }">
      <p>好评率: 0.915</p>
    </TypographyNumeral>

    <TypographyNumeral rule="percentages" :style="{ marginBottom: '12px' }">
      这场比赛我的胜率是0.6，输的概率是0.4
    </TypographyNumeral>

    <TypographyNumeral rule="bytes-decimal" :precision="2" truncate="floor">
      <p>已使用: 1000</p>
      <p>未使用: {{ 1024*1000 }}</p>
    </TypographyNumeral>

    <TypographyNumeral rule="bytes-binary" :precision="2" truncate="floor">
      <p>已使用: 1024</p>
      <p>未使用: {{ 2e12 }}</p>
    </TypographyNumeral>
  </div>
</template>

<script setup lang="ts">
import { TypographyNumeral } from '@kousum/semi-ui-vue';

</script>
