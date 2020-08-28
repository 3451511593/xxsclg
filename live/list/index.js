/*   time:2020-03-06 00:05:25*/
requirePlugin("live-player-plugin");
var t = getApp().requirejs("core");
Page({
    data: {
        show: !1,
        loaded: !1,
        page: 1,
        list: [],
        total: 0,
        empty: !1
    },
    onLoad: function() {
        this.getList(!1)
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList(!1)
    },
    onPullDownRefresh: function() {
        this.getList(!0)
    },
    getList: function(a) {
        var e = this;
        a && (e.data.page = 1, e.data.list = []), t.get("live/room/get_list", {
            page: e.data.page
        }, function(t) {
            var i = {
                total: t.total,
                pagesize: t.pagesize,
                show: !0
            };
            t.list.length > 0 ? (i.page = e.data.page + 1, i.list = e.data.list.concat(t.list), t.list.length < t.pagesize ? i.loaded = !0 : i.loaded = !1, i.empty = !1) : (i.empty = !0, i.list = []), e.setData(i), wx.setNavigationBarTitle({
                title: t.sysset.shopname || "商城直播"
            }), a && wx.stopPullDownRefresh()
        }, this.data.show)
    }
});