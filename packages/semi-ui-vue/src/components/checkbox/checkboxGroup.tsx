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
  onUnmounted, cloneVNode, PropType
} from 'vue'

import * as PropTypes from '../PropTypes'

import classnames from 'classnames';
import { checkboxGroupClasses as css, strings } from '@douyinfe/semi-foundation/checkbox/constants';
import CheckboxGroupFoundation, { CheckboxGroupAdapter } from '@douyinfe/semi-foundation/checkbox/checkboxGroupFoundation';
import {useBaseComponent} from '../_base/baseComponent';
import { Context } from './context';
import { isEqual } from 'lodash';
import Checkbox from './checkbox';
import type { CheckboxEvent } from './checkbox';
import {AriaAttributes} from "../AriaAttributes";
import {vuePropsMake} from "../PropTypes";
import {ComponentObjectPropsOptions} from "vue/dist/vue";

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

const propTypes:ComponentObjectPropsOptions<CheckboxGroupProps> = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  defaultValue: PropTypes.array,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func as PropType<CheckboxGroupProps['onChange']>,
  prefixCls: PropTypes.string,
  direction: String as PropType<CheckboxGroupProps['direction']>,
  className: PropTypes.string,
  type: String as PropType<CheckboxGroupProps['type']>,
  style: PropTypes.object,

  id: String,
  'aria-label': String,
};

const defaultProps: Partial<CheckboxGroupProps> = {
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  type: strings.TYPE_DEFAULT,
  defaultValue: [] as any,
  direction: strings.DEFAULT_DIRECTION,
};
export const vuePropsType = vuePropsMake<CheckboxGroupProps>(propTypes, defaultProps)

const CheckboxGroup = defineComponent<CheckboxGroupProps>((props, {}) => {
  const slots = useSlots()


  const state = reactive({
    value: props.value || props.defaultValue,
  });

  const {adapter: adapterInject} = useBaseComponent<CheckboxGroupProps>(props, state)
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

  watch(()=>props.value,(value, oldValue)=>{
    if (!isEqual(value, oldValue)) {
      foundation.handlePropValueChange(props.value);
    }
  }, {deep: true})

  onUnmounted(()=>{
     foundation.destroy();
  })

  function onChange(evt: CheckboxEvent) {
    foundation.handleChange(evt);
  }


  return () => {
    const children = slots.default?.()
    const { options, prefixCls, direction, className, id, style, type, disabled } = props;

    const isPureCardType = type === strings.TYPE_PURECARD;
    const isCardType = type === strings.TYPE_CARD || isPureCardType;

    const prefix = prefixCls || css.PREFIX;
    const prefixClsDisplay = classnames({
      [prefix as string]: true,
      [`${prefix }-wrapper`]: true,
      [`${prefix }-${ direction}`]: direction,
      [`${prefix}-${direction}-cardType`]: direction && isCardType,
      [`${prefix}-${direction}-pureCardType`]: direction && isPureCardType,
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
        <Context.Provider
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
        </Context.Provider>
      </div>
    );
  }
}, {
  props: vuePropsType,
  name: 'CheckboxGroup'
})


export default CheckboxGroup

