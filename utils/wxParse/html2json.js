var e = "https", t = "", r = "", a = {}, s = require("./wxDiscode.js"), n = require("./htmlparser.js"), o = (d("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
d("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), i = d("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = d("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

d("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
d("wxxxcode-style,script,style,view,scroll-view,block");

function d(e) {
    for (var t = {}, r = e.split(","), a = 0; a < r.length; a++) t[r[a]] = !0;
    return t;
}

function c(e) {
    var s = [];
    if (0 == t.length || !a) return (d = {
        node: "text"
    }).text = e, o = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var n = new RegExp("[:]"), o = e.split(n), i = 0; i < o.length; i++) {
        var l = o[i], d = {};
        a[l] ? (d.node = "element", d.tag = "emoji", d.text = a[l], d.baseSrc = r) : (d.node = "text", 
        d.text = l), s.push(d);
    }
    return s;
}

module.exports = {
    html2json: function(t, r) {
        t = function(e) {
            return e.replace(/\r?\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<");
        }(t = function(e) {
            return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
        }(t)), t = s.strDiscode(t);
        var a = [], d = {
            node: r,
            nodes: [],
            images: [],
            imageUrls: []
        }, u = 0;
        return n(t, {
            start: function(t, n, c) {
                var p, g = {
                    node: "element",
                    tag: t
                };
                if (0 === a.length ? (g.index = u.toString(), u += 1) : (void 0 === (p = a[0]).nodes && (p.nodes = []), 
                g.index = p.index + "." + p.nodes.length), o[t] ? g.tagType = "block" : i[t] ? g.tagType = "inline" : l[t] && (g.tagType = "closeSelf"), 
                0 !== n.length && (g.attr = n.reduce(function(e, t) {
                    var r = t.name, a = t.value;
                    return "class" == r && (g.classStr = a), "style" == r && (g.styleStr = a), a.match(/ /) && (a = a.split(" ")), 
                    e[r] ? Array.isArray(e[r]) ? e[r].push(a) : e[r] = [ e[r], a ] : e[r] = a, e;
                }, {})), "img" === g.tag) {
                    g.imgIndex = d.images.length, g.attr = g.attr || {};
                    var m = g.attr.src || [];
                    "" == m[0] && m.splice(0, 1), m = s.urlToHttpUrl(m, e), g.attr.src = m, g.from = r, 
                    d.images.push(g), d.imageUrls.push(m);
                }
                if ("font" === g.tag) {
                    var h = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], f = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var v in g.attr.style || (g.attr.style = []), g.styleStr || (g.styleStr = ""), 
                    f) if (g.attr[v]) {
                        var x = "size" === v ? h[g.attr[v] - 1] : g.attr[v];
                        g.attr.style.push(f[v]), g.attr.style.push(x), g.styleStr += f[v] + ": " + x + ";";
                    }
                }
                "source" === g.tag && (d.source = g.attr.src), c ? (void 0 === (p = a[0] || d).nodes && (p.nodes = []), 
                p.nodes.push(g)) : a.unshift(g);
            },
            end: function(e) {
                var t = a.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && d.source && (t.attr.src = d.source, 
                delete d.source), 0 === a.length) d.nodes.push(t); else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: c(e)
                };
                if (0 === a.length) t.index = u.toString(), u += 1, d.nodes.push(t); else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), t.index = r.index + "." + r.nodes.length, 
                    r.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), d;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", n = arguments.length > 2 ? arguments[2] : void 0;
        t = e, r = s, a = n;
    }
};