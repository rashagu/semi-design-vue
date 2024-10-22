import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizeItemFoundation, ResizeItemAdapter } from '@douyinfe/semi-foundation/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/resizable/constants';
import { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/resizable/singleConstants';
import { ResizeContext, ResizeContextProps } from './resizeContext';
import { noop } from 'lodash';
import { CSSProperties, defineComponent, h, onMounted, onUnmounted, PropType, reactive, ref, useSlots } from 'vue';
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
    let itemIndex: number;
    onMounted(() => {
      foundation.init();
      const { min, max, onResizeStart, onChange, onResizeEnd, defaultSize } = props;
      itemIndex = context.value.registerItem(itemRef, min, max, defaultSize, onResizeStart, onChange, onResizeEnd);
    });

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
