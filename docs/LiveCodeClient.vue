<script setup lang="ts">
import { type OutputModes, Repl, useStore, useVueImportMap } from '@vue/repl';
// import Monaco from '@vue/repl/monaco-editor'
import CodeMirror from '@vue/repl/codemirror-editor'
import { onMounted, ref } from 'vue';
import {useData} from "vitepress";

const props = defineProps({
  files: {
    type: Object,
  },
})

const {isDark} = useData();

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)


const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode,
} = useVueImportMap({
  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from jsdelivr.com with version matching Vue's version
  // from peerDependency
  // runtimeDev: import.meta.env.BASE_URL + 'vue.runtime.esm-browser.js',
  // runtimeProd: import.meta.env.BASE_URL + 'vue.runtime.esm-browser.prod.js',
  // serverRenderer: import.meta.env.BASE_URL + 'server-renderer.esm-browser.js',
})
builtinImportMap.value.imports = {
  "@kousum/semi-ui-vue": import.meta.env.BASE_URL + 'semi/semi-ui-vue.js',
}

const store = useStore(
  {
    // pre-set import map
    builtinImportMap,
    vueVersion,
    // starts on the output pane (mobile only) if the URL has a showOutput query
    showOutput: ref(query.has('showOutput')),
    // starts on a different tab on the output pane if the URL has a outputMode query
    // and default to the "preview" tab
    outputMode: ref((query.get('outputMode') || 'preview') as OutputModes),

  },
  // initialize repl with previously serialized state
  location.hash,
)


const previewOptions = {
  headHTML: `
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semi/style.css" data-n-g="">
<script>

const mql = window.matchMedia('(prefers-color-scheme: dark)');

function matchMode(e) {
    const body = document.body;
    if (e.matches) {
        if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
            body.setAttribute('style', "background-color: var(--semi-color-nav-bg);color: #fff;")
        }
    } else {
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            body.removeAttribute('style')
        }
    }
}

mql.addEventListener('change', matchMode);
document.addEventListener('DOMContentLoaded', function() {
  if (${isDark.value}){
    matchMode({matches: true})
  }
});

<\/script>
`
}


store.setFiles({
  'tsconfig.json': store.getFiles()['tsconfig.json'],
  'import-map.json': store.getFiles()['import-map.json'],
  ...props.files
}, Object.keys(props.files)[0]).then(()=>{
  // store.setFiles(store.getFiles())
})


// production mode is enabled
productionMode.value = true
</script>

<template>
  <Repl :theme="'dark'" :preview-options="previewOptions" style="width: 100%;height: 100%;" :store="store" :editor="CodeMirror" :showCompileOutput="true" />
</template>
