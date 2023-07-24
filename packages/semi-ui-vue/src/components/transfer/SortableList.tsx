import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, DragEndEvent, DropAnimation, defaultDropAnimationSideEffects, DragOverlay,
} from '@dnd-kit-vue/core';
import {
  arrayMove, horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit-vue/sortable';
import {defineComponent, ref, h, Fragment, useSlots, Teleport} from 'vue'
import SortableItem from './SortableItem';
import {prefixCls} from "../transfer";

interface SortableListProps {
  items: any,
  onSortEnd: any,
  useDragHandle: any,
  helperClass: any,
  axis?: any,
}

export const vuePropsType = {
  items: Array,
  onSortEnd: Function,
  useDragHandle: [Boolean],
  helperClass: String,
  axis: String
}
const SortableList = defineComponent<SortableListProps>((props, {}) => {


  const slots = useSlots()


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint:{
        // distance: 5,
        delay: 100,
        tolerance: 100
      }
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
  const overlayId = ref('')
  function onDragStart(event: DragEndEvent) {
    overlayId.value = event.active?.id as any
  }



  return () => {
    return (
      <DndContext
        sensors={sensors.value}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={props.onSortEnd}
      >
        <SortableContext
          items={props.items}
          strategy={verticalListSortingStrategy}
        >
          <div class={`${prefixCls}-right-list`} role="list" aria-label="Selected list">
            {props.items.map((item, index: number) => (
              // @ts-ignore skip SortableItem type check
              <SortableItem key={item.key} index={index} id={item.id} item={item.node}/>
            ))}
          </div>
        </SortableContext>
        {/*可以不用这个*/}
        {/*<Teleport to={document.body}>*/}
        {/*  <DragOverlay*/}
        {/*    adjustScale={false}*/}
        {/*    dropAnimation={dropAnimationConfig}*/}
        {/*  >*/}
        {/*    {props.items.filter(item=>{*/}
        {/*      return item.id === overlayId.value*/}
        {/*    }).map(item=>item.node({}))}*/}
        {/*  </DragOverlay>*/}

        {/*</Teleport>*/}
      </DndContext>
    );

  }
}, {
  props: vuePropsType,
  name: 'SortableList'
})



export default SortableList

