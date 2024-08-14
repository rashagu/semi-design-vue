import { hsvaToHslString, hsvaToRgba } from '@douyinfe/semi-foundation/colorPicker/utils/convert';
import { cssClasses } from '@douyinfe/semi-foundation/colorPicker/constants';
import cls from 'classnames';
import ColorChooseAreaFoundation, {
  ColorChooseAreaAdapter,
  ColorChooseAreaBaseProps,
  ColorChooseAreaBaseState,
} from '@douyinfe/semi-foundation/colorPicker/ColorChooseAreaFoundation';
import { round } from '@douyinfe/semi-foundation/colorPicker/utils/round';
import { CSSProperties, defineComponent, h, PropType, reactive, ref, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';

export interface ColorChooseAreaProps extends ColorChooseAreaBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface ColorChooseAreaState extends ColorChooseAreaBaseState {}

export const vuePropsType: CombineProps<ColorChooseAreaProps> = {
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
  onChange: {
    type: Function as PropType<ColorChooseAreaProps['onChange']>,
    required: true,
  },
};
const ColorChooseArea = defineComponent({
  props: { ...vuePropsType },
  name: 'ColorChooseArea',
  setup(props, { attrs }) {
    const slots = useSlots();
    const dom = ref();
    const state = reactive<ColorChooseAreaState>({
      handlePosition: { x: 0, y: 0 },
      isHandleGrabbing: false,
    });
    const { adapter: adapterInject } = useBaseComponent(props, state);
    function adapter_(): ColorChooseAreaAdapter<ColorChooseAreaProps, ColorChooseAreaState> {
      return {
        ...adapterInject(),
        getColorPickerFoundation: () => props.foundation,
        handleMouseDown: (e: MouseEvent) => {
          state.isHandleGrabbing = true;
          dom.value?.addEventListener('mousemove', foundation.setHandlePositionByMousePosition);
          window.addEventListener('mouseup', foundation.handleMouseUp);
        },
        handleMouseUp: () => {
          dom.value?.removeEventListener('mousemove', foundation.setHandlePositionByMousePosition);
          window.removeEventListener('mouseup', foundation.handleMouseUp);
          state.isHandleGrabbing = false;
        },
        getDOM: () => dom.value,
        notifyChange: (newColor) => props.onChange(newColor),
      };
    }
    const adapter = adapter_();
    const foundation = new ColorChooseAreaFoundation(adapter);
    state.handlePosition = foundation.getHandlePositionByHSVA();

    watch(
      [() => props.hsva],
      (value, [prevPropsHsva], onCleanup) => {
        if (JSON.stringify(prevPropsHsva) !== JSON.stringify(props.hsva)) {
          state.handlePosition = foundation.getHandlePositionByHSVA();
        }
      },
      { deep: true }
    );

    const handleClick = (e: MouseEvent) => {
      foundation.setHandlePositionByMousePosition(e);
      foundation.handleMouseDown(e);
    };

    return () => {
      const areaBgStyle = hsvaToHslString({ h: props.hsva.h, s: 100, v: 100, a: 1 });
      const currentColor = hsvaToRgba(props.hsva);
      return (
        <div
          class={cls(`${cssClasses.PREFIX}-colorChooseArea`, props.className)}
          style={{
            backgroundColor: areaBgStyle,
            width: props.width + 'px',
            height: props.height + 'px',
            cursor: state.isHandleGrabbing ? 'grabbing' : 'pointer',
            ...props.style,
          }}
          ref={dom}
          aria-label="Color"
          onMousedown={handleClick}
          aria-valuetext={`Saturation ${round(props.hsva.s)}%, Brightness ${round(props.hsva.v)}%`}
        >
          <div
            class={`${cssClasses.PREFIX}-handle`}
            style={{
              width: props.handleSize + 'px',
              height: props.handleSize + 'px',
              left: state.handlePosition.x + 'px',
              top: state.handlePosition.y + 'px',
              backgroundColor: `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})`,
            }}
            onMousedown={(e) => foundation.handleMouseDown(e)}
          ></div>
        </div>
      );
    };
  },
});

export default ColorChooseArea;
