var a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/typeof")), e = getApp(), t = e.requirejs("jquery"), r = e.requirejs("core"), i = e.requirejs("foxui");

module.exports = {
    getIndex: function(a, e) {
        if ("" == t.trim(a) || !t.isArray(e)) return [ 0, 0, 0 ];
        var r = a.split(" "), i = [ 0, 0, 0 ];
        for (var d in e) if (e[d].name == r[0]) {
            for (var n in i[0] = Number(d), e[d].city) if (e[d].city[n].name == r[1]) {
                for (var f in i[1] = Number(n), e[d].city[n].area) if (e[d].city[n].area[f].name == r[2]) {
                    i[2] = Number(f);
                    break;
                }
                break;
            }
            break;
        }
        return i;
    },
    onConfirm: function(a, e) {
        var r = a.data.pval, i = a.data.bindAreaField, d = t.isEmptyObject(a.data.diyform.f_data) ? {} : a.data.diyform.f_data, n = a.data.areas;
        if (d[i] = d[i] || {}, d[i].province = n[r[0]].name, d[i].city = n[r[0]].city[r[1]].name, 
        a.data.areaKey) {
            var f = a.data.areaDetail[a.data.areaKey];
            f.province = n[r[0]].name, f.city = n[r[0]].city[r[1]].name;
        }
        if (a.data.noArea || (d[i].area = n[r[0]].city[r[1]].area[r[2]].name, a.data.areaKey && (f.area = n[r[0]].city[r[1]].area[r[2]].name)), 
        a.setData({
            "diyform.f_data": d,
            showPicker: !1,
            bindAreaField: !1
        }), a.data.areaKey) {
            var s = a.data.areaDetail || {};
            s[a.data.areaKey] = f, a.setData({
                areaDetail: s
            });
        }
    },
    onCancel: function(a, e) {
        a.setData({
            showPicker: !1
        });
    },
    onChange: function(a, e) {
        var i = e.detail.value, d = r.pdata(e).type, n = a.data.postData;
        n[d] = t.trim(i), a.setData({
            postData: n
        });
    },
    bindChange: function(a, e) {
        var t = a.data.pvalOld, r = e.detail.value;
        t[0] != r[0] && (r[1] = 0), t[1] != r[1] && (r[2] = 0), a.setData({
            pval: r,
            pvalOld: r
        });
    },
    selectArea: function(a, e) {
        var t = e.currentTarget.dataset.area, r = e.currentTarget.dataset.field, i = 1 != e.currentTarget.dataset.hasarea, d = a.getIndex(t, a.data.areas), n = e.currentTarget.dataset.areakey, f = {
            pval: d,
            pvalOld: d,
            showPicker: !0,
            noArea: i,
            bindAreaField: r
        };
        n && (f.areaKey = n), a.setData(f);
    },
    DiyFormHandler: function(e, i) {
        var d = i.target.dataset, n = d.type, f = d.field, s = d.datatype, l = e.data.diyform.f_data;
        (t.isArray(l) || "object" != (0, a.default)(l)) && (l = {});
        var m = e.data.diyform.fields;
        if ("input" == n || "textarea" == n || "checkbox" == n || "date" == n || "datestart" == n || "dateend" == n || "time" == n || "timestart" == n || "timeend" == n || "radio" == n) if ("datestart" == n || "timestart" == n) t.isArray(l[f]) || (l[f] = []), 
        l[f][0] = i.detail.value; else if ("dateend" == n || "timeend" == n) t.isArray(l[f]) || (l[f] = []), 
        l[f][1] = i.detail.value; else if ("checkbox" == n) for (var o in l[f] = {}, i.detail.value) {
            var u = i.detail.value[o];
            l[f][u] = 1;
        } else "radio" == n ? l[f] = i.detail.value : 10 == s ? (t.isEmptyObject(l[f]) && (l[f] = {}), 
        l[f][d.name] = i.detail.value) : l[f] = i.detail.value; else if ("picker" == n) {
            for (var p in l) if (p == f) {
                for (var y in m) if (m[y].diy_type == f) {
                    l[f] = [ i.detail.value, m[y].tp_text[i.detail.value] ];
                    break;
                }
                break;
            }
        } else if ("image" == n) r.upload(function(a) {
            for (var t in l) if (t == f) {
                l[f] || (l[f] = {}), l[f].images || (l[f].images = []), l[f].images.push({
                    url: a.url,
                    filename: a.filename
                });
                break;
            }
            l[f].count = l[f].images.length, e.setData({
                "diyform.f_data": l
            });
        }); else if ("image-remove" == n) {
            for (var p in l) if (p == f) {
                var v = {
                    images: []
                };
                for (var y in l[f].images) l[f].images[y].filename != d.filename && v.images.push(l[f].images[y]);
                v.count = v.images.length, l[f] = v;
                break;
            }
        } else if ("image-preview" == n) for (var p in l) if (p == f) {
            var c = [];
            for (var y in l[f].images) c.push(l[f].images[y].url);
            wx.previewImage({
                current: c[d.index],
                urls: c
            });
            break;
        }
        e.setData({
            "diyform.f_data": l
        });
    },
    verify: function(a, e) {
        for (var r in e.fields) {
            var d = e.fields[r], n = d.diy_type;
            if (1 == d.tp_must) if (5 == d.data_type) {
                if (!e.f_data[n] || e.f_data[n].count < 1) return i.toast(a, "请选择" + d.tp_name), 
                !1;
            } else if (9 == d.data_type) {
                if (t.isEmptyObject(e.f_data[n]) || !e.f_data[n].province || !e.f_data[n].city) return i.toast(a, "请选择" + d.tp_name), 
                !1;
            } else if (10 == d.data_type) {
                if (t.isEmptyObject(e.f_data[n]) || !e.f_data[n].name1) return i.toast(a, "请填写" + d.tp_name), 
                !1;
                if (!e.f_data[n].name2 || "" == e.f_data[n].name2) return i.toast(a, "请填写" + d.tp_name2), 
                !1;
            } else if (11 == d.data_type) {
                if (!e.f_data[n]) return i.toast(a, "请填写" + d.tp_name), !1;
            } else if (3 == d.data_type) {
                if (!e.f_data[n] || "{}" == JSON.stringify(e.f_data[n])) return i.toast(a, "请填写" + d.tp_name), 
                !1;
            } else if (!e.f_data[n]) return i.toast(a, "请填写" + d.tp_name), !1;
            if (6 == d.data_type) {
                if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.f_data[n])) return i.toast(a, "请填写正确的" + d.tp_name), 
                !1;
            }
            if (10 == d.data_type && (t.isEmptyObject(e.f_data[n]) || e.f_data[n].name1 != e.f_data[n].name2)) return i.toast(a, d.tp_name + "与" + d.tp_name2 + "不一致"), 
            !1;
        }
        return !0;
    }
};