var t = getApp(), a = (t.requirejs("jquery"), t.requirejs("core")), e = t.requirejs("foxui"), o = t.requirejs("biz/diyform");

module.exports = {
    number: function(t, o) {
        var d = a.pdata(t), i = e.number(o, t), s = (d.id, d.optionid, d.min);
        d.max;
        1 == i && 1 == d.value && "minus" == t.target.dataset.action || i < s && "minus" == t.target.dataset.action ? e.toast(o, "单次最少购买" + d.value + "件") : d.value == d.max && "plus" == t.target.dataset.action || (parseInt(o.data.stock) < parseInt(i) ? e.toast(o, "库存不足") : o.setData({
            total: i
        }));
    },
    inputNumber: function(t, a) {
        var o = a.data.goods.maxbuy, d = a.data.goods.minbuy, i = t.detail.value;
        if (i > 0) {
            if (o > 0 && o <= parseInt(t.detail.value) && (i = o, e.toast(a, "单次最多购买" + o + "件")), 
            d > 0 && d > parseInt(t.detail.value) && (i = d, e.toast(a, "单次最少购买" + d + "件")), 
            parseInt(a.data.stock) < parseInt(i)) return void e.toast(a, "库存不足");
        } else i = d > 0 ? d : 1;
        a.setData({
            total: i
        });
    },
    chooseGift: function(t, a) {
        a.setData({
            giftid: t.currentTarget.dataset.id
        });
    },
    buyNow: function(t, d, i) {
        t.currentTarget.dataset.type && (i = t.currentTarget.dataset.type);
        var s = d.data.optionid, r = d.data.goods.hasoption, n = d.data.diyform, g = d.data.giftid;
        if (9 == d.data.goods.type) var l = d.data.checkedDate / 1e3;
        if (r > 0 && !s) e.toast(d, "请选择规格"); else if (n && n.fields.length > 0) {
            if (!o.verify(d, n)) return;
            a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: n.f_data
            }, function(t) {
                0 == d.data.goods.isgift || "goods_detail" != i ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&selectDate=" + l
                }) : g ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
                }) : "" != g ? (d.data.goods.giftinfo && 1 == d.data.goods.giftinfo.length && (g = d.data.goods.giftinfo[0].id), 
                d.data.goods.gifts && 1 == d.data.goods.gifts.length && (g = d.data.goods.gifts[0].id), 
                wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
                })) : e.toast(d, "请选择赠品");
            });
        } else g ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&giftid=" + g
        }) : 0 == d.data.goods.isgift || "goods_detail" != i ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&selectDate=" + l
        }) : "" != g ? (d.data.goods.giftinfo && 1 == d.data.goods.giftinfo.length && (g = d.data.goods.giftinfo[0].id), 
        d.data.goods.gifts && 1 == d.data.goods.gifts.length && (g = d.data.goods.gifts[0].id), 
        wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&giftid=" + g
        })) : e.toast(d, "请选择赠品");
    },
    getCart: function(t, d) {
        var i = d.data.optionid, s = d.data.goods.hasoption, r = d.data.diyform;
        if (s > 0 && !i) e.toast(d, "请选择规格"); else if (d.data.quickbuy) {
            if (r && r.fields.length > 0) {
                if (!o.verify(d, r)) return;
                d.setData({
                    formdataval: {
                        diyformdata: r.f_data
                    }
                });
            }
            d.addCartquick(i, d.data.total);
        } else if (r && r.fields.length > 0) {
            if (!o.verify(d, r)) return;
            a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: r.f_data
            }, function(t) {
                a.post("member/cart/add", {
                    id: d.data.id,
                    total: d.data.total,
                    optionid: i,
                    diyformdata: r.f_data
                }, function(t) {
                    0 == t.error ? (d.setData({
                        "goods.cartcount": t.cartcount,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), e.toast(d, "添加成功")) : e.toast(d, t.message);
                });
            });
        } else a.post("member/cart/add", {
            id: d.data.id,
            total: d.data.total,
            optionid: i
        }, function(t) {
            if (0 == t.error) {
                e.toast(d, "添加成功");
                var a = d.data.goods;
                d.setData({
                    "goods.cartcount": t.cartcount,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    goods: a
                });
            } else e.toast(d, t.message);
        });
    },
    selectpicker: function(o, d, i, s) {
        1 == o.currentTarget.dataset.home && d.setData({
            giftid: ""
        }), t.checkAuth();
        var r = d.data.active, n = o.currentTarget.dataset.id;
        "" == r && d.setData({
            slider: "in",
            show: !0
        }), a.get("goods/get_picker", {
            id: n
        }, function(t) {
            if (t.goods.presellstartstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) if (t.goods.member_discount > 0 && d.setData({
                "goods.member_discount": t.goods.member_discount
            }), t.goods.presellendstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) {
                t.goods && t.goods.giftinfo && 1 == t.goods.giftinfo.length && d.setData({
                    giftid: t.goods.giftinfo[0].id
                });
                var a = t.options;
                if ("goodsdetail" == i) if (d.setData({
                    pickerOption: t,
                    canbuy: d.data.goods.canbuy,
                    buyType: o.currentTarget.dataset.buytype,
                    options: a,
                    minpicker: i,
                    "goods.thistime": t.goods.thistime
                }), 0 != t.goods.minbuy && d.data.total < t.goods.minbuy) var r = t.goods.minbuy; else r = d.data.total; else if (d.setData({
                    pickerOption: t,
                    goods: t.goods,
                    options: a,
                    minpicker: i
                }), d.setData({
                    optionid: !1,
                    specsData: [],
                    specs: []
                }), 0 != t.goods.minbuy && d.data.total < t.goods.minbuy) r = t.goods.minbuy; else r = 1;
                t.diyform && d.setData({
                    diyform: {
                        fields: t.diyform.fields,
                        f_data: t.diyform.lastdata
                    }
                }), d.setData({
                    id: n,
                    pagepicker: i,
                    total: r,
                    tempname: "select-picker",
                    active: "active",
                    show: !0,
                    modeltakeout: s
                });
            } else e.toast(d, t.goods.presellstatustitle); else e.toast(d, t.goods.presellstatustitle);
        });
    },
    sortNumber: function(t, a) {
        return t - a;
    },
    specsTap: function(t, a) {
        var o = a.data.specs;
        o[t.target.dataset.idx] = {
            id: t.target.dataset.id,
            title: t.target.dataset.title
        };
        var d, i = "", s = [];
        o.forEach(function(t) {
            i += t.title + ";", s.push(t.id);
        });
        var r = s.sort(this.sortNumber);
        d = r.join("_");
        var n = a.data.options;
        "" != t.target.dataset.thumb && a.setData({
            "goods.thumb": t.target.dataset.thumb
        }), n.forEach(function(t) {
            t.specs == d && (a.setData({
                optionid: t.id,
                "goods.total": t.stock,
                "goods.maxprice": t.marketprice,
                "goods.minprice": t.marketprice,
                "goods.marketprice": t.marketprice,
                "goods.member_discount": t.member_discount,
                "goods.seecommission": t.seecommission,
                "goods.presellprice": a.data.goods.ispresell > 0 ? t.presellprice : a.data.goods.presellprice,
                optionCommission: !0
            }), parseInt(t.stock) < parseInt(a.data.total) ? (a.setData({
                canBuy: "库存不足",
                stock: t.stock
            }), e.toast(a, "库存不足")) : a.setData({
                canBuy: "",
                stock: t.stock
            }));
        }), a.setData({
            specsData: o,
            specsTitle: i
        });
    }
};