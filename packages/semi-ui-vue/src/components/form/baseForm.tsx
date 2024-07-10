import classNames from 'classnames';
import * as PropTypes from '../PropTypes';
import FormFoundation from '@douyinfe/semi-foundation/form/foundation';
import type { BaseFormAdapter } from '@douyinfe/semi-foundation/form/foundation';
import { strings, cssClasses } from '@douyinfe/semi-foundation/form/constants';
import { getUuidv4 } from '@douyinfe/semi-foundation/utils/uuid';
import warning from '@douyinfe/semi-foundation/utils/warning';
import { FormStateContext, FormApiContext, FormUpdaterContext } from './context';
import { isEmptyChildren } from '../_base/reactUtils';
import Row from '../grid/row';
import { cloneDeep } from '../_utils/index';
import { noop } from 'lodash';
import '@douyinfe/semi-foundation/form/form.scss';
import type { BaseFormProps, FormState, FormApi, ErrorMsg, FormFCChild } from './interface';
import {
  ComponentObjectPropsOptions,
  createVNode,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { useBaseComponent } from '../_base/baseComponent';
import { CombineProps } from '../interface';
const prefix = cssClasses.PREFIX;

interface BaseFormState {
  formId: string;
}

const propTypes: CombineProps<BaseFormProps> = {
  'aria-label': PropTypes.string,
  onSubmit: PropTypes.func as PropType<BaseFormProps['onSubmit']>,
  onSubmitFail: PropTypes.func as PropType<BaseFormProps['onSubmitFail']>,
  /* Triggered from update, including field mount/unmount/value change/blur/verification status change/error prompt change, input parameter is formState, currentField */
  onChange: PropTypes.func as PropType<BaseFormProps['onChange']>,
  onReset: PropTypes.func as PropType<BaseFormProps['onReset']>,
  // Triggered when the value of the form is updated, only when the value of the subfield changes. The entry parameter is formState.values
  onValueChange: PropTypes.func as PropType<BaseFormProps['onValueChange']>,
  autoScrollToError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  allowEmpty: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  extraTextPosition: PropTypes.string as PropType<BaseFormProps['extraTextPosition']>,
  getFormApi: PropTypes.func as PropType<BaseFormProps['getFormApi']>,
  initValues: PropTypes.object,
  validateFields: PropTypes.func as PropType<BaseFormProps['validateFields']>,
  layout: PropTypes.string as PropType<BaseFormProps['layout']>,
  labelPosition: PropTypes.string as PropType<BaseFormProps['labelPosition']>,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelAlign: PropTypes.string as PropType<BaseFormProps['labelAlign']>,
  labelCol: PropTypes.object, // Control labelCol {span: number, offset: number} for all field child nodes
  render: PropTypes.func as PropType<BaseFormProps['render']>,
  style: PropTypes.object,
  showValidateIcon: PropTypes.bool,
  stopValidateWithError: PropTypes.bool as PropType<BaseFormProps['stopValidateWithError']>,
  id: PropTypes.string,
  wrapperCol: PropTypes.object, // Control wrapperCol {span: number, offset: number} for all field child nodes
  trigger: [String, Array] as PropType<BaseFormProps['trigger']>,
};

const defaultProps = {
  onChange: noop,
  onSubmitFail: noop,
  onSubmit: noop,
  onReset: noop,
  onValueChange: noop,
  layout: 'vertical',
  labelPosition: 'top',
  allowEmpty: false,
  autoScrollToError: false,
  showValidateIcon: true,
};
export const vuePropsType = vuePropsMake<BaseFormProps>(propTypes, defaultProps);
const Form = defineComponent({
  props: vuePropsType,
  name: 'Form',
  setup(props, {}) {
    const slots = useSlots();
    let currentInstance = getCurrentInstance();

    const state = reactive<BaseFormState>({
      formId: '',
    });

    warning(
      Boolean(props.component && props.render),
      '[Semi Form] You should not use <Form component> and <Form render> in ths same time; <Form render> will be ignored'
    );
    warning(
      props.component && slots.default && !isEmptyChildren(slots.default()),
      '[Semi Form] You should not use <Form component> and <Form>{children}</Form> in ths same time; <Form>{slots.default()}</Form> will be ignored'
    );
    warning(
      props.render && slots.default && !isEmptyChildren(slots.default()),
      '[Semi Form] You should not use <Form render> and <Form>{children}</Form> in ths same time; <Form>{slots.default()}</Form> will be ignored'
    );

    const { adapter: adapterInject } = useBaseComponent<BaseFormProps>(props, state);
    function adapter_(): BaseFormAdapter<BaseFormProps, BaseFormState> {
      return {
        ...adapterInject<BaseFormProps, BaseFormState>(),
        cloneDeep,
        notifySubmit: (values: any, e: any) => {
          props.onSubmit(values, e);
        },
        notifySubmitFail: (errors, values: any, e: any) => {
          props.onSubmitFail(errors, values, e);
        },
        forceUpdate: (callback?: () => void) => {
          // TODO 重新渲染
          // adapter.forceUpdate(callback);
          // currentInstance.update()
          // vue3 强制刷新
          // fix: 组件卸载时可能会重复执行 hmr
          nextTick(() => {
            currentInstance.proxy.$forceUpdate();
            nextTick(() => {
              callback?.();
            });
          });
        },
        notifyChange: (formState: FormState) => {
          props.onChange(formState);
        },
        notifyValueChange: (values: any, changedValues: any) => {
          props.onValueChange(values, changedValues);
        },
        notifyReset: () => {
          props.onReset();
        },
        initFormId: () => {
          state.formId = getUuidv4();
        },
        getInitValues: () => props.initValues,
        getFormProps: (keys: undefined | string | Array<string>) => {
          if (typeof keys === 'undefined') {
            return props;
          } else if (typeof keys === 'string') {
            return props[keys];
          } else {
            const props_ = {};
            keys.forEach((key) => {
              props_[key] = props[key];
            });
            return props_;
          }
        },
        getAllErrorDOM: () => {
          const { formId } = state;
          const { id } = props;
          const xId = id ? id : formId;
          return document.querySelectorAll(`form[x-form-id="${xId}"] .${cssClasses.PREFIX}-field-error-message`);
        },
        getFieldDOM: (field: string) => document.querySelector(`.${cssClasses.PREFIX}-field[x-field-id="${field}"]`),
        getFieldErrorDOM: (field: string) => {
          const { formId } = state;
          const { id } = props;
          const xId = id ? id : formId;
          let selector = `form[x-form-id="${xId}"] .${cssClasses.PREFIX}-field[x-field-id="${field}"] .${cssClasses.PREFIX}-field-error-message`;
          return document.querySelector(selector);
        },
      };
    }
    const adapter = adapter_();
    const foundation = new FormFoundation(adapter);
    let formApi = foundation.getFormApi();

    if (props.getFormApi) {
      props.getFormApi(formApi as unknown as FormApi<any>);
    }

    onMounted(() => {
      foundation.init();
    });

    onUnmounted(() => {
      foundation.destroy();
    });

    function content() {
      const { component, render } = props;
      const formState = foundation.getFormState();
      const props_ = {
        formState,
        formApi: foundation.getFormApi(),
        values: formState.values,
      };
      if (component) {
        return createVNode(component, props_);
      }
      if (render) {
        return render(props_ as unknown as FormFCChild);
      }
      return slots.default?.(props_);
    }

    function submit(e: Event) {
      e.preventDefault();
      foundation.submit(e);
    }

    function reset(e: Event) {
      e.preventDefault();
      foundation.reset();
    }

    return () => {
      const needClone = false;
      const formState = foundation.getFormState(needClone);
      const updaterApi = foundation.getModifyFormStateApi();
      const { formId } = state;
      // const children = slots.default?.()
      const {
        getFormApi,
        onChange,
        onSubmit,
        onSubmitFail,
        onValueChange,
        component,
        render,
        validateFields,
        initValues,
        layout,
        style,
        className,
        labelPosition,
        labelWidth,
        labelAlign,
        labelCol,
        wrapperCol,
        allowEmpty,
        autoScrollToError,
        showValidateIcon,
        stopValidateWithError,
        extraTextPosition,
        id,
        trigger,
        ...rest
      } = props;

      const formCls = classNames(prefix, className, {
        [prefix + '-vertical']: layout === 'vertical',
        [prefix + '-horizontal']: layout === 'horizontal',
      });

      const shouldAppendRow = wrapperCol && labelCol;

      const formContent = (
        <form style={style} {...rest} onReset={reset} onSubmit={submit} class={formCls} x-form-id={id ? id : formId}>
          {{
            default: content,
          }}
        </form>
      );
      const withRowForm = <Row>{formContent}</Row>;
      return (
        <FormUpdaterContext.Provider value={updaterApi}>
          <FormApiContext.Provider value={formApi as any}>
            <FormStateContext.Provider value={formState}>
              {shouldAppendRow ? withRowForm : formContent}
            </FormStateContext.Provider>
          </FormApiContext.Provider>
        </FormUpdaterContext.Provider>
      );
    };
  },
});

export default Form;
