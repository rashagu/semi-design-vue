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
  index: number,
  style:any
}

export const vuePropsType = {
  id: [String, Number],
  children: [Object, Function],
  moveRow: Function,
  index: Number,
  style: [Object, String]
}

const SortableItem = defineComponent<SortableItemProps>((props, {attrs}) => {

  const slots = useSlots()

  const params: Arguments = {id: computed(() => props.index) as any}
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
    const {currentPage, style: A, onMouseEnter, onMouseLeave, ...restProps} = attrs;
    // moveRow.moveRow(dragIndex, hoverIndex)
    if (index === 0) {
      // console.log(attrs, props)
      index++
    }
    return (
      <tr
        id={'asd_' + props.index}
        ref={setNodeRef as any}
        {...attributes.value}
        {...listeners?.value}
        {...restProps}
        style={style}
      >
        {slots.default?.()}
      </tr>
    )

  }
})

SortableItem.props = vuePropsType
SortableItem.name = 'SortableItem'

export default SortableItem

