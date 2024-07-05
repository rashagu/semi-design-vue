import type {Arguments} from "@dnd-kit-vue/sortable";
import {useSortable} from '@dnd-kit-vue/sortable';
import {CSS} from '@dnd-kit-vue/utilities';


import {computed, CSSProperties, defineComponent, h, useSlots} from 'vue'

interface SortableItemProps {
  id: number | string,
  item: any
}

export const vuePropsType = {
  id: [String, Number],
  item: Function
}
const SortableItem = defineComponent((props, {}) => {

  const slots = useSlots()

  const params:Arguments = {id: computed(()=>props.id) as any}

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable(params);


  return () => {
    const style = {
      transform: CSS.Transform.toString(transform.value),
      // @ts-ignore
      transition: transition.value,
    };
    return props.item({setNodeRef,style,attributes: attributes?.value,listeners:listeners?.value});
  }
}, {
  props: vuePropsType,
  name: 'SortableItem'
})


export default SortableItem

