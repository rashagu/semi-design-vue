
import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizeHandlerFoundation, ResizeHandlerAdapter } from '@douyinfe/semi-foundation/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import { Direction, HandlerCallback } from '@douyinfe/semi-foundation/resizable/types';
import { ResizeContext, ResizeContextProps } from './resizeContext';
import { IconHandle } from '@kousum/semi-icons-vue';
import {
  CSSProperties,
  defineComponent,
  h, onBeforeUnmount,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
} from 'vue';
import { vuePropsMake } from '../../PropTypes';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';
import { useResizeContext } from './context/Consumer';


const prefixCls = cssClasses.PREFIX;

export interface ResizeHandlerProps {
  direction?: Direction;
  onResizeStart?: HandlerCallback;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties
}

export interface ResizeHandlerState {
}
const propTypes: CombineProps<ResizeHandlerProps> = {
  direction: PropTypes.string as PropType<ResizeHandlerProps['direction']>,
  onResizeStart: PropTypes.func as PropType<ResizeHandlerProps['onResizeStart']>,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps: Partial<ResizeHandlerProps> = {
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)

const ResizeHandler = defineComponent({
  props: { ...vuePropsType },
  name: 'ResizeHandler',
  setup(props, { attrs }) {
    const slots = useSlots();
    const context = useResizeContext()

    const state = reactive({

    })
    const handlerRef = ref();

    let getHandler: () => HTMLElement = () => {
      return handlerRef.value;
    }

    let handlerIndex: number = -1;
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);

    function adapter_(): ResizeHandlerAdapter<ResizeHandlerProps, ResizeHandlerState> {
      return {
        ...adapterInject(),
        registerEvents: () => {
          handlerRef.value.addEventListener('mousedown', onMouseDown);
          handlerRef.value.addEventListener('touchstart', onTouchStart);

        },
        unregisterEvents: () => {
          handlerRef.value.removeEventListener('mousedown', onMouseDown);
          handlerRef.value.removeEventListener('touchstart', onTouchStart);
        },
      };
    }

    const adapter = adapter_()
    const foundation = new ResizeHandlerFoundation(adapter);

    onMounted(()=>{
      foundation.init();
      if (handlerIndex === -1) {
        handlerIndex = context.value.registerHandler(handlerRef);
      }
    })

    onBeforeUnmount(()=>{
      foundation.destroy();
    })
    const onMouseDown = (e: MouseEvent) => {
      const { notifyResizeStart } = context.value;
      notifyResizeStart(handlerIndex, e, 'mouse');
    }

    const onTouchStart = (e: TouchEvent) => {
      const { notifyResizeStart } = context.value;
      notifyResizeStart(handlerIndex, e.targetTouches[0], 'touch');
    }
    return () => {
      const children = slots.default?.();
      const { style, className } = props;
      const { direction } = context.value;
      return (
        <div
          class={classNames(className, prefixCls + '-handler', prefixCls + '-handler-' + direction)}
          style={style}
          ref={handlerRef}
        >
          {children ?? <IconHandle size='inherit' style={{
            rotate: context.value.direction === 'horizontal' ? '0deg' : '90deg',
          }}/>}
        </div>
      );
    };
  },
});



export default ResizeHandler;
