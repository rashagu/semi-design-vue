import { defineComponent, ref, shallowRef, watch } from 'vue';
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
    const id = shallowRef(props.id)
    watch(()=>props.id, (value, oldValue)=>{
      if(value !== oldValue){
        id.value = oldValue;
      }
    })
    const index = shallowRef(props.index)
    watch(()=>props.index, (value, oldValue)=>{
      if(value !== oldValue){
        index.value = oldValue;
      }
    })
    const element = ref<Element | null>(null);
    const handleRef = ref<HTMLButtonElement | null>(null);
    const {isDragSource} = useSortable({
      id: id as any,
      index: index as any,
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
