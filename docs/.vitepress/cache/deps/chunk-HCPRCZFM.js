import {
  getDefaultFormatTokenByType
} from "./chunk-IJHWV7C2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getInsetInputFormatToken.js
function getInsetInputFormatToken(options) {
  const {
    format,
    type
  } = options;
  const dateReg = /([yMd]{0,4}[^a-z\s]*[yMd]{0,4}[^a-z\s]*[yMd]{0,4})/i;
  const dateTimeReg = /([yMd]{0,4}[^a-z\s]*[yMd]{0,4}[^a-z\s]*[yMd]{0,4}) (H{0,2}[^a-z\s]*m{0,2}[^a-z\s]*s{0,2})/i;
  const defaultToken = getDefaultFormatTokenByType(type);
  let insetInputFormat;
  switch (type) {
    case "dateTime":
    case "dateTimeRange":
      const dateTimeResult = dateTimeReg.exec(format);
      insetInputFormat = dateTimeResult && dateTimeResult[1] && dateTimeResult[2] ? `${dateTimeResult[1]} ${dateTimeResult[2]}` : defaultToken;
      break;
    case "date":
    case "month":
    case "monthRange":
    case "dateRange":
    default:
      const dateResult = dateReg.exec(format);
      insetInputFormat = dateResult && dateResult[1] || defaultToken;
      break;
  }
  return insetInputFormat;
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getInsetInputValueFromInsetInputStr.js
function getInsetInputValueFromInsetInputStr(options) {
  const timeSeparator = " ";
  const {
    inputValue = "",
    rangeSeparator,
    type
  } = options;
  let leftDateInput, leftTimeInput, rightDateInput, rightTimeInput;
  const insetInputValue = {
    monthLeft: {
      dateInput: "",
      timeInput: ""
    },
    monthRight: {
      dateInput: "",
      timeInput: ""
    }
  };
  switch (type) {
    case "date":
    case "month":
    case "monthRange":
      insetInputValue.monthLeft.dateInput = inputValue;
      break;
    case "dateRange":
      [leftDateInput = "", rightDateInput = ""] = inputValue.split(rangeSeparator);
      insetInputValue.monthLeft.dateInput = leftDateInput;
      insetInputValue.monthRight.dateInput = rightDateInput;
      break;
    case "dateTime":
      [leftDateInput = "", leftTimeInput = ""] = inputValue.split(timeSeparator);
      insetInputValue.monthLeft.dateInput = leftDateInput;
      insetInputValue.monthLeft.timeInput = leftTimeInput;
      break;
    case "dateTimeRange":
      const [leftInput = "", rightInput = ""] = inputValue.split(rangeSeparator);
      [leftDateInput = "", leftTimeInput = ""] = leftInput.split(timeSeparator);
      [rightDateInput = "", rightTimeInput = ""] = rightInput.split(timeSeparator);
      insetInputValue.monthLeft.dateInput = leftDateInput;
      insetInputValue.monthLeft.timeInput = leftTimeInput;
      insetInputValue.monthRight.dateInput = rightDateInput;
      insetInputValue.monthRight.timeInput = rightTimeInput;
      break;
  }
  return insetInputValue;
}

export {
  getInsetInputFormatToken,
  getInsetInputValueFromInsetInputStr
};
//# sourceMappingURL=chunk-HCPRCZFM.js.map
