import {
  cloneVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  h,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  useSlots,
  watch
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@kousum+vue-resizable@1.0.2_lodash@4.17.21_vue@3.2.47/node_modules/@kousum/vue-resizable/dist/index.mjs
var Ce = [Array, Object, String, Number, Boolean, Function];
var L = Array;
var De = Boolean;
var A = Function;
var I = Number;
var ke = Object;
var se = String;
var Ee = [Array, Object, String, Number];
var Ne = [Array, Object, String, Number];
function Me(e) {
  let t = [];
  return e.map((n) => {
    Array.isArray(n) ? t = [...t, ...n] : t.push(n);
  }), t;
}
function fe(e, t) {
  const n = {};
  return Object.keys(e).forEach((o) => {
    if (t.hasOwnProperty(o))
      if (e[o].hasOwnProperty("type"))
        n[o] = {
          // @ts-ignore
          type: e[o].type,
          default: t[o]
        };
      else {
        const a = typeof t[o] == "object" ? () => t[o] : t[o];
        n[o] = {
          type: e[o],
          default: a
        };
      }
    else
      n[o] = {
        // eslint-disable-next-line no-prototype-builtins
        type: e[o].hasOwnProperty("type") ? (
          // @ts-ignore
          e[o].type
        ) : e[o],
        default: void 0
      };
  }), n;
}
var ge = {
  /*
   * Restricts resizing to a particular axis (default: 'both')
   * 'both' - allows resizing by width or height
   * 'x' - only allows the width to be changed
   * 'y' - only allows the height to be changed
   * 'none' - disables resizing altogether
   * */
  axis: se,
  className: se,
  /*
   * Require that one and only one child be present.
   * */
  children: Ce,
  /*
   * These will be passed wholesale to react-draggable's DraggableCore
   * */
  draggableOpts: ke,
  /*
   * Initial height
   * */
  height: I,
  /*
   * Customize cursor resize handle
   * */
  handle: Me([Ee, A]),
  /*
   * If you change this, be sure to update your css
   * */
  handleSize: L,
  lockAspectRatio: De,
  /*
   * Max X & Y measure
   * */
  maxConstraints: L,
  /*
   * Min X & Y measure
   * */
  minConstraints: L,
  /*
   * Called on stop resize event
   * */
  onResizeStop: A,
  /*
   * Called on start resize event
   * */
  onResizeStart: A,
  /*
   * Called on resize event
   * */
  onResize: A,
  /*
   * Defines which resize handles should be rendered (default: 'se')
   * 's' - South handle (bottom-center)
   * 'w' - West handle (left-center)
   * 'e' - East handle (right-center)
   * 'n' - North handle (top-center)
   * 'sw' - Southwest handle (bottom-left)
   * 'nw' - Northwest handle (top-left)
   * 'se' - Southeast handle (bottom-right)
   * 'ne' - Northeast handle (top-center)
   * */
  resizeHandles: L,
  /*
   * If `transform: scale(n)` is set on the parent, this should be set to `n`.
   * */
  transformScale: I,
  /*
   * Initial width
   */
  width: I
};
function Te(e, t) {
  return t.style && e.props && e.props.style && (t.style = { ...e.props.style, ...t.style }), t.class && e.props && e.props.class && (t.class = `${e.props.class} ${t.class}`), cloneVNode(e, t);
}
var he = [Array, Object, String, Number, Boolean, Function];
var He = Array;
var U = Boolean;
var H = Function;
var $e = Number;
var D = Object;
var k = String;
function pe(e, t) {
  const n = {};
  return Object.keys(e).forEach((o) => {
    if (t.hasOwnProperty(o))
      if (e[o].hasOwnProperty("type"))
        n[o] = {
          // @ts-ignore
          type: e[o].type,
          default: t[o]
        };
      else {
        const a = typeof t[o] == "object" ? () => t[o] : t[o];
        n[o] = {
          type: e[o],
          default: a
        };
      }
    else
      n[o] = {
        // eslint-disable-next-line no-prototype-builtins
        type: e[o].hasOwnProperty("type") ? (
          // @ts-ignore
          e[o].type
        ) : e[o],
        default: void 0
      };
  }), n;
}
function Z(e, t) {
  for (let n = 0, o = e.length; n < o; n++)
    if (t.apply(t, [e[n], n, e]))
      return e[n];
}
function ae(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Function]";
}
function $(e) {
  return typeof e == "number" && !isNaN(e);
}
function x(e) {
  return parseInt(e, 10);
}
var F = ["Moz", "Webkit", "O", "ms"];
function Pe(e = "transform") {
  var t, n;
  if (typeof window > "u")
    return "";
  const o = (n = (t = window.document) == null ? void 0 : t.documentElement) == null ? void 0 : n.style;
  if (!o || e in o)
    return "";
  for (let a = 0; a < F.length; a++)
    if (me(e, F[a]) in o)
      return F[a];
  return "";
}
function me(e, t) {
  return t ? `${t}${Xe(e)}` : e;
}
function Xe(e) {
  let t = "", n = true;
  for (let o = 0; o < e.length; o++)
    n ? (t += e[o].toUpperCase(), n = false) : e[o] === "-" ? n = true : t += e[o];
  return t;
}
var Ye = Pe();
var B = "";
function Oe(e, t) {
  return B || (B = Z(
    [
      "matches",
      "webkitMatchesSelector",
      "mozMatchesSelector",
      "msMatchesSelector",
      "oMatchesSelector"
    ],
    function(n) {
      return ae(e[n]);
    }
  )), ae(e[B]) ? e[B](t) : false;
}
function ie(e, t, n) {
  let o = e;
  do {
    if (Oe(o, t))
      return true;
    if (o === n)
      return false;
    o = o.parentNode;
  } while (o);
  return false;
}
function G(e, t, n, o) {
  if (!e)
    return;
  const a = { capture: true, ...o };
  e.addEventListener ? e.addEventListener(t, n, a) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
}
function M(e, t, n, o) {
  if (!e)
    return;
  const a = { capture: true, ...o };
  e.removeEventListener ? e.removeEventListener(t, n, a) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
}
function Le(e) {
  let t = e.clientHeight;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += x(n.borderTopWidth), t += x(n.borderBottomWidth), t;
}
function Ae(e) {
  let t = e.clientWidth;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += x(n.borderLeftWidth), t += x(n.borderRightWidth), t;
}
function Be(e) {
  let t = e.clientHeight;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= x(n.paddingTop), t -= x(n.paddingBottom), t;
}
function Ve(e) {
  let t = e.clientWidth;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= x(n.paddingLeft), t -= x(n.paddingRight), t;
}
function je(e, t, n) {
  const o = t === t.ownerDocument.body ? { left: 0, top: 0 } : t.getBoundingClientRect(), a = (e.clientX + t.scrollLeft - o.left) / n, l = (e.clientY + t.scrollTop - o.top) / n;
  return { x: a, y: l };
}
function We(e, t) {
  const n = ye(e, t, "px");
  return console.log(e), { [me("transform", Ye)]: n };
}
function Ie(e, t) {
  return ye(e, t, "");
}
function ye({ x: e, y: t }, n, o) {
  let a = `translate(${e}${o},${t}${o})`;
  if (n) {
    const l = `${typeof n.x == "string" ? n.x : n.x + o}`, h2 = `${typeof n.y == "string" ? n.y : n.y + o}`;
    a = `translate(${l}, ${h2})` + a;
  }
  return a;
}
function Ue(e, t) {
  return e.targetTouches && Z(e.targetTouches, (n) => t === n.identifier) || e.changedTouches && Z(e.changedTouches, (n) => t === n.identifier);
}
function Fe(e) {
  if (e.targetTouches && e.targetTouches[0])
    return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0])
    return e.changedTouches[0].identifier;
}
function Ge(e) {
  if (!e)
    return;
  let t = e.getElementById("react-draggable-style-el");
  t || (t = e.createElement("style"), t.type = "text/css", t.id = "react-draggable-style-el", t.innerHTML = `.react-draggable-transparent-selection *::-moz-selection {all: inherit;}
`, t.innerHTML += `.react-draggable-transparent-selection *::selection {all: inherit;}
`, e.getElementsByTagName("head")[0].appendChild(t)), e.body && qe(e.body, "react-draggable-transparent-selection");
}
function le(e) {
  if (e)
    try {
      if (e.body && _e(e.body, "react-draggable-transparent-selection"), e.selection)
        e.selection.empty();
      else {
        const t = (e.defaultView || window).getSelection();
        t && t.type !== "Caret" && t.removeAllRanges();
      }
    } catch {
    }
}
function qe(e, t) {
  e.classList ? e.classList.add(t) : e.class.match(new RegExp(`(?:^|\\s)${t}(?!\\S)`)) || (e.class += ` ${t}`);
}
function _e(e, t) {
  e.classList ? e.classList.remove(t) : e.class = e.class.replace(
    new RegExp(`(?:^|\\s)${t}(?!\\S)`, "g"),
    ""
  );
}
function Je(e, t, n) {
  if (!e.props.bounds)
    return [t, n];
  let { bounds: o } = e.props;
  o = typeof o == "string" ? o : Ke(o);
  const a = ne(e);
  if (typeof o == "string") {
    const { ownerDocument: l } = a, h2 = l.defaultView;
    let p;
    if (o === "parent" ? p = a.parentNode : p = l.querySelector(o), !(p instanceof h2.HTMLElement))
      throw new Error(
        'Bounds selector "' + o + '" could not find an element.'
      );
    const b = p, r = h2.getComputedStyle(a), i = h2.getComputedStyle(b);
    o = {
      left: -a.offsetLeft + x(i.paddingLeft) + x(r.marginLeft),
      top: -a.offsetTop + x(i.paddingTop) + x(r.marginTop),
      right: Ve(b) - Ae(a) - a.offsetLeft + x(i.paddingRight) - x(r.marginRight),
      bottom: Be(b) - Le(a) - a.offsetTop + x(i.paddingBottom) - x(r.marginBottom)
    };
  }
  return $(o.right) && (t = Math.min(t, o.right)), $(o.bottom) && (n = Math.min(n, o.bottom)), $(o.left) && (t = Math.max(t, o.left)), $(o.top) && (n = Math.max(n, o.top)), [t, n];
}
function ce(e, t, n) {
  const o = Math.round(t / e[0]) * e[0], a = Math.round(n / e[1]) * e[1];
  return [o, a];
}
function Qe(e) {
  return e.props.axis === "both" || e.props.axis === "x";
}
function Ze(e) {
  return e.props.axis === "both" || e.props.axis === "y";
}
function q(e, t, n) {
  const o = typeof t == "number" ? Ue(e, t) : null;
  if (typeof t == "number" && !o)
    return null;
  const a = ne(n), l = n.props.offsetParent || a.offsetParent || a.ownerDocument.body;
  return je(
    o || e,
    // @ts-ignore
    l,
    n.props.scale
  );
}
function _(e, t, n) {
  const o = e.exposed.state, a = !$(o.lastX), l = ne(e);
  return a ? {
    node: l,
    deltaX: 0,
    deltaY: 0,
    lastX: t,
    lastY: n,
    x: t,
    y: n
  } : {
    node: l,
    deltaX: t - o.lastX,
    deltaY: n - o.lastY,
    lastX: o.lastX,
    lastY: o.lastY,
    x: t,
    y: n
  };
}
function J(e, t) {
  const n = e.props.scale;
  return {
    node: t.node,
    x: e.exposed.state.x + t.deltaX / n,
    y: e.exposed.state.y + t.deltaY / n,
    deltaX: t.deltaX / n,
    deltaY: t.deltaY / n,
    lastX: e.exposed.state.x,
    lastY: e.exposed.state.y
  };
}
function Ke(e) {
  return {
    left: e.left,
    top: e.top,
    right: e.right,
    bottom: e.bottom
  };
}
function ne(e) {
  var t;
  const n = (t = e == null ? void 0 : e.ctx) == null ? void 0 : t.$el;
  if (!n)
    throw new Error("<DraggableCore>: Unmounted during event!");
  return n;
}
function et(...e) {
}
var R = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};
var C = R.mouse;
var tt = {
  children: he,
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: U,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: U,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: U,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: H,
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: He,
  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: k,
  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: k,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: D,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: H,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: H,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: H,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: H,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: $e,
  /**
   * These properties should be defined on the child, not here.
   */
  className: k,
  style: D,
  transform: D
};
var be = {
  allowAnyClick: false,
  // by default only accept left click
  disabled: false,
  enableUserSelectHack: true,
  onStart: function() {
  },
  onDrag: function() {
  },
  onStop: function() {
  },
  onMouseDown: function() {
  },
  scale: 1
};
var Se = pe(tt, be);
var X = defineComponent((e, {
  expose: t
}) => {
  useSlots();
  const n = reactive({
    dragging: false,
    // Used while dragging to determine deltas.
    lastX: NaN,
    lastY: NaN,
    touchIdentifier: void 0
  });
  let o = false;
  const a = getCurrentInstance();
  onMounted(() => {
    var s;
    o = true;
    const d = (s = a == null ? void 0 : a.ctx) == null ? void 0 : s.$el;
    d && G(d, R.touch.start, u, {
      passive: false
    });
  }), onBeforeUnmount(() => {
    o = false;
    const s = l();
    if (s) {
      const {
        ownerDocument: d
      } = s;
      M(d, R.mouse.move, p), M(d, R.touch.move, p), M(d, R.mouse.stop, b), M(d, R.touch.stop, b), M(s, R.touch.start, u, {
        passive: false
      }), e.enableUserSelectHack && le(d);
    }
  });
  function l() {
    var s;
    return ((s = e == null ? void 0 : e.nodeRef) == null ? void 0 : s.value) || // @ts-ignore
    a.ctx.$el;
  }
  const h2 = (s) => {
    if (e.onMouseDown(s), !e.allowAnyClick && typeof s.button == "number" && s.button !== 0)
      return false;
    const d = l();
    if (!d || !d.ownerDocument || !d.ownerDocument.body)
      throw new Error("<DraggableCore> not mounted on DragStart!");
    const {
      ownerDocument: g
    } = d;
    if (e.disabled || !(s.target instanceof g.defaultView.Node) || e.handle && !ie(s.target, e.handle, d) || e.cancel && ie(s.target, e.cancel, d))
      return;
    s.type === "touchstart" && s.preventDefault();
    const m = Fe(s);
    n.touchIdentifier = m;
    const S = q(s, m, a);
    if (S == null)
      return;
    const {
      x: f,
      y
    } = S, w = _(a, f, y);
    et("calling", e.onStart), !(e.onStart(s, w) === false || o === false) && (e.enableUserSelectHack && Ge(g), n.dragging = true, n.lastX = f, n.lastY = y, G(g, C.move, p), G(g, C.stop, b));
  }, p = (s) => {
    const d = q(s, n.touchIdentifier, a);
    if (d == null)
      return;
    let {
      x: g,
      y: m
    } = d;
    if (Array.isArray(e.grid)) {
      let f = g - n.lastX, y = m - n.lastY;
      if ([f, y] = ce(e.grid, f, y), !f && !y)
        return;
      g = n.lastX + f, m = n.lastY + y;
    }
    const S = _(a, g, m);
    if (e.onDrag(s, S) === false || o === false) {
      try {
        b(new MouseEvent("mouseup"));
      } catch {
        const f = document.createEvent("MouseEvents");
        f.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null), b(f);
      }
      return;
    }
    n.lastX = g, n.lastY = m;
  }, b = (s) => {
    if (!n.dragging)
      return;
    const d = q(s, n.touchIdentifier, a);
    if (d == null)
      return;
    let {
      x: g,
      y: m
    } = d;
    if (Array.isArray(e.grid)) {
      let y = g - n.lastX || 0, w = m - n.lastY || 0;
      [y, w] = ce(e.grid, y, w), g = n.lastX + y, m = n.lastY + w;
    }
    const S = _(a, g, m);
    if (e.onStop(s, S) === false || o === false)
      return false;
    const f = l();
    f && e.enableUserSelectHack && le(f.ownerDocument), n.dragging = false, n.lastX = NaN, n.lastY = NaN, f && (M(f.ownerDocument, C.move, p), M(f.ownerDocument, C.stop, b));
  }, r = (s) => (C = R.mouse, h2(s)), i = (s) => (C = R.mouse, b(s)), u = (s) => (C = R.touch, h2(s)), c = (s) => (C = R.touch, b(s));
  return t({
    state: n
  }), () => cloneVNode(e.children, {
    // Note: mouseMove handler is attached to document so it will still function
    // when the user drags quickly and leaves the bounds of the element.
    onMousedown: r,
    onMouseup: i,
    // onTouchStart is added on `componentDidMount` so they can be added with
    // {passive: false}, which allows it to cancel. See
    // https://developers.google.com/web/updates/2017/01/scrolling-intervention
    onTouchend: c
  });
});
X.props = Se;
X.name = "DraggableCore";
X.displayName = "DraggableCore";
function we(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number")
    o += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = we(e[t])) && (o && (o += " "), o += n);
    else
      for (t in e)
        e[t] && (o && (o += " "), o += t);
  return o;
}
function nt() {
  for (var e, t, n = 0, o = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = we(e)) && (o && (o += " "), o += t);
  return o;
}
var ot = {
  // Accepts all props <DraggableCore> accepts.
  ...Se,
  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: k,
  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: he,
  defaultClassName: k,
  defaultClassNameDragging: k,
  defaultClassNameDragged: k,
  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: D,
  positionOffset: D,
  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: D,
  /**
   * These properties should be defined on the child, not here.
   */
  className: k,
  style: D,
  transform: D
};
var rt = {
  ...be,
  axis: "both",
  bounds: false,
  defaultClassName: "react-draggable",
  defaultClassNameDragging: "react-draggable-dragging",
  defaultClassNameDragged: "react-draggable-dragged",
  defaultPosition: {
    x: 0,
    y: 0
  },
  scale: 1
};
var st = pe(ot, rt);
var oe = defineComponent((e, {
  expose: t
}) => {
  useSlots();
  const n = getCurrentInstance(), o = reactive({
    // Whether or not we are currently dragging.
    dragging: false,
    // Whether or not we have been dragged before.
    dragged: false,
    // Current transform x and y.
    x: e.position ? e.position.x : e.defaultPosition.x,
    y: e.position ? e.position.y : e.defaultPosition.y,
    prevPropsPosition: {
      ...e.position
    },
    // Used for compensating for out-of-bounds drags
    slackX: 0,
    slackY: 0,
    // Can only determine if SVG after mounting
    isElementSVG: false
  });
  watch([], () => {
    e.position && !(e.onDrag || e.onStop) && console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
  });
  function a({
    position: r
  }, {
    prevPropsPosition: i
  }) {
    return r && (!i || r.x !== i.x || r.y !== i.y) ? {
      x: r.x,
      y: r.y,
      prevPropsPosition: {
        ...r
      }
    } : null;
  }
  watch(() => e, () => {
    const r = a(e, o);
    r && Object.keys(r).forEach((i) => {
      o[i] = r[i];
    });
  }, {
    deep: true
  }), onMounted(() => {
    typeof window.SVGElement < "u" && l() instanceof window.SVGElement && (o.isElementSVG = true);
  }), onBeforeUnmount(() => {
    o.isElementSVG = false;
  });
  function l() {
    var r;
    return ((r = e == null ? void 0 : e.nodeRef) == null ? void 0 : r.value) || // @ts-ignore
    n.ctx.$el;
  }
  const h2 = (r, i) => {
    if (e.onStart(r, J(n, i)) === false)
      return false;
    o.dragging = true, o.dragged = true;
  }, p = (r, i) => {
    if (!o.dragging)
      return false;
    const u = J(n, i), c = {
      x: u.x,
      y: u.y
    };
    if (e.bounds) {
      const {
        x: s,
        y: d
      } = c;
      c.x += o.slackX, c.y += o.slackY;
      const [g, m] = Je(n, c.x, c.y);
      c.x = g, c.y = m, c.slackX = o.slackX + (s - c.x), c.slackY = o.slackY + (d - c.y), u.x = c.x, u.y = c.y, u.deltaX = c.x - o.x, u.deltaY = c.y - o.y;
    }
    if (e.onDrag(r, u) === false)
      return false;
    c && Object.keys(c).forEach((s) => {
      o[s] = c[s];
    });
  }, b = (r, i) => {
    if (!o.dragging || e.onStop(r, J(n, i)) === false)
      return false;
    const u = {
      dragging: false,
      slackX: 0,
      slackY: 0
    };
    if (Boolean(e.position)) {
      const {
        x: c,
        y: s
      } = e.position;
      u.x = c, u.y = s;
    }
    u && Object.keys(u).forEach((c) => {
      o[c] = u[c];
    });
  };
  return t({
    state: o
  }), () => {
    var r, i;
    const {
      axis: u,
      bounds: c,
      children: s,
      defaultPosition: d,
      defaultClassName: g,
      defaultClassNameDragging: m,
      defaultClassNameDragged: S,
      position: f,
      positionOffset: y,
      scale: w,
      ...z
    } = e;
    let T = {}, E = null;
    const Y = !Boolean(f) || o.dragging, N = f || d, v = {
      // Set left if horizontal drag is enabled
      x: Qe(n) && Y ? o.x : N.x,
      // Set top if vertical drag is enabled
      y: Ze(n) && Y ? o.y : N.y
    };
    o.isElementSVG ? E = Ie(v, y) : T = We(v, y);
    const O = nt(((r = s.props) == null ? void 0 : r.class) || "", g, {
      [m]: o.dragging,
      [S]: o.dragged
    });
    return createVNode(X, mergeProps({
      ...z,
      scale: w,
      onStart: h2,
      onDrag: p,
      onStop: b
    }, {
      children: cloneVNode(s, {
        className: O,
        style: {
          ...(i = s.props) == null ? void 0 : i.style,
          ...T
        },
        transform: E
      })
    }), null);
  };
});
oe.props = st;
oe.name = "Draggable";
oe.v = "Draggable";
var at = ge;
var it = {
  axis: "both",
  handleSize: [20, 20],
  lockAspectRatio: false,
  minConstraints: [20, 20],
  maxConstraints: [1 / 0, 1 / 0],
  resizeHandles: ["se"],
  transformScale: 1
};
var lt = fe(at, it);
var re = defineComponent((e, {
  expose: t
}) => {
  useSlots();
  const n = {};
  let o = null, a = null;
  onMounted(() => {
    l();
  });
  function l() {
    o = a = null;
  }
  function h2(r, i) {
    const {
      minConstraints: u,
      maxConstraints: c,
      lockAspectRatio: s
    } = e;
    if (!u && !c && !s)
      return [r, i];
    if (s) {
      const f = e.width / e.height, y = r - e.width, w = i - e.height;
      Math.abs(y) > Math.abs(w * f) ? i = r / f : r = i * f;
    }
    const [d, g] = [r, i], [m, S] = a || [0, 0];
    return r += m, i += S, u && (r = Math.max(u[0], r), i = Math.max(u[1], i)), c && (r = Math.min(c[0], r), i = Math.min(c[1], i)), a = [m + (d - r), S + (g - i)], [r, i];
  }
  function p(r, i) {
    return (u, {
      node: c,
      deltaX: s,
      deltaY: d
    }) => {
      var N;
      r === "onResizeStart" && l();
      const g = (e.axis === "both" || e.axis === "x") && i !== "n" && i !== "s", m = (e.axis === "both" || e.axis === "y") && i !== "e" && i !== "w";
      if (!g && !m)
        return;
      const S = i[0], f = i[i.length - 1], y = c.getBoundingClientRect();
      if (o != null) {
        if (f === "w") {
          const v = y.left - o.left;
          s += v;
        }
        if (S === "n") {
          const v = y.top - o.top;
          d += v;
        }
      }
      o = y, f === "w" && (s = -s), S === "n" && (d = -d);
      let w = e.width + (g ? s / e.transformScale : 0), z = e.height + (m ? d / e.transformScale : 0);
      [w, z] = h2(w, z);
      const T = w !== e.width || z !== e.height, E = typeof e[r] == "function" ? e[r] : null;
      E && !(r === "onResize" && !T) && ((N = u.persist) == null || N.call(u), E(u, {
        node: c,
        size: {
          width: w,
          height: z
        },
        handle: i
      })), r === "onResizeStop" && l();
    };
  }
  function b(r, i) {
    const {
      handle: u
    } = e;
    if (!u)
      return createVNode("span", {
        class: `react-resizable-handle react-resizable-handle-${r}`,
        ref: i
      }, null);
    if (typeof u == "function")
      return u(r, i);
    const c = typeof u.type == "string", s = {
      ref: i,
      // Add `handleAxis` prop iff this is not a DOM element,
      // otherwise we'll get an unknown property warning
      ...c ? {} : {
        handleAxis: r
      }
    };
    return cloneVNode(u, s);
  }
  return () => {
    const {
      children: r,
      className: i,
      draggableOpts: u,
      width: c,
      height: s,
      handle: d,
      handleSize: g,
      lockAspectRatio: m,
      axis: S,
      minConstraints: f,
      maxConstraints: y,
      onResize: w,
      onResizeStop: z,
      onResizeStart: T,
      resizeHandles: E,
      transformScale: Y,
      ...N
    } = e;
    return h(Te(r, {
      ...N,
      class: `${i ? `${i} ` : ""}react-resizable`
    }), [...r.children || [], ...E.map((v) => {
      const O = n[v] ?? (n[v] = ref());
      return createVNode(X, mergeProps({
        ...u,
        nodeRef: O,
        key: `resizableHandle-${v}`,
        onStop: p("onResizeStop", v),
        onStart: p("onResizeStart", v),
        onDrag: p("onResize", v)
      }, {
        children: b(v, O)
      }), null);
    })]);
  };
});
re.props = lt;
re.name = "Resizable";
var ct = {
  ...ge,
  children: Ne
};
var ut = fe(ct, {});
var xe = defineComponent((e, {
  expose: t
}) => {
  useSlots();
  const n = reactive({
    width: e.width,
    height: e.height,
    propsWidth: e.width,
    propsHeight: e.height
  });
  function o(l, h2) {
    return h2.propsWidth !== l.width || h2.propsHeight !== l.height ? {
      width: l.width,
      height: l.height,
      propsWidth: l.width,
      propsHeight: l.height
    } : null;
  }
  watch(() => e, () => {
    const l = o(e, n);
    l && Object.keys(l).forEach((h2) => {
      n[h2] = l[h2];
    });
  }, {
    deep: true
  });
  const a = (l, h2) => {
    var b;
    const {
      size: p
    } = h2;
    e.onResize ? ((b = l.persist) == null || b.call(l), p && Object.keys(p).forEach((r) => {
      n[r] = p[r];
    }), nextTick(() => {
      e.onResize && e.onResize(l, h2);
    })) : p && Object.keys(p).forEach((r) => {
      n[r] = p[r];
    });
  };
  return () => {
    const {
      handle: l,
      handleSize: h2,
      onResize: p,
      onResizeStart: b,
      onResizeStop: r,
      draggableOpts: i,
      minConstraints: u,
      maxConstraints: c,
      lockAspectRatio: s,
      axis: d,
      width: g,
      height: m,
      resizeHandles: S,
      style: f,
      transformScale: y,
      children: w,
      ...z
    } = e;
    return createVNode(re, {
      axis: d,
      draggableOpts: i,
      handle: l,
      handleSize: h2,
      height: n.height,
      lockAspectRatio: s,
      maxConstraints: c,
      minConstraints: u,
      onResizeStart: b,
      onResize: a,
      onResizeStop: r,
      resizeHandles: S,
      transformScale: y,
      width: n.width,
      children: createVNode("div", mergeProps(z, {
        style: {
          ...f,
          width: n.width + "px",
          height: n.height + "px"
        }
      }), [w])
    }, null);
  };
});
xe.props = ut;
xe.name = "ResizableBox";
export {
  re as Resizable,
  xe as ResizableBox
};
//# sourceMappingURL=@kousum_vue-resizable.js.map
