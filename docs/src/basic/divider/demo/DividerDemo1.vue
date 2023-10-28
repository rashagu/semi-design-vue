<script setup lang="ts">
import {code1} from "./codes";
import LiveCode from "../../../../LiveCode.vue";

</script>

<template>

  <div style="width: 100%;height: 500px;">
    <LiveCode :files="code1" :mainFile="'App1.vue'"/>
  </div>
</template>
