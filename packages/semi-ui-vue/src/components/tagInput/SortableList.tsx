import { defineComponent, h, ref, useSlots } from 'vue';
import SortableItem from './SortableItem';
import { CombineProps } from '../interface';
import { DragDropProvider } from '@kousum/dnd-kit-vue';

interface SortableListProps {
  items: any;
  onSortOver: any;
  onSortEnd: any;
  useDragHandle: any;
  helperClass: any;
  axis: any;
}

export const vuePropsType: CombineProps<Partial<SortableListProps>> = {
  items: Array,
  onSortOver: Function,
  onSortEnd: Function,
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
          onDragStart={(event)=>{
            overlayId.value = '' + event.operation.source?.id;
          }}
          onDragOver={(event)=>{
            props.onSortOver(event)
          }}
          onDragEnd={(event)=>{
            props.onSortEnd(event)
          }}
        >
          {props.items.map((item, index) => (
            <SortableItem key={item.key} id={item.key} item={item.item} index={index} />
          ))}
        </DragDropProvider>
      );
    };
  },
});

export default SortableList;
