import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import {defineComponent, useSlots, h, CSSProperties, isVNode, VNode, cloneVNode} from "vue";
import {vuePropsMake} from "../PropTypes";
import {noop} from "lodash";
import {BasicStepProps} from "./basicStep";

export type Direction = 'horizontal' | 'vertical';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Size = 'default' | 'small';
export interface BasicStepsProps {
    prefixCls?: string;
    className?: string;
    direction?: Direction;
    current?: number;
    initial?: number;
    status?: Status;
    style?: CSSProperties;
    size?: Size;
    hasLine?: boolean;
    children?: VNode[];
    onChange?: (current: number) => void;
    "aria-label"?: string
}


const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    current: PropTypes.number,
    initial: PropTypes.number,
    direction: PropTypes.string,
    status: PropTypes.string,
    hasLine: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    'aria-label': PropTypes.string,
};

const defaultProps = {
    prefixCls: css.PREFIX,
    current: 0,
    direction: 'horizontal',
    size: '',
    initial: 0,
    hasLine: true,
    status: 'process',
    onChange: noop
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Steps = defineComponent<BasicStepsProps>((props, {}) => {
    const slots = useSlots()



    return () => {
        const children = slots.default?.()
        const {
            size,
            current,
            status,
            prefixCls,
            initial,
            direction,
            className,
            style,
            hasLine,
            onChange,
        } = props;

        const inner = () => {
            const filteredChildren = children.filter(c => isVNode(c)) as Array<VNode>;
            const content = filteredChildren.map((child: VNode, index) => {
                if (!child) {
                    return null;
                }
                const stepNumber = initial + index;
                const childProps:BasicStepProps = {
                    stepNumber: `${stepNumber + 1}`,
                    size,
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
                childProps.active = stepNumber === current;
                childProps.done = stepNumber < current;
                childProps.onChange = onChange ? () => {
                    if (index !== current) {
                        onChange(index + initial);
                    }
                } : undefined;
                return cloneVNode(child, { ...childProps });
            });
            return content;
        }

        const wrapperCls = cls(className, {
            [`${prefixCls}-basic`]: true,
            [`${prefixCls}-${direction}`]: true,
            [`${prefixCls}-${size}`]: size !== 'default',
            [`${prefixCls}-hasline`]: hasLine,
        });

        return (
          <div aria-label={props["aria-label"]} class={wrapperCls} style={style}>
              {inner()}
          </div>
        );
    }
})

Steps.props = vuePropsType
Steps.name = 'Steps'

export default Steps
