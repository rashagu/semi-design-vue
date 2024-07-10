import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import cls from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import {
  cloneVNode,
  ComponentObjectPropsOptions,
  CSSProperties,
  defineComponent,
  h,
  isVNode,
  PropType,
  useAttrs,
  useSlots,
  VNode,
} from 'vue';
import { noop } from 'lodash';
import { NavStepProps } from './navStep';
import { Direction, Status } from './basicSteps';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import { CombineProps } from '../interface';

export type Size = 'default' | 'small';
export interface NavStepsProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  direction?: Direction;
  current?: number;
  initial?: number;
  size?: Size;
  children?: VNode[];
  onChange?: (current: number) => void;
  'aria-label'?: string;
  status?: Status;
}

const propTypes: CombineProps<NavStepsProps> = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  current: PropTypes.number,
  initial: PropTypes.number,
  children: PropTypes.node as PropType<NavStepsProps['children']>,
  onChange: PropTypes.func as PropType<NavStepsProps['onChange']>,
  'aria-label': PropTypes.string,
  direction: PropTypes.string as PropType<NavStepsProps['direction']>,
  size: PropTypes.string as PropType<NavStepsProps['size']>,
  status: PropTypes.string as PropType<NavStepsProps['status']>,
};
const defaultProps = {
  prefixCls: css.PREFIX,
  current: 0,
  direction: 'horizontal',
  size: 'default',
  initial: 0,
  status: 'process',
  onChange: noop,
};
export const vuePropsType = vuePropsMake<NavStepsProps>(propTypes, defaultProps);
const NavSteps = defineComponent({
  props: vuePropsType,
  name: 'NavSteps',
  setup(props, {}) {
    const slots = useSlots();
    const attr = useAttrs();

    return () => {
      const { size, current, initial, children, prefixCls, className, style, onChange, ...rest } = props;
      const inner = () => {
        const filteredChildren = children.filter((c) => isVNode(c)) as Array<VNode>;
        const total = filteredChildren.length;
        const content = filteredChildren.map((child: VNode, index) => {
          if (!child) {
            return null;
          }
          const childProps: NavStepProps = {
            index,
            total,
            ...child.props,
          };
          childProps.active = index === current;
          childProps.onChange = onChange
            ? () => {
                if (index !== current) {
                  onChange(index + initial);
                }
              }
            : undefined;
          return cloneVNode(child, { ...childProps });
        });
        return content;
      };

      const wrapperCls = cls(className, {
        [`${prefixCls}-nav`]: true,
        [`${prefixCls}-${size}`]: size !== 'default',
      });

      return (
        <div aria-label={props['aria-label']} class={wrapperCls} style={style} {...getDataAttr({ ...rest, ...attr })}>
          {inner()}
        </div>
      );
    };
  },
});

export default NavSteps;
