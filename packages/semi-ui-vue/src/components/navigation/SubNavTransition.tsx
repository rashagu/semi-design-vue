import {Transition} from '@kousum/semi-animation-vue/src/animation/index';
// import {Transition} from '../../../../semi-animation-vue/src/animation/index';
import * as PropTypes from '../PropTypes';
import {Motion} from '@douyinfe/semi-foundation/utils/type';
import {ref, h, VNode, FunctionalComponent, useSlots, defineComponent} from "vue";

const ease = 'cubicBezier(.25,.1,.25,1)';

const formatStyle = function formatStyle({maxHeight, opacity}: { maxHeight: number; opacity: number }) {
  return {
    maxHeight,
    opacity,
  };
};

export interface SubNavTransitionProps {
  isCollapsed?: boolean;
  maxHeight?: number;
  motion?: Motion;
}

export const vuePropsType = {
  isCollapsed: Boolean,
  maxHeight: Number,
  motion: [Object, Boolean],
}
const SubNavTransition = defineComponent<SubNavTransitionProps>((props, {}) => {


  const {isCollapsed, maxHeight = 999} = props;
  // eslint-disable-next-line no-unused-vars
  const immediate = ref(false);

  // useEffect(() => {
  //     setImmediate(isCollapsed);
  // }, [isCollapsed]);

  const slots = useSlots()

  return ()=>(
    <Transition
      from={{maxHeight: 0, opacity: 0}}
      enter={{
        maxHeight: {val: maxHeight, easing: 'easeInQuad', duration: 250},
        opacity: {val: 1, duration: 200, easing: 'cubic-bezier(0.5, -0.1, 1, 0.4)'},
      }}
      leave={{
        maxHeight: {val: 0, easing: ease, duration: 250},
        opacity: {
          val: 0,
          duration: isCollapsed ? 1 : 200, // Need to be fast and transparent when put away, otherwise there will be jumping
          easing: 'cubic-bezier(0.5, -0.1, 1, 0.4)',
        },
      }}
      immediate={immediate.value}
    >
      {(transitionStyle: { maxHeight: number; opacity: number }) => {

        // console.log(11,slots.default?.(formatStyle(transitionStyle)))
        return slots.default?.(formatStyle(transitionStyle))
      }}
    </Transition>
  );
})

SubNavTransition.props = vuePropsType

export default SubNavTransition


