
<template>
  <DatePicker
    :value="date"
    :format="formatToken"
    @change="onChange"
    :trigger-render="triggerRender"
  />
</template>

<script setup>
import { ref, computed, h } from 'vue';
import * as dateFns from 'date-fns';
import { IconClose, IconChevronDown } from '@kousum/semi-icons-vue';
import Button from '../../button/index';
import DatePicker from '../index';

const date = ref(new Date());
const formatToken = 'yyyy-MM-dd';

const onChange = (newDate) => {
  date.value = newDate;
};

const onClear = (e) => {
  e && e.stopPropagation();
  date.value = null;
};


const triggerRender = ({ placeholder }) => {
  const closeIcon = date.value ? h(IconClose, { onClick: onClear }) : h(IconChevronDown);
  return h(Button, {
    type: 'primary',
    theme: 'light',
    icon: closeIcon,
    'icon-position': 'right',
  }, ()=>date.value ? dateFns.format(date.value, formatToken) : placeholder);
};
</script>
