import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/copy-text-to-clipboard@3.0.1/node_modules/copy-text-to-clipboard/index.js
function copyTextToClipboard(input, { target = document.body } = {}) {
  const element = document.createElement("textarea");
  const previouslyFocusedElement = document.activeElement;
  element.value = input;
  element.setAttribute("readonly", "");
  element.style.contain = "strict";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.fontSize = "12pt";
  const selection = document.getSelection();
  let originalRange = false;
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }
  target.append(element);
  element.select();
  element.selectionStart = 0;
  element.selectionEnd = input.length;
  let isSuccess = false;
  try {
    isSuccess = document.execCommand("copy");
  } catch {
  }
  element.remove();
  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  return isSuccess;
}
export {
  copyTextToClipboard as default
};
//# sourceMappingURL=copy-text-to-clipboard.js.map
