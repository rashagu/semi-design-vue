import {isFunction, noop} from 'lodash';
import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import {stepsClasses as css} from '@douyinfe/semi-foundation/steps/constants';
import {IconTickCircle, IconAlertCircle, IconAlertTriangle} from '@kousum/semi-icons-vue';
import {VueJsxNode} from "../interface";
import {CSSProperties, defineComponent, h, useSlots} from "vue";
import {AriaAttributes} from "../AriaAttributes";
import {vuePropsMake} from "../PropTypes";
import {getProps} from "../_base/baseComponent";
import {Direction} from "./fillSteps";

export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';

export interface FillStepProps {
  description?: VueJsxNode;
  icon?: VueJsxNode;
  status?: Status;
  title?: VueJsxNode;
  className?: string;
  style?: CSSProperties;
  prefixCls?: string;
  stepNumber?: string;
  onChange?: () => void;
  onClick?: any;
  onKeyDown?: any;
  "role"?: string;
  "aria-label"?: AriaAttributes["aria-label"]
  direction?: Direction;
}

const propTypes = {
  prefixCls: PropTypes.string,
  description: PropTypes.node,
  icon: PropTypes.node,
  status: PropTypes.string,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  direction: PropTypes.string,
};
const defaultProps = {
  prefixCls: css.ITEM,
  status: 'wait',
  className: '',
  onChange: noop
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const FillStep = defineComponent<FillStepProps>((props, {}) => {
  const slots = useSlots()


  return () => {

    const {
      prefixCls,
      className,
      title,
      description,
      status,
      style,
      onClick,
      icon,
      onChange,
      stepNumber,
      onKeyDown
    } = props;
    const renderIcon = () => {
      let inner, progress;

      if ('icon' in getProps(props)) {
        inner = icon;
      } else if ('status' in getProps(props)) {
        switch (status) {
          case 'error':
            inner = <IconAlertCircle size="extra-large"/>;
            break;
          case 'wait':
            inner = stepNumber;
            break;
          case 'process':
            inner = stepNumber;
            progress = true;
            break;
          case 'finish':
            inner = <IconTickCircle size="extra-large"/>;
            break;
          case 'warning':
            inner = <IconAlertTriangle size="extra-large"/>;
            break;
          default:
            inner = null;
            break;
        }
      }
      const cls = classnames({
        [`${prefixCls}-left`]: true,
        [`${prefixCls}-icon`]: 'icon' in getProps(props),
        [`${prefixCls}-plain`]: !('icon' in getProps(props)),
        [`${prefixCls}-icon-process`]: progress,
      });

      return inner ? <div class={cls}>{inner}</div> : null;
    };
    const handleClick = (e: MouseEvent) => {
      if (isFunction(onClick)) {
        onClick(e);
      }
      onChange();
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (isFunction(onKeyDown)) {
          onKeyDown(e);
        }
        onChange();
      }
    };
    return (
      <div
        role={props["role"]}
        aria-label={props["aria-label"]}
        aria-current="step"
        tabindex={0}
        class={classnames({
          [prefixCls]: true,
          [`${prefixCls}-${status}`]: Boolean(status),
          [`${prefixCls}-clickable`]: onClick,
        }, className)}
        style={style}
        onClick={e => {
          handleClick(e);
        }}
        onKeydown={handleKeyDown}
      >
        {renderIcon()}
        <div class={`${prefixCls}-content`}>
          <div class={`${prefixCls}-title`} title={typeof title === 'string' ? title : null}>
            <span class={`${prefixCls}-title-text`}>{title}</span>
          </div>
          <div
            class={`${prefixCls}-description`}
            title={typeof description === 'string' ? description : null}
          >
            {description}
          </div>
        </div>
      </div>
    );
  }
})

FillStep.props = vuePropsType
FillStep.name = 'FillStep'

export default FillStep


