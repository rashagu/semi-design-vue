import { defineComponent, ref } from 'vue';
import { CombineProps } from '../interface';
import { useSortable } from '@kousum/dnd-kit-vue/sortable';
import { pointerIntersection } from '@dnd-kit/collision';

interface SortableItemProps {
  id: number | string;
  item: any;
  index: number;
}

export const vuePropsType: CombineProps<SortableItemProps> = {
  id: {
    type: [String, Number],
    required: true
  },
  item: {
    type: Function,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
};
const SortableItem = defineComponent({
  props: { ...vuePropsType },
  name: 'SortableItem',
  setup(props, {}) {

    const element = ref<Element | null>(null);
    const handleRef = ref<HTMLButtonElement | null>(null);
    const {isDragSource} = useSortable({
      id: props.id,
      index: props.index,
      element,
      handle: handleRef,
      collisionDetector: pointerIntersection
    });

    return () => {
      return props.item({ element, handleRef: (v)=>{handleRef.value = v?.$el}, attributes: {shadow: isDragSource?.value,}});
    };
  },
});

export default SortableItem;
