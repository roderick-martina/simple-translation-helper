import { unref as Q, ref as G, readonly as ht, getCurrentScope as Ft, onScopeDispose as Bt, watch as ft, computed as V, shallowRef as It, nextTick as mt, getCurrentInstance as Wt, onMounted as jt, defineComponent as se, useSlots as gt, openBlock as D, createElementBlock as oe, normalizeClass as te, renderSlot as pe, createElementVNode as N, normalizeStyle as re, pushScopeId as Vt, popScopeId as Kt, createBlock as Ce, normalizeProps as qt, guardReactiveProps as Gt, withScopeId as Jt, resolveComponent as He, withKeys as Yt, Fragment as wt, createCommentVNode as Ye, withCtx as xe, createVNode as Xt, toDisplayString as ze, createTextVNode as Ut } from "vue";
function yt(e) {
  return Ft() ? (Bt(e), !0) : !1;
}
function me(e) {
  return typeof e == "function" ? e() : Q(e);
}
const je = typeof window < "u" && typeof document < "u", Qt = Object.prototype.toString, Zt = (e) => Qt.call(e) === "[object Object]", en = () => {
};
function tn(e, t) {
  function n(...o) {
    return new Promise((i, s) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(i).catch(s);
    });
  }
  return n;
}
const vt = (e) => e();
function nn(e = vt) {
  const t = G(!0);
  function n() {
    t.value = !1;
  }
  function o() {
    t.value = !0;
  }
  const i = (...s) => {
    t.value && e(...s);
  };
  return { isActive: ht(t), pause: n, resume: o, eventFilter: i };
}
function on(e, t, n = {}) {
  const {
    eventFilter: o = vt,
    ...i
  } = n;
  return ft(
    e,
    tn(
      o,
      t
    ),
    i
  );
}
function sn(e, t, n = {}) {
  const {
    eventFilter: o,
    ...i
  } = n, { eventFilter: s, pause: r, resume: a, isActive: l } = nn(o);
  return { stop: on(
    e,
    t,
    {
      ...i,
      eventFilter: s
    }
  ), pause: r, resume: a, isActive: l };
}
function rn(e, t, n = {}) {
  const {
    immediate: o = !0
  } = n, i = G(!1);
  let s = null;
  function r() {
    s && (clearTimeout(s), s = null);
  }
  function a() {
    i.value = !1, r();
  }
  function l(...c) {
    r(), i.value = !0, s = setTimeout(() => {
      i.value = !1, s = null, e(...c);
    }, me(t));
  }
  return o && (i.value = !0, je && l()), yt(a), {
    isPending: ht(i),
    start: l,
    stop: a
  };
}
function an(e) {
  var t;
  const n = me(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Le = je ? window : void 0, ln = je ? window.navigator : void 0;
function De(...e) {
  let t, n, o, i;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, i] = e, t = Le) : [t, n, o, i] = e, !t)
    return en;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const s = [], r = () => {
    s.forEach((h) => h()), s.length = 0;
  }, a = (h, d, u, p) => (h.addEventListener(d, u, p), () => h.removeEventListener(d, u, p)), l = ft(
    () => [an(t), me(i)],
    ([h, d]) => {
      if (r(), !h)
        return;
      const u = Zt(d) ? { ...d } : d;
      s.push(
        ...n.flatMap((p) => o.map((m) => a(h, p, m, u)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    l(), r();
  };
  return yt(c), c;
}
function cn() {
  const e = G(!1);
  return Wt() && jt(() => {
    e.value = !0;
  }), e;
}
function dn(e) {
  const t = cn();
  return V(() => (t.value, !!e()));
}
function pn(e = {}) {
  const {
    navigator: t = ln,
    read: n = !1,
    source: o,
    copiedDuring: i = 1500,
    legacy: s = !1
  } = e, r = dn(() => t && "clipboard" in t), a = V(() => r.value || s), l = G(""), c = G(!1), h = rn(() => c.value = !1, i);
  function d() {
    r.value ? t.clipboard.readText().then((f) => {
      l.value = f;
    }) : l.value = m();
  }
  a.value && n && De(["copy", "cut"], d);
  async function u(f = me(o)) {
    a.value && f != null && (r.value ? await t.clipboard.writeText(f) : p(f), l.value = f, c.value = !0, h.start());
  }
  function p(f) {
    const g = document.createElement("textarea");
    g.value = f ?? "", g.style.position = "absolute", g.style.opacity = "0", document.body.appendChild(g), g.select(), document.execCommand("copy"), g.remove();
  }
  function m() {
    var f, g, w;
    return (w = (g = (f = document == null ? void 0 : document.getSelection) == null ? void 0 : f.call(document)) == null ? void 0 : g.toString()) != null ? w : "";
  }
  return {
    isSupported: a,
    text: l,
    copied: c,
    copy: u
  };
}
const we = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ye = "__vueuse_ssr_handlers__", un = /* @__PURE__ */ hn();
function hn() {
  return ye in we || (we[ye] = we[ye] || {}), we[ye];
}
function fn(e, t) {
  return un[e] || t;
}
function mn(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const gn = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, Xe = "vueuse-storage";
function _t(e, t, n, o = {}) {
  var i;
  const {
    flush: s = "pre",
    deep: r = !0,
    listenToStorageChanges: a = !0,
    writeDefaults: l = !0,
    mergeDefaults: c = !1,
    shallow: h,
    window: d = Le,
    eventFilter: u,
    onError: p = (v) => {
      console.error(v);
    }
  } = o, m = (h ? It : G)(t);
  if (!n)
    try {
      n = fn("getDefaultStorage", () => {
        var v;
        return (v = Le) == null ? void 0 : v.localStorage;
      })();
    } catch (v) {
      p(v);
    }
  if (!n)
    return m;
  const f = me(t), g = mn(f), w = (i = o.serializer) != null ? i : gn[g], { pause: y, resume: b } = sn(
    m,
    () => T(m.value),
    { flush: s, deep: r, eventFilter: u }
  );
  return d && a && (De(d, "storage", C), De(d, Xe, P)), C(), m;
  function T(v) {
    try {
      if (v == null)
        n.removeItem(e);
      else {
        const $ = w.write(v), S = n.getItem(e);
        S !== $ && (n.setItem(e, $), d && d.dispatchEvent(new CustomEvent(Xe, {
          detail: {
            key: e,
            oldValue: S,
            newValue: $,
            storageArea: n
          }
        })));
      }
    } catch ($) {
      p($);
    }
  }
  function x(v) {
    const $ = v ? v.newValue : n.getItem(e);
    if ($ == null)
      return l && f !== null && n.setItem(e, w.write(f)), f;
    if (!v && c) {
      const S = w.read($);
      return typeof c == "function" ? c(S, f) : g === "object" && !Array.isArray(S) ? { ...f, ...S } : S;
    } else
      return typeof $ != "string" ? $ : w.read($);
  }
  function P(v) {
    C(v.detail);
  }
  function C(v) {
    if (!(v && v.storageArea !== n)) {
      if (v && v.key == null) {
        m.value = f;
        return;
      }
      if (!(v && v.key !== e)) {
        y();
        try {
          (v == null ? void 0 : v.newValue) !== w.write(m.value) && (m.value = x(v));
        } catch ($) {
          p($);
        } finally {
          v ? mt(b) : b();
        }
      }
    }
  }
}
const wn = {
  key: 1,
  class: "sth-flex sth-flex-col sth-items-center"
}, yn = { class: "sth-isolate sth-flex sth-divide-x sth-divide-gray-200 sth-rounded-lg sth-shadow" }, vn = /* @__PURE__ */ se({
  __name: "TranslationHub",
  props: {
    active: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      validator(e) {
        return ["top-left", "top-right", "bottom-left", "bottom-right"].includes(e);
      },
      default: "bottom-right"
    },
    activeBackgroundColor: {
      type: String,
      default: "#0891b2"
    }
  },
  setup(e) {
    const t = e, n = G(t.position);
    switch (n.value) {
      case "top-left":
        n.value = "sth-top-8 sth-left-8";
        break;
      case "top-right":
        n.value = "sth-top-8 sth-right-8";
        break;
      case "bottom-left":
        n.value = "sth-bottom-8 sth-left-8";
        break;
      case "bottom-right":
        n.value = "sth-bottom-8 sth-right-8";
        break;
    }
    const o = gt(), i = V(() => !!o.button), s = _t("show-translation-keys", !1), r = () => {
      s.value = !1;
    }, a = () => {
      s.value = !0;
    };
    return t.active || (s.value = !1), (l, c) => (D(), oe("div", {
      class: te(["sth-fixed", n.value])
    }, [
      i.value ? pe(l.$slots, "button", {
        key: 0,
        hideTranslationKeys: r,
        showTranslationKeys: a,
        active: Q(s)
      }, void 0, !0) : (D(), oe("div", wn, [
        N("div", yn, [
          N("button", {
            class: te(["hub-button-container sth-text-gray-900 sth-rounded-l-lg sth-group sth-relative sth-min-w-0 sth-flex-1 sth-overflow-hidden sth-py-4 sth-px-4 sth-text-center sth-text-sm sth-font-bold sth-focus:z-10", Q(s) ? "" : "sth-text-white"]),
            style: re({ backgroundColor: Q(s) ? "#fff" : e.activeBackgroundColor }),
            onClick: r
          }, " OFF ", 6),
          N("button", {
            class: te(["hub-button-container sth-rounded-r-lg sth-group sth-relative sth-min-w-0 sth-flex-1 sth-overflow-hidden sth-py-4 sth-px-4 sth-text-center sth-text-sm sth-font-bold sth-focus:z-10", Q(s) ? "sth-text-white" : ""]),
            style: re({ backgroundColor: Q(s) ? e.activeBackgroundColor : "#fff" }),
            onClick: a
          }, " ON ", 6)
        ])
      ]))
    ], 2));
  }
});
const _n = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, fo = /* @__PURE__ */ _n(vn, [["__scopeId", "data-v-b26f2123"]]), bn = ["top", "right", "bottom", "left"], Ue = ["start", "end"], Qe = /* @__PURE__ */ bn.reduce((e, t) => e.concat(t, t + "-" + Ue[0], t + "-" + Ue[1]), []), ue = Math.min, U = Math.max, xn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, $n = {
  start: "end",
  end: "start"
};
function Me(e, t, n) {
  return U(e, ue(t, n));
}
function ee(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function B(e) {
  return e.split("-")[0];
}
function E(e) {
  return e.split("-")[1];
}
function bt(e) {
  return e === "x" ? "y" : "x";
}
function Ve(e) {
  return e === "y" ? "height" : "width";
}
function ge(e) {
  return ["top", "bottom"].includes(B(e)) ? "y" : "x";
}
function Ke(e) {
  return bt(ge(e));
}
function xt(e, t, n) {
  n === void 0 && (n = !1);
  const o = E(e), i = Ke(e), s = Ve(i);
  let r = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = Se(r)), [r, Se(r)];
}
function Sn(e) {
  const t = Se(e);
  return [$e(e), t, $e(t)];
}
function $e(e) {
  return e.replace(/start|end/g, (t) => $n[t]);
}
function Tn(e, t, n) {
  const o = ["left", "right"], i = ["right", "left"], s = ["top", "bottom"], r = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? i : o : t ? o : i;
    case "left":
    case "right":
      return t ? s : r;
    default:
      return [];
  }
}
function Pn(e, t, n, o) {
  const i = E(e);
  let s = Tn(B(e), n === "start", o);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map($e)))), s;
}
function Se(e) {
  return e.replace(/left|right|bottom|top/g, (t) => xn[t]);
}
function Cn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function $t(e) {
  return typeof e != "number" ? Cn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ae(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Ze(e, t, n) {
  let {
    reference: o,
    floating: i
  } = e;
  const s = ge(t), r = Ke(t), a = Ve(r), l = B(t), c = s === "y", h = o.x + o.width / 2 - i.width / 2, d = o.y + o.height / 2 - i.height / 2, u = o[a] / 2 - i[a] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: h,
        y: o.y - i.height
      };
      break;
    case "bottom":
      p = {
        x: h,
        y: o.y + o.height
      };
      break;
    case "right":
      p = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: o.x - i.width,
        y: d
      };
      break;
    default:
      p = {
        x: o.x,
        y: o.y
      };
  }
  switch (E(t)) {
    case "start":
      p[r] -= u * (n && c ? -1 : 1);
      break;
    case "end":
      p[r] += u * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const An = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: r
  } = n, a = s.filter(Boolean), l = await (r.isRTL == null ? void 0 : r.isRTL(t));
  let c = await r.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: h,
    y: d
  } = Ze(c, o, l), u = o, p = {}, m = 0;
  for (let f = 0; f < a.length; f++) {
    const {
      name: g,
      fn: w
    } = a[f], {
      x: y,
      y: b,
      data: T,
      reset: x
    } = await w({
      x: h,
      y: d,
      initialPlacement: o,
      placement: u,
      strategy: i,
      middlewareData: p,
      rects: c,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (h = y ?? h, d = b ?? d, p = {
      ...p,
      [g]: {
        ...p[g],
        ...T
      }
    }, x && m <= 50) {
      m++, typeof x == "object" && (x.placement && (u = x.placement), x.rects && (c = x.rects === !0 ? await r.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : x.rects), {
        x: h,
        y: d
      } = Ze(c, u, l)), f = -1;
      continue;
    }
  }
  return {
    x: h,
    y: d,
    placement: u,
    strategy: i,
    middlewareData: p
  };
};
async function Ae(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: i,
    platform: s,
    rects: r,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: d = "floating",
    altBoundary: u = !1,
    padding: p = 0
  } = ee(t, e), m = $t(p), g = a[u ? d === "floating" ? "reference" : "floating" : d], w = ae(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: h,
    strategy: l
  })), y = d === "floating" ? {
    ...r.floating,
    x: o,
    y: i
  } : r.reference, b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), T = await (s.isElement == null ? void 0 : s.isElement(b)) ? await (s.getScale == null ? void 0 : s.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = ae(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: y,
    offsetParent: b,
    strategy: l
  }) : y);
  return {
    top: (w.top - x.top + m.top) / T.y,
    bottom: (x.bottom - w.bottom + m.bottom) / T.y,
    left: (w.left - x.left + m.left) / T.x,
    right: (x.right - w.right + m.right) / T.x
  };
}
const On = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: i,
      rects: s,
      platform: r,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: h = 0
    } = ee(e, t) || {};
    if (c == null)
      return {};
    const d = $t(h), u = {
      x: n,
      y: o
    }, p = Ke(i), m = Ve(p), f = await r.getDimensions(c), g = p === "y", w = g ? "top" : "left", y = g ? "bottom" : "right", b = g ? "clientHeight" : "clientWidth", T = s.reference[m] + s.reference[p] - u[p] - s.floating[m], x = u[p] - s.reference[p], P = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let C = P ? P[b] : 0;
    (!C || !await (r.isElement == null ? void 0 : r.isElement(P))) && (C = a.floating[b] || s.floating[m]);
    const v = T / 2 - x / 2, $ = C / 2 - f[m] / 2 - 1, S = ue(d[w], $), z = ue(d[y], $), A = S, Y = C - f[m] - z, O = C / 2 - f[m] / 2 + v, H = Me(A, O, Y), L = !l.arrow && E(i) != null && O != H && s.reference[m] / 2 - (O < A ? S : z) - f[m] / 2 < 0, I = L ? O < A ? O - A : O - Y : 0;
    return {
      [p]: u[p] + I,
      data: {
        [p]: H,
        centerOffset: O - H - I,
        ...L && {
          alignmentOffset: I
        }
      },
      reset: L
    };
  }
});
function Nn(e, t, n) {
  return (e ? [...n.filter((i) => E(i) === e), ...n.filter((i) => E(i) !== e)] : n.filter((i) => B(i) === i)).filter((i) => e ? E(i) === e || (t ? $e(i) !== i : !1) : !0);
}
const kn = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, o, i;
      const {
        rects: s,
        middlewareData: r,
        placement: a,
        platform: l,
        elements: c
      } = t, {
        crossAxis: h = !1,
        alignment: d,
        allowedPlacements: u = Qe,
        autoAlignment: p = !0,
        ...m
      } = ee(e, t), f = d !== void 0 || u === Qe ? Nn(d || null, p, u) : u, g = await Ae(t, m), w = ((n = r.autoPlacement) == null ? void 0 : n.index) || 0, y = f[w];
      if (y == null)
        return {};
      const b = xt(y, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== y)
        return {
          reset: {
            placement: f[0]
          }
        };
      const T = [g[B(y)], g[b[0]], g[b[1]]], x = [...((o = r.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: y,
        overflows: T
      }], P = f[w + 1];
      if (P)
        return {
          data: {
            index: w + 1,
            overflows: x
          },
          reset: {
            placement: P
          }
        };
      const C = x.map((S) => {
        const z = E(S.placement);
        return [S.placement, z && h ? (
          // Check along the mainAxis and main crossAxis side.
          S.overflows.slice(0, 2).reduce((A, Y) => A + Y, 0)
        ) : (
          // Check only the mainAxis.
          S.overflows[0]
        ), S.overflows];
      }).sort((S, z) => S[1] - z[1]), $ = ((i = C.filter((S) => S[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        E(S[0]) ? 2 : 3
      ).every((z) => z <= 0))[0]) == null ? void 0 : i[0]) || C[0][0];
      return $ !== a ? {
        data: {
          index: w + 1,
          overflows: x
        },
        reset: {
          placement: $
        }
      } : {};
    }
  };
}, zn = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: i,
        middlewareData: s,
        rects: r,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: h = !0,
        crossAxis: d = !0,
        fallbackPlacements: u,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: f = !0,
        ...g
      } = ee(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = B(i), y = B(a) === a, b = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), T = u || (y || !f ? [Se(a)] : Sn(a));
      !u && m !== "none" && T.push(...Pn(a, f, m, b));
      const x = [a, ...T], P = await Ae(t, g), C = [];
      let v = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (h && C.push(P[w]), d) {
        const A = xt(i, r, b);
        C.push(P[A[0]], P[A[1]]);
      }
      if (v = [...v, {
        placement: i,
        overflows: C
      }], !C.every((A) => A <= 0)) {
        var $, S;
        const A = ((($ = s.flip) == null ? void 0 : $.index) || 0) + 1, Y = x[A];
        if (Y)
          return {
            data: {
              index: A,
              overflows: v
            },
            reset: {
              placement: Y
            }
          };
        let O = (S = v.filter((H) => H.overflows[0] <= 0).sort((H, L) => H.overflows[1] - L.overflows[1])[0]) == null ? void 0 : S.placement;
        if (!O)
          switch (p) {
            case "bestFit": {
              var z;
              const H = (z = v.map((L) => [L.placement, L.overflows.filter((I) => I > 0).reduce((I, Mt) => I + Mt, 0)]).sort((L, I) => L[1] - I[1])[0]) == null ? void 0 : z[0];
              H && (O = H);
              break;
            }
            case "initialPlacement":
              O = a;
              break;
          }
        if (i !== O)
          return {
            reset: {
              placement: O
            }
          };
      }
      return {};
    }
  };
};
async function Rn(e, t) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), r = B(n), a = E(n), l = ge(n) === "y", c = ["left", "top"].includes(r) ? -1 : 1, h = s && l ? -1 : 1, d = ee(t, e);
  let {
    mainAxis: u,
    crossAxis: p,
    alignmentAxis: m
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return a && typeof m == "number" && (p = a === "end" ? m * -1 : m), l ? {
    x: p * h,
    y: u * c
  } : {
    x: u * c,
    y: p * h
  };
}
const En = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o
      } = t, i = await Rn(t, e);
      return {
        x: n + i.x,
        y: o + i.y,
        data: i
      };
    }
  };
}, Hn = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: i
      } = t, {
        mainAxis: s = !0,
        crossAxis: r = !1,
        limiter: a = {
          fn: (g) => {
            let {
              x: w,
              y
            } = g;
            return {
              x: w,
              y
            };
          }
        },
        ...l
      } = ee(e, t), c = {
        x: n,
        y: o
      }, h = await Ae(t, l), d = ge(B(i)), u = bt(d);
      let p = c[u], m = c[d];
      if (s) {
        const g = u === "y" ? "top" : "left", w = u === "y" ? "bottom" : "right", y = p + h[g], b = p - h[w];
        p = Me(y, p, b);
      }
      if (r) {
        const g = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", y = m + h[g], b = m - h[w];
        m = Me(y, m, b);
      }
      const f = a.fn({
        ...t,
        [u]: p,
        [d]: m
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - o
        }
      };
    }
  };
}, Ln = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: o,
        platform: i,
        elements: s
      } = t, {
        apply: r = () => {
        },
        ...a
      } = ee(e, t), l = await Ae(t, a), c = B(n), h = E(n), d = ge(n) === "y", {
        width: u,
        height: p
      } = o.floating;
      let m, f;
      c === "top" || c === "bottom" ? (m = c, f = h === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (f = c, m = h === "end" ? "top" : "bottom");
      const g = p - l[m], w = u - l[f], y = !t.middlewareData.shift;
      let b = g, T = w;
      if (d) {
        const P = u - l.left - l.right;
        T = h || y ? ue(w, P) : P;
      } else {
        const P = p - l.top - l.bottom;
        b = h || y ? ue(g, P) : P;
      }
      if (y && !h) {
        const P = U(l.left, 0), C = U(l.right, 0), v = U(l.top, 0), $ = U(l.bottom, 0);
        d ? T = u - 2 * (P !== 0 || C !== 0 ? P + C : U(l.left, l.right)) : b = p - 2 * (v !== 0 || $ !== 0 ? v + $ : U(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: T,
        availableHeight: b
      });
      const x = await i.getDimensions(s.floating);
      return u !== x.width || p !== x.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function k(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function M(e) {
  return k(e).getComputedStyle(e);
}
const et = Math.min, le = Math.max, Te = Math.round;
function St(e) {
  const t = M(e);
  let n = parseFloat(t.width), o = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = Te(n) !== i || Te(o) !== s;
  return r && (n = i, o = s), { width: n, height: o, fallback: r };
}
function J(e) {
  return Pt(e) ? (e.nodeName || "").toLowerCase() : "";
}
let ve;
function Tt() {
  if (ve)
    return ve;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (ve = e.brands.map((t) => t.brand + "/" + t.version).join(" "), ve) : navigator.userAgent;
}
function F(e) {
  return e instanceof k(e).HTMLElement;
}
function K(e) {
  return e instanceof k(e).Element;
}
function Pt(e) {
  return e instanceof k(e).Node;
}
function tt(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof k(e).ShadowRoot || e instanceof ShadowRoot;
}
function Oe(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: i } = M(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(i);
}
function Dn(e) {
  return ["table", "td", "th"].includes(J(e));
}
function Fe(e) {
  const t = /firefox/i.test(Tt()), n = M(e), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((i) => n.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = n.contain;
    return s != null && s.includes(i);
  });
}
function Ct() {
  return !/^((?!chrome|android).)*safari/i.test(Tt());
}
function qe(e) {
  return ["html", "body", "#document"].includes(J(e));
}
function At(e) {
  return K(e) ? e : e.contextElement;
}
const Ot = { x: 1, y: 1 };
function ne(e) {
  const t = At(e);
  if (!F(t))
    return Ot;
  const n = t.getBoundingClientRect(), { width: o, height: i, fallback: s } = St(t);
  let r = (s ? Te(n.width) : n.width) / o, a = (s ? Te(n.height) : n.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function he(e, t, n, o) {
  var i, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), a = At(e);
  let l = Ot;
  t && (o ? K(o) && (l = ne(o)) : l = ne(e));
  const c = a ? k(a) : window, h = !Ct() && n;
  let d = (r.left + (h && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, u = (r.top + (h && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, p = r.width / l.x, m = r.height / l.y;
  if (a) {
    const f = k(a), g = o && K(o) ? k(o) : o;
    let w = f.frameElement;
    for (; w && o && g !== f; ) {
      const y = ne(w), b = w.getBoundingClientRect(), T = getComputedStyle(w);
      b.x += (w.clientLeft + parseFloat(T.paddingLeft)) * y.x, b.y += (w.clientTop + parseFloat(T.paddingTop)) * y.y, d *= y.x, u *= y.y, p *= y.x, m *= y.y, d += b.x, u += b.y, w = k(w).frameElement;
    }
  }
  return { width: p, height: m, top: u, right: d + p, bottom: u + m, left: d, x: d, y: u };
}
function q(e) {
  return ((Pt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Ne(e) {
  return K(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Nt(e) {
  return he(q(e)).left + Ne(e).scrollLeft;
}
function fe(e) {
  if (J(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || tt(e) && e.host || q(e);
  return tt(t) ? t.host : t;
}
function kt(e) {
  const t = fe(e);
  return qe(t) ? t.ownerDocument.body : F(t) && Oe(t) ? t : kt(t);
}
function Pe(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = kt(e), i = o === ((n = e.ownerDocument) == null ? void 0 : n.body), s = k(o);
  return i ? t.concat(s, s.visualViewport || [], Oe(o) ? o : []) : t.concat(o, Pe(o));
}
function nt(e, t, n) {
  return t === "viewport" ? ae(function(o, i) {
    const s = k(o), r = q(o), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, h = 0, d = 0;
    if (a) {
      l = a.width, c = a.height;
      const u = Ct();
      (u || !u && i === "fixed") && (h = a.offsetLeft, d = a.offsetTop);
    }
    return { width: l, height: c, x: h, y: d };
  }(e, n)) : K(t) ? ae(function(o, i) {
    const s = he(o, !0, i === "fixed"), r = s.top + o.clientTop, a = s.left + o.clientLeft, l = F(o) ? ne(o) : { x: 1, y: 1 };
    return { width: o.clientWidth * l.x, height: o.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, n)) : ae(function(o) {
    const i = q(o), s = Ne(o), r = o.ownerDocument.body, a = le(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = le(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Nt(o);
    const h = -s.scrollTop;
    return M(r).direction === "rtl" && (c += le(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: h };
  }(q(e)));
}
function ot(e) {
  return F(e) && M(e).position !== "fixed" ? e.offsetParent : null;
}
function it(e) {
  const t = k(e);
  let n = ot(e);
  for (; n && Dn(n) && M(n).position === "static"; )
    n = ot(n);
  return n && (J(n) === "html" || J(n) === "body" && M(n).position === "static" && !Fe(n)) ? t : n || function(o) {
    let i = fe(o);
    for (; F(i) && !qe(i); ) {
      if (Fe(i))
        return i;
      i = fe(i);
    }
    return null;
  }(e) || t;
}
function Mn(e, t, n) {
  const o = F(t), i = q(t), s = he(e, !0, n === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (o || !o && n !== "fixed")
    if ((J(t) !== "body" || Oe(i)) && (r = Ne(t)), F(t)) {
      const l = he(t, !0);
      a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
    } else
      i && (a.x = Nt(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const Fn = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: i } = e;
  const s = n === "clippingAncestors" ? function(c, h) {
    const d = h.get(c);
    if (d)
      return d;
    let u = Pe(c).filter((g) => K(g) && J(g) !== "body"), p = null;
    const m = M(c).position === "fixed";
    let f = m ? fe(c) : c;
    for (; K(f) && !qe(f); ) {
      const g = M(f), w = Fe(f);
      (m ? w || p : w || g.position !== "static" || !p || !["absolute", "fixed"].includes(p.position)) ? p = g : u = u.filter((y) => y !== f), f = fe(f);
    }
    return h.set(c, u), u;
  }(t, this._c) : [].concat(n), r = [...s, o], a = r[0], l = r.reduce((c, h) => {
    const d = nt(t, h, i);
    return c.top = le(d.top, c.top), c.right = et(d.right, c.right), c.bottom = et(d.bottom, c.bottom), c.left = le(d.left, c.left), c;
  }, nt(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const i = F(n), s = q(n);
  if (n === s)
    return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && o !== "fixed") && ((J(n) !== "body" || Oe(s)) && (r = Ne(n)), F(n))) {
    const c = he(n);
    a = ne(n), l.x = c.x + n.clientLeft, l.y = c.y + n.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: K, getDimensions: function(e) {
  return F(e) ? St(e) : e.getBoundingClientRect();
}, getOffsetParent: it, getDocumentElement: q, getScale: ne, async getElementRects(e) {
  let { reference: t, floating: n, strategy: o } = e;
  const i = this.getOffsetParent || it, s = this.getDimensions;
  return { reference: Mn(t, await i(n), o), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => M(e).direction === "rtl" }, Bn = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), i = { platform: Fn, ...n }, s = { ...i.platform, _c: o };
  return An(e, t, { ...i, platform: s });
}, Z = {
  // Disable popper components
  disabled: !1,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: !1,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5e3,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: !0,
  // Flip to the opposite placement if needed
  flip: !0,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: !0,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: !0,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: !1,
      // Enable HTML content in directive
      html: !1,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: !0,
      // Hide on clock outside
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function Be(e, t) {
  let n = Z.themes[e] || {}, o;
  do
    o = n[t], typeof o > "u" ? n.$extend ? n = Z.themes[n.$extend] || {} : (n = null, o = Z[t]) : n = null;
  while (n);
  return o;
}
function In(e) {
  const t = [e];
  let n = Z.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Z.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((o) => `v-popper--theme-${o}`);
}
function st(e) {
  const t = [e];
  let n = Z.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Z.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let ie = !1;
if (typeof window < "u") {
  ie = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        ie = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let zt = !1;
typeof window < "u" && typeof navigator < "u" && (zt = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Wn = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), rt = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, at = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function lt(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function Re() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const R = [];
let X = null;
const ct = {};
function dt(e) {
  let t = ct[e];
  return t || (t = ct[e] = []), t;
}
let Ie = function() {
};
typeof window < "u" && (Ie = window.Element);
function _(e) {
  return function(t) {
    return Be(t.theme, e);
  };
}
const Ee = "__floating-vue__popper", Rt = () => se({
  name: "VPopper",
  provide() {
    return {
      [Ee]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [Ee]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: _("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: _("positioningDisabled")
    },
    placement: {
      type: String,
      default: _("placement"),
      validator: (e) => Wn.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: _("delay")
    },
    distance: {
      type: [Number, String],
      default: _("distance")
    },
    skidding: {
      type: [Number, String],
      default: _("skidding")
    },
    triggers: {
      type: Array,
      default: _("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: _("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: _("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: _("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: _("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: _("popperHideTriggers")
    },
    container: {
      type: [String, Object, Ie, Boolean],
      default: _("container")
    },
    boundary: {
      type: [String, Ie],
      default: _("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: _("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: _("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: _("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: _("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: _("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: _("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: _("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: _("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: _("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: _("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: _("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: _("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: _("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: _("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: _("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: _("flip")
    },
    shift: {
      type: Boolean,
      default: _("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: _("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: _("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: _("disposeTimeout")
    }
  },
  emits: [
    "show",
    "hide",
    "update:shown",
    "apply-show",
    "apply-hide",
    "close-group",
    "close-directive",
    "auto-hide",
    "resize",
    "dispose"
  ],
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[Ee]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    ...[
      "triggers",
      "positioningDisabled"
    ].reduce((e, t) => (e[t] = "$_refreshListeners", e), {}),
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.$_isDisposed = !0, this.randomId = `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`, this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = !1, force: n = !1 } = {}) {
      var o, i;
      (o = this.parentPopper) != null && o.lockedChild && this.parentPopper.lockedChild !== this || (this.$_pendingHide = !1, (n || !this.disabled) && (((i = this.parentPopper) == null ? void 0 : i.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var n;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.$_pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((n = this.parentPopper) == null ? void 0 : n.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var e;
      this.$_isDisposed && (this.$_isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.$_isDisposed || (this.$_isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"), this.$emit("dispose"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.$_isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(En({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(kn({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(Hn({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(zn({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(On({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: o, rects: i, middlewareData: s }) => {
          let r;
          const { centerOffset: a } = s.arrow;
          return o.startsWith("top") || o.startsWith("bottom") ? r = Math.abs(a) > i.reference.width / 2 : r = Math.abs(a) > i.reference.height / 2, {
            data: {
              overflow: r
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const o = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: i, placement: s, middlewareData: r }) => {
            var a;
            if ((a = r.autoSize) != null && a.skip)
              return {};
            let l, c;
            return s.startsWith("top") || s.startsWith("bottom") ? l = i.reference.width : c = i.reference.height, this.$_innerNode.style[o === "min" ? "minWidth" : o === "max" ? "maxWidth" : "width"] = l != null ? `${l}px` : null, this.$_innerNode.style[o === "min" ? "minHeight" : o === "max" ? "maxHeight" : "height"] = c != null ? `${c}px` : null, {
              data: {
                skip: !0
              },
              reset: {
                rects: !0
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(Ln({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: o, availableHeight: i }) => {
          this.$_innerNode.style.maxWidth = o != null ? `${o}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
        }
      })));
      const n = await Bn(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: n.x,
        y: n.y,
        placement: n.placement,
        strategy: n.strategy,
        arrow: {
          ...n.middlewareData.arrow,
          ...n.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e = null, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), X && this.instantMove && X.instantMove && X !== this.parentPopper) {
        X.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e = null, t = !1) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (X = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await Re(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Pe(this.$_referenceNode),
        ...Pe(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), o = n.parentNode.getBoundingClientRect(), i = t.x + t.width / 2 - (o.left + n.offsetLeft), s = t.y + t.height / 2 - (o.top + n.offsetTop);
        this.result.transformOrigin = `${i}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let n = 0; n < R.length; n++)
          t = R[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      R.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of st(this.theme))
        dt(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await Re(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, lt(R, this), R.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of st(this.theme)) {
        const o = dt(n);
        lt(o, this), o.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      X === this && (X = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await Re(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.$_isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (n) => {
        this.isShown && !this.$_hideInProgress || (n.usedByTooltip = !0, !this.$_preventShow && this.show({ event: n }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, rt, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], rt, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, at, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], at, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((o) => o.addEventListener(t, n, ie ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, o, i) {
      let s = n;
      o != null && (s = typeof o == "function" ? o(s) : o), s.forEach((r) => {
        const a = t[r];
        a && this.$_registerEventListeners(e, a, i);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: o, eventType: i, handler: s } = n;
        !e || e === i ? o.forEach((r) => r.removeEventListener(i, s)) : t.push(n);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.$_isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const n of this.$_targetNodes) {
        const o = n.getAttribute(e);
        o && (n.removeAttribute(e), n.setAttribute(t, o));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const n in e) {
          const o = e[n];
          o == null ? t.removeAttribute(n) : t.setAttribute(n, o);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.$_pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (ce >= e.left && ce <= e.right && de >= e.top && de <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = ce - W, o = de - j, i = t.left + t.width / 2 - W + (t.top + t.height / 2) - j + t.width + t.height, s = W + n * i, r = j + o * i;
        return _e(W, j, s, r, t.left, t.top, t.left, t.bottom) || // Left edge
        _e(W, j, s, r, t.left, t.top, t.right, t.top) || // Top edge
        _e(W, j, s, r, t.right, t.top, t.right, t.bottom) || // Right edge
        _e(W, j, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
typeof document < "u" && typeof window < "u" && (zt ? (document.addEventListener("touchstart", pt, ie ? {
  passive: !0,
  capture: !0
} : !0), document.addEventListener("touchend", Vn, ie ? {
  passive: !0,
  capture: !0
} : !0)) : (window.addEventListener("mousedown", pt, !0), window.addEventListener("click", jn, !0)), window.addEventListener("resize", Gn));
function pt(e) {
  for (let t = 0; t < R.length; t++) {
    const n = R[t];
    try {
      const o = n.popperNode();
      n.$_mouseDownContains = o.contains(e.target);
    } catch {
    }
  }
}
function jn(e) {
  Et(e);
}
function Vn(e) {
  Et(e, !0);
}
function Et(e, t = !1) {
  const n = {};
  for (let o = R.length - 1; o >= 0; o--) {
    const i = R[o];
    try {
      const s = i.$_containsGlobalTarget = Kn(i, e);
      i.$_pendingHide = !1, requestAnimationFrame(() => {
        if (i.$_pendingHide = !1, !n[i.randomId] && ut(i, s, e)) {
          if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = i.parentPopper;
            for (; a; )
              n[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = i.parentPopper;
          for (; r && ut(r, r.$_containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function Kn(e, t) {
  const n = e.popperNode();
  return e.$_mouseDownContains || n.contains(t.target);
}
function ut(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || qn(e, n) && !t;
}
function qn(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function Gn(e) {
  for (let t = 0; t < R.length; t++)
    R[t].$_computePosition(e);
}
let W = 0, j = 0, ce = 0, de = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  W = ce, j = de, ce = e.clientX, de = e.clientY;
}, ie ? {
  passive: !0
} : void 0);
function _e(e, t, n, o, i, s, r, a) {
  const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (n - e) - (r - i) * (o - t)), c = ((n - e) * (t - s) - (o - t) * (e - i)) / ((a - s) * (n - e) - (r - i) * (o - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const Jn = {
  extends: Rt()
}, Ge = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
};
function Yn(e, t, n, o, i, s) {
  return D(), oe("div", {
    ref: "reference",
    class: te(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    pe(e.$slots, "default", qt(Gt(e.slotData)))
  ], 2);
}
const Xn = /* @__PURE__ */ Ge(Jn, [["render", Yn]]);
function Un() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var o = e.indexOf("rv:");
    return parseInt(e.substring(o + 3, e.indexOf(".", o)), 10);
  }
  var i = e.indexOf("Edge/");
  return i > 0 ? parseInt(e.substring(i + 5, e.indexOf(".", i)), 10) : -1;
}
let be;
function We() {
  We.init || (We.init = !0, be = Un() !== -1);
}
var ke = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    We(), mt(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", be && this.$el.appendChild(e), e.data = "about:blank", be || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!be && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const Qn = /* @__PURE__ */ Jt("data-v-b329ee4c");
Vt("data-v-b329ee4c");
const Zn = {
  class: "resize-observer",
  tabindex: "-1"
};
Kt();
const eo = /* @__PURE__ */ Qn((e, t, n, o, i, s) => (D(), Ce("div", Zn)));
ke.render = eo;
ke.__scopeId = "data-v-b329ee4c";
ke.__file = "src/components/ResizeObserver.vue";
const Ht = (e = "theme") => ({
  computed: {
    themeClass() {
      return In(this[e]);
    }
  }
}), to = se({
  name: "VPopperContent",
  components: {
    ResizeObserver: ke
  },
  mixins: [
    Ht()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), no = ["id", "aria-hidden", "tabindex", "data-popper-placement"], oo = {
  ref: "inner",
  class: "v-popper__inner"
}, io = /* @__PURE__ */ N("div", { class: "v-popper__arrow-outer" }, null, -1), so = /* @__PURE__ */ N("div", { class: "v-popper__arrow-inner" }, null, -1), ro = [
  io,
  so
];
function ao(e, t, n, o, i, s) {
  const r = He("ResizeObserver");
  return D(), oe("div", {
    id: e.popperId,
    ref: "popover",
    class: te(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: re(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Yt((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    N("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    N("div", {
      class: "v-popper__wrapper",
      style: re(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      N("div", oo, [
        e.mounted ? (D(), oe(wt, { key: 0 }, [
          N("div", null, [
            pe(e.$slots, "default")
          ]),
          e.handleResize ? (D(), Ce(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : Ye("", !0)
        ], 64)) : Ye("", !0)
      ], 512),
      N("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: re(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, ro, 4)
    ], 4)
  ], 46, no);
}
const Lt = /* @__PURE__ */ Ge(to, [["render", ao]]), Dt = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
}, lo = se({
  name: "VPopperWrapper",
  components: {
    Popper: Xn,
    PopperContent: Lt
  },
  mixins: [
    Dt,
    Ht("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function co(e, t, n, o, i, s) {
  const r = He("PopperContent"), a = He("Popper");
  return D(), Ce(a, {
    ref: "popper",
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: te([
      e.themeClass
    ])
  }, {
    default: xe(({
      popperId: l,
      isShown: c,
      shouldMountContent: h,
      skipTransition: d,
      autoHide: u,
      show: p,
      hide: m,
      handleResize: f,
      onResize: g,
      classes: w,
      result: y
    }) => [
      pe(e.$slots, "default", {
        shown: c,
        show: p,
        hide: m
      }),
      Xt(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: h,
        "skip-transition": d,
        "auto-hide": u,
        "handle-resize": f,
        classes: w,
        result: y,
        onHide: m,
        onResize: g
      }, {
        default: xe(() => [
          pe(e.$slots, "popper", {
            shown: c,
            hide: m
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 8, ["theme", "target-nodes", "popper-node", "class"]);
}
const Je = /* @__PURE__ */ Ge(lo, [["render", co]]);
({
  ...Je
});
const po = {
  ...Je,
  name: "VMenu",
  vPopperTheme: "menu"
};
({
  ...Je
});
se({
  name: "VTooltipDirective",
  components: {
    Popper: Rt(),
    PopperContent: Lt
  },
  mixins: [
    Dt
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Be(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Be(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, n = this.content(this);
        n.then ? n.then((o) => this.onResult(t, o)) : this.onResult(t, n);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
});
const uo = po, mo = /* @__PURE__ */ se({
  __name: "TranslationHelper",
  props: {
    translationKey: {
      type: String,
      required: !0
    },
    translation: {
      type: String,
      default: null
    }
  },
  setup(e) {
    const t = e, n = gt(), o = V(() => !!n), i = V(() => t.translation === null || t.translation === t.translationKey), s = G(""), r = V(() => {
      var d, u;
      return o.value ? n !== void 0 && i.value ? ((u = (d = n == null ? void 0 : n.default) == null ? void 0 : d.call(n)[0]) == null ? void 0 : u.children) ?? null : t.translation : t.translation ? t.translation : t.translationKey;
    }), a = V(() => _t("show-translation-keys", !1)), { copy: l } = pn({
      source: t.translationKey,
      legacy: !0
    }), c = () => {
      s.value = "Copied!", l(), setTimeout(() => {
        s.value = "";
      }, 1e3);
    }, h = V(() => s.value !== "" ? s.value : t.translationKey);
    return (d, u) => a.value.value ? (D(), Ce(Q(uo), { key: 0 }, {
      popper: xe(() => [
        N("button", {
          class: "sth-p-3",
          onClick: c
        }, ze(h.value), 1)
      ]),
      default: xe(() => [
        N("span", null, ze(r.value), 1)
      ]),
      _: 1
    })) : (D(), oe(wt, { key: 1 }, [
      Ut(ze(r.value), 1)
    ], 64));
  }
});
export {
  mo as TranslationHelper,
  fo as TranslationHub
};
