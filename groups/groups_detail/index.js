var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("jquery"), t.requirejs("foxui"), 
0), o = t.requirejs("wxParse/wxParse");

Page({
    data: {
        showtab: "groups",
        count_down: !0,
        time: "",
        share: 1,
        options: "",
        show: !1
    },
    onLoad: function(a) {
        t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), this.setData({
            teamid: a.teamid
        }), this.get_details(a.teamid);
    },
    get_details: function(t) {
        var e = this;
        a.get("groups/team/details", {
            teamid: t
        }, function(t) {
            if (0 == t.error && (t.data.goods.content = t.data.goods.content.replace(/data-lazy/g, "src"), 
            e.setData({
                data: t.data
            }), o.wxParse("wxParseData", "html", t.data.goods.content, e, "0")), 0 == t.data.tuan_first_order.success) {
                if (t.data.lasttime2 <= 0) return void e.setData({
                    count_down: !1
                });
                if (clearInterval(e.data.timer), 0 == t.data.tuan_first_order.success) var a = setInterval(function() {
                    e.countDown(t.data.tuan_first_order.createtime, t.data.tuan_first_order.endtime);
                }, 1e3);
                e.setData({
                    timer: a
                });
            }
        });
    },
    countDown: function(t, a, e) {
        var o = parseInt(Date.now() / 1e3), s = parseInt((t > o ? t : a) - o), i = Math.floor(s / 86400), d = Math.floor((s - 24 * i * 60 * 60) / 3600), n = Math.floor((s - 24 * i * 60 * 60 - 3600 * d) / 60), r = Math.floor(s - 24 * i * 60 * 60 - 3600 * d - 60 * n);
        0 == i && 0 == d && 0 == n && 0 == r && this.get_details(this.data.teamid);
        var u = [ i, d, n, r ];
        this.setData({
            time: u
        });
    },
    tuxedobuy: function(e) {
        t.checkAuth();
        var o = this, s = o.data.data.goods.id;
        0 == o.data.data.goods.more_spec ? o.data.data.goods.stock > 0 ? a.get("groups/order/create_order", {
            id: s,
            ladder_id: o.data.data.tuan_first_order.ladder_id,
            type: "groups",
            heads: 0,
            teamid: o.data.teamid
        }, function(t) {
            1 != t.error ? -1 != t.error ? wx.navigateTo({
                url: "../confirm/index?id=" + s + "&heads=0&type=groups&teamid=" + o.data.teamid + "&ladder_id=" + o.data.data.tuan_first_order.ladder_id,
                success: function() {
                    o.setData({
                        layershow: !1,
                        chosenum: !1,
                        options: !1
                    });
                }
            }) : wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : a.alert(t.message);
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }) : (a.get("groups.goods.get_spec", {
            id: s
        }, function(t) {
            o.setData({
                spec: t.data
            });
        }), o.setData({
            layershow: !0,
            options: !0
        }), o.setData({
            optionarr: [],
            selectSpecsarr: []
        }), o.data.data.goods.stock > 0 ? wx.navigateTo({
            url: "../confirm/index?id=" + goods_id + "&type=groups&teamid=" + o.data.teamid,
            success: function() {
                o.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }), o.setData({
            layershow: !0,
            options: !0
        }));
    },
    close: function() {
        this.setData({
            layershow: !1,
            options: !1
        });
    },
    specsTap: function(t) {
        e++;
        var o = this, s = o.data.spec, i = a.pdata(t).spedid, d = a.pdata(t).id, n = a.pdata(t).specindex;
        a.pdata(t).idx;
        s[n].item.forEach(function(t, a) {
            t.id == d ? s[n].item[a].status = "active" : s[n].item[a].status = "";
        }), o.setData({
            spec: s
        });
        var r = o.data.optionarr, u = o.data.selectSpecsarr;
        1 == e ? (r.push(d), u.push(i)) : u.indexOf(i) > -1 ? r.splice(n, 1, d) : (r.push(d), 
        u.push(i)), o.data.optionarr = r, o.data.selectSpecsarr = u, a.post("groups.goods.get_option", {
            spec_id: o.data.optionarr,
            groups_goods_id: o.data.data.goods.id
        }, function(t) {
            o.setData({
                optiondata: t.data
            });
        });
    },
    buy: function(t) {
        var e = this, o = (a.pdata(t).op, e.data.data.goods.id), s = e.data.optiondata;
        e.data.optiondata ? s.stock > 0 ? wx.navigateTo({
            url: "../confirm/index?id=" + o + "&type=groups&option_id=" + s.id + " &teamid=" + e.data.teamid,
            success: function() {
                e.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请选择规格",
            icon: "none",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: this.data.data.shopshare.title,
            path: "/groups/groups_detail/index?teamid=" + this.data.data.tuan_first_order.teamid,
            imageUrl: this.data.data.shopshare.imgUrl
        };
    },
    goodsTab: function(t) {
        this.setData({
            showtab: t.target.dataset.tap
        });
    }
});