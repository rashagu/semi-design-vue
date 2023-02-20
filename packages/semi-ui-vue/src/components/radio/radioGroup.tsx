import {
  defineComponent,
  ref,
  h,
  Fragment,
  CSSProperties,
  VNode,
  reactive,
  onMounted,
  watch,
  onUnmounted,
  cloneVNode, isVNode
} from 'vue'

import classnames from 'classnames';
import { noop } from 'lodash';

import { radioGroupClasses as css, strings } from '@douyinfe/semi-foundation/radio/constants';
import RadioGroupFoundation, { RadioGroupAdapter } from '@douyinfe/semi-foundation/radio/radioGroupFoundation';
import { RadioChangeEvent } from '@douyinfe/semi-foundation/radio/radioInnerFoundation';

import {useBaseComponent} from '../_base/baseComponent';
import { ArrayElement } from '../_base/base';
import Radio, {RadioProps, RadioState, RadioType} from './radio';
import Context, { RadioGroupButtonSize, RadioMode } from './context';

export interface OptionItem {
  label?: VNode | string;
  value?: string | number;
  disabled?: boolean;
  extra?: VNode | string;
  style?: CSSProperties;
  className?: string;
}
export type Options = string[] | Array<OptionItem>;

export type RadioGroupProps = {
  defaultValue?: string | number;
  disabled?: boolean;
  name?: string;
  options?: Options;
  value?: string | number;
  onChange?: (event: RadioChangeEvent) => void;
  className?: string;
  style?: CSSProperties;
  direction?: ArrayElement<typeof strings.DIRECTION_SET>;
  mode?: RadioMode;
  type?: RadioType;
  buttonSize?: RadioGroupButtonSize;
  prefixCls?: string;
  'aria-label'?: any;
  'aria-describedby'?: any;
  'aria-errormessage'?: any;
  'aria-invalid'?: any;
  'aria-labelledby'?: any;
  'aria-required'?: any
  id?: string;
};

export interface RadioGroupState {
  value?: any;
}

export const vuePropsType = {
  'onUpdate:value': Function,
  defaultValue: {
    type: [String, Number],
// @ts-ignore
    default: undefined,
  },
  disabled: {type:Boolean,default:false},
  name: String,
  options: [Object, Array],
  value: {
    type: [String, Number],
// @ts-ignore
    default: undefined,
  },
  onChange: {type:Function,default:noop},
  className: String,
  style: [Object, String],
  direction: {
    type: [String, Object,Array,Boolean],
    default: strings.DEFAULT_DIRECTION,
  },
  mode: {type: String, default:''},
  type: {type:String, default:strings.TYPE_DEFAULT},
  buttonSize: {type:String,default:'middle'},
  prefixCls: String,
  'aria-label': String,
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': [String, Boolean],
  id: String
}


const RadioGroup = defineComponent<RadioGroupProps>((props, {slots}) => {

  const onUpdateValueFunc = props["onUpdate:value"]
  // console.log(props)
  let foundation: RadioGroupFoundation;
  const state = reactive({
    value: undefined,
  })
  const {adapter: adapterInject} = useBaseComponent<RadioGroupProps>(props, state)

  const theAdapter = adapter()
  function adapter(): RadioGroupAdapter {
    return {
      ...adapterInject<RadioGroupProps, RadioGroupState>(),
      setValue: (value: any) => {
        // console.log(value)
        state.value = value
      },
      // getProps: () => props,
      isInProps: (name: string) => {
        return Boolean(name in props) && props[name] !== undefined
      },
      notifyChange: (evt: RadioChangeEvent) => {
        props.onChange && props.onChange(evt);
      },
    };
  }
  foundation = new RadioGroupFoundation(theAdapter);

  onMounted(()=>{
    foundation.init();
  })

  watch(()=>props.value,(prevPropsValue, nextPropsValue)=>{
    if (prevPropsValue !== nextPropsValue) {
      foundation.handlePropValueChange(props.value);
    }
  })

  onUnmounted(()=>{
    foundation.destroy();
  })


  const onChange = (evt: RadioChangeEvent) => {
    // console.error(evt.target.value)
    if (onUpdateValueFunc){
      onUpdateValueFunc(evt.target.value)
    }
    foundation.handleChange(evt);
  };

  const getFormatName = () => props.name || 'default';

  return () => {

    const children = slots.default?slots.default():null;
    const {
      options,
      mode,
      prefixCls,
      className,
      style,
      direction,
      type,
      buttonSize,
      id,
    } = props;

    const isButtonRadio = type === strings.TYPE_BUTTON;
    const isPureCardRadio = type === strings.TYPE_PURECARD;
    const isCardRadio = type === strings.TYPE_CARD || isPureCardRadio;
    const isDefaultRadio = type === strings.TYPE_DEFAULT;

    const prefix = prefixCls || css.PREFIX;
    const prefixClsDisplay = classnames(className, {
      [prefix]: true,
      [`${prefix}-wrapper`]: true,
      [`${prefix}-${direction}`]: direction && !isButtonRadio,
      [`${prefix}-${direction}-default`]: direction && isDefaultRadio,
      [`${prefix}-${direction}-card`]: direction && isCardRadio,
      [`${prefix}-buttonRadio`]: isButtonRadio,
    });

    const realValue = state.value;

    let inner:any;
    // // console.log(options, children)
    if (options) {
      inner = (options || []).map((option, index) => {
        if (typeof option === 'string') {
          return (
            <Radio
              key={index}
              disabled={props.disabled}
              value={option}
            >
              {option}
            </Radio>
          );
        } else {
          return (
            <Radio
              key={index}
              disabled={option.disabled || props.disabled}
              value={option.value}
              extra={option.extra}
              className={option.className}
              style={option.style}
            >
              {option.label}
            </Radio>
          );
        }
      });
    } else if (children) {
      // TODO React???
      inner = children.map((itm, index) => (isVNode(itm) ?
        cloneVNode(itm, { key: index }) :
        null));
    }

    // console.log(realValue)
    return (
      <div
        class={prefixClsDisplay}
        style={style}
        id={id}
        aria-label={props['aria-label']}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        aria-required={props['aria-required']}
      >
        <Context
          value={{
            radioGroup: {
              onChange: onChange,
              value: realValue,
              disabled: props.disabled,
              name: getFormatName(),
              isButtonRadio,
              isCardRadio,
              isPureCardRadio,
              buttonSize,
              prefixCls
            },
            mode
          }}
        >
          {{
            default: ()=> {
              return inner
            }
          }}
        </Context>
      </div>
    );
  }
})

RadioGroup.props = vuePropsType
RadioGroup.name = "RadioGroup"

export default RadioGroup

