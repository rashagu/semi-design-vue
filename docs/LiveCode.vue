<script setup lang="ts">
import {defineClientComponent} from 'vitepress'


const props = defineProps({
  files: {
    type: Object,
    default: {
      'App.vue': `<script setup>
import { ref } from 'vue'
import { Button } from '@kousum/semi-ui-vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <Button>{{ msg }}</Button>
</template>
`
    }
  }
})

const LiveCodeClient: any = defineClientComponent(
    //@ts-ignore
    () => import('./LiveCodeClient.vue'),

    // args are passed to h() - https://vuejs.org/api/render-function.html#h
    [
      {
        ...props
      },
      {}
    ],

    // callback after the component is loaded, can be async
    () => {
    }
)

</script>

<template>
  <LiveCodeClient/>
</template>
