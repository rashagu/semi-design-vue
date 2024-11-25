import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizableHandlerFoundation, ResizableHandlerAdapter } from '@douyinfe/semi-foundation/resizable/foundation';

import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import type { Direction, HandlerCallback } from '@douyinfe/semi-foundation/resizable/types';
import {
  CSSProperties,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../../PropTypes';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';


const prefixCls = cssClasses.PREFIX;

export interface ResizableHandlerProps {
  direction?: Direction;
  onResizeStart?: HandlerCallback;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties
}

export interface ResizableHandlerState {
  direction: Direction
}
const propTypes: CombineProps<ResizableHandlerProps> = {
  direction: PropTypes.string as PropType<ResizableHandlerProps['direction']>,
  onResizeStart: PropTypes.func as PropType<ResizableHandlerProps['onResizeStart']>,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps: Partial<ResizableHandlerProps> = {
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const ResizableHandler = defineComponent({
  props: { ...vuePropsType },
  name: 'ResizableHandler',
  setup(props, { attrs }) {
    const slots = useSlots();

    const state = reactive({
      direction: props.direction
    })
    const resizeHandlerRef = ref();

    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): ResizableHandlerAdapter<ResizableHandlerProps, ResizableHandlerState> {
      return {
        ...adapterInject(),
        registerEvent: () => {
          resizeHandlerRef.value.addEventListener('mousedown', foundation.onMouseDown);
        },
        unregisterEvent: () => {
          resizeHandlerRef.value.removeEventListener('mousedown', foundation.onMouseDown);
        },
      };
    }

    const adapter = adapter_()
    const foundation = new ResizableHandlerFoundation(adapter);
    onMounted(()=>{
      foundation.init();
    })
    onBeforeUnmount(()=>{
      foundation.destroy();
    })


    return () => {
      const { style, className } = props;
      return (
        <div
          class={classNames(className, prefixCls + '-resizableHandler', prefixCls + '-resizableHandler-' + props.direction)}
          style={{
            ...style
          }}
          ref={resizeHandlerRef}
        >
          { slots.default?.() }
        </div>
      );
    };
  },
});



export default ResizableHandler;
