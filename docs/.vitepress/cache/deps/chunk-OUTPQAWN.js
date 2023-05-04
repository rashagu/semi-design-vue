// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/isObject.js
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/isPromise.js
function isPromise(value) {
  return isObject(value) && typeof value.then === "function";
}

export {
  isPromise
};
//# sourceMappingURL=chunk-OUTPQAWN.js.map
