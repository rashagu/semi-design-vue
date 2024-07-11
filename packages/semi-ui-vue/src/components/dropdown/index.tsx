import {
  defineComponent,
  ref,
  h,
  onActivated,
  Fragment,
  StyleValue,
  CSSProperties,
  reactive,
  isVNode,
  cloneVNode,
  inject,
  provide,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';
import classnames from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/dropdown/constants';

import { useBaseComponent, useHasInProps } from '../_base/baseComponent';

import Tooltip, { type TooltipProps, type Trigger, vuePropsType as tooltipPropTypes } from '../tooltip';

import { numbers as tooltipNumbers } from '@douyinfe/semi-foundation/tooltip/constants';
import Foundation from '@douyinfe/semi-foundation/dropdown/foundation';

import DropdownMenu from './dropdownMenu';
import DropdownItem, { DropdownItemProps } from './dropdownItem';
import DropdownDivider, { DropdownDividerProps } from './dropdownDivider';
import DropdownTitle, { DropdownTitleProps } from './dropdownTitle';

import '@douyinfe/semi-foundation/dropdown/dropdown.scss';
import { noop, get } from 'lodash';
import { Motion } from '../_base/base';
import { ArrayElement } from '@douyinfe/semi-foundation/utils/type';
import { vuePropsMake } from '../PropTypes';
import { useDropdownContext } from './context/Consumer';
import { DropdownContext } from './context';
import { CombineProps } from '../interface';

const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

export type { DropdownDividerProps } from './dropdownDivider';
export type { DropdownItemProps, Type } from './dropdownItem';
export type { DropdownMenuProps } from './dropdownMenu';
export type { DropdownTitleProps } from './dropdownTitle';

export interface DropDownMenuItemItem extends DropdownItemProps {
  node: 'item';
  name?: string;
}
export interface DropDownMenuItemDivider extends DropdownDividerProps {
  node: 'divider';
}
export interface DropDownMenuItemTitle extends DropdownTitleProps {
  node: 'title';
  name?: string;
}

export type DropDownMenuItem = DropDownMenuItemItem | DropDownMenuItemDivider | DropDownMenuItemTitle;

export interface DropdownProps extends TooltipProps {
  //
  onFilter?: any;
  onFilterDropdownVisibleChange?: any;
  onSelect?: any;
  onHeaderCell?: any;
  onGroupedRow?: any;

  render?: any;
  visible?: boolean;
  position?: ArrayElement<typeof strings.POSITION_SET>;
  getPopupContainer?: () => HTMLElement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  menu?: DropDownMenuItem[];
  trigger?: Trigger;
  zIndex?: number;
  motion?: Motion;
  className?: string;
  contentClassName?: string | any[];
  style?: CSSProperties;
  onVisibleChange?: (visible: boolean) => void;
  rePosKey?: string | number;
  showTick?: boolean;
  prefixCls?: string;
  spacing?: number;

  closeOnEsc?: TooltipProps['closeOnEsc'];
  onEscKeyDown?: TooltipProps['onEscKeyDown'];

  name?: string;
}

interface DropdownState {
  popVisible: boolean;
}
const propTypes: CombineProps<DropdownProps> = {
  ...tooltipPropTypes,
  onFilter: PropTypes.func,
  onFilterDropdownVisibleChange: PropTypes.func,
  onSelect: PropTypes.func,
  onHeaderCell: PropTypes.func,
  onGroupedRow: PropTypes.func,

  render: [PropTypes.node, PropTypes.func, PropTypes.object] as PropType<DropdownProps['render']>,
  visible: PropTypes.bool,
  position: PropTypes.string as PropType<DropdownProps['position']>,
  getPopupContainer: PropTypes.func as PropType<DropdownProps['getPopupContainer']>,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  trigger: PropTypes.string as PropType<DropdownProps['trigger']>,
  zIndex: PropTypes.number,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
  contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
  onVisibleChange: PropTypes.func as PropType<DropdownProps['onVisibleChange']>,
  rePosKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showTick: PropTypes.bool,
  prefixCls: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  menu: PropTypes.array,
  name: String,
};
export const DropdownVuePropsType = propTypes;
const defaultProps = {
  onVisibleChange: noop,
  prefixCls: cssClasses.PREFIX,
  zIndex: tooltipNumbers.DEFAULT_Z_INDEX,
  motion: true,
  trigger: 'hover',
  position: 'bottom',
  mouseLeaveDelay: strings.DEFAULT_LEAVE_DELAY,
  showTick: false,
  closeOnEsc: true,
  onEscKeyDown: noop,
};

export const vuePropsType = vuePropsMake<DropdownProps>(propTypes, defaultProps);

const Dropdown = defineComponent({
  props: { ...vuePropsType },
  name: 'Dropdown',
  setup(props, { slots, expose }) {
    const { getProps } = useHasInProps();
    const state = reactive({
      popVisible: props.visible,
    });
    const tooltipRef = ref();
    const { adapter: adapterInject } = useBaseComponent<TooltipProps>(props, state);

    const adapterFunc = function () {
      return {
        ...adapterInject(),
        setPopVisible: (popVisible: boolean) => (state.popVisible = popVisible),
        notifyVisibleChange: (visible: boolean) => props.onVisibleChange(visible),
        getPopupId: () => tooltipRef.value.getPopupId(),
      };
    };
    const adapter = adapterFunc();
    const foundation = new Foundation(adapter);

    const handleVisibleChange = (visible: boolean) => {
      foundation.handleVisibleChange(visible);
    };

    const { context } = useDropdownContext();
    const { level = 0 } = context.value;

    function renderContent() {
      const { render, menu, contentClassName, style, showTick, prefixCls, trigger } = props;
      const className = classnames(prefixCls, contentClassName);
      const contextValue = { showTick, level: level + 1, trigger };
      let content: any = null;
      if (isVNode(render)) {
        content = render;
      } else if (Array.isArray(menu)) {
        content = renderMenu();
      }
      return (
        <DropdownContext.Provider value={contextValue}>
          <div class={className} style={style}>
            <div class={`${prefixCls}-content`} x-semi-prop="render">
              {content}
            </div>
          </div>
        </DropdownContext.Provider>
      );
    }

    function renderMenu() {
      const { menu } = props;
      const content = menu.map((m, index) => {
        switch (m.node) {
          case 'title': {
            const { name, node, ...rest } = m;
            return (
              <DropdownTitle {...rest} key={node + name + index}>
                {{
                  default: () => name,
                }}
              </DropdownTitle>
            );
          }

          case 'item': {
            const { node, name, ...rest } = m;
            return (
              <DropdownItem {...rest} key={node + name + index}>
                {{
                  default: () => name,
                }}
              </DropdownItem>
            );
          }

          case 'divider': {
            return <DropdownDivider key={m.node + index} />;
          }

          default:
            return null;
        }
      });
      return <DropdownMenu>{{ default: () => content }}</DropdownMenu>;
    }

    function renderPopCard() {
      const { render, contentClassName, style, showTick, prefixCls } = props;
      const className = classnames(prefixCls, contentClassName);
      const { level = 0 } = context.value;
      const contextValue = { showTick, level: level + 1 };
      return (
        <DropdownContext.Provider value={contextValue}>
          <div class={className} style={style}>
            <div class={`${prefixCls}-content`}>{render}</div>
          </div>
        </DropdownContext.Provider>
      );
    }

    expose({
      renderPopCard,
    });

    return () => {
      const {
        position,
        trigger,
        onVisibleChange,
        zIndex,
        className,
        motion,
        style,
        prefixCls,

        render,
        menu,
        showTick,
        //
        onFilter,
        onFilterDropdownVisibleChange,
        onSelect,
        onHeaderCell,
        onGroupedRow,
        name,
        contentClassName,
        ...attr
      } = getProps(props);
      let { spacing } = props;
      const { level } = context.value;
      const { popVisible } = state;
      const pop = renderContent();

      if (level > 0) {
        spacing = typeof spacing === 'number' ? spacing : numbers.NESTED_SPACING;
      } else if (spacing === null || typeof spacing === 'undefined') {
        spacing = numbers.SPACING;
      }

      let children: any = slots.default ? slots.default()[0] : null;

      return (
        <Tooltip
          zIndex={zIndex}
          motion={motion}
          content={pop}
          className={className}
          prefixCls={prefixCls}
          spacing={spacing}
          position={position}
          trigger={trigger}
          onVisibleChange={handleVisibleChange}
          showArrow={false}
          returnFocusOnClose={true}
          ref={tooltipRef}
          {...attr}
        >
          {cloneVNode(children, {
            className: classnames(get(children, 'props.class'), {
              [`${prefixCls}-showing`]: popVisible,
            }),
            'aria-haspopup': true,
            'aria-expanded': popVisible,
            onKeyDown: (e: KeyboardEvent) => {
              foundation.handleKeyDown(e);
              const childrenKeyDown: (e: KeyboardEvent) => void = get(children, 'props.onKeyDown');
              childrenKeyDown && childrenKeyDown(e);
            },
          })}
        </Tooltip>
      );
    };
  },
});
export type DropdownType = typeof Dropdown & {
  Menu: typeof DropdownMenu,
  Item: typeof DropdownItem,
  Divider: typeof DropdownDivider,
  Title: typeof DropdownTitle,
}
const BaseDropdown =  Dropdown as DropdownType
BaseDropdown.Menu = DropdownMenu
BaseDropdown.Item = DropdownItem
BaseDropdown.Divider = DropdownDivider
BaseDropdown.Title = DropdownTitle
export { DropdownMenu, DropdownItem, DropdownDivider, DropdownTitle, Dropdown };
export default BaseDropdown;
