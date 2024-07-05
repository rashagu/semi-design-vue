import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { stepsClasses as css } from '@douyinfe/semi-foundation/steps/constants';
import {
    defineComponent,
    useSlots,
    h,
    CSSProperties,
    isVNode,
    VNode,
    cloneVNode,
    ComponentObjectPropsOptions, PropType, useAttrs
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {noop} from "lodash";
import {BasicStepProps} from "./basicStep";
import getDataAttr from "@douyinfe/semi-foundation/utils/getDataAttr";
import { getFragmentChildren } from '../_utils';

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


const propTypes:ComponentObjectPropsOptions<BasicStepsProps> = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    current: PropTypes.number,
    initial: PropTypes.number,
    direction: PropTypes.string as PropType<BasicStepsProps['direction']>,
    status: PropTypes.string as PropType<BasicStepsProps['status']>,
    hasLine: PropTypes.bool,
    children: PropTypes.node as PropType<BasicStepsProps['children']>,
    onChange: PropTypes.func as PropType<BasicStepsProps['onChange']>,
    'aria-label': PropTypes.string,
    size: PropTypes.string as PropType<BasicStepsProps['size']>,
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
export const vuePropsType = vuePropsMake<BasicStepsProps>(propTypes, defaultProps)
const Steps = defineComponent((props, {}) => {
    const slots = useSlots()
    const attrs = useAttrs()



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
          ...rest
        } = props;

        const inner = () => {
            const filteredChildren = getFragmentChildren(slots).filter(c => isVNode(c)) as Array<VNode>;
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
          <div aria-label={props["aria-label"]} class={wrapperCls} style={style}  {...getDataAttr({...rest, ...attrs})}>
              {inner()}
          </div>
        );
    }
}, {
    props: vuePropsType,
    name: 'Steps'
})


export default Steps
