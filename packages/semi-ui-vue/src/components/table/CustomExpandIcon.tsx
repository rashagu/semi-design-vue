/* eslint-disable react-hooks/exhaustive-deps */ import * as PropTypes from '../PropTypes';
import { noop } from 'lodash';

import { IconChevronRight, IconChevronDown, IconTreeTriangleDown, IconTreeTriangleRight } from '@kousum/semi-icons-vue';
import { cssClasses } from '@douyinfe/semi-foundation/table/constants';
import isEnterPress from '@douyinfe/semi-foundation/utils/isEnterPress';

import CSSAnimation from '../_cssAnimation';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  computed,
  defineComponent,
  h,
  isVNode,
  PropType,
  useSlots,
} from 'vue';
import { VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';

export interface CustomExpandIconProps {
  expanded?: boolean;
  componentType?: 'tree' | 'expand';
  onClick?: (nextExpand: boolean, e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  expandIcon?: ((expanded?: boolean) => VueJsxNode) | VueJsxNode;
  prefixCls?: string;
  motion?: boolean;
}

/**
 * render expand icon
 */

const propTypes: ComponentObjectPropsOptions<Required<CustomExpandIconProps>> = {
  expanded: PropTypes.bool,
  componentType: String as PropType<CustomExpandIconProps['componentType']>,
  onClick: PropTypes.func as PropType<CustomExpandIconProps['onClick']>,
  onMouseEnter: PropTypes.func as PropType<CustomExpandIconProps['onMouseEnter']>,
  onMouseLeave: PropTypes.func as PropType<CustomExpandIconProps['onMouseLeave']>,
  expandIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  prefixCls: PropTypes.string,
  motion: PropTypes.bool,
};

const defaultProps = {
  componentType: 'expand',
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  prefixCls: cssClasses.PREFIX,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const CustomExpandIcon = defineComponent({
  props: vuePropsType,
  name: 'CustomExpandIcon',
  setup(props, {}) {
    const slots = useSlots();

    const handleClick = computed(() => (e) => {
      if (typeof props.onClick === 'function') {
        props.onClick(!props.expanded, e);
      }
    });
    return () => {
      const {
        expanded,
        componentType,
        onClick = noop,
        onMouseEnter = noop,
        onMouseLeave = noop,
        expandIcon,
        prefixCls = cssClasses.PREFIX,
        motion = true,
      } = props;

      let icon;

      if (isVNode(expandIcon)) {
        icon = expandIcon;
      } else if (typeof expandIcon === 'function') {
        icon = expandIcon(expanded);
      } else if (componentType === 'tree') {
        icon = expanded && !motion ? <IconTreeTriangleDown size="small" /> : <IconTreeTriangleRight size="small" />;
      } else {
        icon = expanded && !motion ? <IconChevronDown /> : <IconChevronRight />;
      }

      if (motion) {
        const originIcon = icon;
        icon = (
          <CSSAnimation
            animationState={expanded ? 'enter' : 'leave'}
            startClassName={`${cssClasses.PREFIX}-expandedIcon-${expanded ? 'show' : 'hide'}`}
            children={({ animationClassName }) => {
              return cloneVNode(originIcon, { class: (originIcon.props?.class || '') + ' ' + animationClassName });
            }}
          ></CSSAnimation>
        );
      }

      return (
        <span
          role="button"
          aria-label="Expand this row"
          tabindex={-1}
          onClick={handleClick.value}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          class={`${prefixCls}-expand-icon`}
          onKeypress={(e) => isEnterPress(e) && handleClick.value(e as any)}
        >
          {icon}
        </span>
      );
    };
  },
});

export default CustomExpandIcon;
