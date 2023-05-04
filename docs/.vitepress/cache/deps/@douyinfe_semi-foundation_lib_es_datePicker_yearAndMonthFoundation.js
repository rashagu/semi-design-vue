import {
  setMonth,
  setYear
} from "./chunk-EJKQFAKC.js";
import {
  require_cloneDeep
} from "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import {
  strings
} from "./chunk-KN6CCDTX.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/yearAndMonthFoundation.js
var import_cloneDeep = __toESM(require_cloneDeep());
var YearAndMonthFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  selectYear(item, panelType) {
    const {
      currentYear,
      currentMonth
    } = this.getStates();
    const {
      type
    } = this.getProps();
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    const year = (0, import_cloneDeep.default)(currentYear);
    year[panelType] = item.value;
    if (type === "monthRange") {
      const isSameYearIllegalDate = year[left] === year[right] && currentMonth[left] > currentMonth[right];
      if (panelType === left && item.value > year[right] || panelType === left && isSameYearIllegalDate) {
        year[right] = item.value + 1;
      } else if (panelType === right && isSameYearIllegalDate) {
        year[left] = item.value - 1;
      }
    }
    this._adapter.setCurrentYear(year, () => this.autoSelectMonth(item, panelType, year));
    this._adapter.notifySelectYear(year);
  }
  selectMonth(item, panelType) {
    const {
      currentMonth,
      currentYear
    } = this.getStates();
    const {
      type
    } = this.getProps();
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    const month = (0, import_cloneDeep.default)(currentMonth);
    month[panelType] = item.month;
    if (type === "monthRange" && panelType === left && currentYear[left] === currentYear[right] && item.value > month[right]) {
      month[right] = item.month + 1;
    }
    this._adapter.setCurrentMonth(month);
    this._adapter.notifySelectMonth(month);
  }
  /**
   * After selecting a year, if the currentMonth is disabled, automatically select a non-disabled month
   */
  autoSelectMonth(item, panelType, year) {
    const {
      disabledDate,
      locale
    } = this._adapter.getProps();
    const {
      months,
      currentMonth
    } = this._adapter.getStates();
    const currentDate = setYear(Date.now(), item.year);
    const isCurrentMonthDisabled = disabledDate(setMonth(currentDate, currentMonth[panelType] - 1));
    if (isCurrentMonthDisabled) {
      const currentIndex = months.findIndex((_ref) => {
        let {
          month
        } = _ref;
        return month === currentMonth[panelType];
      });
      let validMonth;
      validMonth = months.slice(currentIndex).find((_ref2) => {
        let {
          month
        } = _ref2;
        return !disabledDate(setMonth(currentDate, month - 1));
      });
      if (!validMonth) {
        validMonth = months.slice(0, currentIndex).find((_ref3) => {
          let {
            month
          } = _ref3;
          return !disabledDate(setMonth(currentDate, month - 1));
        });
      }
      if (validMonth) {
        const month = (0, import_cloneDeep.default)(currentMonth);
        month[panelType] = validMonth.month;
        this._adapter.setCurrentYearAndMonth(year, month);
        this._adapter.notifySelectYearAndMonth(year, month);
      }
    }
  }
  backToMain() {
    this._adapter.notifyBackToMain();
  }
};
export {
  YearAndMonthFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_datePicker_yearAndMonthFoundation.js.map
