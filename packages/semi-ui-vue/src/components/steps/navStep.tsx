import * as PropTypes from '../PropTypes';
import {isFunction, noop} from 'lodash';
import classnames from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import { IconChevronRight } from '@kousum/semi-icons-vue';
import { defineComponent, useSlots, h, CSSProperties } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';
import { AriaAttributes } from '../AriaAttributes';
import {Direction} from "./fillSteps";

export interface NavStepProps {
  title?: VueJsxNode;
  className?: string;
  style?: CSSProperties;
  index?: number;
  active?: boolean;
  total?: number;
  prefixCls?: string;
  onChange?: () => void;
  onClick?: any;
  onKeyDown?: any;
  role?: string;
  'aria-label'?: AriaAttributes['aria-label'];
}

const propTypes = {
  prefixCls: PropTypes.string,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  active: PropTypes.bool,

  onChange: PropTypes.func,
  stepNumber: [PropTypes.number, PropTypes.string],
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  'aria-label': PropTypes.string,
};
const defaultProps = {
  prefixCls: css.ITEM,
  active: false,
  className: '',
  onChange: noop
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const NavStep = defineComponent<NavStepProps>((props, {}) => {
  const slots = useSlots();

  return () => {
    const { prefixCls, className, title, style, active, index, total, onClick, onKeyDown, onChange } = props;
    const classString = classnames(
      prefixCls,
      {
        [`${prefixCls}-active`]: active,
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
        aria-current="step"
        tabindex={0}
        class={classString}
        style={style}
        onClick={(e) => handleClick(e)}
        onKeydown={handleKeyDown}
      >
        <div class={`${prefixCls}-container`}>
          <div class={`${prefixCls}-content`}>
            <div class={`${prefixCls}-title`}>{title}</div>
          </div>
          {index !== total - 1 && (
            <div class={`${prefixCls}-icon`}>
              <IconChevronRight size="small" />
            </div>
          )}
        </div>
      </div>
    );
  };
});

// @ts-ignore
NavStep.props = vuePropsType;
NavStep.name = 'NavStep';

export default NavStep;
