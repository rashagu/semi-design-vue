import {defineComponent, ref, h, StyleValue, onUnmounted} from 'vue'
import cls from 'classnames';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/spin/constants';
import SpinFoundation from '@douyinfe/semi-foundation/spin/foundation';
import SpinIcon from './Icon';
import '@douyinfe/semi-foundation/spin/spin.scss';
import {func} from "prop-types";

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


const Index = defineComponent<SpinProps>((props, {slots}) => {
  const loading = ref(true)
  const delay = ref(props.delay)
  const foundation = ref(new SpinFoundation(adapter()))


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

  function adapter() {
    return {
      setLoading: (value: boolean) => {
        loading.value = value
      }
    };
  }


  onUnmounted(()=>{
    foundation.value.destroy();
  })
  function renderSpin() {
    const { indicator, tip } = props;
    const spinIconCls = cls({
      [`${prefixCls}-animate`]: loading.value,
    });

    return (
      loading.value ? (
        <div class={`${prefixCls}-wrapper`}>
          {indicator ? <div class={spinIconCls}>{indicator}</div> : <SpinIcon />}
          {tip ? <div>{tip}</div> : null}
        </div>
      ) : null
    );
  }



  foundation.value.updateLoadingIfNeedDelay();
  const { style, wrapperClassName, childStyle, size } = props;

  return ()=>(
    <div class={cls(
      prefixCls,
      wrapperClassName,
      {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-block`]: slots.default,
        [`${prefixCls}-hidden`]: !loading.value,
      }
    )} style={style}>
      {renderSpin()}
      <div class={`${prefixCls}-children`} style={childStyle}>{slots.default?slots.default():null}</div>
    </div>
  );
})

/***
 *
 *         size: 'middle',
 *         spinning: true,
 *         children: null,
 *         indicator: null,
 *         delay: 0,
 */
export const VuePropsType = {
  size: {
    type: String,
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
  tip: Object,
  wrapperClassName: String,
  style: Object,
  childStyle: Object,
}

Index.props = VuePropsType

export default Index
