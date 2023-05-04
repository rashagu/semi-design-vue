import {
  require_get
} from "./chunk-HGGG6L4M.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/a11y.js
var import_get = __toESM(require_get());
function handlePrevent(event) {
  event.stopPropagation();
  event.preventDefault();
}
function isPrintableCharacter(string) {
  return string.length === 1 && string.match(/\S/);
}
function setFocusToItem(itemNodes, targetItem) {
  for (let i = 0; i < itemNodes.length; i++) {
    if (itemNodes[i] === targetItem) {
      itemNodes[i].tabIndex = 0;
      itemNodes[i].focus();
    } else {
      itemNodes[i].tabIndex = -1;
    }
  }
}
function setFocusToFirstItem(itemNodes) {
  itemNodes.length > 0 && setFocusToItem(itemNodes, itemNodes[0]);
}
function setFocusToLastItem(itemNodes) {
  itemNodes.length > 0 && setFocusToItem(itemNodes, itemNodes[itemNodes.length - 1]);
}
function setFocusToPreviousMenuItem(itemNodes, currentItem) {
  let newMenuItem, index;
  if (itemNodes.length > 0) {
    if (currentItem === itemNodes[0]) {
      newMenuItem = itemNodes[itemNodes.length - 1];
    } else {
      index = itemNodes.indexOf(currentItem);
      newMenuItem = itemNodes[index - 1];
    }
    setFocusToItem(itemNodes, newMenuItem);
  }
}
function setFocusToNextMenuitem(itemNodes, currentItem) {
  let newMenuItem, index;
  if (itemNodes.length > 0) {
    if (currentItem === itemNodes[itemNodes.length - 1]) {
      newMenuItem = itemNodes[0];
    } else {
      index = itemNodes.indexOf(currentItem);
      newMenuItem = itemNodes[index + 1];
    }
    setFocusToItem(itemNodes, newMenuItem);
  }
}
function findIndexByCharacter(itemList, curItem, firstCharList, char) {
  let start, index;
  if (!itemList || !firstCharList || !char || char.length > 1) {
    return -1;
  }
  char = char.toLowerCase();
  start = itemList.indexOf(curItem) + 1;
  if (start >= itemList.length) {
    start = 0;
  }
  index = firstCharList.indexOf(char, start);
  if (index === -1) {
    index = firstCharList.indexOf(char, 0);
  }
  return index >= 0 ? index : -1;
}
function getAncestorNodeByRole(curElement, role) {
  if (!curElement) {
    return null;
  }
  while (curElement.parentElement && (0, import_get.default)(curElement.parentElement, "attributes.role.value", "") !== role) {
    curElement = curElement.parentElement;
  }
  return curElement.parentElement;
}
function getMenuButton(focusableEle, Id) {
  for (let i = 0; i < focusableEle.length; i++) {
    const curAriDescribedby = focusableEle[i].attributes["data-popupid"];
    if (curAriDescribedby && curAriDescribedby.value === Id) {
      return focusableEle[i];
    }
  }
  return null;
}

export {
  handlePrevent,
  isPrintableCharacter,
  setFocusToItem,
  setFocusToFirstItem,
  setFocusToLastItem,
  setFocusToPreviousMenuItem,
  setFocusToNextMenuitem,
  findIndexByCharacter,
  getAncestorNodeByRole,
  getMenuButton
};
//# sourceMappingURL=chunk-M6FOBOF7.js.map
