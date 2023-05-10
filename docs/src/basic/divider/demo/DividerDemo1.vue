<script setup lang="ts">
import { Divider, Typography } from '@kousum/semi-ui-vue';
import { IconSemiLogo } from '@kousum/semi-icons-vue';

</script>

<template>
  <div>
    <Divider margin='12px' align='left'>
      这是居左文字
    </Divider>

    <Divider margin='12px' align='center'>
      这是居中文字
    </Divider>

    <Divider margin='12px' align='right'>
      这是居右文字
    </Divider>

    <Divider margin='12px'>
      <IconSemiLogo />
    </Divider>
  </div>
</template>
