import { isFunction, noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import classnames from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import { IconTickCircle, IconAlertCircle, IconAlertTriangle } from '@kousum/semi-icons-vue';
import { CombineProps, VueJsxNode } from '../interface';
import { ComponentObjectPropsOptions, CSSProperties, defineComponent, h, PropType, useSlots } from 'vue';
import { AriaAttributes } from '../AriaAttributes';
import { vuePropsMake } from '../PropTypes';
import { Direction } from './fillSteps';
import { useHasInProps } from '../_base/baseComponent';

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
  role?: string;
  'aria-label'?: AriaAttributes['aria-label'];
  direction?: Direction;
}

const propTypes: CombineProps<FillStepProps> = {
  prefixCls: PropTypes.string,
  description: PropTypes.node,
  icon: PropTypes.node,
  status: PropTypes.string as PropType<FillStepProps['status']>,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func as PropType<FillStepProps['onChange']>,
  direction: PropTypes.string as PropType<FillStepProps['direction']>,
  stepNumber: PropTypes.string,
  onKeyDown: PropTypes.func as PropType<FillStepProps['onKeyDown']>,
  role: PropTypes.string,
  'aria-label': PropTypes.string,
};
const defaultProps = {
  prefixCls: css.ITEM,
  status: 'wait',
  className: '',
  onChange: noop,
};
export const vuePropsType = vuePropsMake<FillStepProps>(propTypes, defaultProps);
const FillStep = defineComponent({
  props: { ...vuePropsType },
  name: 'FillStep',
  setup(props, {}) {
    const { getProps } = useHasInProps();
    const slots = useSlots();

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
        onKeyDown,
      } = props;
      const renderIcon = () => {
        let inner, progress;

        if ('icon' in getProps(props)) {
          inner = icon;
        } else if ('status' in getProps(props)) {
          switch (status) {
            case 'error':
              inner = <IconAlertCircle size="extra-large" />;
              break;
            case 'wait':
              inner = stepNumber;
              break;
            case 'process':
              inner = stepNumber;
              progress = true;
              break;
            case 'finish':
              inner = <IconTickCircle size="extra-large" />;
              break;
            case 'warning':
              inner = <IconAlertTriangle size="extra-large" />;
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
          [`${prefixCls}-hover`]: onChange || onClick,
        });

        return inner ? <div class={cls}>{inner}</div> : null;
      };

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
          aria-current="step"
          tabindex={0}
          class={classnames(
            {
              [prefixCls]: true,
              [`${prefixCls}-${status}`]: Boolean(status),
              [`${prefixCls}-${status}-hover`]: Boolean(status) && (onChange || onClick),
              [`${prefixCls}-${status}-active`]: Boolean(status) && (onChange || onClick),
              [`${prefixCls}-clickable`]: onChange || onClick,
            },
            className
          )}
          style={style}
          onClick={(e) => {
            handleClick(e);
          }}
          onKeydown={handleKeyDown}
        >
          {renderIcon()}
          <div class={`${prefixCls}-content`}>
            <div class={`${prefixCls}-title`} title={typeof title === 'string' ? title : null}>
              <span class={`${prefixCls}-title-text`}>{title}</span>
            </div>
            <div class={`${prefixCls}-description`} title={typeof description === 'string' ? description : null}>
              {description}
            </div>
          </div>
        </div>
      );
    };
  },
});

export default FillStep;
