import {
  formatFullDate
} from "./chunk-7F5KEAGX.js";
import {
  isValidTimeZone
} from "./chunk-4ARGQCSK.js";
import {
  getFullDateOffset_default,
  isBefore
} from "./chunk-7WHQOYKM.js";
import {
  getDefaultFormatTokenByType,
  getDefaultFormatToken_default
} from "./chunk-IJHWV7C2.js";
import {
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import {
  compatibleParse
} from "./chunk-RPSLW5FI.js";
import {
  zonedTimeToUtc
} from "./chunk-4G46XQHO.js";
import {
  addMonths,
  addYears,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  format,
  isSameDay,
  parseISO,
  set,
  subMonths,
  subYears
} from "./chunk-5JMQX6LS.js";
import {
  require_includes
} from "./chunk-GRE7MUIS.js";
import "./chunk-OL7AAX6S.js";
import "./chunk-KOVH33RT.js";
import {
  require_isSet
} from "./chunk-UTEL65GX.js";
import "./chunk-XKTW6BSF.js";
import {
  require_isEqual
} from "./chunk-34JO2KAW.js";
import "./chunk-HPYJEDL6.js";
import "./chunk-IGKIE6XV.js";
import "./chunk-CUWPCCUM.js";
import "./chunk-SKUJYBVG.js";
import "./chunk-PTHRDZX2.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import {
  strings
} from "./chunk-KN6CCDTX.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-NQE5YR5Y.js";
import "./chunk-T6W56XAT.js";
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
import "./chunk-B2OBPHGV.js";
import "./chunk-V4DHZKW4.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/monthsGridFoundation.js
var import_isEqual = __toESM(require_isEqual());
var import_isSet = __toESM(require_isSet());
var import_includes = __toESM(require_includes());
var dateDiffFns = {
  month: differenceInCalendarMonths,
  year: differenceInCalendarYears
};
var dateCalcFns = {
  prevMonth: subMonths,
  nextMonth: addMonths,
  prevYear: subYears,
  nextYear: addYears
};
var MonthsGridFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.newBiMonthPanelDate = [this.getState("monthLeft").pickerDate, this.getState("monthRight").pickerDate];
  }
  init() {
    const defaultValue = this.getProp("defaultValue");
    this.initDefaultPickerValue();
    this.updateSelectedFromProps(defaultValue);
  }
  initDefaultPickerValue() {
    const defaultPickerValue = compatibleParse(this.getProp("defaultPickerValue"));
    if (defaultPickerValue && isValidDate(defaultPickerValue)) {
      this._updatePanelDetail(strings.PANEL_TYPE_LEFT, {
        pickerDate: defaultPickerValue
      });
      this._updatePanelDetail(strings.PANEL_TYPE_RIGHT, {
        pickerDate: addMonths(defaultPickerValue, 1)
      });
    }
  }
  updateSelectedFromProps(values) {
    let refreshPicker = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const type = this.getProp("type");
    const {
      selected,
      rangeStart,
      rangeEnd
    } = this.getStates();
    if (values && (values === null || values === void 0 ? void 0 : values.length)) {
      switch (type) {
        case "date":
          this._initDatePickerFromValue(values, refreshPicker);
          break;
        case "dateRange":
          this._initDateRangePickerFromValue(values);
          break;
        case "dateTime":
          this._initDateTimePickerFromValue(values);
          break;
        case "dateTimeRange":
          this._initDateTimeRangePickerFormValue(values);
          break;
        default:
          break;
      }
    } else if (Array.isArray(values) && !values.length || !values) {
      if ((0, import_isSet.default)(selected) && selected.size) {
        this._adapter.updateDaySelected(/* @__PURE__ */ new Set());
      }
      if (rangeStart) {
        this._adapter.setRangeStart("");
      }
      if (rangeEnd) {
        this._adapter.setRangeEnd("");
      }
    }
  }
  calcDisabledTime(panelType) {
    const {
      disabledTime,
      type
    } = this.getProps();
    if (typeof disabledTime === "function" && panelType && ["dateTime", "dateTimeRange"].includes(type)) {
      const {
        rangeStart,
        rangeEnd,
        monthLeft
      } = this.getStates();
      const selected = [];
      if (type === "dateTimeRange") {
        if (rangeStart) {
          selected.push(rangeStart);
        }
        if (rangeStart && rangeEnd) {
          selected.push(rangeEnd);
        }
      } else if (monthLeft && monthLeft.showDate) {
        selected.push(monthLeft.showDate);
      }
      const selectedDates = selected.map((str) => str instanceof Date ? str : parseISO(str));
      const cbDates = type === "dateTimeRange" ? selectedDates : selectedDates[0];
      return disabledTime(cbDates, panelType);
    }
  }
  _initDatePickerFromValue(values) {
    let refreshPicker = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const {
      monthLeft
    } = this._adapter.getStates();
    const newMonthLeft = Object.assign({}, monthLeft);
    this._adapter.updateMonthOnLeft(newMonthLeft);
    const newSelected = /* @__PURE__ */ new Set();
    const isMultiple = this._isMultiple();
    if (!isMultiple) {
      values[0] && newSelected.add(format(values[0], strings.FORMAT_FULL_DATE));
    } else {
      values.forEach((date) => {
        date && newSelected.add(format(date, strings.FORMAT_FULL_DATE));
      });
    }
    if (refreshPicker) {
      if (isMultiple) {
        const leftPickerDateInSelected = values === null || values === void 0 ? void 0 : values.some((item) => item && differenceInCalendarMonths(item, monthLeft.pickerDate) === 0);
        !leftPickerDateInSelected && this.handleShowDateAndTime(strings.PANEL_TYPE_LEFT, values[0] || newMonthLeft.pickerDate);
      } else {
        this.handleShowDateAndTime(strings.PANEL_TYPE_LEFT, values[0] || newMonthLeft.pickerDate);
      }
    } else {
      this.handleShowDateAndTime(strings.PANEL_TYPE_LEFT, newMonthLeft.pickerDate);
    }
    this._adapter.updateDaySelected(newSelected);
  }
  _initDateRangePickerFromValue(values) {
    let withTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const monthLeft = this.getState("monthLeft");
    const monthRight = this.getState("monthRight");
    const adjustResult = this._autoAdjustMonth(Object.assign(Object.assign({}, monthLeft), {
      pickerDate: values[0] || monthLeft.pickerDate
    }), Object.assign(Object.assign({}, monthRight), {
      pickerDate: values[1] || monthRight.pickerDate
    }));
    const validValue = Array.isArray(values) && values.filter((item) => item).length > 1;
    if (validValue) {
      this.handleShowDateAndTime(strings.PANEL_TYPE_LEFT, adjustResult.monthLeft.pickerDate);
      this.handleShowDateAndTime(strings.PANEL_TYPE_RIGHT, adjustResult.monthRight.pickerDate);
    } else {
      const selectedDate = values.find((item) => item);
      if (selectedDate) {
        const notLeftPanelDate = Math.abs(differenceInCalendarMonths(selectedDate, monthLeft.pickerDate)) > 0;
        const notRightPanelDate = Math.abs(differenceInCalendarMonths(selectedDate, monthRight.pickerDate)) > 0;
        if (notLeftPanelDate && notRightPanelDate) {
          this.handleShowDateAndTime(strings.PANEL_TYPE_LEFT, adjustResult.monthLeft.pickerDate);
          this.handleShowDateAndTime(strings.PANEL_TYPE_RIGHT, adjustResult.monthRight.pickerDate);
        }
      }
    }
    const formatToken = withTime ? strings.FORMAT_DATE_TIME : strings.FORMAT_FULL_DATE;
    let rangeStart = values[0] && format(values[0], formatToken);
    let rangeEnd = values[1] && format(values[1], formatToken);
    if (this._isNeedSwap(rangeStart, rangeEnd)) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
    }
    this._adapter.setRangeStart(rangeStart);
    this._adapter.setRangeEnd(rangeEnd);
    this._adapter.setHoverDay(rangeEnd);
  }
  _initDateTimePickerFromValue(values) {
    this._initDatePickerFromValue(values);
  }
  _initDateTimeRangePickerFormValue(values) {
    this._initDateRangePickerFromValue(values, true);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  /**
   * sync change another panel month when change months from the else yam panel
   * call it when
   *  - current change panel targe date month is same with another panel date
   *
   * @example
   *  - panelType=right, target=new Date('2022-09-01') and left panel is in '2022-09' => call it, left panel minus one month to '2022-08'
   *  - panelType=left, target=new Date('2021-12-01') and right panel is in '2021-12' => call it, right panel add one month to '2021-01'
   */
  handleSyncChangeMonths(options) {
    const {
      panelType,
      target
    } = options;
    const {
      type
    } = this._adapter.getProps();
    const {
      monthLeft,
      monthRight
    } = this._adapter.getStates();
    if (this.isRangeType(type)) {
      if (panelType === "right" && differenceInCalendarMonths(target, monthLeft.pickerDate) === 0) {
        this.handleYearOrMonthChange("prevMonth", "left", 1, true);
      } else if (panelType === "left" && differenceInCalendarMonths(monthRight.pickerDate, target) === 0) {
        this.handleYearOrMonthChange("nextMonth", "right", 1, true);
      }
    }
  }
  /**
   * Get the target date based on the panel type and switch type
   */
  getTargetChangeDate(options) {
    const {
      panelType,
      switchType
    } = options;
    const {
      monthRight,
      monthLeft
    } = this._adapter.getStates();
    const currentDate = panelType === "left" ? monthLeft.pickerDate : monthRight.pickerDate;
    let target;
    switch (switchType) {
      case "prevMonth":
        target = addMonths(currentDate, -1);
        break;
      case "nextMonth":
        target = addMonths(currentDate, 1);
        break;
      case "prevYear":
        target = addYears(currentDate, -1);
        break;
      case "nextYear":
        target = addYears(currentDate, 1);
        break;
    }
    return target;
  }
  /**
   * Change month by yam panel
   */
  toMonth(panelType, target) {
    const {
      type
    } = this._adapter.getProps();
    const diff = this._getDiff("month", target, panelType);
    this.handleYearOrMonthChange(diff < 0 ? "prevMonth" : "nextMonth", panelType, Math.abs(diff), false);
    if (this.isRangeType(type)) {
      this.handleSyncChangeMonths({
        panelType,
        target
      });
    }
  }
  toYear(panelType, target) {
    const diff = this._getDiff("year", target, panelType);
    this.handleYearOrMonthChange(diff < 0 ? "prevYear" : "nextYear", panelType, Math.abs(diff), false);
  }
  toYearMonth(panelType, target) {
    this.toYear(panelType, target);
    this.toMonth(panelType, target);
  }
  isRangeType(type) {
    const {
      type: typeFromProp
    } = this.getProps();
    const realType = type ? type : typeFromProp;
    return typeof realType === "string" && /range/i.test(realType);
  }
  handleSwitchMonthOrYear(switchType, panelType) {
    const {
      type,
      syncSwitchMonth
    } = this.getProps();
    const rangeType = this.isRangeType(type);
    if (rangeType && syncSwitchMonth) {
      this.handleYearOrMonthChange(switchType, "left", 1, true);
      this.handleYearOrMonthChange(switchType, "right", 1, true);
    } else {
      this.handleYearOrMonthChange(switchType, panelType);
      if (rangeType) {
        const target = this.getTargetChangeDate({
          panelType,
          switchType
        });
        this.handleSyncChangeMonths({
          panelType,
          target
        });
      }
    }
  }
  prevMonth(panelType) {
    this.handleSwitchMonthOrYear("prevMonth", panelType);
  }
  nextMonth(panelType) {
    this.handleSwitchMonthOrYear("nextMonth", panelType);
  }
  prevYear(panelType) {
    this.handleSwitchMonthOrYear("prevYear", panelType);
  }
  nextYear(panelType) {
    this.handleSwitchMonthOrYear("nextYear", panelType);
  }
  /**
   * Calculate the year and month difference
   */
  _getDiff(type, target, panelType) {
    const panelDetail = this._getPanelDetail(panelType);
    const diff = dateDiffFns[type] && dateDiffFns[type](target, panelDetail.pickerDate);
    return diff;
  }
  _getPanelDetail(panelType) {
    return panelType === strings.PANEL_TYPE_RIGHT ? this.getState("monthRight") : this.getState("monthLeft");
  }
  /**
   * Format locale date
   * locale get from LocaleProvider
   * @param {Date} date
   * @param {String} token
   * @returns
   */
  localeFormat(date, token) {
    const dateFnsLocale = this._adapter.getProp("dateFnsLocale");
    return format(date, token, {
      locale: dateFnsLocale
    });
  }
  /**
   * 根据 type 处理 onChange 返回的参数
   *
   *  - 返回的日期需要把用户时间转换为设置的时区时间
   *      - 用户时间：用户计算机系统时间
   *      - 时区时间：通过 ConfigProvider 设置的 timeZone
   *  - 例子：用户设置时区为+9，计算机所在时区为+8区，然后用户选择了22:00
   *      - DatePicker 内部保存日期 state 为 +8 的 22:00 => a = new Date("2021-05-25 22:00:00")
   *      - 传出去时，需要把 +8 的 22:00 => +9 的 22:00 => b = zonedTimeToUtc(a, "+09:00");
   *
   * The parameters returned by onChange are processed according to type
   *
   *  -The returned date needs to convert the user time to the set time zone time
   *      -User time: user computer system time
   *      -Time zone: timeZone set by ConfigProvider
   *  -Example: The user sets the time zone to + 9, and the time zone where the computer is located is + 8, and then the user selects 22:00
   *      -DatePicker internal save date state is + 8 22:00 = > a = new Date ("2021-05-25 22:00:00")
   *      -When passing out, you need to put + 8's 22:00 = > + 9's 22:00 = > b = zonedTimeToUtc (a, "+ 09:00");
   *
   *  e.g.
   *  let a = new Date ("2021-05-25 22:00:00");
   *       = > Tue May 25 2021 22:00:00 GMT + 0800 (China Standard Time)
   *  let b = zonedTimeToUtc (a, "+ 09:00");
   *       = > Tue May 25 2021 21:00:00 GMT + 0800 (China Standard Time)
   *
   * @param {Date|Date[]} value
   */
  disposeCallbackArgs(value) {
    let _value = Array.isArray(value) ? value : value && [value] || [];
    const timeZone = this.getProp("timeZone");
    if (isValidTimeZone(timeZone)) {
      _value = _value.map((date) => zonedTimeToUtc(date, timeZone));
    }
    const type = this.getProp("type");
    const formatToken = this.getProp("format") || getDefaultFormatTokenByType(type);
    let notifyValue, notifyDate;
    switch (type) {
      case "date":
      case "dateTime":
      case "month":
        if (!this._isMultiple()) {
          notifyValue = _value[0] && this.localeFormat(_value[0], formatToken);
          [notifyDate] = _value;
        } else {
          notifyValue = _value.map((v) => v && this.localeFormat(v, formatToken));
          notifyDate = [..._value];
        }
        break;
      case "dateRange":
      case "dateTimeRange":
        notifyValue = _value.map((v) => v && this.localeFormat(v, formatToken));
        notifyDate = [..._value];
        break;
      default:
        break;
    }
    return {
      notifyValue,
      notifyDate
    };
  }
  handleYearOrMonthChange(type) {
    let panelType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings.PANEL_TYPE_LEFT;
    let step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    let notSeparateInRange = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    const {
      autoSwitchDate,
      type: datePanelType
    } = this.getProps();
    const {
      monthLeft,
      monthRight
    } = this.getStates();
    const isRangeType = this.isRangeType(datePanelType);
    const isLeftPanelInRange = isRangeType && panelType === strings.PANEL_TYPE_LEFT;
    const panelDetail = this._getPanelDetail(panelType);
    const {
      pickerDate
    } = panelDetail;
    const fn = dateCalcFns[type];
    const targetMonth = fn(pickerDate, step);
    const panelDateHasUpdate = panelType === strings.PANEL_TYPE_LEFT && !(0, import_isEqual.default)(targetMonth, monthLeft.pickerDate) || panelType === strings.PANEL_TYPE_RIGHT && !(0, import_isEqual.default)(targetMonth, monthRight.pickerDate);
    this._updatePanelDetail(panelType, {
      pickerDate: targetMonth
    });
    if (panelDateHasUpdate) {
      if (!isRangeType) {
        const {
          notifyValue,
          notifyDate
        } = this.disposeCallbackArgs(targetMonth);
        this._adapter.notifyPanelChange(notifyDate, notifyValue);
      } else {
        if (isLeftPanelInRange) {
          this.newBiMonthPanelDate[0] = targetMonth;
        } else {
          this.newBiMonthPanelDate[1] = targetMonth;
        }
        if (!(isLeftPanelInRange && notSeparateInRange)) {
          const {
            notifyValue,
            notifyDate
          } = this.disposeCallbackArgs(this.newBiMonthPanelDate);
          this._adapter.notifyPanelChange(notifyDate, notifyValue);
        }
      }
    }
    if (autoSwitchDate) {
      this.updateDateAfterChangeYM(type, targetMonth);
    }
  }
  /**
   * You have chosen to switch the year and month in the future to directly update the Date without closing the date panel
   * @param {*} type
   * @param {*} targetDate
   */
  updateDateAfterChangeYM(type, targetDate) {
    const {
      multiple,
      disabledDate,
      type: dateType
    } = this.getProps();
    const {
      selected: selectedSet,
      rangeStart,
      rangeEnd,
      monthLeft
    } = this.getStates();
    const includeRange = ["dateRange", "dateTimeRange"].includes(type);
    const options = {
      closePanel: false
    };
    if (!multiple && !includeRange && selectedSet.size) {
      const selectedStr = Array.from(selectedSet)[0];
      const selectedDate = new Date(selectedStr);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();
      let fullDate = set(selectedDate, {
        year,
        month
      });
      if (dateType === "dateTime") {
        fullDate = this._mergeDateAndTime(fullDate, monthLeft.pickerDate);
      }
      if (disabledDate(fullDate, {
        rangeStart,
        rangeEnd
      })) {
        return;
      }
      this._adapter.notifySelectedChange([fullDate], options);
    }
  }
  _isMultiple() {
    return Boolean(this.getProp("multiple")) && this.getProp("type") === "date";
  }
  _isRange() {
  }
  handleDayClick(day, panelType) {
    const type = this.getProp("type");
    switch (true) {
      case (type === "date" || type === "dateTime"):
        this.handleDateSelected(day, panelType);
        break;
      case (type === "dateRange" || type === "dateTimeRange"):
        this.handleRangeSelected(day);
        break;
      default:
        break;
    }
  }
  handleDateSelected(day, panelType) {
    const {
      max,
      type,
      isControlledComponent,
      dateFnsLocale
    } = this.getProps();
    const multiple = this._isMultiple();
    const {
      selected
    } = this.getStates();
    const monthDetail = this._getPanelDetail(panelType);
    const newSelected = new Set(multiple ? [...selected] : []);
    const {
      fullDate
    } = day;
    const time = monthDetail.pickerDate;
    const dateStr = type === "dateTime" ? this._mergeDateAndTime(fullDate, time) : fullDate;
    if (!multiple) {
      newSelected.add(dateStr);
    } else {
      if (newSelected.has(dateStr)) {
        newSelected.delete(dateStr);
      } else if (max && newSelected.size === max) {
        this._adapter.notifyMaxLimit();
      } else {
        newSelected.add(dateStr);
      }
    }
    const dateFormat = this.getValidDateFormat();
    const newSelectedDates = [...newSelected].map((_dateStr) => compatibleParse(_dateStr, dateFormat, void 0, dateFnsLocale));
    this.handleShowDateAndTime(panelType, time);
    if (!isControlledComponent) {
      this._adapter.updateDaySelected(newSelected);
    }
    this._adapter.notifySelectedChange(newSelectedDates);
  }
  handleShowDateAndTime(panelType, pickerDate, showDate) {
    const _showDate = showDate || pickerDate;
    this._updatePanelDetail(panelType, {
      showDate: _showDate,
      pickerDate
    });
  }
  /**
   * link date and time
   *
   * @param {Date|string} date
   * @param {Date|string} time
   * @returns {Date}
   */
  _mergeDateAndTime(date, time) {
    const dateFnsLocale = this._adapter.getProp("dateFnsLocale");
    const dateStr = format(isValidDate(date) ? date : compatibleParse(date, strings.FORMAT_FULL_DATE, void 0, dateFnsLocale), strings.FORMAT_FULL_DATE);
    const timeStr = format(isValidDate(time) ? time : compatibleParse(time, strings.FORMAT_TIME_PICKER, void 0, dateFnsLocale), strings.FORMAT_TIME_PICKER);
    const timeFormat = this.getValidTimeFormat();
    return compatibleParse(`${dateStr} ${timeStr}`, timeFormat, void 0, dateFnsLocale);
  }
  handleRangeSelected(day) {
    let {
      rangeStart,
      rangeEnd
    } = this.getStates();
    const {
      startDateOffset,
      endDateOffset,
      type,
      dateFnsLocale,
      rangeInputFocus,
      triggerRender
    } = this._adapter.getProps();
    const {
      fullDate
    } = day;
    let rangeStartReset = false;
    let rangeEndReset = false;
    const isDateRangeAndHasOffset = (startDateOffset || endDateOffset) && type === "dateRange";
    if (isDateRangeAndHasOffset) {
      rangeStart = getFullDateOffset_default(startDateOffset, fullDate);
      rangeEnd = getFullDateOffset_default(endDateOffset, fullDate);
    } else {
      if (rangeInputFocus === "rangeEnd") {
        rangeEnd = fullDate;
        if (rangeStart && rangeEnd && isBefore(rangeEnd, rangeStart.trim().split(/\s+/)[0])) {
          rangeStart = null;
          rangeStartReset = true;
        }
      } else if (rangeInputFocus === "rangeStart" || !rangeInputFocus) {
        rangeStart = fullDate;
        if (rangeStart && rangeEnd && isBefore(rangeEnd.trim().split(/\s+/)[0], rangeStart)) {
          rangeEnd = null;
          rangeEndReset = true;
        }
      }
    }
    const isRangeType = /range/i.test(type);
    if (isRangeType) {
      if (isDateRangeAndHasOffset) {
        this._adapter.setRangeStart(rangeStart);
        this._adapter.setRangeEnd(rangeEnd);
      } else {
        if (rangeInputFocus === "rangeEnd") {
          this._adapter.setRangeEnd(rangeEnd);
          if (rangeStartReset) {
            this._adapter.setRangeStart(rangeStart);
          }
          if (!this._adapter.isAnotherPanelHasOpened("rangeEnd") || !rangeStart) {
            this._adapter.setRangeInputFocus("rangeStart");
          }
        } else if (rangeInputFocus === "rangeStart" || !rangeInputFocus) {
          this._adapter.setRangeStart(rangeStart);
          if (rangeEndReset) {
            this._adapter.setRangeEnd(rangeEnd);
          }
          if (!this._adapter.isAnotherPanelHasOpened("rangeStart") || !rangeEnd) {
            this._adapter.setRangeInputFocus("rangeEnd");
          }
        }
      }
    }
    const dateFormat = this.getValidDateFormat();
    if (rangeStart || rangeEnd) {
      const [startDate, endDate] = [compatibleParse(rangeStart, dateFormat, void 0, dateFnsLocale), compatibleParse(rangeEnd, dateFormat, void 0, dateFnsLocale)];
      let date = [startDate, endDate];
      if (type === "dateTimeRange") {
        const startTime = this.getState("monthLeft").pickerDate;
        const endTime = this.getState("monthRight").pickerDate;
        const start = rangeStart ? this._mergeDateAndTime(rangeStart, startTime) : null;
        const end = rangeEnd ? this._mergeDateAndTime(rangeEnd, endTime) : null;
        if (isSameDay(startDate, endDate) && isBefore(end, start)) {
          date = [start, start];
        } else {
          date = [start, end];
        }
      }
      const needCheckFocusRecord = !(type === "dateRange" && isDateRangeAndHasOffset);
      this._adapter.notifySelectedChange(date, {
        needCheckFocusRecord
      });
    }
  }
  _isNeedSwap(rangeStart, rangeEnd) {
    return rangeStart && rangeEnd && isBefore(rangeEnd, rangeStart);
  }
  /**
   * Day may be empty, this is unhover state
   * @param {*} day
   */
  handleDayHover() {
    let day = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      fullDate: ""
    };
    let panelType = arguments.length > 1 ? arguments[1] : void 0;
    const {
      fullDate
    } = day;
    const {
      startDateOffset,
      endDateOffset,
      type
    } = this.getProps();
    this._adapter.setHoverDay(fullDate);
    if ((startDateOffset || endDateOffset) && type === "dateRange") {
      const offsetRangeStart = getFullDateOffset_default(startDateOffset, fullDate);
      const offsetRangeEnd = getFullDateOffset_default(endDateOffset, fullDate);
      this._adapter.setOffsetRangeStart(offsetRangeStart);
      this._adapter.setOffsetRangeEnd(offsetRangeEnd);
    }
  }
  // Guarantee that monthLeft, monthRight will not appear in the same month or monthLeft is greater than MonthRight
  _autoAdjustMonth(monthLeft, monthRight) {
    let newMonthLeft = monthLeft;
    let newMonthRight = monthRight;
    const difference = differenceInCalendarMonths(monthLeft.pickerDate, monthRight.pickerDate);
    if (difference > 0) {
      newMonthLeft = Object.assign({}, monthRight);
      newMonthRight = Object.assign({}, monthLeft);
    } else if (difference === 0) {
      newMonthLeft = monthLeft;
      newMonthRight = Object.assign(Object.assign({}, monthRight), {
        pickerDate: addMonths(monthRight.pickerDate, 1)
      });
    }
    return {
      monthLeft: newMonthLeft,
      monthRight: newMonthRight
    };
  }
  getValidTimeFormat() {
    const formatProp = this.getProp("format") || strings.FORMAT_TIME_PICKER;
    const timeFormatTokens = [];
    if ((0, import_includes.default)(formatProp, "h") || (0, import_includes.default)(formatProp, "H")) {
      timeFormatTokens.push("HH");
    }
    if ((0, import_includes.default)(formatProp, "m")) {
      timeFormatTokens.push("mm");
    }
    if ((0, import_includes.default)(formatProp, "s")) {
      timeFormatTokens.push("ss");
    }
    return timeFormatTokens.join(":");
  }
  getValidDateFormat() {
    return this.getProp("format") || getDefaultFormatToken_default(this.getProp("type"));
  }
  handleTimeChange(newTime, panelType) {
    const {
      rangeEnd,
      rangeStart
    } = this.getStates();
    const dateFnsLocale = this.getProp("dateFnsLocale");
    const ts = newTime.timeStampValue;
    const type = this.getProp("type");
    const panelDetail = this._getPanelDetail(panelType);
    const {
      showDate
    } = panelDetail;
    const timeDate = new Date(ts);
    const dateFormat = this.getValidDateFormat();
    const destRange = panelType === strings.PANEL_TYPE_RIGHT ? rangeEnd : rangeStart;
    let year, monthNo, date;
    if (type === "dateTimeRange" && destRange) {
      const rangeDate = compatibleParse(destRange, dateFormat, void 0, dateFnsLocale);
      year = rangeDate.getFullYear();
      monthNo = rangeDate.getMonth();
      date = rangeDate.getDate();
    } else {
      year = showDate.getFullYear();
      monthNo = showDate.getMonth();
      date = showDate.getDate();
    }
    const hours = timeDate.getHours();
    const minutes = timeDate.getMinutes();
    const seconds = timeDate.getSeconds();
    const milSeconds = timeDate.getMilliseconds();
    const dateArgs = [year, monthNo, date, hours, minutes, seconds, milSeconds];
    const fullValidDate = new Date(...dateArgs);
    if (type === "dateTimeRange") {
      this.handleShowDateAndTime(panelType, fullValidDate, showDate);
      this._updateTimeInDateRange(panelType, fullValidDate);
    } else {
      const fullDate = formatFullDate(year, monthNo + 1, date);
      this.handleDateSelected({
        fullDate,
        fullValidDate
      }, panelType);
      this.handleShowDateAndTime(panelType, fullValidDate);
      this._adapter.notifySelectedChange([fullValidDate]);
    }
  }
  /**
   * Update the time part in the range
   * @param {string} panelType
   * @param {Date} timeDate
   */
  _updateTimeInDateRange(panelType, timeDate) {
    const {
      isControlledComponent,
      dateFnsLocale
    } = this.getProps();
    let rangeStart = this.getState("rangeStart");
    let rangeEnd = this.getState("rangeEnd");
    const dateFormat = this.getValidDateFormat();
    if (rangeStart && rangeEnd) {
      let startDate = compatibleParse(rangeStart, dateFormat, void 0, dateFnsLocale);
      let endDate = compatibleParse(rangeEnd, dateFormat, void 0, dateFnsLocale);
      if (panelType === strings.PANEL_TYPE_RIGHT) {
        endDate = this._mergeDateAndTime(timeDate, timeDate);
        rangeEnd = format(endDate, strings.FORMAT_DATE_TIME);
        if (this._isNeedSwap(rangeStart, rangeEnd)) {
          [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
          [startDate, endDate] = [endDate, startDate];
        }
        if (!isControlledComponent) {
          this._adapter.setRangeEnd(rangeEnd);
        }
      } else {
        startDate = this._mergeDateAndTime(timeDate, timeDate);
        rangeStart = format(startDate, strings.FORMAT_DATE_TIME);
        if (this._isNeedSwap(rangeStart, rangeEnd)) {
          [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
          [startDate, endDate] = [endDate, startDate];
        }
        if (!isControlledComponent) {
          this._adapter.setRangeStart(rangeStart);
        }
      }
      this._adapter.notifySelectedChange([startDate, endDate]);
    }
  }
  _updatePanelDetail(panelType, kvs) {
    const {
      monthLeft,
      monthRight
    } = this.getStates();
    if (panelType === strings.PANEL_TYPE_RIGHT) {
      this._adapter.updateMonthOnRight(Object.assign(Object.assign({}, monthRight), kvs));
    } else {
      this._adapter.updateMonthOnLeft(Object.assign(Object.assign({}, monthLeft), kvs));
    }
  }
  showYearPicker(panelType) {
    this._updatePanelDetail(panelType, {
      isTimePickerOpen: false,
      isYearPickerOpen: true
    });
  }
  showTimePicker(panelType, opt) {
    if (this.getProp("disabledTimePicker")) {
      return;
    }
    this._updatePanelDetail(panelType, {
      isTimePickerOpen: true,
      isYearPickerOpen: false
    });
  }
  showDatePanel(panelType) {
    this._updatePanelDetail(panelType, {
      isTimePickerOpen: false,
      isYearPickerOpen: false
    });
  }
  /**
   * Get year and month panel open type
   *
   * It is useful info to set minHeight of weeks.
   *  - When yam open type is 'left' or 'right', weeks minHeight should be set
   *    If the minHeight is not set, the change of the number of weeks will cause the scrollList to be unstable
   */
  getYAMOpenType() {
    const {
      monthLeft,
      monthRight
    } = this._adapter.getStates();
    const leftYearPickerOpen = monthLeft.isYearPickerOpen;
    const rightYearPickerOpen = monthRight.isYearPickerOpen;
    if (leftYearPickerOpen && rightYearPickerOpen) {
      return "both";
    } else if (leftYearPickerOpen) {
      return "left";
    } else if (rightYearPickerOpen) {
      return "right";
    } else {
      return "none";
    }
  }
};
export {
  MonthsGridFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_datePicker_monthsGridFoundation.js.map
