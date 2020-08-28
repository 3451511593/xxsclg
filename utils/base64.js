var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

module.exports.encode = function(o) {
    var e, t, a, n, h, C, d, c = "", f = 0;
    for (o = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var o = "", e = 0; e < r.length; e++) {
            var t = r.charCodeAt(e);
            t < 128 ? o += String.fromCharCode(t) : t > 127 && t < 2048 ? (o += String.fromCharCode(t >> 6 | 192), 
            o += String.fromCharCode(63 & t | 128)) : (o += String.fromCharCode(t >> 12 | 224), 
            o += String.fromCharCode(t >> 6 & 63 | 128), o += String.fromCharCode(63 & t | 128));
        }
        return o;
    }(o); f < o.length; ) n = (e = o.charCodeAt(f++)) >> 2, h = (3 & e) << 4 | (t = o.charCodeAt(f++)) >> 4, 
    C = (15 & t) << 2 | (a = o.charCodeAt(f++)) >> 6, d = 63 & a, isNaN(t) ? C = d = 64 : isNaN(a) && (d = 64), 
    c = c + r.charAt(n) + r.charAt(h) + r.charAt(C) + r.charAt(d);
    return c;
}, module.exports.decode = function(o) {
    var e, t, a, n, h, C, d = "", c = 0;
    for (o = o.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < o.length; ) e = r.indexOf(o.charAt(c++)) << 2 | (n = r.indexOf(o.charAt(c++))) >> 4, 
    t = (15 & n) << 4 | (h = r.indexOf(o.charAt(c++))) >> 2, a = (3 & h) << 6 | (C = r.indexOf(o.charAt(c++))), 
    d += String.fromCharCode(e), 64 != h && (d += String.fromCharCode(t)), 64 != C && (d += String.fromCharCode(a));
    return d = function(r) {
        for (var o = "", e = 0, t = 0, a = 0, n = 0; e < r.length; ) (t = r.charCodeAt(e)) < 128 ? (o += String.fromCharCode(t), 
        e++) : t > 191 && t < 224 ? (a = r.charCodeAt(e + 1), o += String.fromCharCode((31 & t) << 6 | 63 & a), 
        e += 2) : (a = r.charCodeAt(e + 1), n = r.charCodeAt(e + 2), o += String.fromCharCode((15 & t) << 12 | (63 & a) << 6 | 63 & n), 
        e += 3);
        return o;
    }(d);
};