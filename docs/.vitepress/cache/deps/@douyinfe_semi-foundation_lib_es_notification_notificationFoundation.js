import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/notification/notificationFoundation.js
var import_isNumber = __toESM(require_isNumber());
var NotificationFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, NotificationFoundation.defaultAdapter), adapter));
    this._timer = null;
    this._id = null;
  }
  init() {
    this._startCloseTimer();
    this._id = this.getProp("id");
  }
  destroy() {
    this._clearCloseTimer();
  }
  _startCloseTimer() {
    const duration = this.getProp("duration");
    if (duration && (0, import_isNumber.default)(duration)) {
      this._timer = setTimeout(() => {
        this.close();
      }, duration * 1e3);
    }
  }
  close(e) {
    if (e) {
      e.stopPropagation();
    }
    this._adapter.notifyWrapperToRemove(this._id);
    this._adapter.notifyClose();
  }
  _clearCloseTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  restartCloseTimer() {
    this._clearCloseTimer();
    this._startCloseTimer();
  }
};
export {
  NotificationFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_notification_notificationFoundation.js.map
