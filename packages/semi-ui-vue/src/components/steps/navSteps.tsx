
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import {defineComponent, useSlots, h, cloneVNode, isVNode, VNode, CSSProperties} from "vue";
import {vuePropsMake} from "../PropTypes";
import {noop} from "lodash";
import {NavStepProps} from "./navStep";
import {Direction} from "./basicSteps";

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
    "aria-label"?: string
}

const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    current: PropTypes.number,
    initial: PropTypes.number,
    size: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    'aria-label': PropTypes.string,
    direction: PropTypes.string,
};
const defaultProps = {
    prefixCls: css.PREFIX,
    current: 0,
    direction: 'horizontal',
    size: 'default',
    initial: 0,
    status: 'process',
    onChange: noop
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const NavSteps = defineComponent<NavStepsProps>((props, {}) => {
    const slots = useSlots()


    return () => {

        const { size, current, initial, children, prefixCls, className, style, onChange } = props;
        const inner = () => {
            const filteredChildren = children.filter(c => isVNode(c)) as Array<VNode>;
            const total = filteredChildren.length;
            const content = filteredChildren.map((child: VNode, index) => {
                if (!child) {
                    return null;
                }
                const childProps:NavStepProps = {
                    index,
                    total,
                    ...child.props,
                };
                childProps.active = index === current;
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
            [`${prefixCls}-nav`]: true,
            [`${prefixCls}-${size}`]: size !== 'default',
        });

        return (
          <div aria-label={props["aria-label"]} class={wrapperCls} style={style}>
              {inner()}
          </div>
        );
    }
})

NavSteps.props = vuePropsType
NavSteps.name = 'NavSteps'

export default NavSteps
