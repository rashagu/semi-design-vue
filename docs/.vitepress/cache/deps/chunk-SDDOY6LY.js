// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/uuid.js
function getUuid(prefix) {
  return `${prefix}-${(/* @__PURE__ */ new Date()).getTime()}-${Math.random()}`;
}
function getUuidv4() {
  var _a, _b;
  try {
    return (_b = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.randomUUID) === null || _a === void 0 ? void 0 : _a.call(crypto)) !== null && _b !== void 0 ? _b : String(1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
  } catch (err) {
    return getUuid("semi");
  }
}
function getUuidShort() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    prefix = "",
    length = 7
  } = options;
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  const total = characters.length;
  let randomId = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * total);
    randomId += characters.charAt(random);
  }
  return prefix ? `${prefix}-${randomId}` : randomId;
}

export {
  getUuid,
  getUuidv4,
  getUuidShort
};
//# sourceMappingURL=chunk-SDDOY6LY.js.map
