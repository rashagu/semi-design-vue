import {defineComponent, ref, h, onActivated, Fragment, StyleValue} from 'vue'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/dropdown/constants';

import BaseComponent from '../_base/baseComponent';


 // import Tooltip, { Position, TooltipProps, Trigger } from '../tooltip/index';

import { numbers as tooltipNumbers } from '@douyinfe/semi-foundation/tooltip/constants';
import Foundation from '@douyinfe/semi-foundation/dropdown/foundation';

import DropdownMenu from './dropdownMenu';
import DropdownItem, { DropdownItemProps } from './dropdownItem';
import DropdownDivider, { DropdownDividerProps } from './dropdownDivider';
import DropdownTitle, { DropdownTitleProps } from './dropdownTitle';

import '@douyinfe/semi-foundation/dropdown/dropdown.scss';
import { noop, get } from 'lodash';
import { Motion } from '../_base/base';

const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

export { DropdownDividerProps } from './dropdownDivider';
export { DropdownItemProps, Type } from './dropdownItem';
export { DropdownMenuProps } from './dropdownMenu';
export { DropdownTitleProps } from './dropdownTitle';
export interface DropDownMenuItemBasic {
  node: 'title' | 'item' | 'divider';
  name?: string;
}

export type DropDownMenuItem = DropDownMenuItemBasic & DropdownItemProps & DropdownDividerProps & DropdownTitleProps;

/*export interface DropdownProps extends TooltipProps {
  render?: any;
  visible?: boolean;
  position?: Position;
  getPopupContainer?: () => HTMLElement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  menu?: DropDownMenuItem[];
  trigger?: Trigger;
  zIndex?: number;
  motion?: Motion;
  className?: string;
  contentClassName?: string | any[];
  style?: StyleValue;
  onVisibleChange?: (visible: boolean) => void;
  rePosKey?: string | number;
  showTick?: boolean;
}*/

interface DropdownState {
  popVisible: boolean;
}

export const vuePropsType = {
  name: String
}
const Index = defineComponent<{  }>((props, {slots}) => {
  // 在keep-alive = true时  相当于 onShow
  onActivated(() => {

  })

  return () => (
    <div>
      Index
    </div>
  )
})

Index.props = vuePropsType

export default Index

