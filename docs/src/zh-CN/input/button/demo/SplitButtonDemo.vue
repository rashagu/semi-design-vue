<template>
  <div>
    <SplitButtonGroup style="margin-right: 10px" aria-label="项目操作按钮组">
      <Button theme="solid" type="primary">分裂按钮</Button>
      <Dropdown @visible-change="handleVisibleChange(1, $event)" :menu="menu" trigger="click" position="bottomRight">
        <Button
          :style="
            btnVisible[1]
              ? { background: 'var(--semi-color-primary-hover)', padding: '8px 4px' }
              : { padding: '8px 4px' }
          "
          theme="solid"
          type="primary"
          :icon="h(IconTreeTriangleDown)"
        ></Button>
      </Dropdown>
    </SplitButtonGroup>
    <SplitButtonGroup style="margin-right: 10px" aria-label="项目操作按钮组">
      <Button theme="light" type="primary">分裂按钮</Button>
      <Dropdown @visible-change="handleVisibleChange(2, $event)" :menu="menu" trigger="click" position="bottomRight">
        <Button
          :style="
            btnVisible[2] ? { background: 'var(--semi-color-fill-1)', padding: '8px 4px' } : { padding: '8px 4px' }
          "
          theme="light"
          type="primary"
          :icon="h(IconTreeTriangleDown)"
        ></Button>
      </Dropdown>
    </SplitButtonGroup>
    <SplitButtonGroup aria-label="项目操作按钮组">
      <Button :style="btnVisible[3] ? { background: 'var(--semi-color-fill-0)' } : {}" theme="borderless" type="primary"
        >分裂按钮</Button
      >
      <Dropdown @visible-change="handleVisibleChange(3, $event)" :menu="menu" trigger="click" position="bottomRight">
        <Button
          :style="
            btnVisible[3] ? { background: 'var(--semi-color-fill-1)', padding: '8px 4px' } : { padding: '8px 4px' }
          "
          theme="borderless"
          type="primary"
          :icon="h(IconTreeTriangleDown)"
        ></Button>
      </Dropdown>
    </SplitButtonGroup>
  </div>
</template>

<script setup>
import { h, ref } from 'vue';
import { SplitButtonGroup, Dropdown, Button } from '@kousum/semi-ui-vue';
import { IconTreeTriangleDown } from '@kousum/semi-icons-vue';

const menu = ref([
  { node: 'item', name: '编辑项目', onClick: () => console.log('编辑项目点击') },
  { node: 'item', name: '重置项目' },
  { node: 'divider' },
  { node: 'item', name: '复制项目' },
  { node: 'item', name: '从项目创建模版' },
  { node: 'divider' },
  { node: 'item', name: '删除项目', type: 'danger' },
]);

const btnVisible = ref({
  1: false,
  2: false,
  3: false,
});

const handleVisibleChange = (key, visible) => {
  btnVisible.value[key] = visible;
};
</script>
