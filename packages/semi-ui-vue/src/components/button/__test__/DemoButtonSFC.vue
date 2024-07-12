<script setup lang="ts">
import Button from '../index';
import { IconBell, IconHelpCircle } from '@kousum/semi-icons-vue';
import { h } from 'vue';


function test(){
  alert(1)
}

function test2(){
  alert(2)
}
</script>

<template>
<Button :icon="IconBell" @click="test" :on-click="test2"></Button>
</template>

<style scoped>

</style>
