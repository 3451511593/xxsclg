var t = getApp(), s = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("foxui"));

t.requirejs("wxParse/wxParse"), t.requirejs("jquery");

Page({
    data: {
        paymentmodal: !1,
        showmodal: !1,
        successmodal: !1,
        member: [],
        goods: [],
        options: [],
        carrierInfo: [],
        stores: [],
        is_openmerch: !1,
        isverify: !1,
        iswechat: !0,
        iscredit: !0,
        paytype: "",
        togglestore: "",
        addressid: 0,
        dispatchprice: 0,
        allprice: 0,
        logid: 0,
        successmessage: "",
        successstatus: !1
    },
    onLoad: function(t) {
        var s = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), s.setData({
            options: t
        });
    },
    onShow: function() {
        var s = this, e = t.getCache("isIpx"), a = t.getCache("orderAddress"), o = t.getCache("orderShop");
        o && s.setData({
            carrierInfo: o
        });
        s.data.addressid;
        a.id > 0 && (s.addressid = a.id, s.setData({
            addressid: a.id
        }), s.getDetail()), e ? s.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : s.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), "" == s.data.member && s.getDetail(), wx.getSetting({
            success: function(t) {
                var e = t.authSetting["scope.userInfo"];
                s.setData({
                    limits: e
                });
            }
        });
    },
    listChange: function(t) {
        var s = this.data.member;
        switch (t.target.id) {
          case "realname":
            s.realname = t.detail.value;
            break;

          case "mobile":
            s.mobile = t.detail.value;
        }
        this.setData({
            member: s
        });
    },
    getDetail: function() {
        var t = this, e = t.data.options;
        s.get("creditshop/create", e, function(e) {
            if (0 == e.error) {
                e.goods.num = 1, t.setData({
                    goods: e.goods,
                    address: e.address,
                    shop: e.shop,
                    stores: e.stores,
                    isverify: e.goods.isverify,
                    member: e.member,
                    addressid: e.address.id,
                    credittext: e.sysset.texts.credit
                });
                0 == e.goods.isverify && 0 == e.goods.type && e.address.id > 0 ? (s.get("creditshop/create/getaddress", {
                    addressid: t.addressid
                }, function(s) {
                    0 == s.error && t.setData({
                        address: s.address
                    });
                }), t.dispatch()) : t.setData({
                    allprice: e.goods.money
                });
            }
        });
    },
    dispatch: function() {
        var t = this;
        s.get("creditshop/create/dispatch", {
            goodsid: t.data.goods.id,
            optionid: t.data.options.optionid
        }, function(s) {
            var e = s.dispatch;
            e = parseFloat(e) + parseFloat(t.data.goods.money), t.setData({
                dispatchprice: s.dispatch,
                allprice: e
            });
        });
    },
    number: function(t) {
        var a = this, o = a.data.goods, i = a.data.options, d = t.target.dataset.action;
        "minus" == d ? o.num = parseInt(o.num) - 1 : "plus" == d && (o.num = parseInt(o.num) + 1), 
        o.num < 1 && (o.num = 1);
        var r = o.num;
        s.get("creditshop/create/number", {
            goodsid: o.id,
            optionid: i.id,
            num: r
        }, function(t) {
            if (0 == t.goods.canbuy) return o.num > 1 && (o.num = parseInt(o.num) - 1), a.setData({
                goods: o
            }), void e.toast(a, t.goods.buymsg);
            (o = t.goods).num = r;
            var s = parseFloat(o.money * r) + parseFloat(o.dispatch);
            a.setData({
                goods: o,
                allprice: s
            });
        });
    },
    pay: function() {
        var t = this.data.goods, s = t.money * t.num + parseFloat(t.dispatch);
        if (s = s.toFixed(2), t.canbuy) {
            if (t.isverify > 0) {
                var a = this.data.member;
                if ("" == a.realname) return void e.toast(this, "请填写真实姓名");
                if ("" == a.mobile) return void e.toast(this, "请填写联系电话");
                if (0 == this.data.carrierInfo.length) return void e.toast(this, "请选择兑换门店");
            }
            if (0 == t.isverify && 0 == t.goodstype && 0 == t.type) {
                var o = this.data.addressid;
                if (0 == o || null == o) return void e.toast(this, "请选择收货地址");
            }
            1 == t.type && this.setData({
                addressid: 0
            }), 0 == s ? this.setData({
                showmodal: !0
            }) : this.setData({
                paymentmodal: !0
            });
        } else e.toast(this, this.data.goods.buymsg);
    },
    cancel: function() {
        this.setData({
            paymentmodal: !1,
            showmodal: !1
        });
    },
    payClick: function(t) {
        var s = t.target.dataset.type;
        this.setData({
            paymentmodal: !1,
            showmodal: !0,
            paytype: s
        });
    },
    confirm: function() {
        var t = this, a = t.data.paytype;
        1 != t.data.clickYes && (t.data.clickYes = 1, s.get("creditshop/detail/pay", {
            id: t.data.goods.id,
            optionid: t.data.optionid,
            num: t.data.goods.num,
            paytype: t.data.paytype,
            addressid: t.data.addressid,
            storeid: t.data.carrierInfo.id
        }, function(o) {
            if (o.error > 0) return e.toast(t, o.message), void (t.data.clickYes = 0);
            t.setData({
                logid: o.logid
            }), o.wechat && o.wechat.success && s.pay(o.wechat.payinfo, function(s) {
                "requestPayment:ok" == s.errMsg && (t.lottery(), t.data.clickYes = 0);
            }), "credit" == a && o.logid > 0 && (t.lottery(), t.data.clickYes = 0), "" == a && o.logid > 0 && (t.lottery(), 
            t.data.clickYes = 0);
        }));
    },
    success: function() {
        var t = this.data.logid;
        wx.redirectTo({
            url: "/pages/creditshop/log/detail/index?id=" + t
        });
    },
    lottery: function() {
        var t = this, a = t.data.goods.type, o = "";
        0 == a ? s.get("creditshop/detail/lottery", {
            id: t.data.goods.id,
            logid: t.data.logid
        }, function(s) {
            s.error > 0 ? e.toast(t, s.message) : (2 == s.status && (o = "恭喜您，商品兑换成功"), 3 == s.status && (1 == s.goodstype ? o = "恭喜您，优惠券兑换成功" : 2 == s.goodstype ? o = "恭喜您，余额兑换成功" : 3 == s.goodstype && (o = "恭喜您，红包兑换成功")), 
            t.setData({
                successmessage: o,
                successstatus: !0
            }));
        }) : (o = "努力抽奖中，请稍后....", t.setData({
            successmessage: o,
            successstatus: !0
        }), setTimeout(function() {
            s.get("creditshop/detail/lottery", {
                id: t.data.goods.id,
                logid: t.data.logid
            }, function(s) {
                s.error > 0 ? e.toast(t, s.message) : (2 == s.status ? o = "恭喜您，您中奖啦" : 3 == s.status ? 1 == s.goodstype ? o = "恭喜您，优惠券已经发到您账户啦" : 2 == s.goodstype ? o = "恭喜您，余额已经发到您账户啦" : 3 == s.goodstype && (o = "恭喜您，红包兑换成功") : o = "很遗憾，您没有中奖", 
                t.setData({
                    successmessage: o,
                    successstatus: !0
                }));
            });
        }, 1e3)), t.setData({
            successmodal: !0
        });
    },
    toggle: function(t) {
        "" == this.data.togglestore ? this.setData({
            togglestore: "toggleSend-group"
        }) : this.setData({
            togglestore: ""
        });
    }
});