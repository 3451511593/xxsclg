var r = require("../@babel/runtime/helpers/interopRequireDefault")(require("../@babel/runtime/helpers/typeof")), n = {}, t = [], e = t.push, i = t.indexOf, o = n.toString, u = n.hasOwnProperty, a = "1.10.2".trim, f = /%20/g, l = /\[\]$/, c = {
    isFunction: function(r) {
        return "function" === c.type(r);
    },
    isArray: Array.isArray || function(r) {
        return "array" === c.type(r);
    },
    isWindow: function(r) {
        return null != r && r == r.window;
    },
    isNumeric: function(r) {
        return !isNaN(parseFloat(r)) && isFinite(r);
    },
    type: function(t) {
        return null == t ? String(t) : "object" === (0, r.default)(t) || "function" == typeof t ? n[o.call(t)] || "object" : (0, 
        r.default)(t);
    },
    isPlainObject: function(r) {
        var n;
        if (!r || "object" !== c.type(r) || r.nodeType || c.isWindow(r)) return !1;
        try {
            if (r.constructor && !u.call(r, "constructor") && !u.call(r.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (r) {
            return !1;
        }
        if (c.support.ownLast) for (n in r) return u.call(r, n);
        for (n in r) ;
        return void 0 === n || u.call(r, n);
    },
    isEmptyObject: function(r) {
        var n;
        for (n in r) return !1;
        return !0;
    },
    each: function(r, n, t) {
        var e = 0, i = r.length, o = p(r);
        if (t) {
            if (o) for (;e < i && !1 !== n.apply(r[e], t); e++) ; else for (e in r) if (!1 === n.apply(r[e], t)) break;
        } else if (o) for (;e < i && !1 !== n.call(r[e], e, r[e]); e++) ; else for (e in r) if (!1 === n.call(r[e], e, r[e])) break;
        return r;
    },
    trim: a && !a.call("\ufeff ") ? function(r) {
        return null == r ? "" : a.call(r);
    } : function(r) {
        return null == r ? "" : (r + "").replace(rtrim, "");
    },
    makeArray: function(r, n) {
        var t = n || [];
        return null != r && (p(Object(r)) ? c.merge(t, "string" == typeof r ? [ r ] : r) : e.call(t, r)), 
        t;
    },
    inArray: function(r, n, t) {
        var e;
        if (n) {
            if (i) return i.call(n, r, t);
            for (e = n.length, t = t ? t < 0 ? Math.max(0, e + t) : t : 0; t < e; t++) if (t in n && n[t] === r) return t;
        }
        return -1;
    },
    merge: function(r, n) {
        var t = n.length, e = r.length, i = 0;
        if ("number" == typeof t) for (;i < t; i++) r[e++] = n[i]; else for (;void 0 !== n[i]; ) r[e++] = n[i++];
        return r.length = e, r;
    },
    isMobile: function(r) {
        return "" !== c.trim(r) && /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(c.trim(r));
    },
    toFixed: function(r, n) {
        var t = parseInt(n) || 0;
        if (t < -20 || t > 100) throw new RangeError("Precision of " + t + " fractional digits is out of range");
        var e = Number(r);
        if (isNaN(e)) return "NaN";
        var i, o = "";
        if (e <= 0 && (o = "-", e = -e), e >= Math.pow(10, 21)) return o + e.toString();
        if (i = 0 == (n = Math.round(e * Math.pow(10, t))) ? "0" : n.toString(), 0 == t) return o + i;
        var u = i.length;
        u <= t && (i = Math.pow(10, t + 1 - u).toString().substring(1) + i, u = t + 1);
        if (t > 0) {
            var a = i.substring(0, u - t), f = i.substring(u - t);
            i = a + "." + f;
        }
        return o + i;
    }
};

function s(n, t, e, i) {
    var o;
    if (c.isArray(t)) c.each(t, function(t, o) {
        e || l.test(n) ? i(n, o) : s(n + "[" + ("object" === (0, r.default)(o) ? t : "") + "]", o, e, i);
    }); else if (e || "object" !== c.type(t)) i(n, t); else for (o in t) s(n + "[" + o + "]", t[o], e, i);
}

function p(r) {
    var n = r.length, t = c.type(r);
    return !c.isWindow(r) && (!(1 !== r.nodeType || !n) || ("array" === t || "function" !== t && (0 === n || "number" == typeof n && n > 0 && n - 1 in r)));
}

c.extend = function() {
    var n, t, e, i, o, u, a = arguments[0] || {}, f = 1, l = arguments.length, s = !1;
    for ("boolean" == typeof a && (s = a, a = arguments[1] || {}, f = 2), "object" === (0, 
    r.default)(a) || c.isFunction(a) || (a = {}), l === f && (a = this, --f); f < l; f++) if (null != (n = arguments[f])) for (t in n) e = a[t], 
    a !== (i = n[t]) && (s && i && (c.isPlainObject(i) || (o = c.isArray(i))) ? (o ? (o = !1, 
    u = e && c.isArray(e) ? e : []) : u = e && c.isPlainObject(e) ? e : {}, a[t] = c.extend(s, u, i)) : void 0 !== i && (a[t] = i));
    return a;
}, c.param = function(r, n) {
    var t, e = [], i = function(r, n) {
        n = c.isFunction(n) ? n() : null == n ? "" : n, e[e.length] = encodeURIComponent(r) + "=" + encodeURIComponent(n);
    };
    if (void 0 === n && (n = !1), c.isArray(r) || r.jquery && !c.isPlainObject(r)) c.each(r, function() {
        i(this.name, this.value);
    }); else for (t in r) s(t, r[t], n, i);
    return e.join("&").replace(f, "+");
}, module.exports = c;