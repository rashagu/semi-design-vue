import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DropAnimation,
  defaultDropAnimationSideEffects,
  DragOverlay,
} from '@dnd-kit-vue/core';
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit-vue/sortable';
import { defineComponent, ref, h, Fragment, useSlots, Teleport, ComponentObjectPropsOptions } from 'vue';
import SortableItem from './SortableItem';

interface SortableListProps {
  items: any;
  onSortEnd: any;
  useDragHandle: any;
  helperClass: any;
  axis: any;
}

export const vuePropsType: ComponentObjectPropsOptions<SortableListProps> = {
  items: Array,
  onSortEnd: Function,
  useDragHandle: [Boolean],
  helperClass: String,
  axis: String,
};
const SortableList = defineComponent({
  props: vuePropsType,
  name: 'SortableList',
  setup(props, {}) {
    const slots = useSlots();

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          // distance: 5,
          delay: 100,
          tolerance: 100,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
    const dropAnimationConfig: DropAnimation = {
      sideEffects: defaultDropAnimationSideEffects({
        styles: {
          active: {
            opacity: '0.5',
          },
        },
      }),
    };
    const overlayId = ref('');
    function onDragStart(event: DragEndEvent) {
      overlayId.value = '' + event.active?.id;
    }

    return () => {
      return (
        <DndContext
          sensors={sensors.value}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={props.onSortEnd}
        >
          <SortableContext items={props.items} strategy={horizontalListSortingStrategy}>
            {props.items.map((item) => (
              <SortableItem key={item.key} id={item.key} item={item.item} />
            ))}
          </SortableContext>
          <Teleport to={document.body}>
            <DragOverlay adjustScale={false} dropAnimation={dropAnimationConfig}>
              {props.items.filter((item) => item.id === overlayId.value).map((item) => item.item({}))}
            </DragOverlay>
          </Teleport>
        </DndContext>
      );
    };
  },
});

export default SortableList;
