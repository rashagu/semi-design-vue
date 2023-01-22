import {useSortable} from '@dnd-kit-vue/sortable';
import {CSS} from '@dnd-kit-vue/utilities';


import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  VNodeRef,
  CSSProperties,
  getCurrentInstance,
  inject,
  computed
} from 'vue'
import type {Arguments} from "@dnd-kit-vue/sortable";
import {omit} from "lodash";

interface SortableItemProps {
  id: number | string,
  moveRow: any,
  index?: number,
  style:any,
  componentsTag?: string
}

export const vuePropsType = {
  id: [String, Number],
  children: [Object, Function],
  moveRow: Function,
  index: Number,
  style: [Object, String],
  componentsTag: {
    type: String,
    default: 'tr'
  }
}

const SortableItem = defineComponent<SortableItemProps>((props, {attrs}) => {

  const slots = useSlots()


  const params: Arguments = {id: computed(() => props.id) as any}
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable(params);

  const style0 = {...(props.style as Object || {}), cursor: 'move'};

  let index = 0
  return () => {
    const style: CSSProperties = {
      ...style0,
      transform: CSS.Transform.toString(transform.value),
      transition: transition.value,
    };
    const {currentPage, onMouseEnter, onMouseLeave, ...restProps} = attrs;
    // moveRow.moveRow(dragIndex, hoverIndex)
    if (index === 0) {
      // console.log(attrs, props)
      index++
    }
    return h(props.componentsTag as any, {
      id: 'asd_' + props.id,
      ref: setNodeRef as any,
      ...attributes.value,
      ...listeners?.value,
      ...restProps,
      style
    }, slots.default?.())

  }
})

SortableItem.props = vuePropsType
SortableItem.name = 'SortableItem'

export default SortableItem

