import {defineComponent, ref, h, Fragment, VNode, CSSProperties, inject} from 'vue'

import classNames from 'classnames';

import ConfigContext from '../configProvider/Context';
import {cssClasses, strings, numbers} from '@douyinfe/semi-foundation/popover/constants';
import Tooltip, {ArrowBounding,  Trigger} from '../tooltip/Index';
import { Position } from '@douyinfe/semi-foundation/tooltip/foundation';

import Arrow from './Arrow';
import '@douyinfe/semi-foundation/popover/popover.scss';
import {BaseProps} from '../_base/BaseComponent';
import {Motion} from '../_base/base';
import {noop} from 'lodash';

declare interface ArrowStyle {
  borderColor?: string;
  backgroundColor?: string;
  borderOpacity?: string | number;
}

export interface PopoverProps extends BaseProps {
  content?: VNode | string;
  visible?: boolean;
  autoAdjustOverflow?: boolean;
  motion?: Motion;
  position?: Position;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  trigger?: Trigger;
  contentClassName?: string | any[];
  onVisibleChange?: (visible: boolean) => void;
  onClickOutSide?: (e: any) => void;
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
  cancelText?: string
  okText?: string
  role?: string
}

export interface PopoverState {
  popConfirmVisible: boolean;
}

const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;

export const vuePropsType = {
  style: [String, Object],
  className: String,
  content: Object,
  visible: Boolean,
  autoAdjustOverflow: {
    type: Boolean,
    default: true
  },
  motion: {
    type: [String, Object, Boolean],
    default: true
  },
  position: {
    type: [String, Object],
    default: 'bottom'
  },
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  trigger: {
    type: String,
    default: 'hover'
  },
  contentClassName: [String, Array],
  onVisibleChange: Function,
  onClickOutSide: {
    type:Function,
    default: noop
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  spacing: Number,
  stopPropagation: [Boolean, String],
  arrowStyle: Object,
  arrowBounding: {
    type: Object,
    default: numbers.ARROW_BOUNDING
  },
  arrowPointAtCenter: Boolean,
  prefixCls: {
    type:String,
    default: cssClasses.PREFIX
  },
  rePosKey: [String, Number, Boolean],
  getPopupContainer: Function,
  zIndex: {
    type: Number,
    default: numbers.DEFAULT_Z_INDEX
  },
  cancelText: {
    type: String,
    default: 'No',
  },
  okText: {
    type: String,
    default: 'Yes',
  },
  role:String
}

const Index = defineComponent<PopoverProps>((props, {slots}) => {

  const direction = inject('direction','ltr')
  function renderPopCard() {
    const { content, contentClassName, prefixCls } = props;
    const popCardCls = classNames(
      prefixCls,
      contentClassName,
      {
        // @ts-ignore
        [`${prefixCls}-rtl`]: direction === 'rtl',
      }
    );
    return (
      <div class={popCardCls}>
        <div class={`${prefixCls}-content`}>{content}</div>
      </div>
    );
  }


  return () => {

    const {
      children,
      prefixCls,
      showArrow,
      arrowStyle = {},
      arrowBounding,
      position,
      style,
      trigger,
      ...attr
    } = props;
    let { spacing } = props;
    const popContent = renderPopCard();

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
        {...(attr as any)}
        trigger={trigger}
        position={position}
        style={style}
        content={popContent}
        prefixCls={prefixCls}
        spacing={spacing}
        showArrow={arrow}
        arrowBounding={arrowBounding}
        role={role}
      >
        {{
          default:()=> <div style={{display:'inline-block'}}>
              {slots.default ? slots.default() : null}
            </div>
        }}
      </Tooltip>
    );
  }
})

Index.props = vuePropsType

export default Index

