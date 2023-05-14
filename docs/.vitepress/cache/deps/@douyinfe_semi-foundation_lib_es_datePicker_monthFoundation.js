import {
  getMonthTable_default
} from "./chunk-7F5KEAGX.js";
import {
  format
} from "./chunk-5JMQX6LS.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getDayOfWeek.js
var getDayofWeek = (_ref) => {
  let {
    weekStartsOn = 0
  } = _ref;
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let index = 0; index < weekStartsOn; index++) {
    weekDay.push(weekDay.shift());
  }
  return weekDay;
};
var getDayOfWeek_default = getDayofWeek;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/monthFoundation.js
var CalendarMonthFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._getToday();
    this.getMonthTable();
  }
  _getToday() {
    const today = /* @__PURE__ */ new Date();
    const todayText = format(today, "yyyy-MM-dd");
    this._adapter.updateToday(todayText);
  }
  getMonthTable() {
    const month = this._adapter.getProp("month");
    const weeksRowNum = this.getState("weeksRowNum");
    if (month) {
      this.updateWeekDays();
      const weekStartsOn = this._adapter.getProp("weekStartsOn");
      const monthTable = getMonthTable_default(month, weekStartsOn);
      const {
        weeks
      } = monthTable;
      this._adapter.updateMonthTable(monthTable);
      if (isNullOrUndefined(weeksRowNum)) {
        this._adapter.setWeeksRowNum(weeks.length);
      } else if (Array.isArray(weeks) && weeks.length !== weeksRowNum) {
        this._adapter.setWeeksRowNum(weeks.length, () => {
          this._adapter.notifyWeeksRowNumChange(weeks.length);
        });
      }
    }
  }
  updateWeekDays() {
    const weekStartsOn = this._adapter.getProp("weekStartsOn");
    const weekdays = getDayOfWeek_default({
      weekStartsOn
    });
    this._adapter.setWeekDays(weekdays);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  handleClick(day) {
    this._adapter.notifyDayClick(day);
  }
  handleHover(day) {
    this._adapter.notifyDayHover(day);
  }
};
export {
  CalendarMonthFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_datePicker_monthFoundation.js.map
