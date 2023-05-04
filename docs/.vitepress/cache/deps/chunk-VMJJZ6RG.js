import {
  log_default
} from "./chunk-ALAR6DE5.js";
import {
  require_noop
} from "./chunk-2EMWRCT4.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/base/foundation.js
var import_noop = __toESM(require_noop());
var BaseFoundation = class {
  constructor(adapter) {
    this._adapter = Object.assign(Object.assign({}, BaseFoundation.defaultAdapter), adapter);
  }
  /** @return enum{css className} */
  /* istanbul ignore next */
  static get cssClasses() {
    return {};
  }
  /** @return enum{strings} */
  /* istanbul ignore next */
  static get strings() {
    return {};
  }
  /** @return enum{numbers} */
  /* istanbul ignore next */
  static get numbers() {
    return {};
  }
  static get defaultAdapter() {
    return {
      getProp: import_noop.default,
      getProps: import_noop.default,
      getState: import_noop.default,
      getStates: import_noop.default,
      setState: import_noop.default,
      getContext: import_noop.default,
      getContexts: import_noop.default,
      getCache: import_noop.default,
      setCache: import_noop.default,
      getCaches: import_noop.default,
      stopPropagation: import_noop.default,
      persistEvent: import_noop.default
    };
  }
  getProp(key) {
    return this._adapter.getProp(key);
  }
  getProps() {
    return this._adapter.getProps();
  }
  getState(key) {
    return this._adapter.getState(key);
  }
  getStates() {
    return this._adapter.getStates();
  }
  setState(states, cb) {
    return this._adapter.setState(Object.assign({}, states), cb);
  }
  getContext(key) {
    return this._adapter.getContext(key);
  }
  /* istanbul ignore next */
  getContexts() {
    return this._adapter.getContexts();
  }
  /* istanbul ignore next */
  getCaches() {
    return this._adapter.getCaches();
  }
  getCache(key) {
    return this._adapter.getCache(key);
  }
  setCache(key, value) {
    return key && this._adapter.setCache(key, value);
  }
  stopPropagation(e) {
    this._adapter.stopPropagation(e);
  }
  // Determine whether a controlled component
  _isControlledComponent() {
    let key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "value";
    const props = this.getProps();
    const isControlComponent = key in props;
    return isControlComponent;
  }
  // Does the user have incoming props, eg: _isInProps (value)
  _isInProps(key) {
    const props = this.getProps();
    return key in props;
  }
  init(lifecycle) {
  }
  destroy() {
  }
  /* istanbul ignore next */
  log(text) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    log_default(text, ...rest);
  }
  _persistEvent(e) {
    this._adapter.persistEvent(e);
  }
};
var foundation_default = BaseFoundation;

export {
  foundation_default
};
//# sourceMappingURL=chunk-VMJJZ6RG.js.map
