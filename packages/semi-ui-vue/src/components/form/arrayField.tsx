/* eslint-disable react/destructuring-assignment */
import {getUuidv4} from '@douyinfe/semi-foundation/utils/uuid';
import {cloneDeep, isUndefined} from 'lodash';
import {FormUpdaterContext, ArrayFieldContext} from './context';
import warning from '@douyinfe/semi-foundation/utils/warning';
import type {ArrayFieldStaff, FormUpdaterContextType} from '@douyinfe/semi-foundation/form/interface';
import {defineComponent, h, onBeforeUnmount, reactive, useSlots, watch} from "vue";
import {useFormUpdaterContext} from "./context/FormUpdaterContext/Consumer";

export interface ArrayFieldProps {
  initValue?: any[];
  field?: string;
}

export interface ArrayFieldChildrenProps {
  arrayFields: {
    key: string;
    field: string;
    remove: () => void;
  }[];
  add: () => void;
  addWithInitValue: (lineObject: Record<string, any>) => void;
}

export interface ArrayFieldState {
  keys: string[];
}

const filterArrayByIndex = (array: any[], index: number) => array.filter((item, i) => i !== index);

const getUuidByArray = (array: any[]) => array.map(() => getUuidv4());

const getUpdateKey = (arrayField: ArrayFieldStaff): string | undefined => {
  if (!arrayField) {
    return undefined;
  }
  if (arrayField && arrayField.updateKey) {
    return arrayField.updateKey;
  }
  return undefined;
};

const initValueAdapter = (initValue: any) => {
  const iv: any[] = [];
  if (Array.isArray(initValue)) {
    return initValue;
  } else {
    warning(
      !isUndefined(initValue),
      '[Semi Form ArrayField] initValue of ArrayField must be an array. Please check the type of your props'
    );
    return iv;
  }
};

/**
 *
 * @param {any[]} value
 * @param {string[]} oldKeys
 * @returns string[]
 */
const generateKeys = (value: any[], oldKeys?: string[]) => {
  const val = initValueAdapter(value);
  const newKeys = getUuidByArray(val);
  // return newKeys;
  const keys = newKeys.map((key, i) => (oldKeys && oldKeys[i] ? oldKeys[i] : key));
  return keys;
};


export const vuePropsType = {
  initValue: Array,
  field: String
}
const ArrayFieldComponent = defineComponent<ArrayFieldProps>((props, {}) => {
  const slots = useSlots()
  let cacheFieldValues: any[];
  let shouldUseInitValue: boolean;
  let cacheUpdateKey: string;
  const {context} = useFormUpdaterContext()
  const initValueInProps = props.initValue;
  const initValueInForm = context.value.getValue(props.field);
  const initValue = initValueInProps || initValueInForm;
  const state = reactive({
    keys: generateKeys(initValue),
  })


  /*
      If updateKey exists, it means that the arrayField (usually a nested ArrayField not at the first level) is only re-mounted due to setValues,
      and the fields it contains do not need to consume initValue
  */
  // whether the fields inside arrayField should use props.initValue in current render process
  shouldUseInitValue = !context.value.getArrayField(props.field);

  // Separate the arrays that reset and the usual add and remove modify, otherwise they will affect each other
  const initValueCopyForFormState = cloneDeep(initValue);
  const initValueCopyForReset = cloneDeep(initValue);
  context.value.registerArrayField(props.field, initValueCopyForReset);
  // register ArrayField will update state.updateKey to render, So there is no need to execute forceUpdate here
  context.value.updateStateValue(props.field, initValueCopyForFormState, {notNotify: true, notUpdate: true});


  onBeforeUnmount(() => {
    const updater = context.value;
    const {field} = props;
    updater.unRegisterArrayField(field);
  })

  watch([
    () => props.field,
    () => state.keys,
  ], () => {
    const {field} = props;
    const {keys} = state;
    const fieldValues = context.value.getValue(field);
    const updateKey = getUpdateKey(context.value.getArrayField(field));
    // when update form outside, like use formApi.setValue('field', [{newItem1, newItem2}]),  formApi.setValues
    // re generate keys to update arrayField;
    if (updateKey !== cacheUpdateKey) {
      const newKeys = generateKeys(fieldValues, keys);
      // eslint-disable-next-line
      state.keys = newKeys
      cacheUpdateKey = updateKey;
      if (cacheUpdateKey !== null) {
        shouldUseInitValue = false;
      }
    }
  })


  function add() {
    const {keys} = state;
    keys.push(getUuidv4());
    shouldUseInitValue = true;
    state.keys = keys
  }

  function addWithInitValue(lineObject: Record<string, any>) {
    const updater = context;
    const {field} = props;
    const newArrayFieldVal = updater.value.getValue(field) ? updater.value.getValue(field).slice() : [];
    newArrayFieldVal.push(lineObject);
    updater.value.updateStateValue(field, newArrayFieldVal, {});
    updater.value.updateArrayField(field, {updateKey: new Date().valueOf()});
  }

  function remove(i: number) {
    const updater = context;
    const {keys} = state;
    const {field} = props;
    const newKeys = filterArrayByIndex(keys, i);
    // Make sure that all the keys in the line are removed, because some keys are not taken over by the field, only set in the initValue
    let newArrayFieldError = updater.value.getError(field);
    const opts = {notNotify: true, notUpdate: true};
    if (Array.isArray(newArrayFieldError)) {
      newArrayFieldError = newArrayFieldError.slice();
      newArrayFieldError.splice(i, 1);
      updater.value.updateStateError(field, newArrayFieldError, opts);
    }
    // if (Array.isArray(newArrayFieldTouched)) {
    //     newArrayFieldTouched = newArrayFieldTouched.slice();
    //     newArrayFieldTouched.splice(i, 1);
    //     updater.updateStateTouched(field, newArrayFieldTouched, opts);
    // }
    let newArrayFieldValue = updater.value.getValue(field);
    if (Array.isArray(newArrayFieldValue)) {
      newArrayFieldValue = newArrayFieldValue.slice();
      newArrayFieldValue.splice(i, 1);
      updater.value.updateStateValue(field, newArrayFieldValue);
    }

    state.keys = newKeys
  }

  return () => {
    const {field} = props;
    const {keys} = state;
    const arrayFields = keys.map((key, i) => ({
      // key: i,
      key,
      field: `${field}[${i}]`,
      remove: () => remove(i),
    }));
    const contextVal = {
      shouldUseInitValue: shouldUseInitValue,
    };
    return (
      <ArrayFieldContext.Provider value={contextVal}>
        {slots.default?.({arrayFields, add, addWithInitValue})}
      </ArrayFieldContext.Provider>
    );
  }
})

// @ts-ignore
ArrayFieldComponent.props = vuePropsType
ArrayFieldComponent.name = 'ArrayFieldComponent'

export default ArrayFieldComponent

