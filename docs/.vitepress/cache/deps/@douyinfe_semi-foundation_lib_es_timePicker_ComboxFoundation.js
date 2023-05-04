import {
  strings
} from "./chunk-RB57XKKA.js";
import "./chunk-FJWCGZ7W.js";
import "./chunk-IJHWV7C2.js";
import {
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import "./chunk-EJKQFAKC.js";
import "./chunk-KN6CCDTX.js";
import "./chunk-GQ5WYOGJ.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
import "./chunk-B2OBPHGV.js";
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
import "./chunk-V4DHZKW4.js";
import "./chunk-WCAXN4E7.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/timePicker/ComboxFoundation.js
var HOUR = 1e3 * 60 * 60;
var DAY = 24 * HOUR;
var formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }
  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }
  return {
    value,
    disabled
  };
};
function generateOptions(length, disabledOptions, hideDisabledOptions) {
  let step = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const arr = [];
  for (let value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}
var ComboboxFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  isAM() {
    return this.getProp("isAM");
  }
  initData() {
    const {
      timeStampValue,
      hourStep,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      minuteStep,
      secondStep
    } = this.getProps();
    const format = this.getValidFormat();
    const dateTime = this.getDisplayDateFromTimeStamp(timeStampValue);
    const disabledHourOptions = this.disabledHours();
    const disabledMinuteOptions = disabledMinutes(dateTime ? dateTime.getHours() : null);
    const disabledSecondOptions = disabledSeconds(dateTime ? dateTime.getHours() : null, dateTime ? dateTime.getMinutes() : null);
    const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
    const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
    const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);
    return {
      showHour: Boolean(format.match(/HH|hh|H|h/g)),
      showMinute: Boolean(format.match(/mm/g)),
      showSecond: Boolean(format.match(/ss/g)),
      hourOptions,
      minuteOptions,
      secondOptions
    };
  }
  getPosition() {
    const position = this.getProp("position");
    const type = this.getProp("type") || strings.DEFAULT_TYPE;
    return position || strings.DEFAULT_POSITION[type];
  }
  getDefaultFormatIfNeed() {
    if (this._isInProps("format")) {
      return this.getProp("format");
    } else if (this.getProp("use12Hours")) {
      return strings.DEFAULT_FORMAT_A;
    } else {
      return strings.DEFAULT_FORMAT;
    }
  }
  disabledHours() {
    const {
      use12Hours,
      disabledHours
    } = this.getProps();
    let disabledOptions = disabledHours && disabledHours();
    if (use12Hours && Array.isArray(disabledOptions)) {
      if (this.isAM()) {
        disabledOptions = disabledOptions.filter((h) => h < 12).map((h) => h === 0 ? 12 : h);
      } else {
        disabledOptions = disabledOptions.map((h) => h === 12 ? 12 : h - 12);
      }
    }
    return disabledOptions;
  }
  getValidFormat(format) {
    let _format = isNullOrUndefined(format) ? this.getProp("format") : format;
    _format = this.getDefaultFormatIfNeed();
    _format = typeof _format === "string" ? _format : strings.DEFAULT_FORMAT;
    return _format;
  }
  /**
   * from 13-bit timestamp  -> get display date
   * by combobox use
   */
  getDisplayDateFromTimeStamp(timeStamp) {
    let date;
    if (timeStamp) {
      date = new Date(timeStamp);
    }
    if (!timeStamp || !isValidDate(date)) {
      return this.createDateDefault();
    }
    return date;
  }
  /**
   * create a date at 00:00:00
   */
  createDateDefault() {
    return new Date(parseInt(String(Date.now() / DAY), 10) * DAY - 8 * HOUR);
  }
};
var ComboxFoundation_default = ComboboxFoundation;
export {
  ComboxFoundation_default as default,
  formatOption
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_timePicker_ComboxFoundation.js.map
