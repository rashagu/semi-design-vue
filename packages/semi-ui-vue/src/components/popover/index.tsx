import {defineComponent, ref, h, Fragment, VNode, CSSProperties, inject, Ref, watch, getCurrentInstance} from 'vue'
import * as PropTypes from '../PropTypes'
import classNames from 'classnames';

import {cssClasses, strings, numbers} from '@douyinfe/semi-foundation/popover/constants';
import Tooltip from '../tooltip';
import type {ArrowBounding, Position, TooltipProps, Trigger} from '../tooltip'

import Arrow from './Arrow';
import '@douyinfe/semi-foundation/popover/popover.scss';
import {BaseProps} from '../_base/baseComponent';
import {Motion} from '../_base/base';
import {isFunction, noop} from 'lodash';
import {vuePropsMake} from "../PropTypes";
import {useConfigContext} from "../configProvider/context/Consumer";
import boolean from "async-validator/dist-types/validator/boolean";

export declare interface ArrowStyle {
  borderColor?: string;
  backgroundColor?: string;
  borderOpacity?: string | number;
}

export interface PopoverProps extends BaseProps {
  content?: TooltipProps['content'];
  visible?: boolean;
  autoAdjustOverflow?: boolean;
  motion?: Motion;
  margin?: TooltipProps['margin'];
  position?: Position;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  trigger?: Trigger;
  contentClassName?: string | any[];
  onVisibleChange?: (visible: boolean) => void;
  onClickOutSide?: (e: MouseEvent) => void;
  showArrow?: boolean;
  spacing?: number;
  stopPropagation?: boolean | string;
  arrowStyle?: ArrowStyle;
  arrowBounding?: ArrowBounding;
  arrowPointAtCenter?: boolean;
  prefixCls?: string;
  rePosKey?: string | number;
  getPopupContainer?: () => HTMLElement;
  zIndex?: number;
  closeOnEsc?: TooltipProps['closeOnEsc'];
  guardFocus?: TooltipProps['guardFocus'];
  returnFocusOnClose?: TooltipProps['returnFocusOnClose'];
  onEscKeyDown?: TooltipProps['onEscKeyDown'];
  clickToHide?: TooltipProps['clickToHide'];
  disableFocusListener?: boolean
  afterClose?: () => void,
  disableArrowKeyDown?: boolean,
  keepDOM?: boolean
}

export interface PopoverState {
  popConfirmVisible: boolean;
}

const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

const propTypes = {

  children: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  visible: PropTypes.bool,
  autoAdjustOverflow: PropTypes.bool,
  motion: PropTypes.bool,
  position: PropTypes.string,
  // getPopupContainer: PropTypes.func,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  trigger: [Boolean, String],
  contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onVisibleChange: PropTypes.func,
  onClickOutSide: PropTypes.func,
  style: PropTypes.object,
  spacing: PropTypes.number,
  zIndex: PropTypes.number,
  showArrow: PropTypes.bool,
  arrowStyle: Object,
  arrowPointAtCenter: PropTypes.bool,
  arrowBounding: PropTypes.object,
  prefixCls: PropTypes.string,
  guardFocus: PropTypes.bool,
  disableArrowKeyDown: PropTypes.bool,

  className: String,
  class: String,
  stopPropagation: [Boolean, String],
  rePosKey: [String, Number, Boolean],
  getPopupContainer: Function,
  cancelText: {
    type: String,
    default: 'No',
  },
  okText: {
    type: String,
    default: 'Yes',
  },
  role: String,
  afterClose: Function,
  disableFocusListener: Boolean,
  keepDOM: Boolean,
};

const defaultProps = {
  arrowBounding: numbers.ARROW_BOUNDING,
  showArrow: false,
  autoAdjustOverflow: true,
  zIndex: numbers.DEFAULT_Z_INDEX,
  motion: true,
  trigger: 'hover',
  cancelText: 'No',
  okText: 'Yes',
  position: 'bottom',
  prefixCls: cssClasses.PREFIX,
  onClickOutSide: noop,
  onEscKeyDown: noop,
  closeOnEsc: true,
  returnFocusOnClose: true,
  guardFocus: true,
  disableFocusListener: true,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)

const Popover = defineComponent<PopoverProps>((props, {slots, expose}) => {
  const {context} = useConfigContext()
  const tooltipRef = ref()

  function focusTrigger() {
    tooltipRef.value?.focusTrigger();
  }

  const currentInstance = getCurrentInstance()

  expose({
    focusTrigger,
    // 当组件内部使用了expose时，使用ref得到的内容只有expose的那部分
    getRef() {
      return currentInstance
    }
  })

  function renderPopCard({initialFocusRef}: { initialFocusRef: any }) {
    const {content, contentClassName, prefixCls} = props;
    const {direction} = context.value;
    const popCardCls = classNames(
      prefixCls,
      contentClassName,
      {
        // @ts-ignore
        [`${prefixCls}-rtl`]: direction === 'rtl',
      }
    );
    const contentNode = renderContentNode({initialFocusRef, content});
    return (
      <div class={popCardCls}>
        <div class={`${prefixCls}-content`}>{contentNode}</div>
      </div>
    );
  }

  const renderContentNode = (props: { content: TooltipProps['content'], initialFocusRef: any }) => {
    const {initialFocusRef, content} = props;
    const contentProps = {initialFocusRef};
    return !isFunction(content) ? content : content(contentProps);
  };

  return () => {

    const {
      prefixCls,
      showArrow,
      arrowStyle = {},
      arrowBounding,
      position,
      style,
      trigger,
      ...attr
    } = props;
    let {spacing} = props;

    const arrowProps = {
      position,
      className: '',
      popStyle: style,
      arrowStyle,
    };

    const arrow = showArrow ? <Arrow {...arrowProps} /> : false;

    if (typeof spacing !== 'number') {
      spacing = showArrow ? numbers.SPACING_WITH_ARROW : numbers.SPACING;
    }

    const role = trigger === 'click' || trigger === 'custom' ? 'dialog' : 'tooltip';

    return (
      <Tooltip
        guardFocus
        ref={tooltipRef}
        {...(attr as any)}
        trigger={trigger}
        position={position}
        style={style}
        content={renderPopCard}
        prefixCls={prefixCls}
        spacing={spacing}
        showArrow={arrow}
        arrowBounding={arrowBounding}
        role={role}
      >
        {{
          default: slots.default
        }}
      </Tooltip>
    );
  }
})

Popover.props = vuePropsType
Popover.name = 'Popover'
export default Popover

