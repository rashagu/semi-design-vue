import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  reactive,
  watch
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@kousum+vue3-window@0.0.6_vue@3.2.47/node_modules/@kousum/vue3-window/dist/index.mjs
var mt = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function Lt(e, t) {
  return !!(e === t || mt(e) && mt(t));
}
function At(e, t) {
  if (e.length !== t.length)
    return false;
  for (var n = 0; n < e.length; n++)
    if (!Lt(e[n], t[n]))
      return false;
  return true;
}
function V(e, t) {
  t === void 0 && (t = At);
  var n = null;
  function o() {
    for (var r = [], a = 0; a < arguments.length; a++)
      r[a] = arguments[a];
    if (n && n.lastThis === this && t(r, n.lastArgs))
      return n.lastResult;
    var i = e.apply(this, r);
    return n = {
      lastResult: i,
      lastArgs: r,
      lastThis: this
    }, i;
  }
  return o.clear = function() {
    n = null;
  }, o;
}
var Dt = typeof performance == "object" && typeof performance.now == "function";
var ht = Dt ? () => performance.now() : () => Date.now();
function at(e) {
  cancelAnimationFrame(e.id);
}
function zt(e, t) {
  const n = ht();
  function o() {
    ht() - n >= t ? e.call(null) : r.id = requestAnimationFrame(o);
  }
  const r = {
    id: requestAnimationFrame(o)
  };
  return r;
}
var ct = -1;
function ft(e = false) {
  if (ct === -1 || e) {
    const t = document.createElement("div"), n = t.style;
    n.width = "50px", n.height = "50px", n.overflow = "scroll", document.body.appendChild(t), ct = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
  }
  return ct;
}
var j = null;
function lt(e = false) {
  if (j === null || e) {
    const t = document.createElement("div"), n = t.style;
    n.width = "50px", n.height = "50px", n.overflow = "scroll", n.direction = "rtl";
    const o = document.createElement("div"), r = o.style;
    return r.width = "100px", r.height = "100px", t.appendChild(o), document.body.appendChild(t), t.scrollLeft > 0 ? j = "positive-descending" : (t.scrollLeft = 1, t.scrollLeft === 0 ? j = "negative" : j = "positive-ascending"), document.body.removeChild(t), j;
  }
  return j;
}
var kt = 150;
var Ut = ({ columnIndex: e, data: t, rowIndex: n }) => `${n}:${e}`;
function Rt({
  getColumnOffset: e,
  getColumnStartIndexForOffset: t,
  getColumnStopIndexForStartIndex: n,
  getColumnWidth: o,
  getEstimatedTotalHeight: r,
  getEstimatedTotalWidth: a,
  getOffsetForColumnAndAlignment: i,
  getOffsetForRowAndAlignment: f,
  getRowHeight: m,
  getRowOffset: s,
  getRowStartIndexForOffset: S,
  getRowStopIndexForStartIndex: w,
  initInstanceProps: F,
  shouldResetStyleCacheOnItemSizeChange: W,
  validateProps: T
}) {
  return defineComponent({
    props: {
      className: String,
      columnCount: Number,
      rowCount: Number,
      columnWidth: [Number, Function],
      rowHeight: [Number, Function],
      height: Number,
      overscanColumnCount: Number,
      overscanColumnsCount: Number,
      overscanRowCount: Number,
      overscanRowsCount: Number,
      initialScrollOffset: Number,
      innerRef: Object,
      initialScrollLeft: Number,
      initialScrollTop: Number,
      innerElementType: [String, Object, Function],
      innerTagName: String,
      itemCount: Number,
      itemKey: Function,
      itemSize: [Number, Function],
      onItemsRendered: Function,
      onScroll: Function,
      outerRef: [Object, Function],
      outerElementType: [String, Object, Function],
      outerTagName: String,
      style: [Object],
      width: [Number, String],
      direction: {
        type: String,
        default: "ltr"
      },
      itemData: {
        type: [Object, Array],
        default: void 0
      },
      layout: {
        type: String,
        default: "vertical"
      },
      overscanCount: {
        type: Number,
        default: 2
      },
      useIsScrolling: {
        type: Boolean,
        default: false
      }
    },
    setup: (l, { slots: D, expose: X }) => {
      let E = F(l, {}), p, k = null;
      const v = reactive({
        instance: {},
        isScrolling: false,
        horizontalScrollDirection: "forward",
        scrollLeft: typeof l.initialScrollLeft == "number" ? l.initialScrollLeft : 0,
        scrollTop: typeof l.initialScrollTop == "number" ? l.initialScrollTop : 0,
        scrollUpdateWasRequested: false,
        verticalScrollDirection: "forward"
      });
      let it = V(
        (c, u, g, x, I, z, R, C) => l.onItemsRendered && l.onItemsRendered({
          overscanColumnStartIndex: c,
          overscanColumnStopIndex: u,
          overscanRowStartIndex: g,
          overscanRowStopIndex: x,
          visibleColumnStartIndex: I,
          visibleColumnStopIndex: z,
          visibleRowStartIndex: R,
          visibleRowStopIndex: C
        })
      ), st = V(
        (c, u, g, x, I) => l.onScroll && l.onScroll({
          horizontalScrollDirection: g,
          scrollLeft: c,
          scrollTop: u,
          verticalScrollDirection: x,
          scrollUpdateWasRequested: I
        })
      );
      function Y() {
        const { columnCount: c, onItemsRendered: u, onScroll: g, rowCount: x } = l;
        if (typeof l.onItemsRendered == "function" && c && x && c > 0 && x > 0) {
          const [
            I,
            z,
            R,
            C
          ] = et(), [
            O,
            _,
            L,
            A
          ] = nt();
          it(
            I,
            z,
            O,
            _,
            R,
            C,
            L,
            A
          );
        }
        if (typeof l.onScroll == "function") {
          const {
            horizontalScrollDirection: I,
            scrollLeft: z,
            scrollTop: R,
            scrollUpdateWasRequested: C,
            verticalScrollDirection: O
          } = v;
          st(
            z,
            R,
            I,
            O,
            C
          );
        }
      }
      const K = (c, u) => {
        const { columnWidth: g, direction: x, rowHeight: I } = l, z = tt(
          W && g,
          W && x,
          W && I
        ), R = `${c}:${u}`;
        let C;
        if (z.hasOwnProperty(R))
          C = z[R];
        else {
          const O = e(
            l,
            u,
            E
          ), _ = x === "rtl";
          z[R] = C = {
            position: "absolute",
            left: _ ? void 0 : O + "px",
            right: _ ? O + "px" : void 0,
            top: s(l, c, E) + "px",
            height: m(l, c, E) + "px",
            width: o(l, u, E) + "px"
          };
        }
        return C;
      }, tt = V((c, u, g) => ({}));
      function et() {
        const {
          columnCount: c,
          overscanColumnCount: u,
          overscanColumnsCount: g,
          overscanCount: x,
          rowCount: I
        } = l, { horizontalScrollDirection: z, isScrolling: R, scrollLeft: C } = v, O = u || g || x || 1;
        if (c === 0 || I === 0)
          return [0, 0, 0, 0];
        const _ = t(
          l,
          C,
          E
        ), L = n(
          l,
          _,
          C,
          E
        ), A = !R || z === "backward" ? Math.max(1, O) : 1, U = !R || z === "forward" ? Math.max(1, O) : 1;
        return [
          Math.max(0, _ - A),
          Math.max(0, Math.min(c - 1, L + U)),
          _,
          L
        ];
      }
      function nt() {
        const {
          columnCount: c,
          overscanCount: u,
          overscanRowCount: g,
          overscanRowsCount: x,
          rowCount: I
        } = l, { isScrolling: z, verticalScrollDirection: R, scrollTop: C } = v, O = g || x || u || 1;
        if (c === 0 || I === 0)
          return [0, 0, 0, 0];
        const _ = S(
          l,
          C,
          E
        ), L = w(
          l,
          _,
          C,
          E
        ), A = !z || R === "backward" ? Math.max(1, O) : 1, U = !z || R === "forward" ? Math.max(1, O) : 1;
        return [
          Math.max(0, _ - A),
          Math.max(0, Math.min(I - 1, L + U)),
          _,
          L
        ];
      }
      const d = (c) => {
        const {
          clientHeight: u,
          clientWidth: g,
          scrollLeft: x,
          scrollTop: I,
          scrollHeight: z,
          scrollWidth: R
        } = c.currentTarget;
        if (v.scrollLeft !== x || v.scrollTop !== I) {
          const { direction: C } = l;
          let O = x;
          if (C === "rtl")
            switch (lt()) {
              case "negative":
                O = -x;
                break;
              case "positive-descending":
                O = R - g - x;
                break;
            }
          O = Math.max(
            0,
            Math.min(O, R - g)
          );
          const _ = Math.max(
            0,
            Math.min(I, z - u)
          );
          v.isScrolling = true, v.horizontalScrollDirection = v.scrollLeft < x ? "forward" : "backward", v.scrollLeft = O, v.scrollTop = _, v.verticalScrollDirection = v.scrollTop < I ? "forward" : "backward", v.scrollUpdateWasRequested = false, M();
        }
      }, h2 = (c) => {
        const { outerRef: u } = l;
        p = c, typeof u == "function" ? u(c) : u != null && typeof u == "object" && u.hasOwnProperty("current") && (u.current = c);
      }, M = () => {
        k !== null && at(k), k = zt(
          b,
          kt
        );
      }, b = () => {
        k = null, v.isScrolling = false, tt(-1, null, null);
      };
      function y({ scrollLeft: c, scrollTop: u }) {
        c !== void 0 && (c = Math.max(0, c)), u !== void 0 && (u = Math.max(0, u)), c === void 0 && (c = v.scrollLeft), u === void 0 && (u = v.scrollTop), (v.scrollLeft !== c || v.scrollTop !== u) && (v.horizontalScrollDirection = v.scrollLeft < c ? "forward" : "backward", v.scrollLeft = c, v.scrollTop = u, v.scrollUpdateWasRequested = true, v.verticalScrollDirection = v.scrollTop < u ? "forward" : "backward", M());
      }
      function N({
        align: c = "auto",
        columnIndex: u,
        rowIndex: g
      }) {
        const { columnCount: x, height: I, rowCount: z, width: R } = l, { scrollLeft: C, scrollTop: O } = v, _ = ft();
        x && u !== void 0 && (u = Math.max(0, Math.min(u, x - 1))), z && g !== void 0 && (g = Math.max(0, Math.min(g, z - 1)));
        const L = r(
          l,
          E
        ), U = a(
          l,
          E
        ) > parseInt(R + "") ? _ : 0, G = L > parseInt(I + "") ? _ : 0;
        y({
          scrollLeft: u !== void 0 ? i(
            l,
            u,
            c,
            C,
            E,
            G
          ) : C,
          scrollTop: g !== void 0 ? f(
            l,
            g,
            c,
            O,
            E,
            U
          ) : O
        });
      }
      return X({
        scrollToItem: N
      }), onMounted(() => {
        const { initialScrollLeft: c, initialScrollTop: u } = l;
        if (p != null) {
          const g = p;
          typeof c == "number" && (g.scrollLeft = c), typeof u == "number" && (g.scrollTop = u);
        }
        Y();
      }), watch(
        [
          () => l.direction,
          () => v.scrollLeft,
          () => v.scrollTop,
          () => v.scrollUpdateWasRequested
        ],
        () => {
          const { direction: c } = l, { scrollLeft: u, scrollTop: g, scrollUpdateWasRequested: x } = v;
          if (x && p != null) {
            const I = p;
            if (c === "rtl")
              switch (lt()) {
                case "negative":
                  I.scrollLeft = -u;
                  break;
                case "positive-ascending":
                  I.scrollLeft = u;
                  break;
                default:
                  const { clientWidth: z, scrollWidth: R } = I;
                  I.scrollLeft = R - z - u;
                  break;
              }
            else
              I.scrollLeft = Math.max(0, u);
            I.scrollTop = Math.max(0, g);
          }
          Y();
        }
      ), onUnmounted(() => {
        k !== null && at(k);
      }), () => {
        const {
          className: c,
          columnCount: u,
          direction: g,
          height: x,
          innerRef: I,
          innerElementType: z,
          innerTagName: R,
          itemData: C,
          itemKey: O = Ut,
          outerElementType: _,
          outerTagName: L,
          rowCount: A,
          style: U,
          useIsScrolling: G,
          width: P
        } = l, { isScrolling: Z } = v, [
          ot,
          q
        ] = et(), [rt, Ft] = nt(), ut = [];
        if (u && u > 0 && A)
          for (let J = rt; J <= Ft; J++)
            for (let Q = ot; Q <= q; Q++) {
              let dt = {
                columnIndex: Q,
                data: C,
                isScrolling: G ? Z : void 0,
                key: O({ columnIndex: Q, data: C, rowIndex: J }),
                rowIndex: J,
                style: K(J, Q)
              };
              ut.push(
                h(D.default ? D.default(dt)[0] : "", dt)
              );
            }
        const Wt = r(
          l,
          E
        ), Et = a(
          l,
          E
        );
        return h(
          _ || L || "div",
          {
            className: c,
            onScroll: d,
            ref: h2,
            style: {
              position: "relative",
              height: x + "px",
              width: P + "px",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              willChange: "transform",
              direction: g,
              ...U
            }
          },
          h(z || R || "div", {
            ref: () => I ? I.value : void 0,
            style: {
              height: Wt + "px",
              pointerEvents: Z ? "none" : void 0,
              width: Et + "px"
            }
          }, ut)
        );
      };
    }
  });
}
var St = 50;
var Ct = ({ rowCount: e }, { rowMetadataMap: t, estimatedRowHeight: n, lastMeasuredRowIndex: o }) => {
  let r = 0;
  if (o >= e && (o = e - 1), o >= 0) {
    const f = t[o];
    r = f.offset + f.size;
  }
  const i = (e - o - 1) * n;
  return r + i;
};
var Ot = ({ columnCount: e }, {
  columnMetadataMap: t,
  estimatedColumnWidth: n,
  lastMeasuredColumnIndex: o
}) => {
  let r = 0;
  if (o >= e && (o = e - 1), o >= 0) {
    const f = t[o];
    r = f.offset + f.size;
  }
  const i = (e - o - 1) * n;
  return r + i;
};
var H = (e, t, n, o) => {
  let r, a, i;
  if (e === "column" ? (r = o.columnMetadataMap, a = t.columnWidth, i = o.lastMeasuredColumnIndex) : (r = o.rowMetadataMap, a = t.rowHeight, i = o.lastMeasuredRowIndex), n > i) {
    let f = 0;
    if (i >= 0) {
      const m = r[i];
      f = m.offset + m.size;
    }
    for (let m = i + 1; m <= n; m++) {
      let s = a(m);
      r[m] = {
        offset: f,
        size: s
      }, f += s;
    }
    e === "column" ? o.lastMeasuredColumnIndex = n : o.lastMeasuredRowIndex = n;
  }
  return r[n];
};
var Mt = (e, t, n, o) => {
  let r, a;
  return e === "column" ? (r = n.columnMetadataMap, a = n.lastMeasuredColumnIndex) : (r = n.rowMetadataMap, a = n.lastMeasuredRowIndex), (a > 0 ? r[a].offset : 0) >= o ? Tt(
    e,
    t,
    n,
    a,
    0,
    o
  ) : Ht(
    e,
    t,
    n,
    Math.max(0, a),
    o
  );
};
var Tt = (e, t, n, o, r, a) => {
  for (; r <= o; ) {
    const i = r + Math.floor((o - r) / 2), f = H(
      e,
      t,
      i,
      n
    ).offset;
    if (f === a)
      return i;
    f < a ? r = i + 1 : f > a && (o = i - 1);
  }
  return r > 0 ? r - 1 : 0;
};
var Ht = (e, t, n, o, r) => {
  const a = e === "column" ? t.columnCount : t.rowCount;
  let i = 1;
  for (; o < a && H(e, t, o, n).offset < r; )
    o += i, i *= 2;
  return Tt(
    e,
    t,
    n,
    Math.min(o, a - 1),
    Math.floor(o / 2),
    r
  );
};
var gt = (e, t, n, o, r, a, i) => {
  const f = e === "column" ? t.width : t.height, m = H(e, t, n, a), s = e === "column" ? Ot(t, a) : Ct(t, a), S = Math.max(
    0,
    Math.min(s - f, m.offset)
  ), w = Math.max(
    0,
    m.offset - f + i + m.size
  );
  switch (o === "smart" && (r >= w - f && r <= S + f ? o = "auto" : o = "center"), o) {
    case "start":
      return S;
    case "end":
      return w;
    case "center":
      return Math.round(w + (S - w) / 2);
    case "auto":
    default:
      return r >= w && r <= S ? r : w > S || r < w ? w : S;
  }
};
var Gt = Rt({
  getColumnOffset: (e, t, n) => H("column", e, t, n).offset,
  getColumnStartIndexForOffset: (e, t, n) => Mt("column", e, n, t),
  getColumnStopIndexForStartIndex: (e, t, n, o) => {
    const { columnCount: r, width: a } = e, i = H(
      "column",
      e,
      t,
      o
    ), f = n + a;
    let m = i.offset + i.size, s = t;
    for (; s < r - 1 && m < f; )
      s++, m += H("column", e, s, o).size;
    return s;
  },
  getColumnWidth: (e, t, n) => n.columnMetadataMap[t].size,
  getEstimatedTotalHeight: Ct,
  getEstimatedTotalWidth: Ot,
  getOffsetForColumnAndAlignment: (e, t, n, o, r, a) => gt(
    "column",
    e,
    t,
    n,
    o,
    r,
    a
  ),
  getOffsetForRowAndAlignment: (e, t, n, o, r, a) => gt(
    "row",
    e,
    t,
    n,
    o,
    r,
    a
  ),
  getRowOffset: (e, t, n) => H("row", e, t, n).offset,
  getRowHeight: (e, t, n) => n.rowMetadataMap[t].size,
  getRowStartIndexForOffset: (e, t, n) => Mt("row", e, n, t),
  getRowStopIndexForStartIndex: (e, t, n, o) => {
    const { rowCount: r, height: a } = e, i = H(
      "row",
      e,
      t,
      o
    ), f = n + a;
    let m = i.offset + i.size, s = t;
    for (; s < r - 1 && m < f; )
      s++, m += H("row", e, s, o).size;
    return s;
  },
  initInstanceProps(e, t) {
    const {
      estimatedColumnWidth: n,
      estimatedRowHeight: o
    } = e, r = {
      columnMetadataMap: {},
      estimatedColumnWidth: n || St,
      estimatedRowHeight: o || St,
      lastMeasuredColumnIndex: -1,
      lastMeasuredRowIndex: -1,
      rowMetadataMap: {}
    };
    return t.resetAfterColumnIndex = (a, i = true) => {
      t.resetAfterIndices({ columnIndex: a, shouldForceUpdate: i });
    }, t.resetAfterRowIndex = (a, i = true) => {
      t.resetAfterIndices({ rowIndex: a, shouldForceUpdate: i });
    }, t.resetAfterIndices = ({
      columnIndex: a,
      rowIndex: i,
      shouldForceUpdate: f = true
    }) => {
      typeof a == "number" && (r.lastMeasuredColumnIndex = Math.min(
        r.lastMeasuredColumnIndex,
        a - 1
      )), typeof i == "number" && (r.lastMeasuredRowIndex = Math.min(
        r.lastMeasuredRowIndex,
        i - 1
      )), t._getItemStyleCache(-1), f && t.forceUpdate();
    }, r;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: ({ columnWidth: e, rowHeight: t }) => {
  }
});
var pt = 150;
var qt = (e, t) => e;
function Nt({
  getItemOffset: e,
  getEstimatedTotalSize: t,
  getItemSize: n,
  getOffsetForIndexAndAlignment: o,
  getStartIndexForOffset: r,
  getStopIndexForStartIndex: a,
  initInstanceProps: i,
  shouldResetStyleCacheOnItemSizeChange: f,
  validateProps: m
}) {
  return defineComponent({
    props: {
      className: String,
      height: Number,
      initialScrollOffset: Number,
      innerRef: Object,
      innerElementType: [String, Object, Function],
      innerTagName: String,
      itemCount: Number,
      itemKey: Function,
      itemSize: [Number, Function],
      onItemsRendered: Function,
      onScroll: Function,
      outerRef: [Object, Function],
      outerElementType: [String, Object, Function],
      outerTagName: String,
      style: [Object],
      width: [Number, String],
      direction: {
        type: String,
        default: "ltr"
      },
      itemData: {
        type: [Object, Array],
        default: void 0
      },
      layout: {
        type: String,
        default: "vertical"
      },
      overscanCount: {
        type: Number,
        default: 2
      },
      useIsScrolling: {
        type: Boolean,
        default: false
      }
    },
    setup: (s, {
      slots: S,
      expose: w
    }) => {
      let F = i(s, {}), W, T = null;
      const l = reactive({
        instance: {},
        isScrolling: false,
        scrollDirection: "forward",
        scrollOffset: typeof s.initialScrollOffset == "number" ? s.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      });
      let D;
      D = V((d, h2, M, b) => s.onItemsRendered && s.onItemsRendered({
        overscanStartIndex: d,
        overscanStopIndex: h2,
        visibleStartIndex: M,
        visibleStopIndex: b
      }));
      let X;
      X = V((d, h2, M) => s.onScroll && s.onScroll({
        scrollDirection: d,
        scrollOffset: h2,
        scrollUpdateWasRequested: M
      }));
      function E() {
        if (typeof s.onItemsRendered == "function") {
          const {
            itemCount: d
          } = s;
          if (d && d > 0) {
            const [h2, M, b, y] = v();
            D(h2, M, b, y);
          }
        }
        if (typeof s.onScroll == "function") {
          const {
            scrollDirection: d,
            scrollOffset: h2,
            scrollUpdateWasRequested: M
          } = l;
          X(d, h2, M);
        }
      }
      const p = (d) => {
        const {
          direction: h2,
          itemSize: M,
          layout: b
        } = s, y = k(f && M, f && b, f && h2);
        let N;
        if (y.hasOwnProperty(d))
          N = y[d];
        else {
          const c = e(s, d, F), u = n(s, d, F), g = h2 === "horizontal" || b === "horizontal", x = h2 === "rtl", I = g ? c : 0;
          y[d] = N = {
            position: "absolute",
            left: x ? void 0 : I + "px",
            right: x ? I + "px" : void 0,
            top: g ? 0 : c + "px",
            height: g ? "100%" : u + "px",
            width: g ? u + "px" : "100%"
          };
        }
        return N;
      }, k = V((d, h2, M) => ({}));
      function v() {
        const {
          itemCount: d,
          overscanCount: h2
        } = s, {
          isScrolling: M,
          scrollDirection: b,
          scrollOffset: y
        } = l;
        if (d === 0)
          return [0, 0, 0, 0];
        const N = r(s, y, F), c = a(s, N, y, F), u = !M || b === "backward" ? Math.max(1, h2) : 1, g = !M || b === "forward" ? Math.max(1, h2) : 1;
        return [
          Math.max(0, N - u),
          Math.max(0, Math.min(d - 1, c + g)),
          N,
          c
        ];
      }
      const it = (d) => {
        const {
          clientWidth: h2,
          scrollLeft: M,
          scrollWidth: b
        } = d.currentTarget;
        if (l.scrollOffset !== M) {
          const {
            direction: y
          } = s;
          let N = M;
          if (y === "rtl")
            switch (lt()) {
              case "negative":
                N = -M;
                break;
              case "positive-descending":
                N = b - h2 - M;
                break;
            }
          N = Math.max(0, Math.min(N, b - h2)), l.isScrolling = true, l.scrollDirection = l.scrollOffset < M ? "forward" : "backward", l.scrollOffset = N, l.scrollUpdateWasRequested = false, K();
        }
      }, st = (d) => {
        const {
          clientHeight: h2,
          scrollHeight: M,
          scrollTop: b
        } = d.currentTarget;
        if (l.scrollOffset !== b) {
          const y = Math.max(0, Math.min(b, M - h2));
          l.isScrolling = true, l.scrollDirection = l.scrollOffset < y ? "forward" : "backward", l.scrollOffset = y, l.scrollUpdateWasRequested = false, K();
        }
      }, Y = (d) => {
        const {
          outerRef: h2
        } = s;
        W = d, typeof h2 == "function" ? h2(d) : h2 != null && typeof h2 == "object" && h2.hasOwnProperty("current") && (h2.current = d);
      }, K = () => {
        T !== null && at(T), T = zt(tt, pt);
      }, tt = () => {
        T = null, l.isScrolling = false, k(-1, null, null);
      };
      function et(d) {
        d = Math.max(0, d), l.scrollOffset !== d && (l.scrollDirection = l.scrollOffset < d ? "forward" : "backward", l.scrollOffset = d, l.scrollUpdateWasRequested = true, K());
      }
      function nt(d, h2 = "auto") {
        const {
          itemCount: M,
          layout: b
        } = s, {
          scrollOffset: y
        } = l;
        let N = 0;
        if (W) {
          const c = W;
          b === "vertical" ? N = c.scrollWidth > c.clientWidth ? ft() : 0 : N = c.scrollHeight > c.clientHeight ? ft() : 0;
        }
        M && (d = Math.max(0, Math.min(d, M - 1)), et(o(s, d, h2, y, F, N)));
      }
      return w({
        scrollToItem: nt
      }), onMounted(() => {
        const {
          direction: d,
          initialScrollOffset: h2,
          layout: M
        } = s;
        if (typeof h2 == "number" && W != null) {
          const b = W;
          d === "horizontal" || M === "horizontal" ? b.scrollLeft = h2 : b.scrollTop = h2;
        }
        E();
      }), watch([() => s.direction, () => s.layout, () => l.scrollOffset, () => l.scrollUpdateWasRequested], () => {
        const {
          direction: d,
          layout: h2
        } = s, {
          scrollOffset: M,
          scrollUpdateWasRequested: b
        } = l;
        if (b && W != null) {
          const y = W;
          if (d === "horizontal" || h2 === "horizontal")
            if (d === "rtl")
              switch (lt()) {
                case "negative":
                  y.scrollLeft = -M;
                  break;
                case "positive-ascending":
                  y.scrollLeft = M;
                  break;
                default:
                  const {
                    clientWidth: N,
                    scrollWidth: c
                  } = y;
                  y.scrollLeft = c - N - M;
                  break;
              }
            else
              y.scrollLeft = M;
          else
            y.scrollTop = M;
        }
        E();
      }), onUnmounted(() => {
        T !== null && at(T);
      }), () => {
        const {
          className: d,
          direction: h2,
          height: M,
          innerRef: b,
          innerElementType: y,
          innerTagName: N,
          itemCount: c,
          itemData: u,
          itemKey: g = qt,
          layout: x,
          outerElementType: I,
          outerTagName: z,
          style: R,
          useIsScrolling: C,
          width: O
        } = s, {
          isScrolling: _
        } = l, L = h2 === "horizontal" || x === "horizontal", A = L ? it : st, [U, G] = v(), P = [];
        if (c && c > 0)
          for (let q = U; q <= G; q++) {
            let rt = {
              data: u,
              key: g(q, u),
              index: q,
              isScrolling: C ? _ : void 0,
              style: p(q)
            };
            P.push(h(S.default ? S.default(rt)[0] : "", rt));
          }
        const Z = t(s, F), ot = [h(y || N || "div", {
          ref: () => b ? b.value : void 0,
          style: {
            height: L ? "100%" : Z + "px",
            pointerEvents: _ ? "none" : void 0,
            width: L ? Z + "px" : "100%"
          }
        }, typeof (y || N || "div") == "string" ? P : () => P)];
        return h(I || z || "div", {
          className: d,
          onScroll: A,
          ref: Y,
          style: {
            position: "relative",
            height: M + "px",
            width: O + "px",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            willChange: "transform",
            direction: h2,
            ...R
          }
        }, typeof (I || z || "div") == "string" ? ot : () => ot);
      };
    }
  });
}
var jt = 50;
var $ = (e, t, n) => {
  const { itemSize: o } = e, { itemMetadataMap: r, lastMeasuredIndex: a } = n;
  if (t > a) {
    let i = 0;
    if (a >= 0) {
      const f = r[a];
      i = f.offset + f.size;
    }
    for (let f = a + 1; f <= t; f++) {
      let m = o(f);
      r[f] = {
        offset: i,
        size: m
      }, i += m;
    }
    n.lastMeasuredIndex = t;
  }
  return r[t];
};
var $t = (e, t, n) => {
  const { itemMetadataMap: o, lastMeasuredIndex: r } = t;
  return (r > 0 ? o[r].offset : 0) >= n ? _t(
    e,
    t,
    r,
    0,
    n
  ) : Bt(
    e,
    t,
    Math.max(0, r),
    n
  );
};
var _t = (e, t, n, o, r) => {
  for (; o <= n; ) {
    const a = o + Math.floor((n - o) / 2), i = $(e, a, t).offset;
    if (i === r)
      return a;
    i < r ? o = a + 1 : i > r && (n = a - 1);
  }
  return o > 0 ? o - 1 : 0;
};
var Bt = (e, t, n, o) => {
  const { itemCount: r } = e;
  let a = 1;
  for (; n < r && $(e, n, t).offset < o; )
    n += a, a *= 2;
  return _t(
    e,
    t,
    Math.min(n, r - 1),
    Math.floor(n / 2),
    o
  );
};
var It = ({ itemCount: e }, { itemMetadataMap: t, estimatedItemSize: n, lastMeasuredIndex: o }) => {
  let r = 0;
  if (o >= e && (o = e - 1), o >= 0) {
    const f = t[o];
    r = f.offset + f.size;
  }
  const i = (e - o - 1) * n;
  return r + i;
};
var Pt = Nt({
  getItemOffset: (e, t, n) => $(e, t, n).offset,
  getItemSize: (e, t, n) => n.itemMetadataMap[t].size,
  getEstimatedTotalSize: It,
  getOffsetForIndexAndAlignment: (e, t, n, o, r, a) => {
    const { direction: i, height: f, layout: m, width: s } = e, w = i === "horizontal" || m === "horizontal" ? s : f, F = $(e, t, r), W = It(e, r), T = Math.max(
      0,
      Math.min(W - w, F.offset)
    ), l = Math.max(
      0,
      F.offset - w + F.size + a
    );
    switch (n === "smart" && (o >= l - w && o <= T + w ? n = "auto" : n = "center"), n) {
      case "start":
        return T;
      case "end":
        return l;
      case "center":
        return Math.round(l + (T - l) / 2);
      case "auto":
      default:
        return o >= l && o <= T ? o : o < l ? l : T;
    }
  },
  getStartIndexForOffset: (e, t, n) => $t(e, n, t),
  getStopIndexForStartIndex: (e, t, n, o) => {
    const { direction: r, height: a, itemCount: i, layout: f, width: m } = e, S = r === "horizontal" || f === "horizontal" ? m : a, w = $(e, t, o), F = n + S;
    let W = w.offset + w.size, T = t;
    for (; T < i - 1 && W < F; )
      T++, W += $(e, T, o).size;
    return T;
  },
  initInstanceProps(e, t) {
    const { estimatedItemSize: n } = e, o = {
      itemMetadataMap: {},
      estimatedItemSize: n || jt,
      lastMeasuredIndex: -1
    };
    return t.resetAfterIndex = (r, a = true) => {
      o.lastMeasuredIndex = Math.min(
        o.lastMeasuredIndex,
        r - 1
      ), t._getItemStyleCache(-1), a && t.forceUpdate();
    }, o;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: ({ itemSize: e }) => {
  }
});
var Zt = Rt({
  getColumnOffset: ({ columnWidth: e }, t) => t * e,
  getColumnWidth: ({ columnWidth: e }, t) => e,
  getRowOffset: ({ rowHeight: e }, t) => t * e,
  getRowHeight: ({ rowHeight: e }, t) => e,
  getEstimatedTotalHeight: ({ rowCount: e, rowHeight: t }) => t * e,
  getEstimatedTotalWidth: ({ columnCount: e, columnWidth: t }) => t * e,
  getOffsetForColumnAndAlignment: ({ columnCount: e, columnWidth: t, width: n }, o, r, a, i, f) => {
    const m = Math.max(
      0,
      e * t - n
    ), s = Math.min(
      m,
      o * t
    ), S = Math.max(
      0,
      o * t - n + f + t
    );
    switch (r === "smart" && (a >= S - n && a <= s + n ? r = "auto" : r = "center"), r) {
      case "start":
        return s;
      case "end":
        return S;
      case "center":
        const w = Math.round(
          S + (s - S) / 2
        );
        return w < Math.ceil(n / 2) ? 0 : w > m + Math.floor(n / 2) ? m : w;
      case "auto":
      default:
        return a >= S && a <= s ? a : S > s || a < S ? S : s;
    }
  },
  getOffsetForRowAndAlignment: ({ rowHeight: e, height: t, rowCount: n }, o, r, a, i, f) => {
    const m = Math.max(
      0,
      n * e - t
    ), s = Math.min(
      m,
      o * e
    ), S = Math.max(
      0,
      o * e - t + f + e
    );
    switch (r === "smart" && (a >= S - t && a <= s + t ? r = "auto" : r = "center"), r) {
      case "start":
        return s;
      case "end":
        return S;
      case "center":
        const w = Math.round(
          S + (s - S) / 2
        );
        return w < Math.ceil(t / 2) ? 0 : w > m + Math.floor(t / 2) ? m : w;
      case "auto":
      default:
        return a >= S && a <= s ? a : S > s || a < S ? S : s;
    }
  },
  getColumnStartIndexForOffset: ({ columnWidth: e, columnCount: t }, n) => Math.max(
    0,
    Math.min(
      t - 1,
      Math.floor(n / e)
    )
  ),
  getColumnStopIndexForStartIndex: ({ columnWidth: e, columnCount: t, width: n }, o, r) => {
    const a = o * e, i = Math.ceil(
      (n + r - a) / e
    );
    return Math.max(
      0,
      Math.min(
        t - 1,
        o + i - 1
      )
    );
  },
  getRowStartIndexForOffset: ({ rowHeight: e, rowCount: t }, n) => Math.max(
    0,
    Math.min(t - 1, Math.floor(n / e))
  ),
  getRowStopIndexForStartIndex: ({ rowHeight: e, rowCount: t, height: n }, o, r) => {
    const a = o * e, i = Math.ceil(
      (n + r - a) / e
    );
    return Math.max(
      0,
      Math.min(
        t - 1,
        o + i - 1
      )
    );
  },
  initInstanceProps(e) {
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: ({ columnWidth: e, rowHeight: t }) => {
  }
});
var Vt = ({ direction: e, height: t, itemCount: n, itemSize: o, layout: r, width: a }, i, f, m, s, S) => {
  const F = e === "horizontal" || r === "horizontal" ? a : t, W = Math.max(
    0,
    n * o - F
  ), T = Math.min(
    W,
    i * o
  ), l = Math.max(
    0,
    i * o - F + o + S
  );
  switch (f === "smart" && (m >= l - F && m <= T + F ? f = "auto" : f = "center"), f) {
    case "start":
      return T;
    case "end":
      return l;
    case "center": {
      const D = Math.round(
        l + (T - l) / 2
      );
      return D < Math.ceil(F / 2) ? 0 : D > W + Math.floor(F / 2) ? W : D;
    }
    case "auto":
    default:
      return m >= l && m <= T ? m : m < l ? l : T;
  }
};
var Jt = Nt({
  getItemOffset: ({ itemSize: e }, t) => t * e,
  getItemSize: ({ itemSize: e }, t) => e,
  getEstimatedTotalSize: ({ itemCount: e, itemSize: t }) => t * e,
  getOffsetForIndexAndAlignment: Vt,
  getStartIndexForOffset: ({ itemCount: e, itemSize: t }, n) => Math.max(
    0,
    Math.min(e - 1, Math.floor(n / t))
  ),
  getStopIndexForStartIndex: ({ direction: e, height: t, itemCount: n, itemSize: o, layout: r, width: a }, i, f) => {
    const m = e === "horizontal" || r === "horizontal", s = i * o, w = Math.ceil(
      ((m ? a : t) + f - s) / o
    );
    return Math.max(
      0,
      Math.min(
        n - 1,
        i + w - 1
      )
    );
  },
  initInstanceProps(e) {
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: ({ itemSize: e }) => {
  }
});
export {
  Zt as FixedSizeGrid,
  Jt as FixedSizeList,
  Gt as VariableSizeGrid,
  Pt as VariableSizeList
};
//# sourceMappingURL=@kousum_vue3-window.js.map
