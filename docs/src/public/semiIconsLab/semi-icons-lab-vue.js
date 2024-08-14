import { defineComponent as t, createVNode as l, mergeProps as o, onActivated as N1, ref as O1 } from "vue";
const R1 = "semi";
function U1(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var w = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(n) {
  (function() {
    var e = {}.hasOwnProperty;
    function C() {
      for (var r = "", u = 0; u < arguments.length; u++) {
        var c = arguments[u];
        c && (r = a(r, h(c)));
      }
      return r;
    }
    function h(r) {
      if (typeof r == "string" || typeof r == "number")
        return r;
      if (typeof r != "object")
        return "";
      if (Array.isArray(r))
        return C.apply(null, r);
      if (r.toString !== Object.prototype.toString && !r.toString.toString().includes("[native code]"))
        return r.toString();
      var u = "";
      for (var c in r)
        e.call(r, c) && r[c] && (u = a(u, c));
      return u;
    }
    function a(r, u) {
      return u ? r ? r + " " + u : r + u : r;
    }
    n.exports ? (C.default = C, n.exports = C) : window.classNames = C;
  })();
})(w);
var G1 = w.exports;
const q1 = /* @__PURE__ */ U1(G1), i = {
  size: String,
  spin: Boolean,
  rotate: Number,
  prefixCls: String,
  type: String,
  className: String,
  style: Object,
  svg: Object,
  onClick: Function,
  role: String,
  tabIndex: Number,
  onKeypress: Function
}, m = /* @__PURE__ */ t((n, {
  slots: e
}) => () => {
  const {
    svg: C,
    spin: h = !1,
    rotate: a,
    style: r,
    className: u,
    prefixCls: c = R1,
    type: f,
    size: p = "default",
    ...P1
  } = n, j1 = q1(`${c}-icon`, {
    [`${c}-icon-extra-small`]: p === "extra-small",
    // 8x8
    [`${c}-icon-small`]: p === "small",
    // 12x12
    [`${c}-icon-default`]: p === "default",
    // 16x16
    [`${c}-icon-large`]: p === "large",
    // 20x20
    [`${c}-icon-extra-large`]: p === "extra-large",
    // 24x24
    [`${c}-icon-spinning`]: h,
    [`${c}-icon-${f}`]: !!f
  }, u), d = {};
  return Number.isSafeInteger(a) && (d.transform = `rotate(${a}deg)`), Object.assign(d, r), l("span", o({
    role: "img",
    class: j1,
    style: d
  }, P1), [e.default ? e.default() : C]);
}, {
  props: i,
  name: "Icon"
}), s = /* @__PURE__ */ t((n, {
  slots: e
}) => (N1(() => {
}), () => {
  const C = {};
  return Object.keys(n).forEach((h) => {
    n[h] && (C[h] = n[h]);
  }), l(m, o({
    type: n.iconType,
    ref: O1
  }, C), {
    default: () => e.default ? e.default() : null
  });
}), {
  props: {
    ...i,
    svg: Object,
    iconType: String
  },
  name: "ConvertIcon"
}), f3 = m, z1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 4,
  r: 3,
  fill: "#4CC3FA"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M2 9.5C2 8.67157 2.67157 8 3.5 8H8H16H20.5C21.3284 8 22 8.67157 22 9.5C22 10.3284 21.3284 11 20.5 11H16V15.5V17V21.5C16 22.3284 15.3284 23 14.5 23C13.6716 23 13 22.3284 13 21.5V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V21.5C11 22.3284 10.3284 23 9.5 23C8.67157 23 8 22.3284 8 21.5V17V15.5V11H3.5C2.67157 11 2 10.3284 2 9.5Z",
  fill: "#6A6F7F"
}, null)])), g = /* @__PURE__ */ t({
  name: "IconAccessibility",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "accessibility"
    }, n), {
      default: () => l(z1, null, null)
    });
  }
});
g.props = i;
const w3 = g, W1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M6.16667 12H3.66667C3.66667 16.6024 7.39763 20.3333 12 20.3333C16.6024 20.3333 20.3333 16.6024 20.3333 12H17.8333",
  stroke: "#AAB2BF",
  "stroke-width": 2,
  "stroke-linejoin": "round"
}, null), l("path", {
  d: "M12 20.3333V7.83333",
  stroke: "#818A9B",
  "stroke-width": 2,
  "stroke-linejoin": "round"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12.0016 9.83667C13.7054 9.83667 15.0866 8.45545 15.0866 6.75167C15.0866 5.04787 13.7054 3.66667 12.0016 3.66667C10.2978 3.66667 8.91663 5.04787 8.91663 6.75167C8.91663 8.45545 10.2978 9.83667 12.0016 9.83667Z",
  fill: "#324350",
  stroke: "#324350",
  "stroke-width": 1.25,
  "stroke-linejoin": "round"
}, null)])), v = /* @__PURE__ */ t({
  name: "IconAnchor",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "anchor"
    }, n), {
      default: () => l(W1, null, null)
    });
  }
});
v.props = i;
const m3 = v, K1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M3.0918 16.3105C3.54883 16.3105 3.80273 16.0757 3.98047 15.479L4.46289 14.0063H7.50342L7.99219 15.479C8.16357 16.0693 8.43018 16.3105 8.89355 16.3105C9.38232 16.3105 9.70605 16.0186 9.70605 15.5615C9.70605 15.3838 9.66162 15.1743 9.57275 14.9014L7.38916 8.64258C7.11621 7.83008 6.73535 7.5 6.01807 7.5C5.29443 7.5 4.90723 7.83643 4.63428 8.64258L2.45068 14.9014C2.34277 15.2251 2.29834 15.4219 2.29834 15.5933C2.29834 16.0249 2.62207 16.3105 3.0918 16.3105ZM4.84375 12.7305L5.94824 9.22656H6.03076L7.12891 12.7305H4.84375Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M10.9312 15.1362C10.9312 15.8726 11.3057 16.2344 12.0737 16.2344H14.5366C16.3711 16.2344 17.5518 15.2759 17.5518 13.7905C17.5518 12.6099 16.79 11.7847 15.6221 11.6768V11.6006C16.5488 11.3848 17.1074 10.6802 17.1074 9.70264C17.1074 8.39502 16.1172 7.56982 14.543 7.56982H12.0737C11.3057 7.56982 10.9312 7.93799 10.9312 8.66797V15.1362ZM12.6323 11.1753V8.8584H14.1494C14.9492 8.8584 15.4189 9.29004 15.4189 9.99463C15.4189 10.75 14.9111 11.1753 13.7622 11.1753H12.6323ZM12.6323 14.9458V12.3687H14.2573C15.2603 12.3687 15.8062 12.8701 15.8062 13.689C15.8062 14.5142 15.2539 14.9458 13.9019 14.9458H12.6323Z",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 19,
  y: 6,
  width: 2,
  height: 12,
  rx: 1,
  fill: "#324350"
}, null)])), x = /* @__PURE__ */ t({
  name: "IconAutocomplete",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "autocomplete"
    }, n), {
      default: () => l(K1, null, null)
    });
  }
});
x.props = i;
const g3 = x, X1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  fill: "#FBCD2C"
}, null), l("mask", {
  id: "mask0_1_3014",
  style: {
    maskType: "alpha"
  },
  maskUnits: "userSpaceOnUse",
  x: 1,
  y: 1,
  width: 22,
  height: 22
}, [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  fill: "#A2845E"
}, null)]), l("g", {
  mask: "url(#mask0_1_3014)"
}, [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M11.9996 17.7963C13.7184 17.7963 15.2479 16.3561 16.0881 14.2048C16.6103 13.9909 17.1072 13.3424 17.334 12.4957C17.629 11.3948 17.5705 10.4118 16.7665 10.1059C16.6885 6.27115 15.1754 4.78714 11.9996 4.78714C8.82412 4.78714 7.31097 6.27097 7.2328 10.1052C6.42711 10.4103 6.36828 11.394 6.66349 12.4957C6.89064 13.3435 7.38849 13.9926 7.91145 14.2056C8.7518 16.3565 10.2811 17.7963 11.9996 17.7963ZM20.0126 23C20.34 23 20.5906 22.7037 20.4686 22.3999C19.6099 20.2625 16.1444 18.6636 12 18.6636C7.85555 18.6636 4.39008 20.2625 3.53142 22.3999C3.40937 22.7037 3.65999 23 3.9874 23H20.0126Z",
  fill: "white"
}, null)])])), I = /* @__PURE__ */ t({
  name: "IconAvatar",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "avatar"
    }, n), {
      default: () => l(X1, null, null)
    });
  }
});
I.props = i;
const v3 = I, J1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2.9685 14.1284L12 6L21.0315 14.1284C21.3721 14.4349 21.1553 15 20.697 15H16V22H8V15H3.30298C2.84474 15 2.62789 14.4349 2.9685 14.1284Z",
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 3,
  y: 2,
  width: 18,
  height: 4,
  rx: 1,
  fill: "#AAB2BF"
}, null)])), L = /* @__PURE__ */ t({
  name: "IconBackTop",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "back-top"
    }, n), {
      default: () => l(J1, null, null)
    });
  }
});
L.props = i;
const x3 = L, Q1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z",
  fill: "#FF7D95"
}, null), l("path", {
  d: "M13.3528 17.2568C13.3528 17.1858 13.169 14.6462 13.022 13.7049C13.7755 14.291 15.9443 15.694 15.9994 15.7117C16.2384 15.8538 16.4957 15.9071 16.753 15.8893C17.3779 15.8538 17.9476 15.4454 17.9844 14.6995C18.0579 14.2022 17.8741 13.7582 17.3779 13.5096C17.3227 13.4563 14.9702 12.3552 14.0512 12C14.9702 11.6448 17.286 10.5615 17.3227 10.526C17.819 10.2773 18.0579 9.74454 17.966 9.24727C17.9293 8.6612 17.3963 8.14617 16.7162 8.11066C16.4589 8.0929 16.2384 8.14617 16.0178 8.27049C15.9627 8.28825 13.7755 9.70902 13.022 10.2951C13.169 9.35383 13.3528 6.83197 13.3528 6.76093C13.3528 6.08607 12.7463 5.5 12.0111 5.5C11.2759 5.5 10.651 6.06831 10.6694 6.81421C10.6694 6.86749 10.8532 9.33607 11.0003 10.2773C10.2283 9.69126 8.04118 8.27049 7.96766 8.25273C7.76549 8.12842 7.52656 8.07514 7.26925 8.0929C6.64435 8.12842 6.07459 8.60792 6.03783 9.22951C5.94593 9.72678 6.18487 10.2596 6.66273 10.5082C6.73625 10.5615 9.07042 11.6448 9.98939 12C9.07042 12.3552 6.68111 13.474 6.62597 13.5096C6.16649 13.7404 5.92755 14.1844 6.01945 14.6639C6.05621 15.4454 6.60759 15.8716 7.25087 15.9071C7.50818 15.9249 7.76549 15.8716 8.00442 15.7295C8.05956 15.7117 10.2283 14.3087 10.9819 13.7049C10.8532 14.6639 10.6694 17.1503 10.6694 17.2036C10.651 17.9495 11.2759 18.5 12.0111 18.5C12.7463 18.5 13.3528 17.9139 13.3528 17.2568Z",
  fill: "white"
}, null)])), y = /* @__PURE__ */ t({
  name: "IconBadgeStar",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "badge-star"
    }, n), {
      default: () => l(Q1, null, null)
    });
  }
});
y.props = i;
const I3 = y, Y1 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M21 11.5018C20.2304 11.8228 19.3859 12 18.5 12C14.9101 12 12 9.08985 12 5.5C12 4.6141 12.1772 3.76959 12.4982 3H5C3.34315 3 2 4.34315 2 6V19C2 20.6569 3.34315 22 5 22H18C19.6569 22 21 20.6569 21 19V11.5018Z",
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 18.5,
  cy: 5.5,
  r: 4.5,
  fill: "#FF7D95"
}, null)])), B = /* @__PURE__ */ t({
  name: "IconBadge",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "badge"
    }, n), {
      default: () => l(Y1, null, null)
    });
  }
});
B.props = i;
const L3 = B, l2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 6,
  y: 19,
  width: 12,
  height: 1,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 7.942,
  y: 0.897,
  width: 2,
  height: 22.2633,
  rx: 1,
  transform: "rotate(10 7.94241 0.896553)",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 14.085,
  y: 1.229,
  width: 2,
  height: 22.3119,
  rx: 1,
  transform: "rotate(-10 14.0853 1.22887)",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 1,
  y: 3,
  width: 22,
  height: 14,
  rx: 2,
  fill: "#FBCD2C"
}, null), l("rect", {
  x: 4,
  y: 6,
  width: 16,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 4,
  y: 11,
  width: 9,
  height: 2,
  fill: "#324350"
}, null)])), A = /* @__PURE__ */ t({
  name: "IconBanner",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "banner"
    }, n), {
      default: () => l(l2, null, null)
    });
  }
});
A.props = i;
const y3 = A, n2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M6 4H14L18.0063 10.41C18.6143 11.3828 18.6143 12.6172 18.0063 13.59L14 20H6V4Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M2 7C2 5.34315 3.34315 4 5 4H7L11.0063 10.41C11.6143 11.3828 11.6143 12.6172 11.0063 13.59L7 20H5C3.34315 20 2 18.6569 2 17V7Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M13 20H16.3373C17.3716 20 18.333 19.4671 18.8813 18.59L22.0063 13.59C22.6143 12.6172 22.6143 11.3828 22.0063 10.41L18.8813 5.41C18.333 4.53286 17.3716 4 16.3373 4H13L17.0063 10.41C17.6143 11.3828 17.6143 12.6172 17.0063 13.59L13 20Z",
  fill: "#DDE3E8"
}, null)])), $ = /* @__PURE__ */ t({
  name: "IconBreadcrumb",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "breadcrumb"
    }, n), {
      default: () => l(n2, null, null)
    });
  }
});
$.props = i;
const B3 = $, e2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2 16.5C2 15.1193 3.11929 14 4.5 14H19.5C20.8807 14 22 15.1193 22 16.5C22 17.8807 20.8807 19 19.5 19H4.5C3.11929 19 2 17.8807 2 16.5Z",
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 8,
  y: 12,
  width: 8,
  height: 2,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M6 5.67391C6 4.73519 6.65356 3.9279 7.58364 3.80089C8.66208 3.65362 10.2149 3.5 12 3.5C13.7851 3.5 15.3379 3.65362 16.4164 3.80089C17.3464 3.9279 18 4.73519 18 5.67391V11C18 11.5523 17.5523 12 17 12H7C6.44772 12 6 11.5523 6 11V5.67391Z",
  fill: "#F82C2C"
}, null)])), F = /* @__PURE__ */ t({
  name: "IconButton",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "button"
    }, n), {
      default: () => l(e2, null, null)
    });
  }
});
F.props = i;
const A3 = F, t2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2.75,
  y: 2.75,
  width: 18.5,
  height: 18.5,
  rx: 3,
  fill: "white",
  stroke: "#AAB2BF",
  "stroke-width": 1.5
}, null), l("path", {
  d: "M9.39999 16.5817C9.39999 17.4915 10.5413 18.3296 12.0301 18.3296C13.6897 18.3296 14.8587 17.4088 14.8587 16.091C14.8587 15.1371 14.1694 14.3541 13.2541 14.2659V14.1722C14.015 14.0619 14.6271 13.312 14.6271 12.496C14.6271 11.3216 13.5574 10.5 12.0356 10.5C10.5965 10.5 9.5213 11.3105 9.5213 12.1927C9.5213 12.5511 9.77493 12.7992 10.1278 12.7992C10.387 12.7992 10.5799 12.6835 10.7454 12.4078C11.0376 11.9115 11.4622 11.6579 12.008 11.6579C12.7083 11.6579 13.1935 12.0714 13.1935 12.6779C13.1935 13.2845 12.6972 13.7256 12.019 13.7256H11.5063C11.1699 13.7256 10.9328 13.9737 10.9328 14.3045C10.9328 14.6464 11.1754 14.8945 11.5063 14.8945H12.0466C12.8571 14.8945 13.403 15.3576 13.403 16.0414C13.403 16.7251 12.8682 17.1717 12.0411 17.1717C11.4236 17.1717 10.9328 16.9015 10.613 16.3942C10.409 16.0965 10.2271 15.9807 9.98446 15.9807C9.64811 15.9807 9.39999 16.2343 9.39999 16.5817Z",
  fill: "#324350"
}, null), l("path", {
  d: "M2 5C2 3.34314 3.34315 2 5 2L19 2C20.6569 2 22 3.34314 22 5V9H2V5Z",
  fill: "#F82C2C"
}, null), l("path", {
  d: "M9.97348 7.49711C10.2501 7.49711 10.4086 7.31556 10.4086 7.00144V4.11959C10.4086 3.72766 10.204 3.50288 9.84668 3.50288C9.54985 3.50288 9.37982 3.63544 9.20691 4.0072L8.42305 5.76801H8.39135L7.60749 4.01008C7.43458 3.63832 7.26167 3.50288 6.9706 3.50288C6.61901 3.50288 6.39999 3.73631 6.39999 4.11959V7.00144C6.39999 7.3242 6.54409 7.49711 6.81786 7.49711C7.09452 7.49711 7.25302 7.31556 7.25302 7.00144V5.02161H7.29913L7.96484 6.50864C8.0974 6.79394 8.21267 6.89481 8.40864 6.89481C8.60172 6.89481 8.71123 6.79971 8.84668 6.50864L9.51239 5.02161H9.5585V7.00144C9.5585 7.3242 9.70259 7.49711 9.97348 7.49711Z",
  fill: "white"
}, null), l("path", {
  d: "M11.351 7.5C11.6046 7.5 11.7401 7.37031 11.8352 7.03602L11.9879 6.56628H13.3107L13.4605 7.03602C13.5556 7.36167 13.7026 7.5 13.9562 7.5C14.23 7.5 14.4086 7.33861 14.4086 7.08789C14.4086 6.98703 14.3827 6.87175 14.3308 6.71037L13.4634 4.15994C13.3049 3.6902 13.0859 3.50576 12.6709 3.50576C12.2559 3.50576 12.0311 3.69308 11.8755 4.15994L11.0052 6.71037C10.9389 6.90345 10.913 7.01296 10.913 7.10807C10.913 7.33861 11.0916 7.5 11.351 7.5ZM12.1839 5.87752L12.6305 4.3876H12.6767L13.1176 5.87752H12.1839Z",
  fill: "white"
}, null), l("path", {
  d: "M15.9418 7.49711C16.23 7.49711 16.423 7.30115 16.4144 7.01873L16.3971 5.98991L17.3971 4.33285C17.5095 4.14553 17.5556 4.02737 17.5556 3.9121C17.5556 3.67867 17.3712 3.5 17.1291 3.5C16.9389 3.5 16.7862 3.61527 16.6651 3.8487L15.9562 5.16282H15.9216L15.2328 3.84582C15.106 3.60086 14.9735 3.5 14.7689 3.5C14.5066 3.5 14.3279 3.67291 14.3279 3.92939C14.3279 4.04178 14.3683 4.15417 14.4663 4.31844L15.4807 5.98991L15.4605 7.01873C15.4519 7.30115 15.6478 7.49711 15.9418 7.49711Z",
  fill: "white"
}, null)])), H = /* @__PURE__ */ t({
  name: "IconCalendar",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "calendar"
    }, n), {
      default: () => l(t2, null, null)
    });
  }
});
H.props = i;
const $3 = H, o2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 5,
  y: 8,
  width: 14,
  height: 4,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 5,
  y: 14,
  width: 8,
  height: 2,
  fill: "#AAB2BF"
}, null)])), V = /* @__PURE__ */ t({
  name: "IconCard",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "card"
    }, n), {
      default: () => l(o2, null, null)
    });
  }
});
V.props = i;
const F3 = V, i2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 10.5,
  y: 7.5,
  width: 11,
  height: 11,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 2.5,
  y: 7.5,
  width: 12,
  height: 11,
  rx: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 5,
  y: 5.5,
  width: 14,
  height: 13,
  rx: 2,
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M12.1824 10.7059C12.768 9.76471 14.232 9.76471 14.8176 10.7059L16.7939 13.8824C17.3795 14.8235 16.6475 16 15.4763 16H11.5237C10.3525 16 9.62051 14.8235 10.2061 13.8824L12.1824 10.7059Z",
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 8.5,
  cy: 9.5,
  r: 1.5,
  fill: "white"
}, null)])), M = /* @__PURE__ */ t({
  name: "IconCarousel",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "carousel"
    }, n), {
      default: () => l(i2, null, null)
    });
  }
});
M.props = i;
const H3 = M, s2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2 3.54818C2 2.82211 2.74939 2.33807 3.41122 2.63664L9 5.15789V22L3.17756 19.3733C2.46078 19.05 2 18.3366 2 17.5503V3.54818Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M15 2L20.8224 4.62666C21.5392 4.95002 22 5.6634 22 6.44974V20.4518C22 21.1779 21.2506 21.6619 20.5888 21.3634L15 18.8421V2Z",
  fill: "#FBCD2C"
}, null), l("path", {
  d: "M9 5.15789L15 2V18.8421L9 22V5.15789Z",
  fill: "#324350"
}, null)])), Z = /* @__PURE__ */ t({
  name: "IconCascader",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "cascader"
    }, n), {
      default: () => l(s2, null, null)
    });
  }
});
Z.props = i;
const V3 = Z, r2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 20,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 5,
  y: 6,
  width: 14,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 5,
  y: 11,
  width: 14,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 5,
  y: 16,
  width: 10,
  height: 2,
  fill: "#324350"
}, null)])), D = /* @__PURE__ */ t({
  name: "IconChangelog",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "changelog"
    }, n), {
      default: () => l(r2, null, null)
    });
  }
});
D.props = i;
const M3 = D, c2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1.009,
  y: 3.1,
  width: 20,
  height: 20,
  rx: 3,
  transform: "rotate(-6 1.00949 3.10003)",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M8.07416 12.9153L11.4236 16.0826L15.6645 8.59828",
  stroke: "white",
  "stroke-width": 3,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null)])), E = /* @__PURE__ */ t({
  name: "IconCheckbox",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "checkbox"
    }, n), {
      default: () => l(c2, null, null)
    });
  }
});
E.props = i;
const Z3 = E, u2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 9,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 2,
  y: 13,
  width: 20,
  height: 9,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M17 14.5C16.4477 14.5 16 14.9477 16 15.5V16.5H15C14.4477 16.5 14 16.9477 14 17.5C14 18.0523 14.4477 18.5 15 18.5H16V19.5C16 20.0523 16.4477 20.5 17 20.5C17.5523 20.5 18 20.0523 18 19.5V18.5H19C19.5523 18.5 20 18.0523 20 17.5C20 16.9477 19.5523 16.5 19 16.5H18V15.5C18 14.9477 17.5523 14.5 17 14.5Z",
  fill: "#4CC3FA"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M17 3.50003C16.4477 3.50003 16 3.94775 16 4.50003V5.50003H15C14.4477 5.50003 14 5.94775 14 6.50003C14 7.05232 14.4477 7.50003 15 7.50003H16V8.50003C16 9.05232 16.4477 9.50003 17 9.50003C17.5523 9.50003 18 9.05232 18 8.50003V7.50003H19C19.5523 7.50003 20 7.05232 20 6.50003C20 5.94775 19.5523 5.50003 19 5.50003H18V4.50003C18 3.94775 17.5523 3.50003 17 3.50003Z",
  fill: "#4CC3FA"
}, null)])), S = /* @__PURE__ */ t({
  name: "IconCollapse",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "collapse"
    }, n), {
      default: () => l(u2, null, null)
    });
  }
});
S.props = i;
const D3 = S, C2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2.72361 5.44721C2.39116 4.78231 2.87465 4 3.61803 4H20.382C21.1253 4 21.6088 4.78231 21.2764 5.44721L18 12H6L2.72361 5.44721Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M2.72361 18.5528C2.39116 19.2177 2.87465 20 3.61803 20H20.382C21.1253 20 21.6088 19.2177 21.2764 18.5528L18 12H6L2.72361 18.5528Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M12 2V10",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round"
}, null), l("path", {
  d: "M9 7L12 10L15 7",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null), l("path", {
  d: "M12 22V14",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round"
}, null), l("path", {
  d: "M9 17L12 14L15 17",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null)])), b = /* @__PURE__ */ t({
  name: "IconCollapsible",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "collapsible"
    }, n), {
      default: () => l(C2, null, null)
    });
  }
});
b.props = i;
const E3 = b, h2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M23 12C23 15.5421 20.1314 15.9676 17.4879 16.3597C16.0268 16.5765 14.6344 16.783 13.8333 17.5C12.9873 18.2572 13.31 19.3955 13.6062 20.4405C13.9913 21.7992 14.3317 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM20.7083 11.3125C20.7083 12.4516 19.7849 13.375 18.6458 13.375C17.5067 13.375 16.5833 12.4516 16.5833 11.3125C16.5833 10.1734 17.5067 9.25 18.6458 9.25C19.7849 9.25 20.7083 10.1734 20.7083 11.3125ZM14.9792 7.875C16.1183 7.875 17.0417 6.95159 17.0417 5.8125C17.0417 4.67341 16.1183 3.75 14.9792 3.75C13.8401 3.75 12.9167 4.67341 12.9167 5.8125C12.9167 6.95159 13.8401 7.875 14.9792 7.875ZM10.625 5.8125C10.625 6.95159 9.70159 7.875 8.5625 7.875C7.42341 7.875 6.5 6.95159 6.5 5.8125C6.5 4.67341 7.42341 3.75 8.5625 3.75C9.70159 3.75 10.625 4.67341 10.625 5.8125ZM4.89583 13.375C6.03492 13.375 6.95833 12.4516 6.95833 11.3125C6.95833 10.1734 6.03492 9.25 4.89583 9.25C3.75675 9.25 2.83333 10.1734 2.83333 11.3125C2.83333 12.4516 3.75675 13.375 4.89583 13.375Z",
  fill: "#0077FA"
}, null)])), T = /* @__PURE__ */ t({
  name: "IconColorPlatteNew",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "color-platte-new"
    }, n), {
      default: () => l(h2, null, null)
    });
  }
});
T.props = i;
const S3 = T, a2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M12 2C6.47778 2 2 6.47778 2 12C2 17.5222 6.47778 22 12 22C12.9222 22 13.6667 21.2556 13.6667 20.3333C13.6667 19.9 13.5056 19.5111 13.2333 19.2167C12.9722 18.9222 12.8167 18.5389 12.8167 18.1111C12.8167 17.1889 13.5611 16.4444 14.4833 16.4444H16.4444C19.5111 16.4444 22 13.9556 22 10.8889C22 5.97778 17.5222 2 12 2Z",
  fill: "#DDE3E8",
  stroke: "#DDE3E8",
  "stroke-width": 1.5
}, null), l("circle", {
  cx: 6,
  cy: 12,
  r: 2,
  fill: "#F82C2C"
}, null), l("circle", {
  cx: 10.5,
  cy: 7,
  r: 2,
  fill: "#4CC3FA"
}, null), l("circle", {
  cx: 17,
  cy: 9,
  r: 2,
  fill: "#3BCE4A"
}, null)])), k = /* @__PURE__ */ t({
  name: "IconColorPlatte",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "color-platte"
    }, n), {
      default: () => l(a2, null, null)
    });
  }
});
k.props = i;
const b3 = k, p2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M10.2983 1C9.83136 1 9.4266 1.32309 9.32313 1.77838L8.6518 4.73223C8.2046 4.93859 7.77969 5.18502 7.38167 5.46689L4.48633 4.57087C4.04031 4.43284 3.55812 4.62183 3.32467 5.02617L1.6229 7.97373C1.38945 8.37807 1.46688 8.89015 1.80943 9.20741L4.03314 11.2669C4.01121 11.5083 4 11.7529 4 12C4 12.2471 4.0112 12.4916 4.03313 12.733L1.80943 14.7925C1.46688 15.1098 1.38945 15.6218 1.6229 16.0262L3.32467 18.9737C3.55812 19.3781 4.0403 19.5671 4.48633 19.429L7.38158 18.533C7.77963 18.8149 8.20457 19.0614 8.6518 19.2678L9.32313 22.2216C9.4266 22.6769 9.83136 23 10.2983 23H13.7018C14.1687 23 14.5735 22.6769 14.6769 22.2216L15.3483 19.2677C15.7955 19.0614 16.2204 18.8149 16.6185 18.533L19.5138 19.429C19.9598 19.5671 20.442 19.3781 20.6755 18.9737L22.3772 16.0262C22.6107 15.6218 22.5333 15.1098 22.1907 14.7925L19.9669 12.7329C19.9888 12.4915 20 12.2471 20 12C20 11.7529 19.9888 11.5084 19.9669 11.267L22.1907 9.20741C22.5333 8.89015 22.6107 8.37807 22.3772 7.97373L20.6755 5.02617C20.442 4.62183 19.9598 4.43284 19.5138 4.57087L16.6184 5.46692C16.2204 5.18505 15.7955 4.93863 15.3483 4.73226L14.6769 1.77838C14.5735 1.32309 14.1687 1 13.7018 1H10.2983Z",
  fill: "#DDE3E8"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z",
  fill: "#AAB2BF"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 3,
  fill: "#324350"
}, null)])), _ = /* @__PURE__ */ t({
  name: "IconConfig",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "config"
    }, n), {
      default: () => l(p2, null, null)
    });
  }
});
_.props = i;
const T3 = _, d2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  fill: "#324350"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M18 15.9519C17.5859 16.025 17.1597 16.0631 16.7246 16.0631C12.6984 16.0631 9.43457 12.7992 9.43457 8.77305C9.43457 7.32204 9.85849 5.97005 10.5892 4.83416C7.17112 5.43727 4.57452 8.42192 4.57452 12.013C4.57452 16.0392 7.8384 19.3031 11.8646 19.3031C14.4398 19.3031 16.7031 17.9679 18 15.9519Z",
  fill: "#FBCD2C"
}, null)])), P = /* @__PURE__ */ t({
  name: "IconDarkMode",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "dark-mode"
    }, n), {
      default: () => l(d2, null, null)
    });
  }
});
P.props = i;
const k3 = P, f2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3038)"
}, [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M6.5 11H9V13.5H6.5V11ZM12.5 15.5H5.5V10H12.5V15.5ZM12.5 7.5H12V6.5H11V7.5H7V6.5H6V7.5H5.5C4.945 7.5 4.5 7.95 4.5 8.5V15.5C4.5 16.05 4.95 16.5 5.5 16.5H12.5C13.05 16.5 13.5 16.05 13.5 15.5V8.5C13.5 7.95 13.05 7.5 12.5 7.5Z",
  fill: "#4CC3FA"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M13.5 12.7929C13.5 11.902 14.5771 11.4558 15.2071 12.0858L23.9142 20.7929C24.5442 21.4228 24.098 22.5 23.2071 22.5H19.2488C18.6797 22.5 18.1376 22.7424 17.7581 23.1665L15.2453 25.9756C14.6333 26.6597 13.5 26.2268 13.5 25.3089V12.7929ZM17.6837 21H22L15 14V24L17.6837 21Z",
  fill: "white"
}, null), l("path", {
  d: "M15 24V14L22 21H17.6837L15 24Z",
  fill: "#324350"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3038"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), j = /* @__PURE__ */ t({
  name: "IconDatePicker",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "date-picker"
    }, n), {
      default: () => l(f2, null, null)
    });
  }
});
j.props = i;
const _3 = j, w2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2.75,
  y: 2.75,
  width: 18.5,
  height: 18.5,
  rx: 3,
  fill: "white",
  stroke: "#AAB2BF",
  "stroke-width": 1.5
}, null), l("rect", {
  x: 5,
  y: 6,
  width: 4,
  height: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 5,
  y: 11,
  width: 4,
  height: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 5,
  y: 16,
  width: 2,
  height: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 11,
  y: 11,
  width: 4,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 11,
  y: 16,
  width: 8,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 11,
  y: 6,
  width: 8,
  height: 2,
  fill: "#324350"
}, null)])), N = /* @__PURE__ */ t({
  name: "IconDescriptions",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "descriptions"
    }, n), {
      default: () => l(w2, null, null)
    });
  }
});
N.props = i;
const P3 = N, m2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2.75,
  y: 2.75,
  width: 18.5,
  height: 18.5,
  rx: 3,
  fill: "white",
  stroke: "#AAB2BF",
  "stroke-width": 1.5
}, null), l("rect", {
  x: 5,
  y: 11,
  width: 4,
  height: 2,
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 15,
  y: 11,
  width: 4,
  height: 2,
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 10,
  y: 11,
  width: 4,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 10,
  y: 11,
  width: 4,
  height: 2,
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 5,
  y: 16,
  width: 14,
  height: 2,
  fill: "#324350"
}, null), l("rect", {
  x: 5,
  y: 6,
  width: 14,
  height: 2,
  fill: "#324350"
}, null)])), O = /* @__PURE__ */ t({
  name: "IconDivider",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "divider"
    }, n), {
      default: () => l(m2, null, null)
    });
  }
});
O.props = i;
const j3 = O, g2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1.009,
  y: 3.1,
  width: 20,
  height: 20,
  rx: 3,
  transform: "rotate(-6 1.00949 3.10007)",
  fill: "#6A6F7F"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M5.65261 9.58962C6.17396 8.94581 7.11851 8.84653 7.76231 9.36788L12.0918 12.8739L15.5978 8.54433C16.1192 7.90052 17.0637 7.80125 17.7075 8.32259C18.3513 8.84394 18.4506 9.78849 17.9293 10.4323L13.4793 15.9275C12.958 16.5714 12.0134 16.6706 11.3696 16.1493L5.87435 11.6993C5.23054 11.178 5.13127 10.2334 5.65261 9.58962Z",
  fill: "white"
}, null)])), R = /* @__PURE__ */ t({
  name: "IconDropdown",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "dropdown"
    }, n), {
      default: () => l(g2, null, null)
    });
  }
});
R.props = i;
const N3 = R, v2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M5.44134 9.08345C5.78441 8.41807 6.47035 8 7.21896 8H16.7804C17.5293 8 18.2155 8.4184 18.5584 9.08417L21.9336 15.6367L2.12891 15.5078L5.44134 9.08345Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M6.72999 11.3166C6.89478 10.9658 7.2475 10.7417 7.63513 10.7417H16.3649C16.7525 10.7417 17.1052 10.9657 17.27 11.3166L19 14.9999H5L6.72999 11.3166Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M2 16C2 15.4477 2.44772 15 3 15H21C21.5523 15 22 15.4477 22 16V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V16Z",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 11,
  y: 1,
  width: 2,
  height: 5,
  rx: 1,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 3.879,
  y: 4.293,
  width: 2,
  height: 4.3448,
  rx: 1,
  transform: "rotate(-45 3.87866 4.29285)",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 18.573,
  y: 2.879,
  width: 2,
  height: 4.2175,
  rx: 1,
  transform: "rotate(45 18.5731 2.87866)",
  fill: "#AAB2BF"
}, null), l("circle", {
  cx: 12,
  cy: 18.5,
  r: 1.5,
  fill: "#AAB2BF"
}, null)])), U = /* @__PURE__ */ t({
  name: "IconEmpty",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "empty"
    }, n), {
      default: () => l(v2, null, null)
    });
  }
});
U.props = i;
const O3 = U, x2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M19 10C20.6569 10 22 11.3431 22 13V18.5V21V23L18.6667 21H8C6.34315 21 5 19.6569 5 18V13C5 11.3431 6.34315 10 8 10H19Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M11.7617 18.043C12.1055 18.043 12.2891 17.8672 12.418 17.4141L12.625 16.7773H14.418L14.6211 17.4141C14.75 17.8555 14.9492 18.043 15.293 18.043C15.6641 18.043 15.9062 17.8242 15.9062 17.4844C15.9062 17.3477 15.8711 17.1914 15.8008 16.9727L14.625 13.5156C14.4102 12.8789 14.1133 12.6289 13.5508 12.6289C12.9883 12.6289 12.6836 12.8828 12.4727 13.5156L11.293 16.9727C11.2031 17.2344 11.168 17.3828 11.168 17.5117C11.168 17.8242 11.4102 18.043 11.7617 18.043ZM12.8906 15.8438L13.4961 13.8242H13.5586L14.1562 15.8438H12.8906Z",
  fill: "white"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M5 2C3.34315 2 2 3.34315 2 5V8.5V13V17L5.52941 13H16C17.6569 13 19 11.6569 19 10V5C19 3.34315 17.6569 2 16 2H5Z",
  fill: "#FF7D95"
}, null), l("path", {
  d: "M12.1836 10.6211C12.5039 10.6211 12.7188 10.3945 12.7188 10.082C12.7188 9.94922 12.6953 9.83594 12.5586 9.62891L12.4336 9.45312C12.8281 9.04688 13.0469 8.44922 13.0469 7.67578V7.03906C13.0469 5.50391 12.1641 4.57031 10.6953 4.57031C9.21094 4.57031 8.33984 5.5 8.33984 7.03906V7.67578C8.33984 9.19531 9.19922 10.1172 10.6953 10.1172C10.957 10.1172 11.1914 10.082 11.4102 10.0195L11.5352 10.1914C11.7344 10.4883 11.9375 10.6211 12.1836 10.6211ZM9.62891 7.75391V7.03125C9.62891 6.14844 10.0273 5.625 10.6953 5.625C11.332 5.625 11.7539 6.14844 11.7539 7.03125V7.75391C11.7539 8.08203 11.6914 8.30859 11.582 8.49609L11.4922 8.36719C11.3867 8.25391 11.2695 8.20312 11.1328 8.20312C10.8555 8.20312 10.6602 8.39844 10.6602 8.67578C10.6602 8.77734 10.6992 8.89453 10.75 8.98438L10.832 9.09766C10.7695 9.12109 10.6992 9.13672 10.6289 9.13672C10 9.10156 9.62891 8.59766 9.62891 7.75391Z",
  fill: "white"
}, null)])), G = /* @__PURE__ */ t({
  name: "IconFaq",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "faq"
    }, n), {
      default: () => l(x2, null, null)
    });
  }
});
G.props = i;
const R3 = G, I2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3028)"
}, [l("rect", {
  x: 3.051,
  y: 2.888,
  width: 16,
  height: 21,
  rx: 2,
  transform: "rotate(-6 3.05081 2.88827)",
  fill: "#FF7D95"
}, null), l("rect", {
  x: 5.249,
  y: 4.668,
  width: 12,
  height: 17,
  rx: 1,
  transform: "rotate(-6 5.2489 4.66825)",
  fill: "white"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12.3094 0.909647L13.886 0.743932C14.4353 0.686203 14.9273 1.08467 14.9851 1.63393L15.2987 4.61749L7.34248 5.45372L7.0289 2.47015C6.97117 1.92089 7.36963 1.42883 7.91889 1.3711L9.49556 1.20539C9.63945 0.60446 10.1484 0.131264 10.7979 0.0629958C11.4475 -0.00527278 12.0437 0.351766 12.3094 0.909647Z",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 7.656,
  y: 8.437,
  width: 8,
  height: 2,
  transform: "rotate(-6 7.65607 8.43729)",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 8.074,
  y: 12.415,
  width: 8,
  height: 2,
  transform: "rotate(-6 8.07417 12.4154)",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 8.492,
  y: 16.393,
  width: 3.35025,
  height: 2,
  transform: "rotate(-6 8.49229 16.3935)",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M20.0336 9.94762L15.1077 14.9076C15.0165 14.9977 14.9448 15.1053 14.8969 15.2237L14.0353 17.3532C13.8798 17.7375 14.2655 18.1188 14.6542 17.9651L16.8082 17.1133C16.9279 17.0659 17.0367 16.995 17.1279 16.9049L22.0538 11.9449L20.0336 9.94762Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M22.0538 11.9449L22.7211 11.2731C23.093 10.9054 23.093 10.3092 22.7211 9.94153L22.0477 9.27577C21.6758 8.90808 21.0728 8.90808 20.7009 9.27577L20.0336 9.94762L22.0538 11.9449Z",
  fill: "#6A6F7F"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3028"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), q = /* @__PURE__ */ t({
  name: "IconForm",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "form"
    }, n), {
      default: () => l(I2, null, null)
    });
  }
});
q.props = i;
const U3 = q, L2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M16.8983 11.3349C17.2744 11.7121 17.2744 12.2881 16.8983 12.6653C16.3205 13.2449 15.298 14.1515 13.7106 15.1755C12.2711 16.1041 11.033 16.6996 10.1839 17.0552C9.54099 17.3245 8.86333 16.9178 8.77288 16.2267C8.64377 15.2402 8.50004 13.7492 8.50004 12.0001C8.50004 10.251 8.64376 8.76006 8.77287 7.77356C8.86333 7.08239 9.54101 6.67574 10.1839 6.94502C11.033 7.30064 12.2712 7.89619 13.7106 8.82469C15.298 9.84867 16.3204 10.7553 16.8983 11.3349Z",
  fill: "white"
}, null)])), z = /* @__PURE__ */ t({
  name: "IconGettingStarted",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "getting-started"
    }, n), {
      default: () => l(L2, null, null)
    });
  }
});
z.props = i;
const G3 = z, y2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M22 2H2V22H22V2ZM20 4H4V20H20V4Z",
  fill: "#6A6F7F"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M22 9H20V15H22V9ZM2 15H4V9H2V15Z",
  fill: "#DDE3E8"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M15 22V20H9V22H15ZM9 2V4H15V2H9Z",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 7,
  y: 7,
  width: 3,
  height: 3,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 7,
  y: 10,
  width: 3,
  height: 4,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 14,
  y: 10,
  width: 3,
  height: 4,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 10,
  y: 7,
  width: 4,
  height: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 10,
  y: 14,
  width: 4,
  height: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 14,
  y: 7,
  width: 3,
  height: 3,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 7,
  y: 14,
  width: 3,
  height: 3,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 14,
  y: 14,
  width: 3,
  height: 3,
  fill: "#6A6F7F"
}, null)])), W = /* @__PURE__ */ t({
  name: "IconGrid",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "grid"
    }, n), {
      default: () => l(y2, null, null)
    });
  }
});
W.props = i;
const q3 = W, B2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M20.5 13.9853L12.0147 5.5L12.7574 4.75736C15.1005 2.41421 18.8995 2.41421 21.2426 4.75736C23.5858 7.1005 23.5858 10.8995 21.2426 13.2426L20.5 13.9853Z",
  fill: "#F82C2C"
}, null), l("path", {
  d: "M11.2426 4.75736C8.89949 2.41421 5.1005 2.41421 2.75736 4.75736C0.414214 7.1005 0.414214 10.8995 2.75736 13.2426L12 22.4853C12 22.4853 17.1834 17.3166 20.5 14C21.8 12.7471 22.34 12 22.66 11C20 14 18.5 12 12.0147 5.5C11.5079 4.99201 11.2426 4.75736 11.2426 4.75736Z",
  fill: "#FF7D95"
}, null)])), K = /* @__PURE__ */ t({
  name: "IconHeart",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "heart"
    }, n), {
      default: () => l(B2, null, null)
    });
  }
});
K.props = i;
const z3 = K, A2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 3,
  y: 8,
  width: 18,
  height: 8,
  rx: 1,
  fill: "#FAC800"
}, null), l("path", {
  d: "M4.44346 4.44341C4.2627 4.62417 4.16115 4.86934 4.16115 5.12498V8.18054C4.16115 8.43618 4.2627 8.68134 4.44346 8.86211C4.62423 9.04287 4.86939 9.14442 5.12503 9.14442C5.38067 9.14442 5.62584 9.04287 5.80661 8.86211C5.98737 8.68134 6.08892 8.43618 6.08892 8.18054V6.08887H11.0361V17.9111H8.94448C8.68884 17.9111 8.44367 18.0126 8.26291 18.1934C8.08214 18.3742 7.98059 18.6193 7.98059 18.875C7.98059 19.1306 8.08214 19.3758 8.26291 19.5566L8.40433 19.4151L8.26291 19.5566C8.44367 19.7373 8.68884 19.8389 8.94448 19.8389H15.0556C15.3112 19.8389 15.5564 19.7373 15.7372 19.5566C15.9179 19.3758 16.0195 19.1306 16.0195 18.875C16.0195 18.6193 15.9179 18.3742 15.7372 18.1934C15.5564 18.0126 15.3112 17.9111 15.0556 17.9111H12.9639V6.08887H17.9111V8.18054C17.9111 8.43617 18.0127 8.68134 18.1935 8.86211C18.3742 9.04287 18.6194 9.14442 18.875 9.14442C19.1307 9.14442 19.3758 9.04287 19.5566 8.86211C19.7374 8.68134 19.8389 8.43617 19.8389 8.18054V5.12498C19.8389 4.86934 19.7374 4.62417 19.5566 4.44341C19.3758 4.26264 19.1307 4.16109 18.875 4.16109H5.12503C4.86939 4.16109 4.62423 4.26264 4.44346 4.44341Z",
  fill: "#6A6F7F",
  stroke: "#6A6F7F",
  "stroke-width": 0.4
}, null)])), X = /* @__PURE__ */ t({
  name: "IconHighlight",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "highlight"
    }, n), {
      default: () => l(A2, null, null)
    });
  }
});
X.props = i;
const W3 = X, $2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M4 4H11V11H4V4Z",
  fill: "#FBCD2C"
}, null), l("path", {
  d: "M3 11H20V20H3V11Z",
  fill: "#3BCE4A"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM10 7.5C10 8.88071 8.88071 10 7.5 10C6.11929 10 5 8.88071 5 7.5C5 6.11929 6.11929 5 7.5 5C8.88071 5 10 6.11929 10 7.5ZM16.7071 11.7071C16.3166 11.3166 15.6834 11.3166 15.2929 11.7071L11 16L9.70711 14.7071C9.31658 14.3166 8.68342 14.3166 8.29289 14.7071L5 18V19H19V14L16.7071 11.7071Z",
  fill: "#324350"
}, null)])), J = /* @__PURE__ */ t({
  name: "IconImage",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "image"
    }, n), {
      default: () => l($2, null, null)
    });
  }
});
J.props = i;
const K3 = J, F2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M15 4H20C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H15V4Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M19 7.5L21 10.5H17L19 7.5Z",
  fill: "white"
}, null), l("path", {
  d: "M19 16.5L17 13.5H21L19 16.5Z",
  fill: "white"
}, null), l("path", {
  d: "M8.35791 15.7759C7.39307 15.7759 6.70752 15.1792 6.70752 14.354C6.70752 13.5225 7.39307 12.9194 8.35791 12.9194C9.31641 12.9194 10.0083 13.5225 10.0083 14.354C10.0083 15.1792 9.31641 15.7759 8.35791 15.7759ZM8.35791 11.7261C7.55811 11.7261 6.98682 11.1992 6.98682 10.4756C6.98682 9.7583 7.55811 9.24414 8.35791 9.24414C9.15771 9.24414 9.729 9.7583 9.729 10.4756C9.729 11.2056 9.15771 11.7261 8.35791 11.7261ZM8.33887 17.0137C10.3447 17.0137 11.7095 15.979 11.7095 14.4619C11.7095 13.3955 10.9795 12.5322 9.89404 12.3101V12.2148C10.8208 11.9292 11.3667 11.2056 11.3667 10.2915C11.3667 8.9458 10.1289 8 8.35791 8C6.58691 8 5.34912 8.9458 5.34912 10.2915C5.34912 11.2119 5.88867 11.9292 6.81543 12.2148V12.3101C5.72363 12.5322 5 13.3955 5 14.4683C5 15.9917 6.33936 17.0137 8.33887 17.0137Z",
  fill: "#324350"
}, null)])), Q = /* @__PURE__ */ t({
  name: "IconInputNumber",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "input-number"
    }, n), {
      default: () => l(F2, null, null)
    });
  }
});
Q.props = i;
const X3 = Q, H2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M12 8.5C12 8.5 12.5 6 11 4C9.5 2 8 2 8 2",
  stroke: "#AAB2BF",
  "stroke-width": 2,
  "stroke-linecap": "round"
}, null), l("rect", {
  x: 1,
  y: 6,
  width: 22,
  height: 15,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 3,
  y: 8,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 8,
  y: 8,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 13,
  y: 8,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 18,
  y: 8,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 3,
  y: 12,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 8,
  y: 12,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 13,
  y: 12,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 18,
  y: 12,
  width: 3,
  height: 3,
  rx: 1.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 6,
  y: 17,
  width: 12,
  height: 2,
  rx: 1,
  fill: "#6A6F7F"
}, null)])), Y = /* @__PURE__ */ t({
  name: "IconInput",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "input"
    }, n), {
      default: () => l(H2, null, null)
    });
  }
});
Y.props = i;
const J3 = Y, V2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M3.12591 8.09927C2.41427 8.66858 2 9.53052 2 10.4419V19C2 20.6569 3.34315 22 5 22H9V16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16V22H19C20.6569 22 22 20.6569 22 19V10.4419C22 9.53052 21.5857 8.66858 20.8741 8.09927L13.2494 1.99951C12.519 1.41516 11.481 1.41516 10.7506 1.99951L3.12591 8.09927Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M9 15V22H15V15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15Z",
  fill: "#6A6F7F"
}, null)])), l1 = /* @__PURE__ */ t({
  name: "IconIntro",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "intro"
    }, n), {
      default: () => l(V2, null, null)
    });
  }
});
l1.props = i;
const Q3 = l1, M2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 20,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 5,
  y: 5,
  width: 14,
  height: 4,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 11,
  y: 11,
  width: 8,
  height: 3,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 11,
  y: 16,
  width: 8,
  height: 3,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 5,
  y: 11,
  width: 4,
  height: 8,
  fill: "#AAB2BF"
}, null)])), n1 = /* @__PURE__ */ t({
  name: "IconLayout",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "layout"
    }, n), {
      default: () => l(M2, null, null)
    });
  }
});
n1.props = i;
const Y3 = n1, Z2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2 4.00003C2 3.44775 2.44772 3.00003 3 3.00003H6V8.00003H3C2.44772 8.00003 2 7.55232 2 7.00003V4.00003Z",
  fill: "#0077FA"
}, null), l("path", {
  d: "M8 3.00003H21C21.5523 3.00003 22 3.44775 22 4.00003V7.00003C22 7.55232 21.5523 8.00003 21 8.00003H8V3.00003Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M2 11C2 10.4477 2.44772 10 3 10H6V15H3C2.44772 15 2 14.5523 2 14V11Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M8 10H21C21.5523 10 22 10.4477 22 11V14C22 14.5523 21.5523 15 21 15H8V10Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M2 18C2 17.4477 2.44772 17 3 17H6V22H3C2.44772 22 2 21.5523 2 21V18Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M8 17H21C21.5523 17 22 17.4477 22 18V21C22 21.5523 21.5523 22 21 22H8V17Z",
  fill: "#DDE3E8"
}, null)])), e1 = /* @__PURE__ */ t({
  name: "IconList",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "list"
    }, n), {
      default: () => l(Z2, null, null)
    });
  }
});
e1.props = i;
const l5 = e1, D2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 20,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M8.40092 4.14168C7.89573 4.43335 7.72264 5.07933 8.01431 5.58452L8.26474 6.01828H5.12664C4.50441 6.01828 4 6.49116 4 7.0745C4 7.65784 4.50441 8.13073 5.12664 8.13073L6.46453 8.13073C6.46453 9.85786 7.05673 11.4467 8.04915 12.7052C7.2723 13.1546 6.37034 13.4119 5.4083 13.4119C4.82496 13.4119 4.35207 13.8848 4.35207 14.4681C4.35207 15.0514 4.82496 15.5243 5.4083 15.5243C6.97917 15.5243 8.43562 15.0344 9.63321 14.1991C10.8308 15.0344 12.2872 15.5243 13.8581 15.5243C14.4415 15.5243 14.9143 15.0514 14.9143 14.4681C14.9143 13.8848 14.4415 13.4119 13.8581 13.4119C12.8961 13.4119 11.9941 13.1546 11.2173 12.7052C12.2097 11.4467 12.8019 9.85786 12.8019 8.13073L14.1398 8.13073C14.762 8.13073 15.2664 7.65784 15.2664 7.0745C15.2664 6.49116 14.762 6.01828 14.1398 6.01828H10.704L9.84375 4.52829C9.55208 4.0231 8.9061 3.85001 8.40092 4.14168ZM10.6894 8.13073H8.57698C8.57698 9.31986 8.96999 10.4172 9.63321 11.2999C10.2964 10.4172 10.6894 9.31986 10.6894 8.13073Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M13.0025 19C13.5829 19 13.8928 18.7078 14.1105 17.9545L14.46 16.8961H17.4872L17.8302 17.9545C18.0478 18.6883 18.3842 19 18.9646 19C19.5911 19 20 18.6364 20 18.0714C20 17.8442 19.9406 17.5844 19.8219 17.2208L17.8368 11.474C17.474 10.4156 16.9728 10 16.0231 10C15.0734 10 14.5589 10.4221 14.2028 11.474L12.211 17.2208C12.0594 17.6558 12 17.9026 12 18.1169C12 18.6364 12.4089 19 13.0025 19ZM14.9085 15.3442L15.9308 11.987H16.0363L17.0453 15.3442H14.9085Z",
  fill: "#324350"
}, null)])), t1 = /* @__PURE__ */ t({
  name: "IconLocaleProvider",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "locale-provider"
    }, n), {
      default: () => l(D2, null, null)
    });
  }
});
t1.props = i;
const n5 = t1, E2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 20,
  rx: 3,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 4,
  y: 6,
  width: 16,
  height: 12,
  rx: 1,
  fill: "white"
}, null), l("rect", {
  x: 6,
  y: 13,
  width: 5,
  height: 3,
  rx: 1,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 13,
  y: 13,
  width: 5,
  height: 3,
  rx: 1,
  fill: "#4CC3FA"
}, null)])), o1 = /* @__PURE__ */ t({
  name: "IconModal",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "modal"
    }, n), {
      default: () => l(E2, null, null)
    });
  }
});
o1.props = i;
const e5 = o1, S2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3057)"
}, [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  transform: "rotate(-45 12 12)",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M4.95413 12.237L16.8183 6.92269L12.2377 19.089L10.5096 13.6288L4.95413 12.237Z",
  fill: "#324350"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3057"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), i1 = /* @__PURE__ */ t({
  name: "IconNavigation",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "navigation"
    }, n), {
      default: () => l(S2, null, null)
    });
  }
});
i1.props = i;
const t5 = i1, b2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3040)"
}, [l("circle", {
  cx: 13.0623,
  cy: 19.0623,
  r: 2.78627,
  transform: "rotate(-6 13.0623 19.0623)",
  fill: "#324350"
}, null), l("path", {
  d: "M11.1644 0.963222C10.1698 1.06775 9.22759 1.66954 9.33212 2.66406L9.40414 3.34932C6.9001 4.28223 5.74125 6.76612 6.03349 9.54657L6.34708 12.5301C6.62564 15.1805 5.19578 16.309 3.98171 17.8708C3.40154 18.6171 4.00123 19.8152 4.94133 19.7164L21.1505 18.0128C22.0906 17.914 22.428 16.6173 21.7054 16.0079C20.1932 14.7327 18.5599 13.9261 18.2813 11.2758L17.9678 8.29223C17.6755 5.51178 16.0255 3.32311 13.3822 2.9312L13.3102 2.24595C13.2057 1.25143 12.1589 0.858691 11.1644 0.963222Z",
  fill: "#FBCD2C"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M18.4225 4.90871C18.1055 4.37727 17.58 3.92471 16.5455 3.39693C16.0536 3.14593 15.8583 2.54364 16.1093 2.05169C16.3603 1.55974 16.9625 1.36441 17.4545 1.61541C18.6397 2.22014 19.5461 2.88833 20.1401 3.88414C20.7233 4.86184 20.9283 6.02907 20.9988 7.45683C21.026 8.00844 20.601 8.4777 20.0494 8.50495C19.4977 8.5322 19.0285 8.10712 19.0012 7.55551C18.9355 6.22478 18.7503 5.45827 18.4225 4.90871Z",
  fill: "#DDE3E8"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M3.35465 12.6789C3.49632 12.005 3.46085 11.2839 3.21465 10.2268C3.08937 9.68896 3.42385 9.15136 3.96174 9.02608C4.49963 8.9008 5.03723 9.23528 5.16251 9.77317C5.44466 10.9846 5.53602 12.024 5.31188 13.0904C5.09077 14.1422 4.58176 15.1262 3.83488 16.259C3.53088 16.7201 2.91065 16.8474 2.44956 16.5434C1.98848 16.2394 1.86114 15.6192 2.16515 15.1581C2.8605 14.1034 3.20995 13.3674 3.35465 12.6789Z",
  fill: "#DDE3E8"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3040"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), s1 = /* @__PURE__ */ t({
  name: "IconNotification",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "notification"
    }, n), {
      default: () => l(b2, null, null)
    });
  }
});
s1.props = i;
const o5 = s1, T2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 3,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 6,
  cy: 12,
  r: 2,
  fill: "#6A6F7F"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 2,
  fill: "#6A6F7F"
}, null), l("circle", {
  cx: 18,
  cy: 12,
  r: 2,
  fill: "#6A6F7F"
}, null)])), r1 = /* @__PURE__ */ t({
  name: "IconOverflow",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "overflow"
    }, n), {
      default: () => l(T2, null, null)
    });
  }
});
r1.props = i;
const i5 = r1, k2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M1 8C1 6.34315 2.34315 5 4 5H12V19H4C2.34315 19 1 17.6569 1 16V8Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M8 9L5 12L8 15",
  stroke: "white",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null), l("path", {
  d: "M12 5H20C21.6569 5 23 6.34315 23 8V16C23 17.6569 21.6569 19 20 19H12V5Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M16 9L19 12L16 15",
  stroke: "#AAB2BF",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null)])), c1 = /* @__PURE__ */ t({
  name: "IconPagination",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "pagination"
    }, n), {
      default: () => l(k2, null, null)
    });
  }
});
c1.props = i;
const s5 = c1, _2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 5,
  y: 8,
  width: 17,
  height: 14,
  rx: 2,
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M8.46515 2.29217C8.23247 1.90171 7.66701 1.90171 7.43432 2.29217L5.82062 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H10.0789L8.46515 2.29217Z",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 7,
  y: 13,
  width: 4,
  height: 3,
  rx: 1,
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 13,
  y: 13,
  width: 4,
  height: 3,
  rx: 1,
  fill: "#324350"
}, null)])), u1 = /* @__PURE__ */ t({
  name: "IconPopconfirm",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "popconfirm"
    }, n), {
      default: () => l(_2, null, null)
    });
  }
});
u1.props = i;
const r5 = u1, P2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 9,
  y: 9,
  width: 13,
  height: 13,
  rx: 2,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 2,
  y: 7,
  width: 12,
  height: 12,
  rx: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 8,
  y: 2,
  width: 11,
  height: 11,
  rx: 2,
  fill: "#DDE3E8"
}, null)])), C1 = /* @__PURE__ */ t({
  name: "IconPopover",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "popover"
    }, n), {
      default: () => l(P2, null, null)
    });
  }
});
C1.props = i;
const c5 = C1, j2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 8,
  stroke: "#3BCE4A",
  "stroke-width": 6
}, null), l("path", {
  d: "M12.1378 4C16.48 4 20 7.58172 20 12C20 16.4183 16.48 20 12.1378 20C9.65493 20 7.44087 18.8289 6 17",
  stroke: "#3BCE4A",
  "stroke-width": 6,
  "stroke-linecap": "round"
}, null)])), h1 = /* @__PURE__ */ t({
  name: "IconProgress",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "progress"
    }, n), {
      default: () => l(j2, null, null)
    });
  }
});
h1.props = i;
const u5 = h1, N2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 11,
  fill: "#4CC3FA"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 5,
  fill: "white"
}, null)])), a1 = /* @__PURE__ */ t({
  name: "IconRadio",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "radio"
    }, n), {
      default: () => l(N2, null, null)
    });
  }
});
a1.props = i;
const C5 = a1, O2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3049)"
}, [l("path", {
  d: "M7.92633 5.50269C8.1449 4.94209 8.8675 4.79102 9.29235 5.21711L12.9092 8.84444L18.04 9.10898C18.6461 9.14023 19.0164 9.78822 18.7357 10.3262L16.3729 14.8549L17.6749 19.73C17.8341 20.3259 17.313 20.8821 16.708 20.7621L11.6182 19.7524L7.35916 22.7165C6.85292 23.0688 6.15267 22.768 6.05977 22.1582L5.29971 17.1698L1.32061 13.967C0.847879 13.5865 0.927602 12.8444 1.47037 12.573L6.06555 10.2752L7.92633 5.50269Z",
  fill: "#FBCD2C"
}, null), l("path", {
  d: "M19.9373 1.13616C20.1413 0.97521 20.4435 1.07701 20.5085 1.32861L21.0619 3.47049L22.9147 4.69129C23.1335 4.83549 23.1297 5.1578 22.9075 5.29675L21.0371 6.46633L20.4556 8.56653C20.3845 8.82324 20.0688 8.91638 19.8697 8.73936L18.1952 7.25006L15.9609 7.42226C15.6953 7.44273 15.5003 7.17753 15.5991 6.93015L16.4072 4.9063L15.626 2.84325C15.5332 2.59816 15.7252 2.33925 15.9867 2.3569L18.2005 2.50634L19.9373 1.13616Z",
  fill: "#DDE3E8"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3049"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), p1 = /* @__PURE__ */ t({
  name: "IconRating",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "rating"
    }, n), {
      default: () => l(O2, null, null)
    });
  }
});
p1.props = i;
const h5 = p1, R2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2.75,
  y: 2.75,
  width: 18.5,
  height: 18.5,
  rx: 3,
  fill: "white",
  stroke: "#AAB2BF",
  "stroke-width": 1.5
}, null), l("path", {
  d: "M16 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H16V2Z",
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 3.5,
  y: 7,
  width: 12.5,
  height: 5,
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M3.5 17H16V20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V17Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M18.9991 4L20.2981 6.25H17.7L18.9991 4Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M18.999 20.25L17.7 18H20.2981L18.999 20.25Z",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 18,
  y: 8,
  width: 2,
  height: 6,
  rx: 1,
  fill: "#DDE3E8"
}, null)])), d1 = /* @__PURE__ */ t({
  name: "IconScrollList",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "scroll-list"
    }, n), {
      default: () => l(R2, null, null)
    });
  }
});
d1.props = i;
const a5 = d1, U2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3050)"
}, [l("rect", {
  x: 2,
  y: 2,
  width: 16,
  height: 5,
  rx: 0.5,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 2,
  y: 17,
  width: 16,
  height: 5,
  rx: 0.5,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 6,
  y: 9,
  width: 16,
  height: 6,
  rx: 0.5,
  fill: "#FBCD2C"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12.5 10.7929C12.5 9.902 13.5771 9.45583 14.2071 10.0858L22.9142 18.7929C23.5442 19.4229 23.098 20.5 22.2071 20.5H18.2488C17.6797 20.5 17.1376 20.7424 16.7581 21.1666L14.2453 23.9756C13.6333 24.6598 12.5 24.2269 12.5 23.3089V10.7929ZM16.6837 19H21L14 12V22L16.6837 19Z",
  fill: "white"
}, null), l("path", {
  d: "M14 22V12L21 19H16.6837L14 22Z",
  fill: "#324350"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3050"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), f1 = /* @__PURE__ */ t({
  name: "IconSelect",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "select"
    }, n), {
      default: () => l(U2, null, null)
    });
  }
});
f1.props = i;
const p5 = f1, G2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2 5C2 3.34315 3.34315 2 5 2H14V22H5C3.34315 22 2 20.6569 2 19V5Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M14 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H14V2Z",
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 11,
  y: 8,
  width: 2,
  height: 8,
  rx: 1,
  fill: "#AAB2BF"
}, null)])), w1 = /* @__PURE__ */ t({
  name: "IconSideSheet",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "side-sheet"
    }, n), {
      default: () => l(G2, null, null)
    });
  }
});
w1.props = i;
const d5 = w1, q2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 11,
  width: 21,
  height: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 2,
  y: 15,
  width: 21,
  height: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 11,
  y: 2,
  width: 12,
  height: 3,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 11,
  y: 6,
  width: 9,
  height: 3,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 2,
  y: 19,
  width: 11,
  height: 3,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 2,
  y: 2,
  width: 7,
  height: 7,
  fill: "#6A6F7F"
}, null)])), m1 = /* @__PURE__ */ t({
  name: "IconSkeleton",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "skeleton"
    }, n), {
      default: () => l(q2, null, null)
    });
  }
});
m1.props = i;
const f5 = m1, z2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 5,
  y: 4,
  width: 17,
  height: 2,
  rx: 1,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 2,
  y: 11,
  width: 18,
  height: 2,
  rx: 1,
  fill: "#4CC3FA"
}, null), l("rect", {
  x: 5,
  y: 18,
  width: 17,
  height: 2,
  rx: 1,
  fill: "#AAB2BF"
}, null), l("circle", {
  cx: 5.5,
  cy: 5,
  r: 3.5,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 18.5,
  cy: 12,
  r: 3.5,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 5.5,
  cy: 19,
  r: 3.5,
  fill: "#DDE3E8"
}, null)])), g1 = /* @__PURE__ */ t({
  name: "IconSlider",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "slider"
    }, n), {
      default: () => l(z2, null, null)
    });
  }
});
g1.props = i;
const w5 = g1, W2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 2,
  width: 2,
  height: 20,
  rx: 1,
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 21,
  y: 2,
  width: 2,
  height: 20,
  rx: 1,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M6 12L18 12",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round"
}, null), l("path", {
  d: "M15 9L18 12L15 15",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null), l("path", {
  d: "M9 9L6 12L9 15",
  stroke: "#4CC3FA",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null)])), v1 = /* @__PURE__ */ t({
  name: "IconSpace",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "space"
    }, n), {
      default: () => l(W2, null, null)
    });
  }
});
v1.props = i;
const m5 = v1, K2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M13.5 2.5C13.5 1.67157 12.8284 1 12 1C11.1716 1 10.5 1.67157 10.5 2.5V6.49999C10.5 7.32841 11.1716 7.99999 12 7.99999C12.8284 7.99999 13.5 7.32841 13.5 6.49999V2.5Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M13.5 17.5C13.5 16.6716 12.8284 16 12 16C11.1716 16 10.5 16.6716 10.5 17.5V21.5C10.5 22.3284 11.1716 23 12 23C12.8284 23 13.5 22.3284 13.5 21.5V17.5Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M4.52273 5.95097C3.80529 5.53675 2.88791 5.78256 2.47369 6.5C2.05948 7.21744 2.30529 8.13483 3.02273 8.54904L6.48682 10.549C7.20426 10.9632 8.12165 10.7174 8.53586 10C8.95007 9.28256 8.70426 8.36517 7.98682 7.95096L4.52273 5.95097Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M17.5131 13.451C16.7957 13.0368 15.8783 13.2826 15.4641 14C15.0499 14.7174 15.2957 15.6348 16.0131 16.049L19.4772 18.049C20.1947 18.4633 21.1121 18.2175 21.5263 17.5C21.9405 16.7826 21.6947 15.8652 20.9772 15.451L17.5131 13.451Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M3.02273 15.451C2.30529 15.8652 2.05948 16.7826 2.47369 17.5C2.88791 18.2174 3.80529 18.4633 4.52273 18.049L7.98682 16.049C8.70426 15.6348 8.95007 14.7174 8.53586 14C8.12165 13.2826 7.20426 13.0368 6.48682 13.451L3.02273 15.451Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M16.0131 7.95097C15.2957 8.36518 15.0499 9.28256 15.4641 10C15.8783 10.7174 16.7957 10.9633 17.5131 10.549L20.9772 8.54903C21.6947 8.13482 21.9405 7.21743 21.5263 6.5C21.1121 5.78256 20.1947 5.53674 19.4772 5.95096L16.0131 7.95097Z",
  fill: "#FF7D95"
}, null)])), x1 = /* @__PURE__ */ t({
  name: "IconSpin",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "spin"
    }, n), {
      default: () => l(K2, null, null)
    });
  }
});
x1.props = i;
const g5 = x1, X2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M14 10C14 9.44772 14.4477 9 15 9H20C20.5523 9 21 9.44772 21 10V21C21 21.5523 20.5523 22 20 22H3C2.44772 22 2 21.5523 2 21V18C2 17.4477 2.44772 17 3 17H7.5C7.77614 17 8 16.7761 8 16.5V14C8 13.4477 8.44772 13 9 13H13.5C13.7761 13 14 12.7761 14 12.5V10Z",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 16,
  y: 5,
  width: 2,
  height: 4,
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M23 5L16 2V8L23 5Z",
  fill: "#F82C2C"
}, null)])), I1 = /* @__PURE__ */ t({
  name: "IconSteps",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "steps"
    }, n), {
      default: () => l(X2, null, null)
    });
  }
});
I1.props = i;
const v5 = I1, J2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 1,
  width: 20,
  height: 10,
  rx: 5,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 7.5,
  cy: 5.99997,
  r: 3.5,
  fill: "white"
}, null), l("rect", {
  x: 2,
  y: 13,
  width: 20,
  height: 10,
  rx: 5,
  fill: "#3BCE4A"
}, null), l("circle", {
  cx: 16.5,
  cy: 18,
  r: 3.5,
  fill: "white"
}, null)])), L1 = /* @__PURE__ */ t({
  name: "IconSwitch",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "switch"
    }, n), {
      default: () => l(J2, null, null)
    });
  }
});
L1.props = i;
const x5 = L1, Q2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2.00001 5.00003C2.00001 3.89546 2.89544 3.00003 4.00001 3.00003H11V8.00003H2.00001V5.00003Z",
  fill: "#3BCE4A"
}, null), l("path", {
  d: "M13 3.00003H20C21.1046 3.00003 22 3.89546 22 5.00003V8.00003H13V3.00003Z",
  fill: "#3BCE4A"
}, null), l("rect", {
  x: 2,
  y: 10,
  width: 9,
  height: 5,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 13,
  y: 10,
  width: 9,
  height: 5,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M2.00001 17H11V22H4.00001C2.89544 22 2.00001 21.1046 2.00001 20V17Z",
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M13 17H22V20C22 21.1046 21.1046 22 20 22H13V17Z",
  fill: "#AAB2BF"
}, null)])), y1 = /* @__PURE__ */ t({
  name: "IconTable",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "table"
    }, n), {
      default: () => l(Q2, null, null)
    });
  }
});
y1.props = i;
const I5 = y1, Y2 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M12 5.99997C12 4.8954 12.8954 3.99997 14 3.99997H19C20.1046 3.99997 21 4.8954 21 5.99997V11C21 12.1045 20.1046 13 19 13H14C12.8954 13 12 12.1045 12 11V5.99997Z",
  fill: "#818A9B"
}, null), l("path", {
  d: "M3.99999 1.99997C2.89542 1.99997 1.99999 2.8954 1.99999 3.99997L1.99999 20C1.99999 21.1045 2.89542 22 3.99999 22H20C21.1046 22 22 21.1045 22 20V9.99997C22 8.8954 21.1046 7.99997 20 7.99997H14C12.8954 7.99997 12 7.10454 12 5.99997V3.99997C12 2.8954 11.1046 1.99997 9.99999 1.99997L3.99999 1.99997Z",
  fill: "#DDE3E8"
}, null), l("rect", {
  x: 6,
  y: 12,
  width: 12,
  height: 2,
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 6,
  y: 16,
  width: 9,
  height: 2,
  fill: "#AAB2BF"
}, null)])), B1 = /* @__PURE__ */ t({
  name: "IconTabs",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tabs"
    }, n), {
      default: () => l(Y2, null, null)
    });
  }
});
B1.props = i;
const L5 = B1, l3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 1,
  y: 4,
  width: 22,
  height: 16,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M4.0918 16.4052C4.54883 16.4052 4.80273 16.1704 4.98047 15.5737L5.46289 14.101H8.50342L8.99219 15.5737C9.16357 16.164 9.43018 16.4052 9.89355 16.4052C10.3823 16.4052 10.7061 16.1133 10.7061 15.6562C10.7061 15.4785 10.6616 15.269 10.5728 14.9961L8.38916 8.73727C8.11621 7.92477 7.73535 7.5947 7.01807 7.5947C6.29443 7.5947 5.90723 7.93112 5.63428 8.73727L3.45068 14.9961C3.34277 15.3198 3.29834 15.5166 3.29834 15.688C3.29834 16.1196 3.62207 16.4052 4.0918 16.4052ZM5.84375 12.8252L6.94824 9.32126H7.03076L8.12891 12.8252H5.84375Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M20.1213 9.87865C19.7308 9.48812 19.0976 9.48812 18.7071 9.87865L18 10.5858L17.2929 9.87865C16.9024 9.48812 16.2692 9.48812 15.8787 9.87865C15.4882 10.2692 15.4882 10.9023 15.8787 11.2929L16.5858 12L15.8787 12.7071C15.4882 13.0976 15.4882 13.7308 15.8787 14.1213C16.2692 14.5118 16.9024 14.5118 17.2929 14.1213L18 13.4142L18.7071 14.1213C19.0976 14.5118 19.7308 14.5118 20.1213 14.1213C20.5118 13.7308 20.5118 13.0976 20.1213 12.7071L19.4142 12L20.1213 11.2929C20.5118 10.9023 20.5118 10.2692 20.1213 9.87865Z",
  fill: "#324350"
}, null)])), A1 = /* @__PURE__ */ t({
  name: "IconTagInput",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tag-input"
    }, n), {
      default: () => l(l3, null, null)
    });
  }
});
A1.props = i;
const y5 = A1, n3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M13.2427 3.34314C12.1819 3.34314 11.1644 3.76457 10.4143 4.51471L1.68637 13.2426C0.905324 14.0237 0.905324 15.29 1.68637 16.0711L7.34323 21.7279C8.12427 22.509 9.3906 22.509 10.1717 21.7279L18.8996 13C19.6497 12.2498 20.0711 11.2324 20.0711 10.1716V5.34314C20.0711 4.23857 19.1757 3.34314 18.0711 3.34314L13.2427 3.34314ZM13.0001 7.58578C12.219 8.36683 12.219 9.63316 13.0001 10.4142C13.7811 11.1953 15.0475 11.1953 15.8285 10.4142C16.6096 9.63316 16.6096 8.36683 15.8285 7.58578C15.0475 6.80473 13.7811 6.80473 13.0001 7.58578Z",
  fill: "#F82C2C"
}, null), l("path", {
  d: "M14.85 8.40001C16.05 6.90001 19.7 4.7 21.5 6.5C23.75 8.75 20 12.5 20 16C20 18.4739 22.15 19 22.85 19",
  stroke: "#AAB2BF",
  "stroke-width": 1.5,
  "stroke-linecap": "round"
}, null)])), $1 = /* @__PURE__ */ t({
  name: "IconTag",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tag"
    }, n), {
      default: () => l(n3, null, null)
    });
  }
});
$1.props = i;
const B5 = $1, e3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("circle", {
  cx: 12,
  cy: 12,
  r: 10.25,
  fill: "white",
  stroke: "#AAB2BF",
  "stroke-width": 1.5
}, null), l("path", {
  d: "M14.5 6.5L12 12L17 17.5",
  stroke: "#6A6F7F",
  "stroke-width": 2.5,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 2,
  fill: "#324350"
}, null), l("path", {
  d: "M13 11.625L12 12L5 15",
  stroke: "#FBCD2C",
  "stroke-linecap": "round"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 1,
  fill: "#FBCD2C"
}, null)])), F1 = /* @__PURE__ */ t({
  name: "IconTimePicker",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "time-picker"
    }, n), {
      default: () => l(e3, null, null)
    });
  }
});
F1.props = i;
const A5 = F1, t3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 3,
  y: 11,
  width: 18,
  height: 2,
  fill: "#AAB2BF"
}, null), l("circle", {
  cx: 4,
  cy: 12,
  r: 3,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 12,
  cy: 12,
  r: 3,
  fill: "#DDE3E8"
}, null), l("circle", {
  cx: 20,
  cy: 12,
  r: 3,
  fill: "#4CC3FA"
}, null)])), H1 = /* @__PURE__ */ t({
  name: "IconTimeline",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "timeline"
    }, n), {
      default: () => l(t3, null, null)
    });
  }
});
H1.props = i;
const $5 = H1, o3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("g", {
  "clip-path": "url(#clip0_1_3058)"
}, [l("path", {
  d: "M0.817818 4.5455C0.412129 5.00207 0.353969 5.92994 0.42002 6.55837L0.759737 9.79057C0.86798 10.8204 1.74149 11.5727 2.71077 11.4708L2.94477 11.4462L3.84633 20.024C4.04232 21.8887 5.14137 22.7787 7.13041 22.5697L18.0702 21.4198C21.0537 21.1063 21.9437 20.0072 21.7477 18.1425L20.8462 9.56472C21.8154 9.46285 22.7475 8.5208 22.6392 7.49094L22.2995 4.25874C22.2147 3.4518 21.8898 2.79537 21.2172 2.40144C19.8694 1.61209 16.2497 0.495504 10.9024 1.05752C5.34314 1.64183 1.72654 3.52281 0.817818 4.5455Z",
  fill: "#FBCD2C"
}, null), l("circle", {
  cx: 7.21108,
  cy: 8.98682,
  r: 1.5,
  transform: "rotate(-6 7.21108 8.98682)",
  fill: "#324350"
}, null), l("circle", {
  cx: 16.1618,
  cy: 8.04605,
  r: 1.5,
  transform: "rotate(-6 16.1618 8.04605)",
  fill: "#324350"
}, null), l("path", {
  d: "M12.4704 15.9754C14.6674 15.7444 16.2613 13.7762 16.0304 11.5792C16.0304 11.5792 14.9836 11.1864 12 11.5C9.01643 11.8136 8.07418 12.4154 8.07418 12.4154C8.30509 14.6124 10.2733 16.2063 12.4704 15.9754Z",
  fill: "#324350"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M14.6727 15.0199C14.0749 15.539 13.3175 15.8863 12.4704 15.9753C11.6232 16.0644 10.8101 15.8821 10.1175 15.4986C10.3199 14.4983 11.1508 13.7008 12.2195 13.5885C13.2882 13.4762 14.2667 14.0835 14.6727 15.0199Z",
  fill: "#FF2969"
}, null)]), l("defs", null, [l("clipPath", {
  id: "clip0_1_3058"
}, [l("rect", {
  width: 24,
  height: 24,
  fill: "white"
}, null)])])])), V1 = /* @__PURE__ */ t({
  name: "IconToast",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "toast"
    }, n), {
      default: () => l(o3, null, null)
    });
  }
});
V1.props = i;
const F5 = V1, i3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  width: 8,
  height: 8,
  rx: 4,
  fill: "#F0B114"
}, null), l("rect", {
  y: 10,
  width: 8,
  height: 8,
  rx: 4,
  fill: "#E91E63"
}, null), l("rect", {
  x: 10,
  width: 8,
  height: 8,
  rx: 4,
  fill: "#0077FA"
}, null), l("rect", {
  x: 10,
  y: 10,
  width: 8,
  height: 8,
  rx: 4,
  fill: "#00B3A1"
}, null)])), M1 = /* @__PURE__ */ t({
  name: "IconToken",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "token"
    }, n), {
      default: () => l(i3, null, null)
    });
  }
});
M1.props = i;
const H5 = M1, s3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M3.29164 3.86668C2.026 3.99971 1.10784 5.13355 1.24086 6.39919L2.44517 17.8574C2.57819 19.123 3.71203 20.0412 4.97767 19.9082L9.08038 19.477L12.5439 22.2817C12.7912 22.4819 13.1539 22.4438 13.3542 22.1966L16.1589 18.733L20.4463 18.2824C21.7119 18.1493 22.6301 17.0155 22.4971 15.7499L21.2927 4.29165C21.1597 3.02601 20.0259 2.10784 18.7602 2.24087L3.29164 3.86668Z",
  fill: "#6A6F7F"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M11.4608 8.56884C10.9071 8.62704 10.5067 9.13593 10.5666 9.70549C10.6265 10.275 10.2261 10.7839 9.6724 10.8421C9.11868 10.9003 8.62127 10.4858 8.56141 9.91624C8.38182 8.20757 9.58287 6.68088 11.244 6.50629C12.9052 6.33169 14.3974 7.57531 14.577 9.28398C14.6689 10.1589 14.3122 10.8684 13.9927 11.3353C13.8289 11.5746 13.6556 11.7783 13.5175 11.9341C13.4509 12.0092 13.401 12.0643 13.3618 12.1076C13.3042 12.1712 13.2698 12.2092 13.24 12.2471L12.6442 13.0044C12.295 13.4483 11.6598 13.5155 11.2259 13.1539C10.7921 12.7923 10.7234 12.1394 11.0727 11.6955L11.6688 10.9377C11.7427 10.8438 11.8536 10.721 11.9427 10.6223C11.9728 10.589 12.0004 10.5584 12.0233 10.5326C12.14 10.4009 12.2484 10.271 12.3409 10.1357C12.5339 9.85365 12.5882 9.65108 12.5718 9.49474C12.5119 8.92518 12.0145 8.51064 11.4608 8.56884Z",
  fill: "white"
}, null), l("circle", {
  cx: 12.0566,
  cy: 15.1576,
  r: 1.2,
  transform: "rotate(-6 12.0566 15.1576)",
  fill: "white"
}, null)])), Z1 = /* @__PURE__ */ t({
  name: "IconTooltip",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tooltip"
    }, n), {
      default: () => l(s3, null, null)
    });
  }
});
Z1.props = i;
const V5 = Z1, r3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M7.07021 20.351L1.58652 15.9687C1.28595 15.7285 1.28595 15.2715 1.58652 15.0313L7.07021 10.649C7.39763 10.3874 7.88235 10.6205 7.88235 11.0396L7.88235 13.3L13.55 13.3C13.7985 13.3 14 13.5015 14 13.75L14 17.25C14 17.4985 13.7985 17.7 13.55 17.7L7.88235 17.7L7.88235 19.9604C7.88235 20.3795 7.39763 20.6126 7.07021 20.351Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M13.807 5.62764L21.3911 11.5264C21.6999 11.7666 21.6999 12.2334 21.3911 12.4736L13.807 18.3724C13.4785 18.6278 13 18.3938 13 17.9777L13 14.8L7.5 14.8C7.22386 14.8 7 14.5761 7 14.3L7 9.7C7 9.42386 7.22386 9.2 7.5 9.2L13 9.2L13 6.02232C13 5.60625 13.4785 5.3722 13.807 5.62764Z",
  fill: "white"
}, null), l("path", {
  d: "M14.807 4.62764L22.3911 10.5264C22.6999 10.7666 22.6999 11.2334 22.3911 11.4736L14.807 17.3724C14.4785 17.6278 14 17.3938 14 16.9777L14 13.8L8.5 13.8C8.22386 13.8 8 13.5761 8 13.3L8 8.7C8 8.42386 8.22386 8.2 8.5 8.2L14 8.2L14 5.02232C14 4.60625 14.4785 4.3722 14.807 4.62764Z",
  fill: "#4CC3FA"
}, null)])), D1 = /* @__PURE__ */ t({
  name: "IconTransfer",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "transfer"
    }, n), {
      default: () => l(r3, null, null)
    });
  }
});
D1.props = i;
const M5 = D1, c3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 2,
  y: 10,
  width: 20,
  height: 12,
  rx: 2,
  fill: "#DDE3E8"
}, null), l("path", {
  d: "M8 13C8 12.4477 8.44772 12 9 12H19C19.5523 12 20 12.4477 20 13V14C20 14.5523 19.5523 15 19 15H9C8.44772 15 8 14.5523 8 14V13Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13V14C7 14.5523 6.55228 15 6 15H5C4.44772 15 4 14.5523 4 14V13Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M10 18C10 17.4477 10.4477 17 11 17H19C19.5523 17 20 17.4477 20 18V19C20 19.5523 19.5523 20 19 20H11C10.4477 20 10 19.5523 10 19V18Z",
  fill: "#AAB2BF"
}, null), l("path", {
  d: "M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6C22 7.10457 21.1046 8 20 8H4C2.89543 8 2 7.10457 2 6V4Z",
  fill: "#3BCE4A"
}, null), l("path", {
  d: "M14 2H20C21.1046 2 22 2.89543 22 4V6C22 7.10457 21.1046 8 20 8H14V2Z",
  fill: "#818A9B"
}, null), l("path", {
  d: "M18.416 6.07597C18.2181 6.37284 17.7819 6.37284 17.584 6.07597L16.5182 4.47736C16.2967 4.14508 16.5349 3.70001 16.9343 3.70001L19.0657 3.70001C19.4651 3.70001 19.7033 4.14508 19.4818 4.47736L18.416 6.07597Z",
  fill: "white"
}, null)])), E1 = /* @__PURE__ */ t({
  name: "IconTreeSelect",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tree-select"
    }, n), {
      default: () => l(c3, null, null)
    });
  }
});
E1.props = i;
const Z5 = E1, u3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("rect", {
  x: 9,
  y: 16,
  width: 13,
  height: 5,
  rx: 0.5,
  fill: "#6A6F7F"
}, null), l("rect", {
  x: 9,
  y: 9,
  width: 13,
  height: 5,
  rx: 0.5,
  fill: "#6A6F7F"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M5 6C5.55228 6 6 6.44772 6 7V18H7C7.55228 18 8 18.4477 8 19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V7C4 6.44772 4.44772 6 5 6Z",
  fill: "#AAB2BF"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M5 12C5 11.4477 5.44772 11 6 11H7C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H6C5.44772 13 5 12.5523 5 12Z",
  fill: "#AAB2BF"
}, null), l("rect", {
  x: 2,
  y: 2,
  width: 15,
  height: 5,
  rx: 0.5,
  fill: "#4CC3FA"
}, null)])), S1 = /* @__PURE__ */ t({
  name: "IconTree",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "tree"
    }, n), {
      default: () => l(u3, null, null)
    });
  }
});
S1.props = i;
const D5 = S1, C3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M2.84766 19.1289C3.62109 19.1289 4.05078 18.7314 4.35156 17.7217L5.16797 15.2295H10.3135L11.1406 17.7217C11.4307 18.7207 11.8818 19.1289 12.666 19.1289C13.4932 19.1289 14.041 18.6348 14.041 17.8613C14.041 17.5605 13.9658 17.2061 13.8154 16.7441L10.1201 6.15234C9.6582 4.77734 9.01367 4.21875 7.7998 4.21875C6.5752 4.21875 5.91992 4.78809 5.45801 6.15234L1.7627 16.7441C1.58008 17.292 1.50488 17.625 1.50488 17.915C1.50488 18.6455 2.05273 19.1289 2.84766 19.1289ZM5.8125 13.0703L7.68164 7.14062H7.82129L9.67969 13.0703H5.8125Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M16.9307 15.9849C16.9307 15.1777 17.5244 14.6953 18.5264 14.6953H20.4189V15.7158C20.4189 16.6436 19.5933 17.3672 18.5356 17.3672C17.5801 17.3672 16.9307 16.8013 16.9307 15.9849ZM20.521 18.0273V17.7476V18.0908C20.5952 18.731 21.022 19.0928 21.6714 19.0928C22.4321 19.0928 22.8589 18.6196 22.8589 17.7847V12.4038C22.8589 10.2236 21.4116 8.99902 18.8325 8.99902C17.7563 8.99902 16.9307 9.18457 16.3091 9.50928C15.4463 9.94531 15.0474 10.5298 15.0474 11.105C15.0474 11.606 15.3813 11.9678 15.9194 11.9678C16.3184 11.9678 16.5781 11.8657 16.8564 11.6431C17.4038 11.1514 17.9326 10.873 18.6748 10.873C19.7974 10.873 20.4189 11.3926 20.4189 12.3853V13.1924H18.0811C15.8452 13.1924 14.5 14.3149 14.5 16.1333C14.5 17.9238 15.7988 19.1299 17.7192 19.1299C18.9253 19.1299 20.02 18.9087 20.521 18.0273Z",
  fill: "#AAB2BF"
}, null)])), b1 = /* @__PURE__ */ t({
  name: "IconTypography",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "typography"
    }, n), {
      default: () => l(C3, null, null)
    });
  }
});
b1.props = i;
const E5 = b1, h3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M14 2L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H14Z",
  fill: "#4CC3FA"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L8.29289 12.2929C7.90237 12.6834 7.90237 13.3166 8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071L11 12.4142V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V12.4142L14.2929 13.7071C14.6834 14.0976 15.3166 14.0976 15.7071 13.7071C16.0976 13.3166 16.0976 12.6834 15.7071 12.2929L12.7071 9.29289Z",
  fill: "white"
}, null), l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M20 8L14 2V6C14 7.10457 14.8954 8 16 8L20 8Z",
  fill: "#324350"
}, null)])), T1 = /* @__PURE__ */ t({
  name: "IconUpload",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "upload"
    }, n), {
      default: () => l(h3, null, null)
    });
  }
});
T1.props = i;
const S5 = T1, a3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M19 2H5C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M4.05114 16.8466H10.0341V15.5256H6.23295V15.4659L7.73722 13.9361C9.43324 12.3082 9.90199 11.5156 9.90199 10.5312C9.90199 9.0696 8.71307 8 6.95739 8C5.22727 8 4 9.07386 4 10.7315H5.50426C5.50426 9.84091 6.06676 9.28267 6.93608 9.28267C7.76705 9.28267 8.38494 9.78977 8.38494 10.6122C8.38494 11.3409 7.94176 11.8608 7.08097 12.7344L4.05114 15.7045V16.8466Z",
  fill: "white"
}, null), l("path", {
  d: "M11.9916 16.9403C12.4944 16.9403 12.9248 16.5227 12.9291 16.0028C12.9248 15.4915 12.4944 15.0739 11.9916 15.0739C11.4717 15.0739 11.0498 15.4915 11.0541 16.0028C11.0498 16.5227 11.4717 16.9403 11.9916 16.9403Z",
  fill: "white"
}, null), l("path", {
  d: "M16.9107 17.0128C19.0159 17.017 20.273 15.3551 20.273 12.4915C20.273 9.64489 19.0073 8 16.9107 8C14.8141 8 13.5528 9.64062 13.5485 12.4915C13.5485 15.3509 14.8056 17.0128 16.9107 17.0128ZM16.9107 15.679C15.8241 15.679 15.1423 14.5881 15.1465 12.4915C15.1508 10.4119 15.8284 9.31676 16.9107 9.31676C17.9974 9.31676 18.6749 10.4119 18.6792 12.4915C18.6792 14.5881 18.0016 15.679 16.9107 15.679Z",
  fill: "white"
}, null)])), k1 = /* @__PURE__ */ t({
  name: "IconVersionTwo",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "version-two"
    }, n), {
      default: () => l(a3, null, null)
    });
  }
});
k1.props = i;
const b5 = k1, p3 = /* @__PURE__ */ t((n, {
  slots: e
}) => () => l("svg", o({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  focusable: !1,
  "aria-hidden": !0
}, n), [l("path", {
  d: "M6.9425 8.65613C6.91241 8.54178 6.79002 8.47819 6.68046 8.52266C3.9356 9.63702 2 12.3298 2 15.4746C2 19.6168 5.35786 22.9746 9.5 22.9746C13.2245 22.9746 16.315 20.2597 16.9003 16.7009C16.9199 16.5815 16.8264 16.4746 16.7055 16.4746H14.0482C13.9548 16.4746 13.8743 16.5395 13.8504 16.6298C13.3404 18.5554 11.5859 19.9746 9.5 19.9746C7.01472 19.9746 5 17.9599 5 15.4746C5 13.7065 6.0197 12.1766 7.50311 11.4409C7.59068 11.3974 7.63804 11.2992 7.61316 11.2046L6.9425 8.65613Z",
  fill: "#4CC3FA"
}, null), l("path", {
  d: "M13 3C13 4.10457 12.1046 5 11 5C9.89543 5 9 4.10457 9 3C9 1.89543 9.89543 1 11 1C12.1046 1 13 1.89543 13 3Z",
  fill: "#6A6F7F"
}, null), l("path", {
  d: "M9.7068 13.7916C9.94218 14.712 10.781 15.3184 11.692 15.296C11.7343 15.2986 11.777 15.3 11.82 15.3H17.6037C17.6969 15.3 17.7777 15.3644 17.7986 15.4553L19.1839 21.4917C19.4001 22.4338 20.339 23.0222 21.281 22.806C22.223 22.5898 22.8114 21.6509 22.5952 20.7089L20.7662 12.7389C20.63 12.1452 20.2066 11.692 19.6764 11.4921C19.4168 11.3689 19.1264 11.3 18.82 11.3H13.3536C13.2623 11.3 13.1825 11.2381 13.1599 11.1495L12.9297 10.2496C12.8974 10.1231 12.9929 10 13.1235 10H16.75C17.4404 10 18 9.44036 18 8.75C18 8.05964 17.4404 7.5 16.75 7.5H12.25C12.2422 7.5 12.2344 7.50007 12.2266 7.50021L12.0955 6.98763C11.8219 5.9175 10.7325 5.27184 9.66236 5.54551C8.59223 5.81918 7.94657 6.90854 8.22024 7.97867L9.7068 13.7916Z",
  fill: "#6A6F7F"
}, null)])), _1 = /* @__PURE__ */ t({
  name: "IconWheelChair",
  setup(n, {
    slots: e
  }) {
    return () => l(s, o({
      iconType: "wheel-chair"
    }, n), {
      default: () => l(p3, null, null)
    });
  }
});
_1.props = i;
const T5 = _1;
export {
  s as ConvertIcon,
  f3 as Icon,
  w3 as IconAccessibility,
  m3 as IconAnchor,
  g3 as IconAutocomplete,
  v3 as IconAvatar,
  x3 as IconBackTop,
  L3 as IconBadge,
  I3 as IconBadgeStar,
  y3 as IconBanner,
  B3 as IconBreadcrumb,
  A3 as IconButton,
  $3 as IconCalendar,
  F3 as IconCard,
  H3 as IconCarousel,
  V3 as IconCascader,
  M3 as IconChangelog,
  Z3 as IconCheckbox,
  D3 as IconCollapse,
  E3 as IconCollapsible,
  b3 as IconColorPlatte,
  S3 as IconColorPlatteNew,
  T3 as IconConfig,
  k3 as IconDarkMode,
  _3 as IconDatePicker,
  P3 as IconDescriptions,
  j3 as IconDivider,
  N3 as IconDropdown,
  O3 as IconEmpty,
  R3 as IconFaq,
  U3 as IconForm,
  G3 as IconGettingStarted,
  q3 as IconGrid,
  z3 as IconHeart,
  W3 as IconHighlight,
  K3 as IconImage,
  J3 as IconInput,
  X3 as IconInputNumber,
  Q3 as IconIntro,
  Y3 as IconLayout,
  l5 as IconList,
  n5 as IconLocaleProvider,
  e5 as IconModal,
  t5 as IconNavigation,
  o5 as IconNotification,
  i5 as IconOverflow,
  s5 as IconPagination,
  r5 as IconPopconfirm,
  c5 as IconPopover,
  u5 as IconProgress,
  C5 as IconRadio,
  h5 as IconRating,
  a5 as IconScrollList,
  p5 as IconSelect,
  d5 as IconSideSheet,
  f5 as IconSkeleton,
  w5 as IconSlider,
  m5 as IconSpace,
  g5 as IconSpin,
  v5 as IconSteps,
  x5 as IconSwitch,
  I5 as IconTable,
  L5 as IconTabs,
  B5 as IconTag,
  y5 as IconTagInput,
  A5 as IconTimePicker,
  $5 as IconTimeline,
  F5 as IconToast,
  H5 as IconToken,
  V5 as IconTooltip,
  M5 as IconTransfer,
  D5 as IconTree,
  Z5 as IconTreeSelect,
  E5 as IconTypography,
  S5 as IconUpload,
  b5 as IconVersionTwo,
  T5 as IconWheelChair
};
