import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@dnd-kit-vue+utilities@0.0.5_vue@3.2.47/node_modules/@dnd-kit-vue/utilities/dist/index.mjs
function V(...n) {
  return (e) => {
    n.forEach((t) => t(e));
  };
}
function $(n) {
  return shallowRef(n);
}
var j = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function l(n) {
  const e = Object.prototype.toString.call(n);
  return e === "[object Window]" || e === "[object global]";
}
function b(n) {
  return "nodeType" in n;
}
function r(n) {
  var e;
  return n ? l(n) ? n : b(n) ? ((e = n.ownerDocument) == null ? void 0 : e.defaultView) ?? window : window : window;
}
function M(n) {
  const { Document: e } = r(n);
  return n instanceof e;
}
function x(n) {
  return l(n) ? false : n instanceof r(n).HTMLElement;
}
function X(n) {
  return n instanceof r(n).SVGElement;
}
function Y(n) {
  return n ? l(n) ? n.document : b(n) ? M(n) ? n : x(n) ? n.ownerDocument : document : document : document;
}
var g = j ? onBeforeMount : onMounted;
function I() {
  const n = ref(null);
  return [(o, u) => {
    n.value = setInterval(o, u);
  }, () => {
    n.value !== null && (clearInterval(n.value), n.value = null);
  }];
}
function N(n, e = [n]) {
  const t = shallowRef(n.value);
  return watch(e, () => {
    t.value !== n.value && (t.value = n.value);
  }, { immediate: true }), t;
}
function F(n, e) {
  const t = ref();
  return computed(
    () => {
      const o = n(t.value);
      return t.value = o, o;
    }
  );
}
function W(n) {
  const e = $(n), t = ref(null);
  return [t, (u) => {
    var i;
    u !== t.value && ((i = e == null ? void 0 : e.value) == null || i.call(e, u, t.value)), t.value = u;
  }];
}
function q(n) {
  const e = shallowRef();
  return watchEffect(() => {
    e.value = n;
  }), e;
}
var c = {};
function z(n, e) {
  return computed(() => {
    if (e)
      return e;
    const t = c[n] == null ? 0 : c[n] + 1;
    return c[n] = t, `${n}-${t}`;
  });
}
function v(n) {
  return (e, ...t) => t.reduce(
    (u, i) => {
      const y = Object.entries(i);
      for (const [a, E] of y) {
        const d = u[a];
        d != null && (u[a] = d + n * E);
      }
      return u;
    },
    {
      ...e
    }
  );
}
var A = v(1);
var C = v(-1);
function D(n) {
  return "clientX" in n && "clientY" in n;
}
function G(n) {
  if (!n)
    return false;
  const { KeyboardEvent: e } = r(n.target);
  return e && n instanceof e;
}
function L(n) {
  if (!n)
    return false;
  const { TouchEvent: e } = r(n.target);
  return e && n instanceof e;
}
function K(n) {
  if (L(n)) {
    if (n.touches && n.touches.length) {
      const { clientX: e, clientY: t } = n.touches[0];
      return {
        x: e,
        y: t
      };
    } else if (n.changedTouches && n.changedTouches.length) {
      const { clientX: e, clientY: t } = n.changedTouches[0];
      return {
        x: e,
        y: t
      };
    }
  }
  return D(n) ? {
    x: n.clientX,
    y: n.clientY
  } : null;
}
var w = Object.freeze({
  Translate: {
    toString(n) {
      if (!n)
        return;
      const { x: e, y: t } = n;
      return `translate3d(${e ? Math.round(e) : 0}px, ${t ? Math.round(t) : 0}px, 0)`;
    }
  },
  Scale: {
    toString(n) {
      if (!n)
        return;
      const { scaleX: e, scaleY: t } = n;
      return `scaleX(${e}) scaleY(${t})`;
    }
  },
  Transform: {
    toString(n) {
      if (n)
        return [
          w.Translate.toString(n),
          w.Scale.toString(n)
        ].join(" ");
    }
  },
  Transition: {
    toString({ property: n, duration: e, easing: t }) {
      return `${n} ${e}ms ${t}`;
    }
  }
});
var m = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function U(n) {
  return n.matches(m) ? n : n.querySelector(m);
}
export {
  w as CSS,
  A as add,
  j as canUseDOM,
  U as findFirstFocusableNode,
  K as getEventCoordinates,
  Y as getOwnerDocument,
  r as getWindow,
  D as hasViewportRelativeCoordinates,
  M as isDocument,
  x as isHTMLElement,
  G as isKeyboardEvent,
  b as isNode,
  X as isSVGElement,
  L as isTouchEvent,
  l as isWindow,
  C as subtract,
  V as useCombinedRefs,
  $ as useEvent,
  I as useInterval,
  g as useIsomorphicLayoutEffect,
  N as useLatestValue,
  F as useLazyMemo,
  W as useNodeRef,
  q as usePrevious,
  z as useUniqueId
};
//# sourceMappingURL=@dnd-kit-vue_utilities.js.map
