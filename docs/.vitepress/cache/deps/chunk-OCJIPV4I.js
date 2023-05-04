// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/dom.js
function append(parentNode) {
  for (var _len = arguments.length, nodes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    nodes[_key - 1] = arguments[_key];
  }
  for (const node of nodes) {
    parentNode.appendChild(node);
  }
  return parentNode;
}
function prepend(parentNode) {
  for (var _len2 = arguments.length, nodes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    nodes[_key2 - 1] = arguments[_key2];
  }
  if (parentNode.children && parentNode.children.length) {
    const firstNode = parentNode.children[0];
    for (const node of nodes) {
      parentNode.insertBefore(node, firstNode);
    }
  } else {
    append(parentNode, ...nodes);
  }
  return parentNode;
}
function convertDOMRectToObject(domRect) {
  if (domRect && typeof domRect === "object") {
    if (typeof domRect.toJSON === "function") {
      return domRect.toJSON();
    } else {
      const keys = ["left", "top", "right", "bottom", "width", "height"];
      return keys.reduce((obj, key) => {
        obj[key] = domRect[key];
        return obj;
      }, {});
    }
  }
  return void 0;
}

export {
  append,
  prepend,
  convertDOMRectToObject
};
//# sourceMappingURL=chunk-OCJIPV4I.js.map
