
import { Transition } from '@kousum/semi-animation-vue';
import * as PropTypes from '../PropTypes';
import {VNode, h, Fragment, defineComponent, ref, onMounted, isVNode, cloneVNode} from "vue";

const formatStyle = function formatStyle({ rotate = 0 }) {
    return {
        transform: `rotate(${Math.ceil(rotate)}deg)`,
    };
};

export interface OpenIconTransitionProps {
    isCollapsed?: boolean;
    isOpen?: boolean;
}

export const vuePropsType = {
    isOpen: PropTypes.bool,
    children: PropTypes.any,
}
const OpenIconTransition = defineComponent<OpenIconTransitionProps>((props, {slots}) => {
    const { isOpen } = props;

    const immediate = ref(true);

    onMounted(()=>{
        immediate.value = false
    })

    return () => {
        const children = slots.default?.()
        return (
          <Transition
            immediate={immediate.value}
            state={isOpen ? 'enter' : 'leave'}
            from={{ rotate: 0 }}
            enter={{ rotate: { val: 180, duration: 200, easing: 'cubic-bezier(.62, .05, .36, .95)' } }}
            leave={{ rotate: { val: 0, duration: 200, easing: 'cubic-bezier(.62, .05, .36, .95)' } }}
          >
              {(transitionStyle: any) => {
                  const formatedStyle = formatStyle(transitionStyle);
                  // TODO
                  // if (typeof children === 'function') {
                  //     return children(formatedStyle);
                  // }
                  if (isVNode(children)) {
                      return cloneVNode(children, {
                          style: {
                              ...(children.props && children.props.style),
                              ...formatedStyle,
                          },
                      });
                  }
                  return children;
              }}
          </Transition>
        )
    }
})

OpenIconTransition.props = vuePropsType

export default OpenIconTransition

