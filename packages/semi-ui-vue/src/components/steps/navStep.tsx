import * as PropTypes from '../PropTypes';
import { isFunction, noop } from 'lodash';
import classnames from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import { IconChevronRight } from '@kousum/semi-icons-vue';
import { defineComponent, useSlots, h, CSSProperties, ComponentObjectPropsOptions, PropType } from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps, VueJsxNode } from '../interface';
import { AriaAttributes } from '../AriaAttributes';

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
  stepNumber?: number;
}

const propTypes: CombineProps<NavStepProps> = {
  prefixCls: PropTypes.string,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  active: PropTypes.bool,

  onChange: PropTypes.func as PropType<NavStepProps['onChange']>,
  stepNumber: [PropTypes.number, PropTypes.string] as PropType<NavStepProps['stepNumber']>,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  'aria-label': PropTypes.string,
  index: PropTypes.number,
  total: PropTypes.number,
};
const defaultProps = {
  prefixCls: css.ITEM,
  active: false,
  className: '',
  onChange: noop,
};
export const vuePropsType = vuePropsMake<NavStepProps>(propTypes, defaultProps);
const NavStep = defineComponent({
  props: { ...vuePropsType },
  name: 'NavStep',
  setup(props, {}) {
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
  },
});

export default NavStep;
