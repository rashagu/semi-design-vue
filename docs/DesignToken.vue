<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {Tabs, TabPane, Table} from '@kousum/semi-ui-vue'
import {useData,} from "vitepress";

interface Props {
  title?: string,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>()

const data = useData()

const { page } = useData()
const count = ref(0)


const categoryArr = ref([])
onMounted(()=>{
  fetch(import.meta.env.BASE_URL + 'designToken.json').then(res=>{
    res.json().then((designToken: Record<string, {
      "key": string,
      "value": string,
      "comment": string,
      "category": string,
      "raw": string,
    }[]>)=>{

      const designTokenData = designToken[(props.title || page.value.title)?.split(' ')[0].toLowerCase()] || []

      const category = {}
      designTokenData.forEach(item=>{
        if (Array.isArray(category[item.category])){
          category[item.category].push(item)
        }else{
          category[item.category] = [item]
        }
      })
      for (const categoryArrKey in category) {
        categoryArr.value.push({
          title: categoryArrKey,
          item: category[categoryArrKey]
        })
      }
    })
  })
})


// console.log(categoryArr)
//

const columns = [
  {
    title: '变量',
    dataIndex: 'key',
  },
  {
    title: '默认值',
    dataIndex: 'value',
  },
  {
    title: '用法',
    dataIndex: 'comment',
  },
];
</script>

<template>
  <Tabs type="button">
    <TabPane v-for="(item, index) in categoryArr" :key="index" :tab="item.title" :itemKey="''+index">
      <Table :columns="columns" :dataSource="item.item" />
    </TabPane>
  </Tabs>
</template>

<style scoped>
</style>
