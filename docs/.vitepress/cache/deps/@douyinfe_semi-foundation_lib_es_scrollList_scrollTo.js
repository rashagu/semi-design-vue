import {
  Animation
} from "./chunk-MP5KU5H3.js";
import "./chunk-XADEZ2D6.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/scrollList/scrollTo.js
var scrollTo = (element, to, duration) => {
  const animation = new Animation({
    from: {
      scrollTop: element.scrollTop
    },
    to: {
      scrollTop: to
    }
  }, {
    duration
  });
  animation.on("frame", (_ref) => {
    let {
      scrollTop
    } = _ref;
    element.scrollTop = scrollTop;
  });
  return animation;
};
var scrollTo_default = scrollTo;
export {
  scrollTo_default as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_scrollList_scrollTo.js.map
