import { noop } from 'lodash';
import * as PropTypes from '../PropTypes';
import '@douyinfe/semi-foundation/steps/steps.scss';
import Step from './step';
import FillSteps, { FillStepsProps } from './fillSteps';
import BasicSteps, { BasicStepsProps } from './basicSteps';
import NavSteps, { NavStepsProps } from './navSteps';
import Context from './context';
import {defineComponent, useSlots, h, ref, VNode, ComponentObjectPropsOptions, PropType} from "vue";
import {vuePropsMake} from "../PropTypes";

export type { Status, Size, BasicStepProps } from './basicStep';
export type { Direction, BasicStepsProps } from './basicSteps';
export type { FillStepProps } from './fillStep';
export type { FillStepsProps } from './fillSteps';
export type { NavStepProps } from './navStep';
export type { NavStepsProps } from './navSteps';
export type { StepProps } from './step';

export interface FillStepsAllProps extends FillStepsProps {
    type?: 'fill'
}
export interface BasicStepsAllProps extends BasicStepsProps {
    type?: 'basic'
}
export interface NavStepsAllProps extends NavStepsProps {
    type?: 'nav'
}
export type StepsProps = FillStepsAllProps | BasicStepsAllProps | NavStepsAllProps;

const propTypes:ComponentObjectPropsOptions<StepsProps> = {
    onChange: PropTypes.func as PropType<StepsProps['onChange']>,
// @ts-ignore
    type: PropTypes.string as PropType<StepsProps['type']>,
    size: PropTypes.string as PropType<StepsProps['size']>,
    current: PropTypes.number,
    style: PropTypes.object,
    direction: PropTypes.string as PropType<StepsProps['direction']>,

    prefixCls: PropTypes.string,
    description: PropTypes.node,
    icon: PropTypes.node,
    status: PropTypes.string as PropType<StepsProps['status']>,
    title: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    done: PropTypes.bool,

    children: PropTypes.node as PropType<StepsProps['children']>,
    stepNumber: [PropTypes.number, PropTypes.string],
    onKeyDown: PropTypes.func,
    role: PropTypes.string,
    'aria-label': PropTypes.string,
};

const defaultProps = {
    type: 'fill',
    size: 'default'
};

export const vuePropsType = vuePropsMake<StepsProps>(propTypes, defaultProps)
const Steps = defineComponent((props, {}) => {
    const slots = useSlots()
    const childrenRef = ref<VNode[]>([])
    function renderComponent() {
        const { type, ...restProps } = props;
        switch (type) {
            case 'fill':
                return <FillSteps {...restProps} children={childrenRef.value}>
                    {{
                        default: slots.default
                    }}
                </FillSteps>;
            case 'basic':
                return <BasicSteps {...restProps} children={childrenRef.value}>
                    {{
                        default: slots.default
                    }}
                </BasicSteps>;
            case 'nav':
                return <NavSteps {...restProps} children={childrenRef.value}>
                    {{
                        default: slots.default
                    }}
                </NavSteps>;
            default:
                return null;
        }
    }
    return () => {
        childrenRef.value = slots.default?.()
        const { type } = props;
        return (
          <Context.Provider value={{ type }}>
              {renderComponent()}
          </Context.Provider>
        );
    }
}, {
    props: vuePropsType,
    name: 'Steps'
})


export default Steps
export {
    Step as StepsStep
}
