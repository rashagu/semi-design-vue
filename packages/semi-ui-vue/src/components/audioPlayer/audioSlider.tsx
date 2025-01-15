import cls from 'classnames';
import '@douyinfe/semi-foundation/audioPlayer/audioPlayer.scss';
import { cssClasses } from '@douyinfe/semi-foundation/audioPlayer/constants';
import Tooltip from '../tooltip';
import { formatTime } from './utils';
import { noop } from 'lodash';
import { AudioPlayerTheme } from './index';
import { defineComponent, h, PropType, reactive, shallowRef, useSlots } from 'vue';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { styleNum } from '../_utils';

interface AudioSliderProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  max?: number;
  vertical?: boolean;
  width?: number | string;
  height?: number | string;
  showTooltip?: boolean;
  disabled?: boolean;
  theme?: AudioPlayerTheme;
}

interface AudioSliderState {
  isDragging: boolean;
  movingInfo: { progress: number; offset: number } | null;
  isHovering: boolean;
}
const prefixCls = cssClasses.PREFIX;
const propTypes: CombineProps<AudioSliderProps> = {
  value: {
    type: Number,
    required: true,
  },
  onChange: Function as PropType<AudioSliderProps['onChange']>,
  className: String,
  max: Number,
  vertical: Boolean,
  width: [Number, String],
  height: [Number, String],
  showTooltip: Boolean,
  disabled: Boolean,
  theme: String as PropType<AudioSliderProps['theme']>,
};
const defaultProps = {
  value: 0,
  onChange: noop,
  max: 100,
  vertical: false,
  width: '100%',
  height: 4,
  showTooltip: true,
  disabled: false,
  theme: 'dark',
};

const vuePropsType = vuePropsMake(propTypes, defaultProps);
const AudioSlider = defineComponent({
  props: { ...vuePropsType },
  name: 'AudioSlider',
  setup(props, { attrs }) {
    const slots = useSlots();

    const sliderRef = shallowRef<HTMLDivElement>();
    const handleRef = shallowRef<HTMLDivElement>();
    const state = reactive({
      isDragging: false,
      isHovering: false,
      movingInfo: null,
    });

    const handleMouseEnter = (e: MouseEvent) => {
      state.isHovering = true;
      handleMouseEvent(e, false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      state.isDragging = true;
      handleMouseEvent(e, true);
    };

    const handleMouseUp = () => {
      if (state.isDragging) {
        state.isDragging = false;
      }
    };

    const handleMouseEvent = (e: MouseEvent, shouldSetValue: boolean = true) => {
      if (!sliderRef.value || props.disabled) return;
      const rect = sliderRef.value.getBoundingClientRect();
      const offset = props.vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
      const total = props.vertical ? rect.height : rect.width;
      const percentage = Math.min(Math.max(offset / total, 0), 1);
      const value = percentage * props.max;
      if (shouldSetValue && (state.isDragging || e.type === 'mousedown')) {
        props.onChange(value);
      }

      state.movingInfo = {
        progress: percentage,
        offset: props.vertical ? offset - rect.height / 2 : offset - rect.width / 2,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMouseEvent(e, true);
    };

    const handleMouseLeave = () => {
      state.isHovering = false;
      state.isDragging = false;
    };

    return () => {
      const { vertical, width, height, showTooltip, max, value: currentValue, theme } = props;
      const { movingInfo, isHovering } = state;
      const sliderContent = (
        <div
          onMousedown={handleMouseDown}
          onMouseup={handleMouseUp}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          onMousemove={handleMouseMove}
          class={cls(`${prefixCls}-slider-wrapper`, {
            [`${prefixCls}-slider-wrapper-vertical`]: vertical,
            [`${prefixCls}-slider-wrapper-horizontal`]: !vertical,
          })}
        >
          <div
            ref={sliderRef}
            class={cls(`${prefixCls}-slider`, `${prefixCls}-slider-${theme}`, {
              [`${prefixCls}-slider-vertical`]: vertical,
              [`${prefixCls}-slider-horizontal`]: !vertical,
            })}
            style={{
              width: styleNum(vertical ? (isHovering ? 8 : 4) : width),
              height: styleNum(vertical ? height : isHovering ? 8 : 4),
            }}
          >
            <div
              class={cls(`${prefixCls}-slider-progress`, {
                [`${prefixCls}-slider-progress-vertical`]: vertical,
                [`${prefixCls}-slider-progress-horizontal`]: !vertical,
              })}
              style={{
                height: vertical ? `${(currentValue / max) * 100}%` : '100%',
                width: vertical ? '100%' : `${(currentValue / max) * 100}%`,
              }}
            />
            <div
              ref={handleRef}
              class={cls(`${prefixCls}-slider-dot`)}
              style={{
                left: vertical ? '50%' : `calc(${(currentValue / max) * 100}% - 8px)`,
                bottom: vertical ? `calc(${(currentValue / max) * 100}% - 8px)` : undefined,
                top: vertical ? undefined : '50%',
                transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)',
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      );

      return showTooltip ? (
        <Tooltip
          position={vertical ? 'right' : 'top'}
          autoAdjustOverflow
          content={formatTime(movingInfo?.progress * max)}
          style={{
            [vertical ? 'top' : 'left']: styleNum(movingInfo?.offset),
          }}
        >
          {sliderContent}
        </Tooltip>
      ) : (
        sliderContent
      );
    };
  },
});

export default AudioSlider;
