var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery");

Page({
    data: {
        list: [],
        page: 1,
        loading: !1
    },
    onLoad: function() {
        this.getlist();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loading || this.data.list.length == this.data.total || this.getlist();
    },
    getlist: function() {
        var t = this;
        t.setData({
            loading: !0
        }), console.error(t.data.loading), a.get("dividend/down", {
            page: t.data.page
        }, function(a) {
            console.error(a);
            var e = {
                total: a.total,
                pagesize: a.pagesize
            };
            if (0 == a.error) {
                if (a.list.length > 0) {
                    e.page = t.data.page + 1;
                    var o = t.data.list.concat(a.list);
                }
                t.setData({
                    member: a.member,
                    list: o,
                    loading: !1,
                    total: a.total,
                    page: e.page,
                    stop: !1
                });
            }
        });
    }
});