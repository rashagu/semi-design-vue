import type { Arguments } from '@dnd-kit-vue/sortable';
import { useSortable } from '@dnd-kit-vue/sortable';
import { CSS } from '@dnd-kit-vue/utilities';

import { type ComponentObjectPropsOptions, computed, CSSProperties, defineComponent, h, useSlots } from 'vue';
import { CombineProps } from '../interface';

interface SortableItemProps {
  id: number | string;
  item: any;
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
};
const SortableItem = defineComponent({
  props: { ...vuePropsType },
  name: 'SortableItem',
  setup(props, {}) {

    const params: Arguments = { id: computed(() => props.id) as any };

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable(params);

    return () => {
      const style = {
        transform: CSS.Transform.toString(transform.value),
        // @ts-ignore
        transition: transition.value,
      };
      return props.item({ setNodeRef, style, attributes: attributes?.value, listeners: listeners?.value });
    };
  },
});

export default SortableItem;
