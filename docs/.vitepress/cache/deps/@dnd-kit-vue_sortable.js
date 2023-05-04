import {
  Fragment,
  Teleport,
  cloneVNode,
  computed,
  createVNode,
  defineComponent,
  h,
  inject,
  isVNode,
  mergeProps,
  onUnmounted,
  provide,
  ref,
  shallowRef,
  useSlots,
  watch,
  watchEffect
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@dnd-kit-vue+sortable@0.0.5_@dnd-kit-vue+core@0.0.5_lodash@4.17.21_vue@3.2.47/node_modules/@dnd-kit-vue/sortable/dist/index.mjs
var p0 = Object.defineProperty;
var g0 = (r, i, u) => i in r ? p0(r, i, { enumerable: true, configurable: true, writable: true, value: u }) : r[i] = u;
var ht = (r, i, u) => (g0(r, typeof i != "symbol" ? i + "" : i, u), u);
function ni(r) {
  return shallowRef(r);
}
var ri = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Hn(r) {
  const i = Object.prototype.toString.call(r);
  return i === "[object Window]" || i === "[object global]";
}
function ui(r) {
  return "nodeType" in r;
}
function Vt(r) {
  var i;
  return r ? Hn(r) ? r : ui(r) ? ((i = r.ownerDocument) == null ? void 0 : i.defaultView) ?? window : window : window;
}
function ai(r) {
  const { Document: i } = Vt(r);
  return r instanceof i;
}
function Or(r) {
  return Hn(r) ? false : r instanceof Vt(r).HTMLElement;
}
function y0(r) {
  return r instanceof Vt(r).SVGElement;
}
function Zn(r) {
  return r ? Hn(r) ? r.document : ui(r) ? ai(r) ? r : Or(r) ? r.ownerDocument : document : document : document;
}
function m0() {
  const r = ref(null);
  return [(i, u) => {
    r.value = setInterval(i, u);
  }, () => {
    r.value !== null && (clearInterval(r.value), r.value = null);
  }];
}
function Ar(r, i = [r]) {
  const u = shallowRef(r.value);
  return watch(i, () => {
    u.value !== r.value && (u.value = r.value);
  }, { immediate: true }), u;
}
function uc(r, i) {
  const u = ref();
  return computed(
    () => {
      const s = r(u.value);
      return u.value = s, s;
    }
  );
}
function Ru(r) {
  const i = ni(r), u = ref(null);
  return [u, (s) => {
    var v;
    s !== u.value && ((v = i == null ? void 0 : i.value) == null || v.call(i, s, u.value)), u.value = s;
  }];
}
function ti(r) {
  const i = shallowRef();
  return watchEffect(() => {
    i.value = r;
  }), i;
}
var qa = {};
function Eu(r, i) {
  return computed(() => {
    if (i)
      return i;
    const u = qa[r] == null ? 0 : qa[r] + 1;
    return qa[r] = u, `${r}-${u}`;
  });
}
function ac(r) {
  return (i, ...u) => u.reduce(
    (s, v) => {
      const d = Object.entries(v);
      for (const [y, b] of d) {
        const D = s[y];
        D != null && (s[y] = D + r * b);
      }
      return s;
    },
    {
      ...i
    }
  );
}
var qn = ac(1);
var Du = ac(-1);
function b0(r) {
  return "clientX" in r && "clientY" in r;
}
function ii(r) {
  if (!r)
    return false;
  const { KeyboardEvent: i } = Vt(r.target);
  return i && r instanceof i;
}
function _0(r) {
  if (!r)
    return false;
  const { TouchEvent: i } = Vt(r.target);
  return i && r instanceof i;
}
function Au(r) {
  if (_0(r)) {
    if (r.touches && r.touches.length) {
      const { clientX: i, clientY: u } = r.touches[0];
      return {
        x: i,
        y: u
      };
    } else if (r.changedTouches && r.changedTouches.length) {
      const { clientX: i, clientY: u } = r.changedTouches[0];
      return {
        x: i,
        y: u
      };
    }
  }
  return b0(r) ? {
    x: r.clientX,
    y: r.clientY
  } : null;
}
var Cr = Object.freeze({
  Translate: {
    toString(r) {
      if (!r)
        return;
      const { x: i, y: u } = r;
      return `translate3d(${i ? Math.round(i) : 0}px, ${u ? Math.round(u) : 0}px, 0)`;
    }
  },
  Scale: {
    toString(r) {
      if (!r)
        return;
      const { scaleX: i, scaleY: u } = r;
      return `scaleX(${i}) scaleY(${u})`;
    }
  },
  Transform: {
    toString(r) {
      if (r)
        return [
          Cr.Translate.toString(r),
          Cr.Scale.toString(r)
        ].join(" ");
    }
  },
  Transition: {
    toString({ property: r, duration: i, easing: u }) {
      return `${r} ${i}ms ${u}`;
    }
  }
});
var Xl = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function w0(r) {
  return r.matches(Xl) ? r : r.querySelector(Xl);
}
var x0 = {
  display: "none"
};
function S0({
  id: r,
  value: i
}) {
  return createVNode("div", {
    id: r,
    style: x0
  }, [i]);
}
var R0 = {
  position: "fixed",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(100%)",
  whiteSpace: "nowrap"
};
function D0({
  id: r,
  announcement: i
}) {
  return createVNode("div", {
    id: r,
    style: R0,
    role: "status",
    "aria-live": "assertive",
    "aria-atomic": true
  }, [i]);
}
function A0() {
  const r = ref("");
  return { announce: (i) => {
    i != null && (r.value = i);
  }, announcement: r };
}
var oi = defineComponent((r, {
  slots: i
}) => {
  const u = ref(r.value);
  return watch(() => r.value, () => {
    u.value = r.value;
  }, {
    deep: true
  }), provide("DndMonitorContext", u), () => i.default ? i.default(u.value) : null;
});
oi.props = {
  value: Function
};
oi.name = "DndMonitorContextProvider";
var C0 = {
  Provider: oi
};
function I0(r) {
  const i = inject("DndMonitorContext", ref(null));
  watchEffect(() => {
    if (!i.value)
      throw new Error(
        "useDndMonitor must be used within a children of <DndContext>"
      );
    return i.value(r);
  });
}
function O0() {
  const r = ref(/* @__PURE__ */ new Set());
  return [({
    type: i,
    event: u
  }) => {
    r.value.forEach((s) => {
      var v;
      return (v = s[i]) == null ? void 0 : v.call(s, u);
    });
  }, (i) => (r.value.add(i), () => r.value.delete(i))];
}
var j0 = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
};
var E0 = {
  onDragStart({ active: r }) {
    return `Picked up draggable item ${r.id}.`;
  },
  onDragOver({ active: r, over: i }) {
    return i ? `Draggable item ${r.id} was moved over droppable area ${i.id}.` : `Draggable item ${r.id} is no longer over a droppable area.`;
  },
  onDragEnd({ active: r, over: i }) {
    return i ? `Draggable item ${r.id} was dropped over droppable area ${i.id}` : `Draggable item ${r.id} was dropped.`;
  },
  onDragCancel({ active: r }) {
    return `Dragging was cancelled. Draggable item ${r.id} was dropped.`;
  }
};
function N0(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !isVNode(r);
}
function T0({
  announcements: r = E0,
  container: i,
  hiddenTextDescribedById: u,
  screenReaderInstructions: s = j0
}) {
  const {
    announce: v,
    announcement: d
  } = A0(), y = Eu("DndLiveRegion"), b = ref(false);
  if (watchEffect(() => {
    b.value = true;
  }), I0({
    onDragStart({
      active: _
    }) {
      v(r.onDragStart({
        active: _
      }));
    },
    onDragMove({
      active: _,
      over: S
    }) {
      r.onDragMove && v(r.onDragMove({
        active: _,
        over: S
      }));
    },
    onDragOver({
      active: _,
      over: S
    }) {
      v(r.onDragOver({
        active: _,
        over: S
      }));
    },
    onDragEnd({
      active: _,
      over: S
    }) {
      v(r.onDragEnd({
        active: _,
        over: S
      }));
    },
    onDragCancel({
      active: _,
      over: S
    }) {
      v(r.onDragCancel({
        active: _,
        over: S
      }));
    }
  }), !b)
    return null;
  const D = createVNode(Fragment, null, [createVNode(S0, {
    id: u,
    value: s.draggable
  }, null), createVNode(D0, {
    id: y.value,
    announcement: d.value
  }, null)]);
  return i ? createVNode(Teleport, {
    to: i
  }, N0(D) ? D : {
    default: () => [D]
  }) : D;
}
var It = ((r) => (r.DragStart = "dragStart", r.DragMove = "dragMove", r.DragEnd = "dragEnd", r.DragCancel = "dragCancel", r.DragOver = "dragOver", r.RegisterDroppable = "registerDroppable", r.SetDroppableDisabled = "setDroppableDisabled", r.UnregisterDroppable = "unregisterDroppable", r))(It || {});
function Cu(...r) {
}
var je = Object.freeze({
  x: 0,
  y: 0
});
function z0(r, i) {
  return Math.sqrt(Math.pow(r.x - i.x, 2) + Math.pow(r.y - i.y, 2));
}
function L0(r, i) {
  const u = Au(r);
  if (!u)
    return "0 0";
  const s = {
    x: (u.x - i.left) / i.width * 100,
    y: (u.y - i.top) / i.height * 100
  };
  return `${s.x}% ${s.y}%`;
}
function k0({ data: { value: r } }, { data: { value: i } }) {
  return r - i;
}
function M0({ data: { value: r } }, { data: { value: i } }) {
  return i - r;
}
function ql({ left: r, top: i, height: u, width: s }) {
  return [
    {
      x: r,
      y: i
    },
    {
      x: r + s,
      y: i
    },
    {
      x: r,
      y: i + u
    },
    {
      x: r + s,
      y: i + u
    }
  ];
}
function ic(r, i) {
  if (!r || r.length === 0)
    return null;
  const [u] = r;
  return i ? u[i] : u;
}
var B0 = ({
  collisionRect: r,
  droppableRects: i,
  droppableContainers: u
}) => {
  const s = ql(r), v = [];
  for (const d of u) {
    const { id: y } = d, b = i.get(y);
    if (b) {
      const D = ql(b), _ = s.reduce((x, j, B) => x + z0(D[B], j), 0), S = Number((_ / 4).toFixed(4));
      v.push({
        id: y,
        data: { droppableContainer: d, value: S }
      });
    }
  }
  return v.sort(k0);
};
function $0(r, i) {
  const u = Math.max(i.top, r.top), s = Math.max(i.left, r.left), v = Math.min(i.left + i.width, r.left + r.width), d = Math.min(i.top + i.height, r.top + r.height), y = v - s, b = d - u;
  if (s < v && u < d) {
    const D = i.width * i.height, _ = r.width * r.height, S = y * b, x = S / (D + _ - S);
    return Number(x.toFixed(4));
  }
  return 0;
}
var F0 = ({
  collisionRect: r,
  droppableRects: i,
  droppableContainers: u
}) => {
  const s = [];
  for (const v of u) {
    const { id: d } = v, y = i.get(d);
    if (y) {
      const b = $0(y, r);
      b > 0 && s.push({
        id: d,
        data: { droppableContainer: v, value: b }
      });
    }
  }
  return s.sort(M0);
};
function W0(r, i, u) {
  return {
    ...r,
    scaleX: i && u ? i.width / u.width : 1,
    scaleY: i && u ? i.height / u.height : 1
  };
}
function oc(r, i) {
  return r && i ? {
    x: r.left - i.left,
    y: r.top - i.top
  } : je;
}
function U0(r) {
  return function(i, ...u) {
    return u.reduce(
      (s, v) => ({
        ...s,
        top: s.top + r * v.y,
        bottom: s.bottom + r * v.y,
        left: s.left + r * v.x,
        right: s.right + r * v.x
      }),
      { ...i }
    );
  };
}
var P0 = U0(1);
function lc(r) {
  if (r.startsWith("matrix3d(")) {
    const i = r.slice(9, -1).split(/, /);
    return {
      x: +i[12],
      y: +i[13],
      scaleX: +i[0],
      scaleY: +i[5]
    };
  } else if (r.startsWith("matrix(")) {
    const i = r.slice(7, -1).split(/, /);
    return {
      x: +i[4],
      y: +i[5],
      scaleX: +i[0],
      scaleY: +i[3]
    };
  }
  return null;
}
function Y0(r, i, u) {
  const s = lc(i);
  if (!s)
    return r;
  const { scaleX: v, scaleY: d, x: y, y: b } = s, D = r.left - y - (1 - v) * parseFloat(u), _ = r.top - b - (1 - d) * parseFloat(u.slice(u.indexOf(" ") + 1)), S = v ? r.width / v : r.width, x = d ? r.height / d : r.height;
  return {
    width: S,
    height: x,
    top: _,
    right: D + S,
    bottom: _ + x,
    left: D
  };
}
var V0 = { ignoreTransform: false };
function Qn(r, i = V0) {
  let u = r.getBoundingClientRect();
  if (i.ignoreTransform) {
    const { getComputedStyle: _ } = Vt(r), { transform: S, transformOrigin: x } = _(r);
    S && (u = Y0(u, S, x));
  }
  const { top: s, left: v, width: d, height: y, bottom: b, right: D } = u;
  return {
    top: s,
    left: v,
    width: d,
    height: y,
    bottom: b,
    right: D
  };
}
function Kl(r) {
  return Qn(r, { ignoreTransform: true });
}
function X0(r) {
  const i = r.innerWidth, u = r.innerHeight;
  return {
    top: 0,
    left: 0,
    right: i,
    bottom: u,
    width: i,
    height: u
  };
}
function q0(r, i = Vt(r).getComputedStyle(r)) {
  return i.position === "fixed";
}
function K0(r, i = Vt(r).getComputedStyle(
  r
)) {
  const u = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((s) => {
    const v = i[s];
    return typeof v == "string" ? u.test(v) : false;
  });
}
function Nu(r, i) {
  const u = [];
  function s(v) {
    if (i != null && u.length >= i || !v)
      return u;
    if (ai(v) && v.scrollingElement != null && !u.includes(v.scrollingElement))
      return u.push(v.scrollingElement), u;
    if (!Or(v) || y0(v) || u.includes(v))
      return u;
    const { getComputedStyle: d } = Vt(v), y = d(v);
    return v !== r && K0(v, y) && u.push(v), q0(v, y) ? u : s(v.parentNode);
  }
  return r ? s(r) : u;
}
function cc(r) {
  const [i] = Nu(r, 1);
  return i ?? null;
}
function Ka(r) {
  return !ri || !r ? null : Hn(r) ? r : ui(r) ? ai(r) || r === Zn(r).scrollingElement ? window : Or(r) ? r : null : null;
}
function sc(r) {
  return Hn(r) ? r.scrollX : r.scrollLeft;
}
function fc(r) {
  return Hn(r) ? r.scrollY : r.scrollTop;
}
function ei(r) {
  return {
    x: sc(r),
    y: fc(r)
  };
}
var Lt = ((r) => (r[r.Forward = 1] = "Forward", r[r.Backward = -1] = "Backward", r))(Lt || {});
function vc(r) {
  return !ri || !r ? false : r === document.scrollingElement;
}
function dc(r) {
  const i = {
    x: 0,
    y: 0
  }, u = vc(r) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: r.clientHeight,
    width: r.clientWidth
  }, s = {
    x: r.scrollWidth - u.width,
    y: r.scrollHeight - u.height
  }, v = r.scrollTop <= i.y, d = r.scrollLeft <= i.x, y = r.scrollTop >= s.y, b = r.scrollLeft >= s.x;
  return {
    isTop: v,
    isLeft: d,
    isBottom: y,
    isRight: b,
    maxScroll: s,
    minScroll: i
  };
}
var G0 = {
  x: 0.2,
  y: 0.2
};
function H0(r, i, { top: u, left: s, right: v, bottom: d }, y = 10, b = G0) {
  const { isTop: D, isBottom: _, isLeft: S, isRight: x } = dc(r), j = {
    x: 0,
    y: 0
  }, B = {
    x: 0,
    y: 0
  }, L = {
    height: i.height * b.y,
    width: i.width * b.x
  };
  return !D && u <= i.top + L.height ? (j.y = Lt.Backward, B.y = y * Math.abs(
    (i.top + L.height - u) / L.height
  )) : !_ && d >= i.bottom - L.height && (j.y = Lt.Forward, B.y = y * Math.abs(
    (i.bottom - L.height - d) / L.height
  )), !x && v >= i.right - L.width ? (j.x = Lt.Forward, B.x = y * Math.abs(
    (i.right - L.width - v) / L.width
  )) : !S && s <= i.left + L.width && (j.x = Lt.Backward, B.x = y * Math.abs(
    (i.left + L.width - s) / L.width
  )), {
    direction: j,
    speed: B
  };
}
function Z0(r) {
  if (r === document.scrollingElement) {
    const { innerWidth: d, innerHeight: y } = window;
    return {
      top: 0,
      left: 0,
      right: d,
      bottom: y,
      width: d,
      height: y
    };
  }
  const { top: i, left: u, right: s, bottom: v } = r.getBoundingClientRect();
  return {
    top: i,
    left: u,
    right: s,
    bottom: v,
    width: r.clientWidth,
    height: r.clientHeight
  };
}
function hc(r) {
  return r.reduce((i, u) => qn(i, ei(u)), je);
}
function Q0(r) {
  return r.reduce((i, u) => i + sc(u), 0);
}
function J0(r) {
  return r.reduce((i, u) => i + fc(u), 0);
}
function pc(r, i = Qn) {
  if (!r)
    return;
  const { top: u, left: s, bottom: v, right: d } = i(r);
  cc(r) && (v <= 0 || d <= 0 || u >= window.innerHeight || s >= window.innerWidth) && r.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
var ty = [
  ["x", ["left", "right"], Q0],
  ["y", ["top", "bottom"], J0]
];
var li = class {
  constructor(i, u) {
    ht(this, "rect"), ht(this, "width"), ht(this, "height"), ht(this, "top"), ht(this, "bottom"), ht(this, "right"), ht(this, "left");
    const s = Nu(u), v = hc(s);
    this.rect = { ...i }, this.width = i.width, this.height = i.height;
    for (const [d, y, b] of ty)
      for (const D of y)
        Object.defineProperty(this, D, {
          get: () => {
            const _ = b(s), S = v[d] - _;
            return this.rect[D] + S;
          },
          enumerable: true
        });
    Object.defineProperty(this, "rect", { enumerable: false });
  }
};
function gc(r, i, u) {
  const s = ref(i);
  return u && (s.value = u()), [s, (v) => {
    s.value = r(s.value, v);
  }];
}
var Rr = class {
  constructor(i) {
    ht(this, "listeners", []), ht(this, "removeAll", () => {
      this.listeners.forEach(
        (u) => {
          var s;
          return (s = this.target) == null ? void 0 : s.removeEventListener(...u);
        }
      );
    }), this.target = i;
  }
  add(i, u, s) {
    var v;
    (v = this.target) == null || v.addEventListener(i, u, s), this.listeners.push([i, u, s]);
  }
};
function ey(r) {
  const { EventTarget: i } = Vt(r);
  return r instanceof i ? r : Zn(r);
}
function Ga(r, i) {
  const u = Math.abs(r.x), s = Math.abs(r.y);
  return typeof i == "number" ? Math.sqrt(u ** 2 + s ** 2) > i : "x" in i && "y" in i ? u > i.x && s > i.y : "x" in i ? u > i.x : "y" in i ? s > i.y : false;
}
var Ie = ((r) => (r.Click = "click", r.DragStart = "dragstart", r.Keydown = "keydown", r.ContextMenu = "contextmenu", r.Resize = "resize", r.SelectionChange = "selectionchange", r.VisibilityChange = "visibilitychange", r))(Ie || {});
function Gl(r) {
  r.preventDefault();
}
function ny(r) {
  r.stopPropagation();
}
var et = ((r) => (r.Space = "Space", r.Down = "ArrowDown", r.Right = "ArrowRight", r.Left = "ArrowLeft", r.Up = "ArrowUp", r.Esc = "Escape", r.Enter = "Enter", r))(et || {});
var yc = {
  start: [et.Space, et.Enter],
  cancel: [et.Esc],
  end: [et.Space, et.Enter]
};
var ry = (r, { currentCoordinates: i }) => {
  switch (r.code) {
    case et.Right:
      return {
        ...i,
        x: i.x + 25
      };
    case et.Left:
      return {
        ...i,
        x: i.x - 25
      };
    case et.Down:
      return {
        ...i,
        y: i.y + 25
      };
    case et.Up:
      return {
        ...i,
        y: i.y - 25
      };
  }
};
var mc = class {
  constructor(i) {
    ht(this, "autoScrollEnabled", false), ht(this, "referenceCoordinates"), ht(this, "listeners"), ht(this, "windowListeners"), this.props = i;
    const {
      event: { target: u }
    } = i;
    this.props = i, this.listeners = new Rr(Zn(u)), this.windowListeners = new Rr(Vt(u)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(Ie.Resize, this.handleCancel), this.windowListeners.add(Ie.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(Ie.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const { activeNode: i, onStart: u } = this.props, s = i.node.current;
    s && pc(s), u(je);
  }
  handleKeyDown(i) {
    if (ii(i)) {
      const { active: u, context: s, options: v } = this.props, {
        keyboardCodes: d = yc,
        coordinateGetter: y = ry,
        scrollBehavior: b = "smooth"
      } = v, { code: D } = i;
      if (d.end.includes(D)) {
        this.handleEnd(i);
        return;
      }
      if (d.cancel.includes(D)) {
        this.handleCancel(i);
        return;
      }
      const { collisionRect: _ } = s.current, S = _ ? { x: _.left, y: _.top } : je;
      this.referenceCoordinates || (this.referenceCoordinates = S);
      const x = y(i, {
        active: u,
        context: s.current,
        currentCoordinates: S
      });
      if (x) {
        const j = Du(
          x,
          S
        ), B = {
          x: 0,
          y: 0
        }, { scrollableAncestors: L } = s.current;
        for (const U of L) {
          const N = i.code, { isTop: Q, isRight: it, isLeft: lt, isBottom: rt, maxScroll: k, minScroll: vt } = dc(U), $ = Z0(U), ct = {
            x: Math.min(
              N === et.Right ? $.right - $.width / 2 : $.right,
              Math.max(
                N === et.Right ? $.left : $.left + $.width / 2,
                x.x
              )
            ),
            y: Math.min(
              N === et.Down ? $.bottom - $.height / 2 : $.bottom,
              Math.max(
                N === et.Down ? $.top : $.top + $.height / 2,
                x.y
              )
            )
          }, ot = N === et.Right && !it || N === et.Left && !lt, ee = N === et.Down && !rt || N === et.Up && !Q;
          if (ot && ct.x !== x.x) {
            const wt = U.scrollLeft + j.x, Dt = N === et.Right && wt <= k.x || N === et.Left && wt >= vt.x;
            if (Dt && !j.y) {
              U.scrollTo({
                left: wt,
                behavior: b
              });
              return;
            }
            Dt ? B.x = U.scrollLeft - wt : B.x = N === et.Right ? U.scrollLeft - k.x : U.scrollLeft - vt.x, B.x && U.scrollBy({
              left: -B.x,
              behavior: b
            });
            break;
          } else if (ee && ct.y !== x.y) {
            const wt = U.scrollTop + j.y, Dt = N === et.Down && wt <= k.y || N === et.Up && wt >= vt.y;
            if (Dt && !j.x) {
              U.scrollTo({
                top: wt,
                behavior: b
              });
              return;
            }
            Dt ? B.y = U.scrollTop - wt : B.y = N === et.Down ? U.scrollTop - k.y : U.scrollTop - vt.y, B.y && U.scrollBy({
              top: -B.y,
              behavior: b
            });
            break;
          }
        }
        this.handleMove(
          i,
          qn(
            Du(x, this.referenceCoordinates),
            B
          )
        );
      }
    }
  }
  handleMove(i, u) {
    const { onMove: s } = this.props;
    i.preventDefault(), s(u);
  }
  handleEnd(i) {
    const { onEnd: u } = this.props;
    i.preventDefault(), this.detach(), u();
  }
  handleCancel(i) {
    const { onCancel: u } = this.props;
    i.preventDefault(), this.detach(), u();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
};
ht(mc, "activators", [
  {
    eventName: "onKeydown",
    handler: (r, { keyboardCodes: i = yc, onActivation: u }, { active: s }) => {
      const { code: v } = r;
      if (i.start.includes(v)) {
        const d = s.activatorNode.current;
        return d && r.target !== d ? false : (r.preventDefault(), u == null || u({ event: r }), true);
      }
      return false;
    }
  }
]);
function Hl(r) {
  return Boolean(r && "distance" in r);
}
function Zl(r) {
  return Boolean(r && "delay" in r);
}
var ci = class {
  constructor(i, u, s = ey(i.event.target)) {
    ht(this, "autoScrollEnabled", true), ht(this, "document"), ht(this, "activated", false), ht(this, "initialCoordinates"), ht(this, "timeoutId"), ht(this, "listeners"), ht(this, "documentListeners"), ht(this, "windowListeners"), this.props = i, this.events = u;
    const { event: v } = i, { target: d } = v;
    this.props = i, this.events = u, this.document = Zn(d), this.documentListeners = new Rr(this.document), this.listeners = new Rr(s), this.windowListeners = new Rr(Vt(d)), this.initialCoordinates = Au(v) ?? je, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: i,
      props: {
        options: { activationConstraint: u }
      }
    } = this;
    if (this.listeners.add(i.move.name, this.handleMove, { passive: false }), this.listeners.add(i.end.name, this.handleEnd), this.windowListeners.add(Ie.Resize, this.handleCancel), this.windowListeners.add(Ie.DragStart, Gl), this.windowListeners.add(Ie.VisibilityChange, this.handleCancel), this.windowListeners.add(Ie.ContextMenu, Gl), this.documentListeners.add(Ie.Keydown, this.handleKeydown), u) {
      if (Hl(u))
        return;
      if (Zl(u)) {
        this.timeoutId = setTimeout(
          this.handleStart,
          u.delay
        );
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handleStart() {
    const { initialCoordinates: i } = this, { onStart: u } = this.props;
    i && (this.activated = true, this.documentListeners.add(Ie.Click, ny, {
      capture: true
    }), this.removeTextSelection(), this.documentListeners.add(
      Ie.SelectionChange,
      this.removeTextSelection
    ), u(i));
  }
  handleMove(i) {
    const { activated: u, initialCoordinates: s, props: v } = this, {
      onMove: d,
      options: { activationConstraint: y }
    } = v;
    if (!s)
      return;
    const b = Au(i) ?? je, D = Du(s, b);
    if (!u && y) {
      if (Zl(y))
        return Ga(D, y.tolerance) ? this.handleCancel() : void 0;
      if (Hl(y))
        return y.tolerance != null && Ga(D, y.tolerance) ? this.handleCancel() : Ga(D, y.distance) ? this.handleStart() : void 0;
    }
    i.cancelable && i.preventDefault(), d(b);
  }
  handleEnd() {
    const { onEnd: i } = this.props;
    this.detach(), i();
  }
  handleCancel() {
    const { onCancel: i } = this.props;
    this.detach(), i();
  }
  handleKeydown(i) {
    i.code === et.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var i;
    (i = this.document.getSelection()) == null || i.removeAllRanges();
  }
};
var uy = {
  move: { name: "pointermove" },
  end: { name: "pointerup" }
};
var bc = class extends ci {
  constructor(i) {
    const { event: u } = i, s = Zn(u.target);
    super(i, uy, s);
  }
};
ht(bc, "activators", [
  {
    eventName: "onPointerdown",
    handler: (r, { onActivation: i }) => !r.isPrimary || r.button !== 0 ? false : (i == null || i({ event: r }), true)
  }
]);
var ay = {
  move: { name: "mousemove" },
  end: { name: "mouseup" }
};
var iy = class extends ci {
  constructor(i) {
    super(i, ay, Zn(i.event.target));
  }
};
ht(iy, "activators", [
  {
    eventName: "onMousedown",
    handler: (r, { onActivation: i }) => r.button === 2 ? false : (i == null || i({ event: r }), true)
  }
]);
var Ha = {
  move: { name: "touchmove" },
  end: { name: "touchend" }
};
var oy = class extends ci {
  constructor(i) {
    super(i, Ha);
  }
  static setup() {
    return window.addEventListener(Ha.move.name, i, {
      capture: false,
      passive: false
    }), function() {
      window.removeEventListener(Ha.move.name, i);
    };
    function i() {
    }
  }
};
ht(oy, "activators", [
  {
    eventName: "onTouchstart",
    handler: (r, { onActivation: i }) => {
      const { touches: u } = r;
      return u.length > 1 ? false : (i == null || i({ event: r }), true);
    }
  }
]);
function ly({
  acceleration: r,
  activator: i = 0,
  canScroll: u,
  draggingRect: s,
  enabled: v,
  interval: d = 5,
  order: y = 0,
  pointerCoordinates: b,
  scrollableAncestors: D,
  scrollableAncestorRects: _,
  delta: S,
  threshold: x
}) {
  const j = sy({ delta: S, disabled: !v }), [B, L] = m0(), U = ref({ x: 0, y: 0 }), N = ref({ x: 0, y: 0 }), Q = computed(() => {
    switch (i) {
      case 0:
        return b ? {
          top: b.y,
          bottom: b.y,
          left: b.x,
          right: b.x
        } : null;
      case 1:
        return s;
    }
  }), it = ref(null), lt = () => {
    const k = it.value;
    if (!k)
      return;
    const vt = U.value.x * N.value.x, $ = U.value.y * N.value.y;
    k.scrollBy(vt, $);
  }, rt = computed(
    () => y === 0 ? [...D].reverse() : D
  );
  watchEffect(
    () => {
      if (!v || !D.length || !Q) {
        L();
        return;
      }
      for (const k of rt.value) {
        if ((u == null ? void 0 : u(k)) === false)
          continue;
        const vt = D.indexOf(k), $ = _[vt];
        if (!$)
          continue;
        const { direction: ct, speed: ot } = H0(
          k,
          $,
          Q.value,
          r,
          x
        );
        for (const ee of ["x", "y"])
          j.value[ee][ct[ee]] || (ot[ee] = 0, ct[ee] = 0);
        if (ot.x > 0 || ot.y > 0) {
          L(), it.value = k, B(lt, d), U.value = ot, N.value = ct;
          return;
        }
      }
      U.value = { x: 0, y: 0 }, N.value = { x: 0, y: 0 }, L();
    }
  );
}
var cy = {
  x: { [Lt.Backward]: false, [Lt.Forward]: false },
  y: { [Lt.Backward]: false, [Lt.Forward]: false }
};
function sy({
  delta: r,
  disabled: i
}) {
  const u = ti(r);
  return uc(
    (s) => {
      if (i || !u.value || !s)
        return cy;
      const v = {
        x: Math.sign(r.x - u.value.x),
        y: Math.sign(r.y - u.value.y)
      };
      return {
        x: {
          [Lt.Backward]: s.x[Lt.Backward] || v.x === -1,
          [Lt.Forward]: s.x[Lt.Forward] || v.x === 1
        },
        y: {
          [Lt.Backward]: s.y[Lt.Backward] || v.y === -1,
          [Lt.Forward]: s.y[Lt.Forward] || v.y === 1
        }
      };
    }
  );
}
function fy(r, i) {
  const u = ref();
  return computed(
    () => {
      const s = i.value !== null ? r.value.get(i.value) : void 0, v = s ? s.node : null, d = () => i === null ? null : v ?? u.value ?? null;
      return u.value = d(), d();
    }
  );
}
function vy(r, i) {
  return computed(
    () => r.reduce((u, s) => {
      const { sensor: v } = s, d = v.activators.map((y) => ({
        eventName: y.eventName,
        handler: i.value(y.handler, s)
      }));
      return [...u, ...d];
    }, [])
  );
}
var _c = ((r) => (r[r.Always = 0] = "Always", r[r.BeforeDragging = 1] = "BeforeDragging", r[r.WhileDragging = 2] = "WhileDragging", r))(_c || {});
var wc = ((r) => (r.Optimized = "optimized", r))(wc || {});
var Ql = /* @__PURE__ */ new Map();
function dy(r, i) {
  const u = ref(null), s = computed(() => u.value != null), v = ref(r.value), d = computed(x), y = Ar(d), b = computed(() => (j = []) => {
    y.value || (u.value = u.value ? u.value.concat(j) : j);
  }), D = shallowRef(null), _ = ref(), S = computed(() => {
    if (d.value && !i.value.dragging)
      return Ql;
    const j = u.value;
    if (!_ || _.value === Ql || v.value !== r.value || j != null) {
      const B = /* @__PURE__ */ new Map();
      for (let L of r.value) {
        if (!L)
          continue;
        if (j && j.length > 0 && !j.includes(L.id) && L.rect) {
          B.set(L.id, L.rect);
          continue;
        }
        const U = L.node, N = U ? new li(i.value.config.measure(U), U) : null;
        L.rect = N, N && B.set(L.id, N);
      }
      return _.value = B, B;
    }
    return _.value;
  });
  return watchEffect(() => {
    v.value = r.value;
  }), watch([() => i.value.dragging, () => d.value], () => {
    d.value || requestAnimationFrame(() => b.value());
  }, { immediate: true }), watchEffect(() => {
    s.value && (u.value = null);
  }), watch([
    () => i.value.config.frequency,
    d,
    b,
    () => i.value.dependencies
  ], () => {
    d.value || typeof i.value.config.frequency != "number" || D.value !== null || (D.value = setTimeout(() => {
      b.value(), D.value = null;
    }, i.value.config.frequency));
  }, { deep: true, immediate: true }), {
    droppableRects: S,
    measureDroppableContainers: b,
    measuringScheduled: s
  };
  function x() {
    switch (i.value.config.strategy) {
      case 0:
        return false;
      case 1:
        return i.value.dragging;
      default:
        return !i.value.dragging;
    }
  }
}
function si(r, i) {
  const u = ref();
  return computed(() => {
    function s() {
      return r != null && r.value ? u.value ? u.value : typeof i == "function" ? i(r.value) : r.value : null;
    }
    return s();
  });
}
function hy(r, i) {
  return si(r, i);
}
function py({ callback: r, disabled: i }) {
  const u = ni(r), s = computed(() => {
    if (i || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const { MutationObserver: v } = window;
    return new v(u.value);
  });
  return watch(() => s.value, () => () => {
    var v;
    return (v = s.value) == null ? void 0 : v.disconnect();
  }, { immediate: true }), s;
}
function Tu({ callback: r, disabled: i }) {
  const u = ni(r), s = shallowRef();
  return watch(() => i, () => {
    if (i || typeof window > "u" || typeof window.ResizeObserver > "u")
      return;
    const { ResizeObserver: v } = window;
    return new v(u.value);
  }, { immediate: true }), onUnmounted(() => () => {
    var v;
    return (v = s.value) == null ? void 0 : v.disconnect();
  }), s;
}
function gy(r) {
  return new li(Qn(r), r);
}
function Jl(r, i = computed(() => gy), u) {
  const s = ref(null), v = py({
    callback(b) {
      if (r.value)
        for (const D of b) {
          const { type: _, target: S } = D;
          if (_ === "childList" && S instanceof HTMLElement && S.contains(r.value)) {
            y(s.value);
            break;
          }
        }
    }
  }), d = Tu({ callback: () => {
    y(s.value);
  } });
  return watch([r, i, () => u == null ? void 0 : u.value], () => {
    var b, D, _, S;
    y(s.value), r && r.value ? ((b = d.value) == null || b.observe(r.value), (D = v.value) == null || D.observe(document.body, {
      childList: true,
      subtree: true
    })) : ((_ = d.value) == null || _.disconnect(), (S = v.value) == null || S.disconnect());
  }, { immediate: true }), s;
  function y(b) {
    if (!(r != null && r.value))
      return null;
    if (r.value.isConnected === false)
      return b ?? (u == null ? void 0 : u.value) ?? null;
    const D = i.value(r.value);
    JSON.stringify(b) !== JSON.stringify(D) && (s.value = D);
  }
}
function yy(r) {
  const i = si(r);
  return oc(r.value, i.value);
}
var tc = [];
function my(r) {
  const i = ref(r), u = uc(
    (s) => r ? s && s !== tc && r && i.value && r.parentNode === i.value.parentNode ? s : Nu(r) : tc
  );
  return watchEffect(() => {
    i.value = r;
  }), u;
}
function by(r) {
  const i = ref(null), u = shallowRef(r.value), s = shallowRef((v) => {
    const d = Ka(v.target);
    if (d) {
      if (!i.value)
        return null;
      i.value.set(
        d,
        ei(d)
      ), i.value = new Map(i.value);
    }
  });
  return watch([() => s.value, () => r.value], (v, d, y) => {
    const b = u.value;
    if (r.value !== b) {
      D(b);
      const _ = r.value.map((S) => {
        const x = Ka(S);
        return x ? (x.addEventListener("scroll", s.value, {
          passive: true
        }), [
          x,
          ei(x)
        ]) : null;
      }).filter(
        (S) => S != null
      );
      i.value = _.length ? new Map(_) : null, u.value = r.value;
    }
    y(() => {
      D(r.value), D(b);
    });
    function D(_) {
      _.forEach((S) => {
        const x = Ka(S);
        x == null || x.removeEventListener("scroll", s.value);
      });
    }
  }, { immediate: true }), computed(() => r.value.length ? i.value ? Array.from(i.value.values()).reduce(
    (v, d) => qn(v, d),
    je
  ) : hc(r.value) : je);
}
function ec(r, i = []) {
  const u = shallowRef(null);
  return watch(i, () => {
    u.value = null;
  }, { immediate: true }), watch(i, () => {
    const s = r.value !== je;
    s && !u.value && (u.value = r.value), !s && u.value && (u.value = null);
  }, { immediate: true }), computed(() => u.value ? Du(r.value, u.value) : je);
}
function _y(r) {
  watchEffect(
    () => {
      if (!ri)
        return;
      const i = r.map(({ sensor: u }) => {
        var s;
        return (s = u.setup) == null ? void 0 : s.call(u);
      });
      return () => {
        for (const u of i)
          u == null || u();
      };
    }
  );
}
function wy(r, i) {
  return computed(() => r.reduce(
    (u, { eventName: s, handler: v }) => (u[s] = (d) => {
      v(d, i.value);
    }, u),
    {}
  ));
}
function xc(r) {
  return computed(() => r != null && r.value ? X0(r.value) : null);
}
var Za = [];
function xy(r, i = Qn) {
  const u = computed(() => {
    const [D] = r.value;
    return D ? Vt(D) : null;
  }), s = xc(
    u
  ), [v, d] = gc(b, Za), y = Tu({ callback: d });
  return watch([() => r.value], () => {
    var D;
    r.value.length > 0 && v.value === Za && d(), r.value.length ? r.value.forEach((_) => {
      var S;
      return (S = y.value) == null ? void 0 : S.observe(_);
    }) : ((D = y.value) == null || D.disconnect(), d());
  }, { immediate: true }), v.value;
  function b() {
    return r.value.length ? r.value.map(
      (D) => vc(D) ? s.value : new li(i(D), D)
    ) : Za;
  }
}
function Sc(r) {
  if (!r)
    return null;
  if (r.children.length > 1)
    return r;
  const i = r.children[0];
  return Or(i) ? i : r;
}
function Sy({
  measure: r
}) {
  const i = ref(null), u = Tu({ callback: (y) => {
    for (const { target: b } of y)
      if (Or(b)) {
        const D = r(b);
        i.value = i.value ? { ...i.value, width: D.width, height: D.height } : D;
        break;
      }
  } }), s = (y) => {
    var b, D;
    const _ = Sc(y);
    (b = u.value) == null || b.disconnect(), _ && ((D = u.value) == null || D.observe(_)), i.value = _ ? r(_) : null;
  }, [v, d] = Ru(s);
  return computed(
    () => ({
      nodeRef: v,
      rect: i,
      setRef: d
    })
  );
}
var Ry = [
  { sensor: bc, options: {} },
  { sensor: mc, options: {} }
];
var Dy = { current: {} };
var Su = {
  draggable: {
    measure: Kl
  },
  droppable: {
    measure: Kl,
    strategy: _c.WhileDragging,
    frequency: wc.Optimized
  },
  dragOverlay: {
    measure: Qn
  }
};
var Dr = class extends Map {
  get(i) {
    return i != null ? super.get(i) ?? void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter(({ disabled: i }) => !i);
  }
  getNodeFor(i) {
    var u;
    return ((u = this.get(i)) == null ? void 0 : u.node.current) ?? void 0;
  }
};
var fi = defineComponent((r, {
  slots: i
}) => {
  const u = ref(r.value);
  return watch(() => r.value, () => {
    u.value = r.value;
  }, {
    deep: true
  }), provide("InternalContext", u), () => i.default ? i.default(u.value) : null;
});
fi.props = {
  value: Object
};
fi.name = "InternalContextProvider";
var Rc = defineComponent((r, {
  slots: i
}) => {
  const u = ref(r.value);
  return watch(() => r.value, () => {
    u.value = r.value;
  }, {
    deep: true
  }), provide("PublicContext", u), () => i.default ? i.default(u.value) : null;
});
Rc.props = {
  value: Object
};
var Ay = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: new Dr(),
  over: null,
  dragOverlay: {
    nodeRef: ref(null),
    rect: ref(null),
    setRef: Cu
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Su,
  measureDroppableContainers: Cu,
  windowRect: null,
  measuringScheduled: false
};
var vi = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Cu,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Cu
};
var Dc = {
  Provider: fi
};
var Cy = {
  Provider: Rc
};
function Iy() {
  return {
    draggable: {
      active: null,
      initialCoordinates: { x: 0, y: 0 },
      nodes: /* @__PURE__ */ new Map(),
      translate: { x: 0, y: 0 }
    },
    droppable: {
      containers: new Dr()
    }
  };
}
function Oy(r, i) {
  switch (i.type) {
    case It.DragStart:
      return {
        ...r,
        draggable: {
          ...r.draggable,
          initialCoordinates: i.initialCoordinates,
          active: i.active
        }
      };
    case It.DragMove:
      return r.draggable.active ? {
        ...r,
        draggable: {
          ...r.draggable,
          translate: {
            x: i.coordinates.x - r.draggable.initialCoordinates.x,
            y: i.coordinates.y - r.draggable.initialCoordinates.y
          }
        }
      } : r;
    case It.DragEnd:
    case It.DragCancel:
      return {
        ...r,
        draggable: {
          ...r.draggable,
          active: null,
          initialCoordinates: { x: 0, y: 0 },
          translate: { x: 0, y: 0 }
        }
      };
    case It.RegisterDroppable: {
      const { element: u } = i, { id: s } = u, v = new Dr(r.droppable.containers);
      return v.set(s, u), {
        ...r,
        droppable: {
          ...r.droppable,
          containers: v
        }
      };
    }
    case It.SetDroppableDisabled: {
      const { id: u, key: s, disabled: v } = i, d = r.droppable.containers.get(u);
      if (!d || s !== d.key)
        return r;
      const y = new Dr(r.droppable.containers);
      return y.set(u, {
        ...d,
        disabled: v
      }), {
        ...r,
        droppable: {
          ...r.droppable,
          containers: y
        }
      };
    }
    case It.UnregisterDroppable: {
      const { id: u, key: s } = i, v = r.droppable.containers.get(u);
      if (!v || s !== v.key)
        return r;
      const d = new Dr(r.droppable.containers);
      return d.delete(u), {
        ...r,
        droppable: {
          ...r.droppable,
          containers: d
        }
      };
    }
    default:
      return r;
  }
}
function jy({
  disabled: r
}) {
  const {
    active: i,
    activatorEvent: u,
    draggableNodes: s
  } = inject("InternalContext", ref(vi)).value, v = ti(u), d = ti(i == null ? void 0 : i.id);
  return watchEffect(() => {
    if (!r && !u && v.value && d.value != null) {
      if (!ii(v.value) || document.activeElement === v.value.target)
        return;
      const y = s.get(d.value);
      if (!y)
        return;
      const {
        activatorNode: b,
        node: D
      } = y;
      if (!b.current && !D.current)
        return;
      requestAnimationFrame(() => {
        for (const _ of [b.current, D.current]) {
          if (!_)
            continue;
          const S = w0(_);
          if (S) {
            S.focus();
            break;
          }
        }
      });
    }
  }), null;
}
function Ac(r, { transform: i, ...u }) {
  return r != null && r.length ? r.reduce((s, v) => v({
    transform: s,
    ...u
  }), i) : i;
}
function Ey(r) {
  return computed(
    () => ({
      draggable: {
        ...Su.draggable,
        ...r == null ? void 0 : r.draggable
      },
      droppable: {
        ...Su.droppable,
        ...r == null ? void 0 : r.droppable
      },
      dragOverlay: {
        ...Su.dragOverlay,
        ...r == null ? void 0 : r.dragOverlay
      }
    })
  );
}
function Ny({
  activeNode: r,
  measure: i,
  initialRect: u,
  config: s = true
}) {
  const v = ref(false), { x: d, y } = typeof s == "boolean" ? { x: s, y: s } : s;
  watchEffect(() => {
    if (!d && !y || !r) {
      v.value = false;
      return;
    }
    if (v.value || !u)
      return;
    const b = r == null ? void 0 : r.node.current;
    if (!b || b.isConnected === false)
      return;
    const D = i(b), _ = oc(D, u);
    if (d || (_.x = 0), y || (_.y = 0), v.value = true, Math.abs(_.x) > 0 || Math.abs(_.y) > 0) {
      const S = cc(b);
      S && S.scrollBy({
        top: _.y,
        left: _.x
      });
    }
  });
}
var Cc = defineComponent((r, {
  slots: i
}) => {
  const u = ref(r.value);
  return watch(() => r.value, () => {
    u.value = r.value;
  }, {
    deep: true
  }), provide("DndContext", u), () => i.default ? i.default(u.value) : null;
});
Cc.props = {
  value: Object
};
var Ic = {
  Provider: Cc
};
var vn;
(function(r) {
  r[r.Uninitialized = 0] = "Uninitialized", r[r.Initializing = 1] = "Initializing", r[r.Initialized = 2] = "Initialized";
})(vn || (vn = {}));
var Ty = {
  id: String,
  accessibility: Object,
  autoScroll: [Object, Array, Boolean],
  cancelDrop: [Object, Array],
  collisionDetection: [Object, Array, Function],
  measuring: [Object, Array],
  modifiers: [Object, Array],
  sensors: Object,
  onDragStart: Function,
  onDragMove: Function,
  onDragOver: Function,
  onDragEnd: Function,
  onDragCancel: Function
};
var Oc = defineComponent((r) => {
  const {
    id: i,
    accessibility: u,
    autoScroll: s = true,
    sensors: v = Ry,
    collisionDetection: d = F0,
    measuring: y,
    modifiers: b,
    ...D
  } = r, _ = gc(Oy, void 0, Iy), [S, x] = _, [j, B] = O0(), L = ref(vn.Uninitialized), U = computed(() => L.value === vn.Initialized), N = Kn(() => S.value.draggable.active, [() => S.value.draggable.active]), Q = Kn(() => S.value.draggable.nodes, [() => S.value.draggable.nodes]), it = Kn(() => S.value.droppable.containers, [() => S.value.droppable.containers]), lt = computed(() => N.value ? Q.value.get(N.value) : null), rt = ref({
    initial: null,
    translated: null
  }), k = ref(null);
  function vt() {
    var q;
    return S.value.draggable.active != null ? {
      id: S.value.draggable.active,
      data: ((q = lt.value) == null ? void 0 : q.data) ?? Dy,
      rect: rt.value
    } : null;
  }
  watch([N, lt], () => {
    k.value = vt();
  }, {
    immediate: true
  });
  const $ = ref(null), ct = ref(null), ot = ref(null);
  function ee(q) {
    ot.value = q;
  }
  const wt = Ar(computed(() => D)), Dt = Eu("DndDescribedBy", i), dn = computed(() => S.value.droppable.containers.getEnabled()), ve = Ey(y), Jn = computed(() => ({
    dragging: U.value,
    dependencies: [S.value.draggable.translate.x, S.value.draggable.translate.y],
    config: ve.value.droppable
  })), {
    droppableRects: Fe,
    measureDroppableContainers: Ot,
    measuringScheduled: jt
  } = dy(dn, Jn), tt = fy(Q, N), Ee = computed(() => ot.value ? Au(ot.value) : null), Et = or(), We = hy(tt, ve.value.draggable.measure);
  Ny({
    activeNode: N.value ? Q.value.get(N.value) : null,
    config: Et.layoutShiftCompensation,
    initialRect: We.value,
    measure: ve.value.draggable.measure
  });
  const Cn = computed(() => ve.value.draggable.measure), Ft = Jl(tt, Cn, We), pt = computed(() => tt.value ? tt.value.parentElement : null), we = Jl(pt), ne = ref({
    activatorEvent: null,
    active: null,
    activeNode: tt.value,
    collisionRect: null,
    collisions: null,
    droppableRects: Fe.value,
    draggableNodes: Q.value,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: it.value,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), Ue = computed(() => {
    var q;
    return it.value.getNodeFor((q = ne.value.over) == null ? void 0 : q.id);
  }), re = Sy({
    measure: ve.value.dragOverlay.measure
  }), In = computed(() => re.value.nodeRef.value ?? tt.value), kt = computed(() => U.value ? re.value.rect.value ?? Ft.value : null), hn = computed(() => Boolean(re.value.nodeRef.value && re.value.rect)), jr = computed(() => hn.value ? null : Ft.value), Xt = yy(jr), pn = computed(() => In.value ? Vt(In.value) : null), tr = xc(pn), At = my(U.value ? Ue.value ?? tt.value : null), On = xy(At), Er = ref();
  watch([() => S.value.draggable.translate, () => ot.value, () => {
    var q;
    return (q = k.value) == null ? void 0 : q.id;
  }, () => {
    var q;
    return (q = k.value) == null ? void 0 : q.data.value;
  }, () => {
    var q;
    return (q = k.value) == null ? void 0 : q.rect;
  }, () => Ft.value, () => we.value, () => kt.value, () => ne.value.over, () => re.value.rect.value, () => At.value, () => tr.value], (q, Wt, Gt) => {
    Er.value = {
      transform: {
        x: S.value.draggable.translate.x - Xt.x,
        y: S.value.draggable.translate.y - Xt.y,
        scaleX: 1,
        scaleY: 1
      },
      activatorEvent: ot.value,
      active: k.value,
      activeNodeRect: Ft.value,
      containerNodeRect: we.value,
      draggingNodeRect: kt == null ? void 0 : kt.value,
      over: ne.value.over,
      overlayNodeRect: re.value.rect.value,
      scrollableAncestors: At.value,
      scrollableAncestorRects: On,
      windowRect: tr.value
    };
  }, {
    immediate: true
  });
  const Ne = computed(() => Ac(b, Er.value)), qt = computed(() => Ee.value ? qn(Ee.value, S.value.draggable.translate) : null), tn = by(At), jn = ec(tn), zu = ec(tn, [() => Ft.value]), Kt = computed(() => qn(Ne.value, jn.value)), en = computed(() => kt != null && kt.value ? P0(kt.value, Ne.value) : null), Te = computed(() => k.value && en.value ? d({
    active: k.value,
    collisionRect: en.value,
    droppableRects: Fe.value,
    droppableContainers: dn.value,
    pointerCoordinates: qt.value
  }) : null), ue = ref(null);
  function En(q) {
    ue.value = q;
  }
  const er = computed(() => hn.value ? Ne.value : qn(Ne.value, zu.value)), nr = computed(() => {
    var q;
    return W0(er.value, ((q = ue.value) == null ? void 0 : q.rect) ?? null, Ft.value);
  }), rr = computed(() => (q, {
    sensor: Wt,
    options: Gt
  }) => {
    if ($.value == null)
      return;
    const Mt = Q.value.get($.value);
    if (!Mt)
      return;
    const xe = q, ze = new Wt({
      active: $.value,
      activeNode: Mt,
      event: xe,
      options: Gt,
      context: ne.value,
      onStart(Nt) {
        const Se = $.value;
        if (Se == null)
          return;
        const Le = Q.value.get(Se);
        if (!Le)
          return;
        const {
          onDragStart: ke
        } = wt.value, gn = {
          active: {
            id: Se,
            data: Le.data,
            rect: rt.value
          }
        };
        ke == null || ke(gn), L.value = vn.Initializing, x({
          type: It.DragStart,
          initialCoordinates: Nt,
          active: Se
        }), j({
          type: "onDragStart",
          event: gn
        });
      },
      onMove(Nt) {
        x({
          type: It.DragMove,
          coordinates: Nt
        });
      },
      onEnd: Pe(It.DragEnd),
      onCancel: Pe(It.DragCancel)
    });
    ct.value = ze, ee(q);
    function Pe(Nt) {
      return async function() {
        const {
          collisions: Se,
          over: Le
        } = ne.value;
        let ke = null;
        if (k.value && Kt.value) {
          const {
            cancelDrop: yn
          } = wt.value;
          ke = {
            activatorEvent: xe,
            active: k.value,
            collisions: Se,
            delta: Kt.value,
            over: Le
          }, Nt === It.DragEnd && typeof yn == "function" && await Promise.resolve(yn(ke)) && (Nt = It.DragCancel);
        }
        $.value = null, x({
          type: Nt
        }), L.value = vn.Uninitialized, En(null), ct.value = null, ee(null);
        const gn = Nt === It.DragEnd ? "onDragEnd" : "onDragCancel";
        if (ke) {
          const yn = wt.value[gn];
          yn == null || yn(ke), j({
            type: gn,
            event: ke
          });
        }
      };
    }
  }), ur = computed(() => (q, Wt) => (Gt, Mt) => {
    const xe = Gt, ze = Q.value.get(Mt);
    if ($.value !== null || !ze || xe.dndKit || xe.defaultPrevented)
      return;
    const Pe = {
      active: ze
    };
    q(Gt, Wt.options, Pe) === true && (xe.dndKit = {
      capturedBy: Wt.sensor
    }, $.value = Mt, rr.value(Gt, Wt));
  }), ar = vy(v, ur);
  _y(v), watch([Ft, L], () => {
    Ft.value && L.value === vn.Initializing && (L.value = vn.Initialized);
  }, {
    deep: true,
    immediate: true
  }), watch([() => Kt.value.x, () => Kt.value.y], () => {
    const {
      onDragMove: q
    } = wt.value, {
      collisions: Wt,
      over: Gt
    } = ne.value;
    if (!S.value.draggable.active || !ot.value)
      return;
    const Mt = {
      active: S.value.draggable.active,
      activatorEvent: ot.value,
      collisions: Wt,
      delta: {
        x: Kt.value.x,
        y: Kt.value.y
      },
      over: Gt
    };
    q == null || q(Mt), j({
      type: "onDragMove",
      event: Mt
    });
  }), watch([k, tt, Te, en, Q, In, kt, Fe, it, ue, At, Kt], (q, Wt) => {
    ne.value = {
      activatorEvent: ot.value,
      active: k.value,
      activeNode: tt.value,
      collisionRect: en.value,
      collisions: Te.value,
      droppableRects: Fe.value,
      draggableNodes: Q.value,
      draggingNode: In.value,
      draggingNodeRect: kt == null ? void 0 : kt.value,
      droppableContainers: it.value,
      over: ue.value,
      scrollableAncestors: At.value,
      scrollAdjustedTranslate: Kt.value
    }, rt.value = {
      initial: kt == null ? void 0 : kt.value,
      translated: en.value
    };
  }, {
    immediate: true
  }), ly({
    ...Et,
    delta: S.value.draggable.translate,
    draggingRect: en.value,
    pointerCoordinates: qt.value,
    scrollableAncestors: At.value,
    scrollableAncestorRects: On
  });
  const ir = useSlots();
  function or() {
    var q;
    const Wt = ((q = ct.value) == null ? void 0 : q.autoScrollEnabled) === false, Gt = typeof s == "object" ? s.enabled === false : s === false, Mt = U.value && !Wt && !Gt;
    return typeof s == "object" ? {
      ...s,
      enabled: Mt
    } : {
      enabled: Mt
    };
  }
  let Nn;
  return () => {
    const q = ic(Te.value, "id");
    if (Nn !== q) {
      const {
        collisions: Mt,
        droppableContainers: xe,
        scrollAdjustedTranslate: ze
      } = ne.value;
      if (!(!S.value.draggable.active || $.value == null || !ot.value || !ze)) {
        const {
          onDragOver: Pe
        } = wt.value, Nt = xe.get(q), Se = Nt && Nt.rect ? {
          id: Nt.id,
          rect: Nt.rect,
          data: Nt.data,
          disabled: Nt.disabled
        } : null, Le = {
          active: S.value.draggable.active,
          activatorEvent: ot.value,
          collisions: Mt,
          delta: {
            x: ze.x,
            y: ze.y
          },
          over: Se
        };
        En(Se), Pe == null || Pe(Le), j({
          type: "onDragOver",
          event: Le
        }), Nn = q;
      }
    }
    const Wt = {
      activatorEvent: ot.value,
      activators: ar.value,
      active: k.value,
      activeNodeRect: Ft.value,
      ariaDescribedById: {
        draggable: Dt.value
      },
      dispatch: x,
      draggableNodes: Q.value,
      over: ue.value,
      measureDroppableContainers: Ot.value
    }, Gt = {
      active: k.value,
      activeNode: tt.value,
      activeNodeRect: Ft.value,
      activatorEvent: ot.value,
      collisions: Te.value,
      containerNodeRect: we.value,
      dragOverlay: re.value,
      draggableNodes: Q.value,
      droppableContainers: it.value,
      droppableRects: Fe.value,
      over: ue.value,
      measureDroppableContainers: Ot.value,
      scrollableAncestors: At.value,
      scrollableAncestorRects: On,
      measuringConfiguration: ve.value,
      measuringScheduled: jt.value,
      windowRect: tr.value
    };
    return createVNode(C0.Provider, {
      value: B
    }, {
      default: () => [createVNode(Dc.Provider, {
        value: Wt
      }, {
        default: () => [createVNode(Cy.Provider, {
          value: Gt
        }, {
          default: () => [createVNode(Ic.Provider, {
            value: nr.value
          }, {
            default: ir.default
          })]
        }), createVNode(jy, {
          disabled: (u == null ? void 0 : u.restoreFocus) === false
        }, null)]
      }), createVNode(T0, mergeProps(u, {
        hiddenTextDescribedById: Dt.value
      }), null)]
    });
  };
});
Oc.props = Ty;
Oc.name = "DndContext";
var zy = {};
function di() {
  return inject("DndContext", ref({
    ...je,
    scaleX: 1,
    scaleY: 1
  }));
}
var Ly = defineComponent((r, {}) => {
  const i = useSlots(), u = di();
  return () => i.default ? i.default(u) : null;
});
Ly.props = zy;
var ky = {};
function hi() {
  return inject("InternalContext", ref(vi));
}
var My = defineComponent((r, {}) => {
  const i = useSlots(), u = hi();
  return () => i.default ? i.default(u) : null;
});
My.props = ky;
var nc = "button";
var By = "Droppable";
function $y({
  id: r,
  data: i,
  disabled: u,
  attributes: s
}) {
  const v = Eu(By), d = hi(), y = di(), { role: b = nc, roleDescription: D = "draggable", tabIndex: _ = 0 } = s ?? {}, S = computed(() => {
    var k;
    return (k = d.value.active) == null ? void 0 : k.id;
  }), x = ref(false);
  watch(S, () => {
    var k;
    x.value = ((k = d.value.active) == null ? void 0 : k.id) === r.value;
  }, { immediate: true });
  const j = computed(() => x.value ? y.value : null), [B, L] = Ru(), [U, N] = Ru(), Q = wy(d.value.activators, r), it = Ar(computed(() => i == null ? void 0 : i.value));
  watch([() => d.value.draggableNodes, () => r.value], () => (d.value.draggableNodes.set(r.value, { id: r.value, key: v.value, node: B, activatorNode: U, data: it }), () => {
    const k = d.value.draggableNodes.get(r.value);
    k && k.key === v.value && d.value.draggableNodes.delete(r.value);
  }), { immediate: true });
  const lt = ref(rt());
  function rt() {
    return {
      role: b,
      tabIndex: _,
      "aria-disabled": u == null ? void 0 : u.value,
      "aria-pressed": x.value && b === nc ? true : void 0,
      "aria-roledescription": D,
      "aria-describedby": d.value.ariaDescribedById.draggable
    };
  }
  return watch([
    () => x.value,
    () => u == null ? void 0 : u.value,
    () => d.value.ariaDescribedById.draggable
  ], () => {
    lt.value = rt();
  }), {
    internalContext: d,
    isDragging: x,
    attributes: lt,
    listeners: computed(() => u != null && u.value ? void 0 : Q.value),
    node: B,
    setNodeRef: L,
    setActivatorNodeRef: N,
    transform: j
  };
}
function jc() {
  return inject("PublicContext", ref(Ay));
}
var Sr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var Iu = {};
var Fy = {
  get exports() {
    return Iu;
  },
  set exports(r) {
    Iu = r;
  }
};
(function(r, i) {
  (function() {
    var u, s = "4.17.21", v = 200, d = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", y = "Expected a function", b = "Invalid `variable` option passed into `_.template`", D = "__lodash_hash_undefined__", _ = 500, S = "__lodash_placeholder__", x = 1, j = 2, B = 4, L = 1, U = 2, N = 1, Q = 2, it = 4, lt = 8, rt = 16, k = 32, vt = 64, $ = 128, ct = 256, ot = 512, ee = 30, wt = "...", Dt = 800, dn = 16, ve = 1, Jn = 2, Fe = 3, Ot = 1 / 0, jt = 9007199254740991, tt = 17976931348623157e292, Ee = 0 / 0, Et = 4294967295, We = Et - 1, Cn = Et >>> 1, Ft = [
      ["ary", $],
      ["bind", N],
      ["bindKey", Q],
      ["curry", lt],
      ["curryRight", rt],
      ["flip", ot],
      ["partial", k],
      ["partialRight", vt],
      ["rearg", ct]
    ], pt = "[object Arguments]", we = "[object Array]", ne = "[object AsyncFunction]", Ue = "[object Boolean]", re = "[object Date]", In = "[object DOMException]", kt = "[object Error]", hn = "[object Function]", jr = "[object GeneratorFunction]", Xt = "[object Map]", pn = "[object Number]", tr = "[object Null]", At = "[object Object]", On = "[object Promise]", Er = "[object Proxy]", Ne = "[object RegExp]", qt = "[object Set]", tn = "[object String]", jn = "[object Symbol]", zu = "[object Undefined]", Kt = "[object WeakMap]", en = "[object WeakSet]", Te = "[object ArrayBuffer]", ue = "[object DataView]", En = "[object Float32Array]", er = "[object Float64Array]", nr = "[object Int8Array]", rr = "[object Int16Array]", ur = "[object Int32Array]", ar = "[object Uint8Array]", ir = "[object Uint8ClampedArray]", or = "[object Uint16Array]", Nn = "[object Uint32Array]", q = /\b__p \+= '';/g, Wt = /\b(__p \+=) '' \+/g, Gt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Mt = /&(?:amp|lt|gt|quot|#39);/g, xe = /[&<>"']/g, ze = RegExp(Mt.source), Pe = RegExp(xe.source), Nt = /<%-([\s\S]+?)%>/g, Se = /<%([\s\S]+?)%>/g, Le = /<%=([\s\S]+?)%>/g, ke = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gn = /^\w*$/, yn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Lu = /[\\^$.*+?()[\]{}|]/g, $c = RegExp(Lu.source), ku = /^\s+/, Fc = /\s/, Wc = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Uc = /\{\n\/\* \[wrapped with (.+)\] \*/, Pc = /,? & /, Yc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Vc = /[()=,{}\[\]\/\s]/, Xc = /\\(\\)?/g, qc = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, bi = /\w*$/, Kc = /^[-+]0x[0-9a-f]+$/i, Gc = /^0b[01]+$/i, Hc = /^\[object .+?Constructor\]$/, Zc = /^0o[0-7]+$/i, Qc = /^(?:0|[1-9]\d*)$/, Jc = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Nr = /($^)/, ts = /['\n\r\u2028\u2029\\]/g, Tr = "\\ud800-\\udfff", es = "\\u0300-\\u036f", ns = "\\ufe20-\\ufe2f", rs = "\\u20d0-\\u20ff", _i = es + ns + rs, wi = "\\u2700-\\u27bf", xi = "a-z\\xdf-\\xf6\\xf8-\\xff", us = "\\xac\\xb1\\xd7\\xf7", as = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", is = "\\u2000-\\u206f", os = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Si = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ri = "\\ufe0e\\ufe0f", Di = us + as + is + os, Mu = "['’]", ls = "[" + Tr + "]", Ai = "[" + Di + "]", zr = "[" + _i + "]", Ci = "\\d+", cs = "[" + wi + "]", Ii = "[" + xi + "]", Oi = "[^" + Tr + Di + Ci + wi + xi + Si + "]", Bu = "\\ud83c[\\udffb-\\udfff]", ss = "(?:" + zr + "|" + Bu + ")", ji = "[^" + Tr + "]", $u = "(?:\\ud83c[\\udde6-\\uddff]){2}", Fu = "[\\ud800-\\udbff][\\udc00-\\udfff]", Tn = "[" + Si + "]", Ei = "\\u200d", Ni = "(?:" + Ii + "|" + Oi + ")", fs = "(?:" + Tn + "|" + Oi + ")", Ti = "(?:" + Mu + "(?:d|ll|m|re|s|t|ve))?", zi = "(?:" + Mu + "(?:D|LL|M|RE|S|T|VE))?", Li = ss + "?", ki = "[" + Ri + "]?", vs = "(?:" + Ei + "(?:" + [ji, $u, Fu].join("|") + ")" + ki + Li + ")*", ds = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", hs = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Mi = ki + Li + vs, ps = "(?:" + [cs, $u, Fu].join("|") + ")" + Mi, gs = "(?:" + [ji + zr + "?", zr, $u, Fu, ls].join("|") + ")", ys = RegExp(Mu, "g"), ms = RegExp(zr, "g"), Wu = RegExp(Bu + "(?=" + Bu + ")|" + gs + Mi, "g"), bs = RegExp([
      Tn + "?" + Ii + "+" + Ti + "(?=" + [Ai, Tn, "$"].join("|") + ")",
      fs + "+" + zi + "(?=" + [Ai, Tn + Ni, "$"].join("|") + ")",
      Tn + "?" + Ni + "+" + Ti,
      Tn + "+" + zi,
      hs,
      ds,
      Ci,
      ps
    ].join("|"), "g"), _s = RegExp("[" + Ei + Tr + _i + Ri + "]"), ws = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, xs = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Ss = -1, dt = {};
    dt[En] = dt[er] = dt[nr] = dt[rr] = dt[ur] = dt[ar] = dt[ir] = dt[or] = dt[Nn] = true, dt[pt] = dt[we] = dt[Te] = dt[Ue] = dt[ue] = dt[re] = dt[kt] = dt[hn] = dt[Xt] = dt[pn] = dt[At] = dt[Ne] = dt[qt] = dt[tn] = dt[Kt] = false;
    var ft = {};
    ft[pt] = ft[we] = ft[Te] = ft[ue] = ft[Ue] = ft[re] = ft[En] = ft[er] = ft[nr] = ft[rr] = ft[ur] = ft[Xt] = ft[pn] = ft[At] = ft[Ne] = ft[qt] = ft[tn] = ft[jn] = ft[ar] = ft[ir] = ft[or] = ft[Nn] = true, ft[kt] = ft[hn] = ft[Kt] = false;
    var Rs = {
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Ds = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, As = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Cs = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Is = parseFloat, Os = parseInt, Bi = typeof Sr == "object" && Sr && Sr.Object === Object && Sr, js = typeof self == "object" && self && self.Object === Object && self, Tt = Bi || js || Function("return this")(), Uu = i && !i.nodeType && i, mn = Uu && true && r && !r.nodeType && r, $i = mn && mn.exports === Uu, Pu = $i && Bi.process, de = function() {
      try {
        var p = mn && mn.require && mn.require("util").types;
        return p || Pu && Pu.binding && Pu.binding("util");
      } catch {
      }
    }(), Fi = de && de.isArrayBuffer, Wi = de && de.isDate, Ui = de && de.isMap, Pi = de && de.isRegExp, Yi = de && de.isSet, Vi = de && de.isTypedArray;
    function ae(p, w, m) {
      switch (m.length) {
        case 0:
          return p.call(w);
        case 1:
          return p.call(w, m[0]);
        case 2:
          return p.call(w, m[0], m[1]);
        case 3:
          return p.call(w, m[0], m[1], m[2]);
      }
      return p.apply(w, m);
    }
    function Es(p, w, m, E) {
      for (var P = -1, nt = p == null ? 0 : p.length; ++P < nt; ) {
        var xt = p[P];
        w(E, xt, m(xt), p);
      }
      return E;
    }
    function he(p, w) {
      for (var m = -1, E = p == null ? 0 : p.length; ++m < E && w(p[m], m, p) !== false; )
        ;
      return p;
    }
    function Ns(p, w) {
      for (var m = p == null ? 0 : p.length; m-- && w(p[m], m, p) !== false; )
        ;
      return p;
    }
    function Xi(p, w) {
      for (var m = -1, E = p == null ? 0 : p.length; ++m < E; )
        if (!w(p[m], m, p))
          return false;
      return true;
    }
    function nn(p, w) {
      for (var m = -1, E = p == null ? 0 : p.length, P = 0, nt = []; ++m < E; ) {
        var xt = p[m];
        w(xt, m, p) && (nt[P++] = xt);
      }
      return nt;
    }
    function Lr(p, w) {
      var m = p == null ? 0 : p.length;
      return !!m && zn(p, w, 0) > -1;
    }
    function Yu(p, w, m) {
      for (var E = -1, P = p == null ? 0 : p.length; ++E < P; )
        if (m(w, p[E]))
          return true;
      return false;
    }
    function gt(p, w) {
      for (var m = -1, E = p == null ? 0 : p.length, P = Array(E); ++m < E; )
        P[m] = w(p[m], m, p);
      return P;
    }
    function rn(p, w) {
      for (var m = -1, E = w.length, P = p.length; ++m < E; )
        p[P + m] = w[m];
      return p;
    }
    function Vu(p, w, m, E) {
      var P = -1, nt = p == null ? 0 : p.length;
      for (E && nt && (m = p[++P]); ++P < nt; )
        m = w(m, p[P], P, p);
      return m;
    }
    function Ts(p, w, m, E) {
      var P = p == null ? 0 : p.length;
      for (E && P && (m = p[--P]); P--; )
        m = w(m, p[P], P, p);
      return m;
    }
    function Xu(p, w) {
      for (var m = -1, E = p == null ? 0 : p.length; ++m < E; )
        if (w(p[m], m, p))
          return true;
      return false;
    }
    var zs = qu("length");
    function Ls(p) {
      return p.split("");
    }
    function ks(p) {
      return p.match(Yc) || [];
    }
    function qi(p, w, m) {
      var E;
      return m(p, function(P, nt, xt) {
        if (w(P, nt, xt))
          return E = nt, false;
      }), E;
    }
    function kr(p, w, m, E) {
      for (var P = p.length, nt = m + (E ? 1 : -1); E ? nt-- : ++nt < P; )
        if (w(p[nt], nt, p))
          return nt;
      return -1;
    }
    function zn(p, w, m) {
      return w === w ? Ks(p, w, m) : kr(p, Ki, m);
    }
    function Ms(p, w, m, E) {
      for (var P = m - 1, nt = p.length; ++P < nt; )
        if (E(p[P], w))
          return P;
      return -1;
    }
    function Ki(p) {
      return p !== p;
    }
    function Gi(p, w) {
      var m = p == null ? 0 : p.length;
      return m ? Gu(p, w) / m : Ee;
    }
    function qu(p) {
      return function(w) {
        return w == null ? u : w[p];
      };
    }
    function Ku(p) {
      return function(w) {
        return p == null ? u : p[w];
      };
    }
    function Hi(p, w, m, E, P) {
      return P(p, function(nt, xt, st) {
        m = E ? (E = false, nt) : w(m, nt, xt, st);
      }), m;
    }
    function Bs(p, w) {
      var m = p.length;
      for (p.sort(w); m--; )
        p[m] = p[m].value;
      return p;
    }
    function Gu(p, w) {
      for (var m, E = -1, P = p.length; ++E < P; ) {
        var nt = w(p[E]);
        nt !== u && (m = m === u ? nt : m + nt);
      }
      return m;
    }
    function Hu(p, w) {
      for (var m = -1, E = Array(p); ++m < p; )
        E[m] = w(m);
      return E;
    }
    function $s(p, w) {
      return gt(w, function(m) {
        return [m, p[m]];
      });
    }
    function Zi(p) {
      return p && p.slice(0, eo(p) + 1).replace(ku, "");
    }
    function ie(p) {
      return function(w) {
        return p(w);
      };
    }
    function Zu(p, w) {
      return gt(w, function(m) {
        return p[m];
      });
    }
    function lr(p, w) {
      return p.has(w);
    }
    function Qi(p, w) {
      for (var m = -1, E = p.length; ++m < E && zn(w, p[m], 0) > -1; )
        ;
      return m;
    }
    function Ji(p, w) {
      for (var m = p.length; m-- && zn(w, p[m], 0) > -1; )
        ;
      return m;
    }
    function Fs(p, w) {
      for (var m = p.length, E = 0; m--; )
        p[m] === w && ++E;
      return E;
    }
    var Ws = Ku(Rs), Us = Ku(Ds);
    function Ps(p) {
      return "\\" + Cs[p];
    }
    function Ys(p, w) {
      return p == null ? u : p[w];
    }
    function Ln(p) {
      return _s.test(p);
    }
    function Vs(p) {
      return ws.test(p);
    }
    function Xs(p) {
      for (var w, m = []; !(w = p.next()).done; )
        m.push(w.value);
      return m;
    }
    function Qu(p) {
      var w = -1, m = Array(p.size);
      return p.forEach(function(E, P) {
        m[++w] = [P, E];
      }), m;
    }
    function to(p, w) {
      return function(m) {
        return p(w(m));
      };
    }
    function un(p, w) {
      for (var m = -1, E = p.length, P = 0, nt = []; ++m < E; ) {
        var xt = p[m];
        (xt === w || xt === S) && (p[m] = S, nt[P++] = m);
      }
      return nt;
    }
    function Mr(p) {
      var w = -1, m = Array(p.size);
      return p.forEach(function(E) {
        m[++w] = E;
      }), m;
    }
    function qs(p) {
      var w = -1, m = Array(p.size);
      return p.forEach(function(E) {
        m[++w] = [E, E];
      }), m;
    }
    function Ks(p, w, m) {
      for (var E = m - 1, P = p.length; ++E < P; )
        if (p[E] === w)
          return E;
      return -1;
    }
    function Gs(p, w, m) {
      for (var E = m + 1; E--; )
        if (p[E] === w)
          return E;
      return E;
    }
    function kn(p) {
      return Ln(p) ? Zs(p) : zs(p);
    }
    function Re(p) {
      return Ln(p) ? Qs(p) : Ls(p);
    }
    function eo(p) {
      for (var w = p.length; w-- && Fc.test(p.charAt(w)); )
        ;
      return w;
    }
    var Hs = Ku(As);
    function Zs(p) {
      for (var w = Wu.lastIndex = 0; Wu.test(p); )
        ++w;
      return w;
    }
    function Qs(p) {
      return p.match(Wu) || [];
    }
    function Js(p) {
      return p.match(bs) || [];
    }
    var tf = function p(w) {
      w = w == null ? Tt : Mn.defaults(Tt.Object(), w, Mn.pick(Tt, xs));
      var m = w.Array, E = w.Date, P = w.Error, nt = w.Function, xt = w.Math, st = w.Object, Ju = w.RegExp, ef = w.String, pe = w.TypeError, Br = m.prototype, nf = nt.prototype, Bn = st.prototype, $r = w["__core-js_shared__"], Fr = nf.toString, at = Bn.hasOwnProperty, rf = 0, no = function() {
        var t = /[^.]+$/.exec($r && $r.keys && $r.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      }(), Wr = Bn.toString, uf = Fr.call(st), af = Tt._, of = Ju(
        "^" + Fr.call(at).replace(Lu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ur = $i ? w.Buffer : u, an = w.Symbol, Pr = w.Uint8Array, ro = Ur ? Ur.allocUnsafe : u, Yr = to(st.getPrototypeOf, st), uo = st.create, ao = Bn.propertyIsEnumerable, Vr = Br.splice, io = an ? an.isConcatSpreadable : u, cr = an ? an.iterator : u, bn = an ? an.toStringTag : u, Xr = function() {
        try {
          var t = Rn(st, "defineProperty");
          return t({}, "", {}), t;
        } catch {
        }
      }(), lf = w.clearTimeout !== Tt.clearTimeout && w.clearTimeout, cf = E && E.now !== Tt.Date.now && E.now, sf = w.setTimeout !== Tt.setTimeout && w.setTimeout, qr = xt.ceil, Kr = xt.floor, ta = st.getOwnPropertySymbols, ff = Ur ? Ur.isBuffer : u, oo = w.isFinite, vf = Br.join, df = to(st.keys, st), St = xt.max, Bt = xt.min, hf = E.now, pf = w.parseInt, lo = xt.random, gf = Br.reverse, ea = Rn(w, "DataView"), sr = Rn(w, "Map"), na = Rn(w, "Promise"), $n = Rn(w, "Set"), fr = Rn(w, "WeakMap"), vr = Rn(st, "create"), Gr = fr && new fr(), Fn = {}, yf = Dn(ea), mf = Dn(sr), bf = Dn(na), _f = Dn($n), wf = Dn(fr), Hr = an ? an.prototype : u, dr = Hr ? Hr.valueOf : u, co = Hr ? Hr.toString : u;
      function l(t) {
        if (mt(t) && !Y(t) && !(t instanceof Z)) {
          if (t instanceof ge)
            return t;
          if (at.call(t, "__wrapped__"))
            return fl(t);
        }
        return new ge(t);
      }
      var Wn = function() {
        function t() {
        }
        return function(e) {
          if (!yt(e))
            return {};
          if (uo)
            return uo(e);
          t.prototype = e;
          var n = new t();
          return t.prototype = u, n;
        };
      }();
      function Zr() {
      }
      function ge(t, e) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = u;
      }
      l.templateSettings = {
        escape: Nt,
        evaluate: Se,
        interpolate: Le,
        variable: "",
        imports: {
          _: l
        }
      }, l.prototype = Zr.prototype, l.prototype.constructor = l, ge.prototype = Wn(Zr.prototype), ge.prototype.constructor = ge;
      function Z(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Et, this.__views__ = [];
      }
      function xf() {
        var t = new Z(this.__wrapped__);
        return t.__actions__ = Ht(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Ht(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Ht(this.__views__), t;
      }
      function Sf() {
        if (this.__filtered__) {
          var t = new Z(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else
          t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function Rf() {
        var t = this.__wrapped__.value(), e = this.__dir__, n = Y(t), a = e < 0, o = n ? t.length : 0, c = kv(0, o, this.__views__), f = c.start, h2 = c.end, g = h2 - f, R = a ? h2 : f - 1, A = this.__iteratees__, C = A.length, I = 0, T = Bt(g, this.__takeCount__);
        if (!n || !a && o == g && T == g)
          return zo(t, this.__actions__);
        var F = [];
        t:
          for (; g-- && I < T; ) {
            R += e;
            for (var K = -1, W = t[R]; ++K < C; ) {
              var H = A[K], J = H.iteratee, ce = H.type, Yt = J(W);
              if (ce == Jn)
                W = Yt;
              else if (!Yt) {
                if (ce == ve)
                  continue t;
                break t;
              }
            }
            F[I++] = W;
          }
        return F;
      }
      Z.prototype = Wn(Zr.prototype), Z.prototype.constructor = Z;
      function _n(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var a = t[e];
          this.set(a[0], a[1]);
        }
      }
      function Df() {
        this.__data__ = vr ? vr(null) : {}, this.size = 0;
      }
      function Af(t) {
        var e = this.has(t) && delete this.__data__[t];
        return this.size -= e ? 1 : 0, e;
      }
      function Cf(t) {
        var e = this.__data__;
        if (vr) {
          var n = e[t];
          return n === D ? u : n;
        }
        return at.call(e, t) ? e[t] : u;
      }
      function If(t) {
        var e = this.__data__;
        return vr ? e[t] !== u : at.call(e, t);
      }
      function Of(t, e) {
        var n = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n[t] = vr && e === u ? D : e, this;
      }
      _n.prototype.clear = Df, _n.prototype.delete = Af, _n.prototype.get = Cf, _n.prototype.has = If, _n.prototype.set = Of;
      function Ye(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var a = t[e];
          this.set(a[0], a[1]);
        }
      }
      function jf() {
        this.__data__ = [], this.size = 0;
      }
      function Ef(t) {
        var e = this.__data__, n = Qr(e, t);
        if (n < 0)
          return false;
        var a = e.length - 1;
        return n == a ? e.pop() : Vr.call(e, n, 1), --this.size, true;
      }
      function Nf(t) {
        var e = this.__data__, n = Qr(e, t);
        return n < 0 ? u : e[n][1];
      }
      function Tf(t) {
        return Qr(this.__data__, t) > -1;
      }
      function zf(t, e) {
        var n = this.__data__, a = Qr(n, t);
        return a < 0 ? (++this.size, n.push([t, e])) : n[a][1] = e, this;
      }
      Ye.prototype.clear = jf, Ye.prototype.delete = Ef, Ye.prototype.get = Nf, Ye.prototype.has = Tf, Ye.prototype.set = zf;
      function Ve(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var a = t[e];
          this.set(a[0], a[1]);
        }
      }
      function Lf() {
        this.size = 0, this.__data__ = {
          hash: new _n(),
          map: new (sr || Ye)(),
          string: new _n()
        };
      }
      function kf(t) {
        var e = su(this, t).delete(t);
        return this.size -= e ? 1 : 0, e;
      }
      function Mf(t) {
        return su(this, t).get(t);
      }
      function Bf(t) {
        return su(this, t).has(t);
      }
      function $f(t, e) {
        var n = su(this, t), a = n.size;
        return n.set(t, e), this.size += n.size == a ? 0 : 1, this;
      }
      Ve.prototype.clear = Lf, Ve.prototype.delete = kf, Ve.prototype.get = Mf, Ve.prototype.has = Bf, Ve.prototype.set = $f;
      function wn(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.__data__ = new Ve(); ++e < n; )
          this.add(t[e]);
      }
      function Ff(t) {
        return this.__data__.set(t, D), this;
      }
      function Wf(t) {
        return this.__data__.has(t);
      }
      wn.prototype.add = wn.prototype.push = Ff, wn.prototype.has = Wf;
      function De(t) {
        var e = this.__data__ = new Ye(t);
        this.size = e.size;
      }
      function Uf() {
        this.__data__ = new Ye(), this.size = 0;
      }
      function Pf(t) {
        var e = this.__data__, n = e.delete(t);
        return this.size = e.size, n;
      }
      function Yf(t) {
        return this.__data__.get(t);
      }
      function Vf(t) {
        return this.__data__.has(t);
      }
      function Xf(t, e) {
        var n = this.__data__;
        if (n instanceof Ye) {
          var a = n.__data__;
          if (!sr || a.length < v - 1)
            return a.push([t, e]), this.size = ++n.size, this;
          n = this.__data__ = new Ve(a);
        }
        return n.set(t, e), this.size = n.size, this;
      }
      De.prototype.clear = Uf, De.prototype.delete = Pf, De.prototype.get = Yf, De.prototype.has = Vf, De.prototype.set = Xf;
      function so(t, e) {
        var n = Y(t), a = !n && An(t), o = !n && !a && fn(t), c = !n && !a && !o && Vn(t), f = n || a || o || c, h2 = f ? Hu(t.length, ef) : [], g = h2.length;
        for (var R in t)
          (e || at.call(t, R)) && !(f && (R == "length" || o && (R == "offset" || R == "parent") || c && (R == "buffer" || R == "byteLength" || R == "byteOffset") || Ge(R, g))) && h2.push(R);
        return h2;
      }
      function fo(t) {
        var e = t.length;
        return e ? t[da(0, e - 1)] : u;
      }
      function qf(t, e) {
        return fu(Ht(t), xn(e, 0, t.length));
      }
      function Kf(t) {
        return fu(Ht(t));
      }
      function ra(t, e, n) {
        (n !== u && !Ae(t[e], n) || n === u && !(e in t)) && Xe(t, e, n);
      }
      function hr(t, e, n) {
        var a = t[e];
        (!(at.call(t, e) && Ae(a, n)) || n === u && !(e in t)) && Xe(t, e, n);
      }
      function Qr(t, e) {
        for (var n = t.length; n--; )
          if (Ae(t[n][0], e))
            return n;
        return -1;
      }
      function Gf(t, e, n, a) {
        return on(t, function(o, c, f) {
          e(a, o, n(o), f);
        }), a;
      }
      function vo(t, e) {
        return t && Be(e, Ct(e), t);
      }
      function Hf(t, e) {
        return t && Be(e, Qt(e), t);
      }
      function Xe(t, e, n) {
        e == "__proto__" && Xr ? Xr(t, e, {
          configurable: true,
          enumerable: true,
          value: n,
          writable: true
        }) : t[e] = n;
      }
      function ua(t, e) {
        for (var n = -1, a = e.length, o = m(a), c = t == null; ++n < a; )
          o[n] = c ? u : Ba(t, e[n]);
        return o;
      }
      function xn(t, e, n) {
        return t === t && (n !== u && (t = t <= n ? t : n), e !== u && (t = t >= e ? t : e)), t;
      }
      function ye(t, e, n, a, o, c) {
        var f, h2 = e & x, g = e & j, R = e & B;
        if (n && (f = o ? n(t, a, o, c) : n(t)), f !== u)
          return f;
        if (!yt(t))
          return t;
        var A = Y(t);
        if (A) {
          if (f = Bv(t), !h2)
            return Ht(t, f);
        } else {
          var C = $t(t), I = C == hn || C == jr;
          if (fn(t))
            return Mo(t, h2);
          if (C == At || C == pt || I && !o) {
            if (f = g || I ? {} : nl(t), !h2)
              return g ? Cv(t, Hf(f, t)) : Av(t, vo(f, t));
          } else {
            if (!ft[C])
              return o ? t : {};
            f = $v(t, C, h2);
          }
        }
        c || (c = new De());
        var T = c.get(t);
        if (T)
          return T;
        c.set(t, f), El(t) ? t.forEach(function(W) {
          f.add(ye(W, e, n, W, t, c));
        }) : Ol(t) && t.forEach(function(W, H) {
          f.set(H, ye(W, e, n, H, t, c));
        });
        var F = R ? g ? Ra : Sa : g ? Qt : Ct, K = A ? u : F(t);
        return he(K || t, function(W, H) {
          K && (H = W, W = t[H]), hr(f, H, ye(W, e, n, H, t, c));
        }), f;
      }
      function Zf(t) {
        var e = Ct(t);
        return function(n) {
          return ho(n, t, e);
        };
      }
      function ho(t, e, n) {
        var a = n.length;
        if (t == null)
          return !a;
        for (t = st(t); a--; ) {
          var o = n[a], c = e[o], f = t[o];
          if (f === u && !(o in t) || !c(f))
            return false;
        }
        return true;
      }
      function po(t, e, n) {
        if (typeof t != "function")
          throw new pe(y);
        return wr(function() {
          t.apply(u, n);
        }, e);
      }
      function pr(t, e, n, a) {
        var o = -1, c = Lr, f = true, h2 = t.length, g = [], R = e.length;
        if (!h2)
          return g;
        n && (e = gt(e, ie(n))), a ? (c = Yu, f = false) : e.length >= v && (c = lr, f = false, e = new wn(e));
        t:
          for (; ++o < h2; ) {
            var A = t[o], C = n == null ? A : n(A);
            if (A = a || A !== 0 ? A : 0, f && C === C) {
              for (var I = R; I--; )
                if (e[I] === C)
                  continue t;
              g.push(A);
            } else
              c(e, C, a) || g.push(A);
          }
        return g;
      }
      var on = Uo(Me), go = Uo(ia, true);
      function Qf(t, e) {
        var n = true;
        return on(t, function(a, o, c) {
          return n = !!e(a, o, c), n;
        }), n;
      }
      function Jr(t, e, n) {
        for (var a = -1, o = t.length; ++a < o; ) {
          var c = t[a], f = e(c);
          if (f != null && (h2 === u ? f === f && !le(f) : n(f, h2)))
            var h2 = f, g = c;
        }
        return g;
      }
      function Jf(t, e, n, a) {
        var o = t.length;
        for (n = X(n), n < 0 && (n = -n > o ? 0 : o + n), a = a === u || a > o ? o : X(a), a < 0 && (a += o), a = n > a ? 0 : Tl(a); n < a; )
          t[n++] = e;
        return t;
      }
      function yo(t, e) {
        var n = [];
        return on(t, function(a, o, c) {
          e(a, o, c) && n.push(a);
        }), n;
      }
      function zt(t, e, n, a, o) {
        var c = -1, f = t.length;
        for (n || (n = Wv), o || (o = []); ++c < f; ) {
          var h2 = t[c];
          e > 0 && n(h2) ? e > 1 ? zt(h2, e - 1, n, a, o) : rn(o, h2) : a || (o[o.length] = h2);
        }
        return o;
      }
      var aa = Po(), mo = Po(true);
      function Me(t, e) {
        return t && aa(t, e, Ct);
      }
      function ia(t, e) {
        return t && mo(t, e, Ct);
      }
      function tu(t, e) {
        return nn(e, function(n) {
          return He(t[n]);
        });
      }
      function Sn(t, e) {
        e = cn(e, t);
        for (var n = 0, a = e.length; t != null && n < a; )
          t = t[$e(e[n++])];
        return n && n == a ? t : u;
      }
      function bo(t, e, n) {
        var a = e(t);
        return Y(t) ? a : rn(a, n(t));
      }
      function Ut(t) {
        return t == null ? t === u ? zu : tr : bn && bn in st(t) ? Lv(t) : Kv(t);
      }
      function oa(t, e) {
        return t > e;
      }
      function tv(t, e) {
        return t != null && at.call(t, e);
      }
      function ev(t, e) {
        return t != null && e in st(t);
      }
      function nv(t, e, n) {
        return t >= Bt(e, n) && t < St(e, n);
      }
      function la(t, e, n) {
        for (var a = n ? Yu : Lr, o = t[0].length, c = t.length, f = c, h2 = m(c), g = 1 / 0, R = []; f--; ) {
          var A = t[f];
          f && e && (A = gt(A, ie(e))), g = Bt(A.length, g), h2[f] = !n && (e || o >= 120 && A.length >= 120) ? new wn(f && A) : u;
        }
        A = t[0];
        var C = -1, I = h2[0];
        t:
          for (; ++C < o && R.length < g; ) {
            var T = A[C], F = e ? e(T) : T;
            if (T = n || T !== 0 ? T : 0, !(I ? lr(I, F) : a(R, F, n))) {
              for (f = c; --f; ) {
                var K = h2[f];
                if (!(K ? lr(K, F) : a(t[f], F, n)))
                  continue t;
              }
              I && I.push(F), R.push(T);
            }
          }
        return R;
      }
      function rv(t, e, n, a) {
        return Me(t, function(o, c, f) {
          e(a, n(o), c, f);
        }), a;
      }
      function gr(t, e, n) {
        e = cn(e, t), t = il(t, e);
        var a = t == null ? t : t[$e(be(e))];
        return a == null ? u : ae(a, t, n);
      }
      function _o(t) {
        return mt(t) && Ut(t) == pt;
      }
      function uv(t) {
        return mt(t) && Ut(t) == Te;
      }
      function av(t) {
        return mt(t) && Ut(t) == re;
      }
      function yr(t, e, n, a, o) {
        return t === e ? true : t == null || e == null || !mt(t) && !mt(e) ? t !== t && e !== e : iv(t, e, n, a, yr, o);
      }
      function iv(t, e, n, a, o, c) {
        var f = Y(t), h2 = Y(e), g = f ? we : $t(t), R = h2 ? we : $t(e);
        g = g == pt ? At : g, R = R == pt ? At : R;
        var A = g == At, C = R == At, I = g == R;
        if (I && fn(t)) {
          if (!fn(e))
            return false;
          f = true, A = false;
        }
        if (I && !A)
          return c || (c = new De()), f || Vn(t) ? Jo(t, e, n, a, o, c) : Tv(t, e, g, n, a, o, c);
        if (!(n & L)) {
          var T = A && at.call(t, "__wrapped__"), F = C && at.call(e, "__wrapped__");
          if (T || F) {
            var K = T ? t.value() : t, W = F ? e.value() : e;
            return c || (c = new De()), o(K, W, n, a, c);
          }
        }
        return I ? (c || (c = new De()), zv(t, e, n, a, o, c)) : false;
      }
      function ov(t) {
        return mt(t) && $t(t) == Xt;
      }
      function ca(t, e, n, a) {
        var o = n.length, c = o, f = !a;
        if (t == null)
          return !c;
        for (t = st(t); o--; ) {
          var h2 = n[o];
          if (f && h2[2] ? h2[1] !== t[h2[0]] : !(h2[0] in t))
            return false;
        }
        for (; ++o < c; ) {
          h2 = n[o];
          var g = h2[0], R = t[g], A = h2[1];
          if (f && h2[2]) {
            if (R === u && !(g in t))
              return false;
          } else {
            var C = new De();
            if (a)
              var I = a(R, A, g, t, e, C);
            if (!(I === u ? yr(A, R, L | U, a, C) : I))
              return false;
          }
        }
        return true;
      }
      function wo(t) {
        if (!yt(t) || Pv(t))
          return false;
        var e = He(t) ? of : Hc;
        return e.test(Dn(t));
      }
      function lv(t) {
        return mt(t) && Ut(t) == Ne;
      }
      function cv(t) {
        return mt(t) && $t(t) == qt;
      }
      function sv(t) {
        return mt(t) && yu(t.length) && !!dt[Ut(t)];
      }
      function xo(t) {
        return typeof t == "function" ? t : t == null ? Jt : typeof t == "object" ? Y(t) ? Do(t[0], t[1]) : Ro(t) : Yl(t);
      }
      function sa(t) {
        if (!_r(t))
          return df(t);
        var e = [];
        for (var n in st(t))
          at.call(t, n) && n != "constructor" && e.push(n);
        return e;
      }
      function fv(t) {
        if (!yt(t))
          return qv(t);
        var e = _r(t), n = [];
        for (var a in t)
          a == "constructor" && (e || !at.call(t, a)) || n.push(a);
        return n;
      }
      function fa(t, e) {
        return t < e;
      }
      function So(t, e) {
        var n = -1, a = Zt(t) ? m(t.length) : [];
        return on(t, function(o, c, f) {
          a[++n] = e(o, c, f);
        }), a;
      }
      function Ro(t) {
        var e = Aa(t);
        return e.length == 1 && e[0][2] ? ul(e[0][0], e[0][1]) : function(n) {
          return n === t || ca(n, t, e);
        };
      }
      function Do(t, e) {
        return Ia(t) && rl(e) ? ul($e(t), e) : function(n) {
          var a = Ba(n, t);
          return a === u && a === e ? $a(n, t) : yr(e, a, L | U);
        };
      }
      function eu(t, e, n, a, o) {
        t !== e && aa(e, function(c, f) {
          if (o || (o = new De()), yt(c))
            vv(t, e, f, n, eu, a, o);
          else {
            var h2 = a ? a(ja(t, f), c, f + "", t, e, o) : u;
            h2 === u && (h2 = c), ra(t, f, h2);
          }
        }, Qt);
      }
      function vv(t, e, n, a, o, c, f) {
        var h2 = ja(t, n), g = ja(e, n), R = f.get(g);
        if (R) {
          ra(t, n, R);
          return;
        }
        var A = c ? c(h2, g, n + "", t, e, f) : u, C = A === u;
        if (C) {
          var I = Y(g), T = !I && fn(g), F = !I && !T && Vn(g);
          A = g, I || T || F ? Y(h2) ? A = h2 : bt(h2) ? A = Ht(h2) : T ? (C = false, A = Mo(g, true)) : F ? (C = false, A = Bo(g, true)) : A = [] : xr(g) || An(g) ? (A = h2, An(h2) ? A = zl(h2) : (!yt(h2) || He(h2)) && (A = nl(g))) : C = false;
        }
        C && (f.set(g, A), o(A, g, a, c, f), f.delete(g)), ra(t, n, A);
      }
      function Ao(t, e) {
        var n = t.length;
        if (n)
          return e += e < 0 ? n : 0, Ge(e, n) ? t[e] : u;
      }
      function Co(t, e, n) {
        e.length ? e = gt(e, function(c) {
          return Y(c) ? function(f) {
            return Sn(f, c.length === 1 ? c[0] : c);
          } : c;
        }) : e = [Jt];
        var a = -1;
        e = gt(e, ie(M()));
        var o = So(t, function(c, f, h2) {
          var g = gt(e, function(R) {
            return R(c);
          });
          return { criteria: g, index: ++a, value: c };
        });
        return Bs(o, function(c, f) {
          return Dv(c, f, n);
        });
      }
      function dv(t, e) {
        return Io(t, e, function(n, a) {
          return $a(t, a);
        });
      }
      function Io(t, e, n) {
        for (var a = -1, o = e.length, c = {}; ++a < o; ) {
          var f = e[a], h2 = Sn(t, f);
          n(h2, f) && mr(c, cn(f, t), h2);
        }
        return c;
      }
      function hv(t) {
        return function(e) {
          return Sn(e, t);
        };
      }
      function va(t, e, n, a) {
        var o = a ? Ms : zn, c = -1, f = e.length, h2 = t;
        for (t === e && (e = Ht(e)), n && (h2 = gt(t, ie(n))); ++c < f; )
          for (var g = 0, R = e[c], A = n ? n(R) : R; (g = o(h2, A, g, a)) > -1; )
            h2 !== t && Vr.call(h2, g, 1), Vr.call(t, g, 1);
        return t;
      }
      function Oo(t, e) {
        for (var n = t ? e.length : 0, a = n - 1; n--; ) {
          var o = e[n];
          if (n == a || o !== c) {
            var c = o;
            Ge(o) ? Vr.call(t, o, 1) : ga(t, o);
          }
        }
        return t;
      }
      function da(t, e) {
        return t + Kr(lo() * (e - t + 1));
      }
      function pv(t, e, n, a) {
        for (var o = -1, c = St(qr((e - t) / (n || 1)), 0), f = m(c); c--; )
          f[a ? c : ++o] = t, t += n;
        return f;
      }
      function ha(t, e) {
        var n = "";
        if (!t || e < 1 || e > jt)
          return n;
        do
          e % 2 && (n += t), e = Kr(e / 2), e && (t += t);
        while (e);
        return n;
      }
      function G(t, e) {
        return Ea(al(t, e, Jt), t + "");
      }
      function gv(t) {
        return fo(Xn(t));
      }
      function yv(t, e) {
        var n = Xn(t);
        return fu(n, xn(e, 0, n.length));
      }
      function mr(t, e, n, a) {
        if (!yt(t))
          return t;
        e = cn(e, t);
        for (var o = -1, c = e.length, f = c - 1, h2 = t; h2 != null && ++o < c; ) {
          var g = $e(e[o]), R = n;
          if (g === "__proto__" || g === "constructor" || g === "prototype")
            return t;
          if (o != f) {
            var A = h2[g];
            R = a ? a(A, g, h2) : u, R === u && (R = yt(A) ? A : Ge(e[o + 1]) ? [] : {});
          }
          hr(h2, g, R), h2 = h2[g];
        }
        return t;
      }
      var jo = Gr ? function(t, e) {
        return Gr.set(t, e), t;
      } : Jt, mv = Xr ? function(t, e) {
        return Xr(t, "toString", {
          configurable: true,
          enumerable: false,
          value: Wa(e),
          writable: true
        });
      } : Jt;
      function bv(t) {
        return fu(Xn(t));
      }
      function me(t, e, n) {
        var a = -1, o = t.length;
        e < 0 && (e = -e > o ? 0 : o + e), n = n > o ? o : n, n < 0 && (n += o), o = e > n ? 0 : n - e >>> 0, e >>>= 0;
        for (var c = m(o); ++a < o; )
          c[a] = t[a + e];
        return c;
      }
      function _v(t, e) {
        var n;
        return on(t, function(a, o, c) {
          return n = e(a, o, c), !n;
        }), !!n;
      }
      function nu(t, e, n) {
        var a = 0, o = t == null ? a : t.length;
        if (typeof e == "number" && e === e && o <= Cn) {
          for (; a < o; ) {
            var c = a + o >>> 1, f = t[c];
            f !== null && !le(f) && (n ? f <= e : f < e) ? a = c + 1 : o = c;
          }
          return o;
        }
        return pa(t, e, Jt, n);
      }
      function pa(t, e, n, a) {
        var o = 0, c = t == null ? 0 : t.length;
        if (c === 0)
          return 0;
        e = n(e);
        for (var f = e !== e, h2 = e === null, g = le(e), R = e === u; o < c; ) {
          var A = Kr((o + c) / 2), C = n(t[A]), I = C !== u, T = C === null, F = C === C, K = le(C);
          if (f)
            var W = a || F;
          else
            R ? W = F && (a || I) : h2 ? W = F && I && (a || !T) : g ? W = F && I && !T && (a || !K) : T || K ? W = false : W = a ? C <= e : C < e;
          W ? o = A + 1 : c = A;
        }
        return Bt(c, We);
      }
      function Eo(t, e) {
        for (var n = -1, a = t.length, o = 0, c = []; ++n < a; ) {
          var f = t[n], h2 = e ? e(f) : f;
          if (!n || !Ae(h2, g)) {
            var g = h2;
            c[o++] = f === 0 ? 0 : f;
          }
        }
        return c;
      }
      function No(t) {
        return typeof t == "number" ? t : le(t) ? Ee : +t;
      }
      function oe(t) {
        if (typeof t == "string")
          return t;
        if (Y(t))
          return gt(t, oe) + "";
        if (le(t))
          return co ? co.call(t) : "";
        var e = t + "";
        return e == "0" && 1 / t == -Ot ? "-0" : e;
      }
      function ln(t, e, n) {
        var a = -1, o = Lr, c = t.length, f = true, h2 = [], g = h2;
        if (n)
          f = false, o = Yu;
        else if (c >= v) {
          var R = e ? null : Ev(t);
          if (R)
            return Mr(R);
          f = false, o = lr, g = new wn();
        } else
          g = e ? [] : h2;
        t:
          for (; ++a < c; ) {
            var A = t[a], C = e ? e(A) : A;
            if (A = n || A !== 0 ? A : 0, f && C === C) {
              for (var I = g.length; I--; )
                if (g[I] === C)
                  continue t;
              e && g.push(C), h2.push(A);
            } else
              o(g, C, n) || (g !== h2 && g.push(C), h2.push(A));
          }
        return h2;
      }
      function ga(t, e) {
        return e = cn(e, t), t = il(t, e), t == null || delete t[$e(be(e))];
      }
      function To(t, e, n, a) {
        return mr(t, e, n(Sn(t, e)), a);
      }
      function ru(t, e, n, a) {
        for (var o = t.length, c = a ? o : -1; (a ? c-- : ++c < o) && e(t[c], c, t); )
          ;
        return n ? me(t, a ? 0 : c, a ? c + 1 : o) : me(t, a ? c + 1 : 0, a ? o : c);
      }
      function zo(t, e) {
        var n = t;
        return n instanceof Z && (n = n.value()), Vu(e, function(a, o) {
          return o.func.apply(o.thisArg, rn([a], o.args));
        }, n);
      }
      function ya(t, e, n) {
        var a = t.length;
        if (a < 2)
          return a ? ln(t[0]) : [];
        for (var o = -1, c = m(a); ++o < a; )
          for (var f = t[o], h2 = -1; ++h2 < a; )
            h2 != o && (c[o] = pr(c[o] || f, t[h2], e, n));
        return ln(zt(c, 1), e, n);
      }
      function Lo(t, e, n) {
        for (var a = -1, o = t.length, c = e.length, f = {}; ++a < o; ) {
          var h2 = a < c ? e[a] : u;
          n(f, t[a], h2);
        }
        return f;
      }
      function ma(t) {
        return bt(t) ? t : [];
      }
      function ba(t) {
        return typeof t == "function" ? t : Jt;
      }
      function cn(t, e) {
        return Y(t) ? t : Ia(t, e) ? [t] : sl(ut(t));
      }
      var wv = G;
      function sn(t, e, n) {
        var a = t.length;
        return n = n === u ? a : n, !e && n >= a ? t : me(t, e, n);
      }
      var ko = lf || function(t) {
        return Tt.clearTimeout(t);
      };
      function Mo(t, e) {
        if (e)
          return t.slice();
        var n = t.length, a = ro ? ro(n) : new t.constructor(n);
        return t.copy(a), a;
      }
      function _a(t) {
        var e = new t.constructor(t.byteLength);
        return new Pr(e).set(new Pr(t)), e;
      }
      function xv(t, e) {
        var n = e ? _a(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.byteLength);
      }
      function Sv(t) {
        var e = new t.constructor(t.source, bi.exec(t));
        return e.lastIndex = t.lastIndex, e;
      }
      function Rv(t) {
        return dr ? st(dr.call(t)) : {};
      }
      function Bo(t, e) {
        var n = e ? _a(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.length);
      }
      function $o(t, e) {
        if (t !== e) {
          var n = t !== u, a = t === null, o = t === t, c = le(t), f = e !== u, h2 = e === null, g = e === e, R = le(e);
          if (!h2 && !R && !c && t > e || c && f && g && !h2 && !R || a && f && g || !n && g || !o)
            return 1;
          if (!a && !c && !R && t < e || R && n && o && !a && !c || h2 && n && o || !f && o || !g)
            return -1;
        }
        return 0;
      }
      function Dv(t, e, n) {
        for (var a = -1, o = t.criteria, c = e.criteria, f = o.length, h2 = n.length; ++a < f; ) {
          var g = $o(o[a], c[a]);
          if (g) {
            if (a >= h2)
              return g;
            var R = n[a];
            return g * (R == "desc" ? -1 : 1);
          }
        }
        return t.index - e.index;
      }
      function Fo(t, e, n, a) {
        for (var o = -1, c = t.length, f = n.length, h2 = -1, g = e.length, R = St(c - f, 0), A = m(g + R), C = !a; ++h2 < g; )
          A[h2] = e[h2];
        for (; ++o < f; )
          (C || o < c) && (A[n[o]] = t[o]);
        for (; R--; )
          A[h2++] = t[o++];
        return A;
      }
      function Wo(t, e, n, a) {
        for (var o = -1, c = t.length, f = -1, h2 = n.length, g = -1, R = e.length, A = St(c - h2, 0), C = m(A + R), I = !a; ++o < A; )
          C[o] = t[o];
        for (var T = o; ++g < R; )
          C[T + g] = e[g];
        for (; ++f < h2; )
          (I || o < c) && (C[T + n[f]] = t[o++]);
        return C;
      }
      function Ht(t, e) {
        var n = -1, a = t.length;
        for (e || (e = m(a)); ++n < a; )
          e[n] = t[n];
        return e;
      }
      function Be(t, e, n, a) {
        var o = !n;
        n || (n = {});
        for (var c = -1, f = e.length; ++c < f; ) {
          var h2 = e[c], g = a ? a(n[h2], t[h2], h2, n, t) : u;
          g === u && (g = t[h2]), o ? Xe(n, h2, g) : hr(n, h2, g);
        }
        return n;
      }
      function Av(t, e) {
        return Be(t, Ca(t), e);
      }
      function Cv(t, e) {
        return Be(t, tl(t), e);
      }
      function uu(t, e) {
        return function(n, a) {
          var o = Y(n) ? Es : Gf, c = e ? e() : {};
          return o(n, t, M(a, 2), c);
        };
      }
      function Un(t) {
        return G(function(e, n) {
          var a = -1, o = n.length, c = o > 1 ? n[o - 1] : u, f = o > 2 ? n[2] : u;
          for (c = t.length > 3 && typeof c == "function" ? (o--, c) : u, f && Pt(n[0], n[1], f) && (c = o < 3 ? u : c, o = 1), e = st(e); ++a < o; ) {
            var h2 = n[a];
            h2 && t(e, h2, a, c);
          }
          return e;
        });
      }
      function Uo(t, e) {
        return function(n, a) {
          if (n == null)
            return n;
          if (!Zt(n))
            return t(n, a);
          for (var o = n.length, c = e ? o : -1, f = st(n); (e ? c-- : ++c < o) && a(f[c], c, f) !== false; )
            ;
          return n;
        };
      }
      function Po(t) {
        return function(e, n, a) {
          for (var o = -1, c = st(e), f = a(e), h2 = f.length; h2--; ) {
            var g = f[t ? h2 : ++o];
            if (n(c[g], g, c) === false)
              break;
          }
          return e;
        };
      }
      function Iv(t, e, n) {
        var a = e & N, o = br(t);
        function c() {
          var f = this && this !== Tt && this instanceof c ? o : t;
          return f.apply(a ? n : this, arguments);
        }
        return c;
      }
      function Yo(t) {
        return function(e) {
          e = ut(e);
          var n = Ln(e) ? Re(e) : u, a = n ? n[0] : e.charAt(0), o = n ? sn(n, 1).join("") : e.slice(1);
          return a[t]() + o;
        };
      }
      function Pn(t) {
        return function(e) {
          return Vu(Ul(Wl(e).replace(ys, "")), t, "");
        };
      }
      function br(t) {
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return new t();
            case 1:
              return new t(e[0]);
            case 2:
              return new t(e[0], e[1]);
            case 3:
              return new t(e[0], e[1], e[2]);
            case 4:
              return new t(e[0], e[1], e[2], e[3]);
            case 5:
              return new t(e[0], e[1], e[2], e[3], e[4]);
            case 6:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
            case 7:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
          }
          var n = Wn(t.prototype), a = t.apply(n, e);
          return yt(a) ? a : n;
        };
      }
      function Ov(t, e, n) {
        var a = br(t);
        function o() {
          for (var c = arguments.length, f = m(c), h2 = c, g = Yn(o); h2--; )
            f[h2] = arguments[h2];
          var R = c < 3 && f[0] !== g && f[c - 1] !== g ? [] : un(f, g);
          if (c -= R.length, c < n)
            return Go(
              t,
              e,
              au,
              o.placeholder,
              u,
              f,
              R,
              u,
              u,
              n - c
            );
          var A = this && this !== Tt && this instanceof o ? a : t;
          return ae(A, this, f);
        }
        return o;
      }
      function Vo(t) {
        return function(e, n, a) {
          var o = st(e);
          if (!Zt(e)) {
            var c = M(n, 3);
            e = Ct(e), n = function(h2) {
              return c(o[h2], h2, o);
            };
          }
          var f = t(e, n, a);
          return f > -1 ? o[c ? e[f] : f] : u;
        };
      }
      function Xo(t) {
        return Ke(function(e) {
          var n = e.length, a = n, o = ge.prototype.thru;
          for (t && e.reverse(); a--; ) {
            var c = e[a];
            if (typeof c != "function")
              throw new pe(y);
            if (o && !f && cu(c) == "wrapper")
              var f = new ge([], true);
          }
          for (a = f ? a : n; ++a < n; ) {
            c = e[a];
            var h2 = cu(c), g = h2 == "wrapper" ? Da(c) : u;
            g && Oa(g[0]) && g[1] == ($ | lt | k | ct) && !g[4].length && g[9] == 1 ? f = f[cu(g[0])].apply(f, g[3]) : f = c.length == 1 && Oa(c) ? f[h2]() : f.thru(c);
          }
          return function() {
            var R = arguments, A = R[0];
            if (f && R.length == 1 && Y(A))
              return f.plant(A).value();
            for (var C = 0, I = n ? e[C].apply(this, R) : A; ++C < n; )
              I = e[C].call(this, I);
            return I;
          };
        });
      }
      function au(t, e, n, a, o, c, f, h2, g, R) {
        var A = e & $, C = e & N, I = e & Q, T = e & (lt | rt), F = e & ot, K = I ? u : br(t);
        function W() {
          for (var H = arguments.length, J = m(H), ce = H; ce--; )
            J[ce] = arguments[ce];
          if (T)
            var Yt = Yn(W), se = Fs(J, Yt);
          if (a && (J = Fo(J, a, o, T)), c && (J = Wo(J, c, f, T)), H -= se, T && H < R) {
            var _t = un(J, Yt);
            return Go(
              t,
              e,
              au,
              W.placeholder,
              n,
              J,
              _t,
              h2,
              g,
              R - H
            );
          }
          var Ce = C ? n : this, Qe = I ? Ce[t] : t;
          return H = J.length, h2 ? J = Gv(J, h2) : F && H > 1 && J.reverse(), A && g < H && (J.length = g), this && this !== Tt && this instanceof W && (Qe = K || br(Qe)), Qe.apply(Ce, J);
        }
        return W;
      }
      function qo(t, e) {
        return function(n, a) {
          return rv(n, t, e(a), {});
        };
      }
      function iu(t, e) {
        return function(n, a) {
          var o;
          if (n === u && a === u)
            return e;
          if (n !== u && (o = n), a !== u) {
            if (o === u)
              return a;
            typeof n == "string" || typeof a == "string" ? (n = oe(n), a = oe(a)) : (n = No(n), a = No(a)), o = t(n, a);
          }
          return o;
        };
      }
      function wa(t) {
        return Ke(function(e) {
          return e = gt(e, ie(M())), G(function(n) {
            var a = this;
            return t(e, function(o) {
              return ae(o, a, n);
            });
          });
        });
      }
      function ou(t, e) {
        e = e === u ? " " : oe(e);
        var n = e.length;
        if (n < 2)
          return n ? ha(e, t) : e;
        var a = ha(e, qr(t / kn(e)));
        return Ln(e) ? sn(Re(a), 0, t).join("") : a.slice(0, t);
      }
      function jv(t, e, n, a) {
        var o = e & N, c = br(t);
        function f() {
          for (var h2 = -1, g = arguments.length, R = -1, A = a.length, C = m(A + g), I = this && this !== Tt && this instanceof f ? c : t; ++R < A; )
            C[R] = a[R];
          for (; g--; )
            C[R++] = arguments[++h2];
          return ae(I, o ? n : this, C);
        }
        return f;
      }
      function Ko(t) {
        return function(e, n, a) {
          return a && typeof a != "number" && Pt(e, n, a) && (n = a = u), e = Ze(e), n === u ? (n = e, e = 0) : n = Ze(n), a = a === u ? e < n ? 1 : -1 : Ze(a), pv(e, n, a, t);
        };
      }
      function lu(t) {
        return function(e, n) {
          return typeof e == "string" && typeof n == "string" || (e = _e(e), n = _e(n)), t(e, n);
        };
      }
      function Go(t, e, n, a, o, c, f, h2, g, R) {
        var A = e & lt, C = A ? f : u, I = A ? u : f, T = A ? c : u, F = A ? u : c;
        e |= A ? k : vt, e &= ~(A ? vt : k), e & it || (e &= ~(N | Q));
        var K = [
          t,
          e,
          o,
          T,
          C,
          F,
          I,
          h2,
          g,
          R
        ], W = n.apply(u, K);
        return Oa(t) && ol(W, K), W.placeholder = a, ll(W, t, e);
      }
      function xa(t) {
        var e = xt[t];
        return function(n, a) {
          if (n = _e(n), a = a == null ? 0 : Bt(X(a), 292), a && oo(n)) {
            var o = (ut(n) + "e").split("e"), c = e(o[0] + "e" + (+o[1] + a));
            return o = (ut(c) + "e").split("e"), +(o[0] + "e" + (+o[1] - a));
          }
          return e(n);
        };
      }
      var Ev = $n && 1 / Mr(new $n([, -0]))[1] == Ot ? function(t) {
        return new $n(t);
      } : Ya;
      function Ho(t) {
        return function(e) {
          var n = $t(e);
          return n == Xt ? Qu(e) : n == qt ? qs(e) : $s(e, t(e));
        };
      }
      function qe(t, e, n, a, o, c, f, h2) {
        var g = e & Q;
        if (!g && typeof t != "function")
          throw new pe(y);
        var R = a ? a.length : 0;
        if (R || (e &= ~(k | vt), a = o = u), f = f === u ? f : St(X(f), 0), h2 = h2 === u ? h2 : X(h2), R -= o ? o.length : 0, e & vt) {
          var A = a, C = o;
          a = o = u;
        }
        var I = g ? u : Da(t), T = [
          t,
          e,
          n,
          a,
          o,
          A,
          C,
          c,
          f,
          h2
        ];
        if (I && Xv(T, I), t = T[0], e = T[1], n = T[2], a = T[3], o = T[4], h2 = T[9] = T[9] === u ? g ? 0 : t.length : St(T[9] - R, 0), !h2 && e & (lt | rt) && (e &= ~(lt | rt)), !e || e == N)
          var F = Iv(t, e, n);
        else
          e == lt || e == rt ? F = Ov(t, e, h2) : (e == k || e == (N | k)) && !o.length ? F = jv(t, e, n, a) : F = au.apply(u, T);
        var K = I ? jo : ol;
        return ll(K(F, T), t, e);
      }
      function Zo(t, e, n, a) {
        return t === u || Ae(t, Bn[n]) && !at.call(a, n) ? e : t;
      }
      function Qo(t, e, n, a, o, c) {
        return yt(t) && yt(e) && (c.set(e, t), eu(t, e, u, Qo, c), c.delete(e)), t;
      }
      function Nv(t) {
        return xr(t) ? u : t;
      }
      function Jo(t, e, n, a, o, c) {
        var f = n & L, h2 = t.length, g = e.length;
        if (h2 != g && !(f && g > h2))
          return false;
        var R = c.get(t), A = c.get(e);
        if (R && A)
          return R == e && A == t;
        var C = -1, I = true, T = n & U ? new wn() : u;
        for (c.set(t, e), c.set(e, t); ++C < h2; ) {
          var F = t[C], K = e[C];
          if (a)
            var W = f ? a(K, F, C, e, t, c) : a(F, K, C, t, e, c);
          if (W !== u) {
            if (W)
              continue;
            I = false;
            break;
          }
          if (T) {
            if (!Xu(e, function(H, J) {
              if (!lr(T, J) && (F === H || o(F, H, n, a, c)))
                return T.push(J);
            })) {
              I = false;
              break;
            }
          } else if (!(F === K || o(F, K, n, a, c))) {
            I = false;
            break;
          }
        }
        return c.delete(t), c.delete(e), I;
      }
      function Tv(t, e, n, a, o, c, f) {
        switch (n) {
          case ue:
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
              return false;
            t = t.buffer, e = e.buffer;
          case Te:
            return !(t.byteLength != e.byteLength || !c(new Pr(t), new Pr(e)));
          case Ue:
          case re:
          case pn:
            return Ae(+t, +e);
          case kt:
            return t.name == e.name && t.message == e.message;
          case Ne:
          case tn:
            return t == e + "";
          case Xt:
            var h2 = Qu;
          case qt:
            var g = a & L;
            if (h2 || (h2 = Mr), t.size != e.size && !g)
              return false;
            var R = f.get(t);
            if (R)
              return R == e;
            a |= U, f.set(t, e);
            var A = Jo(h2(t), h2(e), a, o, c, f);
            return f.delete(t), A;
          case jn:
            if (dr)
              return dr.call(t) == dr.call(e);
        }
        return false;
      }
      function zv(t, e, n, a, o, c) {
        var f = n & L, h2 = Sa(t), g = h2.length, R = Sa(e), A = R.length;
        if (g != A && !f)
          return false;
        for (var C = g; C--; ) {
          var I = h2[C];
          if (!(f ? I in e : at.call(e, I)))
            return false;
        }
        var T = c.get(t), F = c.get(e);
        if (T && F)
          return T == e && F == t;
        var K = true;
        c.set(t, e), c.set(e, t);
        for (var W = f; ++C < g; ) {
          I = h2[C];
          var H = t[I], J = e[I];
          if (a)
            var ce = f ? a(J, H, I, e, t, c) : a(H, J, I, t, e, c);
          if (!(ce === u ? H === J || o(H, J, n, a, c) : ce)) {
            K = false;
            break;
          }
          W || (W = I == "constructor");
        }
        if (K && !W) {
          var Yt = t.constructor, se = e.constructor;
          Yt != se && "constructor" in t && "constructor" in e && !(typeof Yt == "function" && Yt instanceof Yt && typeof se == "function" && se instanceof se) && (K = false);
        }
        return c.delete(t), c.delete(e), K;
      }
      function Ke(t) {
        return Ea(al(t, u, hl), t + "");
      }
      function Sa(t) {
        return bo(t, Ct, Ca);
      }
      function Ra(t) {
        return bo(t, Qt, tl);
      }
      var Da = Gr ? function(t) {
        return Gr.get(t);
      } : Ya;
      function cu(t) {
        for (var e = t.name + "", n = Fn[e], a = at.call(Fn, e) ? n.length : 0; a--; ) {
          var o = n[a], c = o.func;
          if (c == null || c == t)
            return o.name;
        }
        return e;
      }
      function Yn(t) {
        var e = at.call(l, "placeholder") ? l : t;
        return e.placeholder;
      }
      function M() {
        var t = l.iteratee || Ua;
        return t = t === Ua ? xo : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function su(t, e) {
        var n = t.__data__;
        return Uv(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
      }
      function Aa(t) {
        for (var e = Ct(t), n = e.length; n--; ) {
          var a = e[n], o = t[a];
          e[n] = [a, o, rl(o)];
        }
        return e;
      }
      function Rn(t, e) {
        var n = Ys(t, e);
        return wo(n) ? n : u;
      }
      function Lv(t) {
        var e = at.call(t, bn), n = t[bn];
        try {
          t[bn] = u;
          var a = true;
        } catch {
        }
        var o = Wr.call(t);
        return a && (e ? t[bn] = n : delete t[bn]), o;
      }
      var Ca = ta ? function(t) {
        return t == null ? [] : (t = st(t), nn(ta(t), function(e) {
          return ao.call(t, e);
        }));
      } : Va, tl = ta ? function(t) {
        for (var e = []; t; )
          rn(e, Ca(t)), t = Yr(t);
        return e;
      } : Va, $t = Ut;
      (ea && $t(new ea(new ArrayBuffer(1))) != ue || sr && $t(new sr()) != Xt || na && $t(na.resolve()) != On || $n && $t(new $n()) != qt || fr && $t(new fr()) != Kt) && ($t = function(t) {
        var e = Ut(t), n = e == At ? t.constructor : u, a = n ? Dn(n) : "";
        if (a)
          switch (a) {
            case yf:
              return ue;
            case mf:
              return Xt;
            case bf:
              return On;
            case _f:
              return qt;
            case wf:
              return Kt;
          }
        return e;
      });
      function kv(t, e, n) {
        for (var a = -1, o = n.length; ++a < o; ) {
          var c = n[a], f = c.size;
          switch (c.type) {
            case "drop":
              t += f;
              break;
            case "dropRight":
              e -= f;
              break;
            case "take":
              e = Bt(e, t + f);
              break;
            case "takeRight":
              t = St(t, e - f);
              break;
          }
        }
        return { start: t, end: e };
      }
      function Mv(t) {
        var e = t.match(Uc);
        return e ? e[1].split(Pc) : [];
      }
      function el(t, e, n) {
        e = cn(e, t);
        for (var a = -1, o = e.length, c = false; ++a < o; ) {
          var f = $e(e[a]);
          if (!(c = t != null && n(t, f)))
            break;
          t = t[f];
        }
        return c || ++a != o ? c : (o = t == null ? 0 : t.length, !!o && yu(o) && Ge(f, o) && (Y(t) || An(t)));
      }
      function Bv(t) {
        var e = t.length, n = new t.constructor(e);
        return e && typeof t[0] == "string" && at.call(t, "index") && (n.index = t.index, n.input = t.input), n;
      }
      function nl(t) {
        return typeof t.constructor == "function" && !_r(t) ? Wn(Yr(t)) : {};
      }
      function $v(t, e, n) {
        var a = t.constructor;
        switch (e) {
          case Te:
            return _a(t);
          case Ue:
          case re:
            return new a(+t);
          case ue:
            return xv(t, n);
          case En:
          case er:
          case nr:
          case rr:
          case ur:
          case ar:
          case ir:
          case or:
          case Nn:
            return Bo(t, n);
          case Xt:
            return new a();
          case pn:
          case tn:
            return new a(t);
          case Ne:
            return Sv(t);
          case qt:
            return new a();
          case jn:
            return Rv(t);
        }
      }
      function Fv(t, e) {
        var n = e.length;
        if (!n)
          return t;
        var a = n - 1;
        return e[a] = (n > 1 ? "& " : "") + e[a], e = e.join(n > 2 ? ", " : " "), t.replace(Wc, `{
/* [wrapped with ` + e + `] */
`);
      }
      function Wv(t) {
        return Y(t) || An(t) || !!(io && t && t[io]);
      }
      function Ge(t, e) {
        var n = typeof t;
        return e = e ?? jt, !!e && (n == "number" || n != "symbol" && Qc.test(t)) && t > -1 && t % 1 == 0 && t < e;
      }
      function Pt(t, e, n) {
        if (!yt(n))
          return false;
        var a = typeof e;
        return (a == "number" ? Zt(n) && Ge(e, n.length) : a == "string" && e in n) ? Ae(n[e], t) : false;
      }
      function Ia(t, e) {
        if (Y(t))
          return false;
        var n = typeof t;
        return n == "number" || n == "symbol" || n == "boolean" || t == null || le(t) ? true : gn.test(t) || !ke.test(t) || e != null && t in st(e);
      }
      function Uv(t) {
        var e = typeof t;
        return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
      }
      function Oa(t) {
        var e = cu(t), n = l[e];
        if (typeof n != "function" || !(e in Z.prototype))
          return false;
        if (t === n)
          return true;
        var a = Da(n);
        return !!a && t === a[0];
      }
      function Pv(t) {
        return !!no && no in t;
      }
      var Yv = $r ? He : Xa;
      function _r(t) {
        var e = t && t.constructor, n = typeof e == "function" && e.prototype || Bn;
        return t === n;
      }
      function rl(t) {
        return t === t && !yt(t);
      }
      function ul(t, e) {
        return function(n) {
          return n == null ? false : n[t] === e && (e !== u || t in st(n));
        };
      }
      function Vv(t) {
        var e = pu(t, function(a) {
          return n.size === _ && n.clear(), a;
        }), n = e.cache;
        return e;
      }
      function Xv(t, e) {
        var n = t[1], a = e[1], o = n | a, c = o < (N | Q | $), f = a == $ && n == lt || a == $ && n == ct && t[7].length <= e[8] || a == ($ | ct) && e[7].length <= e[8] && n == lt;
        if (!(c || f))
          return t;
        a & N && (t[2] = e[2], o |= n & N ? 0 : it);
        var h2 = e[3];
        if (h2) {
          var g = t[3];
          t[3] = g ? Fo(g, h2, e[4]) : h2, t[4] = g ? un(t[3], S) : e[4];
        }
        return h2 = e[5], h2 && (g = t[5], t[5] = g ? Wo(g, h2, e[6]) : h2, t[6] = g ? un(t[5], S) : e[6]), h2 = e[7], h2 && (t[7] = h2), a & $ && (t[8] = t[8] == null ? e[8] : Bt(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = o, t;
      }
      function qv(t) {
        var e = [];
        if (t != null)
          for (var n in st(t))
            e.push(n);
        return e;
      }
      function Kv(t) {
        return Wr.call(t);
      }
      function al(t, e, n) {
        return e = St(e === u ? t.length - 1 : e, 0), function() {
          for (var a = arguments, o = -1, c = St(a.length - e, 0), f = m(c); ++o < c; )
            f[o] = a[e + o];
          o = -1;
          for (var h2 = m(e + 1); ++o < e; )
            h2[o] = a[o];
          return h2[e] = n(f), ae(t, this, h2);
        };
      }
      function il(t, e) {
        return e.length < 2 ? t : Sn(t, me(e, 0, -1));
      }
      function Gv(t, e) {
        for (var n = t.length, a = Bt(e.length, n), o = Ht(t); a--; ) {
          var c = e[a];
          t[a] = Ge(c, n) ? o[c] : u;
        }
        return t;
      }
      function ja(t, e) {
        if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
          return t[e];
      }
      var ol = cl(jo), wr = sf || function(t, e) {
        return Tt.setTimeout(t, e);
      }, Ea = cl(mv);
      function ll(t, e, n) {
        var a = e + "";
        return Ea(t, Fv(a, Hv(Mv(a), n)));
      }
      function cl(t) {
        var e = 0, n = 0;
        return function() {
          var a = hf(), o = dn - (a - n);
          if (n = a, o > 0) {
            if (++e >= Dt)
              return arguments[0];
          } else
            e = 0;
          return t.apply(u, arguments);
        };
      }
      function fu(t, e) {
        var n = -1, a = t.length, o = a - 1;
        for (e = e === u ? a : e; ++n < e; ) {
          var c = da(n, o), f = t[c];
          t[c] = t[n], t[n] = f;
        }
        return t.length = e, t;
      }
      var sl = Vv(function(t) {
        var e = [];
        return t.charCodeAt(0) === 46 && e.push(""), t.replace(yn, function(n, a, o, c) {
          e.push(o ? c.replace(Xc, "$1") : a || n);
        }), e;
      });
      function $e(t) {
        if (typeof t == "string" || le(t))
          return t;
        var e = t + "";
        return e == "0" && 1 / t == -Ot ? "-0" : e;
      }
      function Dn(t) {
        if (t != null) {
          try {
            return Fr.call(t);
          } catch {
          }
          try {
            return t + "";
          } catch {
          }
        }
        return "";
      }
      function Hv(t, e) {
        return he(Ft, function(n) {
          var a = "_." + n[0];
          e & n[1] && !Lr(t, a) && t.push(a);
        }), t.sort();
      }
      function fl(t) {
        if (t instanceof Z)
          return t.clone();
        var e = new ge(t.__wrapped__, t.__chain__);
        return e.__actions__ = Ht(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
      }
      function Zv(t, e, n) {
        (n ? Pt(t, e, n) : e === u) ? e = 1 : e = St(X(e), 0);
        var a = t == null ? 0 : t.length;
        if (!a || e < 1)
          return [];
        for (var o = 0, c = 0, f = m(qr(a / e)); o < a; )
          f[c++] = me(t, o, o += e);
        return f;
      }
      function Qv(t) {
        for (var e = -1, n = t == null ? 0 : t.length, a = 0, o = []; ++e < n; ) {
          var c = t[e];
          c && (o[a++] = c);
        }
        return o;
      }
      function Jv() {
        var t = arguments.length;
        if (!t)
          return [];
        for (var e = m(t - 1), n = arguments[0], a = t; a--; )
          e[a - 1] = arguments[a];
        return rn(Y(n) ? Ht(n) : [n], zt(e, 1));
      }
      var td = G(function(t, e) {
        return bt(t) ? pr(t, zt(e, 1, bt, true)) : [];
      }), ed = G(function(t, e) {
        var n = be(e);
        return bt(n) && (n = u), bt(t) ? pr(t, zt(e, 1, bt, true), M(n, 2)) : [];
      }), nd = G(function(t, e) {
        var n = be(e);
        return bt(n) && (n = u), bt(t) ? pr(t, zt(e, 1, bt, true), u, n) : [];
      });
      function rd(t, e, n) {
        var a = t == null ? 0 : t.length;
        return a ? (e = n || e === u ? 1 : X(e), me(t, e < 0 ? 0 : e, a)) : [];
      }
      function ud(t, e, n) {
        var a = t == null ? 0 : t.length;
        return a ? (e = n || e === u ? 1 : X(e), e = a - e, me(t, 0, e < 0 ? 0 : e)) : [];
      }
      function ad(t, e) {
        return t && t.length ? ru(t, M(e, 3), true, true) : [];
      }
      function id(t, e) {
        return t && t.length ? ru(t, M(e, 3), true) : [];
      }
      function od(t, e, n, a) {
        var o = t == null ? 0 : t.length;
        return o ? (n && typeof n != "number" && Pt(t, e, n) && (n = 0, a = o), Jf(t, e, n, a)) : [];
      }
      function vl(t, e, n) {
        var a = t == null ? 0 : t.length;
        if (!a)
          return -1;
        var o = n == null ? 0 : X(n);
        return o < 0 && (o = St(a + o, 0)), kr(t, M(e, 3), o);
      }
      function dl(t, e, n) {
        var a = t == null ? 0 : t.length;
        if (!a)
          return -1;
        var o = a - 1;
        return n !== u && (o = X(n), o = n < 0 ? St(a + o, 0) : Bt(o, a - 1)), kr(t, M(e, 3), o, true);
      }
      function hl(t) {
        var e = t == null ? 0 : t.length;
        return e ? zt(t, 1) : [];
      }
      function ld(t) {
        var e = t == null ? 0 : t.length;
        return e ? zt(t, Ot) : [];
      }
      function cd(t, e) {
        var n = t == null ? 0 : t.length;
        return n ? (e = e === u ? 1 : X(e), zt(t, e)) : [];
      }
      function sd(t) {
        for (var e = -1, n = t == null ? 0 : t.length, a = {}; ++e < n; ) {
          var o = t[e];
          a[o[0]] = o[1];
        }
        return a;
      }
      function pl(t) {
        return t && t.length ? t[0] : u;
      }
      function fd(t, e, n) {
        var a = t == null ? 0 : t.length;
        if (!a)
          return -1;
        var o = n == null ? 0 : X(n);
        return o < 0 && (o = St(a + o, 0)), zn(t, e, o);
      }
      function vd(t) {
        var e = t == null ? 0 : t.length;
        return e ? me(t, 0, -1) : [];
      }
      var dd = G(function(t) {
        var e = gt(t, ma);
        return e.length && e[0] === t[0] ? la(e) : [];
      }), hd = G(function(t) {
        var e = be(t), n = gt(t, ma);
        return e === be(n) ? e = u : n.pop(), n.length && n[0] === t[0] ? la(n, M(e, 2)) : [];
      }), pd = G(function(t) {
        var e = be(t), n = gt(t, ma);
        return e = typeof e == "function" ? e : u, e && n.pop(), n.length && n[0] === t[0] ? la(n, u, e) : [];
      });
      function gd(t, e) {
        return t == null ? "" : vf.call(t, e);
      }
      function be(t) {
        var e = t == null ? 0 : t.length;
        return e ? t[e - 1] : u;
      }
      function yd(t, e, n) {
        var a = t == null ? 0 : t.length;
        if (!a)
          return -1;
        var o = a;
        return n !== u && (o = X(n), o = o < 0 ? St(a + o, 0) : Bt(o, a - 1)), e === e ? Gs(t, e, o) : kr(t, Ki, o, true);
      }
      function md(t, e) {
        return t && t.length ? Ao(t, X(e)) : u;
      }
      var bd = G(gl);
      function gl(t, e) {
        return t && t.length && e && e.length ? va(t, e) : t;
      }
      function _d(t, e, n) {
        return t && t.length && e && e.length ? va(t, e, M(n, 2)) : t;
      }
      function wd(t, e, n) {
        return t && t.length && e && e.length ? va(t, e, u, n) : t;
      }
      var xd = Ke(function(t, e) {
        var n = t == null ? 0 : t.length, a = ua(t, e);
        return Oo(t, gt(e, function(o) {
          return Ge(o, n) ? +o : o;
        }).sort($o)), a;
      });
      function Sd(t, e) {
        var n = [];
        if (!(t && t.length))
          return n;
        var a = -1, o = [], c = t.length;
        for (e = M(e, 3); ++a < c; ) {
          var f = t[a];
          e(f, a, t) && (n.push(f), o.push(a));
        }
        return Oo(t, o), n;
      }
      function Na(t) {
        return t == null ? t : gf.call(t);
      }
      function Rd(t, e, n) {
        var a = t == null ? 0 : t.length;
        return a ? (n && typeof n != "number" && Pt(t, e, n) ? (e = 0, n = a) : (e = e == null ? 0 : X(e), n = n === u ? a : X(n)), me(t, e, n)) : [];
      }
      function Dd(t, e) {
        return nu(t, e);
      }
      function Ad(t, e, n) {
        return pa(t, e, M(n, 2));
      }
      function Cd(t, e) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var a = nu(t, e);
          if (a < n && Ae(t[a], e))
            return a;
        }
        return -1;
      }
      function Id(t, e) {
        return nu(t, e, true);
      }
      function Od(t, e, n) {
        return pa(t, e, M(n, 2), true);
      }
      function jd(t, e) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var a = nu(t, e, true) - 1;
          if (Ae(t[a], e))
            return a;
        }
        return -1;
      }
      function Ed(t) {
        return t && t.length ? Eo(t) : [];
      }
      function Nd(t, e) {
        return t && t.length ? Eo(t, M(e, 2)) : [];
      }
      function Td(t) {
        var e = t == null ? 0 : t.length;
        return e ? me(t, 1, e) : [];
      }
      function zd(t, e, n) {
        return t && t.length ? (e = n || e === u ? 1 : X(e), me(t, 0, e < 0 ? 0 : e)) : [];
      }
      function Ld(t, e, n) {
        var a = t == null ? 0 : t.length;
        return a ? (e = n || e === u ? 1 : X(e), e = a - e, me(t, e < 0 ? 0 : e, a)) : [];
      }
      function kd(t, e) {
        return t && t.length ? ru(t, M(e, 3), false, true) : [];
      }
      function Md(t, e) {
        return t && t.length ? ru(t, M(e, 3)) : [];
      }
      var Bd = G(function(t) {
        return ln(zt(t, 1, bt, true));
      }), $d = G(function(t) {
        var e = be(t);
        return bt(e) && (e = u), ln(zt(t, 1, bt, true), M(e, 2));
      }), Fd = G(function(t) {
        var e = be(t);
        return e = typeof e == "function" ? e : u, ln(zt(t, 1, bt, true), u, e);
      });
      function Wd(t) {
        return t && t.length ? ln(t) : [];
      }
      function Ud(t, e) {
        return t && t.length ? ln(t, M(e, 2)) : [];
      }
      function Pd(t, e) {
        return e = typeof e == "function" ? e : u, t && t.length ? ln(t, u, e) : [];
      }
      function Ta(t) {
        if (!(t && t.length))
          return [];
        var e = 0;
        return t = nn(t, function(n) {
          if (bt(n))
            return e = St(n.length, e), true;
        }), Hu(e, function(n) {
          return gt(t, qu(n));
        });
      }
      function yl(t, e) {
        if (!(t && t.length))
          return [];
        var n = Ta(t);
        return e == null ? n : gt(n, function(a) {
          return ae(e, u, a);
        });
      }
      var Yd = G(function(t, e) {
        return bt(t) ? pr(t, e) : [];
      }), Vd = G(function(t) {
        return ya(nn(t, bt));
      }), Xd = G(function(t) {
        var e = be(t);
        return bt(e) && (e = u), ya(nn(t, bt), M(e, 2));
      }), qd = G(function(t) {
        var e = be(t);
        return e = typeof e == "function" ? e : u, ya(nn(t, bt), u, e);
      }), Kd = G(Ta);
      function Gd(t, e) {
        return Lo(t || [], e || [], hr);
      }
      function Hd(t, e) {
        return Lo(t || [], e || [], mr);
      }
      var Zd = G(function(t) {
        var e = t.length, n = e > 1 ? t[e - 1] : u;
        return n = typeof n == "function" ? (t.pop(), n) : u, yl(t, n);
      });
      function ml(t) {
        var e = l(t);
        return e.__chain__ = true, e;
      }
      function Qd(t, e) {
        return e(t), t;
      }
      function vu(t, e) {
        return e(t);
      }
      var Jd = Ke(function(t) {
        var e = t.length, n = e ? t[0] : 0, a = this.__wrapped__, o = function(c) {
          return ua(c, t);
        };
        return e > 1 || this.__actions__.length || !(a instanceof Z) || !Ge(n) ? this.thru(o) : (a = a.slice(n, +n + (e ? 1 : 0)), a.__actions__.push({
          func: vu,
          args: [o],
          thisArg: u
        }), new ge(a, this.__chain__).thru(function(c) {
          return e && !c.length && c.push(u), c;
        }));
      });
      function th() {
        return ml(this);
      }
      function eh() {
        return new ge(this.value(), this.__chain__);
      }
      function nh() {
        this.__values__ === u && (this.__values__ = Nl(this.value()));
        var t = this.__index__ >= this.__values__.length, e = t ? u : this.__values__[this.__index__++];
        return { done: t, value: e };
      }
      function rh() {
        return this;
      }
      function uh(t) {
        for (var e, n = this; n instanceof Zr; ) {
          var a = fl(n);
          a.__index__ = 0, a.__values__ = u, e ? o.__wrapped__ = a : e = a;
          var o = a;
          n = n.__wrapped__;
        }
        return o.__wrapped__ = t, e;
      }
      function ah() {
        var t = this.__wrapped__;
        if (t instanceof Z) {
          var e = t;
          return this.__actions__.length && (e = new Z(this)), e = e.reverse(), e.__actions__.push({
            func: vu,
            args: [Na],
            thisArg: u
          }), new ge(e, this.__chain__);
        }
        return this.thru(Na);
      }
      function ih() {
        return zo(this.__wrapped__, this.__actions__);
      }
      var oh = uu(function(t, e, n) {
        at.call(t, n) ? ++t[n] : Xe(t, n, 1);
      });
      function lh(t, e, n) {
        var a = Y(t) ? Xi : Qf;
        return n && Pt(t, e, n) && (e = u), a(t, M(e, 3));
      }
      function ch(t, e) {
        var n = Y(t) ? nn : yo;
        return n(t, M(e, 3));
      }
      var sh = Vo(vl), fh = Vo(dl);
      function vh(t, e) {
        return zt(du(t, e), 1);
      }
      function dh(t, e) {
        return zt(du(t, e), Ot);
      }
      function hh(t, e, n) {
        return n = n === u ? 1 : X(n), zt(du(t, e), n);
      }
      function bl(t, e) {
        var n = Y(t) ? he : on;
        return n(t, M(e, 3));
      }
      function _l(t, e) {
        var n = Y(t) ? Ns : go;
        return n(t, M(e, 3));
      }
      var ph = uu(function(t, e, n) {
        at.call(t, n) ? t[n].push(e) : Xe(t, n, [e]);
      });
      function gh(t, e, n, a) {
        t = Zt(t) ? t : Xn(t), n = n && !a ? X(n) : 0;
        var o = t.length;
        return n < 0 && (n = St(o + n, 0)), mu(t) ? n <= o && t.indexOf(e, n) > -1 : !!o && zn(t, e, n) > -1;
      }
      var yh = G(function(t, e, n) {
        var a = -1, o = typeof e == "function", c = Zt(t) ? m(t.length) : [];
        return on(t, function(f) {
          c[++a] = o ? ae(e, f, n) : gr(f, e, n);
        }), c;
      }), mh = uu(function(t, e, n) {
        Xe(t, n, e);
      });
      function du(t, e) {
        var n = Y(t) ? gt : So;
        return n(t, M(e, 3));
      }
      function bh(t, e, n, a) {
        return t == null ? [] : (Y(e) || (e = e == null ? [] : [e]), n = a ? u : n, Y(n) || (n = n == null ? [] : [n]), Co(t, e, n));
      }
      var _h = uu(function(t, e, n) {
        t[n ? 0 : 1].push(e);
      }, function() {
        return [[], []];
      });
      function wh(t, e, n) {
        var a = Y(t) ? Vu : Hi, o = arguments.length < 3;
        return a(t, M(e, 4), n, o, on);
      }
      function xh(t, e, n) {
        var a = Y(t) ? Ts : Hi, o = arguments.length < 3;
        return a(t, M(e, 4), n, o, go);
      }
      function Sh(t, e) {
        var n = Y(t) ? nn : yo;
        return n(t, gu(M(e, 3)));
      }
      function Rh(t) {
        var e = Y(t) ? fo : gv;
        return e(t);
      }
      function Dh(t, e, n) {
        (n ? Pt(t, e, n) : e === u) ? e = 1 : e = X(e);
        var a = Y(t) ? qf : yv;
        return a(t, e);
      }
      function Ah(t) {
        var e = Y(t) ? Kf : bv;
        return e(t);
      }
      function Ch(t) {
        if (t == null)
          return 0;
        if (Zt(t))
          return mu(t) ? kn(t) : t.length;
        var e = $t(t);
        return e == Xt || e == qt ? t.size : sa(t).length;
      }
      function Ih(t, e, n) {
        var a = Y(t) ? Xu : _v;
        return n && Pt(t, e, n) && (e = u), a(t, M(e, 3));
      }
      var Oh = G(function(t, e) {
        if (t == null)
          return [];
        var n = e.length;
        return n > 1 && Pt(t, e[0], e[1]) ? e = [] : n > 2 && Pt(e[0], e[1], e[2]) && (e = [e[0]]), Co(t, zt(e, 1), []);
      }), hu = cf || function() {
        return Tt.Date.now();
      };
      function jh(t, e) {
        if (typeof e != "function")
          throw new pe(y);
        return t = X(t), function() {
          if (--t < 1)
            return e.apply(this, arguments);
        };
      }
      function wl(t, e, n) {
        return e = n ? u : e, e = t && e == null ? t.length : e, qe(t, $, u, u, u, u, e);
      }
      function xl(t, e) {
        var n;
        if (typeof e != "function")
          throw new pe(y);
        return t = X(t), function() {
          return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = u), n;
        };
      }
      var za = G(function(t, e, n) {
        var a = N;
        if (n.length) {
          var o = un(n, Yn(za));
          a |= k;
        }
        return qe(t, a, e, n, o);
      }), Sl = G(function(t, e, n) {
        var a = N | Q;
        if (n.length) {
          var o = un(n, Yn(Sl));
          a |= k;
        }
        return qe(e, a, t, n, o);
      });
      function Rl(t, e, n) {
        e = n ? u : e;
        var a = qe(t, lt, u, u, u, u, u, e);
        return a.placeholder = Rl.placeholder, a;
      }
      function Dl(t, e, n) {
        e = n ? u : e;
        var a = qe(t, rt, u, u, u, u, u, e);
        return a.placeholder = Dl.placeholder, a;
      }
      function Al(t, e, n) {
        var a, o, c, f, h2, g, R = 0, A = false, C = false, I = true;
        if (typeof t != "function")
          throw new pe(y);
        e = _e(e) || 0, yt(n) && (A = !!n.leading, C = "maxWait" in n, c = C ? St(_e(n.maxWait) || 0, e) : c, I = "trailing" in n ? !!n.trailing : I);
        function T(_t) {
          var Ce = a, Qe = o;
          return a = o = u, R = _t, f = t.apply(Qe, Ce), f;
        }
        function F(_t) {
          return R = _t, h2 = wr(H, e), A ? T(_t) : f;
        }
        function K(_t) {
          var Ce = _t - g, Qe = _t - R, Vl = e - Ce;
          return C ? Bt(Vl, c - Qe) : Vl;
        }
        function W(_t) {
          var Ce = _t - g, Qe = _t - R;
          return g === u || Ce >= e || Ce < 0 || C && Qe >= c;
        }
        function H() {
          var _t = hu();
          if (W(_t))
            return J(_t);
          h2 = wr(H, K(_t));
        }
        function J(_t) {
          return h2 = u, I && a ? T(_t) : (a = o = u, f);
        }
        function ce() {
          h2 !== u && ko(h2), R = 0, a = g = o = h2 = u;
        }
        function Yt() {
          return h2 === u ? f : J(hu());
        }
        function se() {
          var _t = hu(), Ce = W(_t);
          if (a = arguments, o = this, g = _t, Ce) {
            if (h2 === u)
              return F(g);
            if (C)
              return ko(h2), h2 = wr(H, e), T(g);
          }
          return h2 === u && (h2 = wr(H, e)), f;
        }
        return se.cancel = ce, se.flush = Yt, se;
      }
      var Eh = G(function(t, e) {
        return po(t, 1, e);
      }), Nh = G(function(t, e, n) {
        return po(t, _e(e) || 0, n);
      });
      function Th(t) {
        return qe(t, ot);
      }
      function pu(t, e) {
        if (typeof t != "function" || e != null && typeof e != "function")
          throw new pe(y);
        var n = function() {
          var a = arguments, o = e ? e.apply(this, a) : a[0], c = n.cache;
          if (c.has(o))
            return c.get(o);
          var f = t.apply(this, a);
          return n.cache = c.set(o, f) || c, f;
        };
        return n.cache = new (pu.Cache || Ve)(), n;
      }
      pu.Cache = Ve;
      function gu(t) {
        if (typeof t != "function")
          throw new pe(y);
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return !t.call(this);
            case 1:
              return !t.call(this, e[0]);
            case 2:
              return !t.call(this, e[0], e[1]);
            case 3:
              return !t.call(this, e[0], e[1], e[2]);
          }
          return !t.apply(this, e);
        };
      }
      function zh(t) {
        return xl(2, t);
      }
      var Lh = wv(function(t, e) {
        e = e.length == 1 && Y(e[0]) ? gt(e[0], ie(M())) : gt(zt(e, 1), ie(M()));
        var n = e.length;
        return G(function(a) {
          for (var o = -1, c = Bt(a.length, n); ++o < c; )
            a[o] = e[o].call(this, a[o]);
          return ae(t, this, a);
        });
      }), La = G(function(t, e) {
        var n = un(e, Yn(La));
        return qe(t, k, u, e, n);
      }), Cl = G(function(t, e) {
        var n = un(e, Yn(Cl));
        return qe(t, vt, u, e, n);
      }), kh = Ke(function(t, e) {
        return qe(t, ct, u, u, u, e);
      });
      function Mh(t, e) {
        if (typeof t != "function")
          throw new pe(y);
        return e = e === u ? e : X(e), G(t, e);
      }
      function Bh(t, e) {
        if (typeof t != "function")
          throw new pe(y);
        return e = e == null ? 0 : St(X(e), 0), G(function(n) {
          var a = n[e], o = sn(n, 0, e);
          return a && rn(o, a), ae(t, this, o);
        });
      }
      function $h(t, e, n) {
        var a = true, o = true;
        if (typeof t != "function")
          throw new pe(y);
        return yt(n) && (a = "leading" in n ? !!n.leading : a, o = "trailing" in n ? !!n.trailing : o), Al(t, e, {
          leading: a,
          maxWait: e,
          trailing: o
        });
      }
      function Fh(t) {
        return wl(t, 1);
      }
      function Wh(t, e) {
        return La(ba(e), t);
      }
      function Uh() {
        if (!arguments.length)
          return [];
        var t = arguments[0];
        return Y(t) ? t : [t];
      }
      function Ph(t) {
        return ye(t, B);
      }
      function Yh(t, e) {
        return e = typeof e == "function" ? e : u, ye(t, B, e);
      }
      function Vh(t) {
        return ye(t, x | B);
      }
      function Xh(t, e) {
        return e = typeof e == "function" ? e : u, ye(t, x | B, e);
      }
      function qh(t, e) {
        return e == null || ho(t, e, Ct(e));
      }
      function Ae(t, e) {
        return t === e || t !== t && e !== e;
      }
      var Kh = lu(oa), Gh = lu(function(t, e) {
        return t >= e;
      }), An = _o(function() {
        return arguments;
      }()) ? _o : function(t) {
        return mt(t) && at.call(t, "callee") && !ao.call(t, "callee");
      }, Y = m.isArray, Hh = Fi ? ie(Fi) : uv;
      function Zt(t) {
        return t != null && yu(t.length) && !He(t);
      }
      function bt(t) {
        return mt(t) && Zt(t);
      }
      function Zh(t) {
        return t === true || t === false || mt(t) && Ut(t) == Ue;
      }
      var fn = ff || Xa, Qh = Wi ? ie(Wi) : av;
      function Jh(t) {
        return mt(t) && t.nodeType === 1 && !xr(t);
      }
      function tp(t) {
        if (t == null)
          return true;
        if (Zt(t) && (Y(t) || typeof t == "string" || typeof t.splice == "function" || fn(t) || Vn(t) || An(t)))
          return !t.length;
        var e = $t(t);
        if (e == Xt || e == qt)
          return !t.size;
        if (_r(t))
          return !sa(t).length;
        for (var n in t)
          if (at.call(t, n))
            return false;
        return true;
      }
      function ep(t, e) {
        return yr(t, e);
      }
      function np(t, e, n) {
        n = typeof n == "function" ? n : u;
        var a = n ? n(t, e) : u;
        return a === u ? yr(t, e, u, n) : !!a;
      }
      function ka(t) {
        if (!mt(t))
          return false;
        var e = Ut(t);
        return e == kt || e == In || typeof t.message == "string" && typeof t.name == "string" && !xr(t);
      }
      function rp(t) {
        return typeof t == "number" && oo(t);
      }
      function He(t) {
        if (!yt(t))
          return false;
        var e = Ut(t);
        return e == hn || e == jr || e == ne || e == Er;
      }
      function Il(t) {
        return typeof t == "number" && t == X(t);
      }
      function yu(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= jt;
      }
      function yt(t) {
        var e = typeof t;
        return t != null && (e == "object" || e == "function");
      }
      function mt(t) {
        return t != null && typeof t == "object";
      }
      var Ol = Ui ? ie(Ui) : ov;
      function up(t, e) {
        return t === e || ca(t, e, Aa(e));
      }
      function ap(t, e, n) {
        return n = typeof n == "function" ? n : u, ca(t, e, Aa(e), n);
      }
      function ip(t) {
        return jl(t) && t != +t;
      }
      function op(t) {
        if (Yv(t))
          throw new P(d);
        return wo(t);
      }
      function lp(t) {
        return t === null;
      }
      function cp(t) {
        return t == null;
      }
      function jl(t) {
        return typeof t == "number" || mt(t) && Ut(t) == pn;
      }
      function xr(t) {
        if (!mt(t) || Ut(t) != At)
          return false;
        var e = Yr(t);
        if (e === null)
          return true;
        var n = at.call(e, "constructor") && e.constructor;
        return typeof n == "function" && n instanceof n && Fr.call(n) == uf;
      }
      var Ma = Pi ? ie(Pi) : lv;
      function sp(t) {
        return Il(t) && t >= -jt && t <= jt;
      }
      var El = Yi ? ie(Yi) : cv;
      function mu(t) {
        return typeof t == "string" || !Y(t) && mt(t) && Ut(t) == tn;
      }
      function le(t) {
        return typeof t == "symbol" || mt(t) && Ut(t) == jn;
      }
      var Vn = Vi ? ie(Vi) : sv;
      function fp(t) {
        return t === u;
      }
      function vp(t) {
        return mt(t) && $t(t) == Kt;
      }
      function dp(t) {
        return mt(t) && Ut(t) == en;
      }
      var hp = lu(fa), pp = lu(function(t, e) {
        return t <= e;
      });
      function Nl(t) {
        if (!t)
          return [];
        if (Zt(t))
          return mu(t) ? Re(t) : Ht(t);
        if (cr && t[cr])
          return Xs(t[cr]());
        var e = $t(t), n = e == Xt ? Qu : e == qt ? Mr : Xn;
        return n(t);
      }
      function Ze(t) {
        if (!t)
          return t === 0 ? t : 0;
        if (t = _e(t), t === Ot || t === -Ot) {
          var e = t < 0 ? -1 : 1;
          return e * tt;
        }
        return t === t ? t : 0;
      }
      function X(t) {
        var e = Ze(t), n = e % 1;
        return e === e ? n ? e - n : e : 0;
      }
      function Tl(t) {
        return t ? xn(X(t), 0, Et) : 0;
      }
      function _e(t) {
        if (typeof t == "number")
          return t;
        if (le(t))
          return Ee;
        if (yt(t)) {
          var e = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = yt(e) ? e + "" : e;
        }
        if (typeof t != "string")
          return t === 0 ? t : +t;
        t = Zi(t);
        var n = Gc.test(t);
        return n || Zc.test(t) ? Os(t.slice(2), n ? 2 : 8) : Kc.test(t) ? Ee : +t;
      }
      function zl(t) {
        return Be(t, Qt(t));
      }
      function gp(t) {
        return t ? xn(X(t), -jt, jt) : t === 0 ? t : 0;
      }
      function ut(t) {
        return t == null ? "" : oe(t);
      }
      var yp = Un(function(t, e) {
        if (_r(e) || Zt(e)) {
          Be(e, Ct(e), t);
          return;
        }
        for (var n in e)
          at.call(e, n) && hr(t, n, e[n]);
      }), Ll = Un(function(t, e) {
        Be(e, Qt(e), t);
      }), bu = Un(function(t, e, n, a) {
        Be(e, Qt(e), t, a);
      }), mp = Un(function(t, e, n, a) {
        Be(e, Ct(e), t, a);
      }), bp = Ke(ua);
      function _p(t, e) {
        var n = Wn(t);
        return e == null ? n : vo(n, e);
      }
      var wp = G(function(t, e) {
        t = st(t);
        var n = -1, a = e.length, o = a > 2 ? e[2] : u;
        for (o && Pt(e[0], e[1], o) && (a = 1); ++n < a; )
          for (var c = e[n], f = Qt(c), h2 = -1, g = f.length; ++h2 < g; ) {
            var R = f[h2], A = t[R];
            (A === u || Ae(A, Bn[R]) && !at.call(t, R)) && (t[R] = c[R]);
          }
        return t;
      }), xp = G(function(t) {
        return t.push(u, Qo), ae(kl, u, t);
      });
      function Sp(t, e) {
        return qi(t, M(e, 3), Me);
      }
      function Rp(t, e) {
        return qi(t, M(e, 3), ia);
      }
      function Dp(t, e) {
        return t == null ? t : aa(t, M(e, 3), Qt);
      }
      function Ap(t, e) {
        return t == null ? t : mo(t, M(e, 3), Qt);
      }
      function Cp(t, e) {
        return t && Me(t, M(e, 3));
      }
      function Ip(t, e) {
        return t && ia(t, M(e, 3));
      }
      function Op(t) {
        return t == null ? [] : tu(t, Ct(t));
      }
      function jp(t) {
        return t == null ? [] : tu(t, Qt(t));
      }
      function Ba(t, e, n) {
        var a = t == null ? u : Sn(t, e);
        return a === u ? n : a;
      }
      function Ep(t, e) {
        return t != null && el(t, e, tv);
      }
      function $a(t, e) {
        return t != null && el(t, e, ev);
      }
      var Np = qo(function(t, e, n) {
        e != null && typeof e.toString != "function" && (e = Wr.call(e)), t[e] = n;
      }, Wa(Jt)), Tp = qo(function(t, e, n) {
        e != null && typeof e.toString != "function" && (e = Wr.call(e)), at.call(t, e) ? t[e].push(n) : t[e] = [n];
      }, M), zp = G(gr);
      function Ct(t) {
        return Zt(t) ? so(t) : sa(t);
      }
      function Qt(t) {
        return Zt(t) ? so(t, true) : fv(t);
      }
      function Lp(t, e) {
        var n = {};
        return e = M(e, 3), Me(t, function(a, o, c) {
          Xe(n, e(a, o, c), a);
        }), n;
      }
      function kp(t, e) {
        var n = {};
        return e = M(e, 3), Me(t, function(a, o, c) {
          Xe(n, o, e(a, o, c));
        }), n;
      }
      var Mp = Un(function(t, e, n) {
        eu(t, e, n);
      }), kl = Un(function(t, e, n, a) {
        eu(t, e, n, a);
      }), Bp = Ke(function(t, e) {
        var n = {};
        if (t == null)
          return n;
        var a = false;
        e = gt(e, function(c) {
          return c = cn(c, t), a || (a = c.length > 1), c;
        }), Be(t, Ra(t), n), a && (n = ye(n, x | j | B, Nv));
        for (var o = e.length; o--; )
          ga(n, e[o]);
        return n;
      });
      function $p(t, e) {
        return Ml(t, gu(M(e)));
      }
      var Fp = Ke(function(t, e) {
        return t == null ? {} : dv(t, e);
      });
      function Ml(t, e) {
        if (t == null)
          return {};
        var n = gt(Ra(t), function(a) {
          return [a];
        });
        return e = M(e), Io(t, n, function(a, o) {
          return e(a, o[0]);
        });
      }
      function Wp(t, e, n) {
        e = cn(e, t);
        var a = -1, o = e.length;
        for (o || (o = 1, t = u); ++a < o; ) {
          var c = t == null ? u : t[$e(e[a])];
          c === u && (a = o, c = n), t = He(c) ? c.call(t) : c;
        }
        return t;
      }
      function Up(t, e, n) {
        return t == null ? t : mr(t, e, n);
      }
      function Pp(t, e, n, a) {
        return a = typeof a == "function" ? a : u, t == null ? t : mr(t, e, n, a);
      }
      var Bl = Ho(Ct), $l = Ho(Qt);
      function Yp(t, e, n) {
        var a = Y(t), o = a || fn(t) || Vn(t);
        if (e = M(e, 4), n == null) {
          var c = t && t.constructor;
          o ? n = a ? new c() : [] : yt(t) ? n = He(c) ? Wn(Yr(t)) : {} : n = {};
        }
        return (o ? he : Me)(t, function(f, h2, g) {
          return e(n, f, h2, g);
        }), n;
      }
      function Vp(t, e) {
        return t == null ? true : ga(t, e);
      }
      function Xp(t, e, n) {
        return t == null ? t : To(t, e, ba(n));
      }
      function qp(t, e, n, a) {
        return a = typeof a == "function" ? a : u, t == null ? t : To(t, e, ba(n), a);
      }
      function Xn(t) {
        return t == null ? [] : Zu(t, Ct(t));
      }
      function Kp(t) {
        return t == null ? [] : Zu(t, Qt(t));
      }
      function Gp(t, e, n) {
        return n === u && (n = e, e = u), n !== u && (n = _e(n), n = n === n ? n : 0), e !== u && (e = _e(e), e = e === e ? e : 0), xn(_e(t), e, n);
      }
      function Hp(t, e, n) {
        return e = Ze(e), n === u ? (n = e, e = 0) : n = Ze(n), t = _e(t), nv(t, e, n);
      }
      function Zp(t, e, n) {
        if (n && typeof n != "boolean" && Pt(t, e, n) && (e = n = u), n === u && (typeof e == "boolean" ? (n = e, e = u) : typeof t == "boolean" && (n = t, t = u)), t === u && e === u ? (t = 0, e = 1) : (t = Ze(t), e === u ? (e = t, t = 0) : e = Ze(e)), t > e) {
          var a = t;
          t = e, e = a;
        }
        if (n || t % 1 || e % 1) {
          var o = lo();
          return Bt(t + o * (e - t + Is("1e-" + ((o + "").length - 1))), e);
        }
        return da(t, e);
      }
      var Qp = Pn(function(t, e, n) {
        return e = e.toLowerCase(), t + (n ? Fl(e) : e);
      });
      function Fl(t) {
        return Fa(ut(t).toLowerCase());
      }
      function Wl(t) {
        return t = ut(t), t && t.replace(Jc, Ws).replace(ms, "");
      }
      function Jp(t, e, n) {
        t = ut(t), e = oe(e);
        var a = t.length;
        n = n === u ? a : xn(X(n), 0, a);
        var o = n;
        return n -= e.length, n >= 0 && t.slice(n, o) == e;
      }
      function tg(t) {
        return t = ut(t), t && Pe.test(t) ? t.replace(xe, Us) : t;
      }
      function eg(t) {
        return t = ut(t), t && $c.test(t) ? t.replace(Lu, "\\$&") : t;
      }
      var ng = Pn(function(t, e, n) {
        return t + (n ? "-" : "") + e.toLowerCase();
      }), rg = Pn(function(t, e, n) {
        return t + (n ? " " : "") + e.toLowerCase();
      }), ug = Yo("toLowerCase");
      function ag(t, e, n) {
        t = ut(t), e = X(e);
        var a = e ? kn(t) : 0;
        if (!e || a >= e)
          return t;
        var o = (e - a) / 2;
        return ou(Kr(o), n) + t + ou(qr(o), n);
      }
      function ig(t, e, n) {
        t = ut(t), e = X(e);
        var a = e ? kn(t) : 0;
        return e && a < e ? t + ou(e - a, n) : t;
      }
      function og(t, e, n) {
        t = ut(t), e = X(e);
        var a = e ? kn(t) : 0;
        return e && a < e ? ou(e - a, n) + t : t;
      }
      function lg(t, e, n) {
        return n || e == null ? e = 0 : e && (e = +e), pf(ut(t).replace(ku, ""), e || 0);
      }
      function cg(t, e, n) {
        return (n ? Pt(t, e, n) : e === u) ? e = 1 : e = X(e), ha(ut(t), e);
      }
      function sg() {
        var t = arguments, e = ut(t[0]);
        return t.length < 3 ? e : e.replace(t[1], t[2]);
      }
      var fg = Pn(function(t, e, n) {
        return t + (n ? "_" : "") + e.toLowerCase();
      });
      function vg(t, e, n) {
        return n && typeof n != "number" && Pt(t, e, n) && (e = n = u), n = n === u ? Et : n >>> 0, n ? (t = ut(t), t && (typeof e == "string" || e != null && !Ma(e)) && (e = oe(e), !e && Ln(t)) ? sn(Re(t), 0, n) : t.split(e, n)) : [];
      }
      var dg = Pn(function(t, e, n) {
        return t + (n ? " " : "") + Fa(e);
      });
      function hg(t, e, n) {
        return t = ut(t), n = n == null ? 0 : xn(X(n), 0, t.length), e = oe(e), t.slice(n, n + e.length) == e;
      }
      function pg(t, e, n) {
        var a = l.templateSettings;
        n && Pt(t, e, n) && (e = u), t = ut(t), e = bu({}, e, a, Zo);
        var o = bu({}, e.imports, a.imports, Zo), c = Ct(o), f = Zu(o, c), h2, g, R = 0, A = e.interpolate || Nr, C = "__p += '", I = Ju(
          (e.escape || Nr).source + "|" + A.source + "|" + (A === Le ? qc : Nr).source + "|" + (e.evaluate || Nr).source + "|$",
          "g"
        ), T = "//# sourceURL=" + (at.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ss + "]") + `
`;
        t.replace(I, function(W, H, J, ce, Yt, se) {
          return J || (J = ce), C += t.slice(R, se).replace(ts, Ps), H && (h2 = true, C += `' +
__e(` + H + `) +
'`), Yt && (g = true, C += `';
` + Yt + `;
__p += '`), J && (C += `' +
((__t = (` + J + `)) == null ? '' : __t) +
'`), R = se + W.length, W;
        }), C += `';
`;
        var F = at.call(e, "variable") && e.variable;
        if (!F)
          C = `with (obj) {
` + C + `
}
`;
        else if (Vc.test(F))
          throw new P(b);
        C = (g ? C.replace(q, "") : C).replace(Wt, "$1").replace(Gt, "$1;"), C = "function(" + (F || "obj") + `) {
` + (F ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (h2 ? ", __e = _.escape" : "") + (g ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + C + `return __p
}`;
        var K = Pl(function() {
          return nt(c, T + "return " + C).apply(u, f);
        });
        if (K.source = C, ka(K))
          throw K;
        return K;
      }
      function gg(t) {
        return ut(t).toLowerCase();
      }
      function yg(t) {
        return ut(t).toUpperCase();
      }
      function mg(t, e, n) {
        if (t = ut(t), t && (n || e === u))
          return Zi(t);
        if (!t || !(e = oe(e)))
          return t;
        var a = Re(t), o = Re(e), c = Qi(a, o), f = Ji(a, o) + 1;
        return sn(a, c, f).join("");
      }
      function bg(t, e, n) {
        if (t = ut(t), t && (n || e === u))
          return t.slice(0, eo(t) + 1);
        if (!t || !(e = oe(e)))
          return t;
        var a = Re(t), o = Ji(a, Re(e)) + 1;
        return sn(a, 0, o).join("");
      }
      function _g(t, e, n) {
        if (t = ut(t), t && (n || e === u))
          return t.replace(ku, "");
        if (!t || !(e = oe(e)))
          return t;
        var a = Re(t), o = Qi(a, Re(e));
        return sn(a, o).join("");
      }
      function wg(t, e) {
        var n = ee, a = wt;
        if (yt(e)) {
          var o = "separator" in e ? e.separator : o;
          n = "length" in e ? X(e.length) : n, a = "omission" in e ? oe(e.omission) : a;
        }
        t = ut(t);
        var c = t.length;
        if (Ln(t)) {
          var f = Re(t);
          c = f.length;
        }
        if (n >= c)
          return t;
        var h2 = n - kn(a);
        if (h2 < 1)
          return a;
        var g = f ? sn(f, 0, h2).join("") : t.slice(0, h2);
        if (o === u)
          return g + a;
        if (f && (h2 += g.length - h2), Ma(o)) {
          if (t.slice(h2).search(o)) {
            var R, A = g;
            for (o.global || (o = Ju(o.source, ut(bi.exec(o)) + "g")), o.lastIndex = 0; R = o.exec(A); )
              var C = R.index;
            g = g.slice(0, C === u ? h2 : C);
          }
        } else if (t.indexOf(oe(o), h2) != h2) {
          var I = g.lastIndexOf(o);
          I > -1 && (g = g.slice(0, I));
        }
        return g + a;
      }
      function xg(t) {
        return t = ut(t), t && ze.test(t) ? t.replace(Mt, Hs) : t;
      }
      var Sg = Pn(function(t, e, n) {
        return t + (n ? " " : "") + e.toUpperCase();
      }), Fa = Yo("toUpperCase");
      function Ul(t, e, n) {
        return t = ut(t), e = n ? u : e, e === u ? Vs(t) ? Js(t) : ks(t) : t.match(e) || [];
      }
      var Pl = G(function(t, e) {
        try {
          return ae(t, u, e);
        } catch (n) {
          return ka(n) ? n : new P(n);
        }
      }), Rg = Ke(function(t, e) {
        return he(e, function(n) {
          n = $e(n), Xe(t, n, za(t[n], t));
        }), t;
      });
      function Dg(t) {
        var e = t == null ? 0 : t.length, n = M();
        return t = e ? gt(t, function(a) {
          if (typeof a[1] != "function")
            throw new pe(y);
          return [n(a[0]), a[1]];
        }) : [], G(function(a) {
          for (var o = -1; ++o < e; ) {
            var c = t[o];
            if (ae(c[0], this, a))
              return ae(c[1], this, a);
          }
        });
      }
      function Ag(t) {
        return Zf(ye(t, x));
      }
      function Wa(t) {
        return function() {
          return t;
        };
      }
      function Cg(t, e) {
        return t == null || t !== t ? e : t;
      }
      var Ig = Xo(), Og = Xo(true);
      function Jt(t) {
        return t;
      }
      function Ua(t) {
        return xo(typeof t == "function" ? t : ye(t, x));
      }
      function jg(t) {
        return Ro(ye(t, x));
      }
      function Eg(t, e) {
        return Do(t, ye(e, x));
      }
      var Ng = G(function(t, e) {
        return function(n) {
          return gr(n, t, e);
        };
      }), Tg = G(function(t, e) {
        return function(n) {
          return gr(t, n, e);
        };
      });
      function Pa(t, e, n) {
        var a = Ct(e), o = tu(e, a);
        n == null && !(yt(e) && (o.length || !a.length)) && (n = e, e = t, t = this, o = tu(e, Ct(e)));
        var c = !(yt(n) && "chain" in n) || !!n.chain, f = He(t);
        return he(o, function(h2) {
          var g = e[h2];
          t[h2] = g, f && (t.prototype[h2] = function() {
            var R = this.__chain__;
            if (c || R) {
              var A = t(this.__wrapped__), C = A.__actions__ = Ht(this.__actions__);
              return C.push({ func: g, args: arguments, thisArg: t }), A.__chain__ = R, A;
            }
            return g.apply(t, rn([this.value()], arguments));
          });
        }), t;
      }
      function zg() {
        return Tt._ === this && (Tt._ = af), this;
      }
      function Ya() {
      }
      function Lg(t) {
        return t = X(t), G(function(e) {
          return Ao(e, t);
        });
      }
      var kg = wa(gt), Mg = wa(Xi), Bg = wa(Xu);
      function Yl(t) {
        return Ia(t) ? qu($e(t)) : hv(t);
      }
      function $g(t) {
        return function(e) {
          return t == null ? u : Sn(t, e);
        };
      }
      var Fg = Ko(), Wg = Ko(true);
      function Va() {
        return [];
      }
      function Xa() {
        return false;
      }
      function Ug() {
        return {};
      }
      function Pg() {
        return "";
      }
      function Yg() {
        return true;
      }
      function Vg(t, e) {
        if (t = X(t), t < 1 || t > jt)
          return [];
        var n = Et, a = Bt(t, Et);
        e = M(e), t -= Et;
        for (var o = Hu(a, e); ++n < t; )
          e(n);
        return o;
      }
      function Xg(t) {
        return Y(t) ? gt(t, $e) : le(t) ? [t] : Ht(sl(ut(t)));
      }
      function qg(t) {
        var e = ++rf;
        return ut(t) + e;
      }
      var Kg = iu(function(t, e) {
        return t + e;
      }, 0), Gg = xa("ceil"), Hg = iu(function(t, e) {
        return t / e;
      }, 1), Zg = xa("floor");
      function Qg(t) {
        return t && t.length ? Jr(t, Jt, oa) : u;
      }
      function Jg(t, e) {
        return t && t.length ? Jr(t, M(e, 2), oa) : u;
      }
      function t0(t) {
        return Gi(t, Jt);
      }
      function e0(t, e) {
        return Gi(t, M(e, 2));
      }
      function n0(t) {
        return t && t.length ? Jr(t, Jt, fa) : u;
      }
      function r0(t, e) {
        return t && t.length ? Jr(t, M(e, 2), fa) : u;
      }
      var u0 = iu(function(t, e) {
        return t * e;
      }, 1), a0 = xa("round"), i0 = iu(function(t, e) {
        return t - e;
      }, 0);
      function o0(t) {
        return t && t.length ? Gu(t, Jt) : 0;
      }
      function l0(t, e) {
        return t && t.length ? Gu(t, M(e, 2)) : 0;
      }
      return l.after = jh, l.ary = wl, l.assign = yp, l.assignIn = Ll, l.assignInWith = bu, l.assignWith = mp, l.at = bp, l.before = xl, l.bind = za, l.bindAll = Rg, l.bindKey = Sl, l.castArray = Uh, l.chain = ml, l.chunk = Zv, l.compact = Qv, l.concat = Jv, l.cond = Dg, l.conforms = Ag, l.constant = Wa, l.countBy = oh, l.create = _p, l.curry = Rl, l.curryRight = Dl, l.debounce = Al, l.defaults = wp, l.defaultsDeep = xp, l.defer = Eh, l.delay = Nh, l.difference = td, l.differenceBy = ed, l.differenceWith = nd, l.drop = rd, l.dropRight = ud, l.dropRightWhile = ad, l.dropWhile = id, l.fill = od, l.filter = ch, l.flatMap = vh, l.flatMapDeep = dh, l.flatMapDepth = hh, l.flatten = hl, l.flattenDeep = ld, l.flattenDepth = cd, l.flip = Th, l.flow = Ig, l.flowRight = Og, l.fromPairs = sd, l.functions = Op, l.functionsIn = jp, l.groupBy = ph, l.initial = vd, l.intersection = dd, l.intersectionBy = hd, l.intersectionWith = pd, l.invert = Np, l.invertBy = Tp, l.invokeMap = yh, l.iteratee = Ua, l.keyBy = mh, l.keys = Ct, l.keysIn = Qt, l.map = du, l.mapKeys = Lp, l.mapValues = kp, l.matches = jg, l.matchesProperty = Eg, l.memoize = pu, l.merge = Mp, l.mergeWith = kl, l.method = Ng, l.methodOf = Tg, l.mixin = Pa, l.negate = gu, l.nthArg = Lg, l.omit = Bp, l.omitBy = $p, l.once = zh, l.orderBy = bh, l.over = kg, l.overArgs = Lh, l.overEvery = Mg, l.overSome = Bg, l.partial = La, l.partialRight = Cl, l.partition = _h, l.pick = Fp, l.pickBy = Ml, l.property = Yl, l.propertyOf = $g, l.pull = bd, l.pullAll = gl, l.pullAllBy = _d, l.pullAllWith = wd, l.pullAt = xd, l.range = Fg, l.rangeRight = Wg, l.rearg = kh, l.reject = Sh, l.remove = Sd, l.rest = Mh, l.reverse = Na, l.sampleSize = Dh, l.set = Up, l.setWith = Pp, l.shuffle = Ah, l.slice = Rd, l.sortBy = Oh, l.sortedUniq = Ed, l.sortedUniqBy = Nd, l.split = vg, l.spread = Bh, l.tail = Td, l.take = zd, l.takeRight = Ld, l.takeRightWhile = kd, l.takeWhile = Md, l.tap = Qd, l.throttle = $h, l.thru = vu, l.toArray = Nl, l.toPairs = Bl, l.toPairsIn = $l, l.toPath = Xg, l.toPlainObject = zl, l.transform = Yp, l.unary = Fh, l.union = Bd, l.unionBy = $d, l.unionWith = Fd, l.uniq = Wd, l.uniqBy = Ud, l.uniqWith = Pd, l.unset = Vp, l.unzip = Ta, l.unzipWith = yl, l.update = Xp, l.updateWith = qp, l.values = Xn, l.valuesIn = Kp, l.without = Yd, l.words = Ul, l.wrap = Wh, l.xor = Vd, l.xorBy = Xd, l.xorWith = qd, l.zip = Kd, l.zipObject = Gd, l.zipObjectDeep = Hd, l.zipWith = Zd, l.entries = Bl, l.entriesIn = $l, l.extend = Ll, l.extendWith = bu, Pa(l, l), l.add = Kg, l.attempt = Pl, l.camelCase = Qp, l.capitalize = Fl, l.ceil = Gg, l.clamp = Gp, l.clone = Ph, l.cloneDeep = Vh, l.cloneDeepWith = Xh, l.cloneWith = Yh, l.conformsTo = qh, l.deburr = Wl, l.defaultTo = Cg, l.divide = Hg, l.endsWith = Jp, l.eq = Ae, l.escape = tg, l.escapeRegExp = eg, l.every = lh, l.find = sh, l.findIndex = vl, l.findKey = Sp, l.findLast = fh, l.findLastIndex = dl, l.findLastKey = Rp, l.floor = Zg, l.forEach = bl, l.forEachRight = _l, l.forIn = Dp, l.forInRight = Ap, l.forOwn = Cp, l.forOwnRight = Ip, l.get = Ba, l.gt = Kh, l.gte = Gh, l.has = Ep, l.hasIn = $a, l.head = pl, l.identity = Jt, l.includes = gh, l.indexOf = fd, l.inRange = Hp, l.invoke = zp, l.isArguments = An, l.isArray = Y, l.isArrayBuffer = Hh, l.isArrayLike = Zt, l.isArrayLikeObject = bt, l.isBoolean = Zh, l.isBuffer = fn, l.isDate = Qh, l.isElement = Jh, l.isEmpty = tp, l.isEqual = ep, l.isEqualWith = np, l.isError = ka, l.isFinite = rp, l.isFunction = He, l.isInteger = Il, l.isLength = yu, l.isMap = Ol, l.isMatch = up, l.isMatchWith = ap, l.isNaN = ip, l.isNative = op, l.isNil = cp, l.isNull = lp, l.isNumber = jl, l.isObject = yt, l.isObjectLike = mt, l.isPlainObject = xr, l.isRegExp = Ma, l.isSafeInteger = sp, l.isSet = El, l.isString = mu, l.isSymbol = le, l.isTypedArray = Vn, l.isUndefined = fp, l.isWeakMap = vp, l.isWeakSet = dp, l.join = gd, l.kebabCase = ng, l.last = be, l.lastIndexOf = yd, l.lowerCase = rg, l.lowerFirst = ug, l.lt = hp, l.lte = pp, l.max = Qg, l.maxBy = Jg, l.mean = t0, l.meanBy = e0, l.min = n0, l.minBy = r0, l.stubArray = Va, l.stubFalse = Xa, l.stubObject = Ug, l.stubString = Pg, l.stubTrue = Yg, l.multiply = u0, l.nth = md, l.noConflict = zg, l.noop = Ya, l.now = hu, l.pad = ag, l.padEnd = ig, l.padStart = og, l.parseInt = lg, l.random = Zp, l.reduce = wh, l.reduceRight = xh, l.repeat = cg, l.replace = sg, l.result = Wp, l.round = a0, l.runInContext = p, l.sample = Rh, l.size = Ch, l.snakeCase = fg, l.some = Ih, l.sortedIndex = Dd, l.sortedIndexBy = Ad, l.sortedIndexOf = Cd, l.sortedLastIndex = Id, l.sortedLastIndexBy = Od, l.sortedLastIndexOf = jd, l.startCase = dg, l.startsWith = hg, l.subtract = i0, l.sum = o0, l.sumBy = l0, l.template = pg, l.times = Vg, l.toFinite = Ze, l.toInteger = X, l.toLength = Tl, l.toLower = gg, l.toNumber = _e, l.toSafeInteger = gp, l.toString = ut, l.toUpper = yg, l.trim = mg, l.trimEnd = bg, l.trimStart = _g, l.truncate = wg, l.unescape = xg, l.uniqueId = qg, l.upperCase = Sg, l.upperFirst = Fa, l.each = bl, l.eachRight = _l, l.first = pl, Pa(l, function() {
        var t = {};
        return Me(l, function(e, n) {
          at.call(l.prototype, n) || (t[n] = e);
        }), t;
      }(), { chain: false }), l.VERSION = s, he(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        l[t].placeholder = l;
      }), he(["drop", "take"], function(t, e) {
        Z.prototype[t] = function(n) {
          n = n === u ? 1 : St(X(n), 0);
          var a = this.__filtered__ && !e ? new Z(this) : this.clone();
          return a.__filtered__ ? a.__takeCount__ = Bt(n, a.__takeCount__) : a.__views__.push({
            size: Bt(n, Et),
            type: t + (a.__dir__ < 0 ? "Right" : "")
          }), a;
        }, Z.prototype[t + "Right"] = function(n) {
          return this.reverse()[t](n).reverse();
        };
      }), he(["filter", "map", "takeWhile"], function(t, e) {
        var n = e + 1, a = n == ve || n == Fe;
        Z.prototype[t] = function(o) {
          var c = this.clone();
          return c.__iteratees__.push({
            iteratee: M(o, 3),
            type: n
          }), c.__filtered__ = c.__filtered__ || a, c;
        };
      }), he(["head", "last"], function(t, e) {
        var n = "take" + (e ? "Right" : "");
        Z.prototype[t] = function() {
          return this[n](1).value()[0];
        };
      }), he(["initial", "tail"], function(t, e) {
        var n = "drop" + (e ? "" : "Right");
        Z.prototype[t] = function() {
          return this.__filtered__ ? new Z(this) : this[n](1);
        };
      }), Z.prototype.compact = function() {
        return this.filter(Jt);
      }, Z.prototype.find = function(t) {
        return this.filter(t).head();
      }, Z.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, Z.prototype.invokeMap = G(function(t, e) {
        return typeof t == "function" ? new Z(this) : this.map(function(n) {
          return gr(n, t, e);
        });
      }), Z.prototype.reject = function(t) {
        return this.filter(gu(M(t)));
      }, Z.prototype.slice = function(t, e) {
        t = X(t);
        var n = this;
        return n.__filtered__ && (t > 0 || e < 0) ? new Z(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== u && (e = X(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n);
      }, Z.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, Z.prototype.toArray = function() {
        return this.take(Et);
      }, Me(Z.prototype, function(t, e) {
        var n = /^(?:filter|find|map|reject)|While$/.test(e), a = /^(?:head|last)$/.test(e), o = l[a ? "take" + (e == "last" ? "Right" : "") : e], c = a || /^find/.test(e);
        o && (l.prototype[e] = function() {
          var f = this.__wrapped__, h2 = a ? [1] : arguments, g = f instanceof Z, R = h2[0], A = g || Y(f), C = function(H) {
            var J = o.apply(l, rn([H], h2));
            return a && I ? J[0] : J;
          };
          A && n && typeof R == "function" && R.length != 1 && (g = A = false);
          var I = this.__chain__, T = !!this.__actions__.length, F = c && !I, K = g && !T;
          if (!c && A) {
            f = K ? f : new Z(this);
            var W = t.apply(f, h2);
            return W.__actions__.push({ func: vu, args: [C], thisArg: u }), new ge(W, I);
          }
          return F && K ? t.apply(this, h2) : (W = this.thru(C), F ? a ? W.value()[0] : W.value() : W);
        });
      }), he(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var e = Br[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", a = /^(?:pop|shift)$/.test(t);
        l.prototype[t] = function() {
          var o = arguments;
          if (a && !this.__chain__) {
            var c = this.value();
            return e.apply(Y(c) ? c : [], o);
          }
          return this[n](function(f) {
            return e.apply(Y(f) ? f : [], o);
          });
        };
      }), Me(Z.prototype, function(t, e) {
        var n = l[e];
        if (n) {
          var a = n.name + "";
          at.call(Fn, a) || (Fn[a] = []), Fn[a].push({ name: e, func: n });
        }
      }), Fn[au(u, Q).name] = [{
        name: "wrapper",
        func: u
      }], Z.prototype.clone = xf, Z.prototype.reverse = Sf, Z.prototype.value = Rf, l.prototype.at = Jd, l.prototype.chain = th, l.prototype.commit = eh, l.prototype.next = nh, l.prototype.plant = uh, l.prototype.reverse = ah, l.prototype.toJSON = l.prototype.valueOf = l.prototype.value = ih, l.prototype.first = l.prototype.head, cr && (l.prototype[cr] = rh), l;
    }, Mn = tf();
    mn ? ((mn.exports = Mn)._ = Mn, Uu._ = Mn) : Tt._ = Mn;
  }).call(Sr);
})(Fy, Iu);
var Wy = "Droppable";
var Uy = {
  timeout: 25
};
function Py({
  data: r,
  disabled: i,
  id: u,
  resizeObserverConfig: s
}) {
  const v = Eu(Wy), d = hi(), y = shallowRef({ disabled: i.value }), b = shallowRef(false), D = shallowRef(null), _ = shallowRef(null), {
    disabled: S,
    updateMeasurementsFor: x,
    timeout: j
  } = {
    ...Uy,
    ...s
  }, B = computed(() => u.value), L = computed(() => (x == null ? void 0 : x.value) ?? B.value), U = Ar(L), N = Tu({
    callback: () => {
      if (!b.value) {
        b.value = true;
        return;
      }
      _.value != null && clearTimeout(_.value), _.value = setTimeout(() => {
        d.value.measureDroppableContainers(
          Array.isArray(U.value) ? U.value : [U.value]
        ), _.value = null;
      }, j);
    },
    disabled: S || !d.value.active
  }), Q = ($, ct) => {
    N.value && (ct && (N.value.unobserve(ct), b.value = false), $ && N.value.observe($));
  }, [it, lt] = Ru(Q), rt = Ar(computed(() => r == null ? void 0 : r.value));
  watch([it, N], () => {
    !N.value || !it.value || (N.value.disconnect(), b.value = false, N.value.observe(it.value));
  }, { immediate: true }), watch(
    () => u.value,
    ($, ct, ot) => {
      d.value.dispatch({
        type: It.RegisterDroppable,
        element: {
          id: $,
          key: v,
          disabled: i.value,
          node: it,
          rect: D,
          data: rt
        }
      }), ot(() => d.value.dispatch({
        type: It.UnregisterDroppable,
        key: v,
        id: $
      }));
    },
    { immediate: true }
  ), watch([u, v, () => i.value, () => d.value.dispatch], () => {
    i.value !== y.value.disabled && (d.value.dispatch({
      type: It.SetDroppableDisabled,
      id: u.value,
      key: v,
      disabled: i.value
    }), y.value.disabled = i.value);
  });
  const k = computed(() => {
    var $;
    return (($ = d.value.over) == null ? void 0 : $.id) === u.value;
  }), vt = ref(D.value);
  return watch(D, ($, ct, ot) => {
    Iu.isEqual($, ct) || (vt.value = $);
  }), {
    rect: vt,
    isOver: k,
    node: it,
    setNodeRef: lt
  };
}
var Yy = {
  animation: Function,
  children: [Object, Function]
};
var pi = defineComponent((r, {}) => {
  useSlots();
  const i = ref(null), u = ref(null), s = shallowRef(r.children);
  return watch(() => r.children, (v, d, y) => {
    s.value = d;
  }), watch([() => r.animation, () => i.value, () => u.value], () => {
    var v, d;
    if (!u.value)
      return;
    const y = (v = i.value) == null ? void 0 : v.key, b = (d = i.value) == null ? void 0 : d.props.id;
    if (y == null || b == null) {
      i.value = null;
      return;
    }
    Promise.resolve(r.animation(
      b,
      u.value.$el ? u.value.$el : u.value
    )).then(() => {
      i.value = null;
    });
  }, {
    immediate: true
  }), () => (!r.children && !i.value && s.value && (i.value = s.value, s.value = r.children), createVNode(Fragment, null, [r.children, i.value ? cloneVNode(i.value, {
    ref: u
  }) : null]));
});
pi.props = Yy;
pi.name = "AnimationManager";
var Vy = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function Xy() {
  const r = useSlots();
  return createVNode(Dc.Provider, {
    value: vi
  }, {
    default: () => [createVNode(Ic.Provider, {
      value: Vy
    }, {
      default: () => {
        var i;
        return [(i = r.default) == null ? void 0 : i.call(r)];
      }
    })]
  });
}
var qy = {
  position: "fixed",
  touchAction: "none"
};
var Ky = (r) => ii(r) ? "transform 250ms ease" : void 0;
var Gy = {
  as: [Object, Function, String],
  activatorEvent: [Object, Function],
  adjustScale: Boolean,
  className: String,
  id: [String, Number],
  rect: Object,
  style: [String, Object],
  transition: [String, Function],
  transform: Object,
  setRef: [Function, Object]
};
var gi = defineComponent((r, {}) => {
  const i = useSlots();
  return () => {
    const {
      as: u,
      activatorEvent: s,
      adjustScale: v,
      className: d,
      rect: y,
      style: b,
      transform: D,
      transition: _ = Ky
    } = r;
    if (!y)
      return null;
    const S = v ? D : {
      ...D,
      scaleX: 1,
      scaleY: 1
    }, x = {
      ...qy,
      width: y.width + "px",
      height: y.height + "px",
      top: y.top + "px",
      left: y.left + "px",
      transform: Cr.Transform.toString(S),
      transformOrigin: v && s ? L0(s, y) : void 0,
      transition: typeof _ == "function" ? _(s) : _,
      ...b
    };
    return h(u, {
      className: d,
      style: x,
      ref: (j) => {
        r.setRef(j);
      }
    }, {
      default: i.default
    });
  };
});
gi.props = Gy;
gi.name = "PositionedOverlay";
var Hy = (r) => ({ active: i, dragOverlay: u }) => {
  const s = {}, { styles: v, className: d } = r;
  if (v != null && v.active)
    for (const [y, b] of Object.entries(v.active))
      b !== void 0 && (s[y] = i.node.style.getPropertyValue(y), i.node.style.setProperty(y, b));
  if (v != null && v.dragOverlay)
    for (const [y, b] of Object.entries(v.dragOverlay))
      b !== void 0 && u.node.style.setProperty(y, b);
  return d != null && d.active && i.node.classList.add(d.active), d != null && d.dragOverlay && u.node.classList.add(d.dragOverlay), function() {
    for (const [y, b] of Object.entries(s))
      i.node.style.setProperty(y, b);
    d != null && d.active && i.node.classList.remove(d.active);
  };
};
var Zy = ({
  transform: { initial: r, final: i }
}) => [
  {
    transform: Cr.Transform.toString(r)
  },
  {
    transform: Cr.Transform.toString(i)
  }
];
var Qy = {
  duration: 250,
  easing: "ease",
  keyframes: Zy,
  sideEffects: Hy({
    styles: {
      active: {
        opacity: "0"
      }
    }
  })
};
function Jy({
  config: r,
  draggableNodes: i,
  droppableContainers: u,
  measuringConfiguration: s
}) {
  return (v, d) => {
    if (r === null)
      return;
    const y = i.get(v);
    if (!y)
      return;
    const b = y.node;
    if (!b)
      return;
    const D = Sc(d);
    if (!D)
      return;
    const { transform: _ } = Vt(d).getComputedStyle(d), S = lc(_);
    if (!S)
      return;
    const x = typeof r == "function" ? r : tm(r);
    return pc(
      b,
      s.draggable.measure
    ), x({
      active: {
        id: v,
        data: y.data,
        node: b,
        rect: s.draggable.measure(b)
      },
      draggableNodes: i,
      dragOverlay: {
        node: d,
        rect: s.dragOverlay.measure(D)
      },
      droppableContainers: u,
      measuringConfiguration: s,
      transform: S
    });
  };
}
function tm(r) {
  const { duration: i, easing: u, sideEffects: s, keyframes: v } = {
    ...Qy,
    ...r
  };
  return ({ active: d, dragOverlay: y, transform: b, ...D }) => {
    if (!i)
      return;
    const _ = {
      x: y.rect.left - d.rect.left,
      y: y.rect.top - d.rect.top
    }, S = {
      scaleX: b.scaleX !== 1 ? d.rect.width * b.scaleX / y.rect.width : 1,
      scaleY: b.scaleY !== 1 ? d.rect.height * b.scaleY / y.rect.height : 1
    }, x = {
      x: b.x - _.x,
      y: b.y - _.y,
      ...S
    }, j = v({
      ...D,
      active: d,
      dragOverlay: y,
      transform: { initial: b, final: x }
    }), [B] = j, L = j[j.length - 1];
    if (JSON.stringify(B) === JSON.stringify(L))
      return;
    const U = (s == null ? void 0 : s({ active: d, dragOverlay: y, ...D })) || void 0, N = y.node.animate(j, {
      duration: i,
      easing: u,
      fill: "forwards"
    });
    return new Promise((Q) => {
      N.onfinish = () => {
        console.log("onfinish"), U == null || U(), Q();
      };
    });
  };
}
var Qa = 0;
function em(r) {
  const i = ref(Qa);
  return watch(() => r == null ? void 0 : r.value, () => {
    Qa++, i.value = Qa;
  }), i;
}
var nm = {
  adjustScale: {
    type: Boolean,
    default: false
  },
  dropAnimation: {
    type: Object
  },
  style: {
    type: [Object]
  },
  transition: {
    type: [String, Object]
  },
  modifiers: {
    type: Array
  },
  wrapperElement: {
    type: String,
    default: "div"
  },
  className: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 999
  }
};
var Ec = defineComponent((r, {}) => {
  const i = useSlots(), u = jc(), s = di(), v = computed(() => {
    var x;
    return (x = u.value.active) == null ? void 0 : x.id;
  }), d = em(v), y = computed(() => u.value.activeNodeRect), b = si(y), D = ref();
  watch([() => r.dropAnimation, () => u.value.draggableNodes, () => u.value.droppableContainers, () => u.value.measuringConfiguration], (x, j, B) => {
    D.value = Jy({
      config: r.dropAnimation,
      draggableNodes: u.value.draggableNodes,
      droppableContainers: u.value.droppableContainers,
      measuringConfiguration: u.value.measuringConfiguration
    });
  }, {
    immediate: true
  });
  const _ = ref();
  watch([() => u.value.activatorEvent, () => {
    var x;
    return (x = u.value.active) == null ? void 0 : x.id;
  }, () => {
    var x;
    return (x = u.value.active) == null ? void 0 : x.data.value;
  }, () => {
    var x;
    return (x = u.value.active) == null ? void 0 : x.rect;
  }, () => u.value.activeNodeRect, () => u.value.containerNodeRect, () => u.value.dragOverlay.rect, () => {
    var x;
    return (x = u.value.over) == null ? void 0 : x.id;
  }, () => {
    var x;
    return (x = u.value.over) == null ? void 0 : x.rect;
  }, () => {
    var x;
    return (x = u.value.over) == null ? void 0 : x.data.value;
  }, () => {
    var x;
    return (x = u.value.over) == null ? void 0 : x.data.disabled;
  }, () => u.value.dragOverlay.rect, () => u.value.scrollableAncestors, () => u.value.scrollableAncestorRects, () => s.value, () => u.value.windowRect], (x, j, B) => {
    _.value = Ac(r.modifiers, {
      activatorEvent: u.value.activatorEvent,
      active: u.value.active,
      activeNodeRect: u.value.activeNodeRect,
      containerNodeRect: u.value.containerNodeRect,
      draggingNodeRect: u.value.dragOverlay.rect,
      over: u.value.over,
      overlayNodeRect: u.value.dragOverlay.rect,
      scrollableAncestors: u.value.scrollableAncestors,
      scrollableAncestorRects: u.value.scrollableAncestorRects,
      transform: s.value,
      windowRect: u.value.windowRect
    });
  }, {
    immediate: true
  });
  const S = computed(() => !!(u.value.active && d && d.value));
  return () => {
    const x = b.value ? u.value.dragOverlay.setRef : void 0;
    return createVNode(Xy, null, {
      default: () => [createVNode(pi, {
        animation: D.value,
        children: S.value ? createVNode(gi, {
          key: d.value,
          id: u.value.active.id,
          setRef: x,
          as: r.wrapperElement,
          activatorEvent: u.value.activatorEvent,
          adjustScale: r.adjustScale,
          className: r.className,
          transition: r.transition,
          rect: b.value,
          style: {
            zIndex: r.zIndex,
            ...r.style
          },
          transform: _.value
        }, {
          default: i.default
        }) : null
      }, null)]
    });
  };
});
Ec.props = nm;
Ec.name = "DragOverlay";
function Kn(r, i) {
  const u = ref(r());
  return watch(i, () => {
    u.value = r();
  }, { immediate: true }), u;
}
function rm(...r) {
  return (i) => {
    r.forEach((u) => u(i));
  };
}
function um(r) {
  const i = Object.prototype.toString.call(r);
  return i === "[object Window]" || i === "[object global]";
}
function am(r) {
  return "nodeType" in r;
}
function im(r) {
  var i;
  return r ? um(r) ? r : am(r) ? ((i = r.ownerDocument) == null ? void 0 : i.defaultView) ?? window : window : window;
}
var Ja = {};
function om(r, i) {
  return computed(() => {
    if (i)
      return i;
    const u = Ja[r] == null ? 0 : Ja[r] + 1;
    return Ja[r] = u, `${r}-${u}`;
  });
}
function lm(r) {
  return (i, ...u) => u.reduce(
    (s, v) => {
      const d = Object.entries(v);
      for (const [y, b] of d) {
        const D = s[y];
        D != null && (s[y] = D + r * b);
      }
      return s;
    },
    {
      ...i
    }
  );
}
var cm = lm(-1);
function sm(r) {
  if (!r)
    return false;
  const { KeyboardEvent: i } = im(r.target);
  return i && r instanceof i;
}
var Ou = Object.freeze({
  Translate: {
    toString(r) {
      if (!r)
        return;
      const { x: i, y: u } = r;
      return `translate3d(${i ? Math.round(i) : 0}px, ${u ? Math.round(u) : 0}px, 0)`;
    }
  },
  Scale: {
    toString(r) {
      if (!r)
        return;
      const { scaleX: i, scaleY: u } = r;
      return `scaleX(${i}) scaleY(${u})`;
    }
  },
  Transform: {
    toString(r) {
      if (r)
        return [
          Ou.Translate.toString(r),
          Ou.Scale.toString(r)
        ].join(" ");
    }
  },
  Transition: {
    toString({ property: r, duration: i, easing: u }) {
      return `${r} ${i}ms ${u}`;
    }
  }
});
function Nc(r, i, u) {
  const s = r.slice();
  return s.splice(
    u < 0 ? s.length + u : u,
    0,
    s.splice(i, 1)[0]
  ), s;
}
function jm(r, i, u) {
  const s = r.slice();
  return s[i] = r[u], s[u] = r[i], s;
}
function fm(r, i) {
  return r.reduce((u, s, v) => {
    const d = i.get(s);
    return d && (u[v] = d), u;
  }, Array(r.length));
}
function _u(r) {
  return r !== null && r >= 0;
}
function vm(r, i) {
  if (r === i)
    return true;
  if (r.length !== i.length)
    return false;
  for (let u = 0; u < r.length; u++)
    if (r[u] !== i[u])
      return false;
  return true;
}
function dm(r) {
  return typeof r == "boolean" ? {
    draggable: r,
    droppable: r
  } : r;
}
var wu = {
  scaleX: 1,
  scaleY: 1
};
var Em = ({
  rects: r,
  activeNodeRect: i,
  activeIndex: u,
  overIndex: s,
  index: v
}) => {
  const d = r[u] ?? i;
  if (!d)
    return null;
  const y = hm(r, v, u);
  if (v === u) {
    const b = r[s];
    return b ? {
      x: u < s ? b.left + b.width - (d.left + d.width) : b.left - d.left,
      y: 0,
      ...wu
    } : null;
  }
  return v > u && v <= s ? {
    x: -d.width - y,
    y: 0,
    ...wu
  } : v < u && v >= s ? {
    x: d.width + y,
    y: 0,
    ...wu
  } : {
    x: 0,
    y: 0,
    ...wu
  };
};
function hm(r, i, u) {
  const s = r[i], v = r[i - 1], d = r[i + 1];
  return !s || !v && !d ? 0 : u < i ? v ? s.left - (v.left + v.width) : d.left - (s.left + s.width) : d ? d.left - (s.left + s.width) : s.left - (v.left + v.width);
}
var Tc = ({
  rects: r,
  activeIndex: i,
  overIndex: u,
  index: s
}) => {
  const v = Nc(r, u, i), d = r[s], y = v[s];
  return !y || !d ? null : {
    x: y.left - d.left,
    y: y.top - d.top,
    scaleX: y.width / d.width,
    scaleY: y.height / d.height
  };
};
var Nm = ({
  activeIndex: r,
  index: i,
  rects: u,
  overIndex: s
}) => {
  let v, d;
  return i === r && (v = u[i], d = u[s]), i === s && (v = u[i], d = u[r]), !d || !v ? null : {
    x: d.left - v.left,
    y: d.top - v.top,
    scaleX: d.width / v.width,
    scaleY: d.height / v.height
  };
};
var xu = {
  scaleX: 1,
  scaleY: 1
};
var Tm = ({
  activeIndex: r,
  activeNodeRect: i,
  index: u,
  rects: s,
  overIndex: v
}) => {
  const d = s[r] ?? i;
  if (!d)
    return null;
  if (u === r) {
    const b = s[v];
    return b ? {
      x: 0,
      y: r < v ? b.top + b.height - (d.top + d.height) : b.top - d.top,
      ...xu
    } : null;
  }
  const y = pm(s, u, r);
  return u > r && u <= v ? {
    x: 0,
    y: -d.height - y,
    ...xu
  } : u < r && u >= v ? {
    x: 0,
    y: d.height + y,
    ...xu
  } : {
    x: 0,
    y: 0,
    ...xu
  };
};
function pm(r, i, u) {
  const s = r[i], v = r[i - 1], d = r[i + 1];
  return s ? u < i ? v ? s.top - (v.top + v.height) : d ? d.top - (s.top + s.height) : 0 : d ? d.top - (s.top + s.height) : v ? s.top - (v.top + v.height) : 0 : 0;
}
var gm = {
  value: Object
};
var yi = defineComponent((r, {
  slots: i
}) => {
  const u = ref(r.value);
  return watch(() => r.value, () => {
    u.value = r.value;
  }, {
    deep: true
  }), provide("SortableContext", u), () => i.default ? i.default(u.value) : null;
});
yi.props = gm;
yi.name = "SortableProvider";
function zc() {
  return {
    context: inject("SortableContext", ref({
      activeIndex: -1,
      containerId: Lc,
      disableTransforms: false,
      items: [],
      overIndex: -1,
      useDragOverlay: false,
      sortedRects: [],
      strategy: Tc,
      disabled: {
        draggable: false,
        droppable: false
      }
    }))
  };
}
var ym = {
  name: String
};
var mi = defineComponent(() => {
  const r = useSlots(), {
    context: i
  } = zc();
  return () => r.default ? r.default(i) : null;
});
mi.props = ym;
mi.name = "SortableConsumer";
var Lc = "Sortable";
var mm = {
  Provider: yi,
  Consumer: mi
};
var bm = {
  id: String,
  items: {
    type: [Array]
  },
  strategy: {
    type: Function,
    default: Tc
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
var kc = defineComponent((r, {}) => {
  const i = useSlots(), u = jc(), s = om(Lc, r.id), v = computed(() => Boolean(u.value.dragOverlay.rect !== null)), d = computed(() => r.items.map((j) => typeof j == "object" && "id" in j ? j.id : j)), y = computed(() => u.value.active != null), b = computed(() => u.value.active ? d.value.indexOf(u.value.active.id) : -1), D = ref(-1);
  watch(() => {
    var j;
    return (j = u.value.over) == null ? void 0 : j.id;
  }, () => {
    D.value = u.value.over ? d.value.indexOf(u.value.over.id) : -1;
  }, {
    immediate: true
  });
  const _ = ref(d.value), S = computed(() => !vm(d.value, _.value)), x = computed(() => D.value !== -1 && b.value === -1 || S.value);
  return watch([S, d, () => y.value, () => u.value.measureDroppableContainers, () => u.value.measuringScheduled], (j, B, L) => {
    S.value && y.value && !u.value.measuringScheduled && u.value.measureDroppableContainers(d.value);
  }, {
    immediate: true
  }), watchEffect(() => {
    _.value = d.value;
  }), () => {
    const j = dm(r.disabled), B = {
      activeIndex: b.value,
      containerId: s.value,
      disabled: j,
      disableTransforms: x.value,
      items: d.value,
      overIndex: D.value,
      useDragOverlay: v.value,
      sortedRects: fm(d.value, u.value.droppableRects),
      strategy: r.strategy
    };
    return createVNode(mm.Provider, {
      value: B
    }, {
      default: () => {
        var L;
        return [(L = i.default) == null ? void 0 : L.call(i)];
      }
    });
  };
});
kc.props = bm;
kc.name = "SortableContext";
var _m = ({
  id: r,
  items: i,
  activeIndex: u,
  overIndex: s
}) => Nc(i, u, s).indexOf(r);
var wm = ({
  containerId: r,
  isSorting: i,
  wasDragging: u,
  index: s,
  items: v,
  newIndex: d,
  previousItems: y,
  previousContainerId: b,
  transition: D
}) => !D || !u || y !== v && s === d ? false : i ? true : d !== s && r === b;
var xm = {
  duration: 200,
  easing: "ease"
};
var Mc = "transform";
var Sm = Ou.Transition.toString({
  property: Mc,
  duration: 0,
  easing: "linear"
});
var Rm = {
  roleDescription: "sortable"
};
function Dm({ disabled: r, index: i, node: u, rect: s }) {
  const v = ref(null);
  function d(b) {
    v.value = b;
  }
  const y = ref(i.value);
  return watch([r, i, u, s], (b, D, _) => {
    if (r.value && i.value !== y.value && u.value) {
      const S = s.value;
      if (S) {
        const x = Qn(u.value, {
          ignoreTransform: true
        }), j = {
          x: S.left - x.left,
          y: S.top - x.top,
          scaleX: S.width / x.width,
          scaleY: S.height / x.height
        };
        (j.x || j.y) && d(j);
      }
    }
    i.value !== y.value && (y.value = i.value);
  }, { immediate: true }), watch(v, (b, D, _) => {
    v.value && requestAnimationFrame(() => {
      d(null);
    });
  }, { immediate: true }), v;
}
function zm({
  animateLayoutChanges: r = wm,
  attributes: i,
  disabled: u,
  data: s,
  getNewIndex: v = _m,
  id: d,
  strategy: y,
  resizeObserverConfig: b,
  transition: D = xm
}) {
  const { context: _ } = zc(), S = computed(() => Am(
    u,
    _.value.disabled
  )), x = ref(-1);
  watch([() => _.value.items, () => d.value], () => {
    x.value = _.value.items.indexOf(d.value);
  }, { immediate: true });
  const j = computed(
    () => ({ sortable: { containerId: _.value.containerId, index: x.value, items: _.value.items }, ...s })
  ), B = computed(
    () => _.value.items.slice(_.value.items.indexOf(d.value))
  ), L = computed(() => S.value.droppable || false), { rect: U, node: N, isOver: Q, setNodeRef: it } = Py({
    id: d,
    data: j,
    disabled: L,
    resizeObserverConfig: {
      updateMeasurementsFor: B,
      ...b
    }
  }), lt = computed(() => S.value.draggable || false), {
    internalContext: rt,
    attributes: k,
    setNodeRef: vt,
    listeners: $,
    isDragging: ct,
    setActivatorNodeRef: ot,
    transform: ee
  } = $y({
    id: d,
    data: j,
    attributes: {
      ...Rm,
      ...i
    },
    disabled: lt
  }), wt = rm(it, vt), Dt = Kn(() => Boolean(rt.value.active), [() => rt.value.active]), dn = computed(() => Dt.value && !_.value.disableTransforms && _u(_.value.activeIndex) && _u(_.value.overIndex)), ve = computed(() => !_.value.useDragOverlay && ct.value), Jn = computed(() => ve.value && dn.value ? ee.value : null), Fe = computed(() => {
    const pt = y ?? _.value.strategy;
    return dn.value ? Jn.value ?? pt({
      rects: _.value.sortedRects,
      activeNodeRect: rt.value.activeNodeRect,
      activeIndex: _.value.activeIndex,
      overIndex: _.value.overIndex,
      index: x.value
    }) : null;
  }), Ot = ref(-1);
  watch([
    () => _.value.activeIndex,
    () => _.value.overIndex,
    () => _.value.items,
    () => x.value,
    () => d.value
  ], (pt, we, ne) => {
    Ot.value = _u(_.value.activeIndex) && _u(_.value.overIndex) ? v({ id: d.value, items: _.value.items, activeIndex: _.value.activeIndex, overIndex: _.value.overIndex }) : x.value;
  }, { immediate: true });
  const jt = Kn(() => {
    var pt;
    return (pt = rt.value.active) == null ? void 0 : pt.id;
  }, [() => {
    var pt;
    return (pt = rt.value.active) == null ? void 0 : pt.id;
  }]), tt = shallowRef({
    activeId: jt.value,
    items: _.value.items,
    newIndex: Ot.value,
    containerId: _.value.containerId
  }), Ee = computed(() => _.value.items !== tt.value.items), Et = Kn(() => {
    var pt;
    return r({
      active: rt.value.active,
      containerId: _.value.containerId,
      isDragging: ct.value,
      isSorting: Dt.value,
      id: d.value,
      index: x.value,
      items: _.value.items,
      newIndex: tt.value.newIndex,
      previousItems: tt.value.items,
      previousContainerId: tt.value.containerId,
      transition: D,
      wasDragging: ((pt = tt.value) == null ? void 0 : pt.activeId) != null
    });
  }, [
    () => rt.value.active,
    () => _.value.containerId,
    () => ct.value,
    () => Dt.value,
    () => d.value,
    () => x.value,
    () => _.value.items,
    () => tt.value.newIndex,
    () => tt.value.items,
    () => tt.value.containerId,
    () => {
      var pt;
      return (pt = tt.value) == null ? void 0 : pt.activeId;
    }
  ]), We = Dm({
    disabled: Et,
    index: x,
    node: N,
    rect: U
  });
  watch([Dt, Ot, () => _.value.containerId, () => _.value.items], () => {
    Dt.value && tt.value.newIndex !== Ot.value && (tt.value.newIndex = Ot.value), _.value.containerId !== tt.value.containerId && (tt.value.containerId = _.value.containerId), _.value.items !== tt.value.items && (tt.value.items = _.value.items);
  }), watch([jt], (pt, we, ne) => {
    if (jt.value === tt.value.activeId)
      return;
    if (jt.value && !tt.value.activeId) {
      tt.value.activeId = jt.value;
      return;
    }
    const Ue = setTimeout(() => {
      tt.value.activeId = jt.value;
    }, 50);
    ne(() => clearTimeout(Ue));
  });
  const Cn = ref(Ft());
  watch([
    () => We.value,
    () => Ee.value,
    () => tt.value.newIndex,
    () => x.value,
    () => Et.value
  ], () => {
    Cn.value = Ft();
  }, { immediate: true });
  function Ft() {
    if (We.value || Ee.value && tt.value.newIndex === x.value)
      return Sm;
    if (!(ve.value && !sm(rt.value.activatorEvent) || !D) && (Dt.value || Et.value))
      return Ou.Transition.toString({
        ...D,
        property: Mc
      });
  }
  return {
    internalContext: rt,
    context: _,
    attributes: k,
    data: j,
    rect: U,
    index: x,
    newIndex: Ot,
    isOver: Q,
    isSorting: Dt,
    isDragging: ct,
    listeners: $,
    node: N,
    setNodeRef: wt,
    setActivatorNodeRef: ot,
    setDroppableNodeRef: it,
    setDraggableNodeRef: vt,
    transform: We.value ? We : Fe,
    transition: Cn
  };
}
function Am(r, i) {
  return typeof r == "boolean" ? {
    draggable: r,
    droppable: false
  } : {
    draggable: (r == null ? void 0 : r.draggable) ?? i.draggable,
    droppable: (r == null ? void 0 : r.droppable) ?? i.droppable
  };
}
function ju(r) {
  if (!r)
    return false;
  const i = r.data.current;
  return !!(i && "sortable" in i && typeof i.sortable == "object" && "containerId" in i.sortable && "items" in i.sortable && "index" in i.sortable);
}
var Cm = [
  et.Down,
  et.Right,
  et.Up,
  et.Left
];
var Lm = (r, {
  context: {
    active: i,
    collisionRect: u,
    droppableRects: s,
    droppableContainers: v,
    over: d,
    scrollableAncestors: y
  }
}) => {
  if (Cm.includes(r.code)) {
    if (r.preventDefault(), !(i != null && i.value) || !u)
      return;
    const b = [];
    v.getEnabled().forEach((S) => {
      if (!S || S != null && S.disabled)
        return;
      const x = s.get(S.id);
      if (x)
        switch (r.code) {
          case et.Down:
            u.top < x.top && b.push(S);
            break;
          case et.Up:
            u.top > x.top && b.push(S);
            break;
          case et.Left:
            u.left > x.left && b.push(S);
            break;
          case et.Right:
            u.left < x.left && b.push(S);
            break;
        }
    });
    const D = B0({
      active: i.value,
      collisionRect: u,
      droppableRects: s,
      droppableContainers: b,
      pointerCoordinates: null
    });
    let _ = ic(D, "id");
    if (_ === (d == null ? void 0 : d.id) && D.length > 1 && (_ = D[1].id), _ != null) {
      const S = v.get(i.value.id), x = v.get(_), j = x ? s.get(x.id) : null, B = x == null ? void 0 : x.node.current;
      if (B && j && S && x) {
        const U = Nu(B).some(
          (k, vt) => y[vt] !== k
        ), N = Bc(S, x), Q = Im(S, x), it = U || !N ? {
          x: 0,
          y: 0
        } : {
          x: Q ? u.width - j.width : 0,
          y: Q ? u.height - j.height : 0
        }, lt = {
          x: j.left,
          y: j.top
        };
        return it.x && it.y ? lt : cm(lt, it);
      }
    }
  }
};
function Bc(r, i) {
  return !ju(r) || !ju(i) ? false : r.data.current.sortable.containerId === i.data.current.sortable.containerId;
}
function Im(r, i) {
  return !ju(r) || !ju(i) || !Bc(r, i) ? false : r.data.current.sortable.index < i.data.current.sortable.index;
}
export {
  kc as SortableContext,
  Nc as arrayMove,
  jm as arraySwap,
  wm as defaultAnimateLayoutChanges,
  _m as defaultNewIndexGetter,
  ju as hasSortableData,
  Em as horizontalListSortingStrategy,
  Tc as rectSortingStrategy,
  Nm as rectSwappingStrategy,
  Lm as sortableKeyboardCoordinates,
  zm as useSortable,
  Tm as verticalListSortingStrategy
};
/*! Bundled license information:

@dnd-kit-vue/sortable/dist/index.mjs:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=@dnd-kit-vue_sortable.js.map
