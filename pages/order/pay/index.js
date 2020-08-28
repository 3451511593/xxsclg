var t = getApp(), e = t.requirejs("core"), s = t.requirejs("foxui");

Page({
    data: {
        icons: t.requirejs("icons"),
        success: !1,
        successData: {},
        coupon: !1
    },
    onLoad: function(e) {
        this.setData({
            options: e,
            imgUrl: t.globalData.approot
        }), t.url(e);
    },
    onShow: function() {
        this.get_list();
    },
    get_list: function() {
        var t = this;
        e.get("order/pay", t.data.options, function(s) {
            50018 != s.error ? (!s.wechat.success && "0.00" != s.order.price && s.wechat.payinfo && e.alert(s.wechat.payinfo.message + "\n不能使用微信支付!"), 
            t.setData({
                list: s,
                show: !0
            })) : wx.navigateTo({
                url: "/pages/order/details/index?id=" + t.data.options.id
            });
        });
    },
    pay: function(t) {
        var a = e.pdata(t).type, o = this, i = this.data.list.wechat;
        e.post("order/pay/checkstock", {
            id: o.data.options.id
        }, function(t) {
            0 == t.error ? "wechat" == a ? e.pay(i.payinfo, function(t) {
                if ("requestPayment:ok" == t.errMsg) {
                    if (0 == o.data.list.subscribetmp.length) return void o.complete(a);
                    console.log(o.data.list.reqsubtmp), console.log(o.data.list.subscribetmp), wx.requestSubscribeMessage({
                        tmplIds: o.data.list.reqsubtmp,
                        success: function(t) {
                            console.log(t);
                            var e = [];
                            "accept" == t[o.data.list.subscribetmp.pay] && e.push("pay"), "accept" == t[o.data.list.subscribetmp.send] && e.push("send"), 
                            "accept" == t[o.data.list.subscribetmp.autosend] && e.push("autosend"), "accept" == t[o.data.list.subscribetmp.receive] && e.push("receive"), 
                            o.complete(a, e);
                        },
                        fail: function(t) {
                            o.complete(a);
                        }
                    });
                }
            }) : "credit" == a ? e.confirm("确认要支付吗?", function() {
                o.complete(a);
            }, function() {}) : "cash" == a ? e.confirm("确认要使用货到付款吗?", function() {
                o.complete(a);
            }, function() {}) : o.complete(a) : s.toast(o, t.message);
        }, !0, !0);
    },
    complete: function(t, a) {
        var o = this;
        e.post("order/pay/complete", {
            id: o.data.options.id,
            type: t,
            template: a
        }, function(t) {
            if (0 != t.error) e.confirm(t.message, function() {
                wx.setStorageSync("orderid", o.data.options.id), wx.redirectTo({
                    url: "/pages/member/recharge/index"
                });
            }, function() {
                s.toast(o, t.message);
            }); else {
                wx.setNavigationBarTitle({
                    title: "支付成功"
                });
                var a = Array.isArray(t.ordervirtual);
                o.setData({
                    success: !0,
                    successData: t,
                    order: t.order,
                    ordervirtual: t.ordervirtual,
                    ordervirtualtype: a
                });
            }
        }, !0, !0);
    },
    shop: function(t) {
        0 == e.pdata(t).id ? this.setData({
            shop: 1
        }) : this.setData({
            shop: 0
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    closecoupon: function() {
        this.setData({
            coupon: !1
        });
    }
});