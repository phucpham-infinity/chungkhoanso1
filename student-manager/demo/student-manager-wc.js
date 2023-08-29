function hn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function _n(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Y(s) ? hr(s) : _n(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (Y(e))
      return e;
    if (z(e))
      return e;
  }
}
const fr = /;(?![^(]*\))/g, pr = /:([^]+)/, dr = /\/\*.*?\*\//gs;
function hr(e) {
  const t = {};
  return e.replace(dr, "").split(fr).forEach((n) => {
    if (n) {
      const s = n.split(pr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function mn(e) {
  let t = "";
  if (Y(e))
    t = e;
  else if (I(e))
    for (let n = 0; n < e.length; n++) {
      const s = mn(e[n]);
      s && (t += s + " ");
    }
  else if (z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const _r = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", mr = /* @__PURE__ */ hn(_r);
function bs(e) {
  return !!e || e === "";
}
const V = {}, Qe = [], me = () => {
}, gr = () => !1, br = /^on[^a-z]/, Dt = (e) => br.test(e), gn = (e) => e.startsWith("onUpdate:"), q = Object.assign, bn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Er = Object.prototype.hasOwnProperty, L = (e, t) => Er.call(e, t), I = Array.isArray, ct = (e) => Mt(e) === "[object Map]", Cr = (e) => Mt(e) === "[object Set]", w = (e) => typeof e == "function", Y = (e) => typeof e == "string", En = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", Es = (e) => z(e) && w(e.then) && w(e.catch), yr = Object.prototype.toString, Mt = (e) => yr.call(e), Ar = (e) => Mt(e).slice(8, -1), vr = (e) => Mt(e) === "[object Object]", Cn = (e) => Y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ hn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Lt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Tr = /-(\w)/g, xe = Lt((e) => e.replace(Tr, (t, n) => n ? n.toUpperCase() : "")), Sr = /\B([A-Z])/g, pe = Lt((e) => e.replace(Sr, "-$1").toLowerCase()), Cs = Lt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Gt = Lt((e) => e ? `on${Cs(e)}` : ""), Rt = (e, t) => !Object.is(e, t), Jt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, It = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Or = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Kn = (e) => {
  const t = Y(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Gn;
const xr = () => Gn || (Gn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let fe;
class Rr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = fe, !t && fe && (this.index = (fe.scopes || (fe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = fe;
      try {
        return fe = this, t();
      } finally {
        fe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    fe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    fe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ir(e, t = fe) {
  t && t.active && t.effects.push(e);
}
function Pr() {
  return fe;
}
const yn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ys = (e) => (e.w & Ue) > 0, As = (e) => (e.n & Ue) > 0, wr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ue;
}, Dr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      ys(r) && !As(r) ? r.delete(e) : t[n++] = r, r.w &= ~Ue, r.n &= ~Ue;
    }
    t.length = n;
  }
}, Qt = /* @__PURE__ */ new WeakMap();
let lt = 0, Ue = 1;
const en = 30;
let de;
const $e = Symbol(""), tn = Symbol("");
class An {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ir(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = de, n = Le;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = de, de = this, Le = !0, Ue = 1 << ++lt, lt <= en ? wr(this) : Jn(this), this.fn();
    } finally {
      lt <= en && Dr(this), Ue = 1 << --lt, de = this.parent, Le = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    de === this ? this.deferStop = !0 : this.active && (Jn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Jn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Le = !0;
const vs = [];
function st() {
  vs.push(Le), Le = !1;
}
function rt() {
  const e = vs.pop();
  Le = e === void 0 ? !0 : e;
}
function re(e, t, n) {
  if (Le && de) {
    let s = Qt.get(e);
    s || Qt.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = yn()), Ts(r);
  }
}
function Ts(e, t) {
  let n = !1;
  lt <= en ? As(e) || (e.n |= Ue, n = !ys(e)) : n = !e.has(de), n && (e.add(de), de.deps.push(e));
}
function Ie(e, t, n, s, r, o) {
  const i = Qt.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && I(e)) {
    const u = Number(s);
    i.forEach((p, _) => {
      (_ === "length" || _ >= u) && c.push(p);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        I(e) ? Cn(n) && c.push(i.get("length")) : (c.push(i.get($e)), ct(e) && c.push(i.get(tn)));
        break;
      case "delete":
        I(e) || (c.push(i.get($e)), ct(e) && c.push(i.get(tn)));
        break;
      case "set":
        ct(e) && c.push(i.get($e));
        break;
    }
  if (c.length === 1)
    c[0] && nn(c[0]);
  else {
    const u = [];
    for (const p of c)
      p && u.push(...p);
    nn(yn(u));
  }
}
function nn(e, t) {
  const n = I(e) ? e : [...e];
  for (const s of n)
    s.computed && Wn(s);
  for (const s of n)
    s.computed || Wn(s);
}
function Wn(e, t) {
  (e !== de || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Mr = /* @__PURE__ */ hn("__proto__,__v_isRef,__isVue"), Ss = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(En)
), Lr = /* @__PURE__ */ vn(), Nr = /* @__PURE__ */ vn(!1, !0), kr = /* @__PURE__ */ vn(!0), $n = /* @__PURE__ */ Ur();
function Ur() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = N(this);
      for (let o = 0, i = this.length; o < i; o++)
        re(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(N)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      st();
      const s = N(this)[t].apply(this, n);
      return rt(), s;
    };
  }), e;
}
function Fr(e) {
  const t = N(this);
  return re(t, "has", e), t.hasOwnProperty(e);
}
function vn(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? eo : Ps : t ? Is : Rs).get(s))
      return s;
    const i = I(s);
    if (!e) {
      if (i && L($n, r))
        return Reflect.get($n, r, o);
      if (r === "hasOwnProperty")
        return Fr;
    }
    const c = Reflect.get(s, r, o);
    return (En(r) ? Ss.has(r) : Mr(r)) || (e || re(s, "get", r), t) ? c : ne(c) ? i && Cn(r) ? c : c.value : z(c) ? e ? ws(c) : On(c) : c;
  };
}
const Hr = /* @__PURE__ */ Os(), jr = /* @__PURE__ */ Os(!0);
function Os(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (ft(i) && ne(i) && !ne(r))
      return !1;
    if (!e && (!sn(r) && !ft(r) && (i = N(i), r = N(r)), !I(n) && ne(i) && !ne(r)))
      return i.value = r, !0;
    const c = I(n) && Cn(s) ? Number(s) < n.length : L(n, s), u = Reflect.set(n, s, r, o);
    return n === N(o) && (c ? Rt(r, i) && Ie(n, "set", s, r) : Ie(n, "add", s, r)), u;
  };
}
function Vr(e, t) {
  const n = L(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ie(e, "delete", t, void 0), s;
}
function Br(e, t) {
  const n = Reflect.has(e, t);
  return (!En(t) || !Ss.has(t)) && re(e, "has", t), n;
}
function Kr(e) {
  return re(e, "iterate", I(e) ? "length" : $e), Reflect.ownKeys(e);
}
const xs = {
  get: Lr,
  set: Hr,
  deleteProperty: Vr,
  has: Br,
  ownKeys: Kr
}, Gr = {
  get: kr,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Jr = /* @__PURE__ */ q({}, xs, {
  get: Nr,
  set: jr
}), Tn = (e) => e, Nt = (e) => Reflect.getPrototypeOf(e);
function bt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = N(e), o = N(t);
  n || (t !== o && re(r, "get", t), re(r, "get", o));
  const { has: i } = Nt(r), c = s ? Tn : n ? In : Rn;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function Et(e, t = !1) {
  const n = this.__v_raw, s = N(n), r = N(e);
  return t || (e !== r && re(s, "has", e), re(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Ct(e, t = !1) {
  return e = e.__v_raw, !t && re(N(e), "iterate", $e), Reflect.get(e, "size", e);
}
function zn(e) {
  e = N(e);
  const t = N(this);
  return Nt(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function Xn(e, t) {
  t = N(t);
  const n = N(this), { has: s, get: r } = Nt(n);
  let o = s.call(n, e);
  o || (e = N(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? Rt(t, i) && Ie(n, "set", e, t) : Ie(n, "add", e, t), this;
}
function qn(e) {
  const t = N(this), { has: n, get: s } = Nt(t);
  let r = n.call(t, e);
  r || (e = N(e), r = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return r && Ie(t, "delete", e, void 0), o;
}
function Yn() {
  const e = N(this), t = e.size !== 0, n = e.clear();
  return t && Ie(e, "clear", void 0, void 0), n;
}
function yt(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = N(i), u = t ? Tn : e ? In : Rn;
    return !e && re(c, "iterate", $e), i.forEach((p, _) => s.call(r, u(p), u(_), o));
  };
}
function At(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = N(r), i = ct(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = r[e](...s), _ = n ? Tn : t ? In : Rn;
    return !t && re(o, "iterate", u ? tn : $e), {
      // iterator protocol
      next() {
        const { value: C, done: A } = p.next();
        return A ? { value: C, done: A } : {
          value: c ? [_(C[0]), _(C[1])] : _(C),
          done: A
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function De(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Wr() {
  const e = {
    get(o) {
      return bt(this, o);
    },
    get size() {
      return Ct(this);
    },
    has: Et,
    add: zn,
    set: Xn,
    delete: qn,
    clear: Yn,
    forEach: yt(!1, !1)
  }, t = {
    get(o) {
      return bt(this, o, !1, !0);
    },
    get size() {
      return Ct(this);
    },
    has: Et,
    add: zn,
    set: Xn,
    delete: qn,
    clear: Yn,
    forEach: yt(!1, !0)
  }, n = {
    get(o) {
      return bt(this, o, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(o) {
      return Et.call(this, o, !0);
    },
    add: De(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: De(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: De(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: De(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: yt(!0, !1)
  }, s = {
    get(o) {
      return bt(this, o, !0, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(o) {
      return Et.call(this, o, !0);
    },
    add: De(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: De(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: De(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: De(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: yt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = At(o, !1, !1), n[o] = At(o, !0, !1), t[o] = At(o, !1, !0), s[o] = At(o, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [$r, zr, Xr, qr] = /* @__PURE__ */ Wr();
function Sn(e, t) {
  const n = t ? e ? qr : Xr : e ? zr : $r;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(L(n, r) && r in s ? n : s, r, o);
}
const Yr = {
  get: /* @__PURE__ */ Sn(!1, !1)
}, Zr = {
  get: /* @__PURE__ */ Sn(!1, !0)
}, Qr = {
  get: /* @__PURE__ */ Sn(!0, !1)
}, Rs = /* @__PURE__ */ new WeakMap(), Is = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap(), eo = /* @__PURE__ */ new WeakMap();
function to(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function no(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : to(Ar(e));
}
function On(e) {
  return ft(e) ? e : xn(e, !1, xs, Yr, Rs);
}
function so(e) {
  return xn(e, !1, Jr, Zr, Is);
}
function ws(e) {
  return xn(e, !0, Gr, Qr, Ps);
}
function xn(e, t, n, s, r) {
  if (!z(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = no(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function et(e) {
  return ft(e) ? et(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
function sn(e) {
  return !!(e && e.__v_isShallow);
}
function Ds(e) {
  return et(e) || ft(e);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function Ms(e) {
  return It(e, "__v_skip", !0), e;
}
const Rn = (e) => z(e) ? On(e) : e, In = (e) => z(e) ? ws(e) : e;
function ro(e) {
  Le && de && (e = N(e), Ts(e.dep || (e.dep = yn())));
}
function oo(e, t) {
  e = N(e);
  const n = e.dep;
  n && nn(n);
}
function ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function io(e) {
  return ne(e) ? e.value : e;
}
const lo = {
  get: (e, t, n) => io(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ne(r) && !ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ls(e) {
  return et(e) ? e : new Proxy(e, lo);
}
var Ns;
class co {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ns] = !1, this._dirty = !0, this.effect = new An(t, () => {
      this._dirty || (this._dirty = !0, oo(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = N(this);
    return ro(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Ns = "__v_isReadonly";
function ao(e, t, n = !1) {
  let s, r;
  const o = w(e);
  return o ? (s = e, r = me) : (s = e.get, r = e.set), new co(s, r, o || !r, n);
}
function Ne(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    kt(o, t, n);
  }
  return r;
}
function ae(e, t, n, s) {
  if (w(e)) {
    const o = Ne(e, t, n, s);
    return o && Es(o) && o.catch((i) => {
      kt(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(ae(e[o], t, n, s));
  return r;
}
function kt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = n;
    for (; o; ) {
      const p = o.ec;
      if (p) {
        for (let _ = 0; _ < p.length; _++)
          if (p[_](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ne(u, null, 10, [e, i, c]);
      return;
    }
  }
  uo(e, n, r, s);
}
function uo(e, t, n, s = !0) {
  console.error(e);
}
let pt = !1, rn = !1;
const Q = [];
let ve = 0;
const tt = [];
let Oe = null, Ge = 0;
const ks = /* @__PURE__ */ Promise.resolve();
let Pn = null;
function Us(e) {
  const t = Pn || ks;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function fo(e) {
  let t = ve + 1, n = Q.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    dt(Q[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function wn(e) {
  (!Q.length || !Q.includes(e, pt && e.allowRecurse ? ve + 1 : ve)) && (e.id == null ? Q.push(e) : Q.splice(fo(e.id), 0, e), Fs());
}
function Fs() {
  !pt && !rn && (rn = !0, Pn = ks.then(js));
}
function po(e) {
  const t = Q.indexOf(e);
  t > ve && Q.splice(t, 1);
}
function ho(e) {
  I(e) ? tt.push(...e) : (!Oe || !Oe.includes(e, e.allowRecurse ? Ge + 1 : Ge)) && tt.push(e), Fs();
}
function Zn(e, t = pt ? ve + 1 : 0) {
  for (; t < Q.length; t++) {
    const n = Q[t];
    n && n.pre && (Q.splice(t, 1), t--, n());
  }
}
function Hs(e) {
  if (tt.length) {
    const t = [...new Set(tt)];
    if (tt.length = 0, Oe) {
      Oe.push(...t);
      return;
    }
    for (Oe = t, Oe.sort((n, s) => dt(n) - dt(s)), Ge = 0; Ge < Oe.length; Ge++)
      Oe[Ge]();
    Oe = null, Ge = 0;
  }
}
const dt = (e) => e.id == null ? 1 / 0 : e.id, _o = (e, t) => {
  const n = dt(e) - dt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function js(e) {
  rn = !1, pt = !0, Q.sort(_o);
  const t = me;
  try {
    for (ve = 0; ve < Q.length; ve++) {
      const n = Q[ve];
      n && n.active !== !1 && Ne(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    ve = 0, Q.length = 0, Hs(), pt = !1, Pn = null, (Q.length || tt.length) && js();
  }
}
function mo(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || V;
  let r = n;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in s) {
    const _ = `${i === "modelValue" ? "model" : i}Modifiers`, { number: C, trim: A } = s[_] || V;
    A && (r = n.map((R) => Y(R) ? R.trim() : R)), C && (r = n.map(Or));
  }
  let c, u = s[c = Gt(t)] || // also try camelCase event handler (#2249)
  s[c = Gt(xe(t))];
  !u && o && (u = s[c = Gt(pe(t))]), u && ae(u, e, 6, r);
  const p = s[c + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ae(p, e, 6, r);
  }
}
function Vs(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, c = !1;
  if (!w(e)) {
    const u = (p) => {
      const _ = Vs(p, t, !0);
      _ && (c = !0, q(i, _));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !o && !c ? (z(e) && s.set(e, null), null) : (I(o) ? o.forEach((u) => i[u] = null) : q(i, o), z(e) && s.set(e, i), i);
}
function Ut(e, t) {
  return !e || !Dt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, pe(t)) || L(e, t));
}
let he = null, Bs = null;
function Pt(e) {
  const t = he;
  return he = e, Bs = e && e.type.__scopeId || null, t;
}
function go(e, t = he, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ls(-1);
    const o = Pt(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Pt(o), s._d && ls(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Wt(e) {
  const { type: t, vnode: n, proxy: s, withProxy: r, props: o, propsOptions: [i], slots: c, attrs: u, emit: p, render: _, renderCache: C, data: A, setupState: R, ctx: k, inheritAttrs: O } = e;
  let J, F;
  const le = Pt(e);
  try {
    if (n.shapeFlag & 4) {
      const B = r || s;
      J = Ae(_.call(B, B, C, o, R, A, k)), F = u;
    } else {
      const B = t;
      J = Ae(B.length > 1 ? B(o, { attrs: u, slots: c, emit: p }) : B(
        o,
        null
        /* we know it doesn't need it */
      )), F = t.props ? u : bo(u);
    }
  } catch (B) {
    ut.length = 0, kt(
      B,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), J = ke(Re);
  }
  let P = J;
  if (F && O !== !1) {
    const B = Object.keys(F), { shapeFlag: Z } = P;
    B.length && Z & 7 && (i && B.some(gn) && (F = Eo(F, i)), P = Fe(P, F));
  }
  return n.dirs && (P = Fe(P), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && (P.transition = n.transition), J = P, Pt(le), J;
}
const bo = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Dt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Eo = (e, t) => {
  const n = {};
  for (const s in e)
    (!gn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Co(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: c, patchFlag: u } = t, p = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? Qn(s, i, p) : !!i;
    if (u & 8) {
      const _ = t.dynamicProps;
      for (let C = 0; C < _.length; C++) {
        const A = _[C];
        if (i[A] !== s[A] && !Ut(p, A))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : s === i ? !1 : s ? i ? Qn(s, i, p) : !0 : !!i;
  return !1;
}
function Qn(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Ut(n, o))
      return !0;
  }
  return !1;
}
function yo({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ao = (e) => e.__isSuspense;
function vo(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : ho(e);
}
function To(e, t) {
  if ($) {
    let n = $.provides;
    const s = $.parent && $.parent.provides;
    s === n && (n = $.provides = Object.create(s)), n[e] = t;
  }
}
function St(e, t, n = !1) {
  const s = $ || he;
  if (s) {
    const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(s.proxy) : t;
  }
}
const vt = {};
function $t(e, t, n) {
  return Ks(e, t, n);
}
function Ks(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = V) {
  const c = Pr() === ($ == null ? void 0 : $.scope) ? $ : null;
  let u, p = !1, _ = !1;
  if (ne(e) ? (u = () => e.value, p = sn(e)) : et(e) ? (u = () => e, s = !0) : I(e) ? (_ = !0, p = e.some((P) => et(P) || sn(P)), u = () => e.map((P) => {
    if (ne(P))
      return P.value;
    if (et(P))
      return Ze(P);
    if (w(P))
      return Ne(
        P,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : w(e) ? t ? u = () => Ne(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(c && c.isUnmounted))
      return C && C(), ae(e, c, 3, [A]);
  } : u = me, t && s) {
    const P = u;
    u = () => Ze(P());
  }
  let C, A = (P) => {
    C = F.onStop = () => {
      Ne(
        P,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, R;
  if (_t)
    if (A = me, t ? n && ae(t, c, 3, [
      u(),
      _ ? [] : void 0,
      A
    ]) : u(), r === "sync") {
      const P = Ti();
      R = P.__watcherHandles || (P.__watcherHandles = []);
    } else
      return me;
  let k = _ ? new Array(e.length).fill(vt) : vt;
  const O = () => {
    if (F.active)
      if (t) {
        const P = F.run();
        (s || p || (_ ? P.some((B, Z) => Rt(B, k[Z])) : Rt(P, k))) && (C && C(), ae(t, c, 3, [
          P,
          // pass undefined as the old value when it's changed for the first time
          k === vt ? void 0 : _ && k[0] === vt ? [] : k,
          A
        ]), k = P);
      } else
        F.run();
  };
  O.allowRecurse = !!t;
  let J;
  r === "sync" ? J = O : r === "post" ? J = () => se(O, c && c.suspense) : (O.pre = !0, c && (O.id = c.uid), J = () => wn(O));
  const F = new An(u, J);
  t ? n ? O() : k = F.run() : r === "post" ? se(F.run.bind(F), c && c.suspense) : F.run();
  const le = () => {
    F.stop(), c && c.scope && bn(c.scope.effects, F);
  };
  return R && R.push(le), le;
}
function So(e, t, n) {
  const s = this.proxy, r = Y(e) ? e.includes(".") ? Gs(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = $;
  nt(this);
  const c = Ks(r, o.bind(s), n);
  return i ? nt(i) : ze(), c;
}
function Gs(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Ze(e, t) {
  if (!z(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ne(e))
    Ze(e.value, t);
  else if (I(e))
    for (let n = 0; n < e.length; n++)
      Ze(e[n], t);
  else if (Cr(e) || ct(e))
    e.forEach((n) => {
      Ze(n, t);
    });
  else if (vr(e))
    for (const n in e)
      Ze(e[n], t);
  return e;
}
function Oo() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return zs(() => {
    e.isMounted = !0;
  }), Xs(() => {
    e.isUnmounting = !0;
  }), e;
}
const ce = [Function, Array], xo = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: ce,
    onEnter: ce,
    onAfterEnter: ce,
    onEnterCancelled: ce,
    // leave
    onBeforeLeave: ce,
    onLeave: ce,
    onAfterLeave: ce,
    onLeaveCancelled: ce,
    // appear
    onBeforeAppear: ce,
    onAppear: ce,
    onAfterAppear: ce,
    onAppearCancelled: ce
  },
  setup(e, { slots: t }) {
    const n = mi(), s = Oo();
    let r;
    return () => {
      const o = t.default && Ws(t.default(), !0);
      if (!o || !o.length)
        return;
      let i = o[0];
      if (o.length > 1) {
        for (const O of o)
          if (O.type !== Re) {
            i = O;
            break;
          }
      }
      const c = N(e), { mode: u } = c;
      if (s.isLeaving)
        return zt(i);
      const p = es(i);
      if (!p)
        return zt(i);
      const _ = on(p, c, s, n);
      ln(p, _);
      const C = n.subTree, A = C && es(C);
      let R = !1;
      const { getTransitionKey: k } = p.type;
      if (k) {
        const O = k();
        r === void 0 ? r = O : O !== r && (r = O, R = !0);
      }
      if (A && A.type !== Re && (!Je(p, A) || R)) {
        const O = on(A, c, s, n);
        if (ln(A, O), u === "out-in")
          return s.isLeaving = !0, O.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, zt(i);
        u === "in-out" && p.type !== Re && (O.delayLeave = (J, F, le) => {
          const P = Js(s, A);
          P[String(A.key)] = A, J._leaveCb = () => {
            F(), J._leaveCb = void 0, delete _.delayedLeave;
          }, _.delayedLeave = le;
        });
      }
      return i;
    };
  }
}, Ro = xo;
function Js(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function on(e, t, n, s) {
  const { appear: r, mode: o, persisted: i = !1, onBeforeEnter: c, onEnter: u, onAfterEnter: p, onEnterCancelled: _, onBeforeLeave: C, onLeave: A, onAfterLeave: R, onLeaveCancelled: k, onBeforeAppear: O, onAppear: J, onAfterAppear: F, onAppearCancelled: le } = t, P = String(e.key), B = Js(n, e), Z = (D, X) => {
    D && ae(D, s, 9, X);
  }, Xe = (D, X) => {
    const K = X[1];
    Z(D, X), I(D) ? D.every((oe) => oe.length <= 1) && K() : D.length <= 1 && K();
  }, we = {
    mode: o,
    persisted: i,
    beforeEnter(D) {
      let X = c;
      if (!n.isMounted)
        if (r)
          X = O || c;
        else
          return;
      D._leaveCb && D._leaveCb(
        !0
        /* cancelled */
      );
      const K = B[P];
      K && Je(e, K) && K.el._leaveCb && K.el._leaveCb(), Z(X, [D]);
    },
    enter(D) {
      let X = u, K = p, oe = _;
      if (!n.isMounted)
        if (r)
          X = J || u, K = F || p, oe = le || _;
        else
          return;
      let ge = !1;
      const Te = D._enterCb = (ot) => {
        ge || (ge = !0, ot ? Z(oe, [D]) : Z(K, [D]), we.delayedLeave && we.delayedLeave(), D._enterCb = void 0);
      };
      X ? Xe(X, [D, Te]) : Te();
    },
    leave(D, X) {
      const K = String(e.key);
      if (D._enterCb && D._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      Z(C, [D]);
      let oe = !1;
      const ge = D._leaveCb = (Te) => {
        oe || (oe = !0, X(), Te ? Z(k, [D]) : Z(R, [D]), D._leaveCb = void 0, B[K] === e && delete B[K]);
      };
      B[K] = e, A ? Xe(A, [D, ge]) : ge();
    },
    clone(D) {
      return on(D, t, n, s);
    }
  };
  return we;
}
function zt(e) {
  if (Ft(e))
    return e = Fe(e), e.children = null, e;
}
function es(e) {
  return Ft(e) ? e.children ? e.children[0] : void 0 : e;
}
function ln(e, t) {
  e.shapeFlag & 6 && e.component ? ln(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ws(e, t = !1, n) {
  let s = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === ye ? (i.patchFlag & 128 && r++, s = s.concat(Ws(i.children, t, c))) : (t || i.type !== Re) && s.push(c != null ? Fe(i, { key: c }) : i);
  }
  if (r > 1)
    for (let o = 0; o < s.length; o++)
      s[o].patchFlag = -2;
  return s;
}
function Io(e) {
  return w(e) ? { setup: e, name: e.name } : e;
}
const Ot = (e) => !!e.type.__asyncLoader, Ft = (e) => e.type.__isKeepAlive;
function Po(e, t) {
  $s(e, "a", t);
}
function wo(e, t) {
  $s(e, "da", t);
}
function $s(e, t, n = $) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ht(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Ft(r.parent.vnode) && Do(s, t, n, r), r = r.parent;
  }
}
function Do(e, t, n, s) {
  const r = Ht(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  qs(() => {
    bn(s[t], r);
  }, n);
}
function Ht(e, t, n = $, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      st(), nt(n);
      const c = ae(t, n, e, i);
      return ze(), rt(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Pe = (e) => (t, n = $) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!_t || e === "sp") && Ht(e, (...s) => t(...s), n)
), Mo = Pe(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), zs = Pe(
  "m"
  /* LifecycleHooks.MOUNTED */
), Lo = Pe(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), No = Pe(
  "u"
  /* LifecycleHooks.UPDATED */
), Xs = Pe(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), qs = Pe(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), ko = Pe(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Uo = Pe(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Fo = Pe(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Ho(e, t = $) {
  Ht("ec", e, t);
}
function Ve(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const c = r[i];
    o && (c.oldValue = o[i].value);
    let u = c.dir[s];
    u && (st(), ae(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), rt());
  }
}
const jo = Symbol(), cn = (e) => e ? lr(e) ? Nn(e) || e.proxy : cn(e.parent) : null, at = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ q(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => cn(e.parent),
    $root: (e) => cn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Dn(e),
    $forceUpdate: (e) => e.f || (e.f = () => wn(e.update)),
    $nextTick: (e) => e.n || (e.n = Us.bind(e.proxy)),
    $watch: (e) => So.bind(e)
  })
), Xt = (e, t) => e !== V && !e.__isScriptSetup && L(e, t), Vo = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    let p;
    if (t[0] !== "$") {
      const R = i[t];
      if (R !== void 0)
        switch (R) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Xt(s, t))
          return i[t] = 1, s[t];
        if (r !== V && L(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && L(p, t)
        )
          return i[t] = 3, o[t];
        if (n !== V && L(n, t))
          return i[t] = 4, n[t];
        an && (i[t] = 0);
      }
    }
    const _ = at[t];
    let C, A;
    if (_)
      return t === "$attrs" && re(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (C = c.__cssModules) && (C = C[t])
    )
      return C;
    if (n !== V && L(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      A = u.config.globalProperties, L(A, t)
    )
      return A[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Xt(r, t) ? (r[t] = n, !0) : s !== V && L(s, t) ? (s[t] = n, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== V && L(e, i) || Xt(t, i) || (c = o[0]) && L(c, i) || L(s, i) || L(at, i) || L(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let an = !0;
function Bo(e) {
  const t = Dn(e), n = e.proxy, s = e.ctx;
  an = !1, t.beforeCreate && ts(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: c,
    provide: u,
    inject: p,
    // lifecycle
    created: _,
    beforeMount: C,
    mounted: A,
    beforeUpdate: R,
    updated: k,
    activated: O,
    deactivated: J,
    beforeDestroy: F,
    beforeUnmount: le,
    destroyed: P,
    unmounted: B,
    render: Z,
    renderTracked: Xe,
    renderTriggered: we,
    errorCaptured: D,
    serverPrefetch: X,
    // public API
    expose: K,
    inheritAttrs: oe,
    // assets
    components: ge,
    directives: Te,
    filters: ot
  } = t;
  if (p && Ko(p, s, null, e.appContext.config.unwrapInjectedRef), i)
    for (const G in i) {
      const H = i[G];
      w(H) && (s[G] = H.bind(n));
    }
  if (r) {
    const G = r.call(n, n);
    z(G) && (e.data = On(G));
  }
  if (an = !0, o)
    for (const G in o) {
      const H = o[G], He = w(H) ? H.bind(n, n) : w(H.get) ? H.get.bind(n, n) : me, mt = !w(H) && w(H.set) ? H.set.bind(n) : me, je = Ai({
        get: He,
        set: mt
      });
      Object.defineProperty(s, G, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (be) => je.value = be
      });
    }
  if (c)
    for (const G in c)
      Ys(c[G], s, n, G);
  if (u) {
    const G = w(u) ? u.call(n) : u;
    Reflect.ownKeys(G).forEach((H) => {
      To(H, G[H]);
    });
  }
  _ && ts(
    _,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ee(G, H) {
    I(H) ? H.forEach((He) => G(He.bind(n))) : H && G(H.bind(n));
  }
  if (ee(Mo, C), ee(zs, A), ee(Lo, R), ee(No, k), ee(Po, O), ee(wo, J), ee(Ho, D), ee(Fo, Xe), ee(Uo, we), ee(Xs, le), ee(qs, B), ee(ko, X), I(K))
    if (K.length) {
      const G = e.exposed || (e.exposed = {});
      K.forEach((H) => {
        Object.defineProperty(G, H, {
          get: () => n[H],
          set: (He) => n[H] = He
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Z && e.render === me && (e.render = Z), oe != null && (e.inheritAttrs = oe), ge && (e.components = ge), Te && (e.directives = Te);
}
function Ko(e, t, n = me, s = !1) {
  I(e) && (e = un(e));
  for (const r in e) {
    const o = e[r];
    let i;
    z(o) ? "default" in o ? i = St(
      o.from || r,
      o.default,
      !0
      /* treat default function as factory */
    ) : i = St(o.from || r) : i = St(o), ne(i) && s ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (c) => i.value = c
    }) : t[r] = i;
  }
}
function ts(e, t, n) {
  ae(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ys(e, t, n, s) {
  const r = s.includes(".") ? Gs(n, s) : () => n[s];
  if (Y(e)) {
    const o = t[e];
    w(o) && $t(r, o);
  } else if (w(e))
    $t(r, e.bind(n));
  else if (z(e))
    if (I(e))
      e.forEach((o) => Ys(o, t, n, s));
    else {
      const o = w(e.handler) ? e.handler.bind(n) : t[e.handler];
      w(o) && $t(r, o, e);
    }
}
function Dn(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((p) => wt(u, p, i, !0)), wt(u, t, i)), z(t) && o.set(t, u), u;
}
function wt(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && wt(e, o, n, !0), r && r.forEach((i) => wt(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const c = Go[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Go = {
  data: ns,
  props: Ke,
  emits: Ke,
  // objects
  methods: Ke,
  computed: Ke,
  // lifecycle
  beforeCreate: te,
  created: te,
  beforeMount: te,
  mounted: te,
  beforeUpdate: te,
  updated: te,
  beforeDestroy: te,
  beforeUnmount: te,
  destroyed: te,
  unmounted: te,
  activated: te,
  deactivated: te,
  errorCaptured: te,
  serverPrefetch: te,
  // assets
  components: Ke,
  directives: Ke,
  // watch
  watch: Wo,
  // provide / inject
  provide: ns,
  inject: Jo
};
function ns(e, t) {
  return t ? e ? function() {
    return q(w(e) ? e.call(this, this) : e, w(t) ? t.call(this, this) : t);
  } : t : e;
}
function Jo(e, t) {
  return Ke(un(e), un(t));
}
function un(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ke(e, t) {
  return e ? q(q(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Wo(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = q(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = te(e[s], t[s]);
  return n;
}
function $o(e, t, n, s = !1) {
  const r = {}, o = {};
  It(o, Vt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Zs(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : so(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function zo(e, t, n, s) {
  const { props: r, attrs: o, vnode: { patchFlag: i } } = e, c = N(r), [u] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const _ = e.vnode.dynamicProps;
      for (let C = 0; C < _.length; C++) {
        let A = _[C];
        if (Ut(e.emitsOptions, A))
          continue;
        const R = t[A];
        if (u)
          if (L(o, A))
            R !== o[A] && (o[A] = R, p = !0);
          else {
            const k = xe(A);
            r[k] = fn(
              u,
              c,
              k,
              R,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          R !== o[A] && (o[A] = R, p = !0);
      }
    }
  } else {
    Zs(e, t, r, o) && (p = !0);
    let _;
    for (const C in c)
      (!t || // for camelCase
      !L(t, C) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = pe(C)) === C || !L(t, _))) && (u ? n && // for camelCase
      (n[C] !== void 0 || // for kebab-case
      n[_] !== void 0) && (r[C] = fn(
        u,
        c,
        C,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[C]);
    if (o !== c)
      for (const C in o)
        (!t || !L(t, C)) && (delete o[C], p = !0);
  }
  p && Ie(e, "set", "$attrs");
}
function Zs(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const p = t[u];
      let _;
      r && L(r, _ = xe(u)) ? !o || !o.includes(_) ? n[_] = p : (c || (c = {}))[_] = p : Ut(e.emitsOptions, u) || (!(u in s) || p !== s[u]) && (s[u] = p, i = !0);
    }
  if (o) {
    const u = N(n), p = c || V;
    for (let _ = 0; _ < o.length; _++) {
      const C = o[_];
      n[C] = fn(r, u, C, p[C], e, !L(p, C));
    }
  }
  return i;
}
function fn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const c = L(i, "default");
    if (c && s === void 0) {
      const u = i.default;
      if (i.type !== Function && w(u)) {
        const { propsDefaults: p } = r;
        n in p ? s = p[n] : (nt(r), s = p[n] = u.call(null, t), ze());
      } else
        s = u;
    }
    i[
      0
      /* BooleanFlags.shouldCast */
    ] && (o && !c ? s = !1 : i[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === pe(n)) && (s = !0));
  }
  return s;
}
function Qs(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, c = [];
  let u = !1;
  if (!w(e)) {
    const _ = (C) => {
      u = !0;
      const [A, R] = Qs(C, t, !0);
      q(i, A), R && c.push(...R);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!o && !u)
    return z(e) && s.set(e, Qe), Qe;
  if (I(o))
    for (let _ = 0; _ < o.length; _++) {
      const C = xe(o[_]);
      ss(C) && (i[C] = V);
    }
  else if (o)
    for (const _ in o) {
      const C = xe(_);
      if (ss(C)) {
        const A = o[_], R = i[C] = I(A) || w(A) ? { type: A } : Object.assign({}, A);
        if (R) {
          const k = is(Boolean, R.type), O = is(String, R.type);
          R[
            0
            /* BooleanFlags.shouldCast */
          ] = k > -1, R[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = O < 0 || k < O, (k > -1 || L(R, "default")) && c.push(C);
        }
      }
    }
  const p = [i, c];
  return z(e) && s.set(e, p), p;
}
function ss(e) {
  return e[0] !== "$";
}
function rs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function os(e, t) {
  return rs(e) === rs(t);
}
function is(e, t) {
  return I(t) ? t.findIndex((n) => os(n, e)) : w(t) && os(t, e) ? 0 : -1;
}
const er = (e) => e[0] === "_" || e === "$stable", Mn = (e) => I(e) ? e.map(Ae) : [Ae(e)], Xo = (e, t, n) => {
  if (t._n)
    return t;
  const s = go((...r) => Mn(t(...r)), n);
  return s._c = !1, s;
}, tr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (er(r))
      continue;
    const o = e[r];
    if (w(o))
      t[r] = Xo(r, o, s);
    else if (o != null) {
      const i = Mn(o);
      t[r] = () => i;
    }
  }
}, nr = (e, t) => {
  const n = Mn(t);
  e.slots.default = () => n;
}, qo = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = N(t), It(t, "_", n)) : tr(t, e.slots = {});
  } else
    e.slots = {}, t && nr(e, t);
  It(e.slots, Vt, 1);
}, Yo = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = V;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? o = !1 : (q(r, t), !n && c === 1 && delete r._) : (o = !t.$stable, tr(t, r)), i = t;
  } else
    t && (nr(e, t), i = { default: 1 });
  if (o)
    for (const c in r)
      !er(c) && !(c in i) && delete r[c];
};
function sr() {
  return {
    app: null,
    config: {
      isNativeTag: gr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Zo = 0;
function Qo(e, t) {
  return function(s, r = null) {
    w(s) || (s = Object.assign({}, s)), r != null && !z(r) && (r = null);
    const o = sr(), i = /* @__PURE__ */ new Set();
    let c = !1;
    const u = o.app = {
      _uid: Zo++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Si,
      get config() {
        return o.config;
      },
      set config(p) {
      },
      use(p, ..._) {
        return i.has(p) || (p && w(p.install) ? (i.add(p), p.install(u, ..._)) : w(p) && (i.add(p), p(u, ..._))), u;
      },
      mixin(p) {
        return o.mixins.includes(p) || o.mixins.push(p), u;
      },
      component(p, _) {
        return _ ? (o.components[p] = _, u) : o.components[p];
      },
      directive(p, _) {
        return _ ? (o.directives[p] = _, u) : o.directives[p];
      },
      mount(p, _, C) {
        if (!c) {
          const A = ke(s, r);
          return A.appContext = o, _ && t ? t(A, p) : e(A, p, C), c = !0, u._container = p, p.__vue_app__ = u, Nn(A.component) || A.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(p, _) {
        return o.provides[p] = _, u;
      }
    };
    return u;
  };
}
function pn(e, t, n, s, r = !1) {
  if (I(e)) {
    e.forEach((A, R) => pn(A, t && (I(t) ? t[R] : t), n, s, r));
    return;
  }
  if (Ot(s) && !r)
    return;
  const o = s.shapeFlag & 4 ? Nn(s.component) || s.component.proxy : s.el, i = r ? null : o, { i: c, r: u } = e, p = t && t.r, _ = c.refs === V ? c.refs = {} : c.refs, C = c.setupState;
  if (p != null && p !== u && (Y(p) ? (_[p] = null, L(C, p) && (C[p] = null)) : ne(p) && (p.value = null)), w(u))
    Ne(u, c, 12, [i, _]);
  else {
    const A = Y(u), R = ne(u);
    if (A || R) {
      const k = () => {
        if (e.f) {
          const O = A ? L(C, u) ? C[u] : _[u] : u.value;
          r ? I(O) && bn(O, o) : I(O) ? O.includes(o) || O.push(o) : A ? (_[u] = [o], L(C, u) && (C[u] = _[u])) : (u.value = [o], e.k && (_[e.k] = u.value));
        } else
          A ? (_[u] = i, L(C, u) && (C[u] = i)) : R && (u.value = i, e.k && (_[e.k] = i));
      };
      i ? (k.id = -1, se(k, n)) : k();
    }
  }
}
const se = vo;
function ei(e) {
  return ti(e);
}
function ti(e, t) {
  const n = xr();
  n.__VUE__ = !0;
  const { insert: s, remove: r, patchProp: o, createElement: i, createText: c, createComment: u, setText: p, setElementText: _, parentNode: C, nextSibling: A, setScopeId: R = me, insertStaticContent: k } = e, O = (l, a, f, h = null, d = null, b = null, y = !1, g = null, E = !!a.dynamicChildren) => {
    if (l === a)
      return;
    l && !Je(l, a) && (h = gt(l), be(l, d, b, !0), l = null), a.patchFlag === -2 && (E = !1, a.dynamicChildren = null);
    const { type: m, ref: T, shapeFlag: v } = a;
    switch (m) {
      case jt:
        J(l, a, f, h);
        break;
      case Re:
        F(l, a, f, h);
        break;
      case qt:
        l == null && le(a, f, h, y);
        break;
      case ye:
        ge(l, a, f, h, d, b, y, g, E);
        break;
      default:
        v & 1 ? Z(l, a, f, h, d, b, y, g, E) : v & 6 ? Te(l, a, f, h, d, b, y, g, E) : (v & 64 || v & 128) && m.process(l, a, f, h, d, b, y, g, E, qe);
    }
    T != null && d && pn(T, l && l.ref, b, a || l, !a);
  }, J = (l, a, f, h) => {
    if (l == null)
      s(a.el = c(a.children), f, h);
    else {
      const d = a.el = l.el;
      a.children !== l.children && p(d, a.children);
    }
  }, F = (l, a, f, h) => {
    l == null ? s(a.el = u(a.children || ""), f, h) : a.el = l.el;
  }, le = (l, a, f, h) => {
    [l.el, l.anchor] = k(l.children, a, f, h, l.el, l.anchor);
  }, P = ({ el: l, anchor: a }, f, h) => {
    let d;
    for (; l && l !== a; )
      d = A(l), s(l, f, h), l = d;
    s(a, f, h);
  }, B = ({ el: l, anchor: a }) => {
    let f;
    for (; l && l !== a; )
      f = A(l), r(l), l = f;
    r(a);
  }, Z = (l, a, f, h, d, b, y, g, E) => {
    y = y || a.type === "svg", l == null ? Xe(a, f, h, d, b, y, g, E) : X(l, a, d, b, y, g, E);
  }, Xe = (l, a, f, h, d, b, y, g) => {
    let E, m;
    const { type: T, props: v, shapeFlag: S, transition: x, dirs: M } = l;
    if (E = l.el = i(l.type, b, v && v.is, v), S & 8 ? _(E, l.children) : S & 16 && D(l.children, E, null, h, d, b && T !== "foreignObject", y, g), M && Ve(l, null, h, "created"), we(E, l, l.scopeId, y, h), v) {
      for (const U in v)
        U !== "value" && !Tt(U) && o(E, U, null, v[U], b, l.children, h, d, Se);
      "value" in v && o(E, "value", null, v.value), (m = v.onVnodeBeforeMount) && Ce(m, h, l);
    }
    M && Ve(l, null, h, "beforeMount");
    const j = (!d || d && !d.pendingBranch) && x && !x.persisted;
    j && x.beforeEnter(E), s(E, a, f), ((m = v && v.onVnodeMounted) || j || M) && se(() => {
      m && Ce(m, h, l), j && x.enter(E), M && Ve(l, null, h, "mounted");
    }, d);
  }, we = (l, a, f, h, d) => {
    if (f && R(l, f), h)
      for (let b = 0; b < h.length; b++)
        R(l, h[b]);
    if (d) {
      let b = d.subTree;
      if (a === b) {
        const y = d.vnode;
        we(l, y, y.scopeId, y.slotScopeIds, d.parent);
      }
    }
  }, D = (l, a, f, h, d, b, y, g, E = 0) => {
    for (let m = E; m < l.length; m++) {
      const T = l[m] = g ? Me(l[m]) : Ae(l[m]);
      O(null, T, a, f, h, d, b, y, g);
    }
  }, X = (l, a, f, h, d, b, y) => {
    const g = a.el = l.el;
    let { patchFlag: E, dynamicChildren: m, dirs: T } = a;
    E |= l.patchFlag & 16;
    const v = l.props || V, S = a.props || V;
    let x;
    f && Be(f, !1), (x = S.onVnodeBeforeUpdate) && Ce(x, f, a, l), T && Ve(a, l, f, "beforeUpdate"), f && Be(f, !0);
    const M = d && a.type !== "foreignObject";
    if (m ? K(l.dynamicChildren, m, g, f, h, M, b) : y || H(l, a, g, null, f, h, M, b, !1), E > 0) {
      if (E & 16)
        oe(g, a, v, S, f, h, d);
      else if (E & 2 && v.class !== S.class && o(g, "class", null, S.class, d), E & 4 && o(g, "style", v.style, S.style, d), E & 8) {
        const j = a.dynamicProps;
        for (let U = 0; U < j.length; U++) {
          const W = j[U], ue = v[W], Ye = S[W];
          (Ye !== ue || W === "value") && o(g, W, ue, Ye, d, l.children, f, h, Se);
        }
      }
      E & 1 && l.children !== a.children && _(g, a.children);
    } else
      !y && m == null && oe(g, a, v, S, f, h, d);
    ((x = S.onVnodeUpdated) || T) && se(() => {
      x && Ce(x, f, a, l), T && Ve(a, l, f, "updated");
    }, h);
  }, K = (l, a, f, h, d, b, y) => {
    for (let g = 0; g < a.length; g++) {
      const E = l[g], m = a[g], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === ye || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Je(E, m) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? C(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      O(E, m, T, null, h, d, b, y, !0);
    }
  }, oe = (l, a, f, h, d, b, y) => {
    if (f !== h) {
      if (f !== V)
        for (const g in f)
          !Tt(g) && !(g in h) && o(l, g, f[g], null, y, a.children, d, b, Se);
      for (const g in h) {
        if (Tt(g))
          continue;
        const E = h[g], m = f[g];
        E !== m && g !== "value" && o(l, g, m, E, y, a.children, d, b, Se);
      }
      "value" in h && o(l, "value", f.value, h.value);
    }
  }, ge = (l, a, f, h, d, b, y, g, E) => {
    const m = a.el = l ? l.el : c(""), T = a.anchor = l ? l.anchor : c("");
    let { patchFlag: v, dynamicChildren: S, slotScopeIds: x } = a;
    x && (g = g ? g.concat(x) : x), l == null ? (s(m, f, h), s(T, f, h), D(a.children, f, T, d, b, y, g, E)) : v > 0 && v & 64 && S && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (K(l.dynamicChildren, S, f, d, b, y, g), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (a.key != null || d && a === d.subTree) && rr(
      l,
      a,
      !0
      /* shallow */
    )) : H(l, a, f, T, d, b, y, g, E);
  }, Te = (l, a, f, h, d, b, y, g, E) => {
    a.slotScopeIds = g, l == null ? a.shapeFlag & 512 ? d.ctx.activate(a, f, h, y, E) : ot(a, f, h, d, b, y, E) : Un(l, a, E);
  }, ot = (l, a, f, h, d, b, y) => {
    const g = l.component = _i(l, h, d);
    if (Ft(l) && (g.ctx.renderer = qe), gi(g), g.asyncDep) {
      if (d && d.registerDep(g, ee), !l.el) {
        const E = g.subTree = ke(Re);
        F(null, E, a, f);
      }
      return;
    }
    ee(g, l, a, f, d, b, y);
  }, Un = (l, a, f) => {
    const h = a.component = l.component;
    if (Co(l, a, f))
      if (h.asyncDep && !h.asyncResolved) {
        G(h, a, f);
        return;
      } else
        h.next = a, po(h.update), h.update();
    else
      a.el = l.el, h.vnode = a;
  }, ee = (l, a, f, h, d, b, y) => {
    const g = () => {
      if (l.isMounted) {
        let { next: T, bu: v, u: S, parent: x, vnode: M } = l, j = T, U;
        Be(l, !1), T ? (T.el = M.el, G(l, T, y)) : T = M, v && Jt(v), (U = T.props && T.props.onVnodeBeforeUpdate) && Ce(U, x, T, M), Be(l, !0);
        const W = Wt(l), ue = l.subTree;
        l.subTree = W, O(
          ue,
          W,
          // parent may have changed if it's in a teleport
          C(ue.el),
          // anchor may have changed if it's in a fragment
          gt(ue),
          l,
          d,
          b
        ), T.el = W.el, j === null && yo(l, W.el), S && se(S, d), (U = T.props && T.props.onVnodeUpdated) && se(() => Ce(U, x, T, M), d);
      } else {
        let T;
        const { el: v, props: S } = a, { bm: x, m: M, parent: j } = l, U = Ot(a);
        if (Be(l, !1), x && Jt(x), !U && (T = S && S.onVnodeBeforeMount) && Ce(T, j, a), Be(l, !0), v && Kt) {
          const W = () => {
            l.subTree = Wt(l), Kt(v, l.subTree, l, d, null);
          };
          U ? a.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && W()
          ) : W();
        } else {
          const W = l.subTree = Wt(l);
          O(null, W, f, h, l, d, b), a.el = W.el;
        }
        if (M && se(M, d), !U && (T = S && S.onVnodeMounted)) {
          const W = a;
          se(() => Ce(T, j, W), d);
        }
        (a.shapeFlag & 256 || j && Ot(j.vnode) && j.vnode.shapeFlag & 256) && l.a && se(l.a, d), l.isMounted = !0, a = f = h = null;
      }
    }, E = l.effect = new An(
      g,
      () => wn(m),
      l.scope
      // track it in component's effect scope
    ), m = l.update = () => E.run();
    m.id = l.uid, Be(l, !0), m();
  }, G = (l, a, f) => {
    a.component = l;
    const h = l.vnode.props;
    l.vnode = a, l.next = null, zo(l, a.props, h, f), Yo(l, a.children, f), st(), Zn(), rt();
  }, H = (l, a, f, h, d, b, y, g, E = !1) => {
    const m = l && l.children, T = l ? l.shapeFlag : 0, v = a.children, { patchFlag: S, shapeFlag: x } = a;
    if (S > 0) {
      if (S & 128) {
        mt(m, v, f, h, d, b, y, g, E);
        return;
      } else if (S & 256) {
        He(m, v, f, h, d, b, y, g, E);
        return;
      }
    }
    x & 8 ? (T & 16 && Se(m, d, b), v !== m && _(f, v)) : T & 16 ? x & 16 ? mt(m, v, f, h, d, b, y, g, E) : Se(m, d, b, !0) : (T & 8 && _(f, ""), x & 16 && D(v, f, h, d, b, y, g, E));
  }, He = (l, a, f, h, d, b, y, g, E) => {
    l = l || Qe, a = a || Qe;
    const m = l.length, T = a.length, v = Math.min(m, T);
    let S;
    for (S = 0; S < v; S++) {
      const x = a[S] = E ? Me(a[S]) : Ae(a[S]);
      O(l[S], x, f, null, d, b, y, g, E);
    }
    m > T ? Se(l, d, b, !0, !1, v) : D(a, f, h, d, b, y, g, E, v);
  }, mt = (l, a, f, h, d, b, y, g, E) => {
    let m = 0;
    const T = a.length;
    let v = l.length - 1, S = T - 1;
    for (; m <= v && m <= S; ) {
      const x = l[m], M = a[m] = E ? Me(a[m]) : Ae(a[m]);
      if (Je(x, M))
        O(x, M, f, null, d, b, y, g, E);
      else
        break;
      m++;
    }
    for (; m <= v && m <= S; ) {
      const x = l[v], M = a[S] = E ? Me(a[S]) : Ae(a[S]);
      if (Je(x, M))
        O(x, M, f, null, d, b, y, g, E);
      else
        break;
      v--, S--;
    }
    if (m > v) {
      if (m <= S) {
        const x = S + 1, M = x < T ? a[x].el : h;
        for (; m <= S; )
          O(null, a[m] = E ? Me(a[m]) : Ae(a[m]), f, M, d, b, y, g, E), m++;
      }
    } else if (m > S)
      for (; m <= v; )
        be(l[m], d, b, !0), m++;
    else {
      const x = m, M = m, j = /* @__PURE__ */ new Map();
      for (m = M; m <= S; m++) {
        const ie = a[m] = E ? Me(a[m]) : Ae(a[m]);
        ie.key != null && j.set(ie.key, m);
      }
      let U, W = 0;
      const ue = S - M + 1;
      let Ye = !1, jn = 0;
      const it = new Array(ue);
      for (m = 0; m < ue; m++)
        it[m] = 0;
      for (m = x; m <= v; m++) {
        const ie = l[m];
        if (W >= ue) {
          be(ie, d, b, !0);
          continue;
        }
        let Ee;
        if (ie.key != null)
          Ee = j.get(ie.key);
        else
          for (U = M; U <= S; U++)
            if (it[U - M] === 0 && Je(ie, a[U])) {
              Ee = U;
              break;
            }
        Ee === void 0 ? be(ie, d, b, !0) : (it[Ee - M] = m + 1, Ee >= jn ? jn = Ee : Ye = !0, O(ie, a[Ee], f, null, d, b, y, g, E), W++);
      }
      const Vn = Ye ? ni(it) : Qe;
      for (U = Vn.length - 1, m = ue - 1; m >= 0; m--) {
        const ie = M + m, Ee = a[ie], Bn = ie + 1 < T ? a[ie + 1].el : h;
        it[m] === 0 ? O(null, Ee, f, Bn, d, b, y, g, E) : Ye && (U < 0 || m !== Vn[U] ? je(
          Ee,
          f,
          Bn,
          2
          /* MoveType.REORDER */
        ) : U--);
      }
    }
  }, je = (l, a, f, h, d = null) => {
    const { el: b, type: y, transition: g, children: E, shapeFlag: m } = l;
    if (m & 6) {
      je(l.component.subTree, a, f, h);
      return;
    }
    if (m & 128) {
      l.suspense.move(a, f, h);
      return;
    }
    if (m & 64) {
      y.move(l, a, f, qe);
      return;
    }
    if (y === ye) {
      s(b, a, f);
      for (let v = 0; v < E.length; v++)
        je(E[v], a, f, h);
      s(l.anchor, a, f);
      return;
    }
    if (y === qt) {
      P(l, a, f);
      return;
    }
    if (h !== 2 && m & 1 && g)
      if (h === 0)
        g.beforeEnter(b), s(b, a, f), se(() => g.enter(b), d);
      else {
        const { leave: v, delayLeave: S, afterLeave: x } = g, M = () => s(b, a, f), j = () => {
          v(b, () => {
            M(), x && x();
          });
        };
        S ? S(b, M, j) : j();
      }
    else
      s(b, a, f);
  }, be = (l, a, f, h = !1, d = !1) => {
    const { type: b, props: y, ref: g, children: E, dynamicChildren: m, shapeFlag: T, patchFlag: v, dirs: S } = l;
    if (g != null && pn(g, null, f, l, !0), T & 256) {
      a.ctx.deactivate(l);
      return;
    }
    const x = T & 1 && S, M = !Ot(l);
    let j;
    if (M && (j = y && y.onVnodeBeforeUnmount) && Ce(j, a, l), T & 6)
      ur(l.component, f, h);
    else {
      if (T & 128) {
        l.suspense.unmount(f, h);
        return;
      }
      x && Ve(l, null, a, "beforeUnmount"), T & 64 ? l.type.remove(l, a, f, d, qe, h) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== ye || v > 0 && v & 64) ? Se(m, a, f, !1, !0) : (b === ye && v & 384 || !d && T & 16) && Se(E, a, f), h && Fn(l);
    }
    (M && (j = y && y.onVnodeUnmounted) || x) && se(() => {
      j && Ce(j, a, l), x && Ve(l, null, a, "unmounted");
    }, f);
  }, Fn = (l) => {
    const { type: a, el: f, anchor: h, transition: d } = l;
    if (a === ye) {
      ar(f, h);
      return;
    }
    if (a === qt) {
      B(l);
      return;
    }
    const b = () => {
      r(f), d && !d.persisted && d.afterLeave && d.afterLeave();
    };
    if (l.shapeFlag & 1 && d && !d.persisted) {
      const { leave: y, delayLeave: g } = d, E = () => y(f, b);
      g ? g(l.el, b, E) : E();
    } else
      b();
  }, ar = (l, a) => {
    let f;
    for (; l !== a; )
      f = A(l), r(l), l = f;
    r(a);
  }, ur = (l, a, f) => {
    const { bum: h, scope: d, update: b, subTree: y, um: g } = l;
    h && Jt(h), d.stop(), b && (b.active = !1, be(y, l, a, f)), g && se(g, a), se(() => {
      l.isUnmounted = !0;
    }, a), a && a.pendingBranch && !a.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === a.pendingId && (a.deps--, a.deps === 0 && a.resolve());
  }, Se = (l, a, f, h = !1, d = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      be(l[y], a, f, h, d);
  }, gt = (l) => l.shapeFlag & 6 ? gt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : A(l.anchor || l.el), Hn = (l, a, f) => {
    l == null ? a._vnode && be(a._vnode, null, null, !0) : O(a._vnode || null, l, a, null, null, null, f), Zn(), Hs(), a._vnode = l;
  }, qe = {
    p: O,
    um: be,
    m: je,
    r: Fn,
    mt: ot,
    mc: D,
    pc: H,
    pbc: K,
    n: gt,
    o: e
  };
  let Bt, Kt;
  return t && ([Bt, Kt] = t(qe)), {
    render: Hn,
    hydrate: Bt,
    createApp: Qo(Hn, Bt)
  };
}
function Be({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function rr(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (I(s) && I(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let c = r[o];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[o] = Me(r[o]), c.el = i.el), n || rr(i, c)), c.type === jt && (c.el = i.el);
    }
}
function ni(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const p = e[s];
    if (p !== 0) {
      if (r = n[n.length - 1], e[r] < p) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        c = o + i >> 1, e[n[c]] < p ? o = c + 1 : i = c;
      p < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
const si = (e) => e.__isTeleport, ye = Symbol(void 0), jt = Symbol(void 0), Re = Symbol(void 0), qt = Symbol(void 0), ut = [];
let _e = null;
function ri(e = !1) {
  ut.push(_e = e ? null : []);
}
function oi() {
  ut.pop(), _e = ut[ut.length - 1] || null;
}
let ht = 1;
function ls(e) {
  ht += e;
}
function ii(e) {
  return e.dynamicChildren = ht > 0 ? _e || Qe : null, oi(), ht > 0 && _e && _e.push(e), e;
}
function li(e, t, n, s, r, o) {
  return ii(ir(
    e,
    t,
    n,
    s,
    r,
    o,
    !0
    /* isBlock */
  ));
}
function ci(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Je(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vt = "__vInternal", or = ({ key: e }) => e ?? null, xt = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? Y(e) || ne(e) || w(e) ? { i: he, r: e, k: t, f: !!n } : e : null;
function ir(e, t = null, n = null, s = 0, r = null, o = e === ye ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && or(t),
    ref: t && xt(t),
    scopeId: Bs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: he
  };
  return c ? (Ln(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= Y(n) ? 8 : 16), ht > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  _e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && _e.push(u), u;
}
const ke = ai;
function ai(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === jo) && (e = Re), ci(e)) {
    const c = Fe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ln(c, n), ht > 0 && !o && _e && (c.shapeFlag & 6 ? _e[_e.indexOf(e)] = c : _e.push(c)), c.patchFlag |= -2, c;
  }
  if (yi(e) && (e = e.__vccOpts), t) {
    t = ui(t);
    let { class: c, style: u } = t;
    c && !Y(c) && (t.class = mn(c)), z(u) && (Ds(u) && !I(u) && (u = q({}, u)), t.style = _n(u));
  }
  const i = Y(e) ? 1 : Ao(e) ? 128 : si(e) ? 64 : z(e) ? 4 : w(e) ? 2 : 0;
  return ir(e, t, n, s, r, i, o, !0);
}
function ui(e) {
  return e ? Ds(e) || Vt in e ? q({}, e) : e : null;
}
function Fe(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? pi(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && or(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? I(r) ? r.concat(xt(t)) : [r, xt(t)] : xt(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ye ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Fe(e.ssContent),
    ssFallback: e.ssFallback && Fe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function fi(e = " ", t = 0) {
  return ke(jt, null, e, t);
}
function Ae(e) {
  return e == null || typeof e == "boolean" ? ke(Re) : I(e) ? ke(
    ye,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Me(e) : ke(jt, null, String(e));
}
function Me(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Fe(e);
}
function Ln(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (I(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ln(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Vt in t) ? t._ctx = he : r === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    w(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [fi(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function pi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = mn([t.class, s.class]));
      else if (r === "style")
        t.style = _n([t.style, s.style]);
      else if (Dt(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(I(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ce(e, t, n, s = null) {
  ae(e, t, 7, [
    n,
    s
  ]);
}
const di = sr();
let hi = 0;
function _i(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || di, o = {
    uid: hi++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Rr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Qs(s, r),
    emitsOptions: Vs(s, r),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: V,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: V,
    data: V,
    props: V,
    attrs: V,
    slots: V,
    refs: V,
    setupState: V,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = mo.bind(null, o), e.ce && e.ce(o), o;
}
let $ = null;
const mi = () => $ || he, nt = (e) => {
  $ = e, e.scope.on();
}, ze = () => {
  $ && $.scope.off(), $ = null;
};
function lr(e) {
  return e.vnode.shapeFlag & 4;
}
let _t = !1;
function gi(e, t = !1) {
  _t = t;
  const { props: n, children: s } = e.vnode, r = lr(e);
  $o(e, n, r, t), qo(e, s);
  const o = r ? bi(e, t) : void 0;
  return _t = !1, o;
}
function bi(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ms(new Proxy(e.ctx, Vo));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? Ci(e) : null;
    nt(e), st();
    const o = Ne(s, e, 0, [e.props, r]);
    if (rt(), ze(), Es(o)) {
      if (o.then(ze, ze), t)
        return o.then((i) => {
          cs(e, i, t);
        }).catch((i) => {
          kt(
            i,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = o;
    } else
      cs(e, o, t);
  } else
    cr(e, t);
}
function cs(e, t, n) {
  w(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) && (e.setupState = Ls(t)), cr(e, n);
}
let as;
function cr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && as && !s.render) {
      const r = s.template || Dn(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: c, compilerOptions: u } = s, p = q(q({
          isCustomElement: o,
          delimiters: c
        }, i), u);
        s.render = as(r, p);
      }
    }
    e.render = s.render || me;
  }
  nt(e), st(), Bo(e), rt(), ze();
}
function Ei(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return re(e, "get", "$attrs"), t[n];
    }
  });
}
function Ci(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Ei(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Nn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ls(Ms(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in at)
          return at[n](e);
      },
      has(t, n) {
        return n in t || n in at;
      }
    }));
}
function yi(e) {
  return w(e) && "__vccOpts" in e;
}
const Ai = (e, t) => ao(e, t, _t), vi = Symbol(""), Ti = () => St(vi), Si = "3.2.47", Oi = "http://www.w3.org/2000/svg", We = typeof document < "u" ? document : null, us = We && /* @__PURE__ */ We.createElement("template"), xi = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? We.createElementNS(Oi, e) : We.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => We.createTextNode(e),
  createComment: (e) => We.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => We.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      us.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = us.content;
      if (s) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Ri(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Ii(e, t, n) {
  const s = e.style, r = Y(n);
  if (n && !r) {
    if (t && !Y(t))
      for (const o in t)
        n[o] == null && dn(s, o, "");
    for (const o in n)
      dn(s, o, n[o]);
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = o);
  }
}
const fs = /\s*!important$/;
function dn(e, t, n) {
  if (I(n))
    n.forEach((s) => dn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Pi(e, t);
    fs.test(n) ? e.setProperty(pe(s), n.replace(fs, ""), "important") : e[s] = n;
  }
}
const ps = ["Webkit", "Moz", "ms"], Yt = {};
function Pi(e, t) {
  const n = Yt[t];
  if (n)
    return n;
  let s = xe(t);
  if (s !== "filter" && s in e)
    return Yt[t] = s;
  s = Cs(s);
  for (let r = 0; r < ps.length; r++) {
    const o = ps[r] + s;
    if (o in e)
      return Yt[t] = o;
  }
  return t;
}
const ds = "http://www.w3.org/1999/xlink";
function wi(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ds, t.slice(6, t.length)) : e.setAttributeNS(ds, t, n);
  else {
    const o = mr(t);
    n == null || o && !bs(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function Di(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const u = n ?? "";
    (e.value !== u || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = bs(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function Mi(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Li(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Ni(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [c, u] = ki(t);
    if (s) {
      const p = o[t] = Hi(s, r);
      Mi(e, c, p, u);
    } else
      i && (Li(e, c, i, u), o[t] = void 0);
  }
}
const hs = /(?:Once|Passive|Capture)$/;
function ki(e) {
  let t;
  if (hs.test(e)) {
    t = {};
    let s;
    for (; s = e.match(hs); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : pe(e.slice(2)), t];
}
let Zt = 0;
const Ui = /* @__PURE__ */ Promise.resolve(), Fi = () => Zt || (Ui.then(() => Zt = 0), Zt = Date.now());
function Hi(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ae(ji(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = Fi(), n;
}
function ji(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const _s = /^on[a-z]/, Vi = (e, t, n, s, r = !1, o, i, c, u) => {
  t === "class" ? Ri(e, s, r) : t === "style" ? Ii(e, n, s) : Dt(t) ? gn(t) || Ni(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bi(e, t, s, r)) ? Di(e, t, s, o, i, c, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), wi(e, t, s, r));
};
function Bi(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && _s.test(t) && w(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || _s.test(t) && Y(n) ? !1 : t in e;
}
function Ki(e, t) {
  const n = Io(e);
  class s extends kn {
    constructor(o) {
      super(n, o, t);
    }
  }
  return s.def = n, s;
}
const Gi = typeof HTMLElement < "u" ? HTMLElement : class {
};
class kn extends Gi {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Us(() => {
      this._connected || (gs(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const r of s)
        this._setAttr(r.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, r = !1) => {
      const { props: o, styles: i } = s;
      let c;
      if (o && !I(o))
        for (const u in o) {
          const p = o[u];
          (p === Number || p && p.type === Number) && (u in this._props && (this._props[u] = Kn(this._props[u])), (c || (c = /* @__PURE__ */ Object.create(null)))[xe(u)] = !0);
        }
      this._numberProps = c, r && this._resolveProps(s), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = I(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && s.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of s.map(xe))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(o) {
          this._setProp(r, o);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = xe(t);
    this._numberProps && this._numberProps[s] && (n = Kn(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, r = !0) {
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), s && (n === !0 ? this.setAttribute(pe(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(pe(t), n + "") : n || this.removeAttribute(pe(t))));
  }
  _update() {
    gs(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = ke(this._def, q({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (o, i) => {
        this.dispatchEvent(new CustomEvent(o, {
          detail: i
        }));
      };
      n.emit = (o, ...i) => {
        s(o, i), pe(o) !== o && s(pe(o), i);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof kn) {
          n.parent = r._instance, n.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const Ji = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Ro.props;
const Wi = /* @__PURE__ */ q({ patchProp: Vi }, xi);
let ms;
function $i() {
  return ms || (ms = ei(Wi));
}
const gs = (...e) => {
  $i().render(...e);
}, zi = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Xi = {};
function qi(e, t) {
  return ri(), li("div", null, "this is main page");
}
const Yi = /* @__PURE__ */ zi(Xi, [["render", qi]]), Zi = Ki(Yi);
customElements.define("student-manager-wc", Zi);
