<script setup lang="ts">
import { defineComponent, ref, h, Fragment, useSlots, onMounted } from 'vue';
import type { ComponentObjectPropsOptions } from 'vue';
import Column from '../Column';
import { IconMore } from '@kousum/semi-icons-vue';
import Table from '../index';



interface Props {
  msg?: any,
}
defineOptions({name: 'TableDemoSFC'})

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  change: [id: number] // named tuple syntax
  update: [value: string]
}>();

const count = ref(0);


const data = [
  {
    key: '1',
    name: 'Semi Design 设计稿.fig',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
    size: '2M',
    owner: '姜鹏志',
    updateTime: '2020-02-02 05:13',
    avatarBg: 'grey',
  },
  {
    key: '2',
    name: 'Semi Design 分享演示文稿',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '2M',
    owner: '郝宣',
    updateTime: '2020-01-17 05:31',
    avatarBg: 'red',
  },
  {
    key: '3',
    name: '设计文档',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    owner: 'Zoey Edwards',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'light-blue',
  },
];



const show = ref(false)
onMounted(()=>{
  setTimeout(()=>{
    show.value = true
  }, 1000)
})
</script>
<script lang="ts">
export default {
  name: 'TableDemoSFC',
};
</script>
<template>
  <div>
    <Table :dataSource="data">
      <Column title="标题" dataIndex="name" key="name" />
      <Column title="大小" dataIndex="size" key="size" />
      <Column title="所有者" dataIndex="owner" key="owner" />
      <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
      <Column v-if="show" title="操作" dataIndex="operate" key="operate" :render="() => h(IconMore)" />
    </Table>
  </div>
</template>

<style scoped lang="scss">
</style>
