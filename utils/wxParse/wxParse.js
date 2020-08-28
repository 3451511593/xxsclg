var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/helpers/defineProperty")), a = e(require("./showdown.js")), i = e(require("./html2json.js")), r = 0, n = 0;

function d(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && a.length > 0 && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function o(e) {
    var a = e.target.dataset.from, i = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && function(e, a, i, d) {
        var o, s = i.data[d];
        if (!s || 0 == s.images.length) return;
        var l = s.images, h = function(e, t, a, i) {
            var d = 0, o = 0, s = 0, l = {}, h = a.data[i].view.imagePadding;
            n, e > (d = r - 2 * h) ? (s = (o = d) * t / e, l.imageWidth = o, l.imageheight = s) : (l.imageWidth = e, 
            l.imageheight = t);
            (r <= 0 || n <= 0) && wx.getSystemInfo({
                success: function(t) {
                    r = t.windowWidth, n = t.windowHeight, l.imageWidth = e > r ? r - 2 * h : e;
                }
            });
            return l;
        }(e.detail.width, e.detail.height, i, d), g = l[a].index, m = "".concat(d), u = !0, v = !1, f = void 0;
        try {
            for (var w, c = g.split(".")[Symbol.iterator](); !(u = (w = c.next()).done); u = !0) {
                var x = w.value;
                m += ".nodes[".concat(x, "]");
            }
        } catch (e) {
            v = !0, f = e;
        } finally {
            try {
                u || null == c.return || c.return();
            } finally {
                if (v) throw f;
            }
        }
        var P = m + ".width", p = m + ".height";
        i.setData((o = {}, (0, t.default)(o, P, h.imageWidth), (0, t.default)(o, p, h.imageheight), 
        o));
    }(e, i, this, a);
}

wx.getSystemInfo({
    success: function(e) {
        r = e.windowWidth, n = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', n = arguments.length > 3 ? arguments[3] : void 0, s = arguments.length > 4 ? arguments[4] : void 0;
        if (r && "" != r) {
            var l = n, h = {};
            if ("html" == t) h = i.default.html2json(r, e); else if ("md" == t || "markdown" == t) {
                var g = new a.default.Converter().makeHtml(r);
                h = i.default.html2json(g, e);
            }
            h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
            var m = {};
            m[e] = h, l.setData(m), l.wxParseImgLoad = o, l.wxParseImgTap = d;
        }
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments.length > 2 ? arguments[2] : void 0;
        i.default.emojisInit(e, t, a);
    }
};