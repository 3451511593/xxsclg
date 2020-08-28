var t = getApp(), a = t.requirejs("core"), o = (t.requirejs("jquery"), t.requirejs("foxui"), 
0);

Page({
    data: {
        layershow: !1,
        chosenum: !1,
        options: !1,
        optionarr: [],
        selectSpecsarr: [],
        goods_id: 0
    },
    onLoad: function(t) {
        var o = this, e = t.id;
        this.setData({
            goods_id: e
        }), a.get("groups.goods.openGroups", {
            id: e
        }, function(t) {
            o.setData({
                data: t.data,
                teams: t.teams,
                ladder: t.ladder
            });
        });
    },
    joinTeam: function(o) {
        t.checkAuth();
        var e = this;
        wx.getSetting({
            success: function(t) {
                if (t.authSetting["scope.userInfo"]) {
                    var d = a.pdata(o).type, s = a.pdata(o).op;
                    if (e.setData({
                        optionarr: [],
                        selectSpecsarr: []
                    }), "creat" == s ? e.setData({
                        op: "creat"
                    }) : e.setData({
                        op: ""
                    }), "ladder" == d) {
                        var i = e.data.data.id;
                        a.get("groups.goods.goodsCheck", {
                            id: i,
                            type: "group"
                        }, function(t) {
                            0 == t.error ? e.setData({
                                layershow: !0,
                                chosenum: !0
                            }) : wx.showToast({
                                title: t.message,
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    } else if (0 == e.data.data.more_spec) {
                        i = e.data.data.id;
                        a.get("groups.goods.goodsCheck", {
                            id: i,
                            type: "group"
                        }, function(t) {
                            0 == t.error ? "creat" == s ? wx.navigateTo({
                                url: "../confirm/index?type=groups&id=" + i + "&heads=1"
                            }) : a.get("groups.goods.check_tuan", {
                                id: i,
                                type: "group"
                            }, function(t) {
                                t.data.order_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                                    url: "../jointeam/index?id=" + i
                                });
                            }) : wx.showToast({
                                title: t.message,
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    } else {
                        i = e.data.data.id;
                        a.get("groups.goods.goodsCheck", {
                            id: i,
                            type: "group"
                        }, function(t) {
                            0 == t.error ? (a.get("groups.goods.get_spec", {
                                id: i
                            }, function(t) {
                                e.setData({
                                    spec: t.data
                                });
                            }), e.setData({
                                layershow: !0,
                                options: !0
                            })) : wx.showToast({
                                title: t.message,
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    }
                }
            }
        });
    },
    chosenum: function(t) {
        var o = a.pdata(t).index, e = a.pdata(t).goodsid, d = a.pdata(t).id, s = a.pdata(t).price;
        this.setData({
            selectindex: o,
            id: e,
            ladder_id: d,
            ladder_price: s
        });
    },
    close: function() {
        this.setData({
            layershow: !1,
            chosenum: !1,
            options: !1
        });
    },
    ladder_buy: function() {
        var t = this;
        t.data.ladder_id ? ("creat" != this.data.op ? a.get("groups.goods.check_tuan", {
            id: t.data.goods_id,
            ladder_id: t.data.ladder_id
        }, function(o) {
            o.data.ladder_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                url: "../jointeam/index?id=" + t.data.goods_id + "&ladder_id=" + t.data.ladder_id,
                success: function() {
                    t.setData({
                        layershow: !1,
                        chosenum: !1,
                        options: !1
                    });
                }
            });
        }) : wx.navigateTo({
            url: "../confirm/index?id=" + t.data.goods_id + "&heads=1&type=groups&ladder_id=" + t.data.ladder_id,
            success: function() {
                t.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }), this.close()) : a.alert("请选择拼团人数");
    },
    specsTap: function(t) {
        o++;
        var e = this, d = e.data.spec, s = a.pdata(t).spedid, i = a.pdata(t).id, n = a.pdata(t).specindex;
        a.pdata(t).idx;
        d[n].item.forEach(function(t, a) {
            t.id == i ? d[n].item[a].status = "active" : d[n].item[a].status = "";
        }), e.setData({
            spec: d
        });
        var r = e.data.optionarr, c = e.data.selectSpecsarr;
        1 == o ? (r.push(i), c.push(s)) : c.indexOf(s) > -1 ? r.splice(n, 1, i) : (r.push(i), 
        c.push(s)), e.data.optionarr = r, e.data.selectSpecsarr = c, a.post("groups.goods.get_option", {
            spec_id: e.data.optionarr,
            groups_goods_id: e.data.goods_id
        }, function(t) {
            e.setData({
                optiondata: t.data
            });
        });
    },
    buy: function(t) {
        var o = this, e = a.pdata(t).op, d = o.data.goods_id, s = o.data.optiondata;
        o.data.optiondata ? "creat" == e ? s.stock > 0 ? wx.navigateTo({
            url: "../confirm/index?id=" + d + "&heads=1&type=groups&option_id=" + s.id,
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
        }) : s.stock > 0 ? a.get("groups.goods.check_tuan", {
            id: d,
            type: "group"
        }, function(t) {
            t.data.order_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                url: "../jointeam/index?id=" + d + "&option_id=" + s.id,
                success: function() {
                    o.setData({
                        layershow: !1,
                        chosenum: !1,
                        options: !1
                    });
                }
            });
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
    onShareAppMessage: function() {}
});