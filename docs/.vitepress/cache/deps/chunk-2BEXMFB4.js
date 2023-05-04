// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/Logger.js
var Logger = class {
  /**
   * specify prefix
   * @param {string} prefix
   */
  constructor(prefix) {
    this._prefix = prefix;
  }
  _isEmpty(value) {
    return value === null || value === void 0 || value === "";
  }
  _baseLog() {
    let method = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "log";
    if (typeof console[method] === "function") {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      const messages = [...args];
      if (!this._isEmpty(this._prefix)) {
        messages.unshift(this._prefix, ":");
      }
      console[method](...messages);
    }
  }
  /* istanbul ignore next */
  log() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    this._baseLog("log", ...args);
  }
  /* istanbul ignore next */
  warn() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    this._baseLog("warn", ...args);
  }
  /* istanbul ignore next */
  error() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    this._baseLog("error", ...args);
  }
  /* istanbul ignore next */
  info() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    this._baseLog("info", ...args);
  }
};
var Logger_default = Logger;

export {
  Logger_default
};
//# sourceMappingURL=chunk-2BEXMFB4.js.map
