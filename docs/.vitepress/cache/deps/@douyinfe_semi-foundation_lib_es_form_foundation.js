import {
  isValid
} from "./chunk-NR2UFDFJ.js";
import {
  empty,
  get,
  remove,
  require_toPath,
  set
} from "./chunk-MVWUYL43.js";
import {
  isPromise
} from "./chunk-OUTPQAWN.js";
import {
  es_default
} from "./chunk-4XINBWPD.js";
import "./chunk-AOQAQYP4.js";
import "./chunk-4QI5OKLV.js";
import "./chunk-BWSKQBI3.js";
import "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-2POGEFFC.js";
import "./chunk-HOISZPJG.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-NAVCQYYY.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import "./chunk-UV6QJF5D.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/form/foundation.js
var import_toPath = __toESM(require_toPath());
var import_isFunction = __toESM(require_isFunction());
var import_isUndefined = __toESM(require_isUndefined());
var FormFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    let {
      initValues
    } = this._adapter.getProps();
    initValues = this._adapter.cloneDeep(initValues);
    this.data = {
      values: initValues ? initValues : {},
      errors: {},
      touched: {}
      // invalid: false,
      // dirty: false,
    };
    this.fields = /* @__PURE__ */ new Map();
    this.registered = {};
    this.registeredArrayField = /* @__PURE__ */ new Map();
    this.register = this.register.bind(this);
    this.unRegister = this.unRegister.bind(this);
    this.registerArrayField = this.registerArrayField.bind(this);
    this.unRegisterArrayField = this.unRegisterArrayField.bind(this);
    this.getArrayField = this.getArrayField.bind(this);
    this.updateArrayField = this.updateArrayField.bind(this);
    this.getField = this.getField.bind(this);
    this.setValues = this.setValues.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.updateStateError = this.updateStateError.bind(this);
    this.updateStateTouched = this.updateStateTouched.bind(this);
    this.getFormState = this.getFormState.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getError = this.getError.bind(this);
    this.getTouched = this.getTouched.bind(this);
    this.getInitValues = this.getInitValues.bind(this);
    this.getInitValue = this.getInitValue.bind(this);
    this.getFormProps = this.getFormProps.bind(this);
    this.getFieldExist = this.getFieldExist.bind(this);
    this.scrollToField = this.scrollToField.bind(this);
  }
  init() {
    this._adapter.initFormId();
  }
  getField(field) {
    const targetField = this.fields.get(field);
    return targetField;
  }
  register(field, fieldState, fieldStuff) {
    const registered = this.registered[field];
    this.registered[field] = true;
    this.fields.set(field, fieldStuff);
    if (fieldStuff.keepState) {
    } else {
      const allowEmpty = fieldStuff.allowEmpty || false;
      const opts = {
        notNotify: true,
        notUpdate: false,
        allowEmpty
      };
      let fieldValue = fieldState.value;
      if (!allowEmpty && fieldValue === "") {
        fieldValue = void 0;
      }
      this.updateStateValue(field, fieldValue, opts);
      if (fieldState.error) {
        this.updateStateError(field, fieldState.error, opts);
      }
    }
  }
  unRegister(field) {
    const targetField = this.fields.get(field);
    try {
      if (!targetField.keepState) {
        remove(this.data.values, field);
        remove(this.data.errors, field);
        remove(this.data.touched, field);
      }
    } catch (error) {
      console.error(`some thing wrong when unregister field:${field}`);
    }
    this.fields.delete(field);
    this._adapter.notifyChange(this.data);
    this._adapter.forceUpdate();
  }
  // in order to slove byted-issue-289
  registerArrayField(arrayFieldPath, val) {
    this.updateArrayField(arrayFieldPath, {
      updateKey: (/* @__PURE__ */ new Date()).valueOf(),
      initValue: val
    });
  }
  unRegisterArrayField(arrayField) {
    this.registeredArrayField.delete(arrayField);
  }
  getArrayField(arrayField) {
    return this.registeredArrayField.get(arrayField);
  }
  updateArrayField(arrayField, updateValue) {
    const mergeVal = Object.assign(Object.assign({}, this.registeredArrayField.get(arrayField)), updateValue);
    this.registeredArrayField.set(arrayField, mergeVal);
  }
  validate(fieldPaths) {
    const {
      validateFields
    } = this.getProps();
    if (validateFields && (0, import_isFunction.default)(validateFields)) {
      return this._formValidate();
    } else {
      return this._fieldsValidate(fieldPaths);
    }
  }
  // form level validate
  _formValidate() {
    const {
      values
    } = this.data;
    const {
      validateFields
    } = this.getProps();
    return new Promise((resolve, reject) => {
      let maybePromisedErrors;
      try {
        maybePromisedErrors = validateFields(values);
      } catch (errors) {
        maybePromisedErrors = errors;
      }
      if (!maybePromisedErrors) {
        resolve(values);
        this.injectErrorToField({});
      } else if (isPromise(maybePromisedErrors)) {
        maybePromisedErrors.then((result) => {
          if (!result) {
            resolve(values);
            this.injectErrorToField({});
          } else {
            this.data.errors = result;
            this._adapter.notifyChange(this.data);
            this.injectErrorToField(result);
            this._adapter.forceUpdate();
            this._autoScroll(100);
            reject(result);
          }
        }, (errors) => {
          this._autoScroll(100);
          reject(errors);
        });
      } else {
        this.data.errors = maybePromisedErrors;
        this.injectErrorToField(maybePromisedErrors);
        this._adapter.notifyChange(this.data);
        this._adapter.forceUpdate();
        this._autoScroll(100);
        reject(maybePromisedErrors);
      }
    });
  }
  // field level validate
  _fieldsValidate(fieldPaths) {
    const {
      values
    } = this.data;
    return new Promise((resolve, reject) => {
      let promiseSet = [];
      const targetFields = this._getOperateFieldMap(fieldPaths);
      targetFields.forEach((field, fieldPath) => {
        const fieldValue = this.getValue(fieldPath);
        const opts = {
          notNotify: true,
          notUpdate: true
        };
        const validateResult = field.fieldApi.validate(fieldValue, opts);
        promiseSet.push(validateResult);
        field.fieldApi.setTouched(true, opts);
      });
      Promise.all(promiseSet).then(() => {
        this._adapter.notifyChange(this.data);
        this._adapter.forceUpdate();
        const errors = this.getError();
        if (this._isValid(targetFields)) {
          resolve(values);
        } else {
          this._autoScroll();
          reject(errors);
        }
      });
    });
  }
  submit() {
    const {
      values
    } = this.data;
    this.validate().then((resolveValues) => {
      const _values = this._adapter.cloneDeep(resolveValues);
      this._adapter.notifySubmit(_values);
    }).catch((errors) => {
      const _errors = this._adapter.cloneDeep(errors);
      const _values = this._adapter.cloneDeep(values);
      this._adapter.notifySubmitFail(_errors, _values);
    });
  }
  /**
   * Case A：
   *      All fields: a[0]、a[1]、b.type、b.name[2]、b.name[0]
   *      input => output:
   *           a  => a[0]、a[1]
   *           b  => b.type、b.name[0]、b.name[2]
   *
   * Case B：
   *      All fields: activity.a[0]、activity.a[1]、activity.c、activity.d、other
   *      input => output:
   *           activity.a => activity.a[0]、activity.a[1]
   *
   */
  _getNestedField(path) {
    const allRegisterField = this.fields;
    const allFieldPath = [...allRegisterField].map((item) => item[0]);
    let nestedFieldPath = /* @__PURE__ */ new Map();
    allFieldPath.forEach((item) => {
      let itemPath = (0, import_toPath.default)(item);
      let targetPath = (0, import_toPath.default)(path);
      if (targetPath.every((path2, i) => targetPath[i] === itemPath[i])) {
        const realField = allRegisterField.get(item);
        nestedFieldPath.set(item, realField);
      }
    });
    return nestedFieldPath;
  }
  // get all operate fields, called by validate() / reset()
  _getOperateFieldMap(fieldPaths) {
    let targetFields = /* @__PURE__ */ new Map();
    if (!(0, import_isUndefined.default)(fieldPaths)) {
      fieldPaths.forEach((path) => {
        const field = this.fields.get(path);
        if ((0, import_isUndefined.default)(field)) {
          const nestedFields = this._getNestedField(path);
          targetFields = new Map([...targetFields, ...nestedFields]);
        } else {
          targetFields.set(path, field);
        }
      });
    } else {
      targetFields = this.fields;
    }
    return targetFields;
  }
  // Reset the entire form, reset all fields and remove validation results
  reset(fieldPaths) {
    const targetFields = this._getOperateFieldMap(fieldPaths);
    targetFields.forEach((field) => {
      field.fieldApi.reset();
    });
    if (this.registeredArrayField.size) {
      this._resetArrayField();
    }
    this._adapter.notifyChange(this.data);
    this._adapter.forceUpdate();
    this._adapter.notifyReset();
  }
  _resetArrayField() {
    const arrayFieldPaths = [...this.registeredArrayField.keys()];
    arrayFieldPaths.forEach((path) => {
      const arrayFieldState = this.registeredArrayField.get(path);
      const arrayFieldInitValue = arrayFieldState.initValue;
      this.updateStateValue(path, arrayFieldInitValue, {
        notNotify: true,
        notUpdate: true
      });
      this.updateArrayField(path, {
        updateKey: (/* @__PURE__ */ new Date()).valueOf()
      });
    });
  }
  // After calling the form's custom validateFields function, reject the returned error to the corresponding field
  // 调用了Form的自定义validateFields函数后，将返回的错误展示到对应的field中
  injectErrorToField(errors) {
    this.fields.forEach((field) => {
      const fieldError = get(errors, field.field);
      const opts = {
        notNotify: true,
        notUpdate: true
      };
      field.fieldApi.setError(fieldError, opts);
    });
  }
  getValue(field, opts) {
    const isAllField = typeof field === "undefined";
    const needClone = opts && opts.needClone;
    let result, fieldValue;
    switch (true) {
      case (!isAllField && !needClone):
        result = get(this.data.values, field);
        break;
      case (!isAllField && needClone):
        fieldValue = get(this.data.values, field);
        result = this._adapter.cloneDeep(fieldValue);
        break;
      case (isAllField && !needClone):
        result = Object.assign({}, this.data.values);
        break;
      case (isAllField && needClone):
        result = this._adapter.cloneDeep(this.data.values);
        break;
      default:
        break;
    }
    return result;
  }
  setValues(values, _ref) {
    let {
      isOverride = false
    } = _ref;
    const _values = this._adapter.cloneDeep(values);
    this.fields.forEach((field) => {
      const value = get(_values, field.field);
      const opts = {
        notNotify: true,
        notUpdate: true
      };
      field.fieldApi.setValue(value, opts);
    });
    if (this.registeredArrayField.size) {
      const arrayFieldPaths = [...this.registeredArrayField.keys()];
      arrayFieldPaths.forEach((path) => {
        this.updateArrayField(path, {
          updateKey: (/* @__PURE__ */ new Date()).valueOf()
        });
      });
    }
    if (isOverride) {
      this.data.values = _values;
    }
    this._adapter.notifyChange(this.data);
    this._adapter.notifyValueChange(this.data.values, Object.assign({}, values));
    this._adapter.forceUpdate();
  }
  // update formState value
  updateStateValue(field, value, opts, callback) {
    const notNotify = opts && opts.notNotify;
    const notUpdate = opts && opts.notUpdate;
    const fieldAllowEmpty = opts && opts.fieldAllowEmpty;
    const formAllowEmpty = this.getProp("allowEmpty");
    const allowEmpty = fieldAllowEmpty ? fieldAllowEmpty : formAllowEmpty;
    set(this.data.values, field, value, allowEmpty);
    if (!notNotify) {
      this._adapter.notifyChange(this.data);
      this._adapter.notifyValueChange(this.data.values, {
        [field]: value
      });
    }
    if (!notUpdate) {
      this._adapter.forceUpdate(callback);
    }
  }
  // get touched from formState
  getTouched(field) {
    if (typeof field === "undefined") {
      return this.data.touched;
    }
    return get(this.data.touched, field);
  }
  // update formState touched
  updateStateTouched(field, isTouched, opts, callback) {
    const notNotify = opts && opts.notNotify;
    const notUpdate = opts && opts.notUpdate;
    set(this.data.touched, field, isTouched);
    if (!notNotify) {
      this._adapter.notifyChange(this.data);
    }
    if (!notUpdate) {
      this._adapter.forceUpdate(callback);
    }
  }
  // get error from formState
  getError(field) {
    if (typeof field === "undefined") {
      return this.data.errors;
    }
    return get(this.data.errors, field);
  }
  // update formState error
  updateStateError(field, error, opts, callback) {
    const notNotify = opts && opts.notNotify;
    const notUpdate = opts && opts.notUpdate;
    set(this.data.errors, field, error);
    if (!notNotify) {
      this._adapter.notifyChange(this.data);
    }
    if (!notUpdate) {
      this._adapter.forceUpdate(callback);
    }
  }
  // For internal use in the FormApi Operating Field
  getFieldSetterApi() {
    const setValue = (field, value, opts) => {
      const fieldApi = this.fields.get(field) ? this.fields.get(field).fieldApi : void 0;
      const newValue = this._adapter.cloneDeep(value);
      if (fieldApi) {
        fieldApi.setValue(newValue, opts);
      } else {
        this.updateStateValue(field, newValue, opts, () => {
          let nestedFields = this._getNestedField(field);
          if (nestedFields.size) {
            nestedFields.forEach((fieldStaff) => {
              let fieldPath = fieldStaff.field;
              let newFieldVal = get(this.data.values, fieldPath);
              let nestedBatchUpdateOpts = {
                notNotify: true,
                notUpdate: true
              };
              fieldStaff.fieldApi.setValue(newFieldVal, nestedBatchUpdateOpts);
            });
          }
        });
        if (this.getArrayField(field)) {
          this.updateArrayField(field, {
            updateKey: (/* @__PURE__ */ new Date()).valueOf()
          });
        }
      }
    };
    const setError = (field, error, opts) => {
      const fieldApi = this.fields.get(field) ? this.fields.get(field).fieldApi : void 0;
      const newError = this._adapter.cloneDeep(error);
      if (fieldApi) {
        fieldApi.setError(newError, opts);
      } else {
        this.updateStateError(field, newError, opts, () => {
          let nestedFields = this._getNestedField(field);
          if (nestedFields.size) {
            nestedFields.forEach((fieldStaff) => {
              let fieldPath = fieldStaff.field;
              let newFieldError = get(this.data.errors, fieldPath);
              let nestedBatchUpdateOpts = {
                notNotify: true,
                notUpdate: true
              };
              fieldStaff.fieldApi.setError(newFieldError, nestedBatchUpdateOpts);
            });
          }
        });
        if (this.getArrayField(field)) {
          this.updateArrayField(field, {
            updateKey: (/* @__PURE__ */ new Date()).valueOf()
          });
        }
      }
    };
    const setTouched = (field, isTouched, opts) => {
      const fieldApi = this.fields.get(field) ? this.fields.get(field).fieldApi : void 0;
      if (fieldApi) {
        fieldApi.setTouched(isTouched, opts);
      } else {
        this.updateStateTouched(field, isTouched, opts, () => {
          let nestedFields = this._getNestedField(field);
          if (nestedFields.size) {
            nestedFields.forEach((fieldStaff) => {
              let fieldPath = fieldStaff.field;
              let newFieldTouch = get(this.data.touched, fieldPath);
              let nestedBatchUpdateOpts = {
                notNotify: true,
                notUpdate: true
              };
              fieldStaff.fieldApi.setTouched(newFieldTouch, nestedBatchUpdateOpts);
            });
          }
        });
        if (this.getArrayField(field)) {
          this.updateArrayField(field, {
            updateKey: (/* @__PURE__ */ new Date()).valueOf()
          });
        }
      }
    };
    return {
      setValue,
      setError,
      setTouched
    };
  }
  // For Field and ArrayField to read and modify FormState
  getModifyFormStateApi() {
    return {
      register: this.register,
      unRegister: this.unRegister,
      updateStateValue: this.updateStateValue,
      updateStateError: this.updateStateError,
      updateStateTouched: this.updateStateTouched,
      getValue: this.getValue,
      getError: this.getError,
      getTouched: this.getTouched,
      getInitValues: this.getInitValues,
      getInitValue: this.getInitValue,
      getFormProps: this.getFormProps,
      getField: this.getField,
      registerArrayField: this.registerArrayField,
      unRegisterArrayField: this.unRegisterArrayField,
      getArrayField: this.getArrayField,
      updateArrayField: this.updateArrayField
    };
  }
  // Form APIs for external use, exposed to the user
  getFormApi() {
    const fieldSetterApi = this.getFieldSetterApi();
    return Object.assign(Object.assign({}, fieldSetterApi), {
      reset: (fields) => this.reset(fields),
      validate: (fields) => this.validate(fields),
      getValue: (field) => this.getValue(field, {
        needClone: true
      }),
      getValues: () => this.getValue(void 0, {
        needClone: true
      }),
      getFormState: () => this.getFormState(true),
      getInitValue: (field) => this.getInitValue(field),
      getInitValues: () => this.getInitValues(),
      getTouched: (field) => this.getTouched(field),
      getError: (field) => this.getError(field),
      setValues: (values, opts) => this.setValues(values, opts || {
        isOverride: false
      }),
      submitForm: () => this.submit(),
      getFieldExist: (field) => this.getFieldExist(field),
      scrollToField: (field, scrollOpts) => this.scrollToField(field, scrollOpts)
    });
  }
  getFormState() {
    let needClone = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!needClone) {
      return Object.assign({}, this.data);
    } else {
      return this._adapter.cloneDeep(this.data);
    }
  }
  _isValid(targetFields) {
    let valid = true;
    if (!targetFields) {
      valid = Boolean(empty(this.data.errors));
    } else {
      const targetFieldStr = [...targetFields.keys()];
      targetFieldStr.forEach((fieldStr) => {
        const fieldError = get(this.data.errors, fieldStr);
        if (!isValid(fieldError)) {
          valid = false;
        }
      });
    }
    return valid;
  }
  // get form.props.initValues
  getInitValues() {
    return this._adapter.getInitValues();
  }
  getInitValue(field) {
    if (typeof field === "undefined") {
      return this._adapter.getInitValues();
    }
    return get(this._adapter.getInitValues(), field);
  }
  getFormProps(keys) {
    return this._adapter.getFormProps(keys);
  }
  getFieldExist(field) {
    return Boolean(this.fields.has(field));
  }
  _autoScroll(timeout) {
    const {
      autoScrollToError
    } = this.getFormProps();
    if (!autoScrollToError) {
      return;
    }
    let scrollOpts = {
      behavior: "smooth",
      block: "start"
    };
    typeof autoScrollToError === "object" ? scrollOpts = autoScrollToError : null;
    if (timeout) {
      setTimeout(() => this._getErrorFieldAndScroll(scrollOpts), 100);
    } else {
      this._getErrorFieldAndScroll(scrollOpts);
    }
  }
  _getErrorFieldAndScroll(scrollOpts) {
    const errorDOM = this._adapter.getAllErrorDOM();
    if (errorDOM && errorDOM.length) {
      try {
        const fieldDom = errorDOM[0].parentNode.parentNode;
        es_default(fieldDom, scrollOpts);
      } catch (error) {
      }
    }
  }
  scrollToField(field) {
    let scrollOpts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      behavior: "smooth",
      block: "start"
    };
    if (this.getFieldExist(field)) {
      const fieldDOM = this._adapter.getFieldDOM(field);
      es_default(fieldDOM, scrollOpts);
    }
  }
};
export {
  FormFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_form_foundation.js.map
