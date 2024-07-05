import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import { Row, Col } from '../grid';
import {
  defineComponent,
  useSlots,
  h,
  CSSProperties,
  isVNode,
  VNode,
  cloneVNode,
  ComponentObjectPropsOptions,
  PropType,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { FillStepProps } from './fillStep';
import { getFragmentChildren } from '../_utils';

export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Direction = 'horizontal' | 'vertical';
export type Size = 'default' | 'small';
export interface FillStepsProps {
  prefixCls?: string;
  className?: string;
  current?: number;
  direction?: Direction;
  initial?: number;
  status?: Status;
  style?: CSSProperties;
  children?: VNode[];
  onChange?: (current: number) => void;
  'aria-label'?: string;
  size?: Size;
}

const propTypes: ComponentObjectPropsOptions<FillStepsProps> = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  current: PropTypes.number,
  initial: PropTypes.number,
  direction: PropTypes.string as PropType<FillStepsProps['direction']>,
  status: PropTypes.string as PropType<FillStepsProps['status']>,
  children: PropTypes.node as PropType<FillStepsProps['children']>,
  onChange: PropTypes.func as PropType<FillStepsProps['onChange']>,
  size: PropTypes.string as PropType<FillStepsProps['size']>,
};

const defaultProps = {
  prefixCls: css.PREFIX,
  current: 0,
  direction: 'horizontal',
  initial: 0,
  status: 'process',
};

export const vuePropsType = vuePropsMake<FillStepsProps>(propTypes, defaultProps);
const FillSteps = defineComponent({
  props: vuePropsType,
  name: 'FillSteps',
  setup(props, {}) {
    const slots = useSlots();

    return () => {
      const { current, status, children, prefixCls, initial, direction, className, style, onChange } = props;

      const inner = () => {
        const filteredChildren = getFragmentChildren(slots).filter((c) => isVNode(c)) as Array<VNode>;
        const colStyle = direction === 'vertical' ? null : { width: `${100 / filteredChildren.length}%` };
        const content = filteredChildren.map((child: VNode, index) => {
          if (!child) {
            return null;
          }
          const stepNumber = initial + index;
          const childProps: FillStepProps = {
            stepNumber: `${stepNumber + 1}`,
            direction,
            ...child.props,
          };

          if (status === 'error' && index === current - 1) {
            childProps.className = `${prefixCls}-next-error`;
          }

          if (!child.props.status) {
            if (stepNumber === current) {
              childProps.status = status;
            } else if (stepNumber < current) {
              childProps.status = 'finish';
            } else {
              childProps.status = 'wait';
            }
          }
          childProps.onChange = onChange
            ? () => {
                if (index !== current) {
                  onChange(index + initial);
                }
              }
            : undefined;
          return <Col style={colStyle}>{cloneVNode(child, { ...childProps })}</Col>;
        });
        return content;
      };
      const wrapperCls = cls(className, {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
      });

      return (
        <div class={wrapperCls} style={style} aria-label={props['aria-label']}>
          <Row type="flex" justify="start">
            {inner}
          </Row>
        </div>
      );
    };
  },
});

export default FillSteps;
