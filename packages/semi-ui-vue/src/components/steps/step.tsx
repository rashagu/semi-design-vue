
import BasicStep from './basicStep';
import FillStep from './fillStep';
import NavStep from './navStep';
import Context from './context';
import {useStepsContext} from "./context/Consumer";
import {CSSProperties, FunctionalComponent, h} from "vue";
import {VueJsxNode} from "../interface";
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';

export interface StepProps {
    description?: VueJsxNode;
    icon?: VueJsxNode;
    status?: Status;
    title?: VueJsxNode;
    className?: string;
    style?: CSSProperties;
    onClick?: any
}

const Step:FunctionalComponent<StepProps> = (props) => {
    const {context} =  useStepsContext()
    const { type } = context.value;
    const renderStep = () => {
        switch (type) {
            case 'fill':
                return <FillStep {...props} />;
            case 'basic':
                return <BasicStep {...props} />;
            case 'nav':
                return <NavStep {...props} />;
            default:
                return null;
        }
    };

    return renderStep();
};

export default Step;
