<script setup lang="ts">
import {code0} from "./codes";
import LiveCode from "../../../../LiveCode.vue";

</script>

<template>

  <div style="width: 100%;height: 500px;">
    <LiveCode :files="code0" :mainFile="'App.vue'"/>
  </div>
</template>
