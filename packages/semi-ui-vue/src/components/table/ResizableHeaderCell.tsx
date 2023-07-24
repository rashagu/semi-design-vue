import { Resizable } from '@kousum/vue-resizable';
import {ComponentObjectPropsOptions, defineComponent, Fragment, h, PropType, useSlots} from "vue";
import {omit} from "lodash";

export interface ResizableHeaderCellProps {
    onResize?: ResizeFn;
    onResizeStart?: ResizeFn;
    onResizeStop?: ResizeFn;
    width?: number | string
}
export const vuePropsType: ComponentObjectPropsOptions<ResizableHeaderCellProps> = {
    onResize: Function as PropType<ResizableHeaderCellProps['onResize']>,
    onResizeStart: Function as PropType<ResizableHeaderCellProps['onResizeStart']>,
    onResizeStop: Function as PropType<ResizableHeaderCellProps['onResizeStop']>,
    width: [Number, String]
};
const ResizableHeaderCell = defineComponent<ResizableHeaderCellProps>((props, {attrs}) => {
    const slots = useSlots();

    return () => {

        const { onResize, onResizeStart, onResizeStop, width, ...restProps } = props;
        const domProps = omit(attrs, 'onResize', 'onResizeStart', 'onResizeStop', 'width')

        if (typeof width !== 'number') {
            return <th {...domProps} />;
        }

        let children = slots.default?.();

        // Fragment must be used here, otherwise there will be an error (seemingly a react-resizable@1.9.0 problem)
        children = children.map((child, index) => <Fragment key={index}>{child}</Fragment>);

        return (
          // @ts-ignore
          <Resizable
            width={width}
            height={0}
            onResize={onResize}
            onResizeStart={onResizeStart}
            onResizeStop={onResizeStop}
            draggableOpts={{ enableUserSelectHack: false }}
            children={<th {...domProps}>
                {children}
            </th>}
          >
          </Resizable>
        );
    };
}, {
    props: vuePropsType,
    name: 'ResizableHeaderCell'
});



export type ResizeFn = (e: any) => any;
export default ResizableHeaderCell;


