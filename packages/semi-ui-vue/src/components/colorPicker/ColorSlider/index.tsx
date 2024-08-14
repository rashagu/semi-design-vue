import ColorPickerFoundation from '@douyinfe/semi-foundation/colorPicker/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/colorPicker/constants';
import cls from 'classnames';
import ColorSliderFoundation, {
  ColorSliderAdapter,
  ColorSliderBaseProps,
  ColorSliderBaseState,
} from '@douyinfe/semi-foundation/colorPicker/ColorSliderFoundation';
import { useBaseComponent } from '../../_base/baseComponent';
import { CSSProperties, defineComponent, h, reactive, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';

export interface ColorSliderProps extends ColorSliderBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface ColorSliderState extends ColorSliderBaseState {}

export const vuePropsType: CombineProps<ColorSliderProps> = {
  className: String,
  style: Object,
  foundation: {
    type: Object,
    required: true,
  },
  handleSize: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  hue: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
};
const ColorSlider = defineComponent({
  props: { ...vuePropsType },
  name: 'ColorSlider',
  setup(props, { attrs }) {
    const slots = useSlots();
    const dom = ref();
    const state = reactive<ColorSliderState>({
      handlePosition: (props.hue / 360) * props.width - props.handleSize / 2,
      isHandleGrabbing: false,
    });
    const { adapter: adapterInject } = useBaseComponent(props, state);
    function adapter_(): ColorSliderAdapter<ColorSliderProps, ColorSliderState> {
      return {
        ...adapterInject(),
        handleMouseDown: (e: any) => {
          state.isHandleGrabbing = true;
          window.addEventListener('mousemove', foundation.setHandlePositionByMousePosition);
          window.addEventListener('mouseup', foundation.handleMouseUp);
        },
        handleMouseUp: (e: MouseEvent) => {
          state.isHandleGrabbing = false;
          window.removeEventListener('mousemove', foundation.setHandlePositionByMousePosition);
          window.removeEventListener('mouseup', foundation.handleMouseUp);
        },
        getColorPickerFoundation: () => props.foundation,
        getDOM: () => dom.value,
      };
    }
    const adapter = adapter_();
    const foundation = new ColorSliderFoundation(adapter);

    watch([() => props.hue], (value, [prevPropsHue], onCleanup) => {
      if (prevPropsHue !== props.hue) {
        state.handlePosition = (props.hue / 360) * props.width - props.handleSize / 2;
      }
    });
    const handleClick = (e: MouseEvent) => {
      foundation.setHandlePositionByMousePosition(e);
      foundation.handleMouseDown(e);
    };

    return () => {
      return (
        <div
          class={cls(`${cssClasses.PREFIX}-colorSlider`, props.className)}
          ref={dom}
          onMousedown={handleClick}
          style={{
            width: props.width + 'px',
            height: props.height + 'px',
            ...props.style,
          }}
        >
          <div
            class={`${cssClasses.PREFIX}-handle`}
            style={{
              width: props.handleSize + 'px',
              height: props.handleSize + 'px',
              left: state.handlePosition + 'px',
              top: `50%`,
              transform: `translateY(-50%)`,
              backgroundColor: ColorPickerFoundation.hsvaToHslString({ h: props.hue, s: 100, v: 100, a: 1 }),
            }}
            onMousedown={(e) => foundation.handleMouseDown(e)}
          ></div>
        </div>
      );
    };
  },
});

export default ColorSlider;
