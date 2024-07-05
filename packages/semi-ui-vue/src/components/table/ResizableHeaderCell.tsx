import { Resizable } from '@kousum/vue-resizable';
import { ComponentObjectPropsOptions, defineComponent, Fragment, h, PropType, useSlots } from 'vue';
import { omit } from 'lodash';

export interface ResizableHeaderCellProps {
  onResize?: ResizeFn;
  onResizeStart?: ResizeFn;
  onResizeStop?: ResizeFn;
  width?: number | string;
  /** For compatibility with previous versions, the default value is true. If you don't want to resize, set it to false */
  resize?: boolean;
}
export const vuePropsType: ComponentObjectPropsOptions<ResizableHeaderCellProps> = {
  onResize: Function as PropType<ResizableHeaderCellProps['onResize']>,
  onResizeStart: Function as PropType<ResizableHeaderCellProps['onResizeStart']>,
  onResizeStop: Function as PropType<ResizableHeaderCellProps['onResizeStop']>,
  width: [Number, String],
};
const ResizableHeaderCell = defineComponent({
  props: vuePropsType,
  name: 'ResizableHeaderCell',
  setup(props, { attrs }) {
    const slots = useSlots();

    return () => {
      const { onResize, onResizeStart, onResizeStop, width, resize, ...restProps } = props;

      const domProps = omit(attrs, 'onResize', 'onResizeStart', 'onResizeStop', 'width');

      if (typeof width !== 'number' || resize === false) {
        return <th {...domProps} />;
      }

      let children = slots.default?.();

      // Fragment must be used here, otherwise there will be an error (seemingly a react-resizable@1.9.0 problem)
      children = children.map((child, index) => <Fragment key={index}>{child}</Fragment>);

      return (
        // @ts-ignore
        <Resizable
          width={width as number}
          height={0}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          draggableOpts={{ enableUserSelectHack: false }}
          children={<th {...domProps}>{children}</th>}
          axis="x"
        ></Resizable>
      );
    };
  },
});

export type ResizeFn = (e: any) => any;
export default ResizableHeaderCell;
