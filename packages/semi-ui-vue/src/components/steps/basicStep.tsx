import { isFunction, noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import { IconTickCircle, IconAlertCircle, IconAlertTriangle } from '@kousum/semi-icons-vue';
import { VueJsxNode } from '../interface';
import {CSSProperties, defineComponent, useSlots, h, isVNode, ComponentObjectPropsOptions, PropType} from 'vue';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';
import { getProps } from '../_base/baseComponent';
import { Direction } from './fillSteps';

export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Size = 'default' | 'small';
export interface BasicStepProps {
  description?: VueJsxNode;
  icon?: VueJsxNode;
  status?: Status;
  title?: VueJsxNode;
  className?: string;
  style?: CSSProperties;
  active?: boolean;
  prefixCls?: string;
  stepNumber?: string;
  size?: Size;
  done?: boolean;
  onChange?: () => void;
  onClick?: any;
  onKeyDown?: any;
  role?: string;
  'aria-label'?: AriaAttributes['aria-label'];
  direction?: Direction;
}
export enum stepSizeMapIconSize {
  small = 'large',
  default = 'extra-large',
}

const propTypes:ComponentObjectPropsOptions<BasicStepProps> = {
  prefixCls: PropTypes.string,
  description: PropTypes.node,
  icon: PropTypes.node,
  status: PropTypes.string as PropType<BasicStepProps['status']>,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  done: PropTypes.bool,

  direction: PropTypes.string as PropType<BasicStepProps['direction']>,
  // children: PropTypes.node as PropType<BasicStepProps['children']>,
  onChange: PropTypes.func as PropType<BasicStepProps['onChange']>,
  stepNumber: [PropTypes.number, PropTypes.string] as PropType<BasicStepProps['stepNumber']>,
  size: PropTypes.string as PropType<BasicStepProps['size']>,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  'aria-label': PropTypes.string,
};
const defaultProps = {
  prefixCls: css.ITEM,
  active: false,
  done: false,
  status: 'wait',
  className: '',
  size: 'default',
  onChange: noop,
};
export const vuePropsType = vuePropsMake<BasicStepProps>(propTypes, defaultProps);
const BasicStep = defineComponent((props, {}) => {
  const slots = useSlots();

  return () => {
    const {
      prefixCls,
      className,
      size,
      title,
      description,
      status,
      style,
      active,
      done,
      icon,
      stepNumber,
      onClick,
      onChange,
      onKeyDown,
    } = props;
    const renderIcon = () => {
      let inner, progress;

      if ('icon' in getProps(props)) {
        if (isVNode(icon)) {
          inner = icon;
        }
      } else if ('status' in getProps(props)) {
        switch (status) {
          case 'error':
            inner = <IconAlertCircle size={stepSizeMapIconSize[size]} />;
            break;
          case 'wait':
            inner = <span class={`${prefixCls}-number-icon`}>{stepNumber}</span>;
            break;
          case 'process':
            inner = <span class={`${prefixCls}-number-icon`}>{stepNumber}</span>;
            progress = true;
            break;
          case 'finish':
            inner = <IconTickCircle size={stepSizeMapIconSize[size]} />;
            break;
          case 'warning':
            inner = <IconAlertTriangle size={stepSizeMapIconSize[size]} />;
            break;
          default:
            inner = null;
            break;
        }
      }
      const cls = classnames({
        [`${prefixCls}-icon`]: true,
        [`${prefixCls}-custom-icon`]: 'icon' in getProps(props),
        [`${prefixCls}-icon-process`]: progress,
      });

      return inner ? <span class={cls}>{inner}</span> : null;
    };

    const classString = classnames(
      prefixCls,
      `${prefixCls}-${status}`,
      {
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-done`]: done,
        [`${prefixCls}-hover`]: onChange || props.onClick,
        [`${prefixCls}-clickable`]: (onChange || onClick),
        [`${prefixCls}-${status}-hover`]: onChange || props.onClick,
      },
      className
    );
    const handleClick = (e: MouseEvent) => {
      onClick?.(e);
      onChange?.();
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onKeyDown?.(e);
        onChange?.();
      }
    };
    return (
      <div
        role={props['role']}
        aria-label={props['aria-label']}
        tabindex={0}
        aria-current="step"
        class={classString}
        style={style}
        onClick={(e) => handleClick(e)}
        onKeydown={handleKeyDown}
      >
        <div class={`${prefixCls}-container`}>
          <div class={`${prefixCls}-left`}>{renderIcon()}</div>
          <div class={`${prefixCls}-content`}>
            <div class={`${prefixCls}-title`}>
              <div class={`${prefixCls}-title-text`}>{title}</div>
            </div>
            {description && <div class={`${prefixCls}-description`}>{description}</div>}
          </div>
        </div>
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'BasicStep'
});


export default BasicStep;
