import {defineComponent, ref, h, onActivated, Fragment, provide, inject} from 'vue'
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/dropdown/constants';

import BaseComponent, { BaseProps } from '../_base/baseComponent';
import { IconTick } from '@kousum/semi-icons-vue';
import { noop } from 'lodash';
import {DropdownContext} from "./context";

export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';

export interface DropdownItemProps extends BaseProps {
  disabled?: boolean;
  selected?: boolean;
  onClick?: (payload: MouseEvent) => void;
  onMouseEnter?: (payload: MouseEvent) => void;
  onMouseLeave?: (payload: MouseEvent) => void;
  onContextMenu?: (payload: MouseEvent) => void;
  forwardRef?: (ele: any) => void;
  type?: Type;
  active?: boolean;
  icon?: JSX.Element;
  [key:string]:any;
}

const prefixCls = css.PREFIX;

export const vuePropsType = {
  name: String
}
const DropdownItem = defineComponent<DropdownItemProps>((props, {slots}) => {

  const { children, disabled, className, forwardRef, style, type, active, icon } = props;

  const context = inject('DropdownContext', DropdownContext);

  const { showTick } = context;
  const itemclass = cls(className, {
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item-disabled`]: disabled,
    [`${prefixCls}-item-withTick`]: showTick,
    [`${prefixCls}-item-${type}`]: type,
    [`${prefixCls}-item-active`]: active,
  });

  const events:any = {};
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
    <li {...events} ref={(ref) => forwardRef(ref)} class={itemclass} style={style}>
      {tick}
      {iconContent}
      {children}
    </li>
  );
})

DropdownItem.props = vuePropsType

export default DropdownItem

