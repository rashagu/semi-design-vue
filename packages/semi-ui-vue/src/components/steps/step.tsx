import type { ComponentObjectPropsOptions, CSSProperties } from 'vue';
import { defineComponent, h, PropType } from 'vue';
import BasicStep from './basicStep';
import FillStep from './fillStep';
import * as PropTypes from '../PropTypes';
import NavStep from './navStep';
import { useStepsContext } from './context/Consumer';
import { VueJsxNode } from '../interface';

export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';

export interface StepProps {
  description?: VueJsxNode;
  icon?: VueJsxNode;
  status?: Status;
  title?: VueJsxNode;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
}

export const vuePropsType: ComponentObjectPropsOptions<Required<StepProps>> = {
  description: PropTypes.node,
  icon: PropTypes.node,
  status: PropTypes.string as PropType<StepProps['status']>,
  title: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func as PropType<StepProps['onClick']>,
};
const Step = defineComponent({
  props: vuePropsType,
  name: 'Step',
  setup(props, {}) {
    const { context } = useStepsContext();
    const renderStep = () => {
      switch (context.value.type) {
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

    return () => {
      return renderStep();
    };
  },
});

export default Step;
