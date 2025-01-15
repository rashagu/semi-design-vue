import DragMoveFoundation, { DragMoveAdapter } from '@douyinfe/semi-foundation/dragMove/foundation';
import * as PropTypes from '../PropTypes';
import {
  cloneVNode, CSSProperties,
  defineComponent,
  h, isRef, onBeforeUnmount,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  shallowRef,
  useSlots,
  VNode,
} from 'vue';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { setRefJsx } from '../_utils/setRefJsx';
import warning from '@douyinfe/semi-foundation/utils/warning';

export interface DragMoveProps {
  style?: CSSProperties;
  className?: string;
  // The element that triggers the drag event，default is element
  handler?: () => VNode;
  allowInputDrag?: boolean;
  // The element that constrains the movement range, This element requires relative positioning
  constrainer?: () => VNode | 'parent';
  constrainNode?: any;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTouchCancel?: (e: TouchEvent) => void;
  // Determine whether dragging is triggered when the mouse is pressed.
  // Return true to trigger dragging. Return false to not trigger dragging.
  allowMove?: (e: MouseEvent | TouchEvent, element: HTMLElement) => boolean;
  // customize move behavior
  customMove?: (e: HTMLElement, top: number, left: number) => void
}



const propTypes: CombineProps<DragMoveProps> = {
  style: Object,
  className: String,
  constrainer: PropTypes.func as PropType<DragMoveProps['constrainer']>,
  allowMove: PropTypes.func as PropType<DragMoveProps['allowMove']>,
  customMove: PropTypes.func as PropType<DragMoveProps['customMove']>,
  handler: PropTypes.func as PropType<DragMoveProps['handler']>,
  allowInputDrag: PropTypes.bool,
  constrainNode: PropTypes.func as PropType<DragMoveProps['constrainNode']>,
  onMouseDown: PropTypes.func as PropType<DragMoveProps['onMouseDown']>,
  onMouseMove: PropTypes.func as PropType<DragMoveProps['onMouseMove']>,
  onMouseUp: PropTypes.func as PropType<DragMoveProps['onMouseUp']>,
  onTouchStart: PropTypes.func as PropType<DragMoveProps['onTouchStart']>,
  onTouchMove: PropTypes.func as PropType<DragMoveProps['onTouchMove']>,
  onTouchEnd: PropTypes.func as PropType<DragMoveProps['onTouchEnd']>,
  onTouchCancel: PropTypes.func as PropType<DragMoveProps['onTouchCancel']>,
}


const defaultProps = {
  allowInputDrag: false,
}
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const DragMove = defineComponent({
  props: { ...vuePropsType },
  name: 'DragMove',
  setup(props, { attrs }) {
    const slots = useSlots();
    const elementRef = shallowRef()

    const state = reactive({})
    const { adapter: adapterInject } = useBaseComponent(props, state)

    function adapter_(): DragMoveAdapter<DragMoveProps, null> {
      return {
        ...adapterInject(),
        getDragElement: () => {
          let elementDom = elementRef.value;
          return elementDom as HTMLElement;
        },
        getConstrainer: () => {
          const { constrainer } = props;
          if (typeof constrainer === 'string' && constrainer === 'parent') {
            return (elementRef.value as HTMLElement)?.parentNode as HTMLElement;
          } else if (typeof constrainer === 'function') {
            return constrainer() as any;
          } else {
            return null;
          }
        },
        getHandler: () => {
          const { handler } = props;
          if (typeof handler === 'function') {
            return handler() as any;
          } else {
            return adapter.getDragElement() as HTMLElement;
          }
        },
        notifyMouseDown: (e: MouseEvent) => {
          props.onMouseDown && props.onMouseDown(e);
        },
        notifyMouseMove: (e: MouseEvent) => {
          props.onMouseMove && props.onMouseMove(e);
        },
        notifyMouseUp: (e: MouseEvent) => {
          props.onMouseUp && props.onMouseUp(e);
        },
        notifyTouchStart: (e: TouchEvent) => {
          props.onTouchStart && props.onTouchStart(e);
        },
        notifyTouchMove: (e: TouchEvent) => {
          props.onTouchMove && props.onTouchMove(e);
        },
        notifyTouchEnd: (e: TouchEvent) => {
          props.onTouchEnd && props.onTouchEnd(e);
        },
        notifyTouchCancel: (e: TouchEvent) => {
          props.onTouchCancel && props.onTouchCancel(e);
        },
      };
    }
    const adapter = adapter_()
    const foundation = new DragMoveFoundation(adapter);


    onMounted(()=>{
      foundation.init();
    })

    onBeforeUnmount(()=>{
      foundation.destroy();
    })

    return () => {
      const child = slots.default?.()
      warning(child.length > 1, '应当只能有一个 children')
      const children = child?.[0]
      const newChildren = cloneVNode(children, {
        ref: (node) => {
          elementRef.value = node;
          // Call the original ref, if any
          const { ref } = children as any;
          setRefJsx(ref, node)
        },
      });
      return newChildren;
    };
  },
});

export default DragMove
