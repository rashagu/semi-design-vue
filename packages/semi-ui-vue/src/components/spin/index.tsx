import {
  defineComponent,
  ref,
  h,
  StyleValue,
  onUnmounted,
  watch,
  reactive,
  ComponentObjectPropsOptions,
  PropType
} from 'vue'
import cls from 'classnames';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/spin/constants';
import SpinFoundation from '@douyinfe/semi-foundation/spin/foundation';
import SpinIcon from './icon';
import '@douyinfe/semi-foundation/spin/spin.scss';
import {useBaseComponent} from "../_base/baseComponent";

const prefixCls = css.PREFIX;

export type SpinSize = 'small' | 'large' | 'middle';

export interface SpinProps {
  size?: SpinSize;
  spinning?: boolean;
  indicator?: any | null;
  delay?: number;
  tip?: any;
  wrapperClassName?: string;
  style?: any;
  childStyle?: StyleValue;
}

interface SpinState {
  delay: number;
  loading: boolean;
}


/***
 *
 *         size: 'middle',
 *         spinning: true,
 *         children: null,
 *         indicator: null,
 *         delay: 0,
 */
export const VuePropsType:ComponentObjectPropsOptions<SpinProps> = {
  size: {
    type: String as PropType<SpinProps['size']>,
    default: 'middle',
  },
  spinning: {
    type: Boolean,
    default: true,
  },
  indicator: Object,
  delay: {
    type: Number,
    default: 0,
  },
  tip: [Object, String] as PropType<SpinProps['tip']>,
  wrapperClassName: String,
  style: Object,
  childStyle: Object,
}
const Index = defineComponent<SpinProps>((props, {slots}) => {

  const state = reactive<SpinState>({
    delay: props.delay,
    loading: true,
  })

  // ok
  function getDerivedStateFromProps(props: SpinProps) {
    if (!props.delay) {
      return {
        loading: props.spinning
      };
    }
    if (props.spinning === false) {
      return {
        delay: 0,
        loading: false
      };
    }
    return {
      delay: props.delay
    };
  }
  watch(()=>props, (val)=>{
    const newState = getDerivedStateFromProps(props)
    if (newState){
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key]
      })
    }
  }, {deep: true, immediate: true})


  const {adapter: adapterInject, getDataAttr} = useBaseComponent<SpinProps>(props, state)
  function adapter() {
    return {
      ...adapterInject<SpinProps, SpinState>(),
      setLoading: (value: boolean) => {
        state.loading = value
      }
    };
  }

  const foundation = ref(new SpinFoundation(adapter()))


  onUnmounted(()=>{
    foundation.value.destroy();
  })
  function renderSpin() {
    const { indicator, tip } = props;
    const { loading } = state;
    const spinIconCls = cls({
      [`${prefixCls}-animate`]: loading,
    });

    return (
      state.loading ? (
        <div class={`${prefixCls}-wrapper`}>
          {indicator ? <div class={spinIconCls} x-semi-prop="indicator">{indicator}</div> : <SpinIcon />}
          {tip ? <div x-semi-prop="tip">{tip}</div> : null}
        </div>
      ) : null
    );
  }




  return ()=>{
    foundation.value.updateLoadingIfNeedDelay();
    const { style, wrapperClassName, childStyle, size, ...rest } = props;
    const { loading } = state;
    return (
      <div
        class={
          cls(
            prefixCls,
            wrapperClassName,
            {
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-block`]: slots.default,
              [`${prefixCls}-hidden`]: !loading,
            }
          )
        }
        style={style}
        {...getDataAttr()}
      >
        {renderSpin()}
        <div class={`${prefixCls}-children`} style={childStyle} x-semi-prop="children">{slots.default?slots.default():null}</div>
      </div>
    );
  }
},{
  props:VuePropsType,
  name:'Spin'
})


export default Index
