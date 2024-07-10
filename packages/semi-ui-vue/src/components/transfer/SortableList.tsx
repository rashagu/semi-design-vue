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
} from '@dnd-kit-vue/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit-vue/sortable';
import { defineComponent, ref, h, Fragment, useSlots, Teleport, ComponentObjectPropsOptions } from 'vue';
import SortableItem from './SortableItem';
import { prefixCls } from '../transfer';
import { CombineProps } from '../interface';

interface SortableListProps {
  items: any;
  onSortEnd: any;
  useDragHandle: any;
  helperClass: any;
  axis?: any;
}

export const vuePropsType: CombineProps<SortableListProps> = {
  items: {
    type: Array,
    required: true
  },
  onSortEnd: {
    type: Function,
    required: true
  },
  useDragHandle: {
    type: [Boolean],
    required: true
  },
  helperClass: {
    type: String,
    required: true
  },
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
      overlayId.value = event.active?.id as any;
    }

    return () => {
      return (
        <DndContext
          sensors={sensors.value}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={props.onSortEnd}
        >
          <SortableContext items={props.items} strategy={verticalListSortingStrategy}>
            <div class={`${prefixCls}-right-list`} role="list" aria-label="Selected list">
              {props.items.map((item, index: number) => (
                // @ts-ignore skip SortableItem type check
                <SortableItem key={item.key} index={index} id={item.id} item={item.node} />
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
    };
  },
});

export default SortableList;
