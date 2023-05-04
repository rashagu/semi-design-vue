import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/Store.js
var Store = class {
  constructor(initialState) {
    this._state = Object.assign({}, initialState);
    this._listeners = [];
  }
  subscribe(listener) {
    this._listeners.push(listener);
    const unsubscribe = () => {
      const index = this._listeners.indexOf(listener);
      if (index > -1) {
        this._listeners.splice(index, 1);
      }
    };
    return unsubscribe;
  }
  setState(state) {
    Object.assign(this._state, Object.assign({}, state));
    for (const listener of this._listeners) {
      if (typeof listener === "function") {
        listener(this._state);
      }
    }
  }
  getState() {
    return this._state;
  }
};
var Store_default = Store;
export {
  Store_default as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_Store.js.map
