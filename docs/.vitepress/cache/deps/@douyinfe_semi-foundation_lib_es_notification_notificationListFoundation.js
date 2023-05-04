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
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/notification/notificationListFoundation.js
var NotificationListFoundation = class extends foundation_default {
  addNotice(opts) {
    const notices = this._adapter.getNotices();
    this._adapter.updateNotices([opts, ...notices]);
  }
  removeNotice(id) {
    let notices = this._adapter.getNotices();
    const removedItems = [];
    notices = notices.filter((notice) => {
      if (notice.id === id) {
        removedItems.push(notice);
        return false;
      }
      return true;
    });
    this._adapter.updateNotices(notices, removedItems);
  }
  destroyAll() {
    const notices = this._adapter.getNotices();
    if (notices.length > 0) {
      this._adapter.updateNotices([], notices);
    }
  }
};
export {
  NotificationListFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_notification_notificationListFoundation.js.map
