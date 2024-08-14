import { hsvaToHslaString, hsvaToRgbaString } from '@douyinfe/semi-foundation/colorPicker/utils/convert';
import { round } from '@douyinfe/semi-foundation/colorPicker/utils/round';
import { cssClasses } from '@douyinfe/semi-foundation/colorPicker/constants';
import AlphaSliderFoundation, {
  AlphaSliderAdapter,
  AlphaSliderBaseProps,
  AlphaSliderBaseState,
} from '@douyinfe/semi-foundation/colorPicker/AlphaSliderFoundation';
import { CSSProperties, defineComponent, h, reactive, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';

export interface AlphaSliderProps extends AlphaSliderBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface AlphaSliderState extends AlphaSliderBaseState {}

export const vuePropsType: CombineProps<AlphaSliderProps> = {
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
  hsva: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
};
const AlphaSlider = defineComponent({
  props: { ...vuePropsType },
  name: 'AlphaSlider',
  setup(props, { attrs }) {
    const slots = useSlots();
    const dom = ref();
    const state = reactive<AlphaSliderState>({
      handlePosition: props.hsva.a * props.width - props.handleSize / 2,
      isHandleGrabbing: false,
    });
    const { adapter: adapterInject } = useBaseComponent(props, state);
    function adapter_(): AlphaSliderAdapter<AlphaSliderProps, AlphaSliderState> {
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
    const foundation = new AlphaSliderFoundation(adapter);

    watch([() => props.hsva.a, () => props.width, () => props.handleSize], (value, [prevPropsHsvaA], onCleanup) => {
      if (prevPropsHsvaA !== props.hsva.a) {
        state.handlePosition = props.hsva.a * props.width - props.handleSize / 2;
      }
    });
    const handleClick = (e: MouseEvent) => {
      foundation.setHandlePositionByMousePosition(e);
      foundation.handleMouseDown(e);
    };

    return () => {
      const colorFrom = hsvaToHslaString({ ...props.hsva, a: 0 });
      const colorTo = hsvaToHslaString({ ...props.hsva, a: 1 });

      const alphaSliderBackground = `linear-gradient(90deg, ${colorFrom}, ${colorTo})`;
      return (
        <div
          class={`${cssClasses.PREFIX}-alphaSlider`}
          ref={dom}
          aria-label="Alpha"
          aria-valuetext={`${round(props.hsva.a * 100)}%`}
          onMousedown={handleClick}
          style={{
            width: props.width + 'px',
            height: props.height + 'px',
            ...props.style,
          }}
        >
          <div class={`${cssClasses.PREFIX}-alphaSliderInner`} style={{ background: alphaSliderBackground }}>
            <div
              class={`${cssClasses.PREFIX}-alphaHandle`}
              style={{
                width: props.handleSize + 'px',
                height: props.handleSize + 'px',
                left: state.handlePosition + 'px',
                top: `50%`,
                transform: `translateY(-50%)`,
                backgroundColor: hsvaToRgbaString(props.hsva),
              }}
              onMousedown={(e) => foundation.handleMouseDown(e)}
            ></div>
          </div>
        </div>
      );
    };
  },
});

export default AlphaSlider;
