import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizeItemFoundation, ResizeItemAdapter } from '@douyinfe/semi-foundation/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/resizable/types';
import { noop } from 'lodash';
import {
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';
import { CombineProps } from '../../interface';
import { vuePropsMake } from '../../PropTypes';
import { useResizeContext } from './context/Consumer';
import { useBaseComponent } from '../../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;

export interface ResizeItemProps {
  style?: CSSProperties;
  className?: string;
  min?: string;
  max?: string;
  onResizeStart?: ResizeStartCallback;
  onChange?: ResizeCallback;
  onResizeEnd?: ResizeCallback;
  defaultSize?: string | number;
}

export interface ResizeItemState {}
const propTypes: CombineProps<ResizeItemProps> = {
  style: PropTypes.object,
  className: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onResizeStart: PropTypes.func as PropType<ResizeItemProps['onResizeStart']>,
  onChange: PropTypes.func as PropType<ResizeItemProps['onChange']>,
  onResizeEnd: PropTypes.func as PropType<ResizeItemProps['onResizeEnd']>,
  defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps: Partial<ResizeItemProps> = {
  onResizeStart: noop,
  onChange: noop,
  onResizeEnd: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);

const ResizeItem = defineComponent({
  props: { ...vuePropsType },
  name: 'ResizeItem',
  setup(props, { attrs }) {
    const slots = useSlots();
    const itemRef = ref();
    const state = reactive({
      isResizing: false,
    });
    const context = useResizeContext();
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): ResizeItemAdapter<ResizeItemProps, ResizeItemState> {
      return {
        ...adapterInject(),
      };
    }
    const adapter = adapter_();
    const foundation = new ResizeItemFoundation(adapter);
    let itemIndex: number = -1;
    let direction: 'horizontal' | 'vertical';
    onMounted(() => {
      foundation.init();
      const { min, max, onResizeStart, onChange, onResizeEnd, defaultSize } = props;

      if (itemIndex === -1) {
        // 开发过程在StrictMode下context方法会执行两次，需要判断一下是否已经注册过
        itemIndex = context.value.registerItem(itemRef, min, max, defaultSize, onResizeStart, onChange, onResizeEnd);
      }
      direction = context.value.direction; // 留一个direction的引用，方便在componentDidUpdate中判断方向是否有变化
    });
    watch([
      ()=>context.value.direction,
    ], ()=>{
      // 支持动态方向，修改item的style
      if (context.value.direction !== direction) {
        direction = context.value.direction;
        if (direction === 'horizontal') {
          const newWidth = itemRef.value?.style.height;
          itemRef.value.style.width = newWidth;
          itemRef.value.style.removeProperty('height');
        } else {
          const newHeight = itemRef.value?.style.width;
          itemRef.value.style.height = newHeight;
          itemRef.value.style.removeProperty('width');
        }
      }
    })

    onUnmounted(() => {
      foundation.destroy();
    });

    return () => {
      const style: CSSProperties = {
        ...props.style,
      };

      return (
        <div style={style} class={classNames(props.className, prefixCls + '-item')} ref={itemRef}>
          {slots.default?.()}
        </div>
      );
    };
  },
});

export default ResizeItem;
