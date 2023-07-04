import {defineComponent, ref, h, onActivated, Fragment, provide, inject, PropType} from 'vue'
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/dropdown/constants';

import { BaseProps } from '../_base/baseComponent';
import { IconTick } from '@kousum/semi-icons-vue';
import { noop } from 'lodash';
import {vuePropsMake} from "../PropTypes";
import {useDropdownContext} from "./context/Consumer";
import {ComponentObjectPropsOptions} from "vue/dist/vue";

export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';

export interface DropdownItemProps extends BaseProps {
  forwardRef?: any,
  disabled?: boolean;
  selected?: boolean;
  onClick?: (payload: MouseEvent) => void;
  onMouseEnter?: (payload: MouseEvent) => void;
  onMouseLeave?: (payload: MouseEvent) => void;
  onContextMenu?: (payload: MouseEvent) => void;
  type?: Type;
  active?: boolean;
  icon?: JSX.Element;
  onKeyDown?: (e: KeyboardEvent) => void;
  showTick?: boolean;
  /** internal prop, please do not use  */
  hover?: boolean
  name?: string
}

const prefixCls = css.PREFIX;
const propTypes: ComponentObjectPropsOptions<DropdownItemProps> = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func as PropType<DropdownItemProps['onClick']>,
  onMouseEnter: PropTypes.func as PropType<DropdownItemProps['onMouseEnter']>,
  onMouseLeave: PropTypes.func as PropType<DropdownItemProps['onMouseLeave']>,
  onContextMenu: PropTypes.func as PropType<DropdownItemProps['onContextMenu']>,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardRef: [PropTypes.object, PropTypes.func],
  type: String as PropType<DropdownItemProps['type']>,
  active: PropTypes.bool,
  icon: PropTypes.node as PropType<DropdownItemProps['icon']>,
  onKeyDown: PropTypes.func as PropType<DropdownItemProps['onKeyDown']>,
  showTick: PropTypes.bool,
  /** internal prop, please do not use  */
  hover: PropTypes.bool,
};
const defaultProps = {
  disabled: false,
  divided: false,
  selected: false,
  onMouseEnter: noop,
  onMouseLeave: noop,
  forwardRef: noop,
};

export const vuePropsType = vuePropsMake<DropdownItemProps>(propTypes, defaultProps)
const DropdownItem = defineComponent<DropdownItemProps>((props, {slots}) => {

  const {context} = useDropdownContext();
  let elementType: string = 'Dropdown.Item'

  return ()=>{
    const { disabled, className, forwardRef, style, type, active, icon, showTick, hover } = props;
    const { showTick: contextShowTick } = context.value;
    const realShowTick = contextShowTick ?? showTick;
    const itemclass = cls(className, {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-hover`]: hover,
      [`${prefixCls}-item-withTick`]: realShowTick,
      [`${prefixCls}-item-${type}`]: type,
      [`${prefixCls}-item-active`]: active,
    });

    const events = {};
    if (!disabled) {
      ['onClick', 'onMouseEnter', 'onMouseLeave', 'onContextMenu'].forEach(eventName => {
        events[eventName] = props[eventName];
      });
    }
    let tick = null;
    switch (true) {
      case realShowTick && active:
        tick = <IconTick />;
        break;
      case realShowTick && !active:
        tick = <IconTick style={{ color: 'transparent' }} />;
        break;
      default:
        tick = null;
        break;
    }
    let iconContent = null;
    if (icon) {
      iconContent = (
        <div class={`${prefixCls}-item-icon`}>
          {icon}
        </div>
      );
    }
    return (
      <li role="menuitem" tabindex={-1} aria-disabled={disabled} {...events} ref={forwardRef} class={itemclass} style={style}>
        {tick}
        {iconContent}
        {slots.default?.()}
      </li>
    );
  }
}, {
  props: vuePropsType,
  name: 'DropdownItem'
})


export default DropdownItem

