import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, DragEndEvent, DragOverlay, defaultDropAnimationSideEffects, DropAnimation,
} from '@dnd-kit-vue/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit-vue/sortable';

import SortableItem from './SortableItem';


import {defineComponent, ref, h, Fragment, useSlots, provide, Teleport} from 'vue'

interface Demo1Props {
  name?: string
}

export const vuePropsType = {
  name: String
}
const SortableDemo1 = defineComponent<Demo1Props>((props, {}) => {

  const slots = useSlots()

  const items = ref<any[]>([]);
  for (let i = 0; i < 10; i++) {
    items.value.push(i+1)
  }

  function setItems(val: number[]) {
    items.value = val
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // distance: 5,
        delay: 100,
        tolerance: 100
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  function handleDragEnd(event: DragEndEvent) {
    // console.log(event)
    const {active, over} = event;

    if (active && over && active.id !== over?.id) {
      const oldIndex = items.value.indexOf(+active.id);
      const newIndex = items.value.indexOf(+over!.id);
      setItems(arrayMove(items.value, oldIndex, newIndex));
    }
  }


  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return () => {
    return (
      <div style={{width: '500px'}}>
        <DndContext
          sensors={sensors.value}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.value}
            strategy={verticalListSortingStrategy}
          >
            {items.value.map(id => {
              return <SortableItem key={id} id={id}/>
            })}
          </SortableContext>
          <Teleport to={document.body}>
            <DragOverlay
              adjustScale={false}
              dropAnimation={dropAnimationConfig}
            >
              <SortableItem key={'123'} id={'123'}/>
            </DragOverlay>
          </Teleport>
        </DndContext>
      </div>
    );

  }
})

SortableDemo1.props = vuePropsType
SortableDemo1.name = 'SortableDemo1'


export default SortableDemo1
