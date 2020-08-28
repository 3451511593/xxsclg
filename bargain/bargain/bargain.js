var a = getApp(), i = a.requirejs("core"), t = (a.requirejs("jquery"), a.requirejs("foxui"), 
a.requirejs("wxParse/wxParse"));

Page({
    data: {
        label: "/static/images/label.png",
        showtab: "family",
        bargainid: "",
        layer: !1,
        cutPrice: "",
        error_hint: !1,
        error_hint_title: "",
        list: {},
        bargain: {},
        bargain_set: {},
        istimeTitle: "剩余时间",
        bargain_record: {},
        bargain_actor: {},
        swi: "",
        trade_swi: "",
        myself_swi: "",
        mid: "",
        randomHint: {
            0: "大王，您即将触及我的价格底线，不要放弃继续砍价吧～",
            1: "主人，达到价格底线就可以带我回家啦！等你哦～",
            2: "加把劲，再砍一刀，马上就到底价了哦～",
            3: "砍到底价才能购买哦，邀请小伙伴来帮忙吧！",
            4: "叫上您的小伙伴来砍价，我们的的目标是底价买买买！"
        },
        marked_words: "",
        arrived: "",
        timeout: 0,
        bargain_share: {}
    },
    onLoad: function(r) {
        a.url(r);
        var e = this;
        a.getCache("isIpx") ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), i.get("bargain/bargain", r, function(a) {
            if (1 != a.error) {
                if (0 == a.error) {
                    1 == a.unequalMid && wx.navigateTo({
                        url: "../bargain/bargain?id=" + a.id + "&mid=" + a.mid
                    }), e.setData({
                        list: a.list,
                        bargain: a.bargain,
                        bargain_set: a.bargain_set,
                        bargain_record: a.bargain_record,
                        bargain_actor: a.bargain_actor,
                        swi: a.swi,
                        trade_swi: a.trade_swi,
                        myself_swi: a.myself_swi,
                        bargainid: a.list.id,
                        mid: a.mid,
                        arrived: a.arrived,
                        timeout: a.timeout,
                        bargain_share: a.bargain_share
                    }), t.wxParse("wxParseData", "html", a.bargain.content, e, "0"), "" == a.bargain.rule || null == a.bargain.rule ? t.wxParse("wxParseDataRule", "html", a.bargain_set.rule, e, "0") : t.wxParse("wxParseDataRule", "html", a.bargain.rule, e, "0"), 
                    e.countDown(a.bargain.start_time, a.bargain.end_time, "istime"), clearInterval(e.data.timer);
                    var i = setInterval(function() {
                        e.countDown(a.bargain.start_time, a.bargain.end_time, "istime");
                    }, 1e3);
                    e.setData({
                        timer: i
                    });
                }
            } else e.setData({
                upper_limit: !0,
                upper_limitTitle: a.message
            });
        });
        var n = Math.floor(4 * Math.random()), s = e.data.randomHint[n];
        e.setData({
            marked_words: s
        });
    },
    goodsTab: function(a) {
        this.setData({
            showtab: a.currentTarget.dataset.tap
        });
    },
    cutPrice: function() {
        var t = this;
        a.checkAuth(function() {
            var a = "/pages/auth/index", r = t, e = r.data.bargainid, n = r.data.mid;
            i.get("bargain/bargain", {
                id: e,
                ajax: 151,
                mid: n
            }, function(i) {
                -1 != i.error ? 1 != i.error ? 0 == i.error && i.cutPrice ? r.setData({
                    layer: !0,
                    cutPrice: i.cutPrice
                }) : wx.redirectTo({
                    url: a
                }) : r.setData({
                    error_hint: !0,
                    error_hint_title: i.message
                }) : wx.navigateTo({
                    url: a
                });
            });
        });
    },
    closeLayer: function() {
        this.setData({
            layer: !1
        });
        var a = this.data.bargainid, i = this.data.mid;
        this.onLoad({
            id: a,
            mid: i
        });
    },
    goBackPrev: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    countDown: function(a, i, t) {
        var r = parseInt(Date.now() / 1e3), e = parseInt((a > r ? a : i) - r), n = Math.floor(e / 86400), s = Math.floor((e - 24 * n * 60 * 60) / 3600), o = Math.floor((e - 24 * n * 60 * 60 - 3600 * s) / 60), g = [ n, s, o, Math.floor(e - 24 * n * 60 * 60 - 3600 * s - 60 * o) ];
        if (this.setData({
            time: g
        }), "istime") {
            var d = "";
            a > r ? (d = "未开始", this.setData({
                istime: 0
            })) : a <= r && i > r ? (d = "剩余时间", this.setData({
                istime: 1
            })) : (d = "活动已经结束，下次早点来~", this.setData({
                istime: 2
            })), this.setData({
                istimeTitle: d
            });
        }
    },
    closeError: function() {
        this.setData({
            error_hint: !1
        });
    },
    seekHelp: function() {
        this.onShareAppMessage();
    },
    onShareAppMessage: function(a) {
        var i = this.data.bargainid, t = this.data.mid, r = this.data.bargain_share, e = {
            title: r.title || "帮砍价",
            path: "/bargain/bargain/bargain?id=" + i + "&mid=" + t,
            success: function(a) {},
            fail: function(a) {}
        };
        return r.logo && (e.imageUrl = r.logo), e;
    }
});