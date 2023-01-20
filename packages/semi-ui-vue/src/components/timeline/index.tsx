
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import '@douyinfe/semi-foundation/timeline/timeline.scss';
import { cssClasses, strings } from '@douyinfe/semi-foundation/timeline/constants';
import ConfigContext from '../configProvider/context';
import Item, { TimelineItemProps } from './item';
import {cloneVNode, CSSProperties, defineComponent, h, isVNode, useSlots, VNode} from "vue";
import {vuePropsMake} from "../PropTypes";
import {AriaAttributes} from "../AriaAttributes";
import {VueJsxNode} from "../interface";

export type { TimelineItemProps } from './item';

export interface Data extends TimelineItemProps {
    content: VueJsxNode
}

export interface TimelineProps extends Pick<AriaAttributes, 'aria-label'> {
    mode?: 'left' | 'right' | 'center' | 'alternate';
    className?: string;
    style?: CSSProperties;
    dataSource?: Data[];
}

const prefixCls = cssClasses.PREFIX;

const propTypes = {
    mode: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    dataSource: PropTypes.array,
    'aria-label': PropTypes.string,
};
const defaultProps = {
    mode: 'left',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Timeline = defineComponent<TimelineProps>((props, {}) => {
    const slots = useSlots()

    const getPosCls = (ele: VNode, idx: number) => {
        const { mode } = props;
        if (mode === 'alternate') {
            if (ele.props.position) {
                return `${prefixCls}-item-${ele.props.position}`;
            }
            return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
        }
        if (mode === 'center') {
            if (ele.props.position) {
                return `${prefixCls}-item-${ele.props.position}`;
            }
            return `${prefixCls}-item-left`;
        }
        if (mode === 'left' || mode === 'right') {
            return `${prefixCls}-item-${mode}`;
        }
        if (ele.props.position) {
            return `${prefixCls}-item-${ele.props.position}`;
        }
        return '';
    };

    const addClassName = (items: VNode[]) => items.map((ele, idx) => {
        if (isVNode(ele)) {
            return cloneVNode(ele, {
                // @ts-ignore
                className: cls(
                  ele.props.class,
                  getPosCls(ele, idx)
                ),
            });
        }
        return ele;
    });


    return () => {
        const children = slots.default?.()
        const { className, style, mode, dataSource } = props;
        const classString = cls(
          prefixCls,
          className,
          { [`${prefixCls}-${mode}`]: mode }
        );
        let childrenList;
        if (dataSource && dataSource.length) {
            const items = dataSource.map(
              (item, index) => <Item key={`timeline-item-${index}`} {...item}>{item.content}</Item>
            );
            childrenList = addClassName(items);
        }
        const items = childrenList || addClassName(children);

        return (
          <ul aria-label={props['aria-label']} style={style} class={classString}>
              {items}
          </ul>
        );
    }
})

Timeline.props = vuePropsType
Timeline.name = 'Timeline'

export default Timeline
export {
    Item as TimelineItem
}
