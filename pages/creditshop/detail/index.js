var t = getApp(), o = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), e = t.requirejs("wxParse/wxParse");

t.requirejs("jquery");

Page({
    data: {
        limits: !0,
        tabinfo: "active",
        tabreplay: "",
        tablog: "",
        hasoption: !1,
        options: [],
        goodsoptions: [],
        optionid: 0,
        specs: [],
        goods: [],
        log: [],
        logmore: !1,
        logpage: 1,
        replays: [],
        replaysmore: !1,
        replaypage: 1,
        stores: [],
        goodsrec: [],
        goodspicker: !1,
        selectspecs: [],
        optionselect: "请选择规格",
        optionbtn: "确认",
        timer: [],
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        windowWidth: 0,
        windowHeight: 0,
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3
    },
    onLoad: function(t) {
        var o = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                o.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), o.setData({
            options: t
        });
    },
    onTab: function(t) {
        var o = t.currentTarget.dataset.tab;
        "tabreplay" == o ? this.setData({
            tabinfo: "",
            tabreplay: "active",
            tablog: ""
        }) : "tablog" == o ? this.setData({
            tabinfo: "",
            tabreplay: "",
            tablog: "active"
        }) : this.setData({
            tabinfo: "active",
            tabreplay: "",
            tablog: ""
        });
    },
    getlog: function() {
        var t = this;
        t.setData({
            logpage: t.data.logpage + 1
        }), o.get("creditshop/detail/getlistlog", {
            id: t.options.id,
            page: t.data.logpage
        }, function(o) {
            o.list = t.data.log.concat(o.list), t.setData({
                log: o.list,
                logmore: o.more
            });
        });
    },
    getreply: function() {
        var t = this;
        t.setData({
            replaypage: t.data.replaypage + 1
        }), o.get("creditshop/detail/getlistreply", {
            id: t.options.id,
            page: t.data.replaypage
        }, function(o) {
            o.list = t.data.replays.concat(o.list), t.setData({
                replays: o.list,
                replaysmore: o.more
            });
        });
    },
    getDetail: function() {
        var t = this, s = t.data.options;
        o.get("creditshop/detail", {
            id: s.id
        }, function(o) {
            if (o.error > 0) return a.toast(t, o.message), void setTimeout(function() {
                wx.navigateBack();
            }, 1e3);
            if (e.wxParse("wxParseData", "html", o.goods.goodsdetail, t, "0"), e.wxParse("wxParseData_subdetail", "html", o.goods.subdetail, t, "0"), 
            e.wxParse("wxParseData_noticedetail", "html", o.goods.noticedetail, t, "0"), e.wxParse("wxParseData_usedetail", "html", o.goods.usedetail, t, "0"), 
            t.setData({
                goods: o.goods,
                log: o.log,
                logmore: o.logmore,
                replays: o.replys,
                replaysmore: o.replymore,
                stores: o.stores,
                goodsrec: o.goodsrec,
                hasoption: o.goods.hasoption,
                sysset: o.sysset
            }), o.goods.istime > 0 && o.goods.timestart > 0 && o.goods.timeend > 0) {
                clearInterval(t.data.timer);
                var s = setInterval(function() {
                    t.countDown(o.goods.timestart, o.goods.timeend);
                }, 1e3);
                t.setData({
                    timer: s
                });
            }
        });
    },
    countDown: function(t, o) {
        var a = parseInt(Date.now() / 1e3), e = parseInt((t > a ? t : o) - a), s = Math.floor(e / 86400), i = Math.floor((e - 24 * s * 60 * 60) / 3600), n = Math.floor((e - 24 * s * 60 * 60 - 3600 * i) / 60), r = {
            day: s,
            hour: i,
            minute: n,
            second: Math.floor(e - 24 * s * 60 * 60 - 3600 * i - 60 * n)
        };
        this.setData({
            timer: r
        });
    },
    optionclick: function() {
        var t = this, e = t.data.goods.id, s = t.data.goods.hasoption, i = t.data.specs;
        t.data.goods.canbuy ? s ? 0 == i.length ? o.get("creditshop/detail/option", {
            id: e
        }, function(o) {
            t.setData({
                goodspicker: !0,
                goodsoptions: o.options,
                optiongoods: o.goods,
                specs: o.specs
            });
        }) : t.setData({
            goodspicker: !0
        }) : t.setData({
            hasoption: !1
        }) : a.toast(t, t.data.goods.buymsg);
    },
    sortNumber: function(t, o) {
        return t - o;
    },
    specselect: function(t) {
        var o = this, e = o.data.selectspecs, s = t.target.dataset.idx, i = t.target.dataset.specid;
        e[s] = {
            id: i,
            title: t.target.dataset.title
        }, o.setData({
            selectspecs: e
        });
        var n = o.data.specs, r = n[s].items;
        r.forEach(function(t) {
            i == t.id ? t.class = "btn-danger" : t.class = "";
        }), n[s].items = r, o.setData({
            specs: n
        });
        var d, g = [];
        e.forEach(function(t) {
            t.title + ";", g.push(t.id);
        });
        var c = g.sort(this.sortNumber);
        d = c.join("_");
        var p = o.data.goodsoptions;
        "" != t.target.dataset.thumb && o.setData({
            "optiongoods.thumb": t.target.dataset.thumb
        }), p.forEach(function(t) {
            t.specs.split("_").sort().join("_") == d && (o.setData({
                optionid: t.id,
                "optiongoods.total": t.total,
                "goods.credit": t.credit,
                "goods.money": t.money,
                "optiongoods.credit": t.credit,
                "optiongoods.money": t.money,
                optionselect: "已选 " + t.title
            }), t.total < o.data.total ? (o.setData({
                "goods.canbuy": !1,
                "goods.buymsg": "库存不足",
                optionbtn: "库存不足"
            }), a.toast(o, "库存不足")) : o.setData({
                "goods.canbuy": !0,
                "goods.buymsg": "库存不足",
                optionbtn: "确认"
            }));
        });
    },
    closepicker: function() {
        this.setData({
            goodspicker: !1
        });
    },
    openActionSheet: function() {
        var t = this.data.goods.canbuy, o = this.data.goods.hasoption, a = this.data.optionid;
        t && (o > 0 ? a > 0 ? wx.redirectTo({
            url: "/pages/creditshop/create/index?id=" + this.data.goods.id + "&optionid=" + a
        }) : this.optionclick() : wx.redirectTo({
            url: "/pages/creditshop/create/index?id=" + this.data.goods.id
        }));
    },
    onShow: function() {
        var o = this;
        t.getCache("isIpx") ? o.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : o.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), o.getDetail(), wx.getSetting({
            success: function(t) {
                var a = t.authSetting["scope.userInfo"];
                o.setData({
                    limits: a
                });
            }
        });
    }
});