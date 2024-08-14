import { HsvaColor, RgbaColor } from '@douyinfe/semi-foundation/colorPicker/interface';
import Input from '../../input';
import InputGroup from '../../input/inputGroup';
import InputNumber from '../../inputNumber';
import Select from '../../select';
import Button from '../../button';
import ColorPickerFoundation from '@douyinfe/semi-foundation/colorPicker/foundation';
import { isEqual } from 'lodash';
import { IconEyedropper } from '@kousum/semi-icons-vue';
import { cssClasses } from '@douyinfe/semi-foundation/colorPicker/constants';
import DataPartFoundation, {
  DataPartAdapter,
  DataPartBaseProps,
  DataPartBaseState,
} from '@douyinfe/semi-foundation/colorPicker/DataPartFoundation';
import { CSSProperties, defineComponent, h, onMounted, PropType, reactive, useSlots, watch } from 'vue';
import { CombineProps } from '../../interface';
import { useBaseComponent } from '../../_base/baseComponent';

export interface DataPartProps extends DataPartBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface DataPartState extends DataPartBaseState {}

export const vuePropsType: CombineProps<DataPartProps> = {
  className: String,
  style: Object,
  alpha: Boolean,
  currentColor: {
    type: Object,
    required: true,
  },
  defaultFormat: {
    type: String as PropType<DataPartProps['defaultFormat']>,
    required: true,
  },
  eyeDropper: {
    type: Boolean,
    required: true,
  },
  foundation: {
    type: Object as PropType<DataPartProps['foundation']>,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
};
const DataPart = defineComponent({
  props: { ...vuePropsType },
  name: 'DataPart',
  setup(props, { attrs }) {
    const slots = useSlots();

    const state = reactive<DataPartState>({
      format: props.defaultFormat,
      inputValue: '',
    });

    const { adapter: adapterInject } = useBaseComponent(props, state);
    function adapter_(): DataPartAdapter<DataPartProps, DataPartState> {
      return {
        ...adapterInject(),
        getColorPickerFoundation: () => props.foundation,
      };
    }
    const adapter = adapter_();
    const foundation = new DataPartFoundation(adapter);
    onMounted(() => {
      foundation.handleInputValueChange(foundation.getInputValue());
    });

    watch(
      [() => props.currentColor, () => state.format],
      (value, [prevPropsCurrentColor, prevStateFormat], onCleanup) => {
        if (!isEqual(prevPropsCurrentColor, props.currentColor) || prevStateFormat !== state.format) {
          foundation.handleInputValueChange(foundation.getInputValue());
        }
      }
    );
    const handleChange = (newColor: RgbaColor | HsvaColor | string) => {
      props.foundation.handleChange(newColor, state.format);
    };

    return () => {
      const rgba = props.currentColor.rgba;
      return (
        <div class={`${cssClasses.PREFIX}-dataPart`} style={{ width: props.width + 'px' }}>
          <div
            class={`${cssClasses.PREFIX}-colorDemoBlock`}
            style={{
              minWidth: '20px',
              minHeight: '20px',
              backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
            }}
          ></div>
          <InputGroup size={'small'} className={`${cssClasses.PREFIX}-inputGroup`}>
            <Input
              className={`${cssClasses.PREFIX}-colorPickerInput`}
              value={state.inputValue}
              onChange={(v) => {
                const value = foundation.getValueByInputValue(v);
                if (value) {
                  handleChange(value);
                }
                foundation.handleInputValueChange(v);
              }}
            />
            {props.alpha && (
              <InputNumber
                min={0}
                max={100}
                className={`${cssClasses.PREFIX}-colorPickerInputNumber`}
                value={Number(Math.round(props.currentColor.rgba.a * 100))}
                onNumberChange={(v) => {
                  if (state.format === 'rgba') {
                    handleChange({ ...props.currentColor.rgba, a: Number((v / 100).toFixed(2)) });
                  } else if (state.format === 'hex') {
                    const rgba = { ...props.currentColor.rgba, a: Number((v / 100).toFixed(2)) };
                    const hex = ColorPickerFoundation.rgbaToHex(rgba);
                    handleChange(hex);
                  } else if (state.format === 'hsva') {
                    const rgba = { ...props.currentColor.hsva, a: Number((v / 100).toFixed(2)) };
                    handleChange(rgba);
                  }
                }}
                suffix={<span class={`${cssClasses.PREFIX}-inputNumberSuffix`}>%</span>}
                hideButtons={true}
              />
            )}
            <Select
              className={`${cssClasses.PREFIX}-formatSelect`}
              size={'small'}
              value={state.format}
              onSelect={(v) => foundation.handleFormatChange(v as any)}
              optionList={['hex', 'rgba', 'hsva'].map((type) => ({ label: type, value: type }))}
            />
          </InputGroup>

          {props.eyeDropper && (
            <Button
              type={'tertiary'}
              theme={'light'}
              size={'small'}
              onClick={foundation.handlePickValueWithStraw}
              icon={<IconEyedropper />}
            />
          )}
        </div>
      );
    };
  },
});

export default DataPart;
