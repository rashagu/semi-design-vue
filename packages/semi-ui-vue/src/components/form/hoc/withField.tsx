import classNames from 'classnames';
import * as PropTypes from '../../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/form/constants';
import {
  generateValidatesFromRules,
  mergeOptions,
  mergeProps,
  transformDefaultBooleanAPI,
  transformTrigger,
} from '@douyinfe/semi-foundation/form/utils';
import { isValid } from './utils';
import * as ObjectUtil from '@douyinfe/semi-foundation/utils/object';
import isPromise from '@douyinfe/semi-foundation/utils/isPromise';
import warning from '@douyinfe/semi-foundation/utils/warning';

import { useArrayFieldState, useFormState, useStateWithGetter } from '../hooks/index';
import ErrorMessage from '../errorMessage';
import { isElement } from '../../_base/reactUtils';
import Label, { type LabelProps } from '../label';
import { Col } from '../../grid';
import type { CallOpts, WithFieldOption } from '@douyinfe/semi-foundation/form/interface';
import type { CommonexcludeType, CommonFieldProps } from '../interface';
import type { Subtract } from 'utility-types';
import {
  type ComponentObjectPropsOptions,
  type CSSProperties,
  defineComponent,
  type DefineComponent,
  type DefineSetupFnComponent,
  Fragment,
  type FunctionalComponent,
  h,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  PropType,
  type Ref,
  ref,
  shallowRef,
  unref,
  useSlots,
  type VNode,
  watch,
  withMemo,
} from 'vue';
import { CombineProps, VueHTMLAttributes, type VueJsxNode } from '../../interface';
import { useFormUpdaterContext } from '../context/FormUpdaterContext/Consumer';
import { omit } from 'lodash';
import { useHasInProps } from '../../_base/baseComponent';

const prefix = cssClasses.PREFIX;

// To avoid useLayoutEffect warning when ssr, refer: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// Fix issue 1140
const useIsomorphicEffect = typeof window !== 'undefined' ? onBeforeMount : onMounted;

/**
 * withFiled is used to inject components
 * 1. Takes over the value and onChange of the component and synchronizes them to Form Foundation
 * 2. Insert <Label>
 * 3. Insert <ErrorMessage>
 */

function withField<
  C,
  T extends Subtract<VueHTMLAttributes, CommonexcludeType> & CommonFieldProps & VueHTMLAttributes & C,
