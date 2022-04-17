import {
  defineComponent,
  ref,
  h,
  Fragment,
  useSlots,
  VNode,
  CSSProperties,
  reactive,
  onMounted,
  watch,
  onUnmounted, cloneVNode
} from 'vue'


import classnames from 'classnames';
import { checkboxGroupClasses as css, strings } from '@douyinfe/semi-foundation/checkbox/constants';
import CheckboxGroupFoundation, { CheckboxGroupAdapter } from '@douyinfe/semi-foundation/checkbox/checkboxGroupFoundation';
import BaseComponent, {useBaseComponent} from '../_base/BaseComponent';
import CheckboxContextProvider, { Context } from './Context';
import { isEqual } from 'lodash';
import Checkbox from './Checkbox';
import type { CheckboxEvent } from './Checkbox';
import {AriaAttributes} from "../AriaAttributes";

export type CheckboxDirection = 'horizontal' | 'vertical';
export type CheckboxType = 'default' | 'card' | 'pureCard';

export type CheckboxGroupProps = {
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  'aria-required'?: AriaAttributes['aria-required'];
  defaultValue?: any[];
  disabled?: boolean;
  name?: string;
  options?: any[];
  value?: any[];
  onChange?: (value: any[]) => void;
  children?: VNode | string;
  prefixCls?: string;
  direction?: CheckboxDirection;
  style?: CSSProperties;
  className?: string;
  type?: CheckboxType;
  id?: string;
  'aria-label'?: AriaAttributes['aria-label'];
};

export type CheckboxGroupState = {
  value?: any[];
};

export const vuePropsType = {
  'aria-describedby': String,
  'aria-errormessage': String,
  'aria-invalid': String,
  'aria-labelledby': String,
  'aria-required': String,
  defaultValue: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: String,
  options: Array,
  value: Array,
  onChange: {
    type: Function,
    default: () => {},
  },
  prefixCls: String,
  direction: {type:String, default:strings.DEFAULT_DIRECTION},
  style: [Object,String],
  className:String,
  type: {type:String,default:strings.TYPE_DEFAULT},
  id: String,
  'aria-label': String,
}
const CheckboxGroup = defineComponent<CheckboxGroupProps>((props, {}) => {
  const slots = useSlots()


  const state = reactive({
    value: props.value || props.defaultValue,
  });

  const {cache, adapter: adapterInject, log, context} = useBaseComponent<CheckboxGroupProps>(props, state)
  function adapter(): CheckboxGroupAdapter {
    return {
      ...adapterInject<CheckboxGroupProps, CheckboxGroupState>(),
      updateGroupValue: value => {
        state.value = value;
      },
      notifyChange: evt => {
        props.onChange && props.onChange(evt);
      },
    };
  }
  const foundation = new CheckboxGroupFoundation(adapter());
  onMounted(()=>{
     foundation.init();
  })

  watch(()=>props.value,()=>{
    foundation.handlePropValueChange(props.value);
  })

  onUnmounted(()=>{
     foundation.destroy();
  })

  function onChange(evt: CheckboxEvent) {
    foundation.handleChange(evt);
  }


  return () => {

    const { children, options, prefixCls, direction, className, id, style, type, disabled } = props;

    const isPureCardType = type === strings.TYPE_PURECARD;
    const isCardType = type === strings.TYPE_CARD || isPureCardType;

    const prefix = prefixCls || css.PREFIX;
    const prefixClsDisplay = classnames({
      [prefix as string]: true,
      [`${prefix }-wrapper`]: true,
      [`${prefix }-${ direction}`]: direction,
      [`${prefix}-${direction}-cardType`]: direction && isCardType,
    }, className);

    const realValue = state.value.slice();

    let inner;

    if (options) {
      inner = (options || []).map((option, index) => {
        if (typeof option === 'string') {
          return (
            <Checkbox
              role="listitem"
              key={index}
              disabled={props.disabled}
              value={option}
              prefixCls={prefixCls}
            >
              {option}
            </Checkbox>
          );
        } else {
          return (
            <Checkbox
              role="listitem"
              key={index}
              disabled={option.disabled || props.disabled}
              value={option.value}
              prefixCls={prefixCls}
              extra={option.extra}
              className={option.className}
              style={option.style}
              onChange={option.onChange}
            >
              {option.label}
            </Checkbox>
          );
        }
      });
    } else if (children) {
      inner = slots.default?(slots.default().map((itm, index) => cloneVNode(itm, { key: index, role: 'listitem' }))):null;
    }

    return (
      <div
        id={id}
        role="list"
        aria-label={props['aria-label']}
        class={prefixClsDisplay}
        style={style}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        // aria-errormessage={props['aria-errormessage']}
        // aria-invalid={props['aria-invalid']}
        // aria-required={props['aria-required']}
      >
        <CheckboxContextProvider
          value={{
            checkboxGroup: {
              onChange: onChange,
              value: realValue,
              disabled: props.disabled,
              name: foundation.getFormatName(),
              isCardType,
              isPureCardType,
            },
          }}
        >
          {inner}
        </CheckboxContextProvider>
      </div>
    );
  }
})

CheckboxGroup.props = vuePropsType

export default CheckboxGroup

