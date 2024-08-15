function R(r) {
  "@babel/helpers - typeof";
  return R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, R(r);
}
function h(r) {
  if (r === null || r === !0 || r === !1)
    return NaN;
  var t = Number(r);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function s(r, t) {
  if (t.length < r)
    throw new TypeError(r + " argument" + (r > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function c(r) {
  s(1, arguments);
  var t = Object.prototype.toString.call(r);
  return r instanceof Date || R(r) === "object" && t === "[object Date]" ? new Date(r.getTime()) : typeof r == "number" || t === "[object Number]" ? new Date(r) : ((typeof r == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function te(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return isNaN(n) ? /* @__PURE__ */ new Date(NaN) : (n && e.setDate(e.getDate() + n), e);
}
function Le(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  if (isNaN(n))
    return /* @__PURE__ */ new Date(NaN);
  if (!n)
    return e;
  var a = e.getDate(), o = new Date(e.getTime());
  o.setMonth(e.getMonth() + n + 1, 0);
  var i = o.getDate();
  return a >= i ? o : (e.setFullYear(o.getFullYear(), o.getMonth(), a), e);
}
function be(r, t) {
  if (s(2, arguments), !t || R(t) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var e = t.years ? h(t.years) : 0, n = t.months ? h(t.months) : 0, a = t.weeks ? h(t.weeks) : 0, o = t.days ? h(t.days) : 0, i = t.hours ? h(t.hours) : 0, u = t.minutes ? h(t.minutes) : 0, l = t.seconds ? h(t.seconds) : 0, f = c(r), v = n || e ? Le(f, n + e * 12) : f, d = o || a ? te(v, o + a * 7) : v, g = u + i * 60, m = l + g * 60, w = m * 1e3, D = new Date(d.getTime() + w);
  return D;
}
function Ce(r) {
  s(1, arguments);
  var t = c(r), e = t.getDay();
  return e === 0 || e === 6;
}
function Rt(r) {
  return s(1, arguments), c(r).getDay() === 0;
}
function Dr(r) {
  return s(1, arguments), c(r).getDay() === 6;
}
function br(r, t) {
  s(2, arguments);
  var e = c(r), n = Ce(e), a = h(t);
  if (isNaN(a))
    return /* @__PURE__ */ new Date(NaN);
  var o = e.getHours(), i = a < 0 ? -1 : 1, u = h(a / 5);
  e.setDate(e.getDate() + u * 7);
  for (var l = Math.abs(a % 5); l > 0; )
    e.setDate(e.getDate() + i), Ce(e) || (l -= 1);
  return n && Ce(e) && a !== 0 && (Dr(e) && e.setDate(e.getDate() + (i < 0 ? 2 : -1)), Rt(e) && e.setDate(e.getDate() + (i < 0 ? 1 : -2))), e.setHours(o), e;
}
function qe(r, t) {
  s(2, arguments);
  var e = c(r).getTime(), n = h(t);
  return new Date(e + n);
}
var Mr = 36e5;
function Lt(r, t) {
  s(2, arguments);
  var e = h(t);
  return qe(r, e * Mr);
}
var qt = {};
function $() {
  return qt;
}
function Or(r) {
  qt = r;
}
function G(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : v.weekStartsOn) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.weekStartsOn) !== null && e !== void 0 ? e : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var g = c(r), m = g.getDay(), w = (m < d ? 7 : 0) + m - d;
  return g.setDate(g.getDate() - w), g.setHours(0, 0, 0, 0), g;
}
function ae(r) {
  return s(1, arguments), G(r, {
    weekStartsOn: 1
  });
}
function ve(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = /* @__PURE__ */ new Date(0);
  n.setFullYear(e + 1, 0, 4), n.setHours(0, 0, 0, 0);
  var a = ae(n), o = /* @__PURE__ */ new Date(0);
  o.setFullYear(e, 0, 4), o.setHours(0, 0, 0, 0);
  var i = ae(o);
  return t.getTime() >= a.getTime() ? e + 1 : t.getTime() >= i.getTime() ? e : e - 1;
}
function ue(r) {
  s(1, arguments);
  var t = ve(r), e = /* @__PURE__ */ new Date(0);
  e.setFullYear(t, 0, 4), e.setHours(0, 0, 0, 0);
  var n = ae(e);
  return n;
}
function L(r) {
  var t = new Date(Date.UTC(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds(), r.getMilliseconds()));
  return t.setUTCFullYear(r.getFullYear()), r.getTime() - t.getTime();
}
function Ye(r) {
  s(1, arguments);
  var t = c(r);
  return t.setHours(0, 0, 0, 0), t;
}
var kr = 864e5;
function ee(r, t) {
  s(2, arguments);
  var e = Ye(r), n = Ye(t), a = e.getTime() - L(e), o = n.getTime() - L(n);
  return Math.round((a - o) / kr);
}
function Cr(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = ee(e, ue(e)), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), e = ue(o), e.setDate(e.getDate() + a), e;
}
function Nr(r, t) {
  s(2, arguments);
  var e = h(t);
  return Cr(r, ve(r) + e);
}
var Yr = 6e4;
function At(r, t) {
  s(2, arguments);
  var e = h(t);
  return qe(r, e * Yr);
}
function Qt(r, t) {
  s(2, arguments);
  var e = h(t), n = e * 3;
  return Le(r, n);
}
function xr(r, t) {
  s(2, arguments);
  var e = h(t);
  return qe(r, e * 1e3);
}
function ot(r, t) {
  s(2, arguments);
  var e = h(t), n = e * 7;
  return te(r, n);
}
function _r(r, t) {
  s(2, arguments);
  var e = h(t);
  return Le(r, e * 12);
}
function Hi(r, t, e) {
  s(2, arguments);
  var n = c(r == null ? void 0 : r.start).getTime(), a = c(r == null ? void 0 : r.end).getTime(), o = c(t == null ? void 0 : t.start).getTime(), i = c(t == null ? void 0 : t.end).getTime();
  if (!(n <= a && o <= i))
    throw new RangeError("Invalid interval");
  return e != null && e.inclusive ? n <= i && o <= a : n < i && o < a;
}
function Sr(r) {
  s(1, arguments);
  var t;
  if (r && typeof r.forEach == "function")
    t = r;
  else if (R(r) === "object" && r !== null)
    t = Array.prototype.slice.call(r);
  else
    return /* @__PURE__ */ new Date(NaN);
  var e;
  return t.forEach(function(n) {
    var a = c(n);
    (e === void 0 || e < a || isNaN(Number(a))) && (e = a);
  }), e || /* @__PURE__ */ new Date(NaN);
}
function Ir(r) {
  s(1, arguments);
  var t;
  if (r && typeof r.forEach == "function")
    t = r;
  else if (R(r) === "object" && r !== null)
    t = Array.prototype.slice.call(r);
  else
    return /* @__PURE__ */ new Date(NaN);
  var e;
  return t.forEach(function(n) {
    var a = c(n);
    (e === void 0 || e > a || isNaN(a.getDate())) && (e = a);
  }), e || /* @__PURE__ */ new Date(NaN);
}
function Fi(r, t) {
  var e = t.start, n = t.end;
  return s(2, arguments), Ir([Sr([r, e]), n]);
}
function Ri(r, t) {
  s(2, arguments);
  var e = c(r);
  if (isNaN(Number(e)))
    return NaN;
  var n = e.getTime(), a;
  t == null ? a = [] : typeof t.forEach == "function" ? a = t : a = Array.prototype.slice.call(t);
  var o, i;
  return a.forEach(function(u, l) {
    var f = c(u);
    if (isNaN(Number(f))) {
      o = NaN, i = NaN;
      return;
    }
    var v = Math.abs(n - f.getTime());
    (o == null || v < Number(i)) && (o = l, i = v);
  }), o;
}
function Li(r, t) {
  s(2, arguments);
  var e = c(r);
  if (isNaN(Number(e)))
    return /* @__PURE__ */ new Date(NaN);
  var n = e.getTime(), a;
  t == null ? a = [] : typeof t.forEach == "function" ? a = t : a = Array.prototype.slice.call(t);
  var o, i;
  return a.forEach(function(u) {
    var l = c(u);
    if (isNaN(Number(l))) {
      o = /* @__PURE__ */ new Date(NaN), i = NaN;
      return;
    }
    var f = Math.abs(n - l.getTime());
    (o == null || f < Number(i)) && (o = l, i = f);
  }), o;
}
function Z(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = e.getTime() - n.getTime();
  return a < 0 ? -1 : a > 0 ? 1 : a;
}
function qi(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = e.getTime() - n.getTime();
  return a > 0 ? -1 : a < 0 ? 1 : a;
}
var jt = 7, Er = 365.2425, Pr = Math.pow(10, 8) * 24 * 60 * 60 * 1e3, me = 6e4, he = 36e5, ut = 1e3, Ai = -Pr, Xt = 60, Bt = 3, Gt = 12, zt = 4, Ae = 3600, st = 60, lt = Ae * 24, Wr = lt * 7, Jt = lt * Er, Vt = Jt / 12, Ur = Vt * 3;
function Qi(r) {
  s(1, arguments);
  var t = r / jt;
  return Math.floor(t);
}
function Qe(r, t) {
  s(2, arguments);
  var e = Ye(r), n = Ye(t);
  return e.getTime() === n.getTime();
}
function $r(r) {
  return s(1, arguments), r instanceof Date || R(r) === "object" && Object.prototype.toString.call(r) === "[object Date]";
}
function ne(r) {
  if (s(1, arguments), !$r(r) && typeof r != "number")
    return !1;
  var t = c(r);
  return !isNaN(Number(t));
}
function ji(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  if (!ne(e) || !ne(n))
    return NaN;
  var a = ee(e, n), o = a < 0 ? -1 : 1, i = h(a / 7), u = i * 5;
  for (n = te(n, i * 7); !Qe(e, n); )
    u += Ce(n) ? 0 : o, n = te(n, o);
  return u === 0 ? 0 : u;
}
function Hr(r, t) {
  return s(2, arguments), ve(r) - ve(t);
}
var Fr = 6048e5;
function Xi(r, t) {
  s(2, arguments);
  var e = ae(r), n = ae(t), a = e.getTime() - L(e), o = n.getTime() - L(n);
  return Math.round((a - o) / Fr);
}
function Ze(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = e.getFullYear() - n.getFullYear(), o = e.getMonth() - n.getMonth();
  return a * 12 + o;
}
function kt(r) {
  s(1, arguments);
  var t = c(r), e = Math.floor(t.getMonth() / 3) + 1;
  return e;
}
function Ge(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = e.getFullYear() - n.getFullYear(), o = kt(e) - kt(n);
  return a * 4 + o;
}
var Rr = 6048e5;
function Ke(r, t, e) {
  s(2, arguments);
  var n = G(r, e), a = G(t, e), o = n.getTime() - L(n), i = a.getTime() - L(a);
  return Math.round((o - i) / Rr);
}
function We(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getFullYear() - n.getFullYear();
}
function Ct(r, t) {
  var e = r.getFullYear() - t.getFullYear() || r.getMonth() - t.getMonth() || r.getDate() - t.getDate() || r.getHours() - t.getHours() || r.getMinutes() - t.getMinutes() || r.getSeconds() - t.getSeconds() || r.getMilliseconds() - t.getMilliseconds();
  return e < 0 ? -1 : e > 0 ? 1 : e;
}
function Zt(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = Ct(e, n), o = Math.abs(ee(e, n));
  e.setDate(e.getDate() - a * o);
  var i = +(Ct(e, n) === -a), u = a * (o - i);
  return u === 0 ? 0 : u;
}
function ct(r, t) {
  return s(2, arguments), c(r).getTime() - c(t).getTime();
}
var Nt = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function(t) {
    return t < 0 ? Math.ceil(t) : Math.floor(t);
  }
  // Math.trunc is not supported by IE
}, Lr = "trunc";
function ge(r) {
  return r ? Nt[r] : Nt[Lr];
}
function et(r, t, e) {
  s(2, arguments);
  var n = ct(r, t) / he;
  return ge(e == null ? void 0 : e.roundingMethod)(n);
}
function qr(r, t) {
  s(2, arguments);
  var e = h(t);
  return Nr(r, -e);
}
function Bi(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = Z(e, n), o = Math.abs(Hr(e, n));
  e = qr(e, a * o);
  var i = +(Z(e, n) === -a), u = a * (o - i);
  return u === 0 ? 0 : u;
}
function tt(r, t, e) {
  s(2, arguments);
  var n = ct(r, t) / me;
  return ge(e == null ? void 0 : e.roundingMethod)(n);
}
function Kt(r) {
  s(1, arguments);
  var t = c(r);
  return t.setHours(23, 59, 59, 999), t;
}
function er(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth();
  return t.setFullYear(t.getFullYear(), e + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function Ar(r) {
  s(1, arguments);
  var t = c(r);
  return Kt(t).getTime() === er(t).getTime();
}
function ft(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = Z(e, n), o = Math.abs(Ze(e, n)), i;
  if (o < 1)
    i = 0;
  else {
    e.getMonth() === 1 && e.getDate() > 27 && e.setDate(30), e.setMonth(e.getMonth() - a * o);
    var u = Z(e, n) === -a;
    Ar(c(r)) && o === 1 && Z(r, n) === 1 && (u = !1), i = a * (o - Number(u));
  }
  return i === 0 ? 0 : i;
}
function Gi(r, t, e) {
  s(2, arguments);
  var n = ft(r, t) / 3;
  return ge(e == null ? void 0 : e.roundingMethod)(n);
}
function Ne(r, t, e) {
  s(2, arguments);
  var n = ct(r, t) / 1e3;
  return ge(e == null ? void 0 : e.roundingMethod)(n);
}
function zi(r, t, e) {
  s(2, arguments);
  var n = Zt(r, t) / 7;
  return ge(e == null ? void 0 : e.roundingMethod)(n);
}
function Qr(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t), a = Z(e, n), o = Math.abs(We(e, n));
  e.setFullYear(1584), n.setFullYear(1584);
  var i = Z(e, n) === -a, u = a * (o - Number(i));
  return u === 0 ? 0 : u;
}
function jr(r, t) {
  var e;
  s(1, arguments);
  var n = r || {}, a = c(n.start), o = c(n.end), i = o.getTime();
  if (!(a.getTime() <= i))
    throw new RangeError("Invalid interval");
  var u = [], l = a;
  l.setHours(0, 0, 0, 0);
  var f = Number((e = t == null ? void 0 : t.step) !== null && e !== void 0 ? e : 1);
  if (f < 1 || isNaN(f))
    throw new RangeError("`options.step` must be a number greater than 1");
  for (; l.getTime() <= i; )
    u.push(c(l)), l.setDate(l.getDate() + f), l.setHours(0, 0, 0, 0);
  return u;
}
function Ji(r, t) {
  var e;
  s(1, arguments);
  var n = r || {}, a = c(n.start), o = c(n.end), i = a.getTime(), u = o.getTime();
  if (!(i <= u))
    throw new RangeError("Invalid interval");
  var l = [], f = a;
  f.setMinutes(0, 0, 0);
  var v = Number((e = t == null ? void 0 : t.step) !== null && e !== void 0 ? e : 1);
  if (v < 1 || isNaN(v))
    throw new RangeError("`options.step` must be a number greater than 1");
  for (; f.getTime() <= u; )
    l.push(c(f)), f = Lt(f, v);
  return l;
}
function rt(r) {
  s(1, arguments);
  var t = c(r);
  return t.setSeconds(0, 0), t;
}
function Vi(r, t) {
  var e;
  s(1, arguments);
  var n = rt(c(r.start)), a = c(r.end), o = n.getTime(), i = a.getTime();
  if (o >= i)
    throw new RangeError("Invalid interval");
  var u = [], l = n, f = Number((e = t == null ? void 0 : t.step) !== null && e !== void 0 ? e : 1);
  if (f < 1 || isNaN(f))
    throw new RangeError("`options.step` must be a number equal to or greater than 1");
  for (; l.getTime() <= i; )
    u.push(c(l)), l = At(l, f);
  return u;
}
function Zi(r) {
  s(1, arguments);
  var t = r || {}, e = c(t.start), n = c(t.end), a = n.getTime(), o = [];
  if (!(e.getTime() <= a))
    throw new RangeError("Invalid interval");
  var i = e;
  for (i.setHours(0, 0, 0, 0), i.setDate(1); i.getTime() <= a; )
    o.push(c(i)), i.setMonth(i.getMonth() + 1);
  return o;
}
function Ue(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth(), n = e - e % 3;
  return t.setMonth(n, 1), t.setHours(0, 0, 0, 0), t;
}
function Ki(r) {
  s(1, arguments);
  var t = r || {}, e = c(t.start), n = c(t.end), a = n.getTime();
  if (!(e.getTime() <= a))
    throw new RangeError("Invalid interval");
  var o = Ue(e), i = Ue(n);
  a = i.getTime();
  for (var u = [], l = o; l.getTime() <= a; )
    u.push(c(l)), l = Qt(l, 1);
  return u;
}
function eo(r, t) {
  s(1, arguments);
  var e = r || {}, n = c(e.start), a = c(e.end), o = a.getTime();
  if (!(n.getTime() <= o))
    throw new RangeError("Invalid interval");
  var i = G(n, t), u = G(a, t);
  i.setHours(15), u.setHours(15), o = u.getTime();
  for (var l = [], f = i; f.getTime() <= o; )
    f.setHours(0), l.push(c(f)), f = ot(f, 1), f.setHours(15);
  return l;
}
function tr(r) {
  s(1, arguments);
  for (var t = jr(r), e = [], n = 0; n < t.length; ) {
    var a = t[n++];
    Ce(a) && (e.push(a), Rt(a) && (n = n + 5));
  }
  return e;
}
function vt(r) {
  s(1, arguments);
  var t = c(r);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function to(r) {
  s(1, arguments);
  var t = vt(r);
  if (isNaN(t.getTime()))
    throw new RangeError("The passed date is invalid");
  var e = er(r);
  return tr({
    start: t,
    end: e
  });
}
function Xr(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear();
  return t.setFullYear(e + 1, 0, 0), t.setHours(23, 59, 59, 999), t;
}
function rr(r) {
  s(1, arguments);
  var t = c(r), e = /* @__PURE__ */ new Date(0);
  return e.setFullYear(t.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
function ro(r) {
  s(1, arguments);
  var t = rr(r), e = Xr(r);
  return tr({
    start: t,
    end: e
  });
}
function ao(r) {
  s(1, arguments);
  var t = r || {}, e = c(t.start), n = c(t.end), a = n.getTime();
  if (!(e.getTime() <= a))
    throw new RangeError("Invalid interval");
  var o = [], i = e;
  for (i.setHours(0, 0, 0, 0), i.setMonth(0, 1); i.getTime() <= a; )
    o.push(c(i)), i.setFullYear(i.getFullYear() + 1);
  return o;
}
function no(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = 9 + Math.floor(e / 10) * 10;
  return t.setFullYear(n, 11, 31), t.setHours(23, 59, 59, 999), t;
}
function io(r) {
  s(1, arguments);
  var t = c(r);
  return t.setMinutes(59, 59, 999), t;
}
function Br(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : v.weekStartsOn) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.weekStartsOn) !== null && e !== void 0 ? e : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var g = c(r), m = g.getDay(), w = (m < d ? -7 : 0) + 6 - (m - d);
  return g.setDate(g.getDate() + w), g.setHours(23, 59, 59, 999), g;
}
function oo(r) {
  return s(1, arguments), Br(r, {
    weekStartsOn: 1
  });
}
function uo(r) {
  s(1, arguments);
  var t = ve(r), e = /* @__PURE__ */ new Date(0);
  e.setFullYear(t + 1, 0, 4), e.setHours(0, 0, 0, 0);
  var n = ae(e);
  return n.setMilliseconds(n.getMilliseconds() - 1), n;
}
function so(r) {
  s(1, arguments);
  var t = c(r);
  return t.setSeconds(59, 999), t;
}
function lo(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth(), n = e - e % 3 + 3;
  return t.setMonth(n, 0), t.setHours(23, 59, 59, 999), t;
}
function co(r) {
  s(1, arguments);
  var t = c(r);
  return t.setMilliseconds(999), t;
}
function fo() {
  return Kt(Date.now());
}
function vo() {
  var r = /* @__PURE__ */ new Date(), t = r.getFullYear(), e = r.getMonth(), n = r.getDate(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(t, e, n + 1), a.setHours(23, 59, 59, 999), a;
}
function mo() {
  var r = /* @__PURE__ */ new Date(), t = r.getFullYear(), e = r.getMonth(), n = r.getDate(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(t, e, n - 1), a.setHours(23, 59, 59, 999), a;
}
function xe(r, t) {
  s(2, arguments);
  var e = h(t);
  return qe(r, -e);
}
var Gr = 864e5;
function zr(r) {
  s(1, arguments);
  var t = c(r), e = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var n = t.getTime(), a = e - n;
  return Math.floor(a / Gr) + 1;
}
function de(r) {
  s(1, arguments);
  var t = 1, e = c(r), n = e.getUTCDay(), a = (n < t ? 7 : 0) + n - t;
  return e.setUTCDate(e.getUTCDate() - a), e.setUTCHours(0, 0, 0, 0), e;
}
function ar(r) {
  s(1, arguments);
  var t = c(r), e = t.getUTCFullYear(), n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e + 1, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var a = de(n), o = /* @__PURE__ */ new Date(0);
  o.setUTCFullYear(e, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var i = de(o);
  return t.getTime() >= a.getTime() ? e + 1 : t.getTime() >= i.getTime() ? e : e - 1;
}
function Jr(r) {
  s(1, arguments);
  var t = ar(r), e = /* @__PURE__ */ new Date(0);
  e.setUTCFullYear(t, 0, 4), e.setUTCHours(0, 0, 0, 0);
  var n = de(e);
  return n;
}
var Vr = 6048e5;
function nr(r) {
  s(1, arguments);
  var t = c(r), e = de(t).getTime() - Jr(t).getTime();
  return Math.round(e / Vr) + 1;
}
function se(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : v.weekStartsOn) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.weekStartsOn) !== null && e !== void 0 ? e : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var g = c(r), m = g.getUTCDay(), w = (m < d ? 7 : 0) + m - d;
  return g.setUTCDate(g.getUTCDate() - w), g.setUTCHours(0, 0, 0, 0), g;
}
function dt(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = c(r), d = v.getUTCFullYear(), g = $(), m = h((e = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : g.firstWeekContainsDate) !== null && n !== void 0 ? n : (l = g.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.firstWeekContainsDate) !== null && e !== void 0 ? e : 1);
  if (!(m >= 1 && m <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var w = /* @__PURE__ */ new Date(0);
  w.setUTCFullYear(d + 1, 0, m), w.setUTCHours(0, 0, 0, 0);
  var D = se(w, t), b = /* @__PURE__ */ new Date(0);
  b.setUTCFullYear(d, 0, m), b.setUTCHours(0, 0, 0, 0);
  var Y = se(b, t);
  return v.getTime() >= D.getTime() ? d + 1 : v.getTime() >= Y.getTime() ? d : d - 1;
}
function Zr(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : v.firstWeekContainsDate) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.firstWeekContainsDate) !== null && e !== void 0 ? e : 1), g = dt(r, t), m = /* @__PURE__ */ new Date(0);
  m.setUTCFullYear(g, 0, d), m.setUTCHours(0, 0, 0, 0);
  var w = se(m, t);
  return w;
}
var Kr = 6048e5;
function ir(r, t) {
  s(1, arguments);
  var e = c(r), n = se(e, t).getTime() - Zr(e, t).getTime();
  return Math.round(n / Kr) + 1;
}
function T(r, t) {
  for (var e = r < 0 ? "-" : "", n = Math.abs(r).toString(); n.length < t; )
    n = "0" + n;
  return e + n;
}
var K = {
  // Year
  y: function(t, e) {
    var n = t.getUTCFullYear(), a = n > 0 ? n : 1 - n;
    return T(e === "yy" ? a % 100 : a, e.length);
  },
  // Month
  M: function(t, e) {
    var n = t.getUTCMonth();
    return e === "M" ? String(n + 1) : T(n + 1, 2);
  },
  // Day of the month
  d: function(t, e) {
    return T(t.getUTCDate(), e.length);
  },
  // AM or PM
  a: function(t, e) {
    var n = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function(t, e) {
    return T(t.getUTCHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H: function(t, e) {
    return T(t.getUTCHours(), e.length);
  },
  // Minute
  m: function(t, e) {
    return T(t.getUTCMinutes(), e.length);
  },
  // Second
  s: function(t, e) {
    return T(t.getUTCSeconds(), e.length);
  },
  // Fraction of second
  S: function(t, e) {
    var n = e.length, a = t.getUTCMilliseconds(), o = Math.floor(a * Math.pow(10, n - 3));
    return T(o, e.length);
  }
}, fe = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ea = {
  // Era
  G: function(t, e, n) {
    var a = t.getUTCFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, {
          width: "abbreviated"
        });
      case "GGGGG":
        return n.era(a, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return n.era(a, {
          width: "wide"
        });
    }
  },
  // Year
  y: function(t, e, n) {
    if (e === "yo") {
      var a = t.getUTCFullYear(), o = a > 0 ? a : 1 - a;
      return n.ordinalNumber(o, {
        unit: "year"
      });
    }
    return K.y(t, e);
  },
  // Local week-numbering year
  Y: function(t, e, n, a) {
    var o = dt(t, a), i = o > 0 ? o : 1 - o;
    if (e === "YY") {
      var u = i % 100;
      return T(u, 2);
    }
    return e === "Yo" ? n.ordinalNumber(i, {
      unit: "year"
    }) : T(i, e.length);
  },
  // ISO week-numbering year
  R: function(t, e) {
    var n = ar(t);
    return T(n, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, e) {
    var n = t.getUTCFullYear();
    return T(n, e.length);
  },
  // Quarter
  Q: function(t, e, n) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(a);
      case "QQ":
        return T(a, 2);
      case "Qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, e, n) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(a);
      case "qq":
        return T(a, 2);
      case "qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, e, n) {
    var a = t.getUTCMonth();
    switch (e) {
      case "M":
      case "MM":
        return K.M(t, e);
      case "Mo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function(t, e, n) {
    var a = t.getUTCMonth();
    switch (e) {
      case "L":
        return String(a + 1);
      case "LL":
        return T(a + 1, 2);
      case "Lo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function(t, e, n, a) {
    var o = ir(t, a);
    return e === "wo" ? n.ordinalNumber(o, {
      unit: "week"
    }) : T(o, e.length);
  },
  // ISO week of year
  I: function(t, e, n) {
    var a = nr(t);
    return e === "Io" ? n.ordinalNumber(a, {
      unit: "week"
    }) : T(a, e.length);
  },
  // Day of the month
  d: function(t, e, n) {
    return e === "do" ? n.ordinalNumber(t.getUTCDate(), {
      unit: "date"
    }) : K.d(t, e);
  },
  // Day of year
  D: function(t, e, n) {
    var a = zr(t);
    return e === "Do" ? n.ordinalNumber(a, {
      unit: "dayOfYear"
    }) : T(a, e.length);
  },
  // Day of week
  E: function(t, e, n) {
    var a = t.getUTCDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, e, n, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(i);
      case "ee":
        return T(i, 2);
      case "eo":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, e, n, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(i);
      case "cc":
        return T(i, e.length);
      case "co":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, e, n) {
    var a = t.getUTCDay(), o = a === 0 ? 7 : a;
    switch (e) {
      case "i":
        return String(o);
      case "ii":
        return T(o, e.length);
      case "io":
        return n.ordinalNumber(o, {
          unit: "day"
        });
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, e, n) {
    var a = t.getUTCHours(), o = a / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, e, n) {
    var a = t.getUTCHours(), o;
    switch (a === 12 ? o = fe.noon : a === 0 ? o = fe.midnight : o = a / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, e, n) {
    var a = t.getUTCHours(), o;
    switch (a >= 17 ? o = fe.evening : a >= 12 ? o = fe.afternoon : a >= 4 ? o = fe.morning : o = fe.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, e, n) {
    if (e === "ho") {
      var a = t.getUTCHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, {
        unit: "hour"
      });
    }
    return K.h(t, e);
  },
  // Hour [0-23]
  H: function(t, e, n) {
    return e === "Ho" ? n.ordinalNumber(t.getUTCHours(), {
      unit: "hour"
    }) : K.H(t, e);
  },
  // Hour [0-11]
  K: function(t, e, n) {
    var a = t.getUTCHours() % 12;
    return e === "Ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : T(a, e.length);
  },
  // Hour [1-24]
  k: function(t, e, n) {
    var a = t.getUTCHours();
    return a === 0 && (a = 24), e === "ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : T(a, e.length);
  },
  // Minute
  m: function(t, e, n) {
    return e === "mo" ? n.ordinalNumber(t.getUTCMinutes(), {
      unit: "minute"
    }) : K.m(t, e);
  },
  // Second
  s: function(t, e, n) {
    return e === "so" ? n.ordinalNumber(t.getUTCSeconds(), {
      unit: "second"
    }) : K.s(t, e);
  },
  // Fraction of second
  S: function(t, e) {
    return K.S(t, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, e, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (e) {
      case "X":
        return xt(i);
      case "XXXX":
      case "XX":
        return oe(i);
      case "XXXXX":
      case "XXX":
      default:
        return oe(i, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, e, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (e) {
      case "x":
        return xt(i);
      case "xxxx":
      case "xx":
        return oe(i);
      case "xxxxx":
      case "xxx":
      default:
        return oe(i, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, e, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Yt(i, ":");
      case "OOOO":
      default:
        return "GMT" + oe(i, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, e, n, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Yt(i, ":");
      case "zzzz":
      default:
        return "GMT" + oe(i, ":");
    }
  },
  // Seconds timestamp
  t: function(t, e, n, a) {
    var o = a._originalDate || t, i = Math.floor(o.getTime() / 1e3);
    return T(i, e.length);
  },
  // Milliseconds timestamp
  T: function(t, e, n, a) {
    var o = a._originalDate || t, i = o.getTime();
    return T(i, e.length);
  }
};
function Yt(r, t) {
  var e = r > 0 ? "-" : "+", n = Math.abs(r), a = Math.floor(n / 60), o = n % 60;
  if (o === 0)
    return e + String(a);
  var i = t;
  return e + String(a) + i + T(o, 2);
}
function xt(r, t) {
  if (r % 60 === 0) {
    var e = r > 0 ? "-" : "+";
    return e + T(Math.abs(r) / 60, 2);
  }
  return oe(r, t);
}
function oe(r, t) {
  var e = t || "", n = r > 0 ? "-" : "+", a = Math.abs(r), o = T(Math.floor(a / 60), 2), i = T(a % 60, 2);
  return n + o + e + i;
}
var _t = function(t, e) {
  switch (t) {
    case "P":
      return e.date({
        width: "short"
      });
    case "PP":
      return e.date({
        width: "medium"
      });
    case "PPP":
      return e.date({
        width: "long"
      });
    case "PPPP":
    default:
      return e.date({
        width: "full"
      });
  }
}, or = function(t, e) {
  switch (t) {
    case "p":
      return e.time({
        width: "short"
      });
    case "pp":
      return e.time({
        width: "medium"
      });
    case "ppp":
      return e.time({
        width: "long"
      });
    case "pppp":
    default:
      return e.time({
        width: "full"
      });
  }
}, ta = function(t, e) {
  var n = t.match(/(P+)(p+)?/) || [], a = n[1], o = n[2];
  if (!o)
    return _t(t, e);
  var i;
  switch (a) {
    case "P":
      i = e.dateTime({
        width: "short"
      });
      break;
    case "PP":
      i = e.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      i = e.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      i = e.dateTime({
        width: "full"
      });
      break;
  }
  return i.replace("{{date}}", _t(a, e)).replace("{{time}}", or(o, e));
}, at = {
  p: or,
  P: ta
}, ra = ["D", "DD"], aa = ["YY", "YYYY"];
function ur(r) {
  return ra.indexOf(r) !== -1;
}
function sr(r) {
  return aa.indexOf(r) !== -1;
}
function $e(r, t, e) {
  if (r === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(e, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (r === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(e, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (r === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(e, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (r === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(e, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var na = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, ia = function(t, e, n) {
  var a, o = na[t];
  return typeof o == "string" ? a = o : e === 1 ? a = o.one : a = o.other.replace("{{count}}", e.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
function ze(r) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.width ? String(t.width) : r.defaultWidth, n = r.formats[e] || r.formats[r.defaultWidth];
    return n;
  };
}
var oa = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ua = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, sa = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, la = {
  date: ze({
    formats: oa,
    defaultWidth: "full"
  }),
  time: ze({
    formats: ua,
    defaultWidth: "full"
  }),
  dateTime: ze({
    formats: sa,
    defaultWidth: "full"
  })
}, ca = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, fa = function(t, e, n, a) {
  return ca[t];
};
function Me(r) {
  return function(t, e) {
    var n = e != null && e.context ? String(e.context) : "standalone", a;
    if (n === "formatting" && r.formattingValues) {
      var o = r.defaultFormattingWidth || r.defaultWidth, i = e != null && e.width ? String(e.width) : o;
      a = r.formattingValues[i] || r.formattingValues[o];
    } else {
      var u = r.defaultWidth, l = e != null && e.width ? String(e.width) : r.defaultWidth;
      a = r.values[l] || r.values[u];
    }
    var f = r.argumentCallback ? r.argumentCallback(t) : t;
    return a[f];
  };
}
var va = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, da = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ma = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, ha = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, ga = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, wa = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, ya = function(t, e) {
  var n = Number(t), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, pa = {
  ordinalNumber: ya,
  era: Me({
    values: va,
    defaultWidth: "wide"
  }),
  quarter: Me({
    values: da,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: Me({
    values: ma,
    defaultWidth: "wide"
  }),
  day: Me({
    values: ha,
    defaultWidth: "wide"
  }),
  dayPeriod: Me({
    values: ga,
    defaultWidth: "wide",
    formattingValues: wa,
    defaultFormattingWidth: "wide"
  })
};
function Oe(r) {
  return function(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = e.width, a = n && r.matchPatterns[n] || r.matchPatterns[r.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    var i = o[0], u = n && r.parsePatterns[n] || r.parsePatterns[r.defaultParseWidth], l = Array.isArray(u) ? Da(u, function(d) {
      return d.test(i);
    }) : Ta(u, function(d) {
      return d.test(i);
    }), f;
    f = r.valueCallback ? r.valueCallback(l) : l, f = e.valueCallback ? e.valueCallback(f) : f;
    var v = t.slice(i.length);
    return {
      value: f,
      rest: v
    };
  };
}
function Ta(r, t) {
  for (var e in r)
    if (r.hasOwnProperty(e) && t(r[e]))
      return e;
}
function Da(r, t) {
  for (var e = 0; e < r.length; e++)
    if (t(r[e]))
      return e;
}
function ba(r) {
  return function(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.match(r.matchPattern);
    if (!n)
      return null;
    var a = n[0], o = t.match(r.parsePattern);
    if (!o)
      return null;
    var i = r.valueCallback ? r.valueCallback(o[0]) : o[0];
    i = e.valueCallback ? e.valueCallback(i) : i;
    var u = t.slice(a.length);
    return {
      value: i,
      rest: u
    };
  };
}
var Ma = /^(\d+)(th|st|nd|rd)?/i, Oa = /\d+/i, ka = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ca = {
  any: [/^b/i, /^(a|c)/i]
}, Na = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ya = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, xa = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, _a = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Sa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ia = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ea = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Pa = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Wa = {
  ordinalNumber: ba({
    matchPattern: Ma,
    parsePattern: Oa,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: Oe({
    matchPatterns: ka,
    defaultMatchWidth: "wide",
    parsePatterns: Ca,
    defaultParseWidth: "any"
  }),
  quarter: Oe({
    matchPatterns: Na,
    defaultMatchWidth: "wide",
    parsePatterns: Ya,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: Oe({
    matchPatterns: xa,
    defaultMatchWidth: "wide",
    parsePatterns: _a,
    defaultParseWidth: "any"
  }),
  day: Oe({
    matchPatterns: Sa,
    defaultMatchWidth: "wide",
    parsePatterns: Ia,
    defaultParseWidth: "any"
  }),
  dayPeriod: Oe({
    matchPatterns: Ea,
    defaultMatchWidth: "any",
    parsePatterns: Pa,
    defaultParseWidth: "any"
  })
}, we = {
  code: "en-US",
  formatDistance: ia,
  formatLong: la,
  formatRelative: fa,
  localize: pa,
  match: Wa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Ua = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, $a = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ha = /^'([^]*?)'?$/, Fa = /''/g, Ra = /[a-zA-Z]/;
function La(r, t, e) {
  var n, a, o, i, u, l, f, v, d, g, m, w, D, b, Y, x, M, A;
  s(2, arguments);
  var B = String(t), U = $(), q = (n = (a = e == null ? void 0 : e.locale) !== null && a !== void 0 ? a : U.locale) !== null && n !== void 0 ? n : we, j = h((o = (i = (u = (l = e == null ? void 0 : e.firstWeekContainsDate) !== null && l !== void 0 ? l : e == null || (f = e.locale) === null || f === void 0 || (v = f.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && u !== void 0 ? u : U.firstWeekContainsDate) !== null && i !== void 0 ? i : (d = U.locale) === null || d === void 0 || (g = d.options) === null || g === void 0 ? void 0 : g.firstWeekContainsDate) !== null && o !== void 0 ? o : 1);
  if (!(j >= 1 && j <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var z = h((m = (w = (D = (b = e == null ? void 0 : e.weekStartsOn) !== null && b !== void 0 ? b : e == null || (Y = e.locale) === null || Y === void 0 || (x = Y.options) === null || x === void 0 ? void 0 : x.weekStartsOn) !== null && D !== void 0 ? D : U.weekStartsOn) !== null && w !== void 0 ? w : (M = U.locale) === null || M === void 0 || (A = M.options) === null || A === void 0 ? void 0 : A.weekStartsOn) !== null && m !== void 0 ? m : 0);
  if (!(z >= 0 && z <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!q.localize)
    throw new RangeError("locale must contain localize property");
  if (!q.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var re = c(r);
  if (!ne(re))
    throw new RangeError("Invalid time value");
  var ye = L(re), pe = xe(re, ye), Te = {
    firstWeekContainsDate: j,
    weekStartsOn: z,
    locale: q,
    _originalDate: re
  }, je = B.match($a).map(function(F) {
    var Q = F[0];
    if (Q === "p" || Q === "P") {
      var ie = at[Q];
      return ie(F, q.formatLong);
    }
    return F;
  }).join("").match(Ua).map(function(F) {
    if (F === "''")
      return "'";
    var Q = F[0];
    if (Q === "'")
      return qa(F);
    var ie = ea[Q];
    if (ie)
      return !(e != null && e.useAdditionalWeekYearTokens) && sr(F) && $e(F, t, String(r)), !(e != null && e.useAdditionalDayOfYearTokens) && ur(F) && $e(F, t, String(r)), ie(pe, F, q.localize, Te);
    if (Q.match(Ra))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + Q + "`");
    return F;
  }).join("");
  return je;
}
function qa(r) {
  var t = r.match(Ha);
  return t ? t[1].replace(Fa, "'") : r;
}
function _e(r, t) {
  if (r == null)
    throw new TypeError("assign requires that input parameter not be null or undefined");
  for (var e in t)
    Object.prototype.hasOwnProperty.call(t, e) && (r[e] = t[e]);
  return r;
}
function lr(r) {
  return _e({}, r);
}
var St = 1440, Aa = 2520, Je = 43200, Qa = 86400;
function ja(r, t, e) {
  var n, a;
  s(2, arguments);
  var o = $(), i = (n = (a = e == null ? void 0 : e.locale) !== null && a !== void 0 ? a : o.locale) !== null && n !== void 0 ? n : we;
  if (!i.formatDistance)
    throw new RangeError("locale must contain formatDistance property");
  var u = Z(r, t);
  if (isNaN(u))
    throw new RangeError("Invalid time value");
  var l = _e(lr(e), {
    addSuffix: !!(e != null && e.addSuffix),
    comparison: u
  }), f, v;
  u > 0 ? (f = c(t), v = c(r)) : (f = c(r), v = c(t));
  var d = Ne(v, f), g = (L(v) - L(f)) / 1e3, m = Math.round((d - g) / 60), w;
  if (m < 2)
    return e != null && e.includeSeconds ? d < 5 ? i.formatDistance("lessThanXSeconds", 5, l) : d < 10 ? i.formatDistance("lessThanXSeconds", 10, l) : d < 20 ? i.formatDistance("lessThanXSeconds", 20, l) : d < 40 ? i.formatDistance("halfAMinute", 0, l) : d < 60 ? i.formatDistance("lessThanXMinutes", 1, l) : i.formatDistance("xMinutes", 1, l) : m === 0 ? i.formatDistance("lessThanXMinutes", 1, l) : i.formatDistance("xMinutes", m, l);
  if (m < 45)
    return i.formatDistance("xMinutes", m, l);
  if (m < 90)
    return i.formatDistance("aboutXHours", 1, l);
  if (m < St) {
    var D = Math.round(m / 60);
    return i.formatDistance("aboutXHours", D, l);
  } else {
    if (m < Aa)
      return i.formatDistance("xDays", 1, l);
    if (m < Je) {
      var b = Math.round(m / St);
      return i.formatDistance("xDays", b, l);
    } else if (m < Qa)
      return w = Math.round(m / Je), i.formatDistance("aboutXMonths", w, l);
  }
  if (w = ft(v, f), w < 12) {
    var Y = Math.round(m / Je);
    return i.formatDistance("xMonths", Y, l);
  } else {
    var x = w % 12, M = Math.floor(w / 12);
    return x < 3 ? i.formatDistance("aboutXYears", M, l) : x < 9 ? i.formatDistance("overXYears", M, l) : i.formatDistance("almostXYears", M + 1, l);
  }
}
var It = 1e3 * 60, He = 60 * 24, Et = He * 30, Pt = He * 365;
function Xa(r, t, e) {
  var n, a, o;
  s(2, arguments);
  var i = $(), u = (n = (a = e == null ? void 0 : e.locale) !== null && a !== void 0 ? a : i.locale) !== null && n !== void 0 ? n : we;
  if (!u.formatDistance)
    throw new RangeError("locale must contain localize.formatDistance property");
  var l = Z(r, t);
  if (isNaN(l))
    throw new RangeError("Invalid time value");
  var f = _e(lr(e), {
    addSuffix: !!(e != null && e.addSuffix),
    comparison: l
  }), v, d;
  l > 0 ? (v = c(t), d = c(r)) : (v = c(r), d = c(t));
  var g = String((o = e == null ? void 0 : e.roundingMethod) !== null && o !== void 0 ? o : "round"), m;
  if (g === "floor")
    m = Math.floor;
  else if (g === "ceil")
    m = Math.ceil;
  else if (g === "round")
    m = Math.round;
  else
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  var w = d.getTime() - v.getTime(), D = w / It, b = L(d) - L(v), Y = (w - b) / It, x = e == null ? void 0 : e.unit, M;
  if (x ? M = String(x) : D < 1 ? M = "second" : D < 60 ? M = "minute" : D < He ? M = "hour" : Y < Et ? M = "day" : Y < Pt ? M = "month" : M = "year", M === "second") {
    var A = m(w / 1e3);
    return u.formatDistance("xSeconds", A, f);
  } else if (M === "minute") {
    var B = m(D);
    return u.formatDistance("xMinutes", B, f);
  } else if (M === "hour") {
    var U = m(D / 60);
    return u.formatDistance("xHours", U, f);
  } else if (M === "day") {
    var q = m(Y / He);
    return u.formatDistance("xDays", q, f);
  } else if (M === "month") {
    var j = m(Y / Et);
    return j === 12 && x !== "month" ? u.formatDistance("xYears", 1, f) : u.formatDistance("xMonths", j, f);
  } else if (M === "year") {
    var z = m(Y / Pt);
    return u.formatDistance("xYears", z, f);
  }
  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}
function ho(r, t) {
  return s(1, arguments), ja(r, Date.now(), t);
}
function go(r, t) {
  return s(1, arguments), Xa(r, Date.now(), t);
}
var Ba = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"];
function wo(r, t) {
  var e, n, a, o, i;
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  var u = $(), l = (e = (n = t == null ? void 0 : t.locale) !== null && n !== void 0 ? n : u.locale) !== null && e !== void 0 ? e : we, f = (a = t == null ? void 0 : t.format) !== null && a !== void 0 ? a : Ba, v = (o = t == null ? void 0 : t.zero) !== null && o !== void 0 ? o : !1, d = (i = t == null ? void 0 : t.delimiter) !== null && i !== void 0 ? i : " ";
  if (!l.formatDistance)
    return "";
  var g = f.reduce(function(m, w) {
    var D = "x".concat(w.replace(/(^.)/, function(Y) {
      return Y.toUpperCase();
    })), b = r[w];
    return typeof b == "number" && (v || r[w]) ? m.concat(l.formatDistance(D, b)) : m;
  }, []).join(d);
  return g;
}
function yo(r, t) {
  var e, n;
  s(1, arguments);
  var a = c(r);
  if (isNaN(a.getTime()))
    throw new RangeError("Invalid time value");
  var o = String((e = t == null ? void 0 : t.format) !== null && e !== void 0 ? e : "extended"), i = String((n = t == null ? void 0 : t.representation) !== null && n !== void 0 ? n : "complete");
  if (o !== "extended" && o !== "basic")
    throw new RangeError("format must be 'extended' or 'basic'");
  if (i !== "date" && i !== "time" && i !== "complete")
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  var u = "", l = "", f = o === "extended" ? "-" : "", v = o === "extended" ? ":" : "";
  if (i !== "time") {
    var d = T(a.getDate(), 2), g = T(a.getMonth() + 1, 2), m = T(a.getFullYear(), 4);
    u = "".concat(m).concat(f).concat(g).concat(f).concat(d);
  }
  if (i !== "date") {
    var w = a.getTimezoneOffset();
    if (w !== 0) {
      var D = Math.abs(w), b = T(Math.floor(D / 60), 2), Y = T(D % 60, 2), x = w < 0 ? "+" : "-";
      l = "".concat(x).concat(b, ":").concat(Y);
    } else
      l = "Z";
    var M = T(a.getHours(), 2), A = T(a.getMinutes(), 2), B = T(a.getSeconds(), 2), U = u === "" ? "" : "T", q = [M, A, B].join(v);
    u = "".concat(u).concat(U).concat(q).concat(l);
  }
  return u;
}
function po(r, t) {
  var e, n;
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  var a = c(r);
  if (!ne(a))
    throw new RangeError("Invalid time value");
  var o = String((e = t == null ? void 0 : t.format) !== null && e !== void 0 ? e : "extended"), i = String((n = t == null ? void 0 : t.representation) !== null && n !== void 0 ? n : "complete");
  if (o !== "extended" && o !== "basic")
    throw new RangeError("format must be 'extended' or 'basic'");
  if (i !== "date" && i !== "time" && i !== "complete")
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  var u = "", l = o === "extended" ? "-" : "", f = o === "extended" ? ":" : "";
  if (i !== "time") {
    var v = T(a.getDate(), 2), d = T(a.getMonth() + 1, 2), g = T(a.getFullYear(), 4);
    u = "".concat(g).concat(l).concat(d).concat(l).concat(v);
  }
  if (i !== "date") {
    var m = T(a.getHours(), 2), w = T(a.getMinutes(), 2), D = T(a.getSeconds(), 2), b = u === "" ? "" : " ";
    u = "".concat(u).concat(b).concat(m).concat(f).concat(w).concat(f).concat(D);
  }
  return u;
}
function To(r) {
  if (s(1, arguments), R(r) !== "object")
    throw new Error("Duration must be an object");
  var t = r.years, e = t === void 0 ? 0 : t, n = r.months, a = n === void 0 ? 0 : n, o = r.days, i = o === void 0 ? 0 : o, u = r.hours, l = u === void 0 ? 0 : u, f = r.minutes, v = f === void 0 ? 0 : f, d = r.seconds, g = d === void 0 ? 0 : d;
  return "P".concat(e, "Y").concat(a, "M").concat(i, "DT").concat(l, "H").concat(v, "M").concat(g, "S");
}
function Do(r, t) {
  var e;
  if (arguments.length < 1)
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  var n = c(r);
  if (!ne(n))
    throw new RangeError("Invalid time value");
  var a = Number((e = t == null ? void 0 : t.fractionDigits) !== null && e !== void 0 ? e : 0);
  if (!(a >= 0 && a <= 3))
    throw new RangeError("fractionDigits must be between 0 and 3 inclusively");
  var o = T(n.getDate(), 2), i = T(n.getMonth() + 1, 2), u = n.getFullYear(), l = T(n.getHours(), 2), f = T(n.getMinutes(), 2), v = T(n.getSeconds(), 2), d = "";
  if (a > 0) {
    var g = n.getMilliseconds(), m = Math.floor(g * Math.pow(10, a - 3));
    d = "." + T(m, a);
  }
  var w = "", D = n.getTimezoneOffset();
  if (D !== 0) {
    var b = Math.abs(D), Y = T(h(b / 60), 2), x = T(b % 60, 2), M = D < 0 ? "+" : "-";
    w = "".concat(M).concat(Y, ":").concat(x);
  } else
    w = "Z";
  return "".concat(u, "-").concat(i, "-").concat(o, "T").concat(l, ":").concat(f, ":").concat(v).concat(d).concat(w);
}
var Ga = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], za = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function bo(r) {
  if (arguments.length < 1)
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  var t = c(r);
  if (!ne(t))
    throw new RangeError("Invalid time value");
  var e = Ga[t.getUTCDay()], n = T(t.getUTCDate(), 2), a = za[t.getUTCMonth()], o = t.getUTCFullYear(), i = T(t.getUTCHours(), 2), u = T(t.getUTCMinutes(), 2), l = T(t.getUTCSeconds(), 2);
  return "".concat(e, ", ").concat(n, " ").concat(a, " ").concat(o, " ").concat(i, ":").concat(u, ":").concat(l, " GMT");
}
function Mo(r, t, e) {
  var n, a, o, i, u, l, f, v, d, g;
  s(2, arguments);
  var m = c(r), w = c(t), D = $(), b = (n = (a = e == null ? void 0 : e.locale) !== null && a !== void 0 ? a : D.locale) !== null && n !== void 0 ? n : we, Y = h((o = (i = (u = (l = e == null ? void 0 : e.weekStartsOn) !== null && l !== void 0 ? l : e == null || (f = e.locale) === null || f === void 0 || (v = f.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && u !== void 0 ? u : D.weekStartsOn) !== null && i !== void 0 ? i : (d = D.locale) === null || d === void 0 || (g = d.options) === null || g === void 0 ? void 0 : g.weekStartsOn) !== null && o !== void 0 ? o : 0);
  if (!b.localize)
    throw new RangeError("locale must contain localize property");
  if (!b.formatLong)
    throw new RangeError("locale must contain formatLong property");
  if (!b.formatRelative)
    throw new RangeError("locale must contain formatRelative property");
  var x = ee(m, w);
  if (isNaN(x))
    throw new RangeError("Invalid time value");
  var M;
  x < -6 ? M = "other" : x < -1 ? M = "lastWeek" : x < 0 ? M = "yesterday" : x < 1 ? M = "today" : x < 2 ? M = "tomorrow" : x < 7 ? M = "nextWeek" : M = "other";
  var A = xe(m, L(m)), B = xe(w, L(w)), U = b.formatRelative(M, A, B, {
    locale: b,
    weekStartsOn: Y
  });
  return La(m, U, {
    locale: b,
    weekStartsOn: Y
  });
}
function Oo(r) {
  s(1, arguments);
  var t = h(r);
  return c(t * 1e3);
}
function Ja(r) {
  s(1, arguments);
  var t = c(r), e = t.getDate();
  return e;
}
function mt(r) {
  s(1, arguments);
  var t = c(r), e = t.getDay();
  return e;
}
function ko(r) {
  s(1, arguments);
  var t = c(r), e = ee(t, rr(t)), n = e + 1;
  return n;
}
function Va(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = t.getMonth(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(e, n + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Za(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Co(r) {
  s(1, arguments);
  var t = c(r);
  return String(new Date(t)) === "Invalid Date" ? NaN : Za(t) ? 366 : 365;
}
function No(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = Math.floor(e / 10) * 10;
  return n;
}
function Yo() {
  return _e({}, $());
}
function xo(r) {
  s(1, arguments);
  var t = c(r), e = t.getHours();
  return e;
}
function Ka(r) {
  s(1, arguments);
  var t = c(r), e = t.getDay();
  return e === 0 && (e = 7), e;
}
var en = 6048e5;
function tn(r) {
  s(1, arguments);
  var t = c(r), e = ae(t).getTime() - ue(t).getTime();
  return Math.round(e / en) + 1;
}
var rn = 6048e5;
function _o(r) {
  s(1, arguments);
  var t = ue(r), e = ue(ot(t, 60)), n = e.valueOf() - t.valueOf();
  return Math.round(n / rn);
}
function So(r) {
  s(1, arguments);
  var t = c(r), e = t.getMilliseconds();
  return e;
}
function Io(r) {
  s(1, arguments);
  var t = c(r), e = t.getMinutes();
  return e;
}
function Eo(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth();
  return e;
}
var an = 24 * 60 * 60 * 1e3;
function Po(r, t) {
  s(2, arguments);
  var e = r || {}, n = t || {}, a = c(e.start).getTime(), o = c(e.end).getTime(), i = c(n.start).getTime(), u = c(n.end).getTime();
  if (!(a <= o && i <= u))
    throw new RangeError("Invalid interval");
  var l = a < u && i < o;
  if (!l)
    return 0;
  var f = i < a ? a : i, v = u > o ? o : u, d = v - f;
  return Math.ceil(d / an);
}
function Wo(r) {
  s(1, arguments);
  var t = c(r), e = t.getSeconds();
  return e;
}
function nn(r) {
  s(1, arguments);
  var t = c(r), e = t.getTime();
  return e;
}
function Uo(r) {
  return s(1, arguments), Math.floor(nn(r) / 1e3);
}
function on(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = c(r), d = v.getFullYear(), g = $(), m = h((e = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : g.firstWeekContainsDate) !== null && n !== void 0 ? n : (l = g.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.firstWeekContainsDate) !== null && e !== void 0 ? e : 1);
  if (!(m >= 1 && m <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var w = /* @__PURE__ */ new Date(0);
  w.setFullYear(d + 1, 0, m), w.setHours(0, 0, 0, 0);
  var D = G(w, t), b = /* @__PURE__ */ new Date(0);
  b.setFullYear(d, 0, m), b.setHours(0, 0, 0, 0);
  var Y = G(b, t);
  return v.getTime() >= D.getTime() ? d + 1 : v.getTime() >= Y.getTime() ? d : d - 1;
}
function nt(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : v.firstWeekContainsDate) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.firstWeekContainsDate) !== null && e !== void 0 ? e : 1), g = on(r, t), m = /* @__PURE__ */ new Date(0);
  m.setFullYear(g, 0, d), m.setHours(0, 0, 0, 0);
  var w = G(m, t);
  return w;
}
var un = 6048e5;
function sn(r, t) {
  s(1, arguments);
  var e = c(r), n = G(e, t).getTime() - nt(e, t).getTime();
  return Math.round(n / un) + 1;
}
function $o(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : v.weekStartsOn) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.weekStartsOn) !== null && e !== void 0 ? e : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var g = Ja(r);
  if (isNaN(g))
    return NaN;
  var m = mt(vt(r)), w = d - m;
  w <= 0 && (w += 7);
  var D = g - w;
  return Math.ceil(D / 7) + 1;
}
function ln(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth();
  return t.setFullYear(t.getFullYear(), e + 1, 0), t.setHours(0, 0, 0, 0), t;
}
function Ho(r, t) {
  return s(1, arguments), Ke(ln(r), vt(r), t) + 1;
}
function Fo(r) {
  return s(1, arguments), c(r).getFullYear();
}
function Ro(r) {
  return s(1, arguments), Math.floor(r * he);
}
function Lo(r) {
  return s(1, arguments), Math.floor(r * Xt);
}
function qo(r) {
  return s(1, arguments), Math.floor(r * Ae);
}
function Ao(r) {
  s(1, arguments);
  var t = c(r.start), e = c(r.end);
  if (isNaN(t.getTime()))
    throw new RangeError("Start Date is invalid");
  if (isNaN(e.getTime()))
    throw new RangeError("End Date is invalid");
  var n = {};
  n.years = Math.abs(Qr(e, t));
  var a = Z(e, t), o = be(t, {
    years: a * n.years
  });
  n.months = Math.abs(ft(e, o));
  var i = be(o, {
    months: a * n.months
  });
  n.days = Math.abs(Zt(e, i));
  var u = be(i, {
    days: a * n.days
  });
  n.hours = Math.abs(et(e, u));
  var l = be(u, {
    hours: a * n.hours
  });
  n.minutes = Math.abs(tt(e, l));
  var f = be(l, {
    minutes: a * n.minutes
  });
  return n.seconds = Math.abs(Ne(e, f)), n;
}
function Qo(r, t, e) {
  var n;
  s(1, arguments);
  var a;
  return cn(t) ? a = t : e = t, new Intl.DateTimeFormat((n = e) === null || n === void 0 ? void 0 : n.locale, a).format(r);
}
function cn(r) {
  return r !== void 0 && !("locale" in r);
}
function jo(r, t, e) {
  s(2, arguments);
  var n = 0, a, o = c(r), i = c(t);
  if (e != null && e.unit)
    a = e == null ? void 0 : e.unit, a === "second" ? n = Ne(o, i) : a === "minute" ? n = tt(o, i) : a === "hour" ? n = et(o, i) : a === "day" ? n = ee(o, i) : a === "week" ? n = Ke(o, i) : a === "month" ? n = Ze(o, i) : a === "quarter" ? n = Ge(o, i) : a === "year" && (n = We(o, i));
  else {
    var u = Ne(o, i);
    Math.abs(u) < st ? (n = Ne(o, i), a = "second") : Math.abs(u) < Ae ? (n = tt(o, i), a = "minute") : Math.abs(u) < lt && Math.abs(ee(o, i)) < 1 ? (n = et(o, i), a = "hour") : Math.abs(u) < Wr && (n = ee(o, i)) && Math.abs(n) < 7 ? a = "day" : Math.abs(u) < Vt ? (n = Ke(o, i), a = "week") : Math.abs(u) < Ur ? (n = Ze(o, i), a = "month") : Math.abs(u) < Jt && Ge(o, i) < 4 ? (n = Ge(o, i), a = "quarter") : (n = We(o, i), a = "year");
  }
  var l = new Intl.RelativeTimeFormat(e == null ? void 0 : e.locale, {
    localeMatcher: e == null ? void 0 : e.localeMatcher,
    numeric: (e == null ? void 0 : e.numeric) || "auto",
    style: e == null ? void 0 : e.style
  });
  return l.format(n, a);
}
function Xo(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getTime() > n.getTime();
}
function Bo(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getTime() < n.getTime();
}
function Go(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getTime() === n.getTime();
}
function zo(r, t, e) {
  if (arguments.length < 3)
    throw new TypeError("3 argument required, but only " + arguments.length + " present");
  var n = new Date(r, t, e);
  return n.getFullYear() === r && n.getMonth() === t && n.getDate() === e;
}
function Jo(r) {
  return s(1, arguments), c(r).getDate() === 1;
}
function Vo(r) {
  return s(1, arguments), c(r).getDay() === 5;
}
function Zo(r) {
  return s(1, arguments), c(r).getTime() > Date.now();
}
function Wt(r, t) {
  (t == null || t > r.length) && (t = r.length);
  for (var e = 0, n = Array(t); e < t; e++)
    n[e] = r[e];
  return n;
}
function fn(r, t) {
  if (r) {
    if (typeof r == "string")
      return Wt(r, t);
    var e = {}.toString.call(r).slice(8, -1);
    return e === "Object" && r.constructor && (e = r.constructor.name), e === "Map" || e === "Set" ? Array.from(r) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Wt(r, t) : void 0;
  }
}
function Ut(r, t) {
  var e = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!e) {
    if (Array.isArray(r) || (e = fn(r)) || t) {
      e && (r = e);
      var n = 0, a = function() {
      };
      return {
        s: a,
        n: function() {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function(f) {
          throw f;
        },
        f: a
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o, i = !0, u = !1;
  return {
    s: function() {
      e = e.call(r);
    },
    n: function() {
      var f = e.next();
      return i = f.done, f;
    },
    e: function(f) {
      u = !0, o = f;
    },
    f: function() {
      try {
        i || e.return == null || e.return();
      } finally {
        if (u)
          throw o;
      }
    }
  };
}
function p(r) {
  if (r === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r;
}
function it(r, t) {
  return it = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, n) {
    return e.__proto__ = n, e;
  }, it(r, t);
}
function C(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  r.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: r,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(r, "prototype", {
    writable: !1
  }), t && it(r, t);
}
function Fe(r) {
  return Fe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Fe(r);
}
function cr() {
  try {
    var r = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (cr = function() {
    return !!r;
  })();
}
function vn(r, t) {
  if (t && (R(t) == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return p(r);
}
function N(r) {
  var t = cr();
  return function() {
    var e, n = Fe(r);
    if (t) {
      var a = Fe(this).constructor;
      e = Reflect.construct(n, arguments, a);
    } else
      e = n.apply(this, arguments);
    return vn(this, e);
  };
}
function O(r, t) {
  if (!(r instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function dn(r, t) {
  if (R(r) != "object" || !r)
    return r;
  var e = r[Symbol.toPrimitive];
  if (e !== void 0) {
    var n = e.call(r, t || "default");
    if (R(n) != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(r);
}
function fr(r) {
  var t = dn(r, "string");
  return R(t) == "symbol" ? t : t + "";
}
function mn(r, t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, fr(n.key), n);
  }
}
function k(r, t, e) {
  return t && mn(r.prototype, t), Object.defineProperty(r, "prototype", {
    writable: !1
  }), r;
}
function y(r, t, e) {
  return (t = fr(t)) in r ? Object.defineProperty(r, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[t] = e, r;
}
var hn = 10, vr = /* @__PURE__ */ function() {
  function r() {
    O(this, r), y(this, "priority", void 0), y(this, "subPriority", 0);
  }
  return k(r, [{
    key: "validate",
    value: function(e, n) {
      return !0;
    }
  }]), r;
}(), gn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e(n, a, o, i, u) {
    var l;
    return O(this, e), l = t.call(this), l.value = n, l.validateValue = a, l.setValue = o, l.priority = i, u && (l.subPriority = u), l;
  }
  return k(e, [{
    key: "validate",
    value: function(a, o) {
      return this.validateValue(a, this.value, o);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return this.setValue(a, o, this.value, i);
    }
  }]), e;
}(vr), wn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", hn), y(p(n), "subPriority", -1), n;
  }
  return k(e, [{
    key: "set",
    value: function(a, o) {
      if (o.timestampIsSet)
        return a;
      var i = /* @__PURE__ */ new Date(0);
      return i.setFullYear(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()), i.setHours(a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()), i;
    }
  }]), e;
}(vr), _ = /* @__PURE__ */ function() {
  function r() {
    O(this, r), y(this, "incompatibleTokens", void 0), y(this, "priority", void 0), y(this, "subPriority", void 0);
  }
  return k(r, [{
    key: "run",
    value: function(e, n, a, o) {
      var i = this.parse(e, n, a, o);
      return i ? {
        setter: new gn(i.value, this.validate, this.set, this.priority, this.subPriority),
        rest: i.rest
      } : null;
    }
  }, {
    key: "validate",
    value: function(e, n, a) {
      return !0;
    }
  }]), r;
}(), yn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 140), y(p(n), "incompatibleTokens", ["R", "u", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "G":
        case "GG":
        case "GGG":
          return i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
        case "GGGGG":
          return i.era(a, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return i.era(a, {
            width: "wide"
          }) || i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.era = i, a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), P = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, J = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function W(r, t) {
  return r && {
    value: t(r.value),
    rest: r.rest
  };
}
function I(r, t) {
  var e = t.match(r);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function V(r, t) {
  var e = t.match(r);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  var n = e[1] === "+" ? 1 : -1, a = e[2] ? parseInt(e[2], 10) : 0, o = e[3] ? parseInt(e[3], 10) : 0, i = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: n * (a * he + o * me + i * ut),
    rest: t.slice(e[0].length)
  };
}
function dr(r) {
  return I(P.anyDigitsSigned, r);
}
function E(r, t) {
  switch (r) {
    case 1:
      return I(P.singleDigit, t);
    case 2:
      return I(P.twoDigits, t);
    case 3:
      return I(P.threeDigits, t);
    case 4:
      return I(P.fourDigits, t);
    default:
      return I(new RegExp("^\\d{1," + r + "}"), t);
  }
}
function Re(r, t) {
  switch (r) {
    case 1:
      return I(P.singleDigitSigned, t);
    case 2:
      return I(P.twoDigitsSigned, t);
    case 3:
      return I(P.threeDigitsSigned, t);
    case 4:
      return I(P.fourDigitsSigned, t);
    default:
      return I(new RegExp("^-?\\d{1," + r + "}"), t);
  }
}
function ht(r) {
  switch (r) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function mr(r, t) {
  var e = t > 0, n = e ? t : 1 - t, a;
  if (n <= 50)
    a = r || 100;
  else {
    var o = n + 50, i = Math.floor(o / 100) * 100, u = r >= o % 100;
    a = r + i - (u ? 100 : 0);
  }
  return e ? a : 1 - a;
}
function hr(r) {
  return r % 400 === 0 || r % 4 === 0 && r % 100 !== 0;
}
var pn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 130), y(p(n), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      var u = function(f) {
        return {
          year: f,
          isTwoDigitYear: o === "yy"
        };
      };
      switch (o) {
        case "y":
          return W(E(4, a), u);
        case "yo":
          return W(i.ordinalNumber(a, {
            unit: "year"
          }), u);
        default:
          return W(E(o.length, a), u);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var u = a.getUTCFullYear();
      if (i.isTwoDigitYear) {
        var l = mr(i.year, u);
        return a.setUTCFullYear(l, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
      }
      var f = !("era" in o) || o.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(f, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Tn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 130), y(p(n), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      var u = function(f) {
        return {
          year: f,
          isTwoDigitYear: o === "YY"
        };
      };
      switch (o) {
        case "Y":
          return W(E(4, a), u);
        case "Yo":
          return W(i.ordinalNumber(a, {
            unit: "year"
          }), u);
        default:
          return W(E(o.length, a), u);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(a, o, i, u) {
      var l = dt(a, u);
      if (i.isTwoDigitYear) {
        var f = mr(i.year, l);
        return a.setUTCFullYear(f, 0, u.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), se(a, u);
      }
      var v = !("era" in o) || o.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(v, 0, u.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), se(a, u);
    }
  }]), e;
}(_), Dn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 130), y(p(n), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o) {
      return Re(o === "R" ? 4 : o.length, a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var u = /* @__PURE__ */ new Date(0);
      return u.setUTCFullYear(i, 0, 4), u.setUTCHours(0, 0, 0, 0), de(u);
    }
  }]), e;
}(_), bn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 130), y(p(n), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o) {
      return Re(o === "u" ? 4 : o.length, a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Mn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 120), y(p(n), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "Q":
        case "QQ":
          return E(o.length, a);
        case "Qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "QQQ":
          return i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "formatting"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), On = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 120), y(p(n), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "q":
        case "qq":
          return E(o.length, a);
        case "qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "qqq":
          return i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "standalone"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), kn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]), y(p(n), "priority", 110), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      var u = function(f) {
        return f - 1;
      };
      switch (o) {
        case "M":
          return W(I(P.month, a), u);
        case "MM":
          return W(E(2, a), u);
        case "Mo":
          return W(i.ordinalNumber(a, {
            unit: "month"
          }), u);
        case "MMM":
          return i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return i.month(a, {
            width: "wide",
            context: "formatting"
          }) || i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Cn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 110), y(p(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      var u = function(f) {
        return f - 1;
      };
      switch (o) {
        case "L":
          return W(I(P.month, a), u);
        case "LL":
          return W(E(2, a), u);
        case "Lo":
          return W(i.ordinalNumber(a, {
            unit: "month"
          }), u);
        case "LLL":
          return i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return i.month(a, {
            width: "wide",
            context: "standalone"
          }) || i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_);
function Nn(r, t, e) {
  s(2, arguments);
  var n = c(r), a = h(t), o = ir(n, e) - a;
  return n.setUTCDate(n.getUTCDate() - o * 7), n;
}
var Yn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 100), y(p(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "w":
          return I(P.week, a);
        case "wo":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(a, o, i, u) {
      return se(Nn(a, i, u), u);
    }
  }]), e;
}(_);
function xn(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = nr(e) - n;
  return e.setUTCDate(e.getUTCDate() - a * 7), e;
}
var _n = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 100), y(p(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "I":
          return I(P.week, a);
        case "Io":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return de(xn(a, i));
    }
  }]), e;
}(_), Sn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], In = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], En = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "subPriority", 1), y(p(n), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "d":
          return I(P.date, a);
        case "do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      var i = a.getUTCFullYear(), u = hr(i), l = a.getUTCMonth();
      return u ? o >= 1 && o <= In[l] : o >= 1 && o <= Sn[l];
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCDate(i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Pn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "subpriority", 1), y(p(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "D":
        case "DD":
          return I(P.dayOfYear, a);
        case "Do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      var i = a.getUTCFullYear(), u = hr(i);
      return u ? o >= 1 && o <= 366 : o >= 1 && o <= 365;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMonth(0, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_);
function gt(r, t, e) {
  var n, a, o, i, u, l, f, v;
  s(2, arguments);
  var d = $(), g = h((n = (a = (o = (i = e == null ? void 0 : e.weekStartsOn) !== null && i !== void 0 ? i : e == null || (u = e.locale) === null || u === void 0 || (l = u.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && o !== void 0 ? o : d.weekStartsOn) !== null && a !== void 0 ? a : (f = d.locale) === null || f === void 0 || (v = f.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(g >= 0 && g <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var m = c(r), w = h(t), D = m.getUTCDay(), b = w % 7, Y = (b + 7) % 7, x = (Y < g ? 7 : 0) + w - D;
  return m.setUTCDate(m.getUTCDate() + x), m;
}
var Wn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "E":
        case "EE":
        case "EEE":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, u) {
      return a = gt(a, i, u), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Un = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i, u) {
      var l = function(v) {
        var d = Math.floor((v - 1) / 7) * 7;
        return (v + u.weekStartsOn + 6) % 7 + d;
      };
      switch (o) {
        case "e":
        case "ee":
          return W(E(o.length, a), l);
        case "eo":
          return W(i.ordinalNumber(a, {
            unit: "day"
          }), l);
        case "eee":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, u) {
      return a = gt(a, i, u), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), $n = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i, u) {
      var l = function(v) {
        var d = Math.floor((v - 1) / 7) * 7;
        return (v + u.weekStartsOn + 6) % 7 + d;
      };
      switch (o) {
        case "c":
        case "cc":
          return W(E(o.length, a), l);
        case "co":
          return W(i.ordinalNumber(a, {
            unit: "day"
          }), l);
        case "ccc":
          return i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return i.day(a, {
            width: "wide",
            context: "standalone"
          }) || i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(a, o, i, u) {
      return a = gt(a, i, u), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_);
function Hn(r, t) {
  s(2, arguments);
  var e = h(t);
  e % 7 === 0 && (e = e - 7);
  var n = 1, a = c(r), o = a.getUTCDay(), i = e % 7, u = (i + 7) % 7, l = (u < n ? 7 : 0) + e - o;
  return a.setUTCDate(a.getUTCDate() + l), a;
}
var Fn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 90), y(p(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      var u = function(f) {
        return f === 0 ? 7 : f;
      };
      switch (o) {
        case "i":
        case "ii":
          return E(o.length, a);
        case "io":
          return i.ordinalNumber(a, {
            unit: "day"
          });
        case "iii":
          return W(i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), u);
        case "iiiii":
          return W(i.day(a, {
            width: "narrow",
            context: "formatting"
          }), u);
        case "iiiiii":
          return W(i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), u);
        case "iiii":
        default:
          return W(i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), u);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 7;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a = Hn(a, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), e;
}(_), Rn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 80), y(p(n), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "a":
        case "aa":
        case "aaa":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(ht(i), 0, 0, 0), a;
    }
  }]), e;
}(_), Ln = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 80), y(p(n), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "b":
        case "bb":
        case "bbb":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(ht(i), 0, 0, 0), a;
    }
  }]), e;
}(_), qn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 80), y(p(n), "incompatibleTokens", ["a", "b", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "B":
        case "BB":
        case "BBB":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(ht(i), 0, 0, 0), a;
    }
  }]), e;
}(_), An = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 70), y(p(n), "incompatibleTokens", ["H", "K", "k", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "h":
          return I(P.hour12h, a);
        case "ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 12;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var u = a.getUTCHours() >= 12;
      return u && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : !u && i === 12 ? a.setUTCHours(0, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), e;
}(_), Qn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 70), y(p(n), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "H":
          return I(P.hour23h, a);
        case "Ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 23;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), e;
}(_), jn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 70), y(p(n), "incompatibleTokens", ["h", "H", "k", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "K":
          return I(P.hour11h, a);
        case "Ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var u = a.getUTCHours() >= 12;
      return u && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), e;
}(_), Xn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 70), y(p(n), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "k":
          return I(P.hour24h, a);
        case "ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 1 && o <= 24;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      var u = i <= 24 ? i % 24 : i;
      return a.setUTCHours(u, 0, 0, 0), a;
    }
  }]), e;
}(_), Bn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 60), y(p(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "m":
          return I(P.minute, a);
        case "mo":
          return i.ordinalNumber(a, {
            unit: "minute"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMinutes(i, 0, 0), a;
    }
  }]), e;
}(_), Gn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 50), y(p(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o, i) {
      switch (o) {
        case "s":
          return I(P.second, a);
        case "so":
          return i.ordinalNumber(a, {
            unit: "second"
          });
        default:
          return E(o.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCSeconds(i, 0), a;
    }
  }]), e;
}(_), zn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 30), y(p(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o) {
      var i = function(l) {
        return Math.floor(l * Math.pow(10, -o.length + 3));
      };
      return W(E(o.length, a), i);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return a.setUTCMilliseconds(i), a;
    }
  }]), e;
}(_), Jn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 10), y(p(n), "incompatibleTokens", ["t", "T", "x"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o) {
      switch (o) {
        case "X":
          return V(J.basicOptionalMinutes, a);
        case "XX":
          return V(J.basic, a);
        case "XXXX":
          return V(J.basicOptionalSeconds, a);
        case "XXXXX":
          return V(J.extendedOptionalSeconds, a);
        case "XXX":
        default:
          return V(J.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), e;
}(_), Vn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 10), y(p(n), "incompatibleTokens", ["t", "T", "X"]), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a, o) {
      switch (o) {
        case "x":
          return V(J.basicOptionalMinutes, a);
        case "xx":
          return V(J.basic, a);
        case "xxxx":
          return V(J.basicOptionalSeconds, a);
        case "xxxxx":
          return V(J.extendedOptionalSeconds, a);
        case "xxx":
        default:
          return V(J.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return o.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), e;
}(_), Zn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 40), y(p(n), "incompatibleTokens", "*"), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a) {
      return dr(a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return [new Date(i * 1e3), {
        timestampIsSet: !0
      }];
    }
  }]), e;
}(_), Kn = /* @__PURE__ */ function(r) {
  C(e, r);
  var t = N(e);
  function e() {
    var n;
    O(this, e);
    for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(o)), y(p(n), "priority", 20), y(p(n), "incompatibleTokens", "*"), n;
  }
  return k(e, [{
    key: "parse",
    value: function(a) {
      return dr(a);
    }
  }, {
    key: "set",
    value: function(a, o, i) {
      return [new Date(i), {
        timestampIsSet: !0
      }];
    }
  }]), e;
}(_), ei = {
  G: new yn(),
  y: new pn(),
  Y: new Tn(),
  R: new Dn(),
  u: new bn(),
  Q: new Mn(),
  q: new On(),
  M: new kn(),
  L: new Cn(),
  w: new Yn(),
  I: new _n(),
  d: new En(),
  D: new Pn(),
  E: new Wn(),
  e: new Un(),
  c: new $n(),
  i: new Fn(),
  a: new Rn(),
  b: new Ln(),
  B: new qn(),
  h: new An(),
  H: new Qn(),
  K: new jn(),
  k: new Xn(),
  m: new Bn(),
  s: new Gn(),
  S: new zn(),
  X: new Jn(),
  x: new Vn(),
  t: new Zn(),
  T: new Kn()
}, ti = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ri = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ai = /^'([^]*?)'?$/, ni = /''/g, ii = /\S/, oi = /[a-zA-Z]/;
function ui(r, t, e, n) {
  var a, o, i, u, l, f, v, d, g, m, w, D, b, Y, x, M, A, B;
  s(3, arguments);
  var U = String(r), q = String(t), j = $(), z = (a = (o = n == null ? void 0 : n.locale) !== null && o !== void 0 ? o : j.locale) !== null && a !== void 0 ? a : we;
  if (!z.match)
    throw new RangeError("locale must contain match property");
  var re = h((i = (u = (l = (f = n == null ? void 0 : n.firstWeekContainsDate) !== null && f !== void 0 ? f : n == null || (v = n.locale) === null || v === void 0 || (d = v.options) === null || d === void 0 ? void 0 : d.firstWeekContainsDate) !== null && l !== void 0 ? l : j.firstWeekContainsDate) !== null && u !== void 0 ? u : (g = j.locale) === null || g === void 0 || (m = g.options) === null || m === void 0 ? void 0 : m.firstWeekContainsDate) !== null && i !== void 0 ? i : 1);
  if (!(re >= 1 && re <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var ye = h((w = (D = (b = (Y = n == null ? void 0 : n.weekStartsOn) !== null && Y !== void 0 ? Y : n == null || (x = n.locale) === null || x === void 0 || (M = x.options) === null || M === void 0 ? void 0 : M.weekStartsOn) !== null && b !== void 0 ? b : j.weekStartsOn) !== null && D !== void 0 ? D : (A = j.locale) === null || A === void 0 || (B = A.options) === null || B === void 0 ? void 0 : B.weekStartsOn) !== null && w !== void 0 ? w : 0);
  if (!(ye >= 0 && ye <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (q === "")
    return U === "" ? c(e) : /* @__PURE__ */ new Date(NaN);
  var pe = {
    firstWeekContainsDate: re,
    weekStartsOn: ye,
    locale: z
  }, Te = [new wn()], je = q.match(ri).map(function(H) {
    var S = H[0];
    if (S in at) {
      var X = at[S];
      return X(H, z.formatLong);
    }
    return H;
  }).join("").match(ti), F = [], Q = Ut(je), ie;
  try {
    var pr = function() {
      var S = ie.value;
      !(n != null && n.useAdditionalWeekYearTokens) && sr(S) && $e(S, q, r), !(n != null && n.useAdditionalDayOfYearTokens) && ur(S) && $e(S, q, r);
      var X = S[0], Ee = ei[X];
      if (Ee) {
        var bt = Ee.incompatibleTokens;
        if (Array.isArray(bt)) {
          var Mt = F.find(function(Ot) {
            return bt.includes(Ot.token) || Ot.token === X;
          });
          if (Mt)
            throw new RangeError("The format string mustn't contain `".concat(Mt.fullToken, "` and `").concat(S, "` at the same time"));
        } else if (Ee.incompatibleTokens === "*" && F.length > 0)
          throw new RangeError("The format string mustn't contain `".concat(S, "` and any other token at the same time"));
        F.push({
          token: X,
          fullToken: S
        });
        var Be = Ee.run(U, S, z.match, pe);
        if (!Be)
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        Te.push(Be.setter), U = Be.rest;
      } else {
        if (X.match(oi))
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + X + "`");
        if (S === "''" ? S = "'" : X === "'" && (S = si(S)), U.indexOf(S) === 0)
          U = U.slice(S.length);
        else
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
      }
    };
    for (Q.s(); !(ie = Q.n()).done; ) {
      var yt = pr();
      if (R(yt) === "object")
        return yt.v;
    }
  } catch (H) {
    Q.e(H);
  } finally {
    Q.f();
  }
  if (U.length > 0 && ii.test(U))
    return /* @__PURE__ */ new Date(NaN);
  var Tr = Te.map(function(H) {
    return H.priority;
  }).sort(function(H, S) {
    return S - H;
  }).filter(function(H, S, X) {
    return X.indexOf(H) === S;
  }).map(function(H) {
    return Te.filter(function(S) {
      return S.priority === H;
    }).sort(function(S, X) {
      return X.subPriority - S.subPriority;
    });
  }).map(function(H) {
    return H[0];
  }), Xe = c(e);
  if (isNaN(Xe.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var De = xe(Xe, L(Xe)), pt = {}, Se = Ut(Tr), Tt;
  try {
    for (Se.s(); !(Tt = Se.n()).done; ) {
      var Dt = Tt.value;
      if (!Dt.validate(De, pe))
        return /* @__PURE__ */ new Date(NaN);
      var Ie = Dt.set(De, pt, pe);
      Array.isArray(Ie) ? (De = Ie[0], _e(pt, Ie[1])) : De = Ie;
    }
  } catch (H) {
    Se.e(H);
  } finally {
    Se.f();
  }
  return De;
}
function si(r) {
  return r.match(ai)[1].replace(ni, "'");
}
function Ko(r, t, e) {
  return s(2, arguments), ne(ui(r, t, /* @__PURE__ */ new Date(), e));
}
function eu(r) {
  return s(1, arguments), c(r).getDay() === 1;
}
function tu(r) {
  return s(1, arguments), c(r).getTime() < Date.now();
}
function $t(r) {
  s(1, arguments);
  var t = c(r);
  return t.setMinutes(0, 0, 0), t;
}
function li(r, t) {
  s(2, arguments);
  var e = $t(r), n = $t(t);
  return e.getTime() === n.getTime();
}
function gr(r, t, e) {
  s(2, arguments);
  var n = G(r, e), a = G(t, e);
  return n.getTime() === a.getTime();
}
function ci(r, t) {
  return s(2, arguments), gr(r, t, {
    weekStartsOn: 1
  });
}
function ru(r, t) {
  s(2, arguments);
  var e = ue(r), n = ue(t);
  return e.getTime() === n.getTime();
}
function fi(r, t) {
  s(2, arguments);
  var e = rt(r), n = rt(t);
  return e.getTime() === n.getTime();
}
function vi(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getFullYear() === n.getFullYear() && e.getMonth() === n.getMonth();
}
function di(r, t) {
  s(2, arguments);
  var e = Ue(r), n = Ue(t);
  return e.getTime() === n.getTime();
}
function Ht(r) {
  s(1, arguments);
  var t = c(r);
  return t.setMilliseconds(0), t;
}
function mi(r, t) {
  s(2, arguments);
  var e = Ht(r), n = Ht(t);
  return e.getTime() === n.getTime();
}
function hi(r, t) {
  s(2, arguments);
  var e = c(r), n = c(t);
  return e.getFullYear() === n.getFullYear();
}
function au(r) {
  return s(1, arguments), li(Date.now(), r);
}
function nu(r) {
  return s(1, arguments), ci(r, Date.now());
}
function iu(r) {
  return s(1, arguments), fi(Date.now(), r);
}
function ou(r) {
  return s(1, arguments), vi(Date.now(), r);
}
function uu(r) {
  return s(1, arguments), di(Date.now(), r);
}
function su(r) {
  return s(1, arguments), mi(Date.now(), r);
}
function lu(r, t) {
  return s(1, arguments), gr(r, Date.now(), t);
}
function cu(r) {
  return s(1, arguments), hi(r, Date.now());
}
function fu(r) {
  return s(1, arguments), c(r).getDay() === 4;
}
function vu(r) {
  return s(1, arguments), Qe(r, Date.now());
}
function du(r) {
  return s(1, arguments), Qe(r, te(Date.now(), 1));
}
function mu(r) {
  return s(1, arguments), c(r).getDay() === 2;
}
function hu(r) {
  return s(1, arguments), c(r).getDay() === 3;
}
function gu(r, t) {
  s(2, arguments);
  var e = c(r).getTime(), n = c(t.start).getTime(), a = c(t.end).getTime();
  if (!(n <= a))
    throw new RangeError("Invalid interval");
  return e >= n && e <= a;
}
function wt(r, t) {
  s(2, arguments);
  var e = h(t);
  return te(r, -e);
}
function wu(r) {
  return s(1, arguments), Qe(r, wt(Date.now(), 1));
}
function yu(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = 9 + Math.floor(e / 10) * 10;
  return t.setFullYear(n + 1, 0, 0), t.setHours(0, 0, 0, 0), t;
}
function gi(r, t) {
  var e, n, a, o, i, u, l, f;
  s(1, arguments);
  var v = $(), d = h((e = (n = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : v.weekStartsOn) !== null && n !== void 0 ? n : (l = v.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.weekStartsOn) !== null && e !== void 0 ? e : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6");
  var g = c(r), m = g.getDay(), w = (m < d ? -7 : 0) + 6 - (m - d);
  return g.setHours(0, 0, 0, 0), g.setDate(g.getDate() + w), g;
}
function pu(r) {
  return s(1, arguments), gi(r, {
    weekStartsOn: 1
  });
}
function Tu(r) {
  s(1, arguments);
  var t = ve(r), e = /* @__PURE__ */ new Date(0);
  e.setFullYear(t + 1, 0, 4), e.setHours(0, 0, 0, 0);
  var n = ae(e);
  return n.setDate(n.getDate() - 1), n;
}
function Du(r) {
  s(1, arguments);
  var t = c(r), e = t.getMonth(), n = e - e % 3 + 3;
  return t.setMonth(n, 0), t.setHours(0, 0, 0, 0), t;
}
function bu(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear();
  return t.setFullYear(e + 1, 0, 0), t.setHours(0, 0, 0, 0), t;
}
var wi = /(\w)\1*|''|'(''|[^'])+('|$)|./g, yi = /^'([^]*?)'?$/, pi = /''/g, Ti = /[a-zA-Z]/;
function Mu(r, t) {
  s(2, arguments);
  var e = c(r);
  if (!ne(e))
    throw new RangeError("Invalid time value");
  var n = L(e), a = xe(e, n), o = t.match(wi);
  if (!o)
    return "";
  var i = o.map(function(u) {
    if (u === "''")
      return "'";
    var l = u[0];
    if (l === "'")
      return Di(u);
    var f = K[l];
    if (f)
      return f(a, u);
    if (l.match(Ti))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + l + "`");
    return u;
  }).join("");
  return i;
}
function Di(r) {
  var t = r.match(yi);
  return t ? t[1].replace(pi, "'") : r;
}
var Ft = 365.2425;
function Ou(r) {
  var t = r.years, e = r.months, n = r.weeks, a = r.days, o = r.hours, i = r.minutes, u = r.seconds;
  s(1, arguments);
  var l = 0;
  t && (l += t * Ft), e && (l += e * (Ft / 12)), n && (l += n * 7), a && (l += a);
  var f = l * 24 * 60 * 60;
  return o && (f += o * 60 * 60), i && (f += i * 60), u && (f += u), Math.round(f * 1e3);
}
function ku(r) {
  s(1, arguments);
  var t = r / he;
  return Math.floor(t);
}
function Cu(r) {
  s(1, arguments);
  var t = r / me;
  return Math.floor(t);
}
function Nu(r) {
  s(1, arguments);
  var t = r / ut;
  return Math.floor(t);
}
function Yu(r) {
  s(1, arguments);
  var t = r / Xt;
  return Math.floor(t);
}
function xu(r) {
  return s(1, arguments), Math.floor(r * me);
}
function _u(r) {
  return s(1, arguments), Math.floor(r * st);
}
function Su(r) {
  s(1, arguments);
  var t = r / Bt;
  return Math.floor(t);
}
function Iu(r) {
  s(1, arguments);
  var t = r / Gt;
  return Math.floor(t);
}
function le(r, t) {
  s(2, arguments);
  var e = t - mt(r);
  return e <= 0 && (e += 7), te(r, e);
}
function Eu(r) {
  return s(1, arguments), le(r, 5);
}
function Pu(r) {
  return s(1, arguments), le(r, 1);
}
function Wu(r) {
  return s(1, arguments), le(r, 6);
}
function Uu(r) {
  return s(1, arguments), le(r, 0);
}
function $u(r) {
  return s(1, arguments), le(r, 4);
}
function Hu(r) {
  return s(1, arguments), le(r, 2);
}
function Fu(r) {
  return s(1, arguments), le(r, 3);
}
function Ru(r, t) {
  var e;
  s(1, arguments);
  var n = h((e = t == null ? void 0 : t.additionalDigits) !== null && e !== void 0 ? e : 2);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (!(typeof r == "string" || Object.prototype.toString.call(r) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var a = ki(r), o;
  if (a.date) {
    var i = Ci(a.date, n);
    o = Ni(i.restDateString, i.year);
  }
  if (!o || isNaN(o.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var u = o.getTime(), l = 0, f;
  if (a.time && (l = Yi(a.time), isNaN(l)))
    return /* @__PURE__ */ new Date(NaN);
  if (a.timezone) {
    if (f = xi(a.timezone), isNaN(f))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    var v = new Date(u + l), d = /* @__PURE__ */ new Date(0);
    return d.setFullYear(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()), d.setHours(v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()), d;
  }
  return new Date(u + l + f);
}
var Pe = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, bi = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Mi = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Oi = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ki(r) {
  var t = {}, e = r.split(Pe.dateTimeDelimiter), n;
  if (e.length > 2)
    return t;
  if (/:/.test(e[0]) ? n = e[0] : (t.date = e[0], n = e[1], Pe.timeZoneDelimiter.test(t.date) && (t.date = r.split(Pe.timeZoneDelimiter)[0], n = r.substr(t.date.length, r.length))), n) {
    var a = Pe.timezone.exec(n);
    a ? (t.time = n.replace(a[1], ""), t.timezone = a[1]) : t.time = n;
  }
  return t;
}
function Ci(r, t) {
  var e = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"), n = r.match(e);
  if (!n)
    return {
      year: NaN,
      restDateString: ""
    };
  var a = n[1] ? parseInt(n[1]) : null, o = n[2] ? parseInt(n[2]) : null;
  return {
    year: o === null ? a : o * 100,
    restDateString: r.slice((n[1] || n[2]).length)
  };
}
function Ni(r, t) {
  if (t === null)
    return /* @__PURE__ */ new Date(NaN);
  var e = r.match(bi);
  if (!e)
    return /* @__PURE__ */ new Date(NaN);
  var n = !!e[4], a = ke(e[1]), o = ke(e[2]) - 1, i = ke(e[3]), u = ke(e[4]), l = ke(e[5]) - 1;
  if (n)
    return Pi(t, u, l) ? _i(t, u, l) : /* @__PURE__ */ new Date(NaN);
  var f = /* @__PURE__ */ new Date(0);
  return !Ii(t, o, i) || !Ei(t, a) ? /* @__PURE__ */ new Date(NaN) : (f.setUTCFullYear(t, o, Math.max(a, i)), f);
}
function ke(r) {
  return r ? parseInt(r) : 1;
}
function Yi(r) {
  var t = r.match(Mi);
  if (!t)
    return NaN;
  var e = Ve(t[1]), n = Ve(t[2]), a = Ve(t[3]);
  return Wi(e, n, a) ? e * he + n * me + a * 1e3 : NaN;
}
function Ve(r) {
  return r && parseFloat(r.replace(",", ".")) || 0;
}
function xi(r) {
  if (r === "Z")
    return 0;
  var t = r.match(Oi);
  if (!t)
    return 0;
  var e = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), a = t[3] && parseInt(t[3]) || 0;
  return Ui(n, a) ? e * (n * he + a * me) : NaN;
}
function _i(r, t, e) {
  var n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(r, 0, 4);
  var a = n.getUTCDay() || 7, o = (t - 1) * 7 + e + 1 - a;
  return n.setUTCDate(n.getUTCDate() + o), n;
}
var Si = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function wr(r) {
  return r % 400 === 0 || r % 4 === 0 && r % 100 !== 0;
}
function Ii(r, t, e) {
  return t >= 0 && t <= 11 && e >= 1 && e <= (Si[t] || (wr(r) ? 29 : 28));
}
function Ei(r, t) {
  return t >= 1 && t <= (wr(r) ? 366 : 365);
}
function Pi(r, t, e) {
  return t >= 1 && t <= 53 && e >= 0 && e <= 6;
}
function Wi(r, t, e) {
  return r === 24 ? t === 0 && e === 0 : e >= 0 && e < 60 && t >= 0 && t < 60 && r >= 0 && r < 25;
}
function Ui(r, t) {
  return t >= 0 && t <= 59;
}
function Lu(r) {
  if (s(1, arguments), typeof r == "string") {
    var t = r.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);
    return t ? new Date(Date.UTC(+t[1], +t[2] - 1, +t[3], +t[4] - (+t[9] || 0) * (t[8] == "-" ? -1 : 1), +t[5] - (+t[10] || 0) * (t[8] == "-" ? -1 : 1), +t[6], +((t[7] || "0") + "00").substring(0, 3))) : /* @__PURE__ */ new Date(NaN);
  }
  return c(r);
}
function ce(r, t) {
  s(2, arguments);
  var e = mt(r) - t;
  return e <= 0 && (e += 7), wt(r, e);
}
function qu(r) {
  return s(1, arguments), ce(r, 5);
}
function Au(r) {
  return s(1, arguments), ce(r, 1);
}
function Qu(r) {
  return s(1, arguments), ce(r, 6);
}
function ju(r) {
  return s(1, arguments), ce(r, 0);
}
function Xu(r) {
  return s(1, arguments), ce(r, 4);
}
function Bu(r) {
  return s(1, arguments), ce(r, 2);
}
function Gu(r) {
  return s(1, arguments), ce(r, 3);
}
function zu(r) {
  return s(1, arguments), Math.floor(r * Bt);
}
function Ju(r) {
  s(1, arguments);
  var t = r / zt;
  return Math.floor(t);
}
function Vu(r, t) {
  var e;
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only none provided present");
  var n = h((e = t == null ? void 0 : t.nearestTo) !== null && e !== void 0 ? e : 1);
  if (n < 1 || n > 30)
    throw new RangeError("`options.nearestTo` must be between 1 and 30");
  var a = c(r), o = a.getSeconds(), i = a.getMinutes() + o / 60, u = ge(t == null ? void 0 : t.roundingMethod), l = u(i / n) * n, f = i % n, v = Math.round(f / n) * n;
  return new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), l + v);
}
function Zu(r) {
  s(1, arguments);
  var t = r / Ae;
  return Math.floor(t);
}
function Ku(r) {
  return s(1, arguments), r * ut;
}
function es(r) {
  s(1, arguments);
  var t = r / st;
  return Math.floor(t);
}
function yr(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = e.getFullYear(), o = e.getDate(), i = /* @__PURE__ */ new Date(0);
  i.setFullYear(a, n, 15), i.setHours(0, 0, 0, 0);
  var u = Va(i);
  return e.setMonth(n, Math.min(o, u)), e;
}
function ts(r, t) {
  if (s(2, arguments), R(t) !== "object" || t === null)
    throw new RangeError("values parameter must be an object");
  var e = c(r);
  return isNaN(e.getTime()) ? /* @__PURE__ */ new Date(NaN) : (t.year != null && e.setFullYear(t.year), t.month != null && (e = yr(e, t.month)), t.date != null && e.setDate(h(t.date)), t.hours != null && e.setHours(h(t.hours)), t.minutes != null && e.setMinutes(h(t.minutes)), t.seconds != null && e.setSeconds(h(t.seconds)), t.milliseconds != null && e.setMilliseconds(h(t.milliseconds)), e);
}
function rs(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setDate(n), e;
}
function as(r, t, e) {
  var n, a, o, i, u, l, f, v;
  s(2, arguments);
  var d = $(), g = h((n = (a = (o = (i = e == null ? void 0 : e.weekStartsOn) !== null && i !== void 0 ? i : e == null || (u = e.locale) === null || u === void 0 || (l = u.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && o !== void 0 ? o : d.weekStartsOn) !== null && a !== void 0 ? a : (f = d.locale) === null || f === void 0 || (v = f.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(g >= 0 && g <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var m = c(r), w = h(t), D = m.getDay(), b = w % 7, Y = (b + 7) % 7, x = 7 - g, M = w < 0 || w > 6 ? w - (D + x) % 7 : (Y + x) % 7 - (D + x) % 7;
  return te(m, M);
}
function ns(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setMonth(0), e.setDate(n), e;
}
function is(r) {
  s(1, arguments);
  var t = {}, e = $();
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  for (var a in r)
    Object.prototype.hasOwnProperty.call(r, a) && (r[a] === void 0 ? delete t[a] : t[a] = r[a]);
  Or(t);
}
function os(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setHours(n), e;
}
function us(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = Ka(e), o = n - a;
  return te(e, o);
}
function ss(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = tn(e) - n;
  return e.setDate(e.getDate() - a * 7), e;
}
function ls(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setMilliseconds(n), e;
}
function cs(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setMinutes(n), e;
}
function fs(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t), a = Math.floor(e.getMonth() / 3) + 1, o = n - a;
  return yr(e, e.getMonth() + o * 3);
}
function vs(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return e.setSeconds(n), e;
}
function ds(r, t, e) {
  s(2, arguments);
  var n = c(r), a = h(t), o = sn(n, e) - a;
  return n.setDate(n.getDate() - o * 7), n;
}
function ms(r, t, e) {
  var n, a, o, i, u, l, f, v;
  s(2, arguments);
  var d = $(), g = h((n = (a = (o = (i = e == null ? void 0 : e.firstWeekContainsDate) !== null && i !== void 0 ? i : e == null || (u = e.locale) === null || u === void 0 || (l = u.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && o !== void 0 ? o : d.firstWeekContainsDate) !== null && a !== void 0 ? a : (f = d.locale) === null || f === void 0 || (v = f.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && n !== void 0 ? n : 1), m = c(r), w = h(t), D = ee(m, nt(m, e)), b = /* @__PURE__ */ new Date(0);
  return b.setFullYear(w, 0, g), b.setHours(0, 0, 0, 0), m = nt(b, e), m.setDate(m.getDate() + D), m;
}
function hs(r, t) {
  s(2, arguments);
  var e = c(r), n = h(t);
  return isNaN(e.getTime()) ? /* @__PURE__ */ new Date(NaN) : (e.setFullYear(n), e);
}
function gs(r) {
  s(1, arguments);
  var t = c(r), e = t.getFullYear(), n = Math.floor(e / 10) * 10;
  return t.setFullYear(n, 0, 1), t.setHours(0, 0, 0, 0), t;
}
function ws() {
  return Ye(Date.now());
}
function ys() {
  var r = /* @__PURE__ */ new Date(), t = r.getFullYear(), e = r.getMonth(), n = r.getDate(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(t, e, n + 1), a.setHours(0, 0, 0, 0), a;
}
function ps() {
  var r = /* @__PURE__ */ new Date(), t = r.getFullYear(), e = r.getMonth(), n = r.getDate(), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(t, e, n - 1), a.setHours(0, 0, 0, 0), a;
}
function $i(r, t) {
  s(2, arguments);
  var e = h(t);
  return Le(r, -e);
}
function Ts(r, t) {
  if (s(2, arguments), !t || R(t) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var e = t.years ? h(t.years) : 0, n = t.months ? h(t.months) : 0, a = t.weeks ? h(t.weeks) : 0, o = t.days ? h(t.days) : 0, i = t.hours ? h(t.hours) : 0, u = t.minutes ? h(t.minutes) : 0, l = t.seconds ? h(t.seconds) : 0, f = $i(r, n + e * 12), v = wt(f, o + a * 7), d = u + i * 60, g = l + d * 60, m = g * 1e3, w = new Date(v.getTime() - m);
  return w;
}
function Ds(r, t) {
  s(2, arguments);
  var e = h(t);
  return br(r, -e);
}
function bs(r, t) {
  s(2, arguments);
  var e = h(t);
  return Lt(r, -e);
}
function Ms(r, t) {
  s(2, arguments);
  var e = h(t);
  return At(r, -e);
}
function Os(r, t) {
  s(2, arguments);
  var e = h(t);
  return Qt(r, -e);
}
function ks(r, t) {
  s(2, arguments);
  var e = h(t);
  return xr(r, -e);
}
function Cs(r, t) {
  s(2, arguments);
  var e = h(t);
  return ot(r, -e);
}
function Ns(r, t) {
  s(2, arguments);
  var e = h(t);
  return _r(r, -e);
}
function Ys(r) {
  return s(1, arguments), Math.floor(r * jt);
}
function xs(r) {
  return s(1, arguments), Math.floor(r * Gt);
}
function _s(r) {
  return s(1, arguments), Math.floor(r * zt);
}
export {
  be as add,
  br as addBusinessDays,
  te as addDays,
  Lt as addHours,
  Nr as addISOWeekYears,
  qe as addMilliseconds,
  At as addMinutes,
  Le as addMonths,
  Qt as addQuarters,
  xr as addSeconds,
  ot as addWeeks,
  _r as addYears,
  Hi as areIntervalsOverlapping,
  Fi as clamp,
  Ri as closestIndexTo,
  Li as closestTo,
  Z as compareAsc,
  qi as compareDesc,
  jt as daysInWeek,
  Er as daysInYear,
  Qi as daysToWeeks,
  ji as differenceInBusinessDays,
  ee as differenceInCalendarDays,
  Hr as differenceInCalendarISOWeekYears,
  Xi as differenceInCalendarISOWeeks,
  Ze as differenceInCalendarMonths,
  Ge as differenceInCalendarQuarters,
  Ke as differenceInCalendarWeeks,
  We as differenceInCalendarYears,
  Zt as differenceInDays,
  et as differenceInHours,
  Bi as differenceInISOWeekYears,
  ct as differenceInMilliseconds,
  tt as differenceInMinutes,
  ft as differenceInMonths,
  Gi as differenceInQuarters,
  Ne as differenceInSeconds,
  zi as differenceInWeeks,
  Qr as differenceInYears,
  jr as eachDayOfInterval,
  Ji as eachHourOfInterval,
  Vi as eachMinuteOfInterval,
  Zi as eachMonthOfInterval,
  Ki as eachQuarterOfInterval,
  eo as eachWeekOfInterval,
  tr as eachWeekendOfInterval,
  to as eachWeekendOfMonth,
  ro as eachWeekendOfYear,
  ao as eachYearOfInterval,
  Kt as endOfDay,
  no as endOfDecade,
  io as endOfHour,
  oo as endOfISOWeek,
  uo as endOfISOWeekYear,
  so as endOfMinute,
  er as endOfMonth,
  lo as endOfQuarter,
  co as endOfSecond,
  fo as endOfToday,
  vo as endOfTomorrow,
  Br as endOfWeek,
  Xr as endOfYear,
  mo as endOfYesterday,
  La as format,
  ja as formatDistance,
  Xa as formatDistanceStrict,
  ho as formatDistanceToNow,
  go as formatDistanceToNowStrict,
  wo as formatDuration,
  yo as formatISO,
  po as formatISO9075,
  To as formatISODuration,
  Do as formatRFC3339,
  bo as formatRFC7231,
  Mo as formatRelative,
  Oo as fromUnixTime,
  Ja as getDate,
  mt as getDay,
  ko as getDayOfYear,
  Va as getDaysInMonth,
  Co as getDaysInYear,
  No as getDecade,
  Yo as getDefaultOptions,
  xo as getHours,
  Ka as getISODay,
  tn as getISOWeek,
  ve as getISOWeekYear,
  _o as getISOWeeksInYear,
  So as getMilliseconds,
  Io as getMinutes,
  Eo as getMonth,
  Po as getOverlappingDaysInIntervals,
  kt as getQuarter,
  Wo as getSeconds,
  nn as getTime,
  Uo as getUnixTime,
  sn as getWeek,
  $o as getWeekOfMonth,
  on as getWeekYear,
  Ho as getWeeksInMonth,
  Fo as getYear,
  Ro as hoursToMilliseconds,
  Lo as hoursToMinutes,
  qo as hoursToSeconds,
  Ao as intervalToDuration,
  Qo as intlFormat,
  jo as intlFormatDistance,
  Xo as isAfter,
  Bo as isBefore,
  $r as isDate,
  Go as isEqual,
  zo as isExists,
  Jo as isFirstDayOfMonth,
  Vo as isFriday,
  Zo as isFuture,
  Ar as isLastDayOfMonth,
  Za as isLeapYear,
  Ko as isMatch,
  eu as isMonday,
  tu as isPast,
  Qe as isSameDay,
  li as isSameHour,
  ci as isSameISOWeek,
  ru as isSameISOWeekYear,
  fi as isSameMinute,
  vi as isSameMonth,
  di as isSameQuarter,
  mi as isSameSecond,
  gr as isSameWeek,
  hi as isSameYear,
  Dr as isSaturday,
  Rt as isSunday,
  au as isThisHour,
  nu as isThisISOWeek,
  iu as isThisMinute,
  ou as isThisMonth,
  uu as isThisQuarter,
  su as isThisSecond,
  lu as isThisWeek,
  cu as isThisYear,
  fu as isThursday,
  vu as isToday,
  du as isTomorrow,
  mu as isTuesday,
  ne as isValid,
  hu as isWednesday,
  Ce as isWeekend,
  gu as isWithinInterval,
  wu as isYesterday,
  yu as lastDayOfDecade,
  pu as lastDayOfISOWeek,
  Tu as lastDayOfISOWeekYear,
  ln as lastDayOfMonth,
  Du as lastDayOfQuarter,
  gi as lastDayOfWeek,
  bu as lastDayOfYear,
  Mu as lightFormat,
  Sr as max,
  Pr as maxTime,
  Ou as milliseconds,
  he as millisecondsInHour,
  me as millisecondsInMinute,
  ut as millisecondsInSecond,
  ku as millisecondsToHours,
  Cu as millisecondsToMinutes,
  Nu as millisecondsToSeconds,
  Ir as min,
  Ai as minTime,
  Xt as minutesInHour,
  Yu as minutesToHours,
  xu as minutesToMilliseconds,
  _u as minutesToSeconds,
  Bt as monthsInQuarter,
  Gt as monthsInYear,
  Su as monthsToQuarters,
  Iu as monthsToYears,
  le as nextDay,
  Eu as nextFriday,
  Pu as nextMonday,
  Wu as nextSaturday,
  Uu as nextSunday,
  $u as nextThursday,
  Hu as nextTuesday,
  Fu as nextWednesday,
  ui as parse,
  Ru as parseISO,
  Lu as parseJSON,
  ce as previousDay,
  qu as previousFriday,
  Au as previousMonday,
  Qu as previousSaturday,
  ju as previousSunday,
  Xu as previousThursday,
  Bu as previousTuesday,
  Gu as previousWednesday,
  zt as quartersInYear,
  zu as quartersToMonths,
  Ju as quartersToYears,
  Vu as roundToNearestMinutes,
  lt as secondsInDay,
  Ae as secondsInHour,
  st as secondsInMinute,
  Vt as secondsInMonth,
  Ur as secondsInQuarter,
  Wr as secondsInWeek,
  Jt as secondsInYear,
  Zu as secondsToHours,
  Ku as secondsToMilliseconds,
  es as secondsToMinutes,
  ts as set,
  rs as setDate,
  as as setDay,
  ns as setDayOfYear,
  is as setDefaultOptions,
  os as setHours,
  us as setISODay,
  ss as setISOWeek,
  Cr as setISOWeekYear,
  ls as setMilliseconds,
  cs as setMinutes,
  yr as setMonth,
  fs as setQuarter,
  vs as setSeconds,
  ds as setWeek,
  ms as setWeekYear,
  hs as setYear,
  Ye as startOfDay,
  gs as startOfDecade,
  $t as startOfHour,
  ae as startOfISOWeek,
  ue as startOfISOWeekYear,
  rt as startOfMinute,
  vt as startOfMonth,
  Ue as startOfQuarter,
  Ht as startOfSecond,
  ws as startOfToday,
  ys as startOfTomorrow,
  G as startOfWeek,
  nt as startOfWeekYear,
  rr as startOfYear,
  ps as startOfYesterday,
  Ts as sub,
  Ds as subBusinessDays,
  wt as subDays,
  bs as subHours,
  qr as subISOWeekYears,
  xe as subMilliseconds,
  Ms as subMinutes,
  $i as subMonths,
  Os as subQuarters,
  ks as subSeconds,
  Cs as subWeeks,
  Ns as subYears,
  c as toDate,
  Ys as weeksToDays,
  xs as yearsToMonths,
  _s as yearsToQuarters
};
