import { defineComponent, h, ref, useSlots } from 'vue';
import SortableItem from './SortableItem';
import { CombineProps } from '../interface';
import { DragDropProvider } from '@kousum/dnd-kit-vue';
import { prefixCls } from './index';
import {RestrictToVerticalAxis} from '@dnd-kit/abstract/modifiers';

interface SortableListProps {
  items: any;
  onSortOver: any;
  useDragHandle: any;
  helperClass: any;
  axis: any;
}

export const vuePropsType: CombineProps<Partial<SortableListProps>> = {
  items: Array,
  onSortOver: Function,
  useDragHandle: [Boolean],
  helperClass: String,
  axis: String,
};
const SortableList = defineComponent({
  props: { ...vuePropsType },
  name: 'SortableList',
  setup(props, {}) {
    const slots = useSlots();

    // const sensors = useSensors(
    //   useSensor(PointerSensor, {
    //     activationConstraint: {
    //       // distance: 5,
    //       delay: 100,
    //       tolerance: 100,
    //     },
    //   }),
    //   useSensor(KeyboardSensor, {
    //     coordinateGetter: sortableKeyboardCoordinates,
    //   })
    // );
    // const dropAnimationConfig: DropAnimation = {
    //   sideEffects: defaultDropAnimationSideEffects({
    //     styles: {
    //       active: {
    //         opacity: '0.5',
    //       },
    //     },
    //   }),
    // };
    const overlayId = ref('');


    return () => {
      return (
        <DragDropProvider
          modifiers={[RestrictToVerticalAxis]}
          onDragStart={(event) => {
            overlayId.value = '' + event.operation.source?.id;
          }}
          onDragOver={(event) => {
            props.onSortOver(event)
          }}
          onDragEnd={(event) => {
            // props.onSortOver(event)
          }}
        >
          <div class={`${prefixCls}-right-list`} role="list" aria-label="Selected list">
            {props.items.map((item: any, index: number) => (
              <SortableItem key={item.key} index={index} id={item.id} item={item.node} />
            ))}
          </div>
        </DragDropProvider>
      );
    };
  },
});

export default SortableList;
