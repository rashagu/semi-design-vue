<script setup lang="ts">
import { Repl, ReplStore, File } from '@vue/repl'
//@ts-ignore
import Monaco from '@vue/repl/monaco-editor'
import '@vue/repl/style.css'
import {onMounted} from "vue";

const props = defineProps({
  files: {
    type: Object,
  },
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


const previewOptions = {
  headHTML: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kousum/semi-ui-vue@0.5.5/build/style.css" data-n-g="">'
}
// persist state to URL hash
// watchEffect(() => history.replaceState({}, '', store.serialize()))
// pre-set import map
store.setImportMap({
  imports: {
    "@kousum/semi-ui-vue": 'https://cdn.jsdelivr.net/npm/@kousum/semi-ui-vue@0.5.5/build/semi-ui-vue.mjs',
  },
})
// use a specific version of Vue
store.setVueVersion('3.3.4')

store.setFiles({
  'tsconfig.json': store.getFiles()['tsconfig.json'],
  'import-map.json': store.getFiles()['import-map.json'],
  ...props.files
}, Object.keys(props.files)[0]).then(()=>{
  // store.setFiles(store.getFiles())
})

onMounted(()=>{
setTimeout(()=>{

}, 3*1000)
})
</script>

<template>
  <Repl :preview-options="previewOptions" style="width: 100%;height: 100%;" :store="store" :editor="Monaco" :showCompileOutput="true" />
</template>
