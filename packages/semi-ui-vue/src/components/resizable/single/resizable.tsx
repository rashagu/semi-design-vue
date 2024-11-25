
import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { ResizableFoundation, ResizableAdapter } from '@douyinfe/semi-foundation/resizable/foundation';

import { cssClasses, } from '@douyinfe/semi-foundation/resizable/constants';
import type { Direction, Size, Enable, ResizeStartCallback, ResizeCallback, HandleClassName } from '@douyinfe/semi-foundation/resizable/types';
import  {directions } from '@douyinfe/semi-foundation/resizable/types';

import ResizableHandler from './resizableHandler';
import '@douyinfe/semi-foundation/resizable/resizable.scss';
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
  VNode, watch,
} from 'vue';
import { vuePropsMake } from '../../PropTypes';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';

const prefixCls = cssClasses.PREFIX;
export interface HandleComponent {
  top?: VNode;
  right?: VNode;
  bottom?: VNode;
  left?: VNode;
  topRight?: VNode;
  bottomRight?: VNode;
  bottomLeft?: VNode;
  topLeft?: VNode
}

export interface HandleStyle {
  top?: CSSProperties;
  right?: CSSProperties;
  bottom?: CSSProperties;
  left?: CSSProperties;
  topRight?: CSSProperties;
  bottomRight?: CSSProperties;
  bottomLeft?: CSSProperties;
  topLeft?: CSSProperties
}

export interface ResizableProps {
  style?: CSSProperties;
  className?: string;
  grid?: [number, number];
  snap?: {
    x?: number[];
    y?: number[]
  };
  snapGap?: number;
  bounds?: any;
  boundElement?: 'parent' | 'window' | HTMLElement;
  boundsByDirection?: boolean;
  size?: Size;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  lockAspectRatio?: boolean | number;
  lockAspectRatioExtraWidth?: number;
  lockAspectRatioExtraHeight?: number;
  enable?: Enable | false;
  handleStyle?: HandleStyle;
  handleClass?: HandleClassName;
  handleWrapperStyle?: CSSProperties;
  handleWrapperClass?: string;
  handleNode?: HandleComponent;
  onResizeStart?: ResizeStartCallback;
  onChange?: ResizeCallback;
  onResizeEnd?: ResizeCallback;
  defaultSize?: Size;
  scale?: number;
  ratio?: number | [number, number]
}

export interface ResizableState {
  isResizing: boolean;
  direction: Direction;
  original: {
    x: number;
    y: number;
    width: number;
    height: number
  };
  width: number | string;
  height: number | string;

  backgroundStyle: CSSProperties;
  flexBasis?: string | number
}

const propTypes: CombineProps<ResizableProps> = {
  style: PropTypes.object,
  className: PropTypes.string,
  //@ts-ignore
  grid: PropTypes.array as PropType<ResizableProps['grid']>,
  snap: PropTypes.object,
  snapGap: PropTypes.number,
  bounds: PropTypes.node as PropType<ResizableProps['bounds']>,
  boundElement: PropTypes.node as PropType<ResizableProps['boundElement']>,
  boundsByDirection: PropTypes.bool,
  size: PropTypes.object,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lockAspectRatio: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  lockAspectRatioExtraWidth: PropTypes.number,
  lockAspectRatioExtraHeight: PropTypes.number,
  enable: PropTypes.object,
  handleStyle: PropTypes.object,
  handleClass: PropTypes.object,
  handleWrapperStyle: PropTypes.object,
  handleWrapperClass: PropTypes.string,
  handleNode: PropTypes.object,
  onResizeStart: PropTypes.func as PropType<ResizableProps['onResizeStart']>,
  onChange: PropTypes.func as PropType<ResizableProps['onChange']>,
  onResizeEnd: PropTypes.func as PropType<ResizableProps['onResizeEnd']>,
  defaultSize: PropTypes.object,
  scale: PropTypes.number,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};

const defaultProps: Partial<ResizableProps> = {
  onResizeStart: () => {},
  onChange: () => {},
  onResizeEnd: () => {},
  enable: {
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true,
  },
  style: {},
  grid: [1, 1],
  lockAspectRatio: false,
  lockAspectRatioExtraWidth: 0,
  lockAspectRatioExtraHeight: 0,
  scale: 1,
  ratio: 1,
  snapGap: 0,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)

const Resizable = defineComponent({
  props: { ...vuePropsType },
  name: 'Resizable',
  setup(props, { attrs }) {
    const slots = useSlots();

    const resizableRef = ref()
    const state = reactive<ResizableState>({
      isResizing: false,
      width: 'auto',
      height: 'auto',
      direction: 'right',
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      backgroundStyle: {
        cursor: 'auto',
      },
      flexBasis: undefined,
    });
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): ResizableAdapter<ResizableProps, ResizableState> {
      return {
        ...adapterInject(),
        getResizable: getResizable,
        registerEvent: () => {
          let window = foundation.window;
          window?.addEventListener('mouseup', foundation.onMouseUp);
          window?.addEventListener('mousemove', foundation.onMouseMove);
          window?.addEventListener('mouseleave', foundation.onMouseUp);
        },
        unregisterEvent: () => {
          let window = foundation.window;
          window?.removeEventListener('mouseup', foundation.onMouseUp);
          window?.removeEventListener('mousemove', foundation.onMouseMove);
          window?.removeEventListener('mouseleave', foundation.onMouseUp);
        },
      };
    }
    const adapter = adapter_()
    const foundation = new ResizableFoundation(adapter);
    state.width = foundation.propSize.width ?? 'auto'
    state.height = foundation.propSize.height ?? 'auto'

    onMounted(()=>{
      foundation.init();
    })

    onBeforeUnmount(()=>{
      foundation.destroy();
    })

    function getResizable (){
      return resizableRef?.value;
    }

    const renderResizeHandler = () => {
      const { enable, handleStyle, handleClass, handleNode, handleWrapperStyle, handleWrapperClass } = props;
      if (!enable) {
        return null;
      }
      const handlers = directions.map(dir => {
        if (enable[dir as Direction] !== false) {
          return (
            <ResizableHandler
              key={dir}
              direction={dir as Direction}
              onResizeStart={foundation.onResizeStart}
              style={handleStyle && handleStyle[dir]}
              className={handleClass && handleClass[dir]}
            >
              {handleNode?.[dir] ?? null}
            </ResizableHandler>
          );
        }
        return null;
      });

      return (
        <div class={handleWrapperClass} style={handleWrapperStyle}>
          {handlers}
        </div>
      );
    }


    return () => {
      const children = slots.default?.()
      const { className, style, maxHeight, maxWidth, minHeight, minWidth } = props;
      const resizeStyle: CSSProperties = {
        userSelect: state.isResizing ? 'none' : 'auto',
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        minWidth: minWidth,
        minHeight: minHeight,
        ...style,
        // Vue 保持响应
        width: state.width,
        height: state.height,
        ...foundation.sizeStyle,
      };

      if (state?.flexBasis) {
        style.flexBasis = state.flexBasis;
      }

      return (
        <div
          style={resizeStyle}
          class={classNames(className, prefixCls + '-resizable')}
          ref={resizableRef}
          {...getDataAttr()}
        >
          {state.isResizing && <div style={state.backgroundStyle} class={classNames(className, prefixCls + '-background')}/>}
          {children}
          {renderResizeHandler()}
        </div>
      );
    };
  },
});



export default Resizable;
