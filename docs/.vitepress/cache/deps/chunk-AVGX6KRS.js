// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/isElement.js
function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return typeof obj === "object" && obj.nodeType === 1 && typeof obj.style === "object" && typeof obj.ownerDocument === "object";
  }
}

export {
  isElement
};
//# sourceMappingURL=chunk-AVGX6KRS.js.map
