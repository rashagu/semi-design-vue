import { defineComponent, ref, h, Fragment, useSlots, CSSProperties, PropType, watch, VNode, reactive } from 'vue';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import PinCodeFoundation, {
  PinCodeAdapter,
  PinCodeBaseProps,
  PinCodeBaseState,
} from '@douyinfe/semi-foundation/pincode/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/pincode/constants';
import Input, { InputProps } from '../input';
import '@douyinfe/semi-foundation/pincode/pincode.scss';
import { CombineProps } from '../interface';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';

export interface PinCodeProps extends PinCodeBaseProps {
  className?: string;
  style?: CSSProperties;
  size?: InputProps['size'];
}

export interface PinCodeState extends PinCodeBaseState {}

const propTypes: CombineProps<PinCodeProps> = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string as PropType<PinCodeProps['size']>,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  format: PropTypes.node as PropType<PinCodeProps['format']>,
  onChange: {
    type: PropTypes.func as PropType<PinCodeProps['onChange']>,
    required: true,
  },
  defaultValue: PropTypes.string,
  count: PropTypes.number,
  autoFocus: PropTypes.bool,
  onComplete: PropTypes.func as PropType<PinCodeProps['onComplete']>,
};
const defaultProps = {
  count: 6,
  format: 'number',
  autoFocus: true,
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const PinCode = defineComponent({
  props: { ...vuePropsType },
  name: 'PinCode',
  setup(props, { attrs }) {
    const slots = useSlots();

    let inputDOMList = [];
    const state = reactive<PinCodeState>({
      valueList: ((props.value || props.defaultValue) && (props.value || props.defaultValue).split('')) || [],
      currentActiveIndex: 0,
    });
    const { adapter: adapterInject, setStateAsync } = useBaseComponent(props, state);
    watch([() => props.value], () => {
      foundation.updateValueList(props.value.split(''));
    });
    function adapter_(): PinCodeAdapter<PinCodeProps, PinCodeState> {
      return {
        ...adapterInject(),
        onCurrentActiveIndexChange: async (i) => {
          await setStateAsync({ currentActiveIndex: i });
        },
        notifyValueChange: (values: string[]) => {
          props.onChange?.(values.join(''));
        },
        changeSpecificInputFocusState: (index, state) => {
          if (state === 'focus') {
            inputDOMList[index]?.focus?.();
          } else if (state === 'blur') {
            inputDOMList[index]?.blur?.();
          }
        },
        updateValueList: async (valueList: PinCodeState['valueList']) => {
          await setStateAsync({ valueList });
        },
      };
    }
    const adapter = adapter_();
    const foundation = new PinCodeFoundation(adapter);

    const focus = (index: number) => {
      const inputDOM = inputDOMList[index];
      inputDOM?.focus();
      inputDOM?.setSelectionRange(1, 1);
    };

    const blur = (index: number) => {
      inputDOMList[index]?.blur();
    };

    const renderSingleInput = (index: number) => {
      return (
        <Input
          forwardRef={(dom: any) => (inputDOMList[index] = dom)}
          key={`input-${index}`}
          data-testid="pin-code-input"
          autoFocus={props.autoFocus && index === 0}
          value={state.valueList[index]}
          size={props.size}
          disabled={props.disabled}
          onBlur={() => foundation.handleCurrentActiveIndexChange(index, 'blur')}
          onFocus={() => foundation.handleCurrentActiveIndexChange(index, 'focus')}
          onPaste={(e) => foundation.handlePaste(e, index)}
          onKeyDown={(e) => {
            foundation.handleKeyDownOnSingleInput(e, index);
          }}
          onChange={(v) => {
            const userInputChar = v[v.length - 1];
            if (foundation.validateValue(userInputChar)) {
              foundation.completeSingleInput(index, userInputChar);
            }
          }}
        />
      );
    };

    return () => {
      const inputElements: VNode[] = [];
      for (let i = 0; i < props.count; i++) {
        inputElements.push(renderSingleInput(i));
      }
      return (
        <div class={cls(`${cssClasses.PREFIX}-wrapper`, props.className)} style={props.style}>
          {inputElements}
        </div>
      );
    };
  },
});

export default PinCode;
