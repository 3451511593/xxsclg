var e = getApp(), t = e.requirejs("core"), a = e.requirejs("foxui"), i = e.requirejs("jquery");

Page({
    data: {
        id: null,
        posting: !1,
        subtext: "保存地址",
        detail: {
            realname: "",
            mobile: "",
            areas: "",
            street: "",
            address: ""
        },
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1
    },
    onLoad: function(t) {
        t.params && this.setData({
            detail: JSON.parse(t.params)
        }), this.setData({
            id: Number(t.id)
        }), this.setData({
            areas: e.getCache("cacheset").areas,
            type: t.type
        }), e.url(t), this.getDetail(), t.id || wx.setNavigationBarTitle({
            title: "添加收货地址"
        });
    },
    getDetail: function() {
        var e = this, a = e.data.id;
        t.get("member/address/get_detail", {
            id: a
        }, function(t) {
            var a = {
                openstreet: t.openstreet,
                show: !0
            };
            if (i.isEmptyObject(t.detail)) {
                if (e.data.detail) {
                    console.log(e.data.detail);
                    s = e.data.detail.province + " " + e.data.detail.city + " " + e.data.detail.area, 
                    r = e.getIndex(s, e.data.areas);
                    a.pval = r, a.pvalOld = r;
                }
            } else {
                wx.setNavigationBarTitle({
                    title: "编辑收货地址"
                });
                var s = t.detail.province + " " + t.detail.city + " " + t.detail.area, r = e.getIndex(s, e.data.areas);
                a.pval = r, a.pvalOld = r, a.detail = t.detail;
            }
            console.log(r), e.setData(a), t.openstreet && r && e.getStreet(e.data.areas, r);
        });
    },
    submit: function() {
        var i = this, s = i.data.detail;
        i.data.posting || ("" != s.realname && s.realname ? "" != s.mobile && s.mobile ? "" != s.city && s.city ? !(i.data.street.length > 0) || "" != s.street && s.street ? "" != s.address && s.address ? (console.log(s), 
        s.is_from_wx && i.onConfirm("is_from_wx"), console.log(s), s.datavalue ? /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(s.mobile) ? (s.id = i.data.id || "", 
        i.setData({
            posting: !0
        }), t.post("member/address/submit", s, function(r) {
            if (0 != r.error) return i.setData({
                posting: !1
            }), void a.toast(i, r.message);
            i.setData({
                subtext: "保存成功"
            }), t.toast("保存成功"), setTimeout(function() {
                s.id = r.addressid, console.log(i.data.type), console.log("member" == i.data.type), 
                "member" != i.data.type ? "quickaddress" == i.data.type ? (e.setCache("orderAddress", s, 30), 
                wx.navigateBack()) : wx.navigateTo({
                    url: "/pages/member/address/select"
                }) : wx.navigateBack();
            }, 1e3);
        })) : a.toast(i, "请填写正确联系电话") : a.toast(i, "地址数据出错，请重新选择")) : a.toast(i, "请填写详细地址") : a.toast(i, "请选择所在街道") : a.toast(i, "请选择所在地区") : a.toast(i, "请填写联系电话") : a.toast(i, "请填写收件人"));
    },
    onChange: function(e) {
        var t = this.data.detail, a = e.currentTarget.dataset.type, s = i.trim(e.detail.value);
        "street" == a && (t.streetdatavalue = this.data.street[s].code, s = this.data.street[s].name), 
        t[a] = s, this.setData({
            detail: t
        });
    },
    getStreet: function(e, a) {
        if (console.log(e, a), e && a) {
            var i = this;
            if (i.data.detail.province && i.data.detail.city && this.data.openstreet) {
                var s = e[a[0]].city[a[1]].code, r = e[a[0]].city[a[1]].area[a[2]].code;
                t.get("getstreet", {
                    city: s,
                    area: r
                }, function(e) {
                    var t = e.street, a = {
                        street: t
                    };
                    if (t && i.data.detail.streetdatavalue) for (var s in t) if (t[s].code == i.data.detail.streetdatavalue) {
                        a.streetIndex = s, i.setData({
                            "detail.street": t[s].name
                        });
                        break;
                    }
                    i.setData(a);
                });
            }
        }
    },
    selectArea: function(e) {
        var t = e.currentTarget.dataset.area, a = this.getIndex(t, this.data.areas);
        this.setData({
            pval: a,
            pvalOld: a,
            showPicker: !0
        });
    },
    bindChange: function(e) {
        var t = this.data.pvalOld, a = e.detail.value;
        t[0] != a[0] && (a[1] = 0), t[1] != a[1] && (a[2] = 0), this.setData({
            pval: a,
            pvalOld: a
        });
    },
    onCancel: function(e) {
        this.setData({
            showPicker: !1
        });
    },
    onConfirm: function(e) {
        var t = this.data.pval, a = this.data.areas, i = this.data.detail;
        i.province = a[t[0]].name, i.city = a[t[0]].city[t[1]].name, i.datavalue = a[t[0]].code + " " + a[t[0]].city[t[1]].code, 
        a[t[0]].city[t[1]].area && a[t[0]].city[t[1]].area.length > 0 ? (i.area = a[t[0]].city[t[1]].area[t[2]].name, 
        i.datavalue += " " + a[t[0]].city[t[1]].area[t[2]].code, this.getStreet(a, t)) : i.area = "", 
        "is_from_wx" != e && (i.street = ""), this.setData({
            detail: i,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(e, t) {
        if ("" == i.trim(e) || !i.isArray(t)) return [ 0, 0, 0 ];
        var a = e.split(" "), s = [ 0, 0, 0 ];
        for (var r in t) if (t[r].name == a[0]) {
            for (var d in s[0] = Number(r), t[r].city) if (t[r].city[d].name == a[1]) {
                for (var o in s[1] = Number(d), t[r].city[d].area) if (t[r].city[d].area[o].name == a[2]) {
                    s[2] = Number(o);
                    break;
                }
                break;
            }
            break;
        }
        return s;
    },
    chooseAddress: function() {
        this.data.can = !1, wx.chooseAddress({
            success: function(e) {
                var t = {
                    realname: e.userName,
                    mobile: e.telNumber,
                    address: e.detailInfo,
                    province: e.provinceName,
                    city: e.cityName,
                    area: e.countyName,
                    is_from_wx: 1
                };
                setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/member/address/post?type=quickaddress&params=" + JSON.stringify(t)
                    });
                }, 0);
            }
        });
    }
});