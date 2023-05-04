import {
  format,
  getDaysInMonth,
  lastDayOfMonth,
  startOfMonth
} from "./chunk-EJKQFAKC.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getMonthTable.js
function formatFullDate() {
  let year = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let month = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  let day = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  let dateStr = "";
  const monthFull = typeof month === "number" && month < 10 ? `0${month}` : month.toString();
  const dayNumberFull = typeof day === "number" && day < 10 ? `0${day}` : day.toString();
  dateStr = `${String(year)}-${monthFull}-${dayNumberFull}`;
  return dateStr;
}
function getWeeks(date) {
  let weekStartsOn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const weekDayNotInMonth = {
    dayNumber: "",
    dateNumberFull: "",
    fullDate: ""
  };
  const daysInMonth = getDaysInMonth(date);
  const year = format(date, "yyyy");
  const month = format(date, "MM");
  const lastday = lastDayOfMonth(date);
  const firstDay = startOfMonth(date);
  const firstDayInWeek = Number(format(firstDay, "e", {
    weekStartsOn
  }));
  const weeks = [];
  let week = [];
  for (let s = 1; s < firstDayInWeek; s++) {
    week.push(weekDayNotInMonth);
  }
  for (let d = 0; d < daysInMonth; d++) {
    const dayNumber = d + 1;
    const dayNumberFull = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const fullDate = formatFullDate(year, month, dayNumber);
    week.push({
      dayNumber,
      dayNumberFull,
      fullDate
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    } else if (fullDate === format(lastday, "yyyy-MM-dd")) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
}
var getMonthTable = (month, weekStartsOn) => {
  const weeks = getWeeks(month, weekStartsOn);
  const monthText = format(month, "yyyy-MM");
  return {
    monthText,
    weeks,
    month
  };
};
var getMonthTable_default = getMonthTable;

export {
  formatFullDate,
  getMonthTable_default
};
//# sourceMappingURL=chunk-7DNOJ372.js.map
