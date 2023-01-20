
import cls from 'classnames';
import { noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/timeline/constants';
import '@douyinfe/semi-foundation/timeline/timeline.scss';
import {CSSProperties, defineComponent, h, useSlots, VNode} from "vue";
import {VueJsxNode} from "../interface";
import {vuePropsMake} from "../PropTypes";

export interface TimelineItemProps {
    color?: string;
    children?: VNode[];
    time?: VueJsxNode;
    type?: 'default' | 'ongoing' | 'success' | 'warning' | 'error';
    dot?: VueJsxNode;
    extra?: VueJsxNode;
    position?: 'left' | 'right';
    className?: string;
    style?: CSSProperties;
    onClick?: (e:MouseEvent)=>void
}

const prefixCls = cssClasses.ITEM;

const propTypes = {
    color: PropTypes.string,
    time: PropTypes.node,
    type: PropTypes.string,
    dot: PropTypes.node,
    extra: PropTypes.node,
    position: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

const defaultProps = {
    type: 'default',
    time: '',
    onClick: noop,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const TimelineItem = defineComponent<TimelineItemProps>((props, {}) => {
    const slots = useSlots()


    return () => {
        const children = slots.default?.()
        const {
            className,
            color,
            dot,
            type,
            style,
            time,
            extra,
            onClick,
        } = props;

        const itemCls = cls(prefixCls,
          className
        );

        const dotCls = cls({
            [`${prefixCls}-head`]: true,
            [`${prefixCls}-head-custom`]: dot,
            [`${prefixCls}-head-${type}`]: type,
        });
        const dotStyle = color ? { style: { backgroundColor: color } } : null;
        return (
          <li class={itemCls} style={style} onClick={onClick}>
              <div class={`${prefixCls}-tail`} aria-hidden />
              <div
                class={dotCls}
                aria-hidden
                {...dotStyle}
              >
                  {dot}
              </div>
              <div class={`${prefixCls}-content`}>
                  {children}
                  {extra && <div class={`${prefixCls}-content-extra`}>{extra}</div>}
                  {time && <div class={`${prefixCls}-content-time`}>{time}</div>}
              </div>
          </li>
        );
    }
})

TimelineItem.props = vuePropsType
TimelineItem.name = 'TimelineItem'

export default TimelineItem
