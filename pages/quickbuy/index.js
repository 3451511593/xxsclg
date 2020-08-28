var t, a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), e = getApp(), r = e.requirejs("core"), i = e.requirejs("biz/goodspicker"), s = e.requirejs("foxui"), n = e.requirejs("biz/diyform");

Page({
    data: (t = {
        arrLabel: [],
        num: [],
        clickCar: !1
    }, (0, a.default)(t, "num", 0), (0, a.default)(t, "change", !1), (0, a.default)(t, "div", !1), 
    (0, a.default)(t, "numtotal", {}), (0, a.default)(t, "clearcart", !0), (0, a.default)(t, "canBuy", ""), 
    (0, a.default)(t, "specs", []), (0, a.default)(t, "options", []), (0, a.default)(t, "diyform", {}), 
    (0, a.default)(t, "specsTitle", ""), (0, a.default)(t, "total", 1), (0, a.default)(t, "active", ""), 
    (0, a.default)(t, "slider", ""), (0, a.default)(t, "tempname", ""), (0, a.default)(t, "buyType", ""), 
    (0, a.default)(t, "areas", []), (0, a.default)(t, "closeBtn", !1), (0, a.default)(t, "soundpic", !0), 
    (0, a.default)(t, "closespecs", !1), (0, a.default)(t, "buyType", "cart"), (0, a.default)(t, "quickbuy", !0), 
    (0, a.default)(t, "formdataval", {}), (0, a.default)(t, "showPicker", !1), t),
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中..."
        });
        var a = t.id;
        if (null == a) {
            var i = getCurrentPages(), s = i[i.length - 1].route.split("/");
            a = s[s.length - 1];
        }
        var n = this, o = wx.getStorageSync("systemInfo");
        this.busPos = {}, this.busPos.x = 45, this.busPos.y = e.globalData.hh - 80, this.setData({
            goodsH: o.windowHeight - 245 - 48,
            pageid: a
        });
        for (var d = [ 1 ], c = 1; c < n.data.arrLabel.length; c++) d.push(0);
        n.setData({
            arrLab: d
        }), r.get("quick/index/main", {
            id: this.data.pageid
        }, function(t) {
            var a = [], e = "";
            e = 1 == t.style.shopstyle ? "changeCss2" : 2 == t.style.shopstyle ? "changeCss3" : "", 
            e += " " + t.style.logostyle, n.setData({
                main: t,
                group: t.group,
                goodsArr: t.goodsArr,
                arrCart: a,
                style: e
            });
            var i = 1 == n.data.main.cartdata && n.data.pageid;
            if (n.data.main.advs) {
                if (n.data.main.advs.length > 0) {
                    a = [ 198 ];
                    var s = 198;
                }
            } else a = [ 18 ], s = 18;
            for (var o = 0; o < n.data.main.group.length; o++) {
                if (n.data.main.goodsArr[n.data.main.group[o].type]) s = s + 106 * (n.data.main.goodsArr[n.data.main.group[o].type].length ? n.data.main.goodsArr[n.data.main.group[o].type].length : .6) + 66, 
                a.push(s), n.setData({
                    arrscroll: a
                });
            }
            i = 1 == n.data.main.cartdata ? n.data.pageid : "";
            r.get("quick/index/getCart", {
                quickid: i
            }, function(t) {
                var a = {};
                for (var e in t.simple_list) a[e] = t.simple_list[e];
                n.setData({
                    numtotal: a
                });
            }), wx.hideLoading(), wx.setNavigationBarTitle({
                title: t.pagetitle
            });
        });
    },
    menunavigage: function(t) {
        var a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: a,
            fail: function() {
                wx.switchTab({
                    url: a
                });
            }
        });
    },
    gobigimg: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.link
        });
    },
    clickLab: function(t) {
        for (var a = t.currentTarget.dataset.id, e = this.data.arrLab, r = 0; r < e.length; r++) e[r] = 0;
        e[a] = 1, this.setData({
            arrLab: e,
            id: t.currentTarget.dataset.id
        });
    },
    shopCarList: function() {
        var t = this;
        this.setData({
            clickCar: !0,
            cartcartArr: [],
            showPicker: !0
        });
        var a = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/getCart", {
            quickid: a
        }, function(a) {
            var e = t.data.main;
            e.cartList = a, t.setData({
                main: e
            });
            for (var r = [], i = 0; i < a.list.length; i++) r[i] = a.list[i].goodsid;
            t.setData({
                tempcartid: r
            });
        });
    },
    shopCarHid: function() {
        this.setData({
            clickCar: !1,
            showPicker: !1
        });
    },
    selectPicker: function(t) {
        var a = this;
        wx.getSetting({
            success: function(e) {
                if (e.authSetting["scope.userInfo"]) {
                    i.selectpicker(t, a, "goodslist"), a.setData({
                        cover: "",
                        showvideo: !1
                    });
                } else a.setData({
                    modelShow: !0
                });
            }
        });
    },
    specsTap: function(t) {
        i.specsTap(t, this);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: "",
            showPicker: !1
        });
    },
    buyNow: function(t) {
        i.buyNow(t, this);
    },
    getCart: function(t) {
        i.getCart(t, this);
    },
    select: function() {
        i.select(this);
    },
    inputNumber: function(t) {
        i.inputNumber(t, this);
    },
    number: function(t) {
        i.number(t, this);
    },
    onChange: function(t) {
        return n.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return n.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return n.selectArea(this, t);
    },
    bindChange: function(t) {
        return n.bindChange(this, t);
    },
    onCancel: function(t) {
        return n.onCancel(this, t);
    },
    onConfirm: function(t) {
        return n.onConfirm(this, t);
    },
    getIndex: function(t, a) {
        return n.getIndex(t, a);
    },
    closespecs: function() {
        this.setData({
            closespecs: !1
        });
    },
    onPageScroll: function(t) {},
    onShow: function() {},
    onReachBottom: function() {},
    addCartquick: function(t, a) {
        var e = this, i = e.data.numtotal, n = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/update", {
            quickid: n,
            goodsid: e.data.goodsid,
            optionid: t || "",
            update: "",
            total: "",
            type: e.data.addtype,
            typevalue: a || "",
            diyformdata: e.data.formdataval ? e.data.formdataval : ""
        }, function(t) {
            if (0 != t.error) e.setData({
                cantclick: !0
            }), s.toast(e, t.message), e.setData({
                active: "",
                slider: "out",
                isSelected: !0,
                tempname: "",
                showPicker: !1
            }); else {
                var a = e.data.main;
                a.cartList.total = t.total, a.cartList.totalprice = t.totalprice, a.cartList.list = [ 1 ], 
                i[e.data.goodsid] = t.goodstotal, e.setData({
                    numtotal: i,
                    main: a,
                    clearcart: !0,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    showPicker: !1,
                    formdataval: {}
                }), e.data.addtype;
            }
        });
    },
    addGoodToCartFn: function(t) {
        if (0 != t.target.dataset.total) {
            e.checkAuth();
            var a = 1 == this.data.main.cartdata ? "takeoutmodel" : "shopmodel";
            if (t.currentTarget.dataset.canadd || (a = "cantaddcart"), this.setData({
                morechose: t.currentTarget.dataset.more
            }), this.setData({
                addtype: t.currentTarget.dataset.add,
                goodsid: t.currentTarget.dataset.id,
                mouse: t
            }), "reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num && this.setData({
                addtype: "delete"
            }), "1" == t.currentTarget.dataset.more && "reduce" == this.data.addtype) s.toast(this, "请在购物车中修改多规格商品"); else if ("reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num) s.toast(this, "不能少于" + t.currentTarget.dataset.min + "件商品"); else if ("1" == t.currentTarget.dataset.more || "0" != t.currentTarget.dataset.diyformtype || !t.currentTarget.dataset.canadd) if ("reduce" != this.data.addtype && "delete" != this.data.addtype) {
                this.setData({
                    showPicker: !0,
                    cycledate: !1
                }), i.selectpicker(t, this, "quickbuy", a);
            } else this.setData({
                storenum: t.currentTarget.dataset.store,
                maxnum: t.currentTarget.dataset.maxnum
            }), this.addCartquick("", 1);
            "1" != t.currentTarget.dataset.more && "0" == t.currentTarget.dataset.diyformtype && t.currentTarget.dataset.canadd && (this.setData({
                storenum: t.currentTarget.dataset.store,
                maxnum: t.currentTarget.dataset.maxnum
            }), "reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num ? s.toast(this, "不能少于" + t.currentTarget.dataset.min + "件商品") : this.addCartquick("", 1));
        } else wx.showToast({
            title: "商品已售罄",
            icon: "none",
            duration: 2e3
        });
    },
    animate: function(t) {
        this.finger = {};
        var a = {};
        this.finger.x = t.touches[0].clientX, this.finger.y = t.touches[0].clientY, this.finger.y < this.busPos.y ? a.y = this.finger.y - 150 : a.y = this.busPos.y - 150, 
        a.x = Math.abs(this.finger.x - this.busPos.x) / 2, this.finger.x > this.busPos.x ? a.x = (this.finger.x - this.busPos.x) / 2 + this.busPos.x : a.x = (this.busPos.x - this.finger.x) / 2 + this.finger.x, 
        this.linePos = this.bezier([ this.busPos, a, this.finger ], 30), this.startAnimation(t);
    },
    bezier: function(t, a) {
        for (var e, r, i, s = [], n = 0; n <= a; n++) {
            for (i = t.slice(0), r = []; e = i.shift(); ) if (i.length) r.push(o([ e, i[0] ], n / a)); else {
                if (!(r.length > 1)) break;
                i = r, r = [];
            }
            s.push(r[0]);
        }
        function o(t, a) {
            var e, r, i, s, n, o, d, c;
            return e = t[0], s = (r = t[1]).x - e.x, n = r.y - e.y, i = Math.pow(Math.pow(s, 2) + Math.pow(n, 2), .5), 
            o = n / s, d = Math.atan(o), c = i * a, {
                x: e.x + c * Math.cos(d),
                y: e.y + c * Math.sin(d)
            };
        }
        return {
            bezier_points: s
        };
    },
    startAnimation: function(t) {
        var a = 0, e = this, r = e.linePos.bezier_points;
        this.setData({
            hide_good_box: !1,
            bus_x: e.finger.x,
            bus_y: e.finger.y
        });
        var i = r.length;
        a = i, this.timer = setInterval(function() {
            a--, e.setData({
                bus_x: r[a].x,
                bus_y: r[a].y
            }), a < 1 && (clearInterval(e.timer), e.setData({
                hide_good_box: !0
            }));
        }, 13);
    },
    clearShopCartFn: function(t) {
        var a = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/clearCart", {
            quickid: e
        }, function(t) {
            var e = a.data.main;
            e.cartList = {
                list: [],
                total: 0,
                totalprice: 0
            };
            for (var r = a.data.tempcartid, i = [], s = 0; s < r.length; s++) i[Number(r[s])] = -1;
            a.setData({
                main: e,
                clickCar: !1,
                numtotal: i,
                clearcart: !1,
                showPicker: !1
            });
        });
    },
    closemulti: function() {
        this.setData({
            showPicker: !1,
            clickCar: !1,
            cycledate: !0
        });
    },
    gopay: function() {
        var t = 1 == this.data.main.cartdata ? this.data.pageid : "";
        this.data.main.cartList.list.length ? wx.navigateTo({
            url: "/pages/order/create/index?fromquick=" + t
        }) : s.toast(this, "请先添加商品到购物车");
    },
    gotocart: function() {
        var t = "/pages/member/cart/index";
        wx.navigateTo({
            url: t,
            fail: function() {
                wx.switchTab({
                    url: t
                });
            }
        });
    },
    cartaddcart: function(t) {
        var a = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "", i = "0" == t.currentTarget.dataset.id ? t.currentTarget.dataset.goodsid : t.currentTarget.dataset.id, n = t.currentTarget.dataset.add;
        t.currentTarget.dataset.min == t.currentTarget.dataset.num && "reduce" == n && (n = "delete"), 
        r.get("quick/index/update", {
            quickid: e,
            goodsid: t.currentTarget.dataset.goodsid,
            optionid: "0" == t.currentTarget.dataset.id ? "" : t.currentTarget.dataset.id,
            update: "",
            total: "",
            type: n,
            typevalue: 1
        }, function(e) {
            if (0 == e.error) {
                var r = a.data.cartcartArr;
                r[i] = e.goodsOptionTotal || 0 == e.goodsOptionTotal ? e.goodsOptionTotal : e.goodstotal;
                var n = a.data.main;
                n.cartList.total = e.total, n.cartList.totalprice = e.totalprice;
                var o = a.data.numtotal;
                o[t.currentTarget.dataset.goodsid] = e.goodstotal, a.setData({
                    cartcartArr: r,
                    main: n,
                    numtotal: o
                });
            } else s.toast(a, e.message);
        });
    },
    scrollfn: function(t) {
        for (var a = this.data.arrLab, e = 0; e < this.data.arrscroll.length; e++) if (a[e] = 0, 
        Math.abs(t.detail.scrollTop - this.data.arrscroll[e]) < 26) {
            a[e] = 1, this.setData({
                arrLab: a
            });
            break;
        }
    },
    onShareAppMessage: function(t) {}
});