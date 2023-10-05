<script setup lang="ts">
import {onMounted, watchEffect} from 'vue'
import { Repl, ReplStore, File } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import {withBase} from "vitepress";

const props = defineProps({
  codeText: {
    type: String,
    default: `<script setup>
import { ref } from 'vue'
import { Button } from '@kousum/semi-ui-vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <Button>{{ msg }}</Button>
</template>
`
  }
})
// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)

const store = new ReplStore({
  // initialize repl with previously serialized state
  serializedState: location.hash.slice(1),

  // starts on the output pane (mobile only) if the URL has a showOutput query
  showOutput: query.has('showOutput'),
  // starts on a different tab on the output pane if the URL has a outputMode query
  // and default to the "preview" tab
  outputMode: query.get('outputMode') || 'preview',

  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from jsdelivr.com with version matching Vue's version
  // from peerDependency
  defaultVueRuntimeURL: 'cdn link to vue.runtime.esm-browser.js',
})

// persist state to URL hash
// watchEffect(() => history.replaceState({}, '', store.serialize()))
// pre-set import map
store.setImportMap({
  imports: {
    "@kousum/semi-ui-vue": withBase('/semi/semi-ui-vue.mjs'),
  },
})

const previewOptions = {
  headHTML: '<link rel="stylesheet" href="/semi/style.css" data-n-g="">'
}
// use a specific version of Vue
store.setVueVersion('3.3.4')

store.setFiles({
  ...store.getFiles(),
  'App.vue': props.codeText
})
</script>

<template>
  <Repl :preview-options="previewOptions" style="width: 100%;height: 100%;" :store="store" :editor="Monaco" :showCompileOutput="true" />
</template>