>(
  Component: DefineSetupFnComponent<C> | ((props: C) => any),
  opts?: WithFieldOption,
  vuePropsType?: CombineProps<C>
) {
  const propsFromComponent_ = (Component as unknown as DefineComponent).props || {};
  const propsFromComponent = {};
  Object.keys(propsFromComponent_).forEach((key) => {
    propsFromComponent[key] = {
      ...propsFromComponent_[key],
      default: undefined,
    };
    delete propsFromComponent[key].default;
  });
  const vueProps: CombineProps<CommonFieldProps> = {
    ...omit(
      { ...propsFromComponent, ...(vuePropsType || {}) } || {},
      // 'style',
      'class', 'key'
    ),
    label: [...PropTypes.node, PropTypes.func],
    id: [String],
    field: {
      type: String,
      required: true
    },
    className: String,
    prefix: String,
    labelPosition: String as PropType<CommonFieldProps['labelPosition']>,
    labelAlign: String as PropType<CommonFieldProps['labelAlign']>,
    labelWidth: [String, Number],
    noLabel: Boolean,
    noErrorMessage: Boolean,
    name: String,
    fieldClassName: String,
    fieldStyle: Object,
    initValue: PropTypes.any,
    validate: [...PropTypes.node, Function] as PropType<CommonFieldProps['validate']>,
    /** Check rules, check library based on async-validator */
    rules: PropTypes.array,
    /** Check trigger timing */
    trigger: [PropTypes.string, PropTypes.array] as PropType<CommonFieldProps['trigger']>,
    // onChange: (fieldValue: any) => void;
    /** Converts form control values before validation */
    transform: PropTypes.func as PropType<CommonFieldProps['transform']>,
    /** Make a second change to the component's value before the UI update */
    convert: PropTypes.func as PropType<CommonFieldProps['convert']>,
    allowEmptyString: PropTypes.bool,
    /** When true, use rules verification, after encountering the first rule that fails the test, the verification of subsequent rules will no longer be triggered */
    stopValidateWithError: PropTypes.bool,
    /* Custom prompt information is displayed in the same block as the verification information. When both have values, the verification information is displayed first */
    helpText: PropTypes.node as PropType<CommonFieldProps['helpText']>,
    /* Extra message, you can use this when you need an error message and the prompt text to appear at the same time, after helpText/errorMessage */
    extraText: PropTypes.node as PropType<CommonFieldProps['extraText']>,
    extraTextPosition: PropTypes.string as PropType<CommonFieldProps['extraTextPosition']>,
    /** These declaration just hack for Subtract, not valid props in CommonFieldProps */
    defaultValue: PropTypes.any,
    /** Whether to take over only the data stream, when true, it will not automatically insert modules such as ErrorMessage, Label, extraText, etc. The style and DOM structure are consistent with the original component */
    pure: PropTypes.bool,
  };
  const SemiField = defineComponent({
    props: {
      ...vueProps as CombineProps<CommonFieldProps & C>
    },
    name: 'Form' + Component.name,
    //@ts-ignore
    setup(truthProps, { attrs: props }) {
      const slots = useSlots();
      const { getProps, hasInProps } = useHasInProps();

      function _getProps() {
        return getProps({ ...props, ...truthProps });
      }

      // grab formUpdater (the api for field to read/modify FormState) from context
      const { context: updater } = useFormUpdaterContext();
      // use arrayFieldState to fix issue 615
      let { context: arrayFieldState } = useArrayFieldState();

      // To prevent user forgetting to pass the field, use undefined as the key, and updater.value.getValue will get the wrong value.
      let initValueInFormOpts =
        typeof mergeProps(_getProps()).field !== 'undefined'
          ? updater.value.getValue(mergeProps(_getProps()).field)
          : undefined; // Get the init value of form from formP rops.init Values Get the initial value set in the initValues of Form
      let initVal =
        typeof mergeProps(_getProps()).initValue !== 'undefined'
          ? mergeProps(_getProps()).initValue
          : initValueInFormOpts;

      try {
        if (arrayFieldState.value) {
          initVal =
            arrayFieldState.value.shouldUseInitValue && typeof mergeProps(_getProps()).initValue !== 'undefined'
              ? mergeProps(_getProps()).initValue
              : initValueInFormOpts;
        }
      } catch (err) {}

      // FIXME typeof initVal
      const [value, setValue, getVal] = useStateWithGetter(typeof initVal !== undefined ? initVal : null);

      // watch([()=>props.field, ()=>props.initValue], ()=>{
      //     let initValueInFormOpts = typeof mergeProps({...props, ...truthProps}).field !== 'undefined' ? updater.value.getValue(mergeProps({...props, ...truthProps}).field) : undefined; // Get the init value of form from formP rops.init Values Get the initial value set in the initValues of Form
      //     let initVal = typeof mergeProps({...props, ...truthProps}).initValue !== 'undefined' ? mergeProps({...props, ...truthProps}).initValue : initValueInFormOpts;
      //     setValue(typeof initVal !== undefined ? initVal : null)
      // })

      const isUnmounted = shallowRef(false);
      const rulesRef: Ref = ref(mergeProps(_getProps()).rules);
      const validateRef: Ref = ref(( truthProps as CommonFieldProps & C).validate);
      const validatePromise = shallowRef<Promise<any> | null>(null);

      // notNotify is true means that the onChange of the Form does not need to be triggered
      // notUpdate is true means that this operation does not need to trigger the forceUpdate
      const updateTouched = (isTouched: boolean, callOpts?: CallOpts) => {
        let { field } = mergeProps(_getProps());
        setTouched(isTouched);
        updater.value.updateStateTouched(field, isTouched, callOpts);
      };

      const updateError = (errors: any, callOpts?: CallOpts) => {
        if (isUnmounted.value) {
          return;
        }
        let { field } = mergeProps(_getProps());
        if (errors === getError()) {
          // When the inspection result is unchanged, no need to update, saving a forceUpdate overhead
          // When errors is an array, deepEqual is not used, and it is always treated as a need to update
          // 检验结果不变时，无需更新，节省一次forceUpdate开销
          // errors为数组时，不做deepEqual，始终当做需要更新处理
          return;
        }
        setError(errors);
        updater.value.updateStateError(field, errors, callOpts);
        if (!isValid(errors)) {
          setStatus('error');
        } else {
          setStatus('success');
        }
      };

      function getAllowEmpty(allowEmpty) {
        return allowEmpty || updater.value.getFormProps().allowEmpty;
      }

      const updateValue = (val: any, callOpts?: CallOpts) => {
        let { field, allowEmpty } = mergeProps(_getProps());
        allowEmpty = getAllowEmpty(allowEmpty);
        setValue(val);
        let newOpts = {
          ...callOpts,
          allowEmpty,
        };
        updater.value.updateStateValue(field, val, newOpts);
        // truthProps['onUpdate:modelValue']?.(val)
      };

      const reset = () => {
        let callOpts = {
          notNotify: true,
          notUpdate: true,
        };
        // reset is called by the FormFoundaion uniformly. The field level does not need to trigger notify and update.
        updateValue(initVal !== null ? initVal : undefined, callOpts);
        updateError(undefined, callOpts);
        updateTouched(undefined, callOpts);
        setStatus('default');
      };

      // Execute the validation rules specified by rules
      const _validateInternal = (val: any, callOpts: CallOpts) => {
        let latestRules = rulesRef.value || [];
        const validator = generateValidatesFromRules(mergeProps(_getProps()).field, latestRules);
        const model = {
          [mergeProps(_getProps()).field]: val,
        };

        let { stopValidateWithError } = mergeProps(_getProps());
        let formProps = updater.value.getFormProps([
          'labelPosition',
          'labelWidth',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'disabled',
          'showValidateIcon',
          'extraTextPosition',
          'stopValidateWithError',
          'trigger',
        ]);
        let mergeStopValidateWithError = transformDefaultBooleanAPI(
          stopValidateWithError,
          formProps.stopValidateWithError,
          false
        );

        const rootPromise = new Promise((resolve, reject) => {
          validator
            .validate(
              model,
              {
                first: mergeStopValidateWithError,
              },
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              (errors, fields) => {}
            )
            .then((res) => {
              if (isUnmounted.value || validatePromise.value !== rootPromise) {
                return;
              }
              // validation passed
              setStatus('success');
              updateError(undefined, callOpts);
              resolve({});
            })
            .catch((err) => {
              if (isUnmounted.value || validatePromise.value !== rootPromise) {
                return;
              }

              let { errors, fields } = err;
              if (errors && fields) {
                let messages = errors.map((e: any) => e.message);
                if (messages.length === 1) {
                  // eslint-disable-next-line prefer-destructuring
                  messages = messages[0];
                }
                updateError(messages, callOpts);
                if (!isValid(messages)) {
                  setStatus('error');
                  resolve(errors);
                }
              } else {
                // Some grammatical errors in rules
                setStatus('error');
                updateError(err.message, callOpts);
                resolve(err.message);
                throw err;
              }
            });
        });
        validatePromise.value = rootPromise;

        return rootPromise;
      };

      // execute custom validate function
      const _validate = (val: any, values: any, callOpts: CallOpts) => {
        const rootPromise = new Promise((resolve) => {
          let maybePromisedErrors;
          // let errorThrowSync;
          try {
            maybePromisedErrors = validateRef.value(val, values);
          } catch (err) {
            // error throw by syncValidate
            maybePromisedErrors = err;
          }
          if (maybePromisedErrors === undefined) {
            resolve({});
            updateError(undefined, callOpts);
          } else if (isPromise(maybePromisedErrors)) {
            maybePromisedErrors.then((result: any) => {
              // If the async validate is outdated (a newer validate occurs), the result should be discarded
              if (isUnmounted.value || validatePromise.value !== rootPromise) {
                return;
              }

              if (isValid(result)) {
                // validate success，no need to do anything with result
                updateError(undefined, callOpts);
                resolve(null);
              } else {
                // validate failed
                updateError(result, callOpts);
                resolve(result);
              }
            });
          } else {
            if (isValid(maybePromisedErrors)) {
              updateError(undefined, callOpts);
              resolve(null);
            } else {
              updateError(maybePromisedErrors, callOpts);
              resolve(maybePromisedErrors);
            }
          }
        });

        validatePromise.value = rootPromise;

        return rootPromise;
      };

      const fieldValidate = (val: any, callOpts?: CallOpts) => {
        let finalVal = val;
        let latestRules = rulesRef.value;
        if (mergeProps(_getProps()).transform) {
          finalVal = mergeProps(_getProps()).transform(val);
        }
        if (validateRef.value) {
          return _validate(finalVal, updater.value.getValue(), callOpts);
        } else if (latestRules) {
          return _validateInternal(finalVal, callOpts);
        }
        return null;
      };

      /**
       * parse / format
       * validate when trigger
       *
       */
      const handleChange = (newValue: any, e: any, ...other: any[]) => {

        let { trigger, emptyValue } = mergeProps(_getProps());
        let { allowEmptyString, allowEmpty } = mergeProps(_getProps());
        allowEmpty = getAllowEmpty(allowEmpty);
        let { options, shouldInject } = mergeOptions(opts, props);
        let fnKey = options.onKeyChangeFnName;
        if (hasInProps(fnKey) && typeof truthProps[options.onKeyChangeFnName] === 'function') {
          // @ts-ignore
          truthProps[options.onKeyChangeFnName](newValue, e, ...other);
        }

        // support various type component
        let val;
        if (!options.valuePath) {
          val = newValue;
        } else {
          val = ObjectUtil.get(newValue, options.valuePath);
        }

        // User can use convert function to updateValue before Component UI render
        if (typeof mergeProps(_getProps()).convert === 'function') {
          val = mergeProps(_getProps()).convert(val);
        }

        // TODO: allowEmptyString split into allowEmpty, emptyValue
        // Added abandonment warning
        // if (process.env.NODE_ENV !== 'production') {
        //     warning(allowEmptyString, `'allowEmptyString' will be de deprecated in next version, please replace with 'allowEmpty' & 'emptyValue'
        // `)
        // }

        // set value to undefined if it's an empty string
        // allowEmptyString={true} is equivalent to allowEmpty = {true} emptyValue = "
        if (allowEmptyString || allowEmpty) {
          if (val === '') {
            // do nothing
          }
        } else {
          if (val === emptyValue) {
            val = undefined;
          }
        }

        // maintain compoent cursor if needed
        try {
          if (e && e.target && e.target.selectionStart) {
            setCursor(e.target.selectionStart);
          }
        } catch (err) {}

        updateTouched(true, { notNotify: true, notUpdate: true });
        updateValue(val);

        let formProps = updater.value.getFormProps([
          'labelPosition',
          'labelWidth',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'disabled',
          'showValidateIcon',
          'extraTextPosition',
          'stopValidateWithError',
          'trigger',
        ]);
        let mergeTrigger = transformTrigger(trigger, formProps.trigger);
        // only validate when trigger includes change
        if (mergeTrigger.includes('change')) {
          fieldValidate(val);
        }
      };

      const handleBlur = (e: FocusEvent) => {
        let { trigger } = mergeProps(_getProps());
        let formProps = updater.value.getFormProps([
          'labelPosition',
          'labelWidth',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'disabled',
          'showValidateIcon',
          'extraTextPosition',
          'stopValidateWithError',
          'trigger',
        ]);
        let mergeTrigger = transformTrigger(trigger, formProps.trigger);

        // @ts-ignore
        if (truthProps.onBlur) {
          // @ts-ignore
          truthProps.onBlur(e);
        }
        if (!touched.value) {
          updateTouched(true);
        }
        if (mergeTrigger.includes('blur')) {
          let val = getVal();
          fieldValidate(val);
        }
      };

      // grab formState from context
      const formState = useFormState();

      // Error information: Array, String, undefined
      const [error, setError, getError] = useStateWithGetter();
      const touched = ref<boolean | undefined>();

      function setTouched(val) {
        touched.value = val;
      }

      const [cursor, setCursor, getCursor] = useStateWithGetter(0);
      const status = ref(mergeProps(_getProps()).validateStatus); // use props.validateStatus to init
      function setStatus(val) {
        status.value = val;
      }

      // avoid hooks capture value, fixed issue 346
      watch(
        [() => ( truthProps as CommonFieldProps & C).rules, () => ( truthProps as CommonFieldProps & C).validate],
        () => {
          rulesRef.value = mergeProps(_getProps()).rules;
          validateRef.value = ( truthProps as CommonFieldProps & C).validate;
        },
        { immediate: true }
      );

      // exec validate once when trigger inlcude 'mount'
      useIsomorphicEffect(() => {
        let { trigger } = mergeProps(_getProps());
        let formProps = updater.value.getFormProps([
          'labelPosition',
          'labelWidth',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'disabled',
          'showValidateIcon',
          'extraTextPosition',
          'stopValidateWithError',
          'trigger',
        ]);
        let mergeTrigger = transformTrigger(trigger, formProps.trigger);

        const validateOnMount = mergeTrigger.includes('mount');
        isUnmounted.value = false;
        if (validateOnMount) {
          fieldValidate(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
      onBeforeUnmount(() => {
        isUnmounted.value = true;
      });

      watch(
        () => ( truthProps as CommonFieldProps & C).field,
        (value, oldValue, onCleanup) => {
          let {
            // condition,
            field,
            allowEmptyString,
            allowEmpty,
            keepState,
          } = mergeProps(_getProps());
          allowEmpty = getAllowEmpty(allowEmpty);
          /** Field level maintains a separate layer of data, which is convenient for Form to control Field to update the UI */
          // The field level maintains a separate layer of data, which is convenient for the Form to control the Field for UI updates.
          const fieldApi = {
            setValue: updateValue,
            setTouched: updateTouched,
            setError: updateError,
            reset,
            validate: fieldValidate,
          };

          // register
          if (typeof field === 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {};
          }
          // log('register: ' + field);

          // field value may change after field component mounted, we use ref value here to get changed value
          const refValue = getVal();
          updater.value.register(
            field,
            {
              value: refValue,
              error: error.value,
              touched,
              status: status.value,
            },
            {
              field,
              fieldApi,
              keepState,
              allowEmpty: allowEmpty || allowEmptyString,
            }
          );
          // return unRegister cb

          // eslint-disable-next-line react-hooks/exhaustive-deps
          onCleanup(() => {
            const field = mergeProps(_getProps()).field
            field && updater.value.unRegister(field);
          });
        },
        { immediate: true }
      );
      // onBeforeUnmount(() => {
      //   const field = mergeProps(_getProps()).field
      //   field && updater.value.unRegister(field);
      // });

      return (_ctx, _cache) => {
        const label = ( truthProps as CommonFieldProps & C).label;
        const id = ( truthProps as CommonFieldProps & C).id;
        let {
          // condition,
          field,
          labelPosition,
          labelWidth,
          labelAlign,
          labelCol,
          wrapperCol,
          noLabel,
          noErrorMessage,
          isInInputGroup,
          initValue,
          validate,
          validateStatus,
          trigger,
          allowEmptyString,
          allowEmpty,
          emptyValue,
          rules,
          required,
          keepState,
          transform,
          name,
          fieldClassName,
          fieldStyle,
          convert,
          stopValidateWithError,
          helpText,
          extraText,
          extraTextPosition,
          pure,
          rest: rest_,
        } = mergeProps(_getProps());

        const rest = ( truthProps as CommonFieldProps & C).prefix ? { ...rest_, prefix: ( truthProps as CommonFieldProps & C).prefix } : rest_;
        let { options, shouldInject } = mergeOptions(opts, props);

        warning(
          typeof field === 'undefined' && options.shouldInject,
          "[Semi Form]: 'field' is required, please check your props of Field Component"
        );

        // 无需注入的直接返回，eg：Group内的checkbox、radio
        // Return without injection, eg: <Checkbox> / <Radio> inside CheckboxGroup/RadioGroup
        if (!shouldInject) {
          return <Component {...rest}>{{ default: slots.default }}</Component>;
        }

        if (!updater.value.getFormProps) {
          warning(true, '[Semi Form]: Field Component must be use inside the Form, please check your dom declaration');
          return null;
        }

        const fieldState = {
          value: value.value,
          error: error.value,
          touched: touched.value,
          status: status.value,
        };

        let formProps = updater.value.getFormProps([
          'labelPosition',
          'labelWidth',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'disabled',
          'showValidateIcon',
          'extraTextPosition',
        ]);
        let mergeLabelPos = labelPosition || formProps.labelPosition;
        let mergeLabelWidth = labelWidth || formProps.labelWidth;
        let mergeLabelAlign = labelAlign || formProps.labelAlign;
        let mergeLabelCol = labelCol || formProps.labelCol;
        let mergeWrapperCol = wrapperCol || formProps.wrapperCol;
        let mergeExtraPos = extraTextPosition || formProps.extraTextPosition || 'bottom';

        // id attribute to improve a11y
        const a11yId = id ? id : field;
        const labelId = `${a11yId}-label`;
        const helpTextId = `${a11yId}-helpText`;
        const extraTextId = `${a11yId}-extraText`;
        const errorMessageId = `${a11yId}-errormessage`;

        // prefer to use validateStatus which pass by user throught props
        let blockStatus = validateStatus ? validateStatus : status.value;

        const extraCls = classNames(`${prefix}-field-extra`, {
          [`${prefix}-field-extra-string`]: typeof extraText === 'string',
          [`${prefix}-field-extra-middle`]: mergeExtraPos === 'middle',
          [`${prefix}-field-extra-botttom`]: mergeExtraPos === 'bottom',
        });

        const extraContent = extraText ? (
          <div class={extraCls} id={extraTextId} x-semi-prop="extraText">
            {extraText}
          </div>
        ) : null;

        let newProps: Record<string, any> = {
          id: a11yId,
          disabled: formProps.disabled,
          ...rest,
          onBlur: handleBlur,
          [options.onKeyChangeFnName]: handleChange,
          // value 为Ref 对象
          [options.valueKey]: unref(value),
          validateStatus: blockStatus,
          'aria-required': required,
          'aria-labelledby': labelId,
        };

        if (helpText) {
          newProps['aria-describedby'] = extraText ? `${helpTextId} ${extraTextId}` : helpTextId;
        }

        if (extraText) {
          newProps['aria-describedby'] = helpText ? `${helpTextId} ${extraTextId}` : extraTextId;
        }

        if (status.value === 'error') {
          newProps['aria-errormessage'] = errorMessageId;
          newProps['aria-invalid'] = true;
        }

        const fieldCls = classNames({
          [`${prefix}-field`]: true,
          [`${prefix}-field-${name}`]: Boolean(name),
          [fieldClassName]: Boolean(fieldClassName),
        });
        const fieldMaincls = classNames({
          [`${prefix}-field-main`]: true,
        });

        if (mergeLabelPos === 'inset' && !noLabel) {
          newProps.insetLabel = label || field;
          newProps.insetLabelId = labelId;
          if (typeof label === 'object' && !isElement(label)) {
            // TODO
            // @ts-ignore
            newProps.insetLabel = label.text;
            newProps.insetLabelId = labelId;
          }
        }

        // @ts-ignore
        const com = <Component {...(newProps as any)}>{{ default: slots.default }}</Component>;

        // when use in InputGroup, no need to insert <Label>、<ErrorMessage> inside Field, just add it at Group
        if (isInInputGroup) {
          return com;
        }

        if (pure) {
          let pureCls = classNames(rest.className, {
            [`${prefix}-field-pure`]: true,
            [`${prefix}-field-${name}`]: Boolean(name),
            [fieldClassName]: Boolean(fieldClassName),
          });
          newProps.className = pureCls;
          // @ts-ignore
          return <Component {...(newProps as any)}>{{ default: slots.default }}</Component>;
        }

        let withCol = mergeLabelCol && mergeWrapperCol;
        const labelColCls = mergeLabelAlign ? `${prefix}-col-${mergeLabelAlign}` : '';

        // get label
        let labelContent = null;
        if (!noLabel && mergeLabelPos !== 'inset') {
          let needSpread = typeof label === 'object' && !isElement(label) ? label : {};
          labelContent = (
            // @ts-ignore
            <Label
              text={label || field}
              id={labelId}
              required={required}
              name={a11yId || name || field}
              width={mergeLabelWidth}
              align={mergeLabelAlign}
              {...needSpread}
            />
          );
        }

        const fieldMainContent = (
          <div class={fieldMaincls}>
            {mergeExtraPos === 'middle' ? extraContent : null}
            {com}
            {!noErrorMessage ? (
              <ErrorMessage
                error={error.value}
                validateStatus={blockStatus}
                helpText={helpText}
                helpTextId={helpTextId}
                errorMessageId={errorMessageId}
                showValidateIcon={formProps.showValidateIcon}
              />
            ) : null}
            {mergeExtraPos === 'bottom' ? extraContent : null}
          </div>
        );

        const withColContent = (
          <Fragment>
            {mergeLabelPos === 'top' ? (
              <div style={{ overflow: 'hidden' }}>
                <Col {...mergeLabelCol} className={labelColCls}>
                  {labelContent}
                </Col>
              </div>
            ) : (
              <Col {...mergeLabelCol} className={labelColCls}>
                {labelContent}
              </Col>
            )}
            <Col {...mergeWrapperCol}>{fieldMainContent}</Col>
          </Fragment>
        );

        // !important optimization
        const shouldUpdate = [
          ...Object.values(fieldState),
          ...Object.values(props),
          ...Object.values(truthProps),
          field,
          mergeLabelPos,
          mergeLabelAlign,
          formProps.disabled,
        ];

        return withMemo(
          shouldUpdate,
          () => {
            return (
              <div
                class={fieldCls}
                style={fieldStyle}
                x-label-pos={mergeLabelPos}
                x-field-id={field}
                x-extra-pos={mergeExtraPos}
              >
                {withCol ? (
                  withColContent
                ) : (
                  <Fragment>
                    {labelContent}
                    {fieldMainContent}
                  </Fragment>
                )}
              </div>
            );
          },
          _cache,
          0
        );
      };
    },
  });

  return SemiField;
}

// eslint-disable-next-line
export default withField;
