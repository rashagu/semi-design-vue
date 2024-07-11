import cls from 'classnames';
import { noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/timeline/constants';
import '@douyinfe/semi-foundation/timeline/timeline.scss';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots, VNode } from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useAttrs } from 'vue';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';

export interface TimelineItemProps {
  color?: string;
  // children?: VNode[];
  time?: VueJsxNode;
  type?: 'default' | 'ongoing' | 'success' | 'warning' | 'error';
  dot?: VueJsxNode;
  extra?: VueJsxNode;
  position?: 'left' | 'right';
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent) => void;
}

const prefixCls = cssClasses.ITEM;

const propTypes: CombineProps<TimelineItemProps> = {
  color: PropTypes.string,
  time: PropTypes.node,
  type: PropTypes.string as PropType<TimelineItemProps['type']>,
  dot: PropTypes.node,
  extra: PropTypes.node,
  position: PropTypes.string as PropType<TimelineItemProps['position']>,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func as PropType<TimelineItemProps['onClick']>,
};

const defaultProps = {
  type: 'default',
  time: '',
  onClick: noop,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const TimelineItem = defineComponent({
  props: { ...vuePropsType },
  name: 'TimelineItem',
  setup(props, {}) {
    const slots = useSlots();
    const attr = useAttrs();

    return () => {
      const children = slots.default?.();
      const { className, color, dot, type, style, time, extra, onClick, ...rest } = props;

      const itemCls = cls(prefixCls, className);

      const dotCls = cls({
        [`${prefixCls}-head`]: true,
        [`${prefixCls}-head-custom`]: dot,
        [`${prefixCls}-head-${type}`]: type,
      });
      const dotStyle = color ? { style: { backgroundColor: color } } : null;
      return (
        <li class={itemCls} style={style} onClick={onClick} {...getDataAttr({ ...rest, ...attr })}>
          <div class={`${prefixCls}-tail`} aria-hidden />
          <div class={dotCls} aria-hidden {...dotStyle}>
            {dot}
          </div>
          <div class={`${prefixCls}-content`}>
            {children}
            {extra && <div class={`${prefixCls}-content-extra`}>{extra}</div>}
            {time && <div class={`${prefixCls}-content-time`}>{time}</div>}
          </div>
        </li>
      );
    };
  },
});

export default TimelineItem;
