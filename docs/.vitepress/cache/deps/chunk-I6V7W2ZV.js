// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isValidDate.js
function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/isNumber.js
function isNumber(value) {
  return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isTimestamp.js
function isTimestamp(ts) {
  return isNumber(ts) && isValidDate(new Date(ts));
}

export {
  isValidDate,
  isNumber,
  isTimestamp
};
//# sourceMappingURL=chunk-I6V7W2ZV.js.map
