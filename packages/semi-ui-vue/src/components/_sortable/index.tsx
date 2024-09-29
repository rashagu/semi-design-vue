import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { isNull } from 'lodash';
import { computed, defineComponent, h, PropType, ref, shallowRef, useSlots, VNode, watch } from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { UniqueIdentifier } from '@dnd-kit/abstract';
import { DragDropProvider, type Events } from '@kousum/dnd-kit-vue';
import { useSortable } from '@kousum/dnd-kit-vue/sortable';
import { type CollisionDetector, pointerIntersection } from '@dnd-kit/collision';

const defaultPrefix = 'semi-sortable';

interface OnSortEndProps {
    oldIndex: number;
    newIndex: number
}
export type OnSortEnd = (event: Parameters<Events['dragend']>[0]) => void;

export interface RenderItemProps {
    id?: string | number;
    sortableHandle?: any;
    [x: string]: any
}
export interface SortableProps {
    collisionDetector?: CollisionDetector
    onSortEnd?: OnSortEnd;
    // Set drag and drop trigger conditions
    modifiers?: any[];
    // the dragged items，The content in items cannot be the number 0
    items?: any[];
    // Function that renders the item that is allowed to be dragged
    renderItem?: (props: RenderItemProps) => VueJsxNode;
    // Whether to use a separate drag layer for items that move with the mouse
    useDragOverlay?: boolean;
    // A container for all elements that are allowed to be dragged
    container?: any;
    // Whether to change the size of the item being dragged
    adjustScale?: boolean;
    // prefix
    prefix?: string;
    // The className of the item that moves with the mouse during the drag
    dragOverlayCls?: string
}

interface SortableItemProps {
    collisionDetector?: CollisionDetector
    id: UniqueIdentifier;
    index: number;
    useDragOverlay?: boolean;
    renderItem?: (props: RenderItemProps) => VueJsxNode;
    prefix?: string;
    // The className of the item that moves with the mouse during the drag
    dragOverlayCls?: string
}

function DefaultContainer(props) {
    return <div style={{ overflow: 'auto' }} {...props}></div>;
}


export const propTypesSortable: CombineProps<SortableProps> = {
    collisionDetector: PropTypes.func as PropType<SortableItemProps['collisionDetector']>,
    onSortEnd: PropTypes.func as PropType<SortableProps['onSortEnd']>,
    // Set drag and drop trigger conditions
    modifiers: PropTypes.array as PropType<SortableProps['modifiers']>,
    // the dragged items，The content in items cannot be the number 0
    items: PropTypes.array,
    // Function that renders the item that is allowed to be dragged
    renderItem: PropTypes.func as PropType<SortableProps['renderItem']>,
    // Whether to use a separate drag layer for items that move with the mouse
    useDragOverlay: PropTypes.bool,
    // A container for all elements that are allowed to be dragged
    container: PropTypes.any as PropType<SortableProps['container']>,
    // Whether to change the size of the item being dragged
    adjustScale: PropTypes.bool,
    // prefix
    prefix: PropTypes.string,
    // The className of the item that moves with the mouse during the drag
    dragOverlayCls: PropTypes.string,
};
const defaultPropsSortable = {
    useDragOverlay: true,
    container: DefaultContainer,
}

const vuePropsTypeSortable = vuePropsMake(propTypesSortable, defaultPropsSortable)

const Sortable = defineComponent({
    props: { ...vuePropsTypeSortable },
    name: 'Sortable',
    setup(props, { attrs }) {
        const slots = useSlots();

        const activeId = ref<UniqueIdentifier | null>(null);
        function setActiveId(v: UniqueIdentifier | null) {
            activeId.value = v
        }
        // const sensors = useSensors(
        //   useSensor(MouseSensor),
        //   useSensor(TouchSensor),
        //   useSensor(KeyboardSensor, defaultKeyBoardOptions)
        // );
        const getIndex = (id: UniqueIdentifier) => props.items.indexOf(id)
        const activeIndex = computed(() => activeId ? getIndex(activeId.value) : -1)

        const onDragStart = (event: Parameters<Events['dragstart']>[0]) => {
            const { source } = event.operation
            if (!source) { return; }
            setActiveId(source.id);
        }

        const onDragEnd = (event: Parameters<Events['dragend']>[0]) => {
            setActiveId(null);
            const { target } = event.operation
            if (target) {
                const overIndex = getIndex(target.id);
                if (activeIndex.value !== overIndex) {
                    props.onSortEnd(event);
                }
            }
        }

        const onDragCancel = () => {
            setActiveId(null);
        }


        return () => {
            const Container = props.container
            return (
              <DragDropProvider
                modifiers={props.modifiers}
                onDragStart={onDragStart}
                onDragOver={(event)=>{
                    // console.log('end', event.operation.source.id, event.operation.target.id,);
                    onDragEnd(event as any)
                }}
                onDragEnd={(event)=>{
                    // console.log('end', event.operation.source.id, event.operation.target.id,);
                }}
              >
                  <Container>
                      {props.items.map((value, index) => (
                        <SortableItem
                          key={value}
                          id={value}
                          index={index}
                          renderItem={props.renderItem}
                          useDragOverlay={props.useDragOverlay}
                          prefix={props.prefix}
                          collisionDetector={props.collisionDetector}
                          dragOverlayCls={props.dragOverlayCls}
                        />
                      ))}
                  </Container>
              </DragDropProvider>
            );
        };
    },
});



export const vuePropsType: CombineProps<SortableItemProps> = {
    collisionDetector: PropTypes.func as PropType<SortableItemProps['collisionDetector']>,
    id: {
        type: [PropTypes.number, PropTypes.string],
        required: true
    },
    index: {
        type: PropTypes.number,
        required: true
    },
    useDragOverlay: PropTypes.bool,
    renderItem: PropTypes.func as PropType<SortableItemProps['renderItem']>,
    prefix: PropTypes.string,
    // The className of the item that moves with the mouse during the drag
    dragOverlayCls: PropTypes.string,
};


const SortableItem = defineComponent({
    props: { ...vuePropsType },
    name: 'SortableItem',
    setup(props, { attrs }) {
        const slots = useSlots();
        const element = ref<Element | null>(null);
        const handleRef = ref<HTMLButtonElement | null>(null);
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
        const {isDragSource, isDropTarget} = useSortable({
            id: id as any,
            index: index as any,
            element,
            handle: handleRef,
            collisionDetector: props.collisionDetector
        });

        const sortableHandle = (WrapperComponent: any) => {
            // console.log('listeners', listeners);
            // 保证给出的接口的一致性，使用 span 包一层，保证用户能够通过同样的方式使用 handler
            // To ensure the consistency of the given interface
            // use a span package layer to ensure that users can use the handler in the same way
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            return () => <span ref={handleRef} style={{ lineHeight: 0 }} ><WrapperComponent /></span>;
        };


        return () => {
            const itemCls = cls(
              `${props.prefix}-sortable-item`,
              {
                  // [`${props.prefix}-sortable-item-over`]: isDropTarget?.value,
                  // [`${props.prefix}-sortable-item-active`]: isDragSource?.value,
                  [props.dragOverlayCls]: isDragSource?.value,
              }
            );

            return <div
              ref={element}
              class={itemCls}
            >
                {props.renderItem({ id: props.id, sortableHandle })}
            </div>;
        };
    },
});

export {
    Sortable,
    SortableItem
}
