import classNames from 'classnames';
import * as  PropTypes from '../PropTypes';
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
import type {
    BaseFormProps,
    FormState,
    FormApi,
    ErrorMsg, FormFCChild
} from './interface';
import {
    createVNode,
    CSSProperties,
    defineComponent,
    getCurrentInstance,
    h,
    onMounted,
    onUnmounted,
    reactive,
    useSlots,
} from "vue";
import {vuePropsMake} from "../PropTypes";
import {useBaseComponent} from "../_base/baseComponent";
const prefix = cssClasses.PREFIX;

interface BaseFormState {
    formId: string;
}


const propTypes = {
    'aria-label': PropTypes.string,
    onSubmit: PropTypes.func,
    onSubmitFail: PropTypes.func,
    /* Triggered from update, including field mount/unmount/value change/blur/verification status change/error prompt change, input parameter is formState, currentField */
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    // Triggered when the value of the form is updated, only when the value of the subfield changes. The entry parameter is formState.values
    onValueChange: PropTypes.func,
    initValues: PropTypes.object,
    getFormApi: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    render: PropTypes.func,
    validateFields: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    layout: String,
    labelPosition: String,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelAlign: String,
    labelCol: PropTypes.object, // Control labelCol {span: number, offset: number} for all field child nodes
    wrapperCol: PropTypes.object, // Control wrapperCol {span: number, offset: number} for all field child nodes
    allowEmpty: PropTypes.bool,
    autoScrollToError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    disabled: PropTypes.bool,
    showValidateIcon: PropTypes.bool,
    extraTextPosition: String,
    id: PropTypes.string,
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
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Form = defineComponent<BaseFormProps>((props, {}) => {
    const slots = useSlots()
    let currentInstance = getCurrentInstance()


    const state = reactive<BaseFormState>({
        formId: '',
    })

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


    const {adapter: adapterInject} = useBaseComponent<BaseFormProps>(props, state)
    function adapter_(): BaseFormAdapter<BaseFormProps, BaseFormState> {
        return {
            ...adapterInject<BaseFormProps, BaseFormState>(),
            cloneDeep,
            notifySubmit: (values: any) => {
                props.onSubmit(values);
            },
            notifySubmitFail: (errors: ErrorMsg, values: any) => {
                props.onSubmitFail(errors, values);
            },
            forceUpdate: (callback?: () => void) => {
                // TODO 重新渲染
                // adapter.forceUpdate(callback);
                // currentInstance.update()
                // vue3 强制刷新
                currentInstance.proxy.$forceUpdate();
                callback?.()
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
                state.formId = getUuidv4()
            },
            getInitValues: () => props.initValues,
            getFormProps: (keys: undefined | string | Array<string>) => {
                if (typeof keys === 'undefined') {
                    return props;
                } else if (typeof keys === 'string') {
                    return props[keys];
                } else {
                    const props_ = {};
                    keys.forEach(key => {
                        props_[key] = props[key];
                    });
                    return props_;
                }
            },
            getAllErrorDOM: () => {
                const { formId } = state;
                const { id } = props;
                const xId = id ? id : formId;
                return document.querySelectorAll(
                  `form[x-form-id="${xId}"] .${cssClasses.PREFIX}-field-error-message`
                );
            },
            getFieldDOM: (field: string) =>
              document.querySelector(`.${cssClasses.PREFIX}-field[x-field-id="${field}"]`),
        };
    }
    const adapter = adapter_()
    const foundation = new FormFoundation(adapter);
    let formApi = foundation.getFormApi();

    if (props.getFormApi) {
       props.getFormApi(formApi as FormApi);
    }

    onMounted(()=>{
        foundation.init();
    })

    onUnmounted(()=>{
        foundation.destroy();
    })


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
            return render(props_ as FormFCChild);
        }
        return slots.default?.(props_);
    }

    function submit(e: Event) {
        e.preventDefault();
        foundation.submit();
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
            extraTextPosition,
            id,
            ...rest
        } = props;

        const formCls = classNames(prefix, className, {
            [prefix + '-vertical']: layout === 'vertical',
            [prefix + '-horizontal']: layout === 'horizontal',
        });

        const showldAppendRow = wrapperCol && labelCol;

        const formContent = (
          <form
            style={style}
            {...rest}
            onReset={reset}
            onSubmit={submit}
            class={formCls}
            x-form-id={id ? id : formId}
          >
              {{
                  default: content
              }}
          </form>
        );
        const withRowForm = <Row>{formContent}</Row>;
        return (
          <FormUpdaterContext.Provider value={updaterApi}>
              <FormApiContext.Provider value={formApi as any}>
                  <FormStateContext.Provider value={formState}>
                      {showldAppendRow ? withRowForm : formContent}
                  </FormStateContext.Provider>
              </FormApiContext.Provider>
          </FormUpdaterContext.Provider>
        );
    }
})

// @ts-ignore
Form.props = vuePropsType
Form.name = 'Form'

export default Form


