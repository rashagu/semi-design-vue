import ColorPickerFoundation, {
  ColorPickerProps,
  ColorPickerState,
} from '@douyinfe/semi-foundation/colorPicker/foundation';
import { PopoverProps } from '../popover';
import ColorChooseArea from './ColorChooseArea';
import { ColorPickerAdapter, ColorValue } from '@douyinfe/semi-foundation/colorPicker/foundation';
import AlphaSlider from './AlphaSlider';
import ColorSlider from './ColorSlider';
import DataPart from './DataPart';
import cls from 'classnames';
import '@douyinfe/semi-foundation/colorPicker/colorPicker.scss';
import { cssClasses } from '@douyinfe/semi-foundation/colorPicker/constants';
import Popover from '../popover';
import {
  hexToHsva,
  hexToRgba,
  hsvaStringToHsva,
  hsvaToHex,
  hsvaToRgba,
  rgbaStringToHsva,
  rgbaStringToRgba,
  rgbaToHex,
  rgbStringToHsva,
  rgbStringToRgba,
} from '@douyinfe/semi-foundation/colorPicker/utils/convert';
import { CSSProperties, defineComponent, h, PropType, reactive, useSlots, VNode } from 'vue';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';

export interface ColorPickerReactProps extends ColorPickerProps {
  usePopover?: boolean;
  popoverProps?: PopoverProps;
  className?: string;
  style?: CSSProperties;
  bottomSlot?: VNode;
  topSlot?: VNode;
}

export interface ColorPickerReactState extends ColorPickerState {}

export const propsType: CombineProps<ColorPickerReactProps> = {
  alpha: {
    type: Boolean,
    required: true,
  },
  bottomSlot: [Object] as PropType<ColorPickerReactProps['bottomSlot']>,
  className: String,
  defaultFormat: {
    type: String as PropType<ColorPickerReactProps['defaultFormat']>,
    required: true,
  },
  defaultValue: Object as PropType<ColorPickerReactProps['defaultValue']>,
  eyeDropper: Boolean,
  height: Number,
  onChange: {
    type: Function as PropType<ColorPickerReactProps['onChange']>,
    required: true,
  },
  popoverProps: Object as PropType<ColorPickerReactProps['popoverProps']>,
  style: Object,
  topSlot: Object,
  usePopover: Boolean,
  value: Object,
  width: Number,
};
const defaultProps = {
  defaultValue: {
    hsva: { h: 176, s: 71, v: 77, a: 1 },
    rgba: { r: 57, g: 197, b: 187, a: 1 },
    hex: '#39c5bb',
  },
  eyeDropper: true,
  defaultFormat: 'hex',
};

const vuePropsType = vuePropsMake(propsType, defaultProps);
const ColorPicker = defineComponent({
  props: { ...vuePropsType },
  name: 'ColorPicker',
  setup(props, { attrs, expose }) {
    const slots = useSlots();
    const initValue = props.value ?? props.defaultValue;
    const state = reactive<ColorPickerReactState>({
      currentColor: initValue,
    });
    const { adapter: adapterInject } = useBaseComponent(props, state)
    function adapter_(): ColorPickerAdapter<ColorPickerReactProps, ColorPickerReactState> {
      return {
        ...adapterInject(),
        notifyChange: (value) => {
          props.onChange?.(value);
        },
      };
    }
    const adapter = adapter_();
    const foundation = new ColorPickerFoundation(adapter)
    const colorStringToValue = (raw: string) => {
      if (raw.startsWith('#')) {
        return {
          hsva: hexToHsva(raw),
          rgba: hexToRgba(raw),
          hex: raw,
        };
      } else if (raw.startsWith('rgba')) {
        const rgba = rgbaStringToRgba(raw);
        return {
          hsva: rgbaStringToHsva(raw),
          rgba: rgba,
          hex: rgbaToHex(rgba),
        };
      } else if (raw.startsWith('rgb')) {
        const rgba = rgbStringToRgba(raw);
        return {
          hsva: rgbStringToHsva(raw),
          rgba: rgba,
          hex: rgbaToHex(rgba),
        };
      } else if (raw.startsWith('hsv')) {
        const hsva = hsvaStringToHsva(raw);
        const rgba = hsvaToRgba(hsva);
        const hex = hsvaToHex(hsva);
        return {
          hsva,
          rgba,
          hex,
        };
      } else {
        throw new Error('Semi ColorPicker: error on static colorStringToValue method, input value is invalid: ' + raw);
      }
    };
    expose({
      colorStringToValue
    })


    function renderPicker() {
      const { className: userClassName } = props;
      const className = cls(`${cssClasses.PREFIX}`, userClassName);
      const currentColor = foundation.getCurrentColor();
      return (
        <div class={className} {...attrs}>
          {props.topSlot}
          <ColorChooseArea
            hsva={currentColor.hsva}
            foundation={foundation}
            onChange={({ s, v }) => {
              foundation.handleChange(
                {
                  s,
                  v,
                  a: currentColor.hsva.a,
                  h: currentColor.hsva.h,
                },
                'hsva'
              );
            }}
            handleSize={20}
            width={props.width ?? 280}
            height={props.height ?? 280}
          />
          <ColorSlider
            width={props.width ?? 280}
            height={10}
            handleSize={18}
            hue={currentColor.hsva.h}
            class={'colorSliderWrapper'}
            foundation={foundation}
          />
          {props.alpha && (
            <AlphaSlider
              width={props.width ?? 280}
              height={10}
              handleSize={18}
              hsva={currentColor.hsva}
              class={'alphaSliderWrapper'}
              foundation={foundation}
            />
          )}
          <DataPart
            currentColor={currentColor}
            eyeDropper={props.eyeDropper}
            alpha={props.alpha}
            width={props.width ?? 280}
            foundation={foundation}
            defaultFormat={props.defaultFormat}
          />
          {props.bottomSlot}
        </div>
      );
    }
    return () => {
      const currentColor = foundation.getCurrentColor();
      if (props.usePopover) {
        return (
          <Popover
            {...props.popoverProps}
            className={cls(`${cssClasses.PREFIX}-popover`, props.popoverProps?.className)}
            content={renderPicker()}
          >
            {slots.default?.() ?? (
              <div
                {...attrs}
                style={{ backgroundColor: currentColor.hex }}
                class={cls(`${cssClasses.PREFIX}-popover-defaultChildren`)}
              ></div>
            )}
          </Popover>
        );
      } else {
        return renderPicker();
      }
    };
  },
});

export type { ColorValue };
export * from '@douyinfe/semi-foundation/colorPicker/interface';

export default ColorPicker;
