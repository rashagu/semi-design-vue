import {defineComponent, ref, h, onActivated, Fragment, provide, inject} from 'vue'
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/dropdown/constants';

import { BaseProps } from '../_base/baseComponent';
import { IconTick } from '@kousum/semi-icons-vue';
import { noop } from 'lodash';
import {vuePropsMake} from "../PropTypes";
import {useDropdownContext} from "./context/Consumer";

export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';

export interface DropdownItemProps extends BaseProps {
  disabled?: boolean;
  selected?: boolean;
  onClick?: (payload: MouseEvent) => void;
  onMouseEnter?: (payload: MouseEvent) => void;
  onMouseLeave?: (payload: MouseEvent) => void;
  onContextMenu?: (payload: MouseEvent) => void;
  type?: Type;
  active?: boolean;
  icon?: JSX.Element;
  [key:string]:any;
}

const prefixCls = css.PREFIX;
const propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardRef: PropTypes.func,
  type: String,
  active: PropTypes.bool,
  icon: PropTypes.node
};
const defaultProps = {
  disabled: false,
  divided: false,
  selected: false,
  onMouseEnter: noop,
  onMouseLeave: noop,
  forwardRef: noop,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const DropdownItem = defineComponent<DropdownItemProps>((props, {slots}) => {

  const {context} = useDropdownContext();

  return ()=>{
    const { disabled, className, forwardRef, style, type, active, icon } = props;
    const { showTick } = context.value;
    const itemclass = cls(className, {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-withTick`]: showTick,
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
      case showTick && active:
        tick = <IconTick />;
        break;
      case showTick && !active:
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
      <li role="menuitem" tabindex={-1} aria-disabled={disabled} {...events} ref={ref => forwardRef(ref)} class={itemclass} style={style}>
        {tick}
        {iconContent}
        {slots.default?.()}
      </li>
    );
  }
})

DropdownItem.props = vuePropsType

export default DropdownItem

