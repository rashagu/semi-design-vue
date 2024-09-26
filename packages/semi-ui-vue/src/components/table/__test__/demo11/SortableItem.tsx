import { useSortable } from '@kousum/dnd-kit-vue/sortable';

import { defineComponent, h, ref, useSlots } from 'vue';
import { pointerIntersection } from '@dnd-kit/collision';

interface SortableItemProps {
  id: number | string;
  moveRow: any;
  index?: number;
  style: any;
  componentsTag?: string;
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

const SortableItem = defineComponent((props, {attrs}) => {

  const slots = useSlots()


  const element = ref<Element | null>(null);
  const handleRef = ref<HTMLButtonElement | null>(null);
  const {isDragSource} = useSortable({
    id: props.id,
    index: props.index,
    element,
    handle: handleRef,
    collisionDetector: pointerIntersection
  });

  const style0 = {...(props.style as Object || {}), cursor: 'move'};

  let index = 0

  return () => {

    const {currentPage, onMouseEnter, onMouseLeave, ...restProps} = attrs;
    // moveRow.moveRow(dragIndex, hoverIndex)
    if (index === 0) {
      // console.log(attrs, props)
      index++
    }

    return h(props.componentsTag as any, {
      id: 'asd_' + props.id,
      ref: element as any,
      shadow: isDragSource?.value,
      ...restProps,
    }, slots.default?.())

  }
}, {
  props: { ...vuePropsType },
  name: 'SortableItem'
})


export default SortableItem

