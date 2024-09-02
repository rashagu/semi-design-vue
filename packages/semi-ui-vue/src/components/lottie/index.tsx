import {
  CSSProperties,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  shallowRef,
  useSlots,
  watch,
} from 'vue';
import LottieFoundation, {
  LottieAdapter,
  LottieBaseProps,
  LottieBaseState,
} from '@douyinfe/semi-foundation/lottie/foundation';
import { CombineProps } from '../interface';
import * as PropTypes from '../PropTypes';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { cssClasses } from '@douyinfe/semi-foundation/lottie/constants';
import { isEqual } from 'lodash';
import cls from 'classnames';
export type { LottiePlayer } from 'lottie-web';

export interface LottieProps extends LottieBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface LottieState extends LottieBaseState {}

const propTypes: CombineProps<LottieProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  params: {
    type: PropTypes.object as PropType<LottieProps['params']>,
    required: true,
  },
  getAnimationInstance: PropTypes.func as PropType<LottieProps['getAnimationInstance']>,
  getLottie: PropTypes.func as PropType<LottieProps['getLottie']>,
};
const defaultProps = {
  count: 6,
  format: 'number',
  autoFocus: true,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const index = defineComponent({
  props: { ...vuePropsType },
  name: 'Lottie',
  setup(props, { expose }) {
    const slots = useSlots();
    const container = shallowRef();
    const state = reactive<LottieState>({});
    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): LottieAdapter<LottieProps, LottieState> {
      const getContainer = () => {
        return props.params.container ?? container.value;
      };
      return {
        ...adapterInject(),
        getContainer,
        getLoadParams: () => {
          return {
            container: getContainer(),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            ...props.params,
          };
        },
      };
    }
    const adapter = adapter_();
    const foundation = new LottieFoundation(adapter);
    onMounted(() => {
      foundation.init();
      props.getAnimationInstance?.(foundation.animation);
    });
    onUnmounted(()=>{
      foundation.destroy();
    })

    expose({
      getLottie(){
        return LottieFoundation.getLottie;
      }
    })

    watch(
      () => props.params,
      (value, oldValue, onCleanup) => {
        if (!isEqual(value, oldValue)) {
          foundation.handleParamsUpdate();
        }
      }
    );

    function wrapperStyle() {
      return {
        width: props.width,
        height: props.height,
        ...props.style,
      };
    }

    function wrapperClassName() {
      return cls(cssClasses.PREFIX, props.className);
    }

    return () => {
      if (props.params.container) {
        return null;
      } else {
        return <div ref={container} style={wrapperStyle()} class={wrapperClassName()} {...getDataAttr()}></div>;
      }
    };
  },
});

export default index;
