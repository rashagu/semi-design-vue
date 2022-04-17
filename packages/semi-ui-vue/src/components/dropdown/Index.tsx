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
  cloneVNode, inject, provide
} from 'vue'
import classnames from 'classnames';

import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/dropdown/constants';

import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';


import Tooltip, { TooltipProps, Trigger } from '../tooltip/Index';

import { numbers as tooltipNumbers } from '@douyinfe/semi-foundation/tooltip/constants';
import Foundation from '@douyinfe/semi-foundation/dropdown/foundation';

import DropdownMenu from './DropdownMenu';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import DropdownDivider, { DropdownDividerProps } from './DropdownDivider';
import DropdownTitle, { DropdownTitleProps } from './DropdownTitle';

import '@douyinfe/semi-foundation/dropdown/dropdown.scss';
import { noop, get } from 'lodash';
import { Motion } from '../_base/base';
import {ArrayElement} from "@douyinfe/semi-foundation/utils/type";

const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

export interface DropDownMenuItemBasic {
  node: 'title' | 'item' | 'divider';
  name?: string;
}

export type DropDownMenuItem = DropDownMenuItemBasic & DropdownItemProps & DropdownDividerProps & DropdownTitleProps;

export interface DropdownProps extends TooltipProps {
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
  prefixCls?: string,
  spacing?: number;
}

interface DropdownState {
  popVisible: boolean;
}

export const vuePropsType = {
  name: String,
  render: [Object,],
  visible: Boolean,
  position: {
    type: String,
    default: 'bottom',
  },
  getPopupContainer: Function,
  mouseEnterDelay: Number,
  mouseLeaveDelay: {
    type: Number,
    default: strings.DEFAULT_LEAVE_DELAY,
  },
  menu: Array,
  trigger: {
    type:String,
    default: 'hover',
  },
  zIndex: {
    type:Number,
    default: tooltipNumbers.DEFAULT_Z_INDEX,
  },
  motion: {
    type: [Object, Boolean],
    default: true,
  },
  className: String,
  contentClassName: [String, Array],
  style: [Object, String],
  onVisibleChange: {
    type: Function,
    default: noop,
  },
  rePosKey: [String, Number, Boolean],
  showTick: {
    type: Boolean,
    default: false,
  },
  prefixCls: {
    type:String,
    default: cssClasses.PREFIX,
  },
  spacing: Number,
}


const Dropdown = defineComponent<DropdownProps>((props, {slots}) => {


  const state = reactive({
    popVisible: props.visible,
  })
  const {cache, adapter: adapterInject, log} = useBaseComponent<TooltipProps>(props, state)

  const adapterFunc = function (){
    return {
      ...adapterInject(),
      setPopVisible: (popVisible: boolean) => state.popVisible = popVisible,
      notifyVisibleChange: (visible: boolean) => props.onVisibleChange(visible),
    };
  }
  const adapter = adapterFunc()
  const foundation = new Foundation(adapter);
  const handleVisibleChange = (visible: boolean) => {
    foundation.handleVisibleChange(visible)
  };

  const context = inject<{level:number, showTick?:boolean}>('contextValue', {level:0})
  const { level = 0 } = context;
  const { showTick } = props;
  const contextValue = { showTick, level: level + 1 };
  provide('contextValue', contextValue)
  function renderContent() {
    const { render, menu } = props;
    console.log(props)
    let content:any = null;
    if (isVNode(render)) {
      content = render;
    } else if (Array.isArray(menu)) {
      content = renderMenu();
    }
    const { contentClassName, style,  prefixCls} = props;
    const className = classnames(prefixCls, contentClassName);
    return (
      <div class={className} style={style}>
        <div class={`${prefixCls}-content`}>{content}</div>
      </div>
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
                default:()=>name
              }}
            </DropdownTitle>
          );
        }

        case 'item': {
          const { node, name, ...rest } = m;
          return (
            <DropdownItem {...rest} key={node + name + index}>
              {{
                default:()=>name
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
    console.log(content)
    return <DropdownMenu>{{default:()=>content}}</DropdownMenu>;
  }

  // function renderPopCard() {
  //   const { render, contentClassName, style, showTick, prefixCls } = props;
  //   const className = classnames(prefixCls, contentClassName);
  //   const { level = 0 } = context;
  //   const contextValue = { showTick, level: level + 1 };
  //   return (
  //     <DropdownContext.Provider value={contextValue}>
  //       <div class={className} style={style}>
  //         <div class={`${prefixCls}-content`}>{render}</div>
  //       </div>
  //     </DropdownContext.Provider>
  //   );
  // }

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
      menu,
      render,
      showTick,
      contentClassName,
      ...attr
    } = props;
    let { spacing } = props;
    const { level } = context;
    const { popVisible } = state;
    const pop = renderContent();

    if (level > 0) {
      spacing = typeof spacing === 'number' ? spacing : numbers.NESTED_SPACING;
    } else if (spacing === null || typeof spacing === 'undefined') {
      spacing = numbers.SPACING;
    }

    let children:any = slots.default?slots.default()[0]:null;

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
        {...attr}
      >
        {
          cloneVNode(children, {
            className: classnames(get(children, 'props.className'), {
              [`${prefixCls}-showing`]: popVisible,
            }),
          })}
      </Tooltip>
    )
  }
})


Dropdown.props = vuePropsType

export {DropdownMenu, DropdownItem, DropdownDivider, DropdownTitle,Dropdown}
export default Dropdown

